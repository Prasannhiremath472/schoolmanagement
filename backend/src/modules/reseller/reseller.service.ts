import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { CentralPrismaService } from '../../database/central-prisma.service';
import { PaginationDto, buildPaginationMeta, getPaginationArgs } from '../../common/dto/pagination.dto';

@Injectable()
export class ResellerService {
  constructor(private readonly centralPrisma: CentralPrismaService) {}

  async findAll(query: PaginationDto) {
    const where: any = {};
    if (query.search) {
      where.OR = [
        { name: { contains: query.search, mode: 'insensitive' } },
        { email: { contains: query.search, mode: 'insensitive' } },
      ];
    }
    const [data, total] = await Promise.all([
      this.centralPrisma.reseller.findMany({
        where,
        
        
        orderBy: { createdAt: 'desc' },
        include: {
          _count: { select: { schools: true, commissions: true } },
        },
      }),
      this.centralPrisma.reseller.count({ where }),
    ]);
    return { data, meta: buildPaginationMeta(total, query) };
  }

  async findOne(id: string) {
    const reseller = await this.centralPrisma.reseller.findUnique({
      where: { id },
      include: {
        schools: { select: { id: true, name: true, slug: true, status: true } },
        commissions: { orderBy: { createdAt: 'desc' }, take: 20 },
      },
    });
    if (!reseller) throw new NotFoundException('Reseller not found');
    return { data: reseller };
  }

  async create(dto: { name: string; email: string; phone?: string; company?: string; commissionPct?: number }) {
    const existing = await this.centralPrisma.reseller.findUnique({ where: { email: dto.email } });
    if (existing) throw new ConflictException('Reseller with this email already exists');

    const data = await this.centralPrisma.reseller.create({
      data: {
        name: dto.name,
        email: dto.email,
        phone: dto.phone,
        company: dto.company,
        commissionPct: dto.commissionPct ?? 10,
      },
    });
    return { data, message: 'Reseller created successfully' };
  }

  async update(id: string, dto: Partial<{ name: string; phone: string; company: string; commissionPct: number; isActive: boolean }>) {
    await this.findOne(id);
    const data = await this.centralPrisma.reseller.update({ where: { id }, data: dto });
    return { data, message: 'Reseller updated' };
  }

  async delete(id: string) {
    await this.findOne(id);
    // Unlink schools first
    await this.centralPrisma.school.updateMany({ where: { resellerId: id }, data: { resellerId: null } });
    await this.centralPrisma.reseller.delete({ where: { id } });
    return { message: 'Reseller deleted' };
  }

  async getCommissions(resellerId: string, query: PaginationDto) {
    const [data, total] = await Promise.all([
      this.centralPrisma.commission.findMany({
        where: { resellerId },
        
        
        orderBy: { createdAt: 'desc' },
        include: { school: { select: { name: true, slug: true } } },
      }),
      this.centralPrisma.commission.count({ where: { resellerId } }),
    ]);
    return { data, meta: buildPaginationMeta(total, query) };
  }

  async getRevenueStats(resellerId: string) {
    const [totalCommission, pendingCommission, paidCommission] = await Promise.all([
      this.centralPrisma.commission.aggregate({ _sum: { amount: true }, where: { resellerId } }),
      this.centralPrisma.commission.aggregate({ _sum: { amount: true }, where: { resellerId, status: 'PENDING' } }),
      this.centralPrisma.commission.aggregate({ _sum: { amount: true }, where: { resellerId, status: 'PAID' } }),
    ]);

    const schoolCount = await this.centralPrisma.school.count({ where: { resellerId } });

    return {
      data: {
        totalCommission: Number(totalCommission._sum.amount) || 0,
        pendingCommission: Number(pendingCommission._sum.amount) || 0,
        paidCommission: Number(paidCommission._sum.amount) || 0,
        schoolCount,
      },
    };
  }

  async markCommissionPaid(commissionId: string) {
    const commission = await this.centralPrisma.commission.update({
      where: { id: commissionId },
      data: { status: 'PAID', paidAt: new Date() },
    });
    return { data: commission, message: 'Commission marked as paid' };
  }

  async assignSchool(resellerId: string, schoolId: string) {
    await this.findOne(resellerId);
    const school = await this.centralPrisma.school.update({
      where: { id: schoolId },
      data: { resellerId },
    });
    return { data: school, message: 'School assigned to reseller' };
  }

  async calculateCommission(subscriptionAmount: number, resellerId: string): Promise<number> {
    const reseller = await this.centralPrisma.reseller.findUnique({ where: { id: resellerId } });
    if (!reseller) return 0;
    return (subscriptionAmount * Number(reseller.commissionPct)) / 100;
  }
}
