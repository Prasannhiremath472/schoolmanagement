import { Controller, Get, Post, Put, Body, Param, Query, UseGuards, ParseUUIDPipe } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { TeacherService } from './teacher.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { PaginationDto } from '../../common/dto/pagination.dto';

@ApiTags('Teachers')
@ApiBearerAuth('access-token')
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller({ path: 'teachers', version: '1' })
export class TeacherController {
  constructor(private readonly teacherService: TeacherService) {}
  @Get() @ApiOperation({ summary: 'List teachers' }) findAll(@Query() query: PaginationDto) { return this.teacherService.findAll(query); }
  @Get('stats') @Roles('SCHOOL_ADMIN') @ApiOperation({ summary: 'Teacher stats' }) getStats() { return this.teacherService.getStats(); }
  @Get(':id') @ApiOperation({ summary: 'Get teacher' }) findOne(@Param('id', ParseUUIDPipe) id: string) { return this.teacherService.findOne(id); }
  @Post() @Roles('SCHOOL_ADMIN') @ApiOperation({ summary: 'Create teacher' }) create(@Body() dto: any) { return this.teacherService.create(dto); }
  @Put(':id') @Roles('SCHOOL_ADMIN') @ApiOperation({ summary: 'Update teacher' }) update(@Param('id', ParseUUIDPipe) id: string, @Body() dto: any) { return this.teacherService.update(id, dto); }
}
