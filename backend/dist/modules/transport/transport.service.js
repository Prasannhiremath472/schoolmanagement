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
exports.TransportService = void 0;
const common_1 = require("@nestjs/common");
const tenant_prisma_service_1 = require("../../database/tenant-prisma.service");
const pagination_dto_1 = require("../../common/dto/pagination.dto");
let TransportService = class TransportService {
    constructor(tenantPrisma) {
        this.tenantPrisma = tenantPrisma;
        this.vehicleLocations = new Map();
    }
    get db() { return this.tenantPrisma.db; }
    async getVehicles() {
        return {
            data: await this.db.vehicle.findMany({
                where: { isActive: true },
                include: {
                    routes: {
                        select: { routeNo: true, name: true, startPoint: true, endPoint: true },
                    },
                },
            }),
        };
    }
    async getVehicle(id) {
        const vehicle = await this.db.vehicle.findUnique({
            where: { id },
            include: { routes: { include: { pickupPoints: true, allocations: { where: { isActive: true } } } } },
        });
        if (!vehicle)
            throw new common_1.NotFoundException('Vehicle not found');
        return { data: vehicle };
    }
    async createVehicle(dto) {
        return { data: await this.db.vehicle.create({ data: dto }), message: 'Vehicle added' };
    }
    async updateVehicle(id, dto) {
        return { data: await this.db.vehicle.update({ where: { id }, data: dto }), message: 'Vehicle updated' };
    }
    async assignDriver(vehicleId, driverDto) {
        const vehicle = await this.db.vehicle.update({
            where: { id: vehicleId },
            data: {
                driverName: driverDto.driverName,
                driverPhone: driverDto.driverPhone,
                driverLicense: driverDto.driverLicense,
            },
        });
        return { data: vehicle, message: 'Driver assigned to vehicle' };
    }
    async getDrivers() {
        const vehicles = await this.db.vehicle.findMany({
            where: { isActive: true, driverName: { not: null } },
            select: {
                id: true,
                vehicleNo: true,
                vehicleType: true,
                driverName: true,
                driverPhone: true,
                driverLicense: true,
                insuranceExpiry: true,
                fcExpiry: true,
            },
        });
        return { data: vehicles };
    }
    async getRoutes() {
        return {
            data: await this.db.route.findMany({
                where: { isActive: true },
                include: {
                    vehicle: {
                        select: { vehicleNo: true, vehicleType: true, capacity: true, driverName: true, driverPhone: true },
                    },
                    pickupPoints: { orderBy: { sortOrder: 'asc' } },
                    _count: { select: { allocations: true } },
                },
            }),
        };
    }
    async getRoute(id) {
        const route = await this.db.route.findUnique({
            where: { id },
            include: {
                vehicle: true,
                pickupPoints: { orderBy: { sortOrder: 'asc' } },
                allocations: {
                    where: { isActive: true },
                    include: { student: { select: { firstName: true, lastName: true, admissionNo: true } } },
                },
            },
        });
        if (!route)
            throw new common_1.NotFoundException('Route not found');
        return { data: route };
    }
    async createRoute(dto) {
        const { pickupPoints, ...routeData } = dto;
        const data = await this.db.route.create({
            data: {
                ...routeData,
                monthlyFare: routeData.monthlyFare,
                pickupPoints: {
                    create: (pickupPoints || []).map((p, i) => ({ ...p, sortOrder: i + 1 })),
                },
            },
            include: { pickupPoints: true },
        });
        return { data, message: 'Route created' };
    }
    async updateRoute(id, dto) {
        return { data: await this.db.route.update({ where: { id }, data: dto }), message: 'Route updated' };
    }
    async addPickupPoint(routeId, dto) {
        const count = await this.db.pickupPoint.count({ where: { routeId } });
        const data = await this.db.pickupPoint.create({
            data: { ...dto, routeId, sortOrder: count + 1 },
        });
        return { data, message: 'Pickup point added' };
    }
    async allocateStudent(dto) {
        const data = await this.db.transportAllocation.upsert({
            where: { studentId: dto.studentId },
            update: { routeId: dto.routeId, pickupAddress: dto.pickupAddress, isActive: true },
            create: { ...dto, isActive: true },
        });
        return { data, message: 'Student allocated to transport' };
    }
    async deallocateStudent(studentId) {
        const data = await this.db.transportAllocation.update({
            where: { studentId },
            data: { isActive: false },
        });
        return { data, message: 'Student removed from transport' };
    }
    async getAllocations(query) {
        const where = { isActive: true };
        if (query.routeId)
            where.routeId = query.routeId;
        const [data, total] = await Promise.all([
            this.db.transportAllocation.findMany({
                where,
                include: {
                    student: { select: { firstName: true, lastName: true, admissionNo: true } },
                    route: { select: { routeNo: true, name: true, vehicle: { select: { vehicleNo: true } } } },
                },
            }),
            this.db.transportAllocation.count({ where }),
        ]);
        return { data, meta: (0, pagination_dto_1.buildPaginationMeta)(total, query) };
    }
    async updateVehicleLocation(vehicleId, dto) {
        const vehicle = await this.db.vehicle.findUnique({
            where: { id: vehicleId },
            select: { id: true, vehicleNo: true, driverName: true, gpsDeviceId: true },
        });
        if (!vehicle)
            throw new common_1.NotFoundException('Vehicle not found');
        const location = {
            vehicleId: vehicle.id,
            vehicleNo: vehicle.vehicleNo,
            lat: dto.lat,
            lng: dto.lng,
            speed: dto.speed || 0,
            heading: dto.heading || 0,
            timestamp: new Date(),
            driverName: vehicle.driverName || undefined,
        };
        this.vehicleLocations.set(vehicleId, location);
        return { data: location, message: 'Location updated' };
    }
    async getLiveLocations(routeId) {
        let vehicles = await this.db.vehicle.findMany({
            where: { isActive: true },
            include: routeId ? { routes: { where: { id: routeId } } } : undefined,
        });
        if (routeId) {
            vehicles = vehicles.filter((v) => v.routes && v.routes.length > 0);
        }
        const locations = vehicles.map((vehicle) => ({
            vehicleId: vehicle.id,
            vehicleNo: vehicle.vehicleNo,
            vehicleType: vehicle.vehicleType,
            driverName: vehicle.driverName,
            driverPhone: vehicle.driverPhone,
            capacity: vehicle.capacity,
            gpsDeviceId: vehicle.gpsDeviceId,
            ...this.vehicleLocations.get(vehicle.id) || {
                lat: null, lng: null, speed: 0, heading: 0, timestamp: null, isOnline: false,
            },
            isOnline: this.vehicleLocations.has(vehicle.id) &&
                Date.now() - (this.vehicleLocations.get(vehicle.id)?.timestamp?.getTime() || 0) < 60000,
        }));
        return { data: locations };
    }
    async getVehicleLocation(vehicleId) {
        const cached = this.vehicleLocations.get(vehicleId);
        const vehicle = await this.db.vehicle.findUnique({ where: { id: vehicleId } });
        return {
            data: {
                vehicleId,
                vehicleNo: vehicle?.vehicleNo,
                currentLocation: cached || null,
                isOnline: cached
                    ? Date.now() - cached.timestamp.getTime() < 60000
                    : false,
            },
        };
    }
    async getStats() {
        const [totalVehicles, totalRoutes, totalAllocations] = await Promise.all([
            this.db.vehicle.count({ where: { isActive: true } }),
            this.db.route.count({ where: { isActive: true } }),
            this.db.transportAllocation.count({ where: { isActive: true } }),
        ]);
        return { data: { totalVehicles, totalRoutes, totalAllocations } };
    }
};
exports.TransportService = TransportService;
exports.TransportService = TransportService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [tenant_prisma_service_1.TenantPrismaService])
], TransportService);
//# sourceMappingURL=transport.service.js.map