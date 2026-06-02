import { Injectable, NotFoundException } from '@nestjs/common';
import { CentralPrismaService } from '../../database/central-prisma.service';

@Injectable()
export class SubscriptionService {
  constructor(private readonly centralPrisma: CentralPrismaService) {}
  async getPlans() { return { data: await this.centralPrisma.subscriptionPlan.findMany({ where: { isActive: true }, orderBy: { price: 'asc' } }) }; }
  async getSchoolSubscription(schoolId: string) {
    const sub = await this.centralPrisma.subscription.findFirst({ where: { schoolId, status: 'ACTIVE' }, include: { plan: true }, orderBy: { createdAt: 'desc' } });
    return { data: sub };
  }
  async createSubscription(dto: { schoolId: string; planId: string; startDate: string; endDate: string; amount: number }) {
    const data = await this.centralPrisma.subscription.create({ data: { schoolId: dto.schoolId, planId: dto.planId, startDate: new Date(dto.startDate), endDate: new Date(dto.endDate), amount: dto.amount, status: 'ACTIVE' } });
    return { data, message: 'Subscription created' };
  }
  async recordPayment(subscriptionId: string, dto: { amount: number; gateway: string; gatewayPayId?: string }) {
    const data = await this.centralPrisma.payment.create({ data: { subscriptionId, amount: dto.amount, currency: 'INR', gateway: dto.gateway, gatewayPayId: dto.gatewayPayId, status: 'SUCCESS', paidAt: new Date() } });
    return { data, message: 'Payment recorded' };
  }
}
