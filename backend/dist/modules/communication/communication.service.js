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
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommunicationService = void 0;
const common_1 = require("@nestjs/common");
const tenant_prisma_service_1 = require("../../database/tenant-prisma.service");
const pagination_dto_1 = require("../../common/dto/pagination.dto");
let CommunicationService = class CommunicationService {
    constructor(tenantPrisma) {
        this.tenantPrisma = tenantPrisma;
    }
    get db() { return this.tenantPrisma.db; }
    async getAnnouncements(query) {
        const where = { isPublished: true };
        if (query.role)
            where.OR = [{ targetRole: null }, { targetRole: query.role }];
        const [data, total] = await Promise.all([
            this.db.announcement.findMany({ where, ...(0, pagination_dto_1.getPaginationArgs)(query), orderBy: { createdAt: 'desc' } }),
            this.db.announcement.count({ where }),
        ]);
        return { data, meta: (0, pagination_dto_1.buildPaginationMeta)(total, query) };
    }
    async createAnnouncement(dto, createdBy) {
        const data = await this.db.announcement.create({
            data: { title: dto.title, content: dto.content, targetRole: dto.targetRole || null, attachments: dto.attachments || [], isPublished: true, publishedAt: new Date(), createdBy },
        });
        return { data, message: 'Announcement created' };
    }
    async getCirculars(query) {
        const [data, total] = await Promise.all([
            this.db.circular.findMany({ orderBy: { issuedDate: 'desc' } }),
            this.db.circular.count(),
        ]);
        return { data, meta: (0, pagination_dto_1.buildPaginationMeta)(total, query) };
    }
    async createCircular(dto, createdBy) {
        const circularNo = await this.generateCircularNo();
        const data = await this.db.circular.create({
            data: { circularNo, title: dto.title, content: dto.content, fileUrl: dto.fileUrl, issuedDate: new Date(dto.issuedDate), createdBy },
        });
        return { data, message: 'Circular created' };
    }
    async getMessages(userId, query) {
        const [data, total] = await Promise.all([
            this.db.message.findMany({ where: { toUserId: userId }, ...(0, pagination_dto_1.getPaginationArgs)(query), orderBy: { createdAt: 'desc' } }),
            this.db.message.count({ where: { toUserId: userId } }),
        ]);
        return { data, meta: (0, pagination_dto_1.buildPaginationMeta)(total, query) };
    }
    async sendMessage(fromUserId, dto) {
        const data = await this.db.message.create({
            data: { fromUserId, toUserId: dto.toUserId, subject: dto.subject, content: dto.content },
        });
        return { data, message: 'Message sent' };
    }
    async getNotifications(userId, query) {
        const [data, total] = await Promise.all([
            this.db.notification.findMany({ where: { userId }, ...(0, pagination_dto_1.getPaginationArgs)(query), orderBy: { createdAt: 'desc' } }),
            this.db.notification.count({ where: { userId } }),
        ]);
        return { data, meta: (0, pagination_dto_1.buildPaginationMeta)(total, query) };
    }
    async markNotificationRead(id) {
        const data = await this.db.notification.update({ where: { id }, data: { isRead: true } });
        return { data, message: 'Marked as read' };
    }
    async markAllNotificationsRead(userId) {
        await this.db.notification.updateMany({ where: { userId, isRead: false }, data: { isRead: true } });
        return { message: 'All notifications marked as read' };
    }
    async broadcastMessage(dto) {
        const db = this.db;
        const { targetRoles, channels } = dto;
        const users = await db.user.findMany({
            where: {
                role: { in: targetRoles },
                isActive: true,
            },
            select: { id: true, email: true, phone: true, fcmToken: true },
        });
        if (channels.includes('IN_APP')) {
            await db.notification.createMany({
                data: users.map((u) => ({
                    userId: u.id,
                    title: dto.title,
                    body: dto.content,
                    type: 'GENERAL',
                    channel: channels,
                    data: { broadcastId: Date.now() },
                })),
                skipDuplicates: true,
            });
        }
        return {
            data: {
                totalRecipients: users.length,
                targetRoles,
                channels,
                title: dto.title,
            },
            message: `Broadcast queued for ${users.length} users`,
        };
    }
    async getEvents(query) {
        const where = {};
        const [data, total] = await Promise.all([
            this.db.announcement.findMany({ where, ...(0, pagination_dto_1.getPaginationArgs)(query), orderBy: { createdAt: 'desc' } }),
            this.db.announcement.count({ where }),
        ]);
        return { data, meta: (0, pagination_dto_1.buildPaginationMeta)(total, query) };
    }
    async createEvent(dto, createdBy) {
        const data = await this.db.announcement.create({
            data: { ...dto, createdBy, isPublished: true, publishedAt: new Date() },
        });
        return { data, message: 'Event created' };
    }
    async generateCircularNo() {
        const count = await this.db.circular.count();
        return `CIR-${new Date().getFullYear()}-${String(count + 1).padStart(4, '0')}`;
    }
};
exports.CommunicationService = CommunicationService;
exports.CommunicationService = CommunicationService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [tenant_prisma_service_1.TenantPrismaService])
], CommunicationService);
//# sourceMappingURL=communication.service.js.map