import { Injectable } from '@nestjs/common';
import { TenantPrismaService } from '../../database/tenant-prisma.service';
import { PaginationDto, buildPaginationMeta, getPaginationArgs } from '../../common/dto/pagination.dto';

@Injectable()
export class ParentService {
  constructor(private readonly tenantPrisma: TenantPrismaService) {}
  private get db() { return this.tenantPrisma.db; }

  async findAll(query: PaginationDto) {
    const [data, total] = await Promise.all([
      this.db.parent.findMany({   include: { students: { include: { student: { select: { firstName: true, lastName: true, admissionNo: true } } } } } }),
      this.db.parent.count(),
    ]);
    return { data, meta: buildPaginationMeta(total, query) };
  }

  async findOne(id: string) {
    return { data: await this.db.parent.findUnique({ where: { id }, include: { students: { include: { student: true } } } }) };
  }

  async create(dto: any) {
    const { studentIds, ...parentData } = dto;
    const parent = await this.db.parent.create({
      data: { ...parentData, user: { create: { email: dto.email, phone: dto.phone, passwordHash: dto.phone, role: 'PARENT' } } },
    });
    if (studentIds?.length) {
      await this.db.studentParent.createMany({ data: studentIds.map((studentId: string) => ({ studentId, parentId: parent.id })) });
    }
    return { data: parent, message: 'Parent created' };
  }

  async getChildrenDashboard(parentId: string) {
    const parent = await this.db.parent.findUnique({ where: { id: parentId }, include: { students: { include: { student: { include: { sections: { where: { isActive: true }, include: { section: { include: { class: true } } } } } } } } } });
    return { data: parent };
  }
}
