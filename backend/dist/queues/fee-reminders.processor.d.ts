import { Job } from 'bull';
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
export declare class FeeRemindersProcessor {
    private readonly feeQueue;
    private readonly centralPrisma;
    private readonly prismaManager;
    private readonly notificationService;
    private readonly notificationGateway;
    private readonly logger;
    constructor(feeQueue: Queue, centralPrisma: CentralPrismaService, prismaManager: PrismaClientManager, notificationService: NotificationService, notificationGateway: NotificationGateway);
    handleFeeReminder(job: Job<FeeReminderJobData>): Promise<void>;
    scheduleDueReminders(): Promise<void>;
    onFailed(job: Job, error: Error): void;
    private buildDbUrl;
}
export {};
