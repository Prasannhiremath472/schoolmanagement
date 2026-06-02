import { Injectable, Logger, BadRequestException, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Razorpay from 'razorpay';
import Stripe from 'stripe';
import * as crypto from 'crypto';
import { TenantPrismaService } from '../../database/tenant-prisma.service';
import { CentralPrismaService } from '../../database/central-prisma.service';

@Injectable()
export class PaymentGatewayService {
  private readonly logger = new Logger(PaymentGatewayService.name);

  constructor(
    private readonly tenantPrisma: TenantPrismaService,
    private readonly centralPrisma: CentralPrismaService,
    private readonly configService: ConfigService,
  ) {}

  private get db() { return this.tenantPrisma.db; }

  // ─── RAZORPAY ─────────────────────────────────────────────────────────────

  private getRazorpay(keyId?: string, keySecret?: string): Razorpay {
    return new Razorpay({
      key_id: keyId || this.configService.get('RAZORPAY_KEY_ID', ''),
      key_secret: keySecret || this.configService.get('RAZORPAY_KEY_SECRET', ''),
    });
  }

  /**
   * Create Razorpay order for fee payment.
   * Returns order ID + key that frontend uses to open Razorpay checkout.
   */
  async createRazorpayOrder(dto: {
    studentId: string;
    installmentId: string;
    amount: number; // in INR
    currency?: string;
    tenantSlug?: string;
    schoolSettings?: { razorpayKeyId?: string; razorpayKeySecret?: string };
  }) {
    const { schoolSettings, amount, tenantSlug } = dto;
    const razorpay = this.getRazorpay(schoolSettings?.razorpayKeyId, schoolSettings?.razorpayKeySecret);

    const amountInPaise = Math.round(amount * 100);

    const order = await razorpay.orders.create({
      amount: amountInPaise,
      currency: dto.currency || 'INR',
      receipt: `fee_${dto.installmentId}_${Date.now()}`,
      notes: {
        studentId: dto.studentId,
        installmentId: dto.installmentId,
        tenantSlug: tenantSlug || '',
      },
    });

    this.logger.log(`Razorpay order created: ${order.id} for ₹${amount}`);

    return {
      data: {
        orderId: order.id,
        amount: amountInPaise,
        currency: order.currency,
        keyId: schoolSettings?.razorpayKeyId || this.configService.get('RAZORPAY_KEY_ID'),
      },
      message: 'Payment order created',
    };
  }

  /**
   * Verify Razorpay payment signature and record payment.
   */
  async verifyAndRecordRazorpayPayment(dto: {
    razorpayOrderId: string;
    razorpayPaymentId: string;
    razorpaySignature: string;
    studentId: string;
    installmentId: string;
    amount: number;
    schoolSettings?: { razorpayKeySecret?: string };
    collectedBy?: string;
  }) {
    const secret: string = dto.schoolSettings?.razorpayKeySecret || this.configService.get('RAZORPAY_KEY_SECRET') || '';

    // Verify signature
    const generated = crypto
      .createHmac('sha256', secret)
      .update(`${dto.razorpayOrderId}|${dto.razorpayPaymentId}`)
      .digest('hex');

    if (generated !== dto.razorpaySignature) {
      throw new BadRequestException('Payment signature verification failed');
    }

    const db = this.db;
    const installment = await db.feeInstallment.findUnique({ where: { id: dto.installmentId } });
    if (!installment) throw new NotFoundException('Installment not found');

    const receiptNo = await this.generateReceiptNo();

    const payment = await db.feePayment.create({
      data: {
        studentId: dto.studentId,
        installmentId: dto.installmentId,
        amount: installment.amount,
        discount: 0,
        fine: 0,
        payableAmount: dto.amount,
        paidAmount: dto.amount,
        dueAmount: Math.max(0, Number(installment.amount) - dto.amount),
        paymentMode: 'RAZORPAY',
        receiptNo,
        transactionId: dto.razorpayPaymentId,
        gatewayResponse: {
          orderId: dto.razorpayOrderId,
          paymentId: dto.razorpayPaymentId,
          signature: dto.razorpaySignature,
        },
        paymentDate: new Date(),
        collectedBy: dto.collectedBy,
      },
    });

    this.logger.log(`Razorpay payment recorded: ${receiptNo} (${dto.razorpayPaymentId})`);

    return { data: { ...payment, receiptNo }, message: 'Payment verified and recorded' };
  }

  // ─── STRIPE ───────────────────────────────────────────────────────────────

  private getStripe(secretKey?: string): Stripe {
    return new Stripe(secretKey || this.configService.get('STRIPE_SECRET_KEY', ''), {
      apiVersion: '2024-06-20',
    });
  }

  /**
   * Create Stripe PaymentIntent for fee payment.
   */
  async createStripePaymentIntent(dto: {
    studentId: string;
    installmentId: string;
    amount: number; // in INR
    currency?: string;
    tenantSlug?: string;
    schoolSettings?: { stripeSecretKey?: string; stripePubKey?: string };
  }) {
    const stripe = this.getStripe(dto.schoolSettings?.stripeSecretKey);
    const amountInPaise = Math.round(dto.amount * 100);

    const paymentIntent = await stripe.paymentIntents.create({
      amount: amountInPaise,
      currency: (dto.currency || 'INR').toLowerCase(),
      metadata: {
        studentId: dto.studentId,
        installmentId: dto.installmentId,
        tenantSlug: dto.tenantSlug || '',
      },
      automatic_payment_methods: { enabled: true },
    });

    this.logger.log(`Stripe PaymentIntent created: ${paymentIntent.id}`);

    return {
      data: {
        clientSecret: paymentIntent.client_secret,
        paymentIntentId: paymentIntent.id,
        publishableKey: dto.schoolSettings?.stripePubKey || this.configService.get('STRIPE_PUB_KEY'),
      },
      message: 'Stripe payment intent created',
    };
  }

  /**
   * Confirm Stripe payment and record it.
   */
  async confirmStripePayment(dto: {
    paymentIntentId: string;
    studentId: string;
    installmentId: string;
    amount: number;
    schoolSettings?: { stripeSecretKey?: string };
    collectedBy?: string;
  }) {
    const stripe = this.getStripe(dto.schoolSettings?.stripeSecretKey);
    const paymentIntent = await stripe.paymentIntents.retrieve(dto.paymentIntentId);

    if (paymentIntent.status !== 'succeeded') {
      throw new BadRequestException(`Payment not successful. Status: ${paymentIntent.status}`);
    }

    const db = this.db;
    const installment = await db.feeInstallment.findUnique({ where: { id: dto.installmentId } });
    if (!installment) throw new NotFoundException('Installment not found');

    const receiptNo = await this.generateReceiptNo();
    const payment = await db.feePayment.create({
      data: {
        studentId: dto.studentId,
        installmentId: dto.installmentId,
        amount: installment.amount,
        discount: 0, fine: 0,
        payableAmount: dto.amount,
        paidAmount: dto.amount,
        dueAmount: Math.max(0, Number(installment.amount) - dto.amount),
        paymentMode: 'STRIPE',
        receiptNo,
        transactionId: dto.paymentIntentId,
        gatewayResponse: { paymentIntentId: dto.paymentIntentId, status: paymentIntent.status },
        paymentDate: new Date(),
        collectedBy: dto.collectedBy,
      },
    });

    return { data: { ...payment, receiptNo }, message: 'Stripe payment confirmed and recorded' };
  }

  // ─── PAYMENT LINK (Razorpay) ─────────────────────────────────────────────

  /** Create shareable Razorpay payment link (for sending via SMS/WhatsApp) */
  async createPaymentLink(dto: {
    studentId: string;
    installmentId: string;
    amount: number;
    studentName: string;
    description?: string;
    expiryMinutes?: number;
    schoolSettings?: { razorpayKeyId?: string; razorpayKeySecret?: string };
  }) {
    const razorpay = this.getRazorpay(dto.schoolSettings?.razorpayKeyId, dto.schoolSettings?.razorpayKeySecret);

    const expiresAt = Math.floor(Date.now() / 1000) + (dto.expiryMinutes || 60) * 60;

    const link = await (razorpay as any).paymentLink.create({
      amount: Math.round(dto.amount * 100),
      currency: 'INR',
      accept_partial: false,
      description: dto.description || `Fee payment for ${dto.studentName}`,
      expire_by: expiresAt,
      reference_id: `${dto.studentId}_${dto.installmentId}_${Date.now()}`,
      notify: { sms: true, email: false },
      reminder_enable: true,
      notes: { studentId: dto.studentId, installmentId: dto.installmentId },
    });

    return {
      data: { paymentUrl: link.short_url, linkId: link.id, expiresAt: new Date(expiresAt * 1000) },
      message: 'Payment link created',
    };
  }

  private async generateReceiptNo(): Promise<string> {
    const count = await this.db.feePayment.count();
    return `RCP-${new Date().getFullYear()}-${String(count + 1).padStart(6, '0')}`;
  }
}
