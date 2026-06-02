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
exports.AnalyticsService = void 0;
const common_1 = require("@nestjs/common");
const tenant_prisma_service_1 = require("../../database/tenant-prisma.service");
let AnalyticsService = class AnalyticsService {
    constructor(tenantPrisma) {
        this.tenantPrisma = tenantPrisma;
    }
    get db() { return this.tenantPrisma.db; }
    async getOverview() {
        const [students, teachers, staff, totalFees] = await Promise.all([
            this.db.student.count({ where: { status: 'ACTIVE' } }),
            this.db.teacher.count({ where: { status: 'ACTIVE' } }),
            this.db.staff.count({ where: { status: 'ACTIVE' } }),
            this.db.feePayment.aggregate({ _sum: { paidAmount: true } }),
        ]);
        return { data: { students, teachers, staff, totalFees: Number(totalFees._sum.paidAmount) || 0 } };
    }
    async getAttendanceTrend(days = 30) {
        const endDate = new Date();
        const startDate = new Date(endDate);
        startDate.setDate(startDate.getDate() - days);
        const data = await this.db.attendance.groupBy({
            by: ['date', 'status'],
            _count: { id: true },
            where: { date: { gte: startDate, lte: endDate } },
            orderBy: { date: 'asc' },
        });
        return { data };
    }
    async getFeeTrend(months = 6) {
        const data = await this.db.feePayment.groupBy({
            by: ['paymentDate'],
            _sum: { paidAmount: true },
            orderBy: { paymentDate: 'asc' },
        });
        return { data };
    }
};
exports.AnalyticsService = AnalyticsService;
exports.AnalyticsService = AnalyticsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [tenant_prisma_service_1.TenantPrismaService])
], AnalyticsService);
//# sourceMappingURL=analytics.service.js.map