import {
  Controller,
  Post,
  Req,
  Headers,
  HttpCode,
  HttpStatus,
  Logger,
  BadRequestException,
  RawBodyRequest,
} from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { Request } from 'express';
import { ConfigService } from '@nestjs/config';
import Stripe from 'stripe';
import { CentralPrismaService } from '../../database/central-prisma.service';

@ApiTags('Webhooks')
@Controller({ path: 'webhooks/stripe', version: '1' })
export class StripeWebhookController {
  private readonly logger = new Logger(StripeWebhookController.name);
  private readonly stripe: Stripe;

  constructor(
    private readonly configService: ConfigService,
    private readonly centralPrisma: CentralPrismaService,
  ) {
    this.stripe = new Stripe(configService.get('STRIPE_SECRET_KEY') || '', {
      apiVersion: '2024-06-20',
    });
  }

  @Post()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Stripe payment webhook' })
  async handleWebhook(
    @Req() req: RawBodyRequest<Request>,
    @Headers('stripe-signature') signature: string,
  ) {
    const webhookSecret = this.configService.get('STRIPE_WEBHOOK_SECRET');
    if (!webhookSecret) throw new BadRequestException('Stripe webhook secret not configured');

    let event: Stripe.Event;
    try {
      event = this.stripe.webhooks.constructEvent(req.rawBody, signature, webhookSecret);
    } catch (err) {
      this.logger.warn(`Stripe webhook signature verification failed: ${err.message}`);
      throw new BadRequestException('Invalid Stripe signature');
    }

    this.logger.log(`Stripe webhook: ${event.type}`);

    switch (event.type) {
      case 'payment_intent.succeeded':
        await this.handlePaymentSucceeded(event.data.object as Stripe.PaymentIntent);
        break;
      case 'payment_intent.payment_failed':
        await this.handlePaymentFailed(event.data.object as Stripe.PaymentIntent);
        break;
      case 'invoice.payment_succeeded':
        await this.handleInvoiceSucceeded(event.data.object as Stripe.Invoice);
        break;
      case 'customer.subscription.deleted':
        await this.handleSubscriptionDeleted(event.data.object as Stripe.Subscription);
        break;
      case 'customer.subscription.updated':
        await this.handleSubscriptionUpdated(event.data.object as Stripe.Subscription);
        break;
      default:
        this.logger.log(`Unhandled Stripe event: ${event.type}`);
    }

    return { received: true };
  }

  private async handlePaymentSucceeded(paymentIntent: Stripe.PaymentIntent) {
    const subscriptionId = paymentIntent.metadata?.subscriptionId;
    if (!subscriptionId) return;

    await this.centralPrisma.payment.updateMany({
      where: { gatewayPayId: paymentIntent.id },
      data: { status: 'SUCCESS', paidAt: new Date() },
    });

    await this.centralPrisma.subscription.update({
      where: { id: subscriptionId },
      data: { status: 'ACTIVE' },
    });

    const sub = await this.centralPrisma.subscription.findUnique({ where: { id: subscriptionId } });
    if (sub) {
      await this.centralPrisma.school.update({ where: { id: sub.schoolId }, data: { status: 'ACTIVE' } });
    }

    this.logger.log(`Stripe payment succeeded: ${paymentIntent.id}`);
  }

  private async handlePaymentFailed(paymentIntent: Stripe.PaymentIntent) {
    await this.centralPrisma.payment.updateMany({
      where: { gatewayPayId: paymentIntent.id },
      data: { status: 'FAILED' },
    });
    this.logger.warn(`Stripe payment failed: ${paymentIntent.id}`);
  }

  private async handleInvoiceSucceeded(invoice: Stripe.Invoice) {
    this.logger.log(`Stripe invoice paid: ${invoice.id}, amount: ${invoice.amount_paid}`);
    // Update subscription end date based on invoice period_end
  }

  private async handleSubscriptionDeleted(subscription: Stripe.Subscription) {
    const subscriptionId = subscription.metadata?.subscriptionId;
    if (subscriptionId) {
      await this.centralPrisma.subscription.update({
        where: { id: subscriptionId },
        data: { status: 'CANCELLED' },
      });
    }
  }

  private async handleSubscriptionUpdated(subscription: Stripe.Subscription) {
    this.logger.log(`Stripe subscription updated: ${subscription.id}`);
  }
}
