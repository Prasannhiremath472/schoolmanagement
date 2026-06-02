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
exports.SchoolService = void 0;
const common_1 = require("@nestjs/common");
const central_prisma_service_1 = require("../../database/central-prisma.service");
const tenant_prisma_service_1 = require("../../database/tenant-prisma.service");
let SchoolService = class SchoolService {
    constructor(centralPrisma, tenantPrisma) {
        this.centralPrisma = centralPrisma;
        this.tenantPrisma = tenantPrisma;
    }
    async getSchoolProfile(slug) {
        const school = await this.centralPrisma.school.findUnique({
            where: { slug },
            select: { id: true, name: true, logo: true, favicon: true, primaryColor: true, secondaryColor: true, email: true, phone: true, address: true, city: true, state: true, country: true, timezone: true, currency: true },
        });
        return { data: school };
    }
    async updateSchoolSettings(slug, dto) {
        const school = await this.centralPrisma.school.findUnique({ where: { slug } });
        const settings = await this.centralPrisma.schoolSetting.upsert({
            where: { schoolId: school.id },
            update: dto,
            create: { schoolId: school.id, ...dto },
        });
        return { data: settings, message: 'Settings updated' };
    }
    async getSchoolStats(slug) {
        const db = this.tenantPrisma.db;
        const [students, teachers, staff] = await Promise.all([
            db.student.count({ where: { status: 'ACTIVE' } }),
            db.teacher.count({ where: { status: 'ACTIVE' } }),
            db.staff.count({ where: { status: 'ACTIVE' } }),
        ]);
        return { data: { students, teachers, staff } };
    }
};
exports.SchoolService = SchoolService;
exports.SchoolService = SchoolService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [central_prisma_service_1.CentralPrismaService,
        tenant_prisma_service_1.TenantPrismaService])
], SchoolService);
//# sourceMappingURL=school.service.js.map