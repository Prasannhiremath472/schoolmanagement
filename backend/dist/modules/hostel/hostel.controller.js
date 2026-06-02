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
exports.HostelController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const hostel_service_1 = require("./hostel.service");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const roles_guard_1 = require("../auth/guards/roles.guard");
const roles_decorator_1 = require("../auth/decorators/roles.decorator");
const current_user_decorator_1 = require("../auth/decorators/current-user.decorator");
const pagination_dto_1 = require("../../common/dto/pagination.dto");
let HostelController = class HostelController {
    constructor(hostelService) {
        this.hostelService = hostelService;
    }
    getHostels() { return this.hostelService.getHostels(); }
    getStats(hostelId) { return this.hostelService.getHostelStats(hostelId); }
    getHostel(id) { return this.hostelService.getHostel(id); }
    createHostel(dto) { return this.hostelService.createHostel(dto); }
    updateHostel(id, dto) { return this.hostelService.updateHostel(id, dto); }
    getRooms(hostelId) { return this.hostelService.getRooms(hostelId); }
    createRoom(dto) { return this.hostelService.createRoom(dto); }
    allocate(dto) { return this.hostelService.allocateStudent(dto); }
    vacate(studentId, leaveDate) {
        return this.hostelService.vacateStudent(studentId, leaveDate);
    }
    getAllocations(query, hostelId) {
        return this.hostelService.getAllAllocations({ ...query, hostelId });
    }
    collectFee(dto, userId) {
        return this.hostelService.collectHostelFee({ ...dto, collectedBy: userId });
    }
    getFeeDues(hostelId, month, year) {
        return this.hostelService.getHostelFeeDues(hostelId, +month, +year);
    }
    markAttendance(dto) { return this.hostelService.markHostelAttendance(dto); }
    getAttendance(hostelId, date) {
        return this.hostelService.getHostelAttendance(hostelId, date);
    }
    getMessMenu(hostelId) { return this.hostelService.getMessMenu(hostelId); }
    updateMessMenu(hostelId, dto) {
        return this.hostelService.updateMessMenu(hostelId, dto);
    }
};
exports.HostelController = HostelController;
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Get all hostels' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], HostelController.prototype, "getHostels", null);
__decorate([
    (0, common_1.Get)('stats'),
    (0, swagger_1.ApiOperation)({ summary: 'Get hostel occupancy stats' }),
    __param(0, (0, common_1.Query)('hostelId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], HostelController.prototype, "getStats", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Get hostel with rooms' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], HostelController.prototype, "getHostel", null);
__decorate([
    (0, common_1.Post)(),
    (0, roles_decorator_1.Roles)('SCHOOL_ADMIN', 'HOSTEL_WARDEN'),
    (0, swagger_1.ApiOperation)({ summary: 'Create hostel' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], HostelController.prototype, "createHostel", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, roles_decorator_1.Roles)('SCHOOL_ADMIN', 'HOSTEL_WARDEN'),
    (0, swagger_1.ApiOperation)({ summary: 'Update hostel' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], HostelController.prototype, "updateHostel", null);
__decorate([
    (0, common_1.Get)(':hostelId/rooms'),
    (0, swagger_1.ApiOperation)({ summary: 'Get rooms in a hostel' }),
    __param(0, (0, common_1.Param)('hostelId', common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], HostelController.prototype, "getRooms", null);
__decorate([
    (0, common_1.Post)('rooms'),
    (0, roles_decorator_1.Roles)('SCHOOL_ADMIN', 'HOSTEL_WARDEN'),
    (0, swagger_1.ApiOperation)({ summary: 'Create room' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], HostelController.prototype, "createRoom", null);
__decorate([
    (0, common_1.Post)('allocate'),
    (0, roles_decorator_1.Roles)('SCHOOL_ADMIN', 'HOSTEL_WARDEN'),
    (0, swagger_1.ApiOperation)({ summary: 'Allocate student to room' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], HostelController.prototype, "allocate", null);
__decorate([
    (0, common_1.Patch)('vacate/:studentId'),
    (0, roles_decorator_1.Roles)('SCHOOL_ADMIN', 'HOSTEL_WARDEN'),
    (0, swagger_1.ApiOperation)({ summary: 'Vacate student from hostel' }),
    __param(0, (0, common_1.Param)('studentId', common_1.ParseUUIDPipe)),
    __param(1, (0, common_1.Body)('leaveDate')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], HostelController.prototype, "vacate", null);
__decorate([
    (0, common_1.Get)('allocations/all'),
    (0, roles_decorator_1.Roles)('SCHOOL_ADMIN', 'HOSTEL_WARDEN'),
    (0, swagger_1.ApiOperation)({ summary: 'Get all current allocations' }),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, common_1.Query)('hostelId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [pagination_dto_1.PaginationDto, String]),
    __metadata("design:returntype", void 0)
], HostelController.prototype, "getAllocations", null);
__decorate([
    (0, common_1.Post)('fees/collect'),
    (0, roles_decorator_1.Roles)('SCHOOL_ADMIN', 'HOSTEL_WARDEN', 'ACCOUNTANT'),
    (0, swagger_1.ApiOperation)({ summary: 'Collect hostel fee' }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, current_user_decorator_1.CurrentUser)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", void 0)
], HostelController.prototype, "collectFee", null);
__decorate([
    (0, common_1.Get)('fees/dues'),
    (0, roles_decorator_1.Roles)('SCHOOL_ADMIN', 'HOSTEL_WARDEN', 'ACCOUNTANT'),
    (0, swagger_1.ApiQuery)({ name: 'hostelId', required: true }),
    (0, swagger_1.ApiQuery)({ name: 'month', required: true }),
    (0, swagger_1.ApiQuery)({ name: 'year', required: true }),
    (0, swagger_1.ApiOperation)({ summary: 'Get hostel fee dues' }),
    __param(0, (0, common_1.Query)('hostelId')),
    __param(1, (0, common_1.Query)('month')),
    __param(2, (0, common_1.Query)('year')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number, Number]),
    __metadata("design:returntype", void 0)
], HostelController.prototype, "getFeeDues", null);
__decorate([
    (0, common_1.Post)('attendance'),
    (0, roles_decorator_1.Roles)('SCHOOL_ADMIN', 'HOSTEL_WARDEN'),
    (0, swagger_1.ApiOperation)({ summary: 'Mark hostel attendance' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], HostelController.prototype, "markAttendance", null);
__decorate([
    (0, common_1.Get)('attendance/:hostelId'),
    (0, roles_decorator_1.Roles)('SCHOOL_ADMIN', 'HOSTEL_WARDEN'),
    (0, swagger_1.ApiQuery)({ name: 'date', required: true }),
    (0, swagger_1.ApiOperation)({ summary: 'Get hostel attendance for a date' }),
    __param(0, (0, common_1.Param)('hostelId', common_1.ParseUUIDPipe)),
    __param(1, (0, common_1.Query)('date')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], HostelController.prototype, "getAttendance", null);
__decorate([
    (0, common_1.Get)(':hostelId/mess'),
    (0, swagger_1.ApiOperation)({ summary: 'Get mess weekly menu' }),
    __param(0, (0, common_1.Param)('hostelId', common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], HostelController.prototype, "getMessMenu", null);
__decorate([
    (0, common_1.Put)(':hostelId/mess'),
    (0, roles_decorator_1.Roles)('SCHOOL_ADMIN', 'HOSTEL_WARDEN'),
    (0, swagger_1.ApiOperation)({ summary: 'Update mess menu' }),
    __param(0, (0, common_1.Param)('hostelId', common_1.ParseUUIDPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], HostelController.prototype, "updateMessMenu", null);
exports.HostelController = HostelController = __decorate([
    (0, swagger_1.ApiTags)('Hostel'),
    (0, swagger_1.ApiBearerAuth)('access-token'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, common_1.Controller)({ path: 'hostel', version: '1' }),
    __metadata("design:paramtypes", [hostel_service_1.HostelService])
], HostelController);
//# sourceMappingURL=hostel.controller.js.map