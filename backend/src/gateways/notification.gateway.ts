import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  OnGatewayInit,
  OnGatewayConnection,
  OnGatewayDisconnect,
  MessageBody,
  ConnectedSocket,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { Logger, UseGuards } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@WebSocketGateway({
  cors: { origin: '*', credentials: true },
  namespace: '/notifications',
  transports: ['websocket', 'polling'],
})
export class NotificationGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer()
  server: Server;

  private readonly logger = new Logger(NotificationGateway.name);
  private readonly connectedUsers = new Map<string, Set<string>>(); // userId → Set<socketId>
  private readonly tenantRooms = new Map<string, Set<string>>(); // tenantSlug → Set<socketId>

  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  afterInit(server: Server) {
    this.logger.log('NotificationGateway initialized');
  }

  async handleConnection(client: Socket) {
    try {
      const token =
        client.handshake.auth?.token ||
        client.handshake.headers.authorization?.split(' ')[1];

      const tenantSlug =
        client.handshake.auth?.tenantSlug ||
        client.handshake.headers['x-tenant-id'];

      if (!token) {
        client.disconnect(true);
        return;
      }

      const payload = this.jwtService.verify(token, {
        secret: this.configService.get('JWT_SECRET'),
      });

      const userId = payload.sub;
      client.data.userId = userId;
      client.data.role = payload.role;
      client.data.tenantSlug = tenantSlug;

      // Join personal room
      client.join(`user:${userId}`);

      // Join tenant room
      if (tenantSlug) {
        client.join(`tenant:${tenantSlug}`);
      }

      // Join role-based room
      if (payload.role) {
        client.join(`role:${tenantSlug}:${payload.role}`);
      }

      // Track connection
      if (!this.connectedUsers.has(userId)) {
        this.connectedUsers.set(userId, new Set());
      }
      this.connectedUsers.get(userId)?.add(client.id);

      this.logger.log(`Client connected: ${client.id} (user: ${userId}, tenant: ${tenantSlug})`);

      client.emit('connected', {
        socketId: client.id,
        userId,
        message: 'Connected to notification service',
      });
    } catch (err) {
      this.logger.warn(`Connection rejected: ${err.message}`);
      client.disconnect(true);
    }
  }

  handleDisconnect(client: Socket) {
    const userId = client.data.userId;
    if (userId) {
      const sockets = this.connectedUsers.get(userId);
      if (sockets) {
        sockets.delete(client.id);
        if (sockets.size === 0) this.connectedUsers.delete(userId);
      }
    }
    this.logger.log(`Client disconnected: ${client.id}`);
  }

  @SubscribeMessage('ping')
  handlePing(@ConnectedSocket() client: Socket) {
    client.emit('pong', { timestamp: Date.now() });
  }

  @SubscribeMessage('mark-read')
  handleMarkRead(
    @MessageBody() data: { notificationId: string },
    @ConnectedSocket() client: Socket,
  ) {
    this.logger.log(`Mark read: ${data.notificationId} by user ${client.data.userId}`);
    client.emit('notification-read', { id: data.notificationId });
  }

  // ─── Emit Methods (called by services) ────────────────────────────────────

  /** Send notification to a specific user */
  sendToUser(userId: string, event: string, data: any) {
    this.server.to(`user:${userId}`).emit(event, data);
  }

  /** Send notification to all users in a tenant */
  sendToTenant(tenantSlug: string, event: string, data: any) {
    this.server.to(`tenant:${tenantSlug}`).emit(event, data);
  }

  /** Send to all users of a role in a tenant */
  sendToRole(tenantSlug: string, role: string, event: string, data: any) {
    this.server.to(`role:${tenantSlug}:${role}`).emit(event, data);
  }

  /** Broadcast fee reminder */
  broadcastFeeReminder(tenantSlug: string, data: {
    studentId: string;
    studentName: string;
    amount: number;
    dueDate: string;
  }) {
    this.sendToRole(tenantSlug, 'PARENT', 'fee-reminder', data);
    this.sendToRole(tenantSlug, 'SCHOOL_ADMIN', 'fee-reminder', data);
  }

  /** Broadcast absence alert to parent */
  broadcastAbsenceAlert(tenantSlug: string, parentUserId: string, data: {
    studentName: string;
    date: string;
    class: string;
  }) {
    this.sendToUser(parentUserId, 'absence-alert', {
      type: 'ATTENDANCE',
      ...data,
      timestamp: new Date().toISOString(),
    });
  }

  /** Broadcast new announcement */
  broadcastAnnouncement(tenantSlug: string, targetRole: string | null, data: any) {
    if (targetRole) {
      this.sendToRole(tenantSlug, targetRole, 'new-announcement', data);
    } else {
      this.sendToTenant(tenantSlug, 'new-announcement', data);
    }
  }

  /** Broadcast exam result published */
  broadcastResultPublished(tenantSlug: string, data: { examName: string; className: string }) {
    this.sendToRole(tenantSlug, 'STUDENT', 'result-published', data);
    this.sendToRole(tenantSlug, 'PARENT', 'result-published', data);
  }

  getOnlineCount(tenantSlug?: string): number {
    if (tenantSlug) {
      const room = this.server.sockets.adapter.rooms.get(`tenant:${tenantSlug}`);
      return room ? room.size : 0;
    }
    return this.connectedUsers.size;
  }
}
