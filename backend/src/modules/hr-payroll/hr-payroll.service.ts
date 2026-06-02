import { Injectable } from '@nestjs/common';
import { TenantPrismaService } from '../../database/tenant-prisma.service';
import { PaginationDto, buildPaginationMeta, getPaginationArgs } from '../../common/dto/pagination.dto';

@Injectable()
export class HrPayrollService {
  constructor(private readonly tenantPrisma: TenantPrismaService) {}
  private get db() { return this.tenantPrisma.db; }
  async getSalaryStructures() { return { data: await this.db.salaryStructure.findMany({ where: { isActive: true } }) }; }
  async createSalaryStructure(dto: any) { return { data: await this.db.salaryStructure.create({ data: dto }), message: 'Salary structure created' }; }
  async getLeaveApplications(query: Partial<PaginationDto> & { status?: string }) {
    const where: any = {};
    if (query.status) where.status = query.status;
    const [data, total] = await Promise.all([this.db.leaveApplication.findMany({ where, ...getPaginationArgs(query), orderBy: { appliedAt: 'desc' } }), this.db.leaveApplication.count({ where })]);
    return { data, meta: buildPaginationMeta(total, query) };
  }
  async applyLeave(dto: any) { return { data: await this.db.leaveApplication.create({ data: { ...dto, fromDate: new Date(dto.fromDate), toDate: new Date(dto.toDate) } }), message: 'Leave applied' }; }
  async approveLeave(id: string, status: string, approvedBy: string) { return { data: await this.db.leaveApplication.update({ where: { id }, data: { status: status as any, approvedBy } }), message: `Leave ${status.toLowerCase()}` }; }
  async processSalary(dto: { teacherId?: string; staffId?: string; month: number; year: number; salaryStructureId: string }) {
    const salaryStructure = await this.db.salaryStructure.findUnique({ where: { id: dto.salaryStructureId } });
    const data = await this.db.salary.create({ data: { ...dto, basicPaid: salaryStructure.basic, allowances: Number(salaryStructure.hra) + Number(salaryStructure.da) + Number(salaryStructure.ta), deductions: Number(salaryStructure.pf) + Number(salaryStructure.esi), grossSalary: salaryStructure.grossSalary, netSalary: salaryStructure.netSalary, workingDays: 26, presentDays: 26, leaveDays: 0 } });
    return { data, message: 'Salary processed' };
  }
  async getSalaries(query: Partial<PaginationDto> & { month?: number; year?: number }) {
    const where: any = {};
    if (query.month) where.month = +query.month;
    if (query.year) where.year = +query.year;
    const [data, total] = await Promise.all([this.db.salary.findMany({ where, ...getPaginationArgs(query), orderBy: { createdAt: 'desc' } }), this.db.salary.count({ where })]);
    return { data, meta: buildPaginationMeta(total, query) };
  }
}
