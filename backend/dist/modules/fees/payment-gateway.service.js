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
var PaymentGatewayService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentGatewayService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const razorpay_1 = require("razorpay");
const stripe_1 = require("stripe");
const crypto = require("crypto");
const tenant_prisma_service_1 = require("../../database/tenant-prisma.service");
const central_prisma_service_1 = require("../../database/central-prisma.service");
let PaymentGatewayService = PaymentGatewayService_1 = class PaymentGatewayService {
    constructor(tenantPrisma, centralPrisma, configService) {
        this.tenantPrisma = tenantPrisma;
        this.centralPrisma = centralPrisma;
        this.configService = configService;
        this.logger = new common_1.Logger(PaymentGatewayService_1.name);
    }
    get db() { return this.tenantPrisma.db; }
    getRazorpay(keyId, keySecret) {
        return new razorpay_1.default({
            key_id: keyId || this.configService.get('RAZORPAY_KEY_ID', ''),
            key_secret: keySecret || this.configService.get('RAZORPAY_KEY_SECRET', ''),
        });
    }
    async createRazorpayOrder(dto) {
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
    async verifyAndRecordRazorpayPayment(dto) {
        const secret = dto.schoolSettings?.razorpayKeySecret || this.configService.get('RAZORPAY_KEY_SECRET') || '';
        const generated = crypto
            .createHmac('sha256', secret)
            .update(`${dto.razorpayOrderId}|${dto.razorpayPaymentId}`)
            .digest('hex');
        if (generated !== dto.razorpaySignature) {
            throw new common_1.BadRequestException('Payment signature verification failed');
        }
        const db = this.db;
        const installment = await db.feeInstallment.findUnique({ where: { id: dto.installmentId } });
        if (!installment)
            throw new common_1.NotFoundException('Installment not found');
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
    getStripe(secretKey) {
        return new stripe_1.default(secretKey || this.configService.get('STRIPE_SECRET_KEY', ''), {
            apiVersion: '2024-06-20',
        });
    }
    async createStripePaymentIntent(dto) {
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
    async confirmStripePayment(dto) {
        const stripe = this.getStripe(dto.schoolSettings?.stripeSecretKey);
        const paymentIntent = await stripe.paymentIntents.retrieve(dto.paymentIntentId);
        if (paymentIntent.status !== 'succeeded') {
            throw new common_1.BadRequestException(`Payment not successful. Status: ${paymentIntent.status}`);
        }
        const db = this.db;
        const installment = await db.feeInstallment.findUnique({ where: { id: dto.installmentId } });
        if (!installment)
            throw new common_1.NotFoundException('Installment not found');
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
    async createPaymentLink(dto) {
        const razorpay = this.getRazorpay(dto.schoolSettings?.razorpayKeyId, dto.schoolSettings?.razorpayKeySecret);
        const expiresAt = Math.floor(Date.now() / 1000) + (dto.expiryMinutes || 60) * 60;
        const link = await razorpay.paymentLink.create({
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
    async generateReceiptNo() {
        const count = await this.db.feePayment.count();
        return `RCP-${new Date().getFullYear()}-${String(count + 1).padStart(6, '0')}`;
    }
};
exports.PaymentGatewayService = PaymentGatewayService;
exports.PaymentGatewayService = PaymentGatewayService = PaymentGatewayService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [tenant_prisma_service_1.TenantPrismaService,
        central_prisma_service_1.CentralPrismaService,
        config_1.ConfigService])
], PaymentGatewayService);
//# sourceMappingURL=payment-gateway.service.js.map