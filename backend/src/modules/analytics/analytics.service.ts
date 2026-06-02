import { Injectable } from '@nestjs/common';
import { TenantPrismaService } from '../../database/tenant-prisma.service';

@Injectable()
export class AnalyticsService {
  constructor(private readonly tenantPrisma: TenantPrismaService) {}
  private get db() { return this.tenantPrisma.db; }

  async getOverview() {
    const [students, teachers, staff, totalFees] = await Promise.all([
      this.db.student.count({ where: { status: 'ACTIVE' } }),
      this.db.teacher.count({ where: { status: 'ACTIVE' } }),
      this.db.staff.count({ where: { status: 'ACTIVE' } }),
      this.db.feePayment.aggregate({ _sum: { paidAmount: true } }),
    ]);
    return { data: { students, teachers, staff, totalFees: Number(totalFees._sum.paidAmount) || 0 } };
  }

  async getAttendanceTrend(days = 30) {
    const endDate = new Date();
    const startDate = new Date(endDate);
    startDate.setDate(startDate.getDate() - days);
    const data = await this.db.attendance.groupBy({
      by: ['date', 'status'],
      _count: { id: true },
      where: { date: { gte: startDate, lte: endDate } },
      orderBy: { date: 'asc' },
    });
    return { data };
  }

  async getFeeTrend(months = 6) {
    const data = await this.db.feePayment.groupBy({
      by: ['paymentDate'],
      _sum: { paidAmount: true },
      orderBy: { paymentDate: 'asc' },
    });
    return { data };
  }
}
