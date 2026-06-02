import { Injectable } from '@nestjs/common';
import { TenantPrismaService } from '../../database/tenant-prisma.service';
import { PaginationDto, buildPaginationMeta, getPaginationArgs } from '../../common/dto/pagination.dto';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class StaffService {
  constructor(private readonly tenantPrisma: TenantPrismaService) {}
  private get db() { return this.tenantPrisma.db; }
  async findAll(query: PaginationDto) {
    const [data, total] = await Promise.all([this.db.staff.findMany({ ...getPaginationArgs(query) }), this.db.staff.count()]);
    return { data, meta: buildPaginationMeta(total, query) };
  }
  async findOne(id: string) { return { data: await this.db.staff.findUnique({ where: { id } }) }; }
  async create(dto: any) {
    const passwordHash = await bcrypt.hash(dto.password || dto.employeeId, 12);
    const user = await this.db.user.create({ data: { email: dto.email, phone: dto.phone, passwordHash, role: 'STAFF' } });
    const staff = await this.db.staff.create({ data: { userId: user.id, employeeId: dto.employeeId, firstName: dto.firstName, lastName: dto.lastName, designation: dto.designation, joiningDate: new Date(dto.joiningDate) } });
    return { data: staff, message: 'Staff created' };
  }
  async update(id: string, dto: any) { return { data: await this.db.staff.update({ where: { id }, data: dto }), message: 'Updated' }; }
}
