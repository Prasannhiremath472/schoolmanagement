import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { AnalyticsService } from './analytics.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';

@ApiTags('Analytics')
@ApiBearerAuth('access-token')
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller({ path: 'analytics', version: '1' })
export class AnalyticsController {
  constructor(private readonly analyticsService: AnalyticsService) {}

  @Get('overview') @Roles('SCHOOL_ADMIN') @ApiOperation({ summary: 'School overview analytics' })
  getOverview() { return this.analyticsService.getOverview(); }

  @Get('attendance-trend') @Roles('SCHOOL_ADMIN') @ApiOperation({ summary: 'Attendance trend' })
  getAttendanceTrend(@Query('days') days = '30') {
    return this.analyticsService.getAttendanceTrend(parseInt(days, 10) || 30);
  }

  @Get('fee-trend') @Roles('SCHOOL_ADMIN', 'ACCOUNTANT') @ApiOperation({ summary: 'Fee collection trend' })
  getFeeTrend(@Query('months') months = '6') {
    return this.analyticsService.getFeeTrend(parseInt(months, 10) || 6);
  }
}
