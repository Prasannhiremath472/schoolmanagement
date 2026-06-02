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
export declare class ReportCardsProcessor {
    private readonly pdfService;
    private readonly storageService;
    private readonly centralPrisma;
    private readonly prismaManager;
    private readonly notificationGateway;
    private readonly notificationService;
    private readonly logger;
    constructor(pdfService: PdfService, storageService: StorageService, centralPrisma: CentralPrismaService, prismaManager: PrismaClientManager, notificationGateway: NotificationGateway, notificationService: NotificationService);
    handleGenerateReportCards(job: Job<ReportCardJobData>): Promise<{
        success: number;
        failed: number;
    }>;
    onFailed(job: Job, error: Error): void;
    onCompleted(job: Job, result: any): void;
    private getGrade;
    private buildDbUrl;
}
export {};
