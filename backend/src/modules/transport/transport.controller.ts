import {
  Controller, Get, Post, Put, Patch, Delete, Body, Param, Query,
  UseGuards, ParseUUIDPipe,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { TransportService } from './transport.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { Public } from '../auth/decorators/public.decorator';
import { PaginationDto } from '../../common/dto/pagination.dto';

@ApiTags('Transport')
@ApiBearerAuth('access-token')
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller({ path: 'transport', version: '1' })
export class TransportController {
  constructor(private readonly transportService: TransportService) {}

  @Get('stats') @ApiOperation({ summary: 'Transport statistics' })
  getStats() { return this.transportService.getStats(); }

  // ─── Vehicles ─────────────────────────────────────────────────────────────
  @Get('vehicles') @ApiOperation({ summary: 'Get all vehicles' })
  getVehicles() { return this.transportService.getVehicles(); }

  @Get('vehicles/:id') @ApiOperation({ summary: 'Get vehicle details' })
  getVehicle(@Param('id', ParseUUIDPipe) id: string) { return this.transportService.getVehicle(id); }

  @Post('vehicles') @Roles('SCHOOL_ADMIN', 'TRANSPORT_MANAGER') @ApiOperation({ summary: 'Add vehicle' })
  createVehicle(@Body() dto: any) { return this.transportService.createVehicle(dto); }

  @Put('vehicles/:id') @Roles('SCHOOL_ADMIN', 'TRANSPORT_MANAGER') @ApiOperation({ summary: 'Update vehicle' })
  updateVehicle(@Param('id', ParseUUIDPipe) id: string, @Body() dto: any) { return this.transportService.updateVehicle(id, dto); }

  // ─── Drivers ──────────────────────────────────────────────────────────────
  @Get('drivers') @ApiOperation({ summary: 'Get all drivers' })
  getDrivers() { return this.transportService.getDrivers(); }

  @Patch('vehicles/:id/driver') @Roles('SCHOOL_ADMIN', 'TRANSPORT_MANAGER') @ApiOperation({ summary: 'Assign driver to vehicle' })
  assignDriver(@Param('id', ParseUUIDPipe) id: string, @Body() dto: any) { return this.transportService.assignDriver(id, dto); }

  // ─── Routes ───────────────────────────────────────────────────────────────
  @Get('routes') @ApiOperation({ summary: 'Get all routes' })
  getRoutes() { return this.transportService.getRoutes(); }

  @Get('routes/:id') @ApiOperation({ summary: 'Get route details with allocations' })
  getRoute(@Param('id', ParseUUIDPipe) id: string) { return this.transportService.getRoute(id); }

  @Post('routes') @Roles('SCHOOL_ADMIN', 'TRANSPORT_MANAGER') @ApiOperation({ summary: 'Create route' })
  createRoute(@Body() dto: any) { return this.transportService.createRoute(dto); }

  @Put('routes/:id') @Roles('SCHOOL_ADMIN', 'TRANSPORT_MANAGER') @ApiOperation({ summary: 'Update route' })
  updateRoute(@Param('id', ParseUUIDPipe) id: string, @Body() dto: any) { return this.transportService.updateRoute(id, dto); }

  @Post('routes/:id/pickup-points') @Roles('SCHOOL_ADMIN', 'TRANSPORT_MANAGER') @ApiOperation({ summary: 'Add pickup point to route' })
  addPickupPoint(@Param('id', ParseUUIDPipe) routeId: string, @Body() dto: any) { return this.transportService.addPickupPoint(routeId, dto); }

  // ─── Allocations ──────────────────────────────────────────────────────────
  @Post('allocate') @Roles('SCHOOL_ADMIN', 'TRANSPORT_MANAGER') @ApiOperation({ summary: 'Allocate student to route' })
  allocate(@Body() dto: any) { return this.transportService.allocateStudent(dto); }

  @Delete('allocate/:studentId') @Roles('SCHOOL_ADMIN', 'TRANSPORT_MANAGER') @ApiOperation({ summary: 'Remove student from transport' })
  deallocate(@Param('studentId', ParseUUIDPipe) studentId: string) { return this.transportService.deallocateStudent(studentId); }

  @Get('allocations') @ApiOperation({ summary: 'Get all transport allocations' })
  @ApiQuery({ name: 'routeId', required: false })
  getAllocations(@Query() query: PaginationDto, @Query('routeId') routeId?: string) {
    return this.transportService.getAllocations({ ...query, routeId });
  }

  // ─── GPS Tracking ─────────────────────────────────────────────────────────
  @Get('gps/live') @ApiOperation({ summary: 'Get live GPS locations of all vehicles' })
  @ApiQuery({ name: 'routeId', required: false })
  getLiveLocations(@Query('routeId') routeId?: string) { return this.transportService.getLiveLocations(routeId); }

  @Get('gps/:vehicleId') @ApiOperation({ summary: 'Get current GPS location of a vehicle' })
  getVehicleLocation(@Param('vehicleId', ParseUUIDPipe) vehicleId: string) { return this.transportService.getVehicleLocation(vehicleId); }

  @Post('gps/:vehicleId/update')
  @Public() // GPS devices call this without auth
  @ApiOperation({ summary: 'Update vehicle GPS location (called by GPS device)' })
  updateLocation(@Param('vehicleId', ParseUUIDPipe) vehicleId: string, @Body() dto: { lat: number; lng: number; speed?: number; heading?: number }) {
    return this.transportService.updateVehicleLocation(vehicleId, dto);
  }
}
