import {
  Injectable,
  NotFoundException,
  ConflictException,
  Logger,
} from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { TenantPrismaService } from '../../database/tenant-prisma.service';
import { StudentRepository } from './student.repository';
import { PaginationDto, buildPaginationMeta, getPaginationArgs } from '../../common/dto/pagination.dto';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { EventEmitter2 } from '@nestjs/event-emitter';

@Injectable()
export class StudentService {
  private readonly logger = new Logger(StudentService.name);

  constructor(
    private readonly studentRepo: StudentRepository,
    private readonly tenantPrisma: TenantPrismaService,
    private readonly eventEmitter: EventEmitter2,
  ) {}

  async findAll(query: Partial<PaginationDto> & { classId?: string; sectionId?: string; status?: string }) {
    const { data, total } = await this.studentRepo.findAll(query);
    return {
      data,
      meta: buildPaginationMeta(total, query),
      message: 'Students retrieved successfully',
    };
  }

  async findOne(id: string) {
    const student = await this.studentRepo.findById(id);
    if (!student) throw new NotFoundException(`Student with id ${id} not found`);
    return { data: student, message: 'Student retrieved successfully' };
  }

  async create(dto: CreateStudentDto) {
    const db = this.tenantPrisma.db;

    // Check duplicate admission number
    const existing = await this.studentRepo.findByAdmissionNo(dto.admissionNo);
    if (existing) throw new ConflictException(`Admission number ${dto.admissionNo} already exists`);

    // Create user account
    const passwordHash = await bcrypt.hash(dto.password || dto.admissionNo, 12);
    const user = await db.user.create({
      data: {
        email: dto.email,
        phone: dto.phone,
        passwordHash,
        role: 'STUDENT',
      },
    });

    const student = await this.studentRepo.create(user.id, dto);

    // Assign to section if provided
    if (dto.sectionId) {
      await this.studentRepo.assignSection(student.id, dto.sectionId, dto.rollNo);
    }

    this.eventEmitter.emit('student.created', { student });
    this.logger.log(`Student created: ${student.admissionNo}`);

    return { data: student, message: 'Student admitted successfully' };
  }

  async update(id: string, dto: UpdateStudentDto) {
    await this.findOne(id);
    const student = await this.studentRepo.update(id, dto);
    return { data: student, message: 'Student updated successfully' };
  }

  async delete(id: string) {
    await this.findOne(id);
    await this.studentRepo.delete(id);
    return { message: 'Student deactivated successfully' };
  }

  async promoteStudents(sectionId: string, newSectionId: string, studentIds: string[]) {
    const db = this.tenantPrisma.db;
    const results = [];

    for (const studentId of studentIds) {
      await this.studentRepo.assignSection(studentId, newSectionId);
      results.push(studentId);
    }

    this.eventEmitter.emit('students.promoted', { sectionId, newSectionId, count: results.length });
    return { data: results, message: `${results.length} students promoted successfully` };
  }

  async getStats() {
    const stats = await this.studentRepo.getStats();
    return { data: stats };
  }

  async bulkImport(students: CreateStudentDto[]) {
    const results = { success: 0, failed: 0, errors: [] as any[] };

    for (const student of students) {
      try {
        await this.create(student);
        results.success++;
      } catch (err) {
        results.failed++;
        results.errors.push({ admissionNo: student.admissionNo, error: err.message });
      }
    }

    return { data: results, message: `Imported: ${results.success} success, ${results.failed} failed` };
  }

  async getAttendanceSummary(studentId: string, month: number, year: number) {
    const db = this.tenantPrisma.db;
    const startDate = new Date(year, month - 1, 1);
    const endDate = new Date(year, month, 0);

    const attendances = await db.attendance.findMany({
      where: {
        studentId,
        date: { gte: startDate, lte: endDate },
      },
    });

    const total = attendances.length;
    const present = attendances.filter((a) => a.status === 'PRESENT').length;
    const absent = attendances.filter((a) => a.status === 'ABSENT').length;
    const late = attendances.filter((a) => a.status === 'LATE').length;

    return {
      data: {
        total,
        present,
        absent,
        late,
        percentage: total > 0 ? ((present / total) * 100).toFixed(2) : 0,
      },
    };
  }

  // ─── TRANSFER ─────────────────────────────────────────────────────────────

  async transferStudent(studentId: string, dto: {
    transferCertNo?: string;
    transferDate: string;
    reason?: string;
    destinationSchool?: string;
  }) {
    const db = this.tenantPrisma.db;
    await this.findOne(studentId);

    const student = await db.student.update({
      where: { id: studentId },
      data: {
        status: 'TRANSFERRED',
        transferCertNo: dto.transferCertNo,
      },
    });

    // Deactivate all section assignments
    await db.studentSection.updateMany({
      where: { studentId, isActive: true },
      data: { isActive: false, leftAt: new Date() },
    });

    this.logger.log(`Student ${studentId} transferred`);
    return { data: student, message: 'Student transferred successfully' };
  }

  // ─── ALUMNI ───────────────────────────────────────────────────────────────

  async promoteToAlumni(studentId: string, dto: { graduationYear: number; remarks?: string }) {
    const db = this.tenantPrisma.db;
    const student = await db.student.update({
      where: { id: studentId },
      data: { status: 'ALUMNI' },
    });

    await db.studentSection.updateMany({
      where: { studentId, isActive: true },
      data: { isActive: false, leftAt: new Date() },
    });

    return { data: student, message: 'Student marked as alumni' };
  }

  async getAlumni(query: Partial<PaginationDto> & { year?: number }) {
    const db = this.tenantPrisma.db;
    const where: any = { status: 'ALUMNI' };
    if (query.search) {
      where.OR = [
        { firstName: { contains: query.search, mode: 'insensitive' } },
        { admissionNo: { contains: query.search, mode: 'insensitive' } },
      ];
    }
    const [data, total] = await Promise.all([
      db.student.findMany({ where, ...getPaginationArgs(query), orderBy: { updatedAt: 'desc' } }),
      db.student.count({ where }),
    ]);
    return { data, meta: buildPaginationMeta(total, query) };
  }

  // ─── MEDICAL RECORDS ──────────────────────────────────────────────────────

  async getMedicalInfo(studentId: string) {
    const student = await this.tenantPrisma.db.student.findUnique({
      where: { id: studentId },
      select: {
        id: true, firstName: true, lastName: true, admissionNo: true,
        bloodGroup: true, medicalConditions: true, allergies: true, emergencyContact: true,
      },
    });
    if (!student) throw new NotFoundException(`Student ${studentId} not found`);
    return { data: student };
  }

  async updateMedicalInfo(studentId: string, dto: {
    bloodGroup?: string;
    medicalConditions?: string;
    allergies?: string;
    emergencyContact?: string;
  }) {
    await this.findOne(studentId);
    const student = await this.tenantPrisma.db.student.update({
      where: { id: studentId },
      data: dto,
    });
    return { data: student, message: 'Medical information updated' };
  }

  // ─── DOCUMENTS ────────────────────────────────────────────────────────────

  async getDocuments(studentId: string) {
    const docs = await this.tenantPrisma.db.studentDocument.findMany({
      where: { studentId },
      orderBy: { uploadedAt: 'desc' },
    });
    return { data: docs };
  }

  async addDocument(studentId: string, dto: { type: string; fileName: string; fileUrl: string }) {
    await this.findOne(studentId);
    const doc = await this.tenantPrisma.db.studentDocument.create({
      data: { studentId, ...dto },
    });
    return { data: doc, message: 'Document uploaded' };
  }

  async removeDocument(documentId: string) {
    await this.tenantPrisma.db.studentDocument.delete({ where: { id: documentId } });
    return { message: 'Document removed' };
  }
}
