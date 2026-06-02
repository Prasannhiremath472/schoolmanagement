import { Injectable } from '@nestjs/common';
import { TenantPrismaService } from '../../database/tenant-prisma.service';

@Injectable()
export class ReportsService {
  constructor(private readonly tenantPrisma: TenantPrismaService) {}
  private get db() { return this.tenantPrisma.db; }

  async getSchoolDashboard() {
    const [students, teachers, staff] = await Promise.all([
      this.db.student.count({ where: { status: 'ACTIVE' } }),
      this.db.teacher.count({ where: { status: 'ACTIVE' } }),
      this.db.staff.count({ where: { status: 'ACTIVE' } }),
    ]);
    return { data: { students, teachers, staff } };
  }

  async getAttendanceReport(sectionId: string, month: number, year: number) {
    const startDate = new Date(year, month - 1, 1);
    const endDate = new Date(year, month, 0);
    const data = await this.db.attendance.groupBy({
      by: ['status'],
      _count: { id: true },
      where: { sectionId, date: { gte: startDate, lte: endDate } },
    });
    return { data };
  }

  async getFeeReport(academicYearId: string) {
    const [collected, pending] = await Promise.all([
      this.db.feePayment.aggregate({ _sum: { paidAmount: true } }),
      this.db.feePayment.aggregate({ _sum: { dueAmount: true }, where: { dueAmount: { gt: 0 } } }),
    ]);
    return { data: { collected: Number(collected._sum.paidAmount) || 0, pending: Number(pending._sum.dueAmount) || 0 } };
  }

  async getStudentStrengthReport(academicYearId: string) {
    const data = await this.db.class.findMany({
      where: { academicYearId },
      include: { sections: { include: { _count: { select: { students: true } } } } },
      orderBy: { sortOrder: 'asc' },
    });
    return { data };
  }
}
