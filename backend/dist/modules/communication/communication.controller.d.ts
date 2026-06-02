import { CommunicationService } from './communication.service';
import { PaginationDto } from '../../common/dto/pagination.dto';
export declare class CommunicationController {
    private readonly communicationService;
    constructor(communicationService: CommunicationService);
    getAnnouncements(query: PaginationDto, role?: string, user?: any): Promise<{
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
    createAnnouncement(dto: any, userId: string): Promise<{
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
    getCirculars(query: PaginationDto): Promise<{
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
    createCircular(dto: any, userId: string): Promise<{
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
    sendMessage(userId: string, dto: any): Promise<{
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
    markRead(id: string): Promise<{
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
    markAllRead(userId: string): Promise<{
        message: string;
    }>;
    broadcast(dto: any, userId: string): Promise<{
        data: {
            totalRecipients: number;
            targetRoles: string[];
            channels: string[];
            title: string;
        };
        message: string;
    }>;
    getEvents(query: PaginationDto): Promise<{
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
    createEvent(dto: any, userId: string): Promise<{
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
}
