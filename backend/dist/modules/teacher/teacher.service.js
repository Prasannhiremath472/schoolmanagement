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
Object.defineProperty(exports, "__esModule", { value: true });
exports.TeacherService = void 0;
const common_1 = require("@nestjs/common");
const bcrypt = require("bcryptjs");
const tenant_prisma_service_1 = require("../../database/tenant-prisma.service");
const pagination_dto_1 = require("../../common/dto/pagination.dto");
let TeacherService = class TeacherService {
    constructor(tenantPrisma) {
        this.tenantPrisma = tenantPrisma;
    }
    get db() { return this.tenantPrisma.db; }
    async findAll(query) {
        const where = {};
        if (query.status)
            where.status = query.status;
        if (query.search)
            where.OR = [
                { firstName: { contains: query.search, mode: 'insensitive' } },
                { lastName: { contains: query.search, mode: 'insensitive' } },
                { employeeId: { contains: query.search, mode: 'insensitive' } },
            ];
        const [data, total] = await Promise.all([
            this.db.teacher.findMany({ where, ...(0, pagination_dto_1.getPaginationArgs)(query), orderBy: { firstName: 'asc' },
                include: { user: { select: { email: true, phone: true } }, subjects: { include: { subject: { select: { name: true } } } } } }),
            this.db.teacher.count({ where }),
        ]);
        return { data, meta: (0, pagination_dto_1.buildPaginationMeta)(total, query) };
    }
    async findOne(id) {
        const teacher = await this.db.teacher.findUnique({ where: { id },
            include: { user: { select: { email: true, phone: true } }, subjects: { include: { subject: true } }, classTeacher: true } });
        if (!teacher)
            throw new common_1.NotFoundException('Teacher not found');
        return { data: teacher };
    }
    async create(dto) {
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
                data: dto.subjectIds.map((subjectId) => ({ teacherId: teacher.id, subjectId })),
            });
        }
        return { data: teacher, message: 'Teacher created' };
    }
    async update(id, dto) {
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
};
exports.TeacherService = TeacherService;
exports.TeacherService = TeacherService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [tenant_prisma_service_1.TenantPrismaService])
], TeacherService);
//# sourceMappingURL=teacher.service.js.map