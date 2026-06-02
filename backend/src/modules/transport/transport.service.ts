import { Injectable, NotFoundException } from '@nestjs/common';
import { TenantPrismaService } from '../../database/tenant-prisma.service';
import { PaginationDto, buildPaginationMeta, getPaginationArgs } from '../../common/dto/pagination.dto';

@Injectable()
export class TransportService {
  constructor(private readonly tenantPrisma: TenantPrismaService) {}
  private get db() { return this.tenantPrisma.db; }

  // ─── VEHICLES ─────────────────────────────────────────────────────────────

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

  async getVehicle(id: string) {
    const vehicle = await this.db.vehicle.findUnique({
      where: { id },
      include: { routes: { include: { pickupPoints: true, allocations: { where: { isActive: true } } } } },
    });
    if (!vehicle) throw new NotFoundException('Vehicle not found');
    return { data: vehicle };
  }

  async createVehicle(dto: any) {
    return { data: await this.db.vehicle.create({ data: dto }), message: 'Vehicle added' };
  }

  async updateVehicle(id: string, dto: any) {
    return { data: await this.db.vehicle.update({ where: { id }, data: dto }), message: 'Vehicle updated' };
  }

  // ─── DRIVERS ─────────────────────────────────────────────────────────────

  /**
   * Drivers are stored as vehicle fields (driverName, driverPhone, driverLicense).
   * We also support an extended driver profile via vehicle update.
   */
  async assignDriver(vehicleId: string, driverDto: {
    driverName: string;
    driverPhone: string;
    driverLicense: string;
  }) {
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

  // ─── ROUTES ───────────────────────────────────────────────────────────────

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

  async getRoute(id: string) {
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
    if (!route) throw new NotFoundException('Route not found');
    return { data: route };
  }

  async createRoute(dto: any) {
    const { pickupPoints, ...routeData } = dto;
    const data = await this.db.route.create({
      data: {
        ...routeData,
        monthlyFare: routeData.monthlyFare,
        pickupPoints: {
          create: (pickupPoints || []).map((p: any, i: number) => ({ ...p, sortOrder: i + 1 })),
        },
      },
      include: { pickupPoints: true },
    });
    return { data, message: 'Route created' };
  }

  async updateRoute(id: string, dto: any) {
    return { data: await this.db.route.update({ where: { id }, data: dto }), message: 'Route updated' };
  }

  async addPickupPoint(routeId: string, dto: any) {
    const count = await this.db.pickupPoint.count({ where: { routeId } });
    const data = await this.db.pickupPoint.create({
      data: { ...dto, routeId, sortOrder: count + 1 },
    });
    return { data, message: 'Pickup point added' };
  }

  // ─── STUDENT ALLOCATION ───────────────────────────────────────────────────

  async allocateStudent(dto: { studentId: string; routeId: string; pickupAddress?: string }) {
    const data = await this.db.transportAllocation.upsert({
      where: { studentId: dto.studentId },
      update: { routeId: dto.routeId, pickupAddress: dto.pickupAddress, isActive: true },
      create: { ...dto, isActive: true },
    });
    return { data, message: 'Student allocated to transport' };
  }

  async deallocateStudent(studentId: string) {
    const data = await this.db.transportAllocation.update({
      where: { studentId },
      data: { isActive: false },
    });
    return { data, message: 'Student removed from transport' };
  }

  async getAllocations(query: Partial<PaginationDto> & { routeId?: string }) {
    const where: any = { isActive: true };
    if (query.routeId) where.routeId = query.routeId;

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

    return { data, meta: buildPaginationMeta(total, query) };
  }

  // ─── GPS TRACKING ─────────────────────────────────────────────────────────

  /**
   * GPS Location Update — called by vehicle's GPS device or driver app.
   * Stored in Redis for real-time updates (or in-memory for demo).
   */
  private readonly vehicleLocations = new Map<string, {
    vehicleId: string;
    vehicleNo: string;
    lat: number;
    lng: number;
    speed: number;
    heading: number;
    timestamp: Date;
    driverName?: string;
  }>();

  async updateVehicleLocation(vehicleId: string, dto: {
    lat: number;
    lng: number;
    speed?: number;
    heading?: number;
  }) {
    const vehicle = await this.db.vehicle.findUnique({
      where: { id: vehicleId },
      select: { id: true, vehicleNo: true, driverName: true, gpsDeviceId: true },
    });

    if (!vehicle) throw new NotFoundException('Vehicle not found');

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

  /** Get current location of all active vehicles */
  async getLiveLocations(routeId?: string) {
    let vehicles = await this.db.vehicle.findMany({
      where: { isActive: true },
      include: routeId ? { routes: { where: { id: routeId } } } : undefined,
    });

    if (routeId) {
      vehicles = vehicles.filter((v) => v.routes && (v as any).routes.length > 0);
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

  /** Get vehicle location history (from GPS device ID) */
  async getVehicleLocation(vehicleId: string) {
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

  // ─── STATS ────────────────────────────────────────────────────────────────

  async getStats() {
    const [totalVehicles, totalRoutes, totalAllocations] = await Promise.all([
      this.db.vehicle.count({ where: { isActive: true } }),
      this.db.route.count({ where: { isActive: true } }),
      this.db.transportAllocation.count({ where: { isActive: true } }),
    ]);

    return { data: { totalVehicles, totalRoutes, totalAllocations } };
  }
}
