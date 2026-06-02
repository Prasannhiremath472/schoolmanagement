import { Controller, Get, Put, Body, Param, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { SchoolService } from './school.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';

@ApiTags('Schools')
@ApiBearerAuth('access-token')
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller({ path: 'school', version: '1' })
export class SchoolController {
  constructor(private readonly schoolService: SchoolService) {}
  @Get('profile/:slug') @ApiOperation({ summary: 'Get school profile' }) getProfile(@Param('slug') slug: string) { return this.schoolService.getSchoolProfile(slug); }
  @Get('stats/:slug') @Roles('SCHOOL_ADMIN') @ApiOperation({ summary: 'Get school stats' }) getStats(@Param('slug') slug: string) { return this.schoolService.getSchoolStats(slug); }
  @Put('settings/:slug') @Roles('SCHOOL_ADMIN') @ApiOperation({ summary: 'Update school settings' }) updateSettings(@Param('slug') slug: string, @Body() dto: any) { return this.schoolService.updateSchoolSettings(slug, dto); }
}
