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
var StripeWebhookController_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.StripeWebhookController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const config_1 = require("@nestjs/config");
const stripe_1 = require("stripe");
const central_prisma_service_1 = require("../../database/central-prisma.service");
let StripeWebhookController = StripeWebhookController_1 = class StripeWebhookController {
    constructor(configService, centralPrisma) {
        this.configService = configService;
        this.centralPrisma = centralPrisma;
        this.logger = new common_1.Logger(StripeWebhookController_1.name);
        this.stripe = new stripe_1.default(configService.get('STRIPE_SECRET_KEY') || '', {
            apiVersion: '2024-06-20',
        });
    }
    async handleWebhook(req, signature) {
        const webhookSecret = this.configService.get('STRIPE_WEBHOOK_SECRET');
        if (!webhookSecret)
            throw new common_1.BadRequestException('Stripe webhook secret not configured');
        let event;
        try {
            event = this.stripe.webhooks.constructEvent(req.rawBody, signature, webhookSecret);
        }
        catch (err) {
            this.logger.warn(`Stripe webhook signature verification failed: ${err.message}`);
            throw new common_1.BadRequestException('Invalid Stripe signature');
        }
        this.logger.log(`Stripe webhook: ${event.type}`);
        switch (event.type) {
            case 'payment_intent.succeeded':
                await this.handlePaymentSucceeded(event.data.object);
                break;
            case 'payment_intent.payment_failed':
                await this.handlePaymentFailed(event.data.object);
                break;
            case 'invoice.payment_succeeded':
                await this.handleInvoiceSucceeded(event.data.object);
                break;
            case 'customer.subscription.deleted':
                await this.handleSubscriptionDeleted(event.data.object);
                break;
            case 'customer.subscription.updated':
                await this.handleSubscriptionUpdated(event.data.object);
                break;
            default:
                this.logger.log(`Unhandled Stripe event: ${event.type}`);
        }
        return { received: true };
    }
    async handlePaymentSucceeded(paymentIntent) {
        const subscriptionId = paymentIntent.metadata?.subscriptionId;
        if (!subscriptionId)
            return;
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
    async handlePaymentFailed(paymentIntent) {
        await this.centralPrisma.payment.updateMany({
            where: { gatewayPayId: paymentIntent.id },
            data: { status: 'FAILED' },
        });
        this.logger.warn(`Stripe payment failed: ${paymentIntent.id}`);
    }
    async handleInvoiceSucceeded(invoice) {
        this.logger.log(`Stripe invoice paid: ${invoice.id}, amount: ${invoice.amount_paid}`);
    }
    async handleSubscriptionDeleted(subscription) {
        const subscriptionId = subscription.metadata?.subscriptionId;
        if (subscriptionId) {
            await this.centralPrisma.subscription.update({
                where: { id: subscriptionId },
                data: { status: 'CANCELLED' },
            });
        }
    }
    async handleSubscriptionUpdated(subscription) {
        this.logger.log(`Stripe subscription updated: ${subscription.id}`);
    }
};
exports.StripeWebhookController = StripeWebhookController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'Stripe payment webhook' }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Headers)('stripe-signature')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], StripeWebhookController.prototype, "handleWebhook", null);
exports.StripeWebhookController = StripeWebhookController = StripeWebhookController_1 = __decorate([
    (0, swagger_1.ApiTags)('Webhooks'),
    (0, common_1.Controller)({ path: 'webhooks/stripe', version: '1' }),
    __metadata("design:paramtypes", [config_1.ConfigService,
        central_prisma_service_1.CentralPrismaService])
], StripeWebhookController);
//# sourceMappingURL=stripe.webhook.js.map