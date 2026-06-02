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
exports.FeesController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const fees_service_1 = require("./fees.service");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const roles_guard_1 = require("../auth/guards/roles.guard");
const roles_decorator_1 = require("../auth/decorators/roles.decorator");
const current_user_decorator_1 = require("../auth/decorators/current-user.decorator");
const pagination_dto_1 = require("../../common/dto/pagination.dto");
const fees_dto_1 = require("./dto/fees.dto");
let FeesController = class FeesController {
    constructor(feesService) {
        this.feesService = feesService;
    }
    getCategories() { return this.feesService.getCategories(); }
    createCategory(dto) { return this.feesService.createCategory(dto); }
    getFeeStructures(classId, academicYearId) { return this.feesService.getFeeStructures(classId, academicYearId); }
    createFeeStructure(dto) {
        return this.feesService.createFeeStructure(dto);
    }
    collectFee(dto, userId) {
        return this.feesService.collectFee(dto, userId);
    }
    getStudentFees(studentId, academicYearId) { return this.feesService.getStudentFeeDetails(studentId, academicYearId); }
    getPayments(pagination, studentId, fromDate, toDate) { return this.feesService.getPayments({ ...pagination, studentId, fromDate, toDate }); }
    getStats(academicYearId) {
        return this.feesService.getDashboardStats(academicYearId);
    }
    getDueReminders() { return this.feesService.getDueReminders(); }
    getScholarships() { return this.feesService.getScholarships(); }
    createScholarship(dto) { return this.feesService.createScholarship(dto); }
    updateScholarship(id, dto) { return this.feesService.updateScholarship(id, dto); }
    applyScholarship(dto) { return this.feesService.applyScholarship(dto); }
    grantConcession(dto, userId) { return this.feesService.grantConcession({ ...dto, approvedBy: userId }); }
};
exports.FeesController = FeesController;
__decorate([
    (0, common_1.Get)('categories'),
    (0, roles_decorator_1.Roles)('SCHOOL_ADMIN', 'ACCOUNTANT'),
    (0, swagger_1.ApiOperation)({ summary: 'Get all fee categories' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], FeesController.prototype, "getCategories", null);
__decorate([
    (0, common_1.Post)('categories'),
    (0, roles_decorator_1.Roles)('SCHOOL_ADMIN'),
    (0, swagger_1.ApiOperation)({ summary: 'Create fee category' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [fees_dto_1.CreateFeeCategoryDto]),
    __metadata("design:returntype", void 0)
], FeesController.prototype, "createCategory", null);
__decorate([
    (0, common_1.Get)('structures'),
    (0, roles_decorator_1.Roles)('SCHOOL_ADMIN', 'ACCOUNTANT', 'TEACHER'),
    (0, swagger_1.ApiOperation)({ summary: 'Get fee structures' }),
    (0, swagger_1.ApiQuery)({ name: 'classId', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'academicYearId', required: false }),
    __param(0, (0, common_1.Query)('classId')),
    __param(1, (0, common_1.Query)('academicYearId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], FeesController.prototype, "getFeeStructures", null);
__decorate([
    (0, common_1.Post)('structures'),
    (0, roles_decorator_1.Roles)('SCHOOL_ADMIN'),
    (0, swagger_1.ApiOperation)({ summary: 'Create fee structure for a class' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [fees_dto_1.CreateFeeStructureDto]),
    __metadata("design:returntype", void 0)
], FeesController.prototype, "createFeeStructure", null);
__decorate([
    (0, common_1.Post)('collect'),
    (0, roles_decorator_1.Roles)('SCHOOL_ADMIN', 'ACCOUNTANT'),
    (0, swagger_1.ApiOperation)({ summary: 'Collect fee payment' }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, current_user_decorator_1.CurrentUser)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [fees_dto_1.CollectFeeDto, String]),
    __metadata("design:returntype", void 0)
], FeesController.prototype, "collectFee", null);
__decorate([
    (0, common_1.Get)('student/:studentId'),
    (0, roles_decorator_1.Roles)('SCHOOL_ADMIN', 'ACCOUNTANT', 'PARENT', 'STUDENT'),
    (0, swagger_1.ApiOperation)({ summary: 'Get student fee details and payment history' }),
    (0, swagger_1.ApiQuery)({ name: 'academicYearId', required: true }),
    __param(0, (0, common_1.Param)('studentId', common_1.ParseUUIDPipe)),
    __param(1, (0, common_1.Query)('academicYearId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], FeesController.prototype, "getStudentFees", null);
__decorate([
    (0, common_1.Get)('payments'),
    (0, roles_decorator_1.Roles)('SCHOOL_ADMIN', 'ACCOUNTANT'),
    (0, swagger_1.ApiOperation)({ summary: 'Get all fee payments' }),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, common_1.Query)('studentId')),
    __param(2, (0, common_1.Query)('fromDate')),
    __param(3, (0, common_1.Query)('toDate')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [pagination_dto_1.PaginationDto, String, String, String]),
    __metadata("design:returntype", void 0)
], FeesController.prototype, "getPayments", null);
__decorate([
    (0, common_1.Get)('stats'),
    (0, roles_decorator_1.Roles)('SCHOOL_ADMIN', 'ACCOUNTANT'),
    (0, swagger_1.ApiOperation)({ summary: 'Get fee collection statistics' }),
    (0, swagger_1.ApiQuery)({ name: 'academicYearId', required: true }),
    __param(0, (0, common_1.Query)('academicYearId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], FeesController.prototype, "getStats", null);
__decorate([
    (0, common_1.Get)('due-reminders'),
    (0, roles_decorator_1.Roles)('SCHOOL_ADMIN', 'ACCOUNTANT'),
    (0, swagger_1.ApiOperation)({ summary: 'Get overdue fee installments' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], FeesController.prototype, "getDueReminders", null);
__decorate([
    (0, common_1.Get)('scholarships'),
    (0, swagger_1.ApiOperation)({ summary: 'Get all scholarships' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], FeesController.prototype, "getScholarships", null);
__decorate([
    (0, common_1.Post)('scholarships'),
    (0, roles_decorator_1.Roles)('SCHOOL_ADMIN'),
    (0, swagger_1.ApiOperation)({ summary: 'Create scholarship' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], FeesController.prototype, "createScholarship", null);
__decorate([
    (0, common_1.Put)('scholarships/:id'),
    (0, roles_decorator_1.Roles)('SCHOOL_ADMIN'),
    (0, swagger_1.ApiOperation)({ summary: 'Update scholarship' }),
    __param(0, (0, common_1.Param)('scholarshipId', common_1.ParseUUIDPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], FeesController.prototype, "updateScholarship", null);
__decorate([
    (0, common_1.Post)('scholarships/apply'),
    (0, roles_decorator_1.Roles)('SCHOOL_ADMIN', 'ACCOUNTANT'),
    (0, swagger_1.ApiOperation)({ summary: 'Apply scholarship to student' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], FeesController.prototype, "applyScholarship", null);
__decorate([
    (0, common_1.Post)('concession'),
    (0, roles_decorator_1.Roles)('SCHOOL_ADMIN', 'ACCOUNTANT'),
    (0, swagger_1.ApiOperation)({ summary: 'Grant fee concession/waiver' }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, current_user_decorator_1.CurrentUser)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", void 0)
], FeesController.prototype, "grantConcession", null);
exports.FeesController = FeesController = __decorate([
    (0, swagger_1.ApiTags)('Fees'),
    (0, swagger_1.ApiBearerAuth)('access-token'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, common_1.Controller)({ path: 'fees', version: '1' }),
    __metadata("design:paramtypes", [fees_service_1.FeesService])
], FeesController);
//# sourceMappingURL=fees.controller.js.map