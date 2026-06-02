"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var ReportCardsProcessor_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReportCardsProcessor = void 0;
const bull_1 = require("@nestjs/bull");
const common_1 = require("@nestjs/common");
const pdf_service_1 = require("../modules/pdf/pdf.service");
const storage_service_1 = require("../modules/storage/storage.service");
const central_prisma_service_1 = require("../database/central-prisma.service");
const prisma_client_manager_service_1 = require("../database/prisma-client-manager.service");
const notification_gateway_1 = require("../gateways/notification.gateway");
const notification_service_1 = require("../modules/notification/notification.service");
let ReportCardsProcessor = ReportCardsProcessor_1 = class ReportCardsProcessor {
    constructor(pdfService, storageService, centralPrisma, prismaManager, notificationGateway, notificationService) {
        this.pdfService = pdfService;
        this.storageService = storageService;
        this.centralPrisma = centralPrisma;
        this.prismaManager = prismaManager;
        this.notificationGateway = notificationGateway;
        this.notificationService = notificationService;
        this.logger = new common_1.Logger(ReportCardsProcessor_1.name);
    }
    async handleGenerateReportCards(job) {
        const { examScheduleId, sectionId, tenantSlug, requestedBy } = job.data;
        this.logger.log(`Generating report cards for section ${sectionId}, exam ${examScheduleId}`);
        const school = await this.centralPrisma.school.findUnique({ where: { slug: tenantSlug } });
        if (!school)
            throw new Error(`School ${tenantSlug} not found`);
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
                if (!results.length)
                    continue;
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
                const { url, key } = await this.storageService.uploadFile(pdfBuffer, `report-card-${ss.studentId}-${examScheduleId}.pdf`, `report-cards/${tenantSlug}`, 'application/pdf');
                this.logger.log(`Report card uploaded: ${url}`);
                for (const sp of ss.student.parents) {
                    const parentUser = sp.parent.user;
                    const studentName = `${ss.student.firstName} ${ss.student.lastName}`;
                    if (parentUser.fcmToken) {
                        await this.notificationService.sendPushNotification(parentUser.fcmToken, 'Report Card Ready', `${studentName}'s ${schedule.examType.name} report card is now available`, { type: 'EXAM', url, examScheduleId });
                    }
                    if (parentUser.email) {
                        await this.notificationService.sendEmail(parentUser.email, `Report Card - ${studentName} - ${schedule.examType.name}`, `<p>Dear Parent, ${studentName}'s report card is ready. <a href="${url}">Download Report Card</a></p>`);
                    }
                }
                generatedCount.success++;
            }
            catch (err) {
                this.logger.error(`Failed to generate report card for student ${ss.studentId}: ${err.message}`);
                generatedCount.failed++;
            }
        }
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
    onFailed(job, error) {
        this.logger.error(`Report card job ${job.id} failed: ${error.message}`, error.stack);
    }
    onCompleted(job, result) {
        this.logger.log(`Report card job ${job.id} completed: ${JSON.stringify(result)}`);
    }
    getGrade(percentage) {
        if (percentage >= 90)
            return 'A+';
        if (percentage >= 80)
            return 'A';
        if (percentage >= 70)
            return 'B+';
        if (percentage >= 60)
            return 'B';
        if (percentage >= 50)
            return 'C';
        if (percentage >= 33)
            return 'D';
        return 'F';
    }
    buildDbUrl(dbName) {
        const { DB_HOST = 'localhost', DB_PORT = '5432', DB_USER = 'postgres', DB_PASSWORD = '' } = process.env;
        return `postgresql://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${dbName}`;
    }
};
exports.ReportCardsProcessor = ReportCardsProcessor;
__decorate([
    (0, bull_1.Process)('generate-report-cards'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ReportCardsProcessor.prototype, "handleGenerateReportCards", null);
__decorate([
    (0, bull_1.OnQueueFailed)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Error]),
    __metadata("design:returntype", void 0)
], ReportCardsProcessor.prototype, "onFailed", null);
__decorate([
    (0, bull_1.OnQueueCompleted)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], ReportCardsProcessor.prototype, "onCompleted", null);
exports.ReportCardsProcessor = ReportCardsProcessor = ReportCardsProcessor_1 = __decorate([
    (0, common_1.Injectable)(),
    (0, bull_1.Processor)('report-cards'),
    __metadata("design:paramtypes", [pdf_service_1.PdfService,
        storage_service_1.StorageService,
        central_prisma_service_1.CentralPrismaService,
        prisma_client_manager_service_1.PrismaClientManager,
        notification_gateway_1.NotificationGateway,
        notification_service_1.NotificationService])
], ReportCardsProcessor);
//# sourceMappingURL=report-cards.processor.js.map