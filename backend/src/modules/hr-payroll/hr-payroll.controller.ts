import { Controller, Get, Post, Patch, Body, Param, Query, UseGuards, ParseUUIDPipe } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { HrPayrollService } from './hr-payroll.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { PaginationDto } from '../../common/dto/pagination.dto';

@ApiTags('HR & Payroll')
@ApiBearerAuth('access-token')
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller({ path: 'hr-payroll', version: '1' })
export class HrPayrollController {
  constructor(private readonly hrPayrollService: HrPayrollService) {}
  @Get('salary-structures') @ApiOperation({ summary: 'Get salary structures' }) getSalaryStructures() { return this.hrPayrollService.getSalaryStructures(); }
  @Post('salary-structures') @Roles('SCHOOL_ADMIN') @ApiOperation({ summary: 'Create salary structure' }) createSalaryStructure(@Body() dto: any) { return this.hrPayrollService.createSalaryStructure(dto); }
  @Get('leaves') @ApiOperation({ summary: 'Get leave applications' }) getLeaves(@Query() q: PaginationDto, @Query('status') status?: string) { return this.hrPayrollService.getLeaveApplications({ ...q, status }); }
  @Post('leaves') @ApiOperation({ summary: 'Apply for leave' }) applyLeave(@Body() dto: any) { return this.hrPayrollService.applyLeave(dto); }
  @Patch('leaves/:id') @Roles('SCHOOL_ADMIN') @ApiOperation({ summary: 'Approve/Reject leave' }) approveLeave(@Param('id', ParseUUIDPipe) id: string, @Body('status') status: string, @CurrentUser('id') userId: string) { return this.hrPayrollService.approveLeave(id, status, userId); }
  @Post('salary/process') @Roles('SCHOOL_ADMIN') @ApiOperation({ summary: 'Process salary' }) processSalary(@Body() dto: any) { return this.hrPayrollService.processSalary(dto); }
  @Get('salaries') @Roles('SCHOOL_ADMIN') @ApiOperation({ summary: 'Get salary records' }) getSalaries(@Query() q: PaginationDto, @Query('month') month?: number, @Query('year') year?: number) { return this.hrPayrollService.getSalaries({ ...q, month, year }); }
}
