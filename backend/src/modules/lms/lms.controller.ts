import { Controller, Get, Post, Patch, Body, Param, Query, UseGuards, ParseUUIDPipe } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { LmsService } from './lms.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { PaginationDto } from '../../common/dto/pagination.dto';

@ApiTags('LMS')
@ApiBearerAuth('access-token')
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller({ path: 'lms', version: '1' })
export class LmsController {
  constructor(private readonly lmsService: LmsService) {}

  @Get('assignments') @ApiOperation({ summary: 'Get assignments' })
  getAssignments(@Query() query: PaginationDto, @Query('subjectId') subjectId?: string) {
    return this.lmsService.getAssignments({ ...query, subjectId });
  }

  @Post('assignments') @Roles('SCHOOL_ADMIN', 'TEACHER') @ApiOperation({ summary: 'Create assignment' })
  createAssignment(@Body() dto: any, @CurrentUser('id') teacherId: string) {
    return this.lmsService.createAssignment(dto, teacherId);
  }

  @Post('assignments/:id/submit') @Roles('STUDENT') @ApiOperation({ summary: 'Submit assignment' })
  submitAssignment(@Param('id', ParseUUIDPipe) id: string, @CurrentUser() user: any, @Body() dto: any) {
    return this.lmsService.submitAssignment(id, user.studentId, dto);
  }

  @Patch('submissions/:id/evaluate') @Roles('TEACHER', 'SCHOOL_ADMIN') @ApiOperation({ summary: 'Evaluate submission' })
  evaluate(@Param('id', ParseUUIDPipe) id: string, @Body() dto: any) {
    return this.lmsService.evaluateSubmission(id, dto);
  }

  @Get('homework') @ApiOperation({ summary: 'Get homework list' })
  getHomework(@Query() query: PaginationDto, @Query('subjectId') subjectId?: string) {
    return this.lmsService.getHomework({ ...query, subjectId });
  }

  @Post('homework') @Roles('TEACHER', 'SCHOOL_ADMIN') @ApiOperation({ summary: 'Assign homework' })
  createHomework(@Body() dto: any, @CurrentUser('id') teacherId: string) {
    return this.lmsService.createHomework(dto, teacherId);
  }

  @Get('materials') @ApiOperation({ summary: 'Get study materials' })
  getMaterials(@Query('subjectId') subjectId?: string) { return this.lmsService.getMaterials(subjectId); }

  @Post('materials') @Roles('TEACHER', 'SCHOOL_ADMIN') @ApiOperation({ summary: 'Upload study material' })
  uploadMaterial(@Body() dto: any, @CurrentUser('id') userId: string) { return this.lmsService.uploadMaterial(dto, userId); }

  @Get('quizzes') @ApiOperation({ summary: 'Get quizzes' })
  getQuizzes(@Query('subjectId') subjectId?: string) { return this.lmsService.getQuizzes(subjectId); }

  @Post('quizzes') @Roles('TEACHER', 'SCHOOL_ADMIN') @ApiOperation({ summary: 'Create quiz' })
  createQuiz(@Body() dto: any) { return this.lmsService.createQuiz(dto); }

  @Post('quizzes/:id/submit') @Roles('STUDENT') @ApiOperation({ summary: 'Submit quiz answers' })
  submitQuiz(@Param('id', ParseUUIDPipe) id: string, @CurrentUser() user: any, @Body('answers') answers: any) {
    return this.lmsService.submitQuiz(id, user.id, answers);
  }

  @Get('live-classes') @ApiOperation({ summary: 'Get live classes' })
  getLiveClasses(@Query('teacherId') teacherId?: string) { return this.lmsService.getLiveClasses(teacherId); }

  @Post('live-classes') @Roles('TEACHER', 'SCHOOL_ADMIN') @ApiOperation({ summary: 'Schedule live class (auto-creates Zoom/Meet link)' })
  createLiveClass(@Body() dto: any, @CurrentUser('id') teacherId: string) { return this.lmsService.createLiveClass(dto, teacherId); }

  @Patch('live-classes/:id/start') @Roles('TEACHER', 'SCHOOL_ADMIN') @ApiOperation({ summary: 'Start live class' })
  startLiveClass(@Param('id', ParseUUIDPipe) id: string) { return this.lmsService.startLiveClass(id); }

  @Patch('live-classes/:id/end') @Roles('TEACHER', 'SCHOOL_ADMIN') @ApiOperation({ summary: 'End live class' })
  endLiveClass(@Param('id', ParseUUIDPipe) id: string, @Body('recordingUrl') url?: string) { return this.lmsService.endLiveClass(id, url); }

  @Get('recorded-classes') @ApiOperation({ summary: 'Get recorded/completed classes' })
  getRecorded(@Query('teacherId') teacherId?: string) { return this.lmsService.getRecordedClasses(teacherId); }
}
