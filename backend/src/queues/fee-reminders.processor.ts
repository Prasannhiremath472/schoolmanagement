import { Process, Processor, OnQueueFailed } from '@nestjs/bull';
import { Logger, Injectable } from '@nestjs/common';
import { Job } from 'bull';
import { Cron, CronExpression } from '@nestjs/schedule';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';
import { CentralPrismaService } from '../database/central-prisma.service';
import { PrismaClientManager } from '../database/prisma-client-manager.service';
import { NotificationService } from '../modules/notification/notification.service';
import { NotificationGateway } from '../gateways/notification.gateway';

interface FeeReminderJobData {
  studentId: string;
  installmentId: string;
  tenantSlug: string;
}

@Injectable()
@Processor('fee-reminders')
export class FeeRemindersProcessor {
  private readonly logger = new Logger(FeeRemindersProcessor.name);

  constructor(
    @InjectQueue('fee-reminders') private readonly feeQueue: Queue,
    private readonly centralPrisma: CentralPrismaService,
    private readonly prismaManager: PrismaClientManager,
    private readonly notificationService: NotificationService,
    private readonly notificationGateway: NotificationGateway,
  ) {}

  @Process('send-fee-reminder')
  async handleFeeReminder(job: Job<FeeReminderJobData>) {
    const { studentId, installmentId, tenantSlug } = job.data;

    const school = await this.centralPrisma.school.findUnique({ where: { slug: tenantSlug } });
    if (!school) return;

    const db = this.prismaManager.getClient(this.buildDbUrl(school.dbName), tenantSlug);

    const [student, installment] = await Promise.all([
      db.student.findUnique({
        where: { id: studentId },
        include: {
          parents: {
            include: { parent: { include: { user: { select: { id: true, phone: true, email: true, fcmToken: true } } } } },
          },
        },
      }),
      db.feeInstallment.findUnique({ where: { id: installmentId } }),
    ]);

    if (!student || !installment) return;

    const studentName = `${student.firstName} ${student.lastName}`;
    const amount = Number(installment.amount);
    const dueDate = new Date(installment.dueDate).toLocaleDateString('en-IN');
    const message = `Reminder: Fee of ₹${amount.toLocaleString()} for ${installment.name} is due on ${dueDate} for ${studentName}. Please pay to avoid late fine.`;

    for (const sp of student.parents) {
      const parentUser = sp.parent.user;

      if (sp.parent.phone) {
        await this.notificationService.sendSms(sp.parent.phone, message);
      }

      if (sp.parent.email) {
        await this.notificationService.sendEmail(
          sp.parent.email,
          `Fee Reminder - ${studentName}`,
          `<div style="font-family:sans-serif;padding:20px">
            <h2>Fee Payment Reminder</h2>
            <p>Dear Parent,</p>
            <p>This is a reminder that the following fee is due:</p>
            <table border="1" cellpadding="8" style="border-collapse:collapse">
              <tr><td><b>Student</b></td><td>${studentName}</td></tr>
              <tr><td><b>Fee Type</b></td><td>${installment.name}</td></tr>
              <tr><td><b>Amount</b></td><td>₹${amount.toLocaleString()}</td></tr>
              <tr><td><b>Due Date</b></td><td>${dueDate}</td></tr>
            </table>
            <p style="color:red">Please pay before the due date to avoid late charges.</p>
          </div>`,
        );
      }

      if (parentUser.fcmToken) {
        await this.notificationService.sendPushNotification(
          parentUser.fcmToken,
          'Fee Reminder',
          `₹${amount.toLocaleString()} due on ${dueDate} for ${studentName}`,
          { type: 'FEE', studentId, installmentId, amount: String(amount) },
        );
      }

      // Real-time
      this.notificationGateway.broadcastFeeReminder(tenantSlug, {
        studentId,
        studentName,
        amount,
        dueDate,
      });

      // In-app notification
      await db.notification.create({
        data: {
          userId: parentUser.id,
          title: 'Fee Reminder',
          body: message,
          type: 'FEE',
          data: { studentId, installmentId, amount, dueDate },
          channel: ['IN_APP', 'PUSH', 'SMS'],
        },
      });
    }

    this.logger.log(`Fee reminder sent for student ${studentId}, installment ${installmentId}`);
  }

  /** Run every day at 9 AM — auto-queue due fee reminders */
  @Cron(CronExpression.EVERY_DAY_AT_9AM)
  async scheduleDueReminders() {
    this.logger.log('Running daily fee due reminder scheduler...');

    const schools = await this.centralPrisma.school.findMany({
      where: { status: 'ACTIVE' },
      select: { slug: true, dbName: true },
    });

    for (const school of schools) {
      const db = this.prismaManager.getClient(this.buildDbUrl(school.dbName), school.slug);

      // Find installments due in next 3 days
      const threeDaysLater = new Date();
      threeDaysLater.setDate(threeDaysLater.getDate() + 3);

      const dueInstallments = await db.feeInstallment.findMany({
        where: {
          dueDate: { lte: threeDaysLater, gte: new Date() },
        },
        include: { feeStructure: { include: { class: { include: { sections: { include: { students: { where: { isActive: true } } } } } } } } },
      });

      for (const inst of dueInstallments) {
        for (const cls of inst.feeStructure.class.sections) {
          for (const ss of cls.students) {
            // Check if payment already made
            const existingPayment = await db.feePayment.findFirst({
              where: { studentId: ss.studentId, installmentId: inst.id, dueAmount: { lte: 0 } },
            });

            if (!existingPayment) {
              await this.feeQueue.add('send-fee-reminder', {
                studentId: ss.studentId,
                installmentId: inst.id,
                tenantSlug: school.slug,
              }, { delay: Math.random() * 60000 }); // Stagger over 1 min
            }
          }
        }
      }
    }
  }

  @OnQueueFailed()
  onFailed(job: Job, error: Error) {
    this.logger.error(`Fee reminder job ${job.id} failed: ${error.message}`);
  }

  private buildDbUrl(dbName: string): string {
    const { DB_HOST = 'localhost', DB_PORT = '5432', DB_USER = 'postgres', DB_PASSWORD = '' } = process.env;
    return `postgresql://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${dbName}`;
  }
}
