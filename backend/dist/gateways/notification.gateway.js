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
var NotificationGateway_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificationGateway = void 0;
const websockets_1 = require("@nestjs/websockets");
const socket_io_1 = require("socket.io");
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const config_1 = require("@nestjs/config");
let NotificationGateway = NotificationGateway_1 = class NotificationGateway {
    constructor(jwtService, configService) {
        this.jwtService = jwtService;
        this.configService = configService;
        this.logger = new common_1.Logger(NotificationGateway_1.name);
        this.connectedUsers = new Map();
        this.tenantRooms = new Map();
    }
    afterInit(server) {
        this.logger.log('NotificationGateway initialized');
    }
    async handleConnection(client) {
        try {
            const token = client.handshake.auth?.token ||
                client.handshake.headers.authorization?.split(' ')[1];
            const tenantSlug = client.handshake.auth?.tenantSlug ||
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
            client.join(`user:${userId}`);
            if (tenantSlug) {
                client.join(`tenant:${tenantSlug}`);
            }
            if (payload.role) {
                client.join(`role:${tenantSlug}:${payload.role}`);
            }
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
        }
        catch (err) {
            this.logger.warn(`Connection rejected: ${err.message}`);
            client.disconnect(true);
        }
    }
    handleDisconnect(client) {
        const userId = client.data.userId;
        if (userId) {
            const sockets = this.connectedUsers.get(userId);
            if (sockets) {
                sockets.delete(client.id);
                if (sockets.size === 0)
                    this.connectedUsers.delete(userId);
            }
        }
        this.logger.log(`Client disconnected: ${client.id}`);
    }
    handlePing(client) {
        client.emit('pong', { timestamp: Date.now() });
    }
    handleMarkRead(data, client) {
        this.logger.log(`Mark read: ${data.notificationId} by user ${client.data.userId}`);
        client.emit('notification-read', { id: data.notificationId });
    }
    sendToUser(userId, event, data) {
        this.server.to(`user:${userId}`).emit(event, data);
    }
    sendToTenant(tenantSlug, event, data) {
        this.server.to(`tenant:${tenantSlug}`).emit(event, data);
    }
    sendToRole(tenantSlug, role, event, data) {
        this.server.to(`role:${tenantSlug}:${role}`).emit(event, data);
    }
    broadcastFeeReminder(tenantSlug, data) {
        this.sendToRole(tenantSlug, 'PARENT', 'fee-reminder', data);
        this.sendToRole(tenantSlug, 'SCHOOL_ADMIN', 'fee-reminder', data);
    }
    broadcastAbsenceAlert(tenantSlug, parentUserId, data) {
        this.sendToUser(parentUserId, 'absence-alert', {
            type: 'ATTENDANCE',
            ...data,
            timestamp: new Date().toISOString(),
        });
    }
    broadcastAnnouncement(tenantSlug, targetRole, data) {
        if (targetRole) {
            this.sendToRole(tenantSlug, targetRole, 'new-announcement', data);
        }
        else {
            this.sendToTenant(tenantSlug, 'new-announcement', data);
        }
    }
    broadcastResultPublished(tenantSlug, data) {
        this.sendToRole(tenantSlug, 'STUDENT', 'result-published', data);
        this.sendToRole(tenantSlug, 'PARENT', 'result-published', data);
    }
    getOnlineCount(tenantSlug) {
        if (tenantSlug) {
            const room = this.server.sockets.adapter.rooms.get(`tenant:${tenantSlug}`);
            return room ? room.size : 0;
        }
        return this.connectedUsers.size;
    }
};
exports.NotificationGateway = NotificationGateway;
__decorate([
    (0, websockets_1.WebSocketServer)(),
    __metadata("design:type", socket_io_1.Server)
], NotificationGateway.prototype, "server", void 0);
__decorate([
    (0, websockets_1.SubscribeMessage)('ping'),
    __param(0, (0, websockets_1.ConnectedSocket)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket]),
    __metadata("design:returntype", void 0)
], NotificationGateway.prototype, "handlePing", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('mark-read'),
    __param(0, (0, websockets_1.MessageBody)()),
    __param(1, (0, websockets_1.ConnectedSocket)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, socket_io_1.Socket]),
    __metadata("design:returntype", void 0)
], NotificationGateway.prototype, "handleMarkRead", null);
exports.NotificationGateway = NotificationGateway = NotificationGateway_1 = __decorate([
    (0, websockets_1.WebSocketGateway)({
        cors: { origin: '*', credentials: true },
        namespace: '/notifications',
        transports: ['websocket', 'polling'],
    }),
    __metadata("design:paramtypes", [jwt_1.JwtService,
        config_1.ConfigService])
], NotificationGateway);
//# sourceMappingURL=notification.gateway.js.map