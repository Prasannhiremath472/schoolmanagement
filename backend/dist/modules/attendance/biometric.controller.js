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
exports.BiometricController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const biometric_service_1 = require("./biometric.service");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const roles_guard_1 = require("../auth/guards/roles.guard");
const roles_decorator_1 = require("../auth/decorators/roles.decorator");
const public_decorator_1 = require("../auth/decorators/public.decorator");
let BiometricController = class BiometricController {
    constructor(biometricService) {
        this.biometricService = biometricService;
    }
    async syncFromDevice(dto) {
        const records = await this.biometricService.fetchFromDevice(dto.deviceIp, dto.devicePort);
        return this.biometricService.syncBiometricAttendance(records, dto.date, dto.academicYearId);
    }
    async syncFromAdms(dto) {
        const records = await this.biometricService.fetchFromAdmsApi(dto.admsUrl, dto.apiKey, dto.date);
        return this.biometricService.syncBiometricAttendance(records, dto.date, dto.academicYearId);
    }
    async rfidScan(dto) {
        return this.biometricService.markRfidAttendance(dto.rfidCode, dto.sectionId, dto.academicYearId);
    }
};
exports.BiometricController = BiometricController;
__decorate([
    (0, common_1.Post)('sync'),
    (0, swagger_1.ApiBearerAuth)('access-token'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('SCHOOL_ADMIN'),
    (0, swagger_1.ApiOperation)({ summary: 'Sync attendance from ZKTeco biometric device' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], BiometricController.prototype, "syncFromDevice", null);
__decorate([
    (0, common_1.Post)('sync-adms'),
    (0, swagger_1.ApiBearerAuth)('access-token'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('SCHOOL_ADMIN'),
    (0, swagger_1.ApiOperation)({ summary: 'Sync attendance from ZKTeco ADMS cloud API' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], BiometricController.prototype, "syncFromAdms", null);
__decorate([
    (0, common_1.Post)('rfid'),
    (0, public_decorator_1.Public)(),
    (0, swagger_1.ApiOperation)({ summary: 'Mark attendance via RFID card scan (from gate device)' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], BiometricController.prototype, "rfidScan", null);
exports.BiometricController = BiometricController = __decorate([
    (0, swagger_1.ApiTags)('Attendance'),
    (0, common_1.Controller)({ path: 'attendance/biometric', version: '1' }),
    __metadata("design:paramtypes", [biometric_service_1.BiometricService])
], BiometricController);
//# sourceMappingURL=biometric.controller.js.map