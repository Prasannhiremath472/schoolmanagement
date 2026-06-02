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
import { Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@WebSocketGateway({
  cors: { origin: '*', credentials: true },
  namespace: '/attendance',
})
export class AttendanceGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer()
  server: Server;

  private readonly logger = new Logger(AttendanceGateway.name);

  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  afterInit() {
    this.logger.log('AttendanceGateway initialized');
  }

  async handleConnection(client: Socket) {
    try {
      const token = client.handshake.auth?.token;
      if (!token) { client.disconnect(true); return; }

      const payload = this.jwtService.verify(token, {
        secret: this.configService.get('JWT_SECRET'),
      });

      client.data.userId = payload.sub;
      client.data.role = payload.role;
      client.data.tenantSlug = client.handshake.auth?.tenantSlug;

      this.logger.log(`Attendance client connected: ${client.id}`);
    } catch {
      client.disconnect(true);
    }
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`Attendance client disconnected: ${client.id}`);
  }

  /** Teacher joins a section room to get live attendance updates */
  @SubscribeMessage('join-section')
  handleJoinSection(
    @MessageBody() data: { sectionId: string; date: string },
    @ConnectedSocket() client: Socket,
  ) {
    const room = `section:${data.sectionId}:${data.date}`;
    client.join(room);
    client.emit('joined-section', { room, sectionId: data.sectionId, date: data.date });
    this.logger.log(`Client ${client.id} joined section room: ${room}`);
  }

  @SubscribeMessage('leave-section')
  handleLeaveSection(
    @MessageBody() data: { sectionId: string; date: string },
    @ConnectedSocket() client: Socket,
  ) {
    client.leave(`section:${data.sectionId}:${data.date}`);
  }

  /** Called by AttendanceService when a student's status is updated */
  broadcastAttendanceUpdate(sectionId: string, date: string, data: {
    studentId: string;
    studentName: string;
    status: string;
    remarks?: string;
    updatedBy: string;
  }) {
    const room = `section:${sectionId}:${date}`;
    this.server.to(room).emit('attendance-updated', {
      ...data,
      sectionId,
      date,
      timestamp: new Date().toISOString(),
    });
  }

  /** Broadcast attendance summary when all students are marked */
  broadcastAttendanceSummary(sectionId: string, date: string, summary: {
    total: number;
    present: number;
    absent: number;
    late: number;
  }) {
    const room = `section:${sectionId}:${date}`;
    this.server.to(room).emit('attendance-summary', { sectionId, date, ...summary });
  }

  /** QR code scan attendance - validate and mark */
  @SubscribeMessage('qr-scan')
  handleQrScan(
    @MessageBody() data: { payload: string; sectionId: string },
    @ConnectedSocket() client: Socket,
  ) {
    try {
      const qrData = JSON.parse(data.payload);

      if (qrData.sectionId !== data.sectionId) {
        client.emit('qr-error', { message: 'QR code is for a different section' });
        return;
      }

      const isExpired = Date.now() - qrData.ts > 5 * 60 * 1000; // 5 min expiry
      if (isExpired) {
        client.emit('qr-error', { message: 'QR code has expired. Please refresh.' });
        return;
      }

      client.emit('qr-valid', { sectionId: qrData.sectionId, date: qrData.date });
    } catch {
      client.emit('qr-error', { message: 'Invalid QR code' });
    }
  }
}
