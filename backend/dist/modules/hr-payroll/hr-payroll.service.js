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
exports.HrPayrollService = void 0;
const common_1 = require("@nestjs/common");
const tenant_prisma_service_1 = require("../../database/tenant-prisma.service");
const pagination_dto_1 = require("../../common/dto/pagination.dto");
let HrPayrollService = class HrPayrollService {
    constructor(tenantPrisma) {
        this.tenantPrisma = tenantPrisma;
    }
    get db() { return this.tenantPrisma.db; }
    async getSalaryStructures() { return { data: await this.db.salaryStructure.findMany({ where: { isActive: true } }) }; }
    async createSalaryStructure(dto) { return { data: await this.db.salaryStructure.create({ data: dto }), message: 'Salary structure created' }; }
    async getLeaveApplications(query) {
        const where = {};
        if (query.status)
            where.status = query.status;
        const [data, total] = await Promise.all([this.db.leaveApplication.findMany({ where, ...(0, pagination_dto_1.getPaginationArgs)(query), orderBy: { appliedAt: 'desc' } }), this.db.leaveApplication.count({ where })]);
        return { data, meta: (0, pagination_dto_1.buildPaginationMeta)(total, query) };
    }
    async applyLeave(dto) { return { data: await this.db.leaveApplication.create({ data: { ...dto, fromDate: new Date(dto.fromDate), toDate: new Date(dto.toDate) } }), message: 'Leave applied' }; }
    async approveLeave(id, status, approvedBy) { return { data: await this.db.leaveApplication.update({ where: { id }, data: { status: status, approvedBy } }), message: `Leave ${status.toLowerCase()}` }; }
    async processSalary(dto) {
        const salaryStructure = await this.db.salaryStructure.findUnique({ where: { id: dto.salaryStructureId } });
        const data = await this.db.salary.create({ data: { ...dto, basicPaid: salaryStructure.basic, allowances: Number(salaryStructure.hra) + Number(salaryStructure.da) + Number(salaryStructure.ta), deductions: Number(salaryStructure.pf) + Number(salaryStructure.esi), grossSalary: salaryStructure.grossSalary, netSalary: salaryStructure.netSalary, workingDays: 26, presentDays: 26, leaveDays: 0 } });
        return { data, message: 'Salary processed' };
    }
    async getSalaries(query) {
        const where = {};
        if (query.month)
            where.month = +query.month;
        if (query.year)
            where.year = +query.year;
        const [data, total] = await Promise.all([this.db.salary.findMany({ where, ...(0, pagination_dto_1.getPaginationArgs)(query), orderBy: { createdAt: 'desc' } }), this.db.salary.count({ where })]);
        return { data, meta: (0, pagination_dto_1.buildPaginationMeta)(total, query) };
    }
};
exports.HrPayrollService = HrPayrollService;
exports.HrPayrollService = HrPayrollService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [tenant_prisma_service_1.TenantPrismaService])
], HrPayrollService);
//# sourceMappingURL=hr-payroll.service.js.map