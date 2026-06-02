import {
  Controller, Get, Post, Put, Patch, Body, Param, Query,
  UseGuards, ParseUUIDPipe,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { HostelService } from './hostel.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { PaginationDto } from '../../common/dto/pagination.dto';

@ApiTags('Hostel')
@ApiBearerAuth('access-token')
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller({ path: 'hostel', version: '1' })
export class HostelController {
  constructor(private readonly hostelService: HostelService) {}

  // ─── Hostels ─────────────────────────────────────────────────────────────
  @Get() @ApiOperation({ summary: 'Get all hostels' })
  getHostels() { return this.hostelService.getHostels(); }

  @Get('stats') @ApiOperation({ summary: 'Get hostel occupancy stats' })
  getStats(@Query('hostelId') hostelId?: string) { return this.hostelService.getHostelStats(hostelId); }

  @Get(':id') @ApiOperation({ summary: 'Get hostel with rooms' })
  getHostel(@Param('id', ParseUUIDPipe) id: string) { return this.hostelService.getHostel(id); }

  @Post() @Roles('SCHOOL_ADMIN', 'HOSTEL_WARDEN') @ApiOperation({ summary: 'Create hostel' })
  createHostel(@Body() dto: any) { return this.hostelService.createHostel(dto); }

  @Put(':id') @Roles('SCHOOL_ADMIN', 'HOSTEL_WARDEN') @ApiOperation({ summary: 'Update hostel' })
  updateHostel(@Param('id', ParseUUIDPipe) id: string, @Body() dto: any) { return this.hostelService.updateHostel(id, dto); }

  // ─── Rooms ────────────────────────────────────────────────────────────────
  @Get(':hostelId/rooms') @ApiOperation({ summary: 'Get rooms in a hostel' })
  getRooms(@Param('hostelId', ParseUUIDPipe) hostelId: string) { return this.hostelService.getRooms(hostelId); }

  @Post('rooms') @Roles('SCHOOL_ADMIN', 'HOSTEL_WARDEN') @ApiOperation({ summary: 'Create room' })
  createRoom(@Body() dto: any) { return this.hostelService.createRoom(dto); }

  // ─── Allocations ──────────────────────────────────────────────────────────
  @Post('allocate') @Roles('SCHOOL_ADMIN', 'HOSTEL_WARDEN') @ApiOperation({ summary: 'Allocate student to room' })
  allocate(@Body() dto: any) { return this.hostelService.allocateStudent(dto); }

  @Patch('vacate/:studentId') @Roles('SCHOOL_ADMIN', 'HOSTEL_WARDEN') @ApiOperation({ summary: 'Vacate student from hostel' })
  vacate(@Param('studentId', ParseUUIDPipe) studentId: string, @Body('leaveDate') leaveDate?: string) {
    return this.hostelService.vacateStudent(studentId, leaveDate);
  }

  @Get('allocations/all') @Roles('SCHOOL_ADMIN', 'HOSTEL_WARDEN') @ApiOperation({ summary: 'Get all current allocations' })
  getAllocations(@Query() query: PaginationDto, @Query('hostelId') hostelId?: string) {
    return this.hostelService.getAllAllocations({ ...query, hostelId });
  }

  // ─── Hostel Fees ─────────────────────────────────────────────────────────
  @Post('fees/collect') @Roles('SCHOOL_ADMIN', 'HOSTEL_WARDEN', 'ACCOUNTANT') @ApiOperation({ summary: 'Collect hostel fee' })
  collectFee(@Body() dto: any, @CurrentUser('id') userId: string) {
    return this.hostelService.collectHostelFee({ ...dto, collectedBy: userId });
  }

  @Get('fees/dues') @Roles('SCHOOL_ADMIN', 'HOSTEL_WARDEN', 'ACCOUNTANT')
  @ApiQuery({ name: 'hostelId', required: true })
  @ApiQuery({ name: 'month', required: true })
  @ApiQuery({ name: 'year', required: true })
  @ApiOperation({ summary: 'Get hostel fee dues' })
  getFeeDues(@Query('hostelId') hostelId: string, @Query('month') month: number, @Query('year') year: number) {
    return this.hostelService.getHostelFeeDues(hostelId, +month, +year);
  }

  // ─── Hostel Attendance ────────────────────────────────────────────────────
  @Post('attendance') @Roles('SCHOOL_ADMIN', 'HOSTEL_WARDEN') @ApiOperation({ summary: 'Mark hostel attendance' })
  markAttendance(@Body() dto: any) { return this.hostelService.markHostelAttendance(dto); }

  @Get('attendance/:hostelId') @Roles('SCHOOL_ADMIN', 'HOSTEL_WARDEN')
  @ApiQuery({ name: 'date', required: true })
  @ApiOperation({ summary: 'Get hostel attendance for a date' })
  getAttendance(@Param('hostelId', ParseUUIDPipe) hostelId: string, @Query('date') date: string) {
    return this.hostelService.getHostelAttendance(hostelId, date);
  }

  // ─── Mess Management ──────────────────────────────────────────────────────
  @Get(':hostelId/mess') @ApiOperation({ summary: 'Get mess weekly menu' })
  getMessMenu(@Param('hostelId', ParseUUIDPipe) hostelId: string) { return this.hostelService.getMessMenu(hostelId); }

  @Put(':hostelId/mess') @Roles('SCHOOL_ADMIN', 'HOSTEL_WARDEN') @ApiOperation({ summary: 'Update mess menu' })
  updateMessMenu(@Param('hostelId', ParseUUIDPipe) hostelId: string, @Body() dto: any) {
    return this.hostelService.updateMessMenu(hostelId, dto);
  }
}
