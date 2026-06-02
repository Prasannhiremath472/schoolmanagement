import { Process, Processor, OnQueueFailed, OnQueueCompleted } from '@nestjs/bull';
import { Logger, Injectable } from '@nestjs/common';
import { Job } from 'bull';
import { PrismaClientManager } from '../database/prisma-client-manager.service';
import { CentralPrismaService } from '../database/central-prisma.service';
import { NotificationService } from '../modules/notification/notification.service';
import { NotificationGateway } from '../gateways/notification.gateway';

interface AbsenceJobData {
  studentId: string;
  date: string;
  tenantSlug: string;
  sectionId?: string;
}

@Injectable()
@Processor('attendance-notifications')
export class AttendanceNotificationsProcessor {
  private readonly logger = new Logger(AttendanceNotificationsProcessor.name);

  constructor(
    private readonly prismaManager: PrismaClientManager,
    private readonly centralPrisma: CentralPrismaService,
    private readonly notificationService: NotificationService,
    private readonly notificationGateway: NotificationGateway,
  ) {}

  @Process('send-absent-notification')
  async handleAbsentNotification(job: Job<AbsenceJobData>) {
    const { studentId, date, tenantSlug } = job.data;

    const school = await this.centralPrisma.school.findUnique({
      where: { slug: tenantSlug },
      include: { schoolSettings: true },
    });

    if (!school) return;

    const dbUrl = this.buildDbUrl(school.dbName);
    const db = this.prismaManager.getClient(dbUrl, tenantSlug);

    const student = await db.student.findUnique({
      where: { id: studentId },
      include: {
        parents: {
          where: { parent: { user: { isActive: true } } },
          include: {
            parent: {
              include: {
                user: { select: { id: true, phone: true, email: true, fcmToken: true } },
              },
            },
          },
        },
        sections: {
          where: { isActive: true },
          include: { section: { include: { class: { select: { name: true } } } } },
          take: 1,
        },
      },
    });

    if (!student || !student.parents.length) {
      this.logger.warn(`No parents found for student ${studentId}`);
      return;
    }

    const className = student.sections[0]?.section?.class?.name || '';
    const sectionName = student.sections[0]?.section?.name || '';
    const formattedDate = new Date(date).toLocaleDateString('en-IN', {
      weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
    });

    for (const sp of student.parents) {
      const parent = sp.parent;
      const parentUser = parent.user;
      const studentName = `${student.firstName} ${student.lastName}`;
      const message = `Dear Parent, ${studentName} (Class ${className}-${sectionName}) was absent on ${formattedDate}. Please ensure attendance.`;

      // SMS notification
      if (parent.phone || parentUser.phone) {
        await this.notificationService.sendSms(parent.phone || parentUser.phone, message);
      }

      // Email notification
      if (parent.email || parentUser.email) {
        await this.notificationService.sendEmail(
          parent.email || parentUser.email,
          `Attendance Alert - ${studentName} Absent`,
          `<p>${message}</p><p>If you have any queries, please contact the school.</p>`,
        );
      }

      // Push notification
      if (parentUser.fcmToken) {
        await this.notificationService.sendPushNotification(
          parentUser.fcmToken,
          'Attendance Alert',
          `${studentName} was absent today (${formattedDate})`,
          { type: 'ATTENDANCE', studentId, date },
        );
      }

      // Real-time socket notification
      this.notificationGateway.broadcastAbsenceAlert(tenantSlug, parentUser.id, {
        studentName,
        date: formattedDate,
        class: `${className}-${sectionName}`,
      });

      // Save in-app notification
      await db.notification.create({
        data: {
          userId: parentUser.id,
          title: 'Attendance Alert',
          body: message,
          type: 'ATTENDANCE',
          data: { studentId, date },
          channel: ['IN_APP', 'PUSH'],
        },
      });
    }

    this.logger.log(`Absence notification sent for student ${studentId} on ${date}`);
  }

  @Process('send-daily-attendance-report')
  async handleDailyReport(job: Job<{ tenantSlug: string; date: string }>) {
    const { tenantSlug, date } = job.data;
    this.logger.log(`Generating daily attendance report for ${tenantSlug} on ${date}`);

    const school = await this.centralPrisma.school.findUnique({ where: { slug: tenantSlug } });
    if (!school) return;

    const db = this.prismaManager.getClient(this.buildDbUrl(school.dbName), tenantSlug);

    const stats = await db.attendance.groupBy({
      by: ['status'],
      _count: { id: true },
      where: { date: new Date(date) },
    });

    // Notify school admin
    const admins = await db.user.findMany({
      where: { role: 'SCHOOL_ADMIN', isActive: true },
      select: { id: true, email: true, fcmToken: true },
    });

    for (const admin of admins) {
      const summary = stats.map(s => `${s.status}: ${s._count.id}`).join(', ');
      this.notificationGateway.sendToUser(admin.id, 'daily-report', { date, summary, stats });
    }
  }

  @OnQueueFailed()
  onFailed(job: Job, error: Error) {
    this.logger.error(`Job ${job.id} failed: ${error.message}`, error.stack);
  }

  @OnQueueCompleted()
  onCompleted(job: Job) {
    this.logger.log(`Job ${job.id} (${job.name}) completed`);
  }

  private buildDbUrl(dbName: string): string {
    const host = process.env.DB_HOST || 'localhost';
    const port = process.env.DB_PORT || '5432';
    const user = process.env.DB_USER || 'postgres';
    const pass = process.env.DB_PASSWORD || '';
    return `postgresql://${user}:${pass}@${host}:${port}/${dbName}`;
  }
}
