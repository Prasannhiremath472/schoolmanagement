import { Controller, Get, Post, Patch, Body, Param, Query, UseGuards, ParseUUIDPipe } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { AcademicService } from './academic.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';

@ApiTags('Academic')
@ApiBearerAuth('access-token')
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller({ path: 'academic', version: '1' })
export class AcademicController {
  constructor(private readonly academicService: AcademicService) {}

  @Get('years') @ApiOperation({ summary: 'Get all academic years' })
  getYears() { return this.academicService.getAcademicYears(); }

  @Post('years') @Roles('SCHOOL_ADMIN') @ApiOperation({ summary: 'Create academic year' })
  createYear(@Body() dto: any) { return this.academicService.createAcademicYear(dto); }

  @Patch('years/:id/set-current') @Roles('SCHOOL_ADMIN') @ApiOperation({ summary: 'Set current academic year' })
  setCurrentYear(@Param('id', ParseUUIDPipe) id: string) { return this.academicService.setCurrentYear(id); }

  @Get('classes') @ApiOperation({ summary: 'Get classes for academic year' })
  @ApiQuery({ name: 'academicYearId', required: true })
  getClasses(@Query('academicYearId') academicYearId: string) { return this.academicService.getClasses(academicYearId); }

  @Post('classes') @Roles('SCHOOL_ADMIN') @ApiOperation({ summary: 'Create class' })
  createClass(@Body() dto: any) { return this.academicService.createClass(dto); }

  @Get('sections') @ApiOperation({ summary: 'Get sections (by classId or teacherId)' })
  @ApiQuery({ name: 'classId', required: false })
  @ApiQuery({ name: 'teacherId', required: false })
  getSections(@Query('classId') classId?: string, @Query('teacherId') teacherId?: string) {
    return this.academicService.getSections(classId, teacherId);
  }

  @Post('sections') @Roles('SCHOOL_ADMIN') @ApiOperation({ summary: 'Create section' })
  createSection(@Body() dto: any) { return this.academicService.createSection(dto); }

  @Get('subjects') @ApiOperation({ summary: 'Get subjects' })
  @ApiQuery({ name: 'classId', required: false })
  getSubjects(@Query('classId') classId?: string) { return this.academicService.getSubjects(classId); }

  @Post('subjects') @Roles('SCHOOL_ADMIN') @ApiOperation({ summary: 'Create subject' })
  createSubject(@Body() dto: any) { return this.academicService.createSubject(dto); }

  @Get('timetable/:sectionId') @ApiOperation({ summary: 'Get timetable for section' })
  getTimetable(@Param('sectionId', ParseUUIDPipe) sectionId: string) { return this.academicService.getTimetable(sectionId); }

  @Post('timetable') @Roles('SCHOOL_ADMIN') @ApiOperation({ summary: 'Create timetable' })
  createTimetable(@Body() dto: any) { return this.academicService.createTimetable(dto); }
}
