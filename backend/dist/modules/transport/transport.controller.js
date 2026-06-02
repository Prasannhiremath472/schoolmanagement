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
exports.TransportController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const transport_service_1 = require("./transport.service");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const roles_guard_1 = require("../auth/guards/roles.guard");
const roles_decorator_1 = require("../auth/decorators/roles.decorator");
const public_decorator_1 = require("../auth/decorators/public.decorator");
const pagination_dto_1 = require("../../common/dto/pagination.dto");
let TransportController = class TransportController {
    constructor(transportService) {
        this.transportService = transportService;
    }
    getStats() { return this.transportService.getStats(); }
    getVehicles() { return this.transportService.getVehicles(); }
    getVehicle(id) { return this.transportService.getVehicle(id); }
    createVehicle(dto) { return this.transportService.createVehicle(dto); }
    updateVehicle(id, dto) { return this.transportService.updateVehicle(id, dto); }
    getDrivers() { return this.transportService.getDrivers(); }
    assignDriver(id, dto) { return this.transportService.assignDriver(id, dto); }
    getRoutes() { return this.transportService.getRoutes(); }
    getRoute(id) { return this.transportService.getRoute(id); }
    createRoute(dto) { return this.transportService.createRoute(dto); }
    updateRoute(id, dto) { return this.transportService.updateRoute(id, dto); }
    addPickupPoint(routeId, dto) { return this.transportService.addPickupPoint(routeId, dto); }
    allocate(dto) { return this.transportService.allocateStudent(dto); }
    deallocate(studentId) { return this.transportService.deallocateStudent(studentId); }
    getAllocations(query, routeId) {
        return this.transportService.getAllocations({ ...query, routeId });
    }
    getLiveLocations(routeId) { return this.transportService.getLiveLocations(routeId); }
    getVehicleLocation(vehicleId) { return this.transportService.getVehicleLocation(vehicleId); }
    updateLocation(vehicleId, dto) {
        return this.transportService.updateVehicleLocation(vehicleId, dto);
    }
};
exports.TransportController = TransportController;
__decorate([
    (0, common_1.Get)('stats'),
    (0, swagger_1.ApiOperation)({ summary: 'Transport statistics' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], TransportController.prototype, "getStats", null);
__decorate([
    (0, common_1.Get)('vehicles'),
    (0, swagger_1.ApiOperation)({ summary: 'Get all vehicles' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], TransportController.prototype, "getVehicles", null);
__decorate([
    (0, common_1.Get)('vehicles/:id'),
    (0, swagger_1.ApiOperation)({ summary: 'Get vehicle details' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], TransportController.prototype, "getVehicle", null);
__decorate([
    (0, common_1.Post)('vehicles'),
    (0, roles_decorator_1.Roles)('SCHOOL_ADMIN', 'TRANSPORT_MANAGER'),
    (0, swagger_1.ApiOperation)({ summary: 'Add vehicle' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], TransportController.prototype, "createVehicle", null);
__decorate([
    (0, common_1.Put)('vehicles/:id'),
    (0, roles_decorator_1.Roles)('SCHOOL_ADMIN', 'TRANSPORT_MANAGER'),
    (0, swagger_1.ApiOperation)({ summary: 'Update vehicle' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], TransportController.prototype, "updateVehicle", null);
__decorate([
    (0, common_1.Get)('drivers'),
    (0, swagger_1.ApiOperation)({ summary: 'Get all drivers' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], TransportController.prototype, "getDrivers", null);
__decorate([
    (0, common_1.Patch)('vehicles/:id/driver'),
    (0, roles_decorator_1.Roles)('SCHOOL_ADMIN', 'TRANSPORT_MANAGER'),
    (0, swagger_1.ApiOperation)({ summary: 'Assign driver to vehicle' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], TransportController.prototype, "assignDriver", null);
__decorate([
    (0, common_1.Get)('routes'),
    (0, swagger_1.ApiOperation)({ summary: 'Get all routes' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], TransportController.prototype, "getRoutes", null);
__decorate([
    (0, common_1.Get)('routes/:id'),
    (0, swagger_1.ApiOperation)({ summary: 'Get route details with allocations' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], TransportController.prototype, "getRoute", null);
__decorate([
    (0, common_1.Post)('routes'),
    (0, roles_decorator_1.Roles)('SCHOOL_ADMIN', 'TRANSPORT_MANAGER'),
    (0, swagger_1.ApiOperation)({ summary: 'Create route' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], TransportController.prototype, "createRoute", null);
__decorate([
    (0, common_1.Put)('routes/:id'),
    (0, roles_decorator_1.Roles)('SCHOOL_ADMIN', 'TRANSPORT_MANAGER'),
    (0, swagger_1.ApiOperation)({ summary: 'Update route' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], TransportController.prototype, "updateRoute", null);
__decorate([
    (0, common_1.Post)('routes/:id/pickup-points'),
    (0, roles_decorator_1.Roles)('SCHOOL_ADMIN', 'TRANSPORT_MANAGER'),
    (0, swagger_1.ApiOperation)({ summary: 'Add pickup point to route' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], TransportController.prototype, "addPickupPoint", null);
__decorate([
    (0, common_1.Post)('allocate'),
    (0, roles_decorator_1.Roles)('SCHOOL_ADMIN', 'TRANSPORT_MANAGER'),
    (0, swagger_1.ApiOperation)({ summary: 'Allocate student to route' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], TransportController.prototype, "allocate", null);
__decorate([
    (0, common_1.Delete)('allocate/:studentId'),
    (0, roles_decorator_1.Roles)('SCHOOL_ADMIN', 'TRANSPORT_MANAGER'),
    (0, swagger_1.ApiOperation)({ summary: 'Remove student from transport' }),
    __param(0, (0, common_1.Param)('studentId', common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], TransportController.prototype, "deallocate", null);
__decorate([
    (0, common_1.Get)('allocations'),
    (0, swagger_1.ApiOperation)({ summary: 'Get all transport allocations' }),
    (0, swagger_1.ApiQuery)({ name: 'routeId', required: false }),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, common_1.Query)('routeId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [pagination_dto_1.PaginationDto, String]),
    __metadata("design:returntype", void 0)
], TransportController.prototype, "getAllocations", null);
__decorate([
    (0, common_1.Get)('gps/live'),
    (0, swagger_1.ApiOperation)({ summary: 'Get live GPS locations of all vehicles' }),
    (0, swagger_1.ApiQuery)({ name: 'routeId', required: false }),
    __param(0, (0, common_1.Query)('routeId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], TransportController.prototype, "getLiveLocations", null);
__decorate([
    (0, common_1.Get)('gps/:vehicleId'),
    (0, swagger_1.ApiOperation)({ summary: 'Get current GPS location of a vehicle' }),
    __param(0, (0, common_1.Param)('vehicleId', common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], TransportController.prototype, "getVehicleLocation", null);
__decorate([
    (0, common_1.Post)('gps/:vehicleId/update'),
    (0, public_decorator_1.Public)(),
    (0, swagger_1.ApiOperation)({ summary: 'Update vehicle GPS location (called by GPS device)' }),
    __param(0, (0, common_1.Param)('vehicleId', common_1.ParseUUIDPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], TransportController.prototype, "updateLocation", null);
exports.TransportController = TransportController = __decorate([
    (0, swagger_1.ApiTags)('Transport'),
    (0, swagger_1.ApiBearerAuth)('access-token'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, common_1.Controller)({ path: 'transport', version: '1' }),
    __metadata("design:paramtypes", [transport_service_1.TransportService])
], TransportController);
//# sourceMappingURL=transport.controller.js.map