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
var AttendanceNotificationsProcessor_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AttendanceNotificationsProcessor = void 0;
const bull_1 = require("@nestjs/bull");
const common_1 = require("@nestjs/common");
const prisma_client_manager_service_1 = require("../database/prisma-client-manager.service");
const central_prisma_service_1 = require("../database/central-prisma.service");
const notification_service_1 = require("../modules/notification/notification.service");
const notification_gateway_1 = require("../gateways/notification.gateway");
let AttendanceNotificationsProcessor = AttendanceNotificationsProcessor_1 = class AttendanceNotificationsProcessor {
    constructor(prismaManager, centralPrisma, notificationService, notificationGateway) {
        this.prismaManager = prismaManager;
        this.centralPrisma = centralPrisma;
        this.notificationService = notificationService;
        this.notificationGateway = notificationGateway;
        this.logger = new common_1.Logger(AttendanceNotificationsProcessor_1.name);
    }
    async handleAbsentNotification(job) {
        const { studentId, date, tenantSlug } = job.data;
        const school = await this.centralPrisma.school.findUnique({
            where: { slug: tenantSlug },
            include: { schoolSettings: true },
        });
        if (!school)
            return;
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
            if (parent.phone || parentUser.phone) {
                await this.notificationService.sendSms(parent.phone || parentUser.phone, message);
            }
            if (parent.email || parentUser.email) {
                await this.notificationService.sendEmail(parent.email || parentUser.email, `Attendance Alert - ${studentName} Absent`, `<p>${message}</p><p>If you have any queries, please contact the school.</p>`);
            }
            if (parentUser.fcmToken) {
                await this.notificationService.sendPushNotification(parentUser.fcmToken, 'Attendance Alert', `${studentName} was absent today (${formattedDate})`, { type: 'ATTENDANCE', studentId, date });
            }
            this.notificationGateway.broadcastAbsenceAlert(tenantSlug, parentUser.id, {
                studentName,
                date: formattedDate,
                class: `${className}-${sectionName}`,
            });
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
    async handleDailyReport(job) {
        const { tenantSlug, date } = job.data;
        this.logger.log(`Generating daily attendance report for ${tenantSlug} on ${date}`);
        const school = await this.centralPrisma.school.findUnique({ where: { slug: tenantSlug } });
        if (!school)
            return;
        const db = this.prismaManager.getClient(this.buildDbUrl(school.dbName), tenantSlug);
        const stats = await db.attendance.groupBy({
            by: ['status'],
            _count: { id: true },
            where: { date: new Date(date) },
        });
        const admins = await db.user.findMany({
            where: { role: 'SCHOOL_ADMIN', isActive: true },
            select: { id: true, email: true, fcmToken: true },
        });
        for (const admin of admins) {
            const summary = stats.map(s => `${s.status}: ${s._count.id}`).join(', ');
            this.notificationGateway.sendToUser(admin.id, 'daily-report', { date, summary, stats });
        }
    }
    onFailed(job, error) {
        this.logger.error(`Job ${job.id} failed: ${error.message}`, error.stack);
    }
    onCompleted(job) {
        this.logger.log(`Job ${job.id} (${job.name}) completed`);
    }
    buildDbUrl(dbName) {
        const host = process.env.DB_HOST || 'localhost';
        const port = process.env.DB_PORT || '5432';
        const user = process.env.DB_USER || 'postgres';
        const pass = process.env.DB_PASSWORD || '';
        return `postgresql://${user}:${pass}@${host}:${port}/${dbName}`;
    }
};
exports.AttendanceNotificationsProcessor = AttendanceNotificationsProcessor;
__decorate([
    (0, bull_1.Process)('send-absent-notification'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AttendanceNotificationsProcessor.prototype, "handleAbsentNotification", null);
__decorate([
    (0, bull_1.Process)('send-daily-attendance-report'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AttendanceNotificationsProcessor.prototype, "handleDailyReport", null);
__decorate([
    (0, bull_1.OnQueueFailed)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Error]),
    __metadata("design:returntype", void 0)
], AttendanceNotificationsProcessor.prototype, "onFailed", null);
__decorate([
    (0, bull_1.OnQueueCompleted)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AttendanceNotificationsProcessor.prototype, "onCompleted", null);
exports.AttendanceNotificationsProcessor = AttendanceNotificationsProcessor = AttendanceNotificationsProcessor_1 = __decorate([
    (0, common_1.Injectable)(),
    (0, bull_1.Processor)('attendance-notifications'),
    __metadata("design:paramtypes", [prisma_client_manager_service_1.PrismaClientManager,
        central_prisma_service_1.CentralPrismaService,
        notification_service_1.NotificationService,
        notification_gateway_1.NotificationGateway])
], AttendanceNotificationsProcessor);
//# sourceMappingURL=attendance-notifications.processor.js.map