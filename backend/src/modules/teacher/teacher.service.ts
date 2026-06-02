import { Injectable, NotFoundException } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { TenantPrismaService } from '../../database/tenant-prisma.service';
import { PaginationDto, buildPaginationMeta, getPaginationArgs } from '../../common/dto/pagination.dto';

@Injectable()
export class TeacherService {
  constructor(private readonly tenantPrisma: TenantPrismaService) {}
  private get db() { return this.tenantPrisma.db; }

  async findAll(query: PaginationDto & { departmentId?: string; status?: string }) {
    const where: any = {};
    if (query.status) where.status = query.status;
    if (query.search) where.OR = [
      { firstName: { contains: query.search, mode: 'insensitive' } },
      { lastName: { contains: query.search, mode: 'insensitive' } },
      { employeeId: { contains: query.search, mode: 'insensitive' } },
    ];
    const [data, total] = await Promise.all([
      this.db.teacher.findMany({ where, ...getPaginationArgs(query), orderBy: { firstName: 'asc' },
        include: { user: { select: { email: true, phone: true } }, subjects: { include: { subject: { select: { name: true } } } } } }),
      this.db.teacher.count({ where }),
    ]);
    return { data, meta: buildPaginationMeta(total, query) };
  }

  async findOne(id: string) {
    const teacher = await this.db.teacher.findUnique({ where: { id },
      include: { user: { select: { email: true, phone: true } }, subjects: { include: { subject: true } }, classTeacher: true } });
    if (!teacher) throw new NotFoundException('Teacher not found');
    return { data: teacher };
  }

  async create(dto: any) {
    const passwordHash = await bcrypt.hash(dto.password || dto.employeeId, 12);
    const user = await this.db.user.create({
      data: { email: dto.email, phone: dto.phone, passwordHash, role: 'TEACHER' },
    });
    const teacher = await this.db.teacher.create({
      data: { userId: user.id, employeeId: dto.employeeId, firstName: dto.firstName, lastName: dto.lastName,
        dateOfBirth: dto.dateOfBirth ? new Date(dto.dateOfBirth) : null,
        gender: dto.gender, qualification: dto.qualification, experience: dto.experience || 0,
        joiningDate: new Date(dto.joiningDate), designation: dto.designation, department: dto.department,
        phone: dto.phone, email: dto.email },
    });
    if (dto.subjectIds?.length) {
      await this.db.teacherSubject.createMany({
        data: dto.subjectIds.map((subjectId: string) => ({ teacherId: teacher.id, subjectId })),
      });
    }
    return { data: teacher, message: 'Teacher created' };
  }

  async update(id: string, dto: any) {
    const teacher = await this.db.teacher.update({ where: { id }, data: dto });
    return { data: teacher, message: 'Teacher updated' };
  }

  async getStats() {
    const [total, active, male, female] = await Promise.all([
      this.db.teacher.count(), this.db.teacher.count({ where: { status: 'ACTIVE' } }),
      this.db.teacher.count({ where: { gender: 'MALE' } }), this.db.teacher.count({ where: { gender: 'FEMALE' } }),
    ]);
    return { data: { total, active, male, female } };
  }
}
