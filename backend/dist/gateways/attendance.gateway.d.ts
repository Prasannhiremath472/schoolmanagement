import { OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
export declare class AttendanceGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
    private readonly jwtService;
    private readonly configService;
    server: Server;
    private readonly logger;
    constructor(jwtService: JwtService, configService: ConfigService);
    afterInit(): void;
    handleConnection(client: Socket): Promise<void>;
    handleDisconnect(client: Socket): void;
    handleJoinSection(data: {
        sectionId: string;
        date: string;
    }, client: Socket): void;
    handleLeaveSection(data: {
        sectionId: string;
        date: string;
    }, client: Socket): void;
    broadcastAttendanceUpdate(sectionId: string, date: string, data: {
        studentId: string;
        studentName: string;
        status: string;
        remarks?: string;
        updatedBy: string;
    }): void;
    broadcastAttendanceSummary(sectionId: string, date: string, summary: {
        total: number;
        present: number;
        absent: number;
        late: number;
    }): void;
    handleQrScan(data: {
        payload: string;
        sectionId: string;
    }, client: Socket): void;
}
