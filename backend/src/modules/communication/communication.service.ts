import { Injectable } from '@nestjs/common';
import { TenantPrismaService } from '../../database/tenant-prisma.service';
import { PaginationDto, buildPaginationMeta, getPaginationArgs } from '../../common/dto/pagination.dto';

@Injectable()
export class CommunicationService {
  constructor(private readonly tenantPrisma: TenantPrismaService) {}
  private get db() { return this.tenantPrisma.db; }

  async getAnnouncements(query: Partial<PaginationDto> & { role?: string }) {
    const where: any = { isPublished: true };
    if (query.role) where.OR = [{ targetRole: null }, { targetRole: query.role }];
    const [data, total] = await Promise.all([
      this.db.announcement.findMany({ where, ...getPaginationArgs(query), orderBy: { createdAt: 'desc' } }),
      this.db.announcement.count({ where }),
    ]);
    return { data, meta: buildPaginationMeta(total, query) };
  }

  async createAnnouncement(dto: any, createdBy: string) {
    const data = await this.db.announcement.create({
      data: { title: dto.title, content: dto.content, targetRole: dto.targetRole || null, attachments: dto.attachments || [], isPublished: true, publishedAt: new Date(), createdBy },
    });
    return { data, message: 'Announcement created' };
  }

  async getCirculars(query: Partial<PaginationDto>) {
    const [data, total] = await Promise.all([
      this.db.circular.findMany({   orderBy: { issuedDate: 'desc' } }),
      this.db.circular.count(),
    ]);
    return { data, meta: buildPaginationMeta(total, query) };
  }

  async createCircular(dto: any, createdBy: string) {
    const circularNo = await this.generateCircularNo();
    const data = await this.db.circular.create({
      data: { circularNo, title: dto.title, content: dto.content, fileUrl: dto.fileUrl, issuedDate: new Date(dto.issuedDate), createdBy },
    });
    return { data, message: 'Circular created' };
  }

  async getMessages(userId: string, query: PaginationDto) {
    const [data, total] = await Promise.all([
      this.db.message.findMany({ where: { toUserId: userId }, ...getPaginationArgs(query), orderBy: { createdAt: 'desc' } }),
      this.db.message.count({ where: { toUserId: userId } }),
    ]);
    return { data, meta: buildPaginationMeta(total, query) };
  }

  async sendMessage(fromUserId: string, dto: any) {
    const data = await this.db.message.create({
      data: { fromUserId, toUserId: dto.toUserId, subject: dto.subject, content: dto.content },
    });
    return { data, message: 'Message sent' };
  }

  async getNotifications(userId: string, query: PaginationDto) {
    const [data, total] = await Promise.all([
      this.db.notification.findMany({ where: { userId }, ...getPaginationArgs(query), orderBy: { createdAt: 'desc' } }),
      this.db.notification.count({ where: { userId } }),
    ]);
    return { data, meta: buildPaginationMeta(total, query) };
  }

  async markNotificationRead(id: string) {
    const data = await this.db.notification.update({ where: { id }, data: { isRead: true } });
    return { data, message: 'Marked as read' };
  }

  async markAllNotificationsRead(userId: string) {
    await this.db.notification.updateMany({ where: { userId, isRead: false }, data: { isRead: true } });
    return { message: 'All notifications marked as read' };
  }

  // ─── BROADCAST MESSAGING ──────────────────────────────────────────────────

  /** Send bulk message/notification to all users of specified role(s) */
  async broadcastMessage(dto: {
    title: string;
    content: string;
    targetRoles: string[];
    channels: string[]; // IN_APP, SMS, EMAIL, PUSH, WHATSAPP
    attachments?: string[];
    createdBy: string;
  }) {
    const db = this.db;
    const { targetRoles, channels } = dto;

    // Get all users matching the target roles
    const users = await db.user.findMany({
      where: {
        role: { in: targetRoles as any[] },
        isActive: true,
      },
      select: { id: true, email: true, phone: true, fcmToken: true },
    });

    // Create in-app notifications for all
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

    // Return broadcast summary (actual SMS/Email/Push handled by queue)
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

  /** Get event notifications/calendar */
  async getEvents(query: Partial<PaginationDto> & { fromDate?: string; toDate?: string }) {
    // Events are stored as announcements with type EVENT
    const where: any = {};
    const [data, total] = await Promise.all([
      this.db.announcement.findMany({ where, ...getPaginationArgs(query), orderBy: { createdAt: 'desc' } }),
      this.db.announcement.count({ where }),
    ]);
    return { data, meta: buildPaginationMeta(total, query) };
  }

  async createEvent(dto: any, createdBy: string) {
    const data = await this.db.announcement.create({
      data: { ...dto, createdBy, isPublished: true, publishedAt: new Date() },
    });
    return { data, message: 'Event created' };
  }

  private async generateCircularNo(): Promise<string> {
    const count = await this.db.circular.count();
    return `CIR-${new Date().getFullYear()}-${String(count + 1).padStart(4, '0')}`;
  }
}
