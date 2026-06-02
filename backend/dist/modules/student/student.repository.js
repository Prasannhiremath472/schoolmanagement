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
exports.StudentRepository = void 0;
const common_1 = require("@nestjs/common");
const tenant_prisma_service_1 = require("../../database/tenant-prisma.service");
const pagination_dto_1 = require("../../common/dto/pagination.dto");
let StudentRepository = class StudentRepository {
    constructor(tenantPrisma) {
        this.tenantPrisma = tenantPrisma;
    }
    get db() {
        return this.tenantPrisma.db;
    }
    async findAll(pagination) {
        const where = {};
        if (pagination.status)
            where.status = pagination.status;
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
                ...(0, pagination_dto_1.getPaginationArgs)(pagination),
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
    async findById(id) {
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
    async findByAdmissionNo(admissionNo) {
        return this.db.student.findUnique({ where: { admissionNo } });
    }
    async create(userId, data) {
        return this.db.student.create({
            data: {
                userId,
                admissionNo: data.admissionNo,
                firstName: data.firstName,
                lastName: data.lastName,
                middleName: data.middleName,
                dateOfBirth: new Date(data.dateOfBirth),
                gender: data.gender,
                bloodGroup: data.bloodGroup,
                religion: data.religion,
                caste: data.caste,
                category: data.category,
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
    async update(id, data) {
        return this.db.student.update({ where: { id }, data });
    }
    async delete(id) {
        return this.db.student.update({
            where: { id },
            data: { status: 'INACTIVE' },
        });
    }
    async assignSection(studentId, sectionId, rollNo) {
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
};
exports.StudentRepository = StudentRepository;
exports.StudentRepository = StudentRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [tenant_prisma_service_1.TenantPrismaService])
], StudentRepository);
//# sourceMappingURL=student.repository.js.map