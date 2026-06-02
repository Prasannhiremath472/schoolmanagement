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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var FeeRemindersProcessor_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.FeeRemindersProcessor = void 0;
const bull_1 = require("@nestjs/bull");
const common_1 = require("@nestjs/common");
const schedule_1 = require("@nestjs/schedule");
const bull_2 = require("@nestjs/bull");
const central_prisma_service_1 = require("../database/central-prisma.service");
const prisma_client_manager_service_1 = require("../database/prisma-client-manager.service");
const notification_service_1 = require("../modules/notification/notification.service");
const notification_gateway_1 = require("../gateways/notification.gateway");
let FeeRemindersProcessor = FeeRemindersProcessor_1 = class FeeRemindersProcessor {
    constructor(feeQueue, centralPrisma, prismaManager, notificationService, notificationGateway) {
        this.feeQueue = feeQueue;
        this.centralPrisma = centralPrisma;
        this.prismaManager = prismaManager;
        this.notificationService = notificationService;
        this.notificationGateway = notificationGateway;
        this.logger = new common_1.Logger(FeeRemindersProcessor_1.name);
    }
    async handleFeeReminder(job) {
        const { studentId, installmentId, tenantSlug } = job.data;
        const school = await this.centralPrisma.school.findUnique({ where: { slug: tenantSlug } });
        if (!school)
            return;
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
        if (!student || !installment)
            return;
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
                await this.notificationService.sendEmail(sp.parent.email, `Fee Reminder - ${studentName}`, `<div style="font-family:sans-serif;padding:20px">
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
          </div>`);
            }
            if (parentUser.fcmToken) {
                await this.notificationService.sendPushNotification(parentUser.fcmToken, 'Fee Reminder', `₹${amount.toLocaleString()} due on ${dueDate} for ${studentName}`, { type: 'FEE', studentId, installmentId, amount: String(amount) });
            }
            this.notificationGateway.broadcastFeeReminder(tenantSlug, {
                studentId,
                studentName,
                amount,
                dueDate,
            });
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
    async scheduleDueReminders() {
        this.logger.log('Running daily fee due reminder scheduler...');
        const schools = await this.centralPrisma.school.findMany({
            where: { status: 'ACTIVE' },
            select: { slug: true, dbName: true },
        });
        for (const school of schools) {
            const db = this.prismaManager.getClient(this.buildDbUrl(school.dbName), school.slug);
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
                        const existingPayment = await db.feePayment.findFirst({
                            where: { studentId: ss.studentId, installmentId: inst.id, dueAmount: { lte: 0 } },
                        });
                        if (!existingPayment) {
                            await this.feeQueue.add('send-fee-reminder', {
                                studentId: ss.studentId,
                                installmentId: inst.id,
                                tenantSlug: school.slug,
                            }, { delay: Math.random() * 60000 });
                        }
                    }
                }
            }
        }
    }
    onFailed(job, error) {
        this.logger.error(`Fee reminder job ${job.id} failed: ${error.message}`);
    }
    buildDbUrl(dbName) {
        const { DB_HOST = 'localhost', DB_PORT = '5432', DB_USER = 'postgres', DB_PASSWORD = '' } = process.env;
        return `postgresql://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${dbName}`;
    }
};
exports.FeeRemindersProcessor = FeeRemindersProcessor;
__decorate([
    (0, bull_1.Process)('send-fee-reminder'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], FeeRemindersProcessor.prototype, "handleFeeReminder", null);
__decorate([
    (0, schedule_1.Cron)(schedule_1.CronExpression.EVERY_DAY_AT_9AM),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], FeeRemindersProcessor.prototype, "scheduleDueReminders", null);
__decorate([
    (0, bull_1.OnQueueFailed)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Error]),
    __metadata("design:returntype", void 0)
], FeeRemindersProcessor.prototype, "onFailed", null);
exports.FeeRemindersProcessor = FeeRemindersProcessor = FeeRemindersProcessor_1 = __decorate([
    (0, common_1.Injectable)(),
    (0, bull_1.Processor)('fee-reminders'),
    __param(0, (0, bull_2.InjectQueue)('fee-reminders')),
    __metadata("design:paramtypes", [Object, central_prisma_service_1.CentralPrismaService,
        prisma_client_manager_service_1.PrismaClientManager,
        notification_service_1.NotificationService,
        notification_gateway_1.NotificationGateway])
], FeeRemindersProcessor);
//# sourceMappingURL=fee-reminders.processor.js.map