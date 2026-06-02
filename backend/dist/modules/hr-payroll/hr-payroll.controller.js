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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HrPayrollController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const hr_payroll_service_1 = require("./hr-payroll.service");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const roles_guard_1 = require("../auth/guards/roles.guard");
const roles_decorator_1 = require("../auth/decorators/roles.decorator");
const current_user_decorator_1 = require("../auth/decorators/current-user.decorator");
const pagination_dto_1 = require("../../common/dto/pagination.dto");
let HrPayrollController = class HrPayrollController {
    constructor(hrPayrollService) {
        this.hrPayrollService = hrPayrollService;
    }
    getSalaryStructures() { return this.hrPayrollService.getSalaryStructures(); }
    createSalaryStructure(dto) { return this.hrPayrollService.createSalaryStructure(dto); }
    getLeaves(q, status) { return this.hrPayrollService.getLeaveApplications({ ...q, status }); }
    applyLeave(dto) { return this.hrPayrollService.applyLeave(dto); }
    approveLeave(id, status, userId) { return this.hrPayrollService.approveLeave(id, status, userId); }
    processSalary(dto) { return this.hrPayrollService.processSalary(dto); }
    getSalaries(q, month, year) { return this.hrPayrollService.getSalaries({ ...q, month, year }); }
};
exports.HrPayrollController = HrPayrollController;
__decorate([
    (0, common_1.Get)('salary-structures'),
    (0, swagger_1.ApiOperation)({ summary: 'Get salary structures' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], HrPayrollController.prototype, "getSalaryStructures", null);
__decorate([
    (0, common_1.Post)('salary-structures'),
    (0, roles_decorator_1.Roles)('SCHOOL_ADMIN'),
    (0, swagger_1.ApiOperation)({ summary: 'Create salary structure' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], HrPayrollController.prototype, "createSalaryStructure", null);
__decorate([
    (0, common_1.Get)('leaves'),
    (0, swagger_1.ApiOperation)({ summary: 'Get leave applications' }),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, common_1.Query)('status')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [pagination_dto_1.PaginationDto, String]),
    __metadata("design:returntype", void 0)
], HrPayrollController.prototype, "getLeaves", null);
__decorate([
    (0, common_1.Post)('leaves'),
    (0, swagger_1.ApiOperation)({ summary: 'Apply for leave' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], HrPayrollController.prototype, "applyLeave", null);
__decorate([
    (0, common_1.Patch)('leaves/:id'),
    (0, roles_decorator_1.Roles)('SCHOOL_ADMIN'),
    (0, swagger_1.ApiOperation)({ summary: 'Approve/Reject leave' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __param(1, (0, common_1.Body)('status')),
    __param(2, (0, current_user_decorator_1.CurrentUser)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String]),
    __metadata("design:returntype", void 0)
], HrPayrollController.prototype, "approveLeave", null);
__decorate([
    (0, common_1.Post)('salary/process'),
    (0, roles_decorator_1.Roles)('SCHOOL_ADMIN'),
    (0, swagger_1.ApiOperation)({ summary: 'Process salary' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], HrPayrollController.prototype, "processSalary", null);
__decorate([
    (0, common_1.Get)('salaries'),
    (0, roles_decorator_1.Roles)('SCHOOL_ADMIN'),
    (0, swagger_1.ApiOperation)({ summary: 'Get salary records' }),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, common_1.Query)('month')),
    __param(2, (0, common_1.Query)('year')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [pagination_dto_1.PaginationDto, Number, Number]),
    __metadata("design:returntype", void 0)
], HrPayrollController.prototype, "getSalaries", null);
exports.HrPayrollController = HrPayrollController = __decorate([
    (0, swagger_1.ApiTags)('HR & Payroll'),
    (0, swagger_1.ApiBearerAuth)('access-token'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, common_1.Controller)({ path: 'hr-payroll', version: '1' }),
    __metadata("design:paramtypes", [hr_payroll_service_1.HrPayrollService])
], HrPayrollController);
//# sourceMappingURL=hr-payroll.controller.js.map