import { OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
export declare class NotificationService implements OnModuleInit {
    private readonly configService;
    private readonly logger;
    private firebaseInitialized;
    private twilioClient;
    constructor(configService: ConfigService);
    onModuleInit(): void;
    private initFirebase;
    private initTwilio;
    sendEmail(to: string, subject: string, html: string, smtpConfig?: {
        host: string;
        port: number;
        user: string;
        pass: string;
        from: string;
    }): Promise<void>;
    sendSms(to: string, message: string): Promise<void>;
    sendPushNotification(fcmToken: string, title: string, body: string, data?: Record<string, string>): Promise<void>;
    sendMulticastPush(fcmTokens: string[], title: string, body: string, data?: Record<string, string>): Promise<string[]>;
    sendWhatsApp(to: string, message: string): Promise<void>;
    sendWhatsAppTemplate(to: string, templateSid: string, variables: Record<string, string>): Promise<void>;
    broadcastToUsers(users: Array<{
        email?: string;
        phone?: string;
        fcmToken?: string;
    }>, notification: {
        title: string;
        body: string;
        subject?: string;
    }, channels: ('email' | 'sms' | 'push')[]): Promise<{
        email: number;
        sms: number;
        push: number;
    }>;
}
