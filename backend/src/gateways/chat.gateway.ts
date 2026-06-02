import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
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
  namespace: '/chat',
})
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  private readonly logger = new Logger(ChatGateway.name);

  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async handleConnection(client: Socket) {
    try {
      const token = client.handshake.auth?.token;
      if (!token) { client.disconnect(true); return; }
      const payload = this.jwtService.verify(token, { secret: this.configService.get('JWT_SECRET') });
      client.data.userId = payload.sub;
      client.data.role = payload.role;
      client.data.tenantSlug = client.handshake.auth?.tenantSlug;
      client.join(`user:${payload.sub}`);
      this.logger.log(`Chat client connected: ${client.id} (user: ${payload.sub})`);
    } catch { client.disconnect(true); }
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`Chat client disconnected: ${client.id}`);
  }

  @SubscribeMessage('send-message')
  handleMessage(
    @MessageBody() data: { toUserId: string; content: string; subject?: string },
    @ConnectedSocket() client: Socket,
  ) {
    const message = {
      fromUserId: client.data.userId,
      toUserId: data.toUserId,
      content: data.content,
      subject: data.subject,
      timestamp: new Date().toISOString(),
      isRead: false,
    };

    // Deliver to recipient if online
    this.server.to(`user:${data.toUserId}`).emit('new-message', message);

    // Confirm delivery to sender
    client.emit('message-sent', message);
  }

  @SubscribeMessage('typing')
  handleTyping(
    @MessageBody() data: { toUserId: string },
    @ConnectedSocket() client: Socket,
  ) {
    this.server.to(`user:${data.toUserId}`).emit('user-typing', {
      fromUserId: client.data.userId,
    });
  }

  /** Send a system message to a user */
  sendSystemMessage(userId: string, message: string) {
    this.server.to(`user:${userId}`).emit('system-message', {
      content: message,
      timestamp: new Date().toISOString(),
    });
  }
}
