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
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentGatewayController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const payment_gateway_service_1 = require("./payment-gateway.service");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const roles_guard_1 = require("../auth/guards/roles.guard");
const roles_decorator_1 = require("../auth/decorators/roles.decorator");
const current_user_decorator_1 = require("../auth/decorators/current-user.decorator");
let PaymentGatewayController = class PaymentGatewayController {
    constructor(paymentGatewayService) {
        this.paymentGatewayService = paymentGatewayService;
    }
    createRazorpayOrder(dto) {
        return this.paymentGatewayService.createRazorpayOrder(dto);
    }
    verifyRazorpay(dto, userId) {
        return this.paymentGatewayService.verifyAndRecordRazorpayPayment({ ...dto, collectedBy: userId });
    }
    createStripeIntent(dto) {
        return this.paymentGatewayService.createStripePaymentIntent(dto);
    }
    confirmStripe(dto, userId) {
        return this.paymentGatewayService.confirmStripePayment({ ...dto, collectedBy: userId });
    }
    createPaymentLink(dto) {
        return this.paymentGatewayService.createPaymentLink(dto);
    }
};
exports.PaymentGatewayController = PaymentGatewayController;
__decorate([
    (0, common_1.Post)('razorpay/create-order'),
    (0, roles_decorator_1.Roles)('SCHOOL_ADMIN', 'ACCOUNTANT', 'PARENT', 'STUDENT'),
    (0, swagger_1.ApiOperation)({ summary: 'Create Razorpay order to initiate fee payment' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], PaymentGatewayController.prototype, "createRazorpayOrder", null);
__decorate([
    (0, common_1.Post)('razorpay/verify'),
    (0, roles_decorator_1.Roles)('SCHOOL_ADMIN', 'ACCOUNTANT', 'PARENT', 'STUDENT'),
    (0, swagger_1.ApiOperation)({ summary: 'Verify Razorpay payment signature and record payment' }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, current_user_decorator_1.CurrentUser)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", void 0)
], PaymentGatewayController.prototype, "verifyRazorpay", null);
__decorate([
    (0, common_1.Post)('stripe/create-intent'),
    (0, roles_decorator_1.Roles)('SCHOOL_ADMIN', 'ACCOUNTANT', 'PARENT', 'STUDENT'),
    (0, swagger_1.ApiOperation)({ summary: 'Create Stripe PaymentIntent for fee payment' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], PaymentGatewayController.prototype, "createStripeIntent", null);
__decorate([
    (0, common_1.Post)('stripe/confirm'),
    (0, roles_decorator_1.Roles)('SCHOOL_ADMIN', 'ACCOUNTANT', 'PARENT', 'STUDENT'),
    (0, swagger_1.ApiOperation)({ summary: 'Confirm Stripe payment and record it' }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, current_user_decorator_1.CurrentUser)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", void 0)
], PaymentGatewayController.prototype, "confirmStripe", null);
__decorate([
    (0, common_1.Post)('razorpay/payment-link'),
    (0, roles_decorator_1.Roles)('SCHOOL_ADMIN', 'ACCOUNTANT'),
    (0, swagger_1.ApiOperation)({ summary: 'Create shareable Razorpay payment link (for SMS/WhatsApp)' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], PaymentGatewayController.prototype, "createPaymentLink", null);
exports.PaymentGatewayController = PaymentGatewayController = __decorate([
    (0, swagger_1.ApiTags)('Fees'),
    (0, swagger_1.ApiBearerAuth)('access-token'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, common_1.Controller)({ path: 'fees/payment', version: '1' }),
    __metadata("design:paramtypes", [payment_gateway_service_1.PaymentGatewayService])
], PaymentGatewayController);
//# sourceMappingURL=payment-gateway.controller.js.map