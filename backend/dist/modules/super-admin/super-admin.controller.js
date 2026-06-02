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
exports.SuperAdminController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const super_admin_service_1 = require("./super-admin.service");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const roles_guard_1 = require("../auth/guards/roles.guard");
const roles_decorator_1 = require("../auth/decorators/roles.decorator");
const pagination_dto_1 = require("../../common/dto/pagination.dto");
const school_dto_1 = require("./dto/school.dto");
let SuperAdminController = class SuperAdminController {
    constructor(superAdminService) {
        this.superAdminService = superAdminService;
    }
    getDashboard() { return this.superAdminService.getDashboardStats(); }
    getSchools(query, status) {
        return this.superAdminService.getSchools({ ...query, status });
    }
    getSchool(id) {
        return this.superAdminService.getSchool(id);
    }
    createSchool(dto) {
        return this.superAdminService.createSchool(dto);
    }
    updateSchool(id, dto) {
        return this.superAdminService.updateSchool(id, dto);
    }
    updateStatus(id, status) {
        return this.superAdminService.updateSchoolStatus(id, status);
    }
    deleteSchool(id) {
        return this.superAdminService.deleteSchool(id);
    }
    getPlans() { return this.superAdminService.getPlans(); }
    createPlan(dto) { return this.superAdminService.createPlan(dto); }
    getResellers(query) {
        return this.superAdminService.getResellers(query);
    }
    getAuditLogs(query) {
        return this.superAdminService.getAuditLogs(query);
    }
    getRevenue(period) {
        return this.superAdminService.getRevenueReport(period);
    }
    getSettings(group) { return this.superAdminService.getSystemSettings(group); }
    upsertSetting(dto) { return this.superAdminService.upsertSystemSetting(dto); }
    bulkSettings(dto) { return this.superAdminService.bulkUpsertSettings(dto.settings); }
    deleteSetting(key) { return this.superAdminService.deleteSystemSetting(key); }
    getSchoolBranding(id) { return this.superAdminService.getSchoolBranding(id); }
    updateBranding(id, dto) { return this.superAdminService.updateSchoolBranding(id, dto); }
    getCustomDomains() { return this.superAdminService.getCustomDomains(); }
    getPlatformUsers(query) { return this.superAdminService.getPlatformUsers(query); }
    createUser(dto) { return this.superAdminService.createPlatformUser(dto); }
    updateUserStatus(id, isActive) {
        return this.superAdminService.updatePlatformUserStatus(id, isActive);
    }
    sendNotification(dto) { return this.superAdminService.sendPlatformNotification(dto); }
    getMetrics(schoolId) { return this.superAdminService.getResourceMetrics(schoolId); }
};
exports.SuperAdminController = SuperAdminController;
__decorate([
    (0, common_1.Get)('dashboard'),
    (0, swagger_1.ApiOperation)({ summary: 'Super admin dashboard stats' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], SuperAdminController.prototype, "getDashboard", null);
__decorate([
    (0, common_1.Get)('schools'),
    (0, swagger_1.ApiOperation)({ summary: 'List all schools' }),
    (0, swagger_1.ApiQuery)({ name: 'status', required: false }),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, common_1.Query)('status')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [pagination_dto_1.PaginationDto, String]),
    __metadata("design:returntype", void 0)
], SuperAdminController.prototype, "getSchools", null);
__decorate([
    (0, common_1.Get)('schools/:id'),
    (0, swagger_1.ApiOperation)({ summary: 'Get school details' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], SuperAdminController.prototype, "getSchool", null);
__decorate([
    (0, common_1.Post)('schools'),
    (0, swagger_1.ApiOperation)({ summary: 'Create and provision a new school' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [school_dto_1.CreateSchoolDto]),
    __metadata("design:returntype", void 0)
], SuperAdminController.prototype, "createSchool", null);
__decorate([
    (0, common_1.Put)('schools/:id'),
    (0, swagger_1.ApiOperation)({ summary: 'Update school details' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, school_dto_1.UpdateSchoolDto]),
    __metadata("design:returntype", void 0)
], SuperAdminController.prototype, "updateSchool", null);
__decorate([
    (0, common_1.Patch)('schools/:id/status'),
    (0, swagger_1.ApiOperation)({ summary: 'Change school status (ACTIVE/SUSPENDED/EXPIRED)' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __param(1, (0, common_1.Body)('status')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], SuperAdminController.prototype, "updateStatus", null);
__decorate([
    (0, common_1.Delete)('schools/:id'),
    (0, roles_decorator_1.Roles)('SUPER_ADMIN'),
    (0, swagger_1.ApiOperation)({ summary: 'Delete school' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], SuperAdminController.prototype, "deleteSchool", null);
__decorate([
    (0, common_1.Get)('plans'),
    (0, swagger_1.ApiOperation)({ summary: 'List subscription plans' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], SuperAdminController.prototype, "getPlans", null);
__decorate([
    (0, common_1.Post)('plans'),
    (0, swagger_1.ApiOperation)({ summary: 'Create subscription plan' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], SuperAdminController.prototype, "createPlan", null);
__decorate([
    (0, common_1.Get)('resellers'),
    (0, swagger_1.ApiOperation)({ summary: 'List resellers' }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [pagination_dto_1.PaginationDto]),
    __metadata("design:returntype", void 0)
], SuperAdminController.prototype, "getResellers", null);
__decorate([
    (0, common_1.Get)('audit-logs'),
    (0, swagger_1.ApiOperation)({ summary: 'View audit logs' }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [pagination_dto_1.PaginationDto]),
    __metadata("design:returntype", void 0)
], SuperAdminController.prototype, "getAuditLogs", null);
__decorate([
    (0, common_1.Get)('revenue'),
    (0, swagger_1.ApiOperation)({ summary: 'Revenue report' }),
    (0, swagger_1.ApiQuery)({ name: 'period', enum: ['daily', 'monthly', 'yearly'] }),
    __param(0, (0, common_1.Query)('period')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], SuperAdminController.prototype, "getRevenue", null);
__decorate([
    (0, common_1.Get)('settings'),
    (0, swagger_1.ApiOperation)({ summary: 'Get platform system settings' }),
    (0, swagger_1.ApiQuery)({ name: 'group', required: false }),
    __param(0, (0, common_1.Query)('group')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], SuperAdminController.prototype, "getSettings", null);
__decorate([
    (0, common_1.Post)('settings'),
    (0, swagger_1.ApiOperation)({ summary: 'Save/update a system setting' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], SuperAdminController.prototype, "upsertSetting", null);
__decorate([
    (0, common_1.Post)('settings/bulk'),
    (0, swagger_1.ApiOperation)({ summary: 'Save multiple settings at once' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], SuperAdminController.prototype, "bulkSettings", null);
__decorate([
    (0, common_1.Delete)('settings/:key'),
    (0, roles_decorator_1.Roles)('SUPER_ADMIN'),
    (0, swagger_1.ApiOperation)({ summary: 'Delete a system setting' }),
    __param(0, (0, common_1.Param)('key')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], SuperAdminController.prototype, "deleteSetting", null);
__decorate([
    (0, common_1.Get)('schools/:id/branding'),
    (0, swagger_1.ApiOperation)({ summary: 'Get school branding config' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], SuperAdminController.prototype, "getSchoolBranding", null);
__decorate([
    (0, common_1.Put)('schools/:id/branding'),
    (0, swagger_1.ApiOperation)({ summary: 'Update school white-label branding' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], SuperAdminController.prototype, "updateBranding", null);
__decorate([
    (0, common_1.Get)('custom-domains'),
    (0, swagger_1.ApiOperation)({ summary: 'Get all custom domain mappings' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], SuperAdminController.prototype, "getCustomDomains", null);
__decorate([
    (0, common_1.Get)('users'),
    (0, swagger_1.ApiOperation)({ summary: 'Get platform admin users' }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [pagination_dto_1.PaginationDto]),
    __metadata("design:returntype", void 0)
], SuperAdminController.prototype, "getPlatformUsers", null);
__decorate([
    (0, common_1.Post)('users'),
    (0, roles_decorator_1.Roles)('SUPER_ADMIN'),
    (0, swagger_1.ApiOperation)({ summary: 'Create platform user' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], SuperAdminController.prototype, "createUser", null);
__decorate([
    (0, common_1.Patch)('users/:id/status'),
    (0, roles_decorator_1.Roles)('SUPER_ADMIN'),
    (0, swagger_1.ApiOperation)({ summary: 'Activate/deactivate platform user' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __param(1, (0, common_1.Body)('isActive')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Boolean]),
    __metadata("design:returntype", void 0)
], SuperAdminController.prototype, "updateUserStatus", null);
__decorate([
    (0, common_1.Post)('notify'),
    (0, swagger_1.ApiOperation)({ summary: 'Send notification to all schools' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], SuperAdminController.prototype, "sendNotification", null);
__decorate([
    (0, common_1.Get)('metrics'),
    (0, swagger_1.ApiOperation)({ summary: 'Get resource usage metrics' }),
    (0, swagger_1.ApiQuery)({ name: 'schoolId', required: false }),
    __param(0, (0, common_1.Query)('schoolId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], SuperAdminController.prototype, "getMetrics", null);
exports.SuperAdminController = SuperAdminController = __decorate([
    (0, swagger_1.ApiTags)('Super Admin'),
    (0, swagger_1.ApiBearerAuth)('access-token'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('SUPER_ADMIN', 'ADMIN'),
    (0, common_1.Controller)({ path: 'super-admin', version: '1' }),
    __metadata("design:paramtypes", [super_admin_service_1.SuperAdminService])
], SuperAdminController);
//# sourceMappingURL=super-admin.controller.js.map