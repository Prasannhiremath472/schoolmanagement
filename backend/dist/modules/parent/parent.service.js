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
exports.ParentService = void 0;
const common_1 = require("@nestjs/common");
const tenant_prisma_service_1 = require("../../database/tenant-prisma.service");
const pagination_dto_1 = require("../../common/dto/pagination.dto");
let ParentService = class ParentService {
    constructor(tenantPrisma) {
        this.tenantPrisma = tenantPrisma;
    }
    get db() { return this.tenantPrisma.db; }
    async findAll(query) {
        const [data, total] = await Promise.all([
            this.db.parent.findMany({ include: { students: { include: { student: { select: { firstName: true, lastName: true, admissionNo: true } } } } } }),
            this.db.parent.count(),
        ]);
        return { data, meta: (0, pagination_dto_1.buildPaginationMeta)(total, query) };
    }
    async findOne(id) {
        return { data: await this.db.parent.findUnique({ where: { id }, include: { students: { include: { student: true } } } }) };
    }
    async create(dto) {
        const { studentIds, ...parentData } = dto;
        const parent = await this.db.parent.create({
            data: { ...parentData, user: { create: { email: dto.email, phone: dto.phone, passwordHash: dto.phone, role: 'PARENT' } } },
        });
        if (studentIds?.length) {
            await this.db.studentParent.createMany({ data: studentIds.map((studentId) => ({ studentId, parentId: parent.id })) });
        }
        return { data: parent, message: 'Parent created' };
    }
    async getChildrenDashboard(parentId) {
        const parent = await this.db.parent.findUnique({ where: { id: parentId }, include: { students: { include: { student: { include: { sections: { where: { isActive: true }, include: { section: { include: { class: true } } } } } } } } } });
        return { data: parent };
    }
};
exports.ParentService = ParentService;
exports.ParentService = ParentService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [tenant_prisma_service_1.TenantPrismaService])
], ParentService);
//# sourceMappingURL=parent.service.js.map