import {
  Controller,
  Post,
  Req,
  Headers,
  HttpCode,
  HttpStatus,
  Logger,
  BadRequestException,
} from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { Request } from 'express';
import * as crypto from 'crypto';
import { ConfigService } from '@nestjs/config';
import { CentralPrismaService } from '../../database/central-prisma.service';
import { NotificationGateway } from '../../gateways/notification.gateway';

@ApiTags('Webhooks')
@Controller({ path: 'webhooks/razorpay', version: '1' })
export class RazorpayWebhookController {
  private readonly logger = new Logger(RazorpayWebhookController.name);

  constructor(
    private readonly configService: ConfigService,
    private readonly centralPrisma: CentralPrismaService,
    private readonly notificationGateway: NotificationGateway,
  ) {}

  @Post()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Razorpay payment webhook' })
  async handleWebhook(
    @Req() req: Request,
    @Headers('x-razorpay-signature') signature: string,
  ) {
    const secret = this.configService.get('RAZORPAY_WEBHOOK_SECRET');
    if (!secret) throw new BadRequestException('Webhook secret not configured');

    // Verify signature
    const body = JSON.stringify(req.body);
    const expectedSignature = crypto
      .createHmac('sha256', secret)
      .update(body)
      .digest('hex');

    if (signature !== expectedSignature) {
      this.logger.warn('Invalid Razorpay webhook signature');
      throw new BadRequestException('Invalid signature');
    }

    const event = req.body;
    this.logger.log(`Razorpay webhook: ${event.event}`);

    switch (event.event) {
      case 'payment.captured':
        await this.handlePaymentCaptured(event.payload.payment.entity);
        break;
      case 'payment.failed':
        await this.handlePaymentFailed(event.payload.payment.entity);
        break;
      case 'subscription.activated':
        await this.handleSubscriptionActivated(event.payload.subscription.entity);
        break;
      case 'subscription.cancelled':
        await this.handleSubscriptionCancelled(event.payload.subscription.entity);
        break;
      default:
        this.logger.log(`Unhandled Razorpay event: ${event.event}`);
    }

    return { status: 'ok' };
  }

  private async handlePaymentCaptured(payment: any) {
    const { id: gatewayPayId, amount, notes } = payment;
    const subscriptionId = notes?.subscriptionId;

    if (!subscriptionId) {
      this.logger.warn('Payment captured without subscriptionId in notes');
      return;
    }

    await this.centralPrisma.payment.updateMany({
      where: { gatewayPayId },
      data: { status: 'SUCCESS', paidAt: new Date() },
    });

    await this.centralPrisma.subscription.updateMany({
      where: { id: subscriptionId },
      data: { status: 'ACTIVE' },
    });

    // Get school and notify
    const subscription = await this.centralPrisma.subscription.findUnique({
      where: { id: subscriptionId },
      include: { school: true },
    });

    if (subscription) {
      this.logger.log(`Payment captured for school ${subscription.school.slug}: ₹${amount / 100}`);
    }
  }

  private async handlePaymentFailed(payment: any) {
    const { id: gatewayPayId, notes } = payment;
    const subscriptionId = notes?.subscriptionId;

    if (subscriptionId) {
      await this.centralPrisma.payment.updateMany({
        where: { gatewayPayId },
        data: { status: 'FAILED' },
      });
    }

    this.logger.warn(`Payment failed: ${gatewayPayId}`);
  }

  private async handleSubscriptionActivated(subscription: any) {
    const { notes } = subscription;
    const dbSubscriptionId = notes?.subscriptionId;

    if (dbSubscriptionId) {
      await this.centralPrisma.subscription.update({
        where: { id: dbSubscriptionId },
        data: { status: 'ACTIVE' },
      });

      const sub = await this.centralPrisma.subscription.findUnique({
        where: { id: dbSubscriptionId },
        include: { school: { select: { slug: true } } },
      });

      if (sub) {
        await this.centralPrisma.school.update({
          where: { id: sub.schoolId },
          data: { status: 'ACTIVE' },
        });
      }
    }
  }

  private async handleSubscriptionCancelled(subscription: any) {
    const { notes } = subscription;
    const dbSubscriptionId = notes?.subscriptionId;

    if (dbSubscriptionId) {
      await this.centralPrisma.subscription.update({
        where: { id: dbSubscriptionId },
        data: { status: 'CANCELLED' },
      });
    }
  }
}
