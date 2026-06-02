import {
  Controller, Get, Post, Body, Param, Query, UseGuards, ParseUUIDPipe,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { AttendanceService } from './attendance.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { BulkAttendanceDto } from './dto/attendance.dto';
import { PaginationDto } from '../../common/dto/pagination.dto';

@ApiTags('Attendance')
@ApiBearerAuth('access-token')
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller({ path: 'attendance', version: '1' })
export class AttendanceController {
  constructor(private readonly attendanceService: AttendanceService) {}

  @Post('bulk')
  @Roles('SCHOOL_ADMIN', 'TEACHER')
  @ApiOperation({ summary: 'Mark bulk attendance for a section' })
  markBulk(@Body() dto: BulkAttendanceDto, @CurrentUser('id') userId: string) {
    return this.attendanceService.markBulkAttendance(dto, userId);
  }

  @Get('section/:sectionId')
  @Roles('SCHOOL_ADMIN', 'TEACHER')
  @ApiOperation({ summary: 'Get attendance for a section on a date' })
  @ApiQuery({ name: 'date', required: true, example: '2024-09-01' })
  getSectionAttendance(
    @Param('sectionId', ParseUUIDPipe) sectionId: string,
    @Query('date') date: string,
  ) {
    return this.attendanceService.getSectionAttendance(sectionId, date);
  }

  @Get('student/:studentId')
  @Roles('SCHOOL_ADMIN', 'TEACHER', 'PARENT', 'STUDENT')
  @ApiOperation({ summary: 'Get student attendance history' })
  @ApiQuery({ name: 'fromDate', required: true })
  @ApiQuery({ name: 'toDate', required: true })
  getStudentAttendance(
    @Param('studentId', ParseUUIDPipe) studentId: string,
    @Query() pagination: PaginationDto,
    @Query('fromDate') fromDate: string,
    @Query('toDate') toDate: string,
  ) {
    return this.attendanceService.getStudentAttendance(studentId, { ...pagination, fromDate, toDate });
  }

  @Get('report/monthly')
  @Roles('SCHOOL_ADMIN', 'TEACHER')
  @ApiOperation({ summary: 'Get monthly attendance report for a section' })
  @ApiQuery({ name: 'sectionId', required: true })
  @ApiQuery({ name: 'month', required: true })
  @ApiQuery({ name: 'year', required: true })
  getMonthlyReport(
    @Query('sectionId') sectionId: string,
    @Query('month') month: number,
    @Query('year') year: number,
  ) {
    return this.attendanceService.getMonthlyReport(sectionId, +month, +year);
  }

  @Get('qr')
  @Roles('SCHOOL_ADMIN', 'TEACHER')
  @ApiOperation({ summary: 'Generate QR code for attendance marking' })
  @ApiQuery({ name: 'sectionId', required: true })
  @ApiQuery({ name: 'date', required: true })
  generateQr(@Query('sectionId') sectionId: string, @Query('date') date: string) {
    return this.attendanceService.generateQrCode(sectionId, date);
  }
}
