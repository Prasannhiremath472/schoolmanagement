import { Process, Processor, OnQueueFailed, OnQueueCompleted } from '@nestjs/bull';
import { Logger, Injectable } from '@nestjs/common';
import { Job } from 'bull';
import { PdfService } from '../modules/pdf/pdf.service';
import { StorageService } from '../modules/storage/storage.service';
import { CentralPrismaService } from '../database/central-prisma.service';
import { PrismaClientManager } from '../database/prisma-client-manager.service';
import { NotificationGateway } from '../gateways/notification.gateway';
import { NotificationService } from '../modules/notification/notification.service';

interface ReportCardJobData {
  examScheduleId: string;
  sectionId: string;
  tenantSlug: string;
  requestedBy: string;
}

@Injectable()
@Processor('report-cards')
export class ReportCardsProcessor {
  private readonly logger = new Logger(ReportCardsProcessor.name);

  constructor(
    private readonly pdfService: PdfService,
    private readonly storageService: StorageService,
    private readonly centralPrisma: CentralPrismaService,
    private readonly prismaManager: PrismaClientManager,
    private readonly notificationGateway: NotificationGateway,
    private readonly notificationService: NotificationService,
  ) {}

  @Process('generate-report-cards')
  async handleGenerateReportCards(job: Job<ReportCardJobData>) {
    const { examScheduleId, sectionId, tenantSlug, requestedBy } = job.data;
    this.logger.log(`Generating report cards for section ${sectionId}, exam ${examScheduleId}`);

    const school = await this.centralPrisma.school.findUnique({ where: { slug: tenantSlug } });
    if (!school) throw new Error(`School ${tenantSlug} not found`);

    const db = this.prismaManager.getClient(this.buildDbUrl(school.dbName), tenantSlug);

    const [students, schedule] = await Promise.all([
      db.studentSection.findMany({
        where: { sectionId, isActive: true },
        include: { student: { include: { user: { select: { email: true } }, parents: { include: { parent: { include: { user: { select: { email: true, fcmToken: true } } } } } } } } },
      }),
      db.examSchedule.findUnique({
        where: { id: examScheduleId },
        include: { examType: true, class: true, academicYear: true },
      }),
    ]);

    const generatedCount = { success: 0, failed: 0 };

    for (let i = 0; i < students.length; i++) {
      const ss = students[i];
      await job.progress(Math.round((i / students.length) * 100));

      try {
        const results = await db.examResult.findMany({
          where: { studentId: ss.studentId, examScheduleId },
          include: { subject: true },
        });

        if (!results.length) continue;

        const totalMarks = results.reduce((s, r) => s + Number(r.marksObtained), 0);
        const maxMarks = results.reduce((s, r) => s + Number(r.maxMarks), 0);
        const percentage = maxMarks > 0 ? (totalMarks / maxMarks) * 100 : 0;
        const cgpa = results.length > 0
          ? results.reduce((s, r) => s + Number(r.gradePoint || 0), 0) / results.length
          : 0;

        const pdfBuffer = await this.pdfService.generateReportCard({
          student: ss.student,
          school: { name: school.name, logo: school.logo },
          schedule,
          results,
          summary: { totalMarks, maxMarks, percentage, cgpa, overallGrade: this.getGrade(percentage) },
        });

        const { url, key } = await this.storageService.uploadFile(
          pdfBuffer,
          `report-card-${ss.studentId}-${examScheduleId}.pdf`,
          `report-cards/${tenantSlug}`,
          'application/pdf',
        );

        // Save URL to student results (or separate document record)
        this.logger.log(`Report card uploaded: ${url}`);

        // Notify parents
        for (const sp of ss.student.parents) {
          const parentUser = sp.parent.user;
          const studentName = `${ss.student.firstName} ${ss.student.lastName}`;

          if (parentUser.fcmToken) {
            await this.notificationService.sendPushNotification(
              parentUser.fcmToken,
              'Report Card Ready',
              `${studentName}'s ${schedule.examType.name} report card is now available`,
              { type: 'EXAM', url, examScheduleId },
            );
          }

          if (parentUser.email) {
            await this.notificationService.sendEmail(
              parentUser.email,
              `Report Card - ${studentName} - ${schedule.examType.name}`,
              `<p>Dear Parent, ${studentName}'s report card is ready. <a href="${url}">Download Report Card</a></p>`,
            );
          }
        }

        generatedCount.success++;
      } catch (err) {
        this.logger.error(`Failed to generate report card for student ${ss.studentId}: ${err.message}`);
        generatedCount.failed++;
      }
    }

    // Notify admin who requested
    this.notificationGateway.sendToUser(requestedBy, 'report-cards-ready', {
      examScheduleId,
      sectionId,
      generated: generatedCount.success,
      failed: generatedCount.failed,
      message: `Report cards generated: ${generatedCount.success} success, ${generatedCount.failed} failed`,
    });

    this.logger.log(`Report cards complete: ${JSON.stringify(generatedCount)}`);
    return generatedCount;
  }

  @OnQueueFailed()
  onFailed(job: Job, error: Error) {
    this.logger.error(`Report card job ${job.id} failed: ${error.message}`, error.stack);
  }

  @OnQueueCompleted()
  onCompleted(job: Job, result: any) {
    this.logger.log(`Report card job ${job.id} completed: ${JSON.stringify(result)}`);
  }

  private getGrade(percentage: number): string {
    if (percentage >= 90) return 'A+';
    if (percentage >= 80) return 'A';
    if (percentage >= 70) return 'B+';
    if (percentage >= 60) return 'B';
    if (percentage >= 50) return 'C';
    if (percentage >= 33) return 'D';
    return 'F';
  }

  private buildDbUrl(dbName: string): string {
    const { DB_HOST = 'localhost', DB_PORT = '5432', DB_USER = 'postgres', DB_PASSWORD = '' } = process.env;
    return `postgresql://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${dbName}`;
  }
}
