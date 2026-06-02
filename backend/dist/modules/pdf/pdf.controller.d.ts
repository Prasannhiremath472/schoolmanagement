import { Response } from 'express';
import { PdfService } from './pdf.service';
import { TenantPrismaService } from '../../database/tenant-prisma.service';
export declare class PdfController {
    private readonly pdfService;
    private readonly tenantPrisma;
    constructor(pdfService: PdfService, tenantPrisma: TenantPrismaService);
    downloadReceipt(paymentId: string, res: Response): Promise<void>;
    downloadReportCard(studentId: string, examScheduleId: string, res: Response): Promise<void>;
    downloadAttendanceReport(sectionId: string, month: number, year: number, res: Response): Promise<void>;
    downloadPayslip(salaryId: string, res: Response): Promise<void>;
    private getGrade;
}
