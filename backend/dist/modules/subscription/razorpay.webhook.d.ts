import { Request } from 'express';
import { ConfigService } from '@nestjs/config';
import { CentralPrismaService } from '../../database/central-prisma.service';
import { NotificationGateway } from '../../gateways/notification.gateway';
export declare class RazorpayWebhookController {
    private readonly configService;
    private readonly centralPrisma;
    private readonly notificationGateway;
    private readonly logger;
    constructor(configService: ConfigService, centralPrisma: CentralPrismaService, notificationGateway: NotificationGateway);
    handleWebhook(req: Request, signature: string): Promise<{
        status: string;
    }>;
    private handlePaymentCaptured;
    private handlePaymentFailed;
    private handleSubscriptionActivated;
    private handleSubscriptionCancelled;
}
