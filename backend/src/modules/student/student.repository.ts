import { Injectable } from '@nestjs/common';
import { TenantPrismaService } from '../../database/tenant-prisma.service';
import { PaginationDto, getPaginationArgs } from '../../common/dto/pagination.dto';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';

@Injectable()
export class StudentRepository {
  constructor(private readonly tenantPrisma: TenantPrismaService) {}

  private get db() {
    return this.tenantPrisma.db;
  }

  async findAll(pagination: PaginationDto & { classId?: string; sectionId?: string; status?: string }) {
    const where: any = {};
    if (pagination.status) where.status = pagination.status;
    if (pagination.search) {
      where.OR = [
        { firstName: { contains: pagination.search, mode: 'insensitive' } },
        { lastName: { contains: pagination.search, mode: 'insensitive' } },
        { admissionNo: { contains: pagination.search, mode: 'insensitive' } },
      ];
    }
    if (pagination.sectionId) {
      where.sections = { some: { sectionId: pagination.sectionId, isActive: true } };
    }

    const [data, total] = await Promise.all([
      this.db.student.findMany({
        where,
        ...getPaginationArgs(pagination),
        orderBy: { [pagination.sortBy || 'createdAt']: pagination.sortOrder },
        include: {
          user: { select: { email: true, phone: true, isActive: true } },
          sections: {
            where: { isActive: true },
            include: {
              section: {
                include: { class: { select: { name: true } } },
              },
            },
          },
        },
      }),
      this.db.student.count({ where }),
    ]);

    return { data, total };
  }

  async findById(id: string) {
    return this.db.student.findUnique({
      where: { id },
      include: {
        user: { select: { email: true, phone: true, isActive: true, fcmToken: true } },
        sections: {
          include: {
            section: {
              include: {
                class: true,
                classTeacher: { select: { firstName: true, lastName: true } },
              },
            },
          },
        },
        parents: { include: { parent: true } },
        documents: true,
        transportAllocation: { include: { route: true } },
        hostelAllocation: { include: { room: { include: { hostel: true } } } },
      },
    });
  }

  async findByAdmissionNo(admissionNo: string) {
    return this.db.student.findUnique({ where: { admissionNo } });
  }

  async create(userId: string, data: CreateStudentDto) {
    return this.db.student.create({
      data: {
        userId,
        admissionNo: data.admissionNo,
        firstName: data.firstName,
        lastName: data.lastName,
        middleName: data.middleName,
        dateOfBirth: new Date(data.dateOfBirth),
        gender: data.gender as any,
        bloodGroup: data.bloodGroup,
        religion: data.religion,
        caste: data.caste,
        category: data.category as any,
        aadhaarNo: data.aadhaarNo,
        address: data.address,
        city: data.city,
        state: data.state,
        pincode: data.pincode,
        admissionDate: new Date(data.admissionDate),
        previousSchool: data.previousSchool,
      },
    });
  }

  async update(id: string, data: UpdateStudentDto) {
    return this.db.student.update({ where: { id }, data });
  }

  async delete(id: string) {
    return this.db.student.update({
      where: { id },
      data: { status: 'INACTIVE' },
    });
  }

  async assignSection(studentId: string, sectionId: string, rollNo?: string) {
    // Deactivate existing section
    await this.db.studentSection.updateMany({
      where: { studentId, isActive: true },
      data: { isActive: false, leftAt: new Date() },
    });

    return this.db.studentSection.create({
      data: { studentId, sectionId, rollNo, isActive: true },
    });
  }

  async getStats() {
    const [total, active, inactive, male, female] = await Promise.all([
      this.db.student.count(),
      this.db.student.count({ where: { status: 'ACTIVE' } }),
      this.db.student.count({ where: { status: 'INACTIVE' } }),
      this.db.student.count({ where: { gender: 'MALE' } }),
      this.db.student.count({ where: { gender: 'FEMALE' } }),
    ]);

    return { total, active, inactive, male, female };
  }
}
