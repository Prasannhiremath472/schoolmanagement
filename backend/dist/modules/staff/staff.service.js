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
exports.StaffService = void 0;
const common_1 = require("@nestjs/common");
const tenant_prisma_service_1 = require("../../database/tenant-prisma.service");
const pagination_dto_1 = require("../../common/dto/pagination.dto");
const bcrypt = require("bcryptjs");
let StaffService = class StaffService {
    constructor(tenantPrisma) {
        this.tenantPrisma = tenantPrisma;
    }
    get db() { return this.tenantPrisma.db; }
    async findAll(query) {
        const [data, total] = await Promise.all([this.db.staff.findMany({ ...(0, pagination_dto_1.getPaginationArgs)(query) }), this.db.staff.count()]);
        return { data, meta: (0, pagination_dto_1.buildPaginationMeta)(total, query) };
    }
    async findOne(id) { return { data: await this.db.staff.findUnique({ where: { id } }) }; }
    async create(dto) {
        const passwordHash = await bcrypt.hash(dto.password || dto.employeeId, 12);
        const user = await this.db.user.create({ data: { email: dto.email, phone: dto.phone, passwordHash, role: 'STAFF' } });
        const staff = await this.db.staff.create({ data: { userId: user.id, employeeId: dto.employeeId, firstName: dto.firstName, lastName: dto.lastName, designation: dto.designation, joiningDate: new Date(dto.joiningDate) } });
        return { data: staff, message: 'Staff created' };
    }
    async update(id, dto) { return { data: await this.db.staff.update({ where: { id }, data: dto }), message: 'Updated' }; }
};
exports.StaffService = StaffService;
exports.StaffService = StaffService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [tenant_prisma_service_1.TenantPrismaService])
], StaffService);
//# sourceMappingURL=staff.service.js.map