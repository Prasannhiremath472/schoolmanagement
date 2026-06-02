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
var AttendanceGateway_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AttendanceGateway = void 0;
const websockets_1 = require("@nestjs/websockets");
const socket_io_1 = require("socket.io");
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const config_1 = require("@nestjs/config");
let AttendanceGateway = AttendanceGateway_1 = class AttendanceGateway {
    constructor(jwtService, configService) {
        this.jwtService = jwtService;
        this.configService = configService;
        this.logger = new common_1.Logger(AttendanceGateway_1.name);
    }
    afterInit() {
        this.logger.log('AttendanceGateway initialized');
    }
    async handleConnection(client) {
        try {
            const token = client.handshake.auth?.token;
            if (!token) {
                client.disconnect(true);
                return;
            }
            const payload = this.jwtService.verify(token, {
                secret: this.configService.get('JWT_SECRET'),
            });
            client.data.userId = payload.sub;
            client.data.role = payload.role;
            client.data.tenantSlug = client.handshake.auth?.tenantSlug;
            this.logger.log(`Attendance client connected: ${client.id}`);
        }
        catch {
            client.disconnect(true);
        }
    }
    handleDisconnect(client) {
        this.logger.log(`Attendance client disconnected: ${client.id}`);
    }
    handleJoinSection(data, client) {
        const room = `section:${data.sectionId}:${data.date}`;
        client.join(room);
        client.emit('joined-section', { room, sectionId: data.sectionId, date: data.date });
        this.logger.log(`Client ${client.id} joined section room: ${room}`);
    }
    handleLeaveSection(data, client) {
        client.leave(`section:${data.sectionId}:${data.date}`);
    }
    broadcastAttendanceUpdate(sectionId, date, data) {
        const room = `section:${sectionId}:${date}`;
        this.server.to(room).emit('attendance-updated', {
            ...data,
            sectionId,
            date,
            timestamp: new Date().toISOString(),
        });
    }
    broadcastAttendanceSummary(sectionId, date, summary) {
        const room = `section:${sectionId}:${date}`;
        this.server.to(room).emit('attendance-summary', { sectionId, date, ...summary });
    }
    handleQrScan(data, client) {
        try {
            const qrData = JSON.parse(data.payload);
            if (qrData.sectionId !== data.sectionId) {
                client.emit('qr-error', { message: 'QR code is for a different section' });
                return;
            }
            const isExpired = Date.now() - qrData.ts > 5 * 60 * 1000;
            if (isExpired) {
                client.emit('qr-error', { message: 'QR code has expired. Please refresh.' });
                return;
            }
            client.emit('qr-valid', { sectionId: qrData.sectionId, date: qrData.date });
        }
        catch {
            client.emit('qr-error', { message: 'Invalid QR code' });
        }
    }
};
exports.AttendanceGateway = AttendanceGateway;
__decorate([
    (0, websockets_1.WebSocketServer)(),
    __metadata("design:type", socket_io_1.Server)
], AttendanceGateway.prototype, "server", void 0);
__decorate([
    (0, websockets_1.SubscribeMessage)('join-section'),
    __param(0, (0, websockets_1.MessageBody)()),
    __param(1, (0, websockets_1.ConnectedSocket)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, socket_io_1.Socket]),
    __metadata("design:returntype", void 0)
], AttendanceGateway.prototype, "handleJoinSection", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('leave-section'),
    __param(0, (0, websockets_1.MessageBody)()),
    __param(1, (0, websockets_1.ConnectedSocket)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, socket_io_1.Socket]),
    __metadata("design:returntype", void 0)
], AttendanceGateway.prototype, "handleLeaveSection", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('qr-scan'),
    __param(0, (0, websockets_1.MessageBody)()),
    __param(1, (0, websockets_1.ConnectedSocket)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, socket_io_1.Socket]),
    __metadata("design:returntype", void 0)
], AttendanceGateway.prototype, "handleQrScan", null);
exports.AttendanceGateway = AttendanceGateway = AttendanceGateway_1 = __decorate([
    (0, websockets_1.WebSocketGateway)({
        cors: { origin: '*', credentials: true },
        namespace: '/attendance',
    }),
    __metadata("design:paramtypes", [jwt_1.JwtService,
        config_1.ConfigService])
], AttendanceGateway);
//# sourceMappingURL=attendance.gateway.js.map