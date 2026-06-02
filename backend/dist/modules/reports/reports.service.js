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
exports.ReportsService = void 0;
const common_1 = require("@nestjs/common");
const tenant_prisma_service_1 = require("../../database/tenant-prisma.service");
let ReportsService = class ReportsService {
    constructor(tenantPrisma) {
        this.tenantPrisma = tenantPrisma;
    }
    get db() { return this.tenantPrisma.db; }
    async getSchoolDashboard() {
        const [students, teachers, staff] = await Promise.all([
            this.db.student.count({ where: { status: 'ACTIVE' } }),
            this.db.teacher.count({ where: { status: 'ACTIVE' } }),
            this.db.staff.count({ where: { status: 'ACTIVE' } }),
        ]);
        return { data: { students, teachers, staff } };
    }
    async getAttendanceReport(sectionId, month, year) {
        const startDate = new Date(year, month - 1, 1);
        const endDate = new Date(year, month, 0);
        const data = await this.db.attendance.groupBy({
            by: ['status'],
            _count: { id: true },
            where: { sectionId, date: { gte: startDate, lte: endDate } },
        });
        return { data };
    }
    async getFeeReport(academicYearId) {
        const [collected, pending] = await Promise.all([
            this.db.feePayment.aggregate({ _sum: { paidAmount: true } }),
            this.db.feePayment.aggregate({ _sum: { dueAmount: true }, where: { dueAmount: { gt: 0 } } }),
        ]);
        return { data: { collected: Number(collected._sum.paidAmount) || 0, pending: Number(pending._sum.dueAmount) || 0 } };
    }
    async getStudentStrengthReport(academicYearId) {
        const data = await this.db.class.findMany({
            where: { academicYearId },
            include: { sections: { include: { _count: { select: { students: true } } } } },
            orderBy: { sortOrder: 'asc' },
        });
        return { data };
    }
};
exports.ReportsService = ReportsService;
exports.ReportsService = ReportsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [tenant_prisma_service_1.TenantPrismaService])
], ReportsService);
//# sourceMappingURL=reports.service.js.map