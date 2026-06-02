import { TenantPrismaService } from '../../database/tenant-prisma.service';
import { PaginationDto } from '../../common/dto/pagination.dto';
export declare class CommunicationService {
    private readonly tenantPrisma;
    constructor(tenantPrisma: TenantPrismaService);
    private get db();
    getAnnouncements(query: Partial<PaginationDto> & {
        role?: string;
    }): Promise<{
        data: {
            id: string;
            createdAt: Date;
            title: string;
            attachments: import("../../generated/school-client/runtime/library").JsonValue;
            content: string;
            isPublished: boolean;
            targetRole: import("../../generated/school-client").$Enums.UserRole | null;
            publishedAt: Date | null;
            createdBy: string | null;
        }[];
        meta: {
            total: number;
            page: number;
            limit: number;
            totalPages: number;
            hasNext: boolean;
            hasPrev: boolean;
        };
    }>;
    createAnnouncement(dto: any, createdBy: string): Promise<{
        data: {
            id: string;
            createdAt: Date;
            title: string;
            attachments: import("../../generated/school-client/runtime/library").JsonValue;
            content: string;
            isPublished: boolean;
            targetRole: import("../../generated/school-client").$Enums.UserRole | null;
            publishedAt: Date | null;
            createdBy: string | null;
        };
        message: string;
    }>;
    getCirculars(query: Partial<PaginationDto>): Promise<{
        data: {
            id: string;
            createdAt: Date;
            title: string;
            content: string;
            fileUrl: string | null;
            createdBy: string | null;
            circularNo: string;
            issuedDate: Date;
        }[];
        meta: {
            total: number;
            page: number;
            limit: number;
            totalPages: number;
            hasNext: boolean;
            hasPrev: boolean;
        };
    }>;
    createCircular(dto: any, createdBy: string): Promise<{
        data: {
            id: string;
            createdAt: Date;
            title: string;
            content: string;
            fileUrl: string | null;
            createdBy: string | null;
            circularNo: string;
            issuedDate: Date;
        };
        message: string;
    }>;
    getMessages(userId: string, query: PaginationDto): Promise<{
        data: {
            id: string;
            createdAt: Date;
            subject: string | null;
            content: string;
            fromUserId: string;
            toUserId: string;
            isRead: boolean;
            readAt: Date | null;
        }[];
        meta: {
            total: number;
            page: number;
            limit: number;
            totalPages: number;
            hasNext: boolean;
            hasPrev: boolean;
        };
    }>;
    sendMessage(fromUserId: string, dto: any): Promise<{
        data: {
            id: string;
            createdAt: Date;
            subject: string | null;
            content: string;
            fromUserId: string;
            toUserId: string;
            isRead: boolean;
            readAt: Date | null;
        };
        message: string;
    }>;
    getNotifications(userId: string, query: PaginationDto): Promise<{
        data: {
            id: string;
            createdAt: Date;
            data: import("../../generated/school-client/runtime/library").JsonValue;
            userId: string;
            type: import("../../generated/school-client").$Enums.NotificationType;
            title: string;
            isRead: boolean;
            body: string;
            channel: string[];
        }[];
        meta: {
            total: number;
            page: number;
            limit: number;
            totalPages: number;
            hasNext: boolean;
            hasPrev: boolean;
        };
    }>;
    markNotificationRead(id: string): Promise<{
        data: {
            id: string;
            createdAt: Date;
            data: import("../../generated/school-client/runtime/library").JsonValue;
            userId: string;
            type: import("../../generated/school-client").$Enums.NotificationType;
            title: string;
            isRead: boolean;
            body: string;
            channel: string[];
        };
        message: string;
    }>;
    markAllNotificationsRead(userId: string): Promise<{
        message: string;
    }>;
    broadcastMessage(dto: {
        title: string;
        content: string;
        targetRoles: string[];
        channels: string[];
        attachments?: string[];
        createdBy: string;
    }): Promise<{
        data: {
            totalRecipients: number;
            targetRoles: string[];
            channels: string[];
            title: string;
        };
        message: string;
    }>;
    getEvents(query: Partial<PaginationDto> & {
        fromDate?: string;
        toDate?: string;
    }): Promise<{
        data: {
            id: string;
            createdAt: Date;
            title: string;
            attachments: import("../../generated/school-client/runtime/library").JsonValue;
            content: string;
            isPublished: boolean;
            targetRole: import("../../generated/school-client").$Enums.UserRole | null;
            publishedAt: Date | null;
            createdBy: string | null;
        }[];
        meta: {
            total: number;
            page: number;
            limit: number;
            totalPages: number;
            hasNext: boolean;
            hasPrev: boolean;
        };
    }>;
    createEvent(dto: any, createdBy: string): Promise<{
        data: {
            id: string;
            createdAt: Date;
            title: string;
            attachments: import("../../generated/school-client/runtime/library").JsonValue;
            content: string;
            isPublished: boolean;
            targetRole: import("../../generated/school-client").$Enums.UserRole | null;
            publishedAt: Date | null;
            createdBy: string | null;
        };
        message: string;
    }>;
    private generateCircularNo;
}
