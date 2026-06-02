import { OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
export declare class NotificationGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
    private readonly jwtService;
    private readonly configService;
    server: Server;
    private readonly logger;
    private readonly connectedUsers;
    private readonly tenantRooms;
    constructor(jwtService: JwtService, configService: ConfigService);
    afterInit(server: Server): void;
    handleConnection(client: Socket): Promise<void>;
    handleDisconnect(client: Socket): void;
    handlePing(client: Socket): void;
    handleMarkRead(data: {
        notificationId: string;
    }, client: Socket): void;
    sendToUser(userId: string, event: string, data: any): void;
    sendToTenant(tenantSlug: string, event: string, data: any): void;
    sendToRole(tenantSlug: string, role: string, event: string, data: any): void;
    broadcastFeeReminder(tenantSlug: string, data: {
        studentId: string;
        studentName: string;
        amount: number;
        dueDate: string;
    }): void;
    broadcastAbsenceAlert(tenantSlug: string, parentUserId: string, data: {
        studentName: string;
        date: string;
        class: string;
    }): void;
    broadcastAnnouncement(tenantSlug: string, targetRole: string | null, data: any): void;
    broadcastResultPublished(tenantSlug: string, data: {
        examName: string;
        className: string;
    }): void;
    getOnlineCount(tenantSlug?: string): number;
}
