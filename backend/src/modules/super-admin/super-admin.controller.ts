import {
  Controller, Get, Post, Put, Patch, Delete, Body, Param, Query, UseGuards, ParseUUIDPipe,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { SuperAdminService } from './super-admin.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { PaginationDto } from '../../common/dto/pagination.dto';
import { CreateSchoolDto, UpdateSchoolDto } from './dto/school.dto';

@ApiTags('Super Admin')
@ApiBearerAuth('access-token')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('SUPER_ADMIN', 'ADMIN')
@Controller({ path: 'super-admin', version: '1' })
export class SuperAdminController {
  constructor(private readonly superAdminService: SuperAdminService) {}

  @Get('dashboard')
  @ApiOperation({ summary: 'Super admin dashboard stats' })
  getDashboard() { return this.superAdminService.getDashboardStats(); }

  @Get('schools')
  @ApiOperation({ summary: 'List all schools' })
  @ApiQuery({ name: 'status', required: false })
  getSchools(@Query() query: PaginationDto, @Query('status') status?: string) {
    return this.superAdminService.getSchools({ ...query, status });
  }

  @Get('schools/:id')
  @ApiOperation({ summary: 'Get school details' })
  getSchool(@Param('id', ParseUUIDPipe) id: string) {
    return this.superAdminService.getSchool(id);
  }

  @Post('schools')
  @ApiOperation({ summary: 'Create and provision a new school' })
  createSchool(@Body() dto: CreateSchoolDto) {
    return this.superAdminService.createSchool(dto);
  }

  @Put('schools/:id')
  @ApiOperation({ summary: 'Update school details' })
  updateSchool(@Param('id', ParseUUIDPipe) id: string, @Body() dto: UpdateSchoolDto) {
    return this.superAdminService.updateSchool(id, dto);
  }

  @Patch('schools/:id/status')
  @ApiOperation({ summary: 'Change school status (ACTIVE/SUSPENDED/EXPIRED)' })
  updateStatus(@Param('id', ParseUUIDPipe) id: string, @Body('status') status: string) {
    return this.superAdminService.updateSchoolStatus(id, status);
  }

  @Delete('schools/:id')
  @Roles('SUPER_ADMIN')
  @ApiOperation({ summary: 'Delete school' })
  deleteSchool(@Param('id', ParseUUIDPipe) id: string) {
    return this.superAdminService.deleteSchool(id);
  }

  @Get('plans')
  @ApiOperation({ summary: 'List subscription plans' })
  getPlans() { return this.superAdminService.getPlans(); }

  @Post('plans')
  @ApiOperation({ summary: 'Create subscription plan' })
  createPlan(@Body() dto: any) { return this.superAdminService.createPlan(dto); }

  @Get('resellers')
  @ApiOperation({ summary: 'List resellers' })
  getResellers(@Query() query: PaginationDto) {
    return this.superAdminService.getResellers(query);
  }

  @Get('audit-logs')
  @ApiOperation({ summary: 'View audit logs' })
  getAuditLogs(@Query() query: PaginationDto) {
    return this.superAdminService.getAuditLogs(query);
  }

  @Get('revenue')
  @ApiOperation({ summary: 'Revenue report' })
  @ApiQuery({ name: 'period', enum: ['daily', 'monthly', 'yearly'] })
  getRevenue(@Query('period') period: 'daily' | 'monthly' | 'yearly') {
    return this.superAdminService.getRevenueReport(period);
  }

  // ─── System Settings ──────────────────────────────────────────────────────
  @Get('settings') @ApiOperation({ summary: 'Get platform system settings' })
  @ApiQuery({ name: 'group', required: false })
  getSettings(@Query('group') group?: string) { return this.superAdminService.getSystemSettings(group); }

  @Post('settings') @ApiOperation({ summary: 'Save/update a system setting' })
  upsertSetting(@Body() dto: any) { return this.superAdminService.upsertSystemSetting(dto); }

  @Post('settings/bulk') @ApiOperation({ summary: 'Save multiple settings at once' })
  bulkSettings(@Body() dto: { settings: any[] }) { return this.superAdminService.bulkUpsertSettings(dto.settings); }

  @Delete('settings/:key') @Roles('SUPER_ADMIN') @ApiOperation({ summary: 'Delete a system setting' })
  deleteSetting(@Param('key') key: string) { return this.superAdminService.deleteSystemSetting(key); }

  // ─── White-Label Branding ─────────────────────────────────────────────────
  @Get('schools/:id/branding') @ApiOperation({ summary: 'Get school branding config' })
  getSchoolBranding(@Param('id', ParseUUIDPipe) id: string) { return this.superAdminService.getSchoolBranding(id); }

  @Put('schools/:id/branding') @ApiOperation({ summary: 'Update school white-label branding' })
  updateBranding(@Param('id', ParseUUIDPipe) id: string, @Body() dto: any) { return this.superAdminService.updateSchoolBranding(id, dto); }

  @Get('custom-domains') @ApiOperation({ summary: 'Get all custom domain mappings' })
  getCustomDomains() { return this.superAdminService.getCustomDomains(); }

  // ─── User Management ──────────────────────────────────────────────────────
  @Get('users') @ApiOperation({ summary: 'Get platform admin users' })
  getPlatformUsers(@Query() query: PaginationDto) { return this.superAdminService.getPlatformUsers(query); }

  @Post('users') @Roles('SUPER_ADMIN') @ApiOperation({ summary: 'Create platform user' })
  createUser(@Body() dto: any) { return this.superAdminService.createPlatformUser(dto); }

  @Patch('users/:id/status') @Roles('SUPER_ADMIN') @ApiOperation({ summary: 'Activate/deactivate platform user' })
  updateUserStatus(@Param('id', ParseUUIDPipe) id: string, @Body('isActive') isActive: boolean) {
    return this.superAdminService.updatePlatformUserStatus(id, isActive);
  }

  // ─── Platform Notifications ───────────────────────────────────────────────
  @Post('notify') @ApiOperation({ summary: 'Send notification to all schools' })
  sendNotification(@Body() dto: any) { return this.superAdminService.sendPlatformNotification(dto); }

  // ─── Resource Monitoring ─────────────────────────────────────────────────
  @Get('metrics') @ApiOperation({ summary: 'Get resource usage metrics' })
  @ApiQuery({ name: 'schoolId', required: false })
  getMetrics(@Query('schoolId') schoolId?: string) { return this.superAdminService.getResourceMetrics(schoolId); }
}
