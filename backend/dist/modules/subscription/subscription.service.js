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
Object.defineProperty(exports, "__esModule", { value: true });
exports.SubscriptionService = void 0;
const common_1 = require("@nestjs/common");
const central_prisma_service_1 = require("../../database/central-prisma.service");
let SubscriptionService = class SubscriptionService {
    constructor(centralPrisma) {
        this.centralPrisma = centralPrisma;
    }
    async getPlans() { return { data: await this.centralPrisma.subscriptionPlan.findMany({ where: { isActive: true }, orderBy: { price: 'asc' } }) }; }
    async getSchoolSubscription(schoolId) {
        const sub = await this.centralPrisma.subscription.findFirst({ where: { schoolId, status: 'ACTIVE' }, include: { plan: true }, orderBy: { createdAt: 'desc' } });
        return { data: sub };
    }
    async createSubscription(dto) {
        const data = await this.centralPrisma.subscription.create({ data: { schoolId: dto.schoolId, planId: dto.planId, startDate: new Date(dto.startDate), endDate: new Date(dto.endDate), amount: dto.amount, status: 'ACTIVE' } });
        return { data, message: 'Subscription created' };
    }
    async recordPayment(subscriptionId, dto) {
        const data = await this.centralPrisma.payment.create({ data: { subscriptionId, amount: dto.amount, currency: 'INR', gateway: dto.gateway, gatewayPayId: dto.gatewayPayId, status: 'SUCCESS', paidAt: new Date() } });
        return { data, message: 'Payment recorded' };
    }
};
exports.SubscriptionService = SubscriptionService;
exports.SubscriptionService = SubscriptionService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [central_prisma_service_1.CentralPrismaService])
], SubscriptionService);
//# sourceMappingURL=subscription.service.js.map