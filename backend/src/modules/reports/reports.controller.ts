import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { ReportsService } from './reports.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';

@ApiTags('Reports')
@ApiBearerAuth('access-token')
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller({ path: 'reports', version: '1' })
export class ReportsController {
  constructor(private readonly reportsService: ReportsService) {}
  @Get('dashboard') @Roles('SCHOOL_ADMIN') @ApiOperation({ summary: 'School dashboard stats' }) getDashboard() { return this.reportsService.getSchoolDashboard(); }
  @Get('attendance') @Roles('SCHOOL_ADMIN', 'TEACHER') @ApiOperation({ summary: 'Attendance report' }) getAttendance(@Query('sectionId') sectionId: string, @Query('month') month: number, @Query('year') year: number) { return this.reportsService.getAttendanceReport(sectionId, +month, +year); }
  @Get('fees') @Roles('SCHOOL_ADMIN', 'ACCOUNTANT') @ApiOperation({ summary: 'Fee collection report' }) getFees(@Query('academicYearId') academicYearId: string) { return this.reportsService.getFeeReport(academicYearId); }
  @Get('strength') @Roles('SCHOOL_ADMIN') @ApiOperation({ summary: 'Student strength report' }) getStrength(@Query('academicYearId') academicYearId: string) { return this.reportsService.getStudentStrengthReport(academicYearId); }
}
