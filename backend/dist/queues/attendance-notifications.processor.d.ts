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
export declare class AttendanceNotificationsProcessor {
    private readonly prismaManager;
    private readonly centralPrisma;
    private readonly notificationService;
    private readonly notificationGateway;
    private readonly logger;
    constructor(prismaManager: PrismaClientManager, centralPrisma: CentralPrismaService, notificationService: NotificationService, notificationGateway: NotificationGateway);
    handleAbsentNotification(job: Job<AbsenceJobData>): Promise<void>;
    handleDailyReport(job: Job<{
        tenantSlug: string;
        date: string;
    }>): Promise<void>;
    onFailed(job: Job, error: Error): void;
    onCompleted(job: Job): void;
    private buildDbUrl;
}
export {};
