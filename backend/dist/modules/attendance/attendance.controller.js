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
exports.AttendanceController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const attendance_service_1 = require("./attendance.service");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const roles_guard_1 = require("../auth/guards/roles.guard");
const roles_decorator_1 = require("../auth/decorators/roles.decorator");
const current_user_decorator_1 = require("../auth/decorators/current-user.decorator");
const attendance_dto_1 = require("./dto/attendance.dto");
const pagination_dto_1 = require("../../common/dto/pagination.dto");
let AttendanceController = class AttendanceController {
    constructor(attendanceService) {
        this.attendanceService = attendanceService;
    }
    markBulk(dto, userId) {
        return this.attendanceService.markBulkAttendance(dto, userId);
    }
    getSectionAttendance(sectionId, date) {
        return this.attendanceService.getSectionAttendance(sectionId, date);
    }
    getStudentAttendance(studentId, pagination, fromDate, toDate) {
        return this.attendanceService.getStudentAttendance(studentId, { ...pagination, fromDate, toDate });
    }
    getMonthlyReport(sectionId, month, year) {
        return this.attendanceService.getMonthlyReport(sectionId, +month, +year);
    }
    generateQr(sectionId, date) {
        return this.attendanceService.generateQrCode(sectionId, date);
    }
};
exports.AttendanceController = AttendanceController;
__decorate([
    (0, common_1.Post)('bulk'),
    (0, roles_decorator_1.Roles)('SCHOOL_ADMIN', 'TEACHER'),
    (0, swagger_1.ApiOperation)({ summary: 'Mark bulk attendance for a section' }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, current_user_decorator_1.CurrentUser)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [attendance_dto_1.BulkAttendanceDto, String]),
    __metadata("design:returntype", void 0)
], AttendanceController.prototype, "markBulk", null);
__decorate([
    (0, common_1.Get)('section/:sectionId'),
    (0, roles_decorator_1.Roles)('SCHOOL_ADMIN', 'TEACHER'),
    (0, swagger_1.ApiOperation)({ summary: 'Get attendance for a section on a date' }),
    (0, swagger_1.ApiQuery)({ name: 'date', required: true, example: '2024-09-01' }),
    __param(0, (0, common_1.Param)('sectionId', common_1.ParseUUIDPipe)),
    __param(1, (0, common_1.Query)('date')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], AttendanceController.prototype, "getSectionAttendance", null);
__decorate([
    (0, common_1.Get)('student/:studentId'),
    (0, roles_decorator_1.Roles)('SCHOOL_ADMIN', 'TEACHER', 'PARENT', 'STUDENT'),
    (0, swagger_1.ApiOperation)({ summary: 'Get student attendance history' }),
    (0, swagger_1.ApiQuery)({ name: 'fromDate', required: true }),
    (0, swagger_1.ApiQuery)({ name: 'toDate', required: true }),
    __param(0, (0, common_1.Param)('studentId', common_1.ParseUUIDPipe)),
    __param(1, (0, common_1.Query)()),
    __param(2, (0, common_1.Query)('fromDate')),
    __param(3, (0, common_1.Query)('toDate')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, pagination_dto_1.PaginationDto, String, String]),
    __metadata("design:returntype", void 0)
], AttendanceController.prototype, "getStudentAttendance", null);
__decorate([
    (0, common_1.Get)('report/monthly'),
    (0, roles_decorator_1.Roles)('SCHOOL_ADMIN', 'TEACHER'),
    (0, swagger_1.ApiOperation)({ summary: 'Get monthly attendance report for a section' }),
    (0, swagger_1.ApiQuery)({ name: 'sectionId', required: true }),
    (0, swagger_1.ApiQuery)({ name: 'month', required: true }),
    (0, swagger_1.ApiQuery)({ name: 'year', required: true }),
    __param(0, (0, common_1.Query)('sectionId')),
    __param(1, (0, common_1.Query)('month')),
    __param(2, (0, common_1.Query)('year')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number, Number]),
    __metadata("design:returntype", void 0)
], AttendanceController.prototype, "getMonthlyReport", null);
__decorate([
    (0, common_1.Get)('qr'),
    (0, roles_decorator_1.Roles)('SCHOOL_ADMIN', 'TEACHER'),
    (0, swagger_1.ApiOperation)({ summary: 'Generate QR code for attendance marking' }),
    (0, swagger_1.ApiQuery)({ name: 'sectionId', required: true }),
    (0, swagger_1.ApiQuery)({ name: 'date', required: true }),
    __param(0, (0, common_1.Query)('sectionId')),
    __param(1, (0, common_1.Query)('date')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], AttendanceController.prototype, "generateQr", null);
exports.AttendanceController = AttendanceController = __decorate([
    (0, swagger_1.ApiTags)('Attendance'),
    (0, swagger_1.ApiBearerAuth)('access-token'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, common_1.Controller)({ path: 'attendance', version: '1' }),
    __metadata("design:paramtypes", [attendance_service_1.AttendanceService])
], AttendanceController);
//# sourceMappingURL=attendance.controller.js.map