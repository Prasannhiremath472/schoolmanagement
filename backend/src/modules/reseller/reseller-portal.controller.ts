/**
 * Reseller Portal Controller
 * Endpoints accessible by the RESELLER role to view their own data.
 * Uses the logged-in user's email to find their reseller record.
 */
import {
  Controller, Get, Query, UseGuards, Req,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { CentralPrismaService } from '../../database/central-prisma.service';
import { PaginationDto, buildPaginationMeta } from '../../common/dto/pagination.dto';

@ApiTags('Reseller Portal')
@ApiBearerAuth('access-token')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('RESELLER', 'SUPER_ADMIN', 'ADMIN')
@Controller({ path: 'reseller-portal', version: '1' })
export class ResellerPortalController {
  constructor(private readonly centralPrisma: CentralPrismaService) {}

  /** Get the logged-in reseller's own profile */
  @Get('me')
  @ApiOperation({ summary: 'Get my reseller profile' })
  async getMyProfile(@CurrentUser() user: any) {
    const reseller = await this.centralPrisma.reseller.findFirst({
      where: { email: user.email },
      include: { _count: { select: { schools: true, commissions: true } } },
    });
    return { data: reseller };
  }

  /** Get all schools under my reseller account */
  @Get('schools')
  @ApiOperation({ summary: 'Get my schools' })
  async getMySchools(@CurrentUser() user: any, @Query() query: PaginationDto) {
    const reseller = await this.centralPrisma.reseller.findFirst({ where: { email: user.email } });

    if (!reseller) return { data: [], meta: buildPaginationMeta(0, query) };

    const where: any = { resellerId: reseller.id };
    if (query.search) {
      where.OR = [
        { name: { contains: query.search, mode: 'insensitive' } },
        { slug: { contains: query.search, mode: 'insensitive' } },
      ];
    }

    const [data, total] = await Promise.all([
      this.centralPrisma.school.findMany({
        where,
        skip: (query.page ?? 1 - 1) * (query.limit ?? 20),
        take: query.limit ?? 20,
        orderBy: { createdAt: 'desc' },
        include: {
          subscriptions: {
            where: { status: 'ACTIVE' },
            include: { plan: { select: { name: true, price: true, billingCycle: true } } },
            take: 1,
            orderBy: { createdAt: 'desc' },
          },
        },
      }),
      this.centralPrisma.school.count({ where }),
    ]);

    return { data, meta: buildPaginationMeta(total, query) };
  }

  /** Get my commission history */
  @Get('commissions')
  @ApiOperation({ summary: 'Get my commissions' })
  async getMyCommissions(@CurrentUser() user: any, @Query() query: PaginationDto) {
    const reseller = await this.centralPrisma.reseller.findFirst({ where: { email: user.email } });
    if (!reseller) return { data: [], meta: buildPaginationMeta(0, query) };

    const [data, total] = await Promise.all([
      this.centralPrisma.commission.findMany({
        where: { resellerId: reseller.id },
        skip: ((query.page ?? 1) - 1) * (query.limit ?? 20),
        take: query.limit ?? 20,
        orderBy: { createdAt: 'desc' },
        include: { school: { select: { name: true, slug: true, status: true } } },
      }),
      this.centralPrisma.commission.count({ where: { resellerId: reseller.id } }),
    ]);

    return { data, meta: buildPaginationMeta(total, query) };
  }

  /** Get my earnings stats */
  @Get('stats')
  @ApiOperation({ summary: 'Get my earnings stats' })
  async getMyStats(@CurrentUser() user: any) {
    const reseller = await this.centralPrisma.reseller.findFirst({
      where: { email: user.email },
      include: { _count: { select: { schools: true } } },
    });

    if (!reseller) return { data: null };

    const [totalCommission, pendingCommission, paidCommission] = await Promise.all([
      this.centralPrisma.commission.aggregate({ _sum: { amount: true }, where: { resellerId: reseller.id } }),
      this.centralPrisma.commission.aggregate({ _sum: { amount: true }, where: { resellerId: reseller.id, status: 'PENDING' } }),
      this.centralPrisma.commission.aggregate({ _sum: { amount: true }, where: { resellerId: reseller.id, status: 'PAID' } }),
    ]);

    const activeSchools = await this.centralPrisma.school.count({
      where: { resellerId: reseller.id, status: 'ACTIVE' },
    });

    const trialSchools = await this.centralPrisma.school.count({
      where: { resellerId: reseller.id, status: 'TRIAL' },
    });

    return {
      data: {
        reseller: {
          name: reseller.name,
          email: reseller.email,
          commissionPct: Number(reseller.commissionPct),
        },
        totalSchools: reseller._count.schools,
        activeSchools,
        trialSchools,
        totalCommission: Number(totalCommission._sum.amount) || 0,
        pendingCommission: Number(pendingCommission._sum.amount) || 0,
        paidCommission: Number(paidCommission._sum.amount) || 0,
        projectedMonthly: activeSchools * 3000,
      },
    };
  }
}
