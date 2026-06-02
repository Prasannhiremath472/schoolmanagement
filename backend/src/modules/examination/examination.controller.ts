import {
  Controller, Get, Post, Patch, Body, Param, Query, UseGuards, ParseUUIDPipe,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { ExaminationService } from './examination.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { CreateExamScheduleDto, BulkMarksDto } from './dto/examination.dto';

@ApiTags('Examinations')
@ApiBearerAuth('access-token')
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller({ path: 'examinations', version: '1' })
export class ExaminationController {
  constructor(private readonly examinationService: ExaminationService) {}

  @Get('types') @Roles('SCHOOL_ADMIN', 'TEACHER')
  @ApiOperation({ summary: 'Get exam types' })
  getExamTypes() { return this.examinationService.getExamTypes(); }

  @Post('types') @Roles('SCHOOL_ADMIN')
  @ApiOperation({ summary: 'Create exam type' })
  createExamType(@Body() dto: any) { return this.examinationService.createExamType(dto); }

  @Get('schedules')
  @Roles('SCHOOL_ADMIN', 'TEACHER', 'STUDENT', 'PARENT')
  @ApiOperation({ summary: 'Get exam schedules' })
  @ApiQuery({ name: 'classId', required: false })
  @ApiQuery({ name: 'academicYearId', required: false })
  @ApiQuery({ name: 'examTypeId', required: false })
  getSchedules(
    @Query('classId') classId?: string,
    @Query('academicYearId') academicYearId?: string,
    @Query('examTypeId') examTypeId?: string,
  ) { return this.examinationService.getSchedules({ classId, academicYearId, examTypeId }); }

  @Post('schedules') @Roles('SCHOOL_ADMIN')
  @ApiOperation({ summary: 'Create exam schedule' })
  createSchedule(@Body() dto: CreateExamScheduleDto) {
    return this.examinationService.createSchedule(dto);
  }

  @Patch('schedules/:id/publish') @Roles('SCHOOL_ADMIN')
  @ApiOperation({ summary: 'Publish exam schedule' })
  publishSchedule(@Param('id', ParseUUIDPipe) id: string) {
    return this.examinationService.publishSchedule(id);
  }

  @Post('marks/bulk') @Roles('SCHOOL_ADMIN', 'TEACHER')
  @ApiOperation({ summary: 'Enter marks for multiple students' })
  enterBulkMarks(@Body() dto: BulkMarksDto, @CurrentUser('id') userId: string) {
    return this.examinationService.enterBulkMarks(dto, userId);
  }

  @Get('results')
  @Roles('SCHOOL_ADMIN', 'TEACHER')
  @ApiOperation({ summary: 'Get results for an exam schedule' })
  @ApiQuery({ name: 'examScheduleId', required: true })
  @ApiQuery({ name: 'sectionId', required: false })
  getResults(
    @Query('examScheduleId') examScheduleId: string,
    @Query('sectionId') sectionId?: string,
  ) { return this.examinationService.getResults(examScheduleId, sectionId); }

  @Get('results/student/:studentId')
  @Roles('SCHOOL_ADMIN', 'TEACHER', 'STUDENT', 'PARENT')
  @ApiOperation({ summary: 'Get student result report' })
  @ApiQuery({ name: 'examScheduleId', required: true })
  getStudentReport(
    @Param('studentId', ParseUUIDPipe) studentId: string,
    @Query('examScheduleId') examScheduleId: string,
  ) { return this.examinationService.getStudentReport(studentId, examScheduleId); }

  @Post('report-cards/generate') @Roles('SCHOOL_ADMIN')
  @ApiOperation({ summary: 'Generate report cards for a section' })
  generateReportCards(
    @Body() dto: { examScheduleId: string; sectionId: string },
  ) { return this.examinationService.generateReportCards(dto.examScheduleId, dto.sectionId); }

  @Get('analysis')
  @Roles('SCHOOL_ADMIN', 'TEACHER')
  @ApiQuery({ name: 'examScheduleId', required: true })
  @ApiOperation({ summary: 'Get exam analysis by subject' })
  getAnalysis(@Query('examScheduleId') examScheduleId: string) {
    return this.examinationService.getAnalysis(examScheduleId);
  }
}
