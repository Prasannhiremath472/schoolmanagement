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
var RazorpayWebhookController_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.RazorpayWebhookController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const crypto = require("crypto");
const config_1 = require("@nestjs/config");
const central_prisma_service_1 = require("../../database/central-prisma.service");
const notification_gateway_1 = require("../../gateways/notification.gateway");
let RazorpayWebhookController = RazorpayWebhookController_1 = class RazorpayWebhookController {
    constructor(configService, centralPrisma, notificationGateway) {
        this.configService = configService;
        this.centralPrisma = centralPrisma;
        this.notificationGateway = notificationGateway;
        this.logger = new common_1.Logger(RazorpayWebhookController_1.name);
    }
    async handleWebhook(req, signature) {
        const secret = this.configService.get('RAZORPAY_WEBHOOK_SECRET');
        if (!secret)
            throw new common_1.BadRequestException('Webhook secret not configured');
        const body = JSON.stringify(req.body);
        const expectedSignature = crypto
            .createHmac('sha256', secret)
            .update(body)
            .digest('hex');
        if (signature !== expectedSignature) {
            this.logger.warn('Invalid Razorpay webhook signature');
            throw new common_1.BadRequestException('Invalid signature');
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
    async handlePaymentCaptured(payment) {
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
        const subscription = await this.centralPrisma.subscription.findUnique({
            where: { id: subscriptionId },
            include: { school: true },
        });
        if (subscription) {
            this.logger.log(`Payment captured for school ${subscription.school.slug}: ₹${amount / 100}`);
        }
    }
    async handlePaymentFailed(payment) {
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
    async handleSubscriptionActivated(subscription) {
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
    async handleSubscriptionCancelled(subscription) {
        const { notes } = subscription;
        const dbSubscriptionId = notes?.subscriptionId;
        if (dbSubscriptionId) {
            await this.centralPrisma.subscription.update({
                where: { id: dbSubscriptionId },
                data: { status: 'CANCELLED' },
            });
        }
    }
};
exports.RazorpayWebhookController = RazorpayWebhookController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'Razorpay payment webhook' }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Headers)('x-razorpay-signature')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], RazorpayWebhookController.prototype, "handleWebhook", null);
exports.RazorpayWebhookController = RazorpayWebhookController = RazorpayWebhookController_1 = __decorate([
    (0, swagger_1.ApiTags)('Webhooks'),
    (0, common_1.Controller)({ path: 'webhooks/razorpay', version: '1' }),
    __metadata("design:paramtypes", [config_1.ConfigService,
        central_prisma_service_1.CentralPrismaService,
        notification_gateway_1.NotificationGateway])
], RazorpayWebhookController);
//# sourceMappingURL=razorpay.webhook.js.map