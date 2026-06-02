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
exports.ExaminationController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const examination_service_1 = require("./examination.service");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const roles_guard_1 = require("../auth/guards/roles.guard");
const roles_decorator_1 = require("../auth/decorators/roles.decorator");
const current_user_decorator_1 = require("../auth/decorators/current-user.decorator");
const examination_dto_1 = require("./dto/examination.dto");
let ExaminationController = class ExaminationController {
    constructor(examinationService) {
        this.examinationService = examinationService;
    }
    getExamTypes() { return this.examinationService.getExamTypes(); }
    createExamType(dto) { return this.examinationService.createExamType(dto); }
    getSchedules(classId, academicYearId, examTypeId) { return this.examinationService.getSchedules({ classId, academicYearId, examTypeId }); }
    createSchedule(dto) {
        return this.examinationService.createSchedule(dto);
    }
    publishSchedule(id) {
        return this.examinationService.publishSchedule(id);
    }
    enterBulkMarks(dto, userId) {
        return this.examinationService.enterBulkMarks(dto, userId);
    }
    getResults(examScheduleId, sectionId) { return this.examinationService.getResults(examScheduleId, sectionId); }
    getStudentReport(studentId, examScheduleId) { return this.examinationService.getStudentReport(studentId, examScheduleId); }
    generateReportCards(dto) { return this.examinationService.generateReportCards(dto.examScheduleId, dto.sectionId); }
    getAnalysis(examScheduleId) {
        return this.examinationService.getAnalysis(examScheduleId);
    }
};
exports.ExaminationController = ExaminationController;
__decorate([
    (0, common_1.Get)('types'),
    (0, roles_decorator_1.Roles)('SCHOOL_ADMIN', 'TEACHER'),
    (0, swagger_1.ApiOperation)({ summary: 'Get exam types' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ExaminationController.prototype, "getExamTypes", null);
__decorate([
    (0, common_1.Post)('types'),
    (0, roles_decorator_1.Roles)('SCHOOL_ADMIN'),
    (0, swagger_1.ApiOperation)({ summary: 'Create exam type' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], ExaminationController.prototype, "createExamType", null);
__decorate([
    (0, common_1.Get)('schedules'),
    (0, roles_decorator_1.Roles)('SCHOOL_ADMIN', 'TEACHER', 'STUDENT', 'PARENT'),
    (0, swagger_1.ApiOperation)({ summary: 'Get exam schedules' }),
    (0, swagger_1.ApiQuery)({ name: 'classId', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'academicYearId', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'examTypeId', required: false }),
    __param(0, (0, common_1.Query)('classId')),
    __param(1, (0, common_1.Query)('academicYearId')),
    __param(2, (0, common_1.Query)('examTypeId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String]),
    __metadata("design:returntype", void 0)
], ExaminationController.prototype, "getSchedules", null);
__decorate([
    (0, common_1.Post)('schedules'),
    (0, roles_decorator_1.Roles)('SCHOOL_ADMIN'),
    (0, swagger_1.ApiOperation)({ summary: 'Create exam schedule' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [examination_dto_1.CreateExamScheduleDto]),
    __metadata("design:returntype", void 0)
], ExaminationController.prototype, "createSchedule", null);
__decorate([
    (0, common_1.Patch)('schedules/:id/publish'),
    (0, roles_decorator_1.Roles)('SCHOOL_ADMIN'),
    (0, swagger_1.ApiOperation)({ summary: 'Publish exam schedule' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ExaminationController.prototype, "publishSchedule", null);
__decorate([
    (0, common_1.Post)('marks/bulk'),
    (0, roles_decorator_1.Roles)('SCHOOL_ADMIN', 'TEACHER'),
    (0, swagger_1.ApiOperation)({ summary: 'Enter marks for multiple students' }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, current_user_decorator_1.CurrentUser)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [examination_dto_1.BulkMarksDto, String]),
    __metadata("design:returntype", void 0)
], ExaminationController.prototype, "enterBulkMarks", null);
__decorate([
    (0, common_1.Get)('results'),
    (0, roles_decorator_1.Roles)('SCHOOL_ADMIN', 'TEACHER'),
    (0, swagger_1.ApiOperation)({ summary: 'Get results for an exam schedule' }),
    (0, swagger_1.ApiQuery)({ name: 'examScheduleId', required: true }),
    (0, swagger_1.ApiQuery)({ name: 'sectionId', required: false }),
    __param(0, (0, common_1.Query)('examScheduleId')),
    __param(1, (0, common_1.Query)('sectionId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], ExaminationController.prototype, "getResults", null);
__decorate([
    (0, common_1.Get)('results/student/:studentId'),
    (0, roles_decorator_1.Roles)('SCHOOL_ADMIN', 'TEACHER', 'STUDENT', 'PARENT'),
    (0, swagger_1.ApiOperation)({ summary: 'Get student result report' }),
    (0, swagger_1.ApiQuery)({ name: 'examScheduleId', required: true }),
    __param(0, (0, common_1.Param)('studentId', common_1.ParseUUIDPipe)),
    __param(1, (0, common_1.Query)('examScheduleId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], ExaminationController.prototype, "getStudentReport", null);
__decorate([
    (0, common_1.Post)('report-cards/generate'),
    (0, roles_decorator_1.Roles)('SCHOOL_ADMIN'),
    (0, swagger_1.ApiOperation)({ summary: 'Generate report cards for a section' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], ExaminationController.prototype, "generateReportCards", null);
__decorate([
    (0, common_1.Get)('analysis'),
    (0, roles_decorator_1.Roles)('SCHOOL_ADMIN', 'TEACHER'),
    (0, swagger_1.ApiQuery)({ name: 'examScheduleId', required: true }),
    (0, swagger_1.ApiOperation)({ summary: 'Get exam analysis by subject' }),
    __param(0, (0, common_1.Query)('examScheduleId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ExaminationController.prototype, "getAnalysis", null);
exports.ExaminationController = ExaminationController = __decorate([
    (0, swagger_1.ApiTags)('Examinations'),
    (0, swagger_1.ApiBearerAuth)('access-token'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, common_1.Controller)({ path: 'examinations', version: '1' }),
    __metadata("design:paramtypes", [examination_service_1.ExaminationService])
], ExaminationController);
//# sourceMappingURL=examination.controller.js.map