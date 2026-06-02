"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var StudentService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.StudentService = void 0;
const common_1 = require("@nestjs/common");
const bcrypt = require("bcryptjs");
const tenant_prisma_service_1 = require("../../database/tenant-prisma.service");
const student_repository_1 = require("./student.repository");
const pagination_dto_1 = require("../../common/dto/pagination.dto");
const event_emitter_1 = require("@nestjs/event-emitter");
let StudentService = StudentService_1 = class StudentService {
    constructor(studentRepo, tenantPrisma, eventEmitter) {
        this.studentRepo = studentRepo;
        this.tenantPrisma = tenantPrisma;
        this.eventEmitter = eventEmitter;
        this.logger = new common_1.Logger(StudentService_1.name);
    }
    async findAll(query) {
        const { data, total } = await this.studentRepo.findAll(query);
        return {
            data,
            meta: (0, pagination_dto_1.buildPaginationMeta)(total, query),
            message: 'Students retrieved successfully',
        };
    }
    async findOne(id) {
        const student = await this.studentRepo.findById(id);
        if (!student)
            throw new common_1.NotFoundException(`Student with id ${id} not found`);
        return { data: student, message: 'Student retrieved successfully' };
    }
    async create(dto) {
        const db = this.tenantPrisma.db;
        const existing = await this.studentRepo.findByAdmissionNo(dto.admissionNo);
        if (existing)
            throw new common_1.ConflictException(`Admission number ${dto.admissionNo} already exists`);
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
        if (dto.sectionId) {
            await this.studentRepo.assignSection(student.id, dto.sectionId, dto.rollNo);
        }
        this.eventEmitter.emit('student.created', { student });
        this.logger.log(`Student created: ${student.admissionNo}`);
        return { data: student, message: 'Student admitted successfully' };
    }
    async update(id, dto) {
        await this.findOne(id);
        const student = await this.studentRepo.update(id, dto);
        return { data: student, message: 'Student updated successfully' };
    }
    async delete(id) {
        await this.findOne(id);
        await this.studentRepo.delete(id);
        return { message: 'Student deactivated successfully' };
    }
    async promoteStudents(sectionId, newSectionId, studentIds) {
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
    async bulkImport(students) {
        const results = { success: 0, failed: 0, errors: [] };
        for (const student of students) {
            try {
                await this.create(student);
                results.success++;
            }
            catch (err) {
                results.failed++;
                results.errors.push({ admissionNo: student.admissionNo, error: err.message });
            }
        }
        return { data: results, message: `Imported: ${results.success} success, ${results.failed} failed` };
    }
    async getAttendanceSummary(studentId, month, year) {
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
    async transferStudent(studentId, dto) {
        const db = this.tenantPrisma.db;
        await this.findOne(studentId);
        const student = await db.student.update({
            where: { id: studentId },
            data: {
                status: 'TRANSFERRED',
                transferCertNo: dto.transferCertNo,
            },
        });
        await db.studentSection.updateMany({
            where: { studentId, isActive: true },
            data: { isActive: false, leftAt: new Date() },
        });
        this.logger.log(`Student ${studentId} transferred`);
        return { data: student, message: 'Student transferred successfully' };
    }
    async promoteToAlumni(studentId, dto) {
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
    async getAlumni(query) {
        const db = this.tenantPrisma.db;
        const where = { status: 'ALUMNI' };
        if (query.search) {
            where.OR = [
                { firstName: { contains: query.search, mode: 'insensitive' } },
                { admissionNo: { contains: query.search, mode: 'insensitive' } },
            ];
        }
        const [data, total] = await Promise.all([
            db.student.findMany({ where, ...(0, pagination_dto_1.getPaginationArgs)(query), orderBy: { updatedAt: 'desc' } }),
            db.student.count({ where }),
        ]);
        return { data, meta: (0, pagination_dto_1.buildPaginationMeta)(total, query) };
    }
    async getMedicalInfo(studentId) {
        const student = await this.tenantPrisma.db.student.findUnique({
            where: { id: studentId },
            select: {
                id: true, firstName: true, lastName: true, admissionNo: true,
                bloodGroup: true, medicalConditions: true, allergies: true, emergencyContact: true,
            },
        });
        if (!student)
            throw new common_1.NotFoundException(`Student ${studentId} not found`);
        return { data: student };
    }
    async updateMedicalInfo(studentId, dto) {
        await this.findOne(studentId);
        const student = await this.tenantPrisma.db.student.update({
            where: { id: studentId },
            data: dto,
        });
        return { data: student, message: 'Medical information updated' };
    }
    async getDocuments(studentId) {
        const docs = await this.tenantPrisma.db.studentDocument.findMany({
            where: { studentId },
            orderBy: { uploadedAt: 'desc' },
        });
        return { data: docs };
    }
    async addDocument(studentId, dto) {
        await this.findOne(studentId);
        const doc = await this.tenantPrisma.db.studentDocument.create({
            data: { studentId, ...dto },
        });
        return { data: doc, message: 'Document uploaded' };
    }
    async removeDocument(documentId) {
        await this.tenantPrisma.db.studentDocument.delete({ where: { id: documentId } });
        return { message: 'Document removed' };
    }
};
exports.StudentService = StudentService;
exports.StudentService = StudentService = StudentService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [student_repository_1.StudentRepository,
        tenant_prisma_service_1.TenantPrismaService,
        event_emitter_1.EventEmitter2])
], StudentService);
//# sourceMappingURL=student.service.js.map