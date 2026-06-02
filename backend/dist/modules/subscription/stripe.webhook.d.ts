import { RawBodyRequest } from '@nestjs/common';
import { Request } from 'express';
import { ConfigService } from '@nestjs/config';
import { CentralPrismaService } from '../../database/central-prisma.service';
export declare class StripeWebhookController {
    private readonly configService;
    private readonly centralPrisma;
    private readonly logger;
    private readonly stripe;
    constructor(configService: ConfigService, centralPrisma: CentralPrismaService);
    handleWebhook(req: RawBodyRequest<Request>, signature: string): Promise<{
        received: boolean;
    }>;
    private handlePaymentSucceeded;
    private handlePaymentFailed;
    private handleInvoiceSucceeded;
    private handleSubscriptionDeleted;
    private handleSubscriptionUpdated;
}
