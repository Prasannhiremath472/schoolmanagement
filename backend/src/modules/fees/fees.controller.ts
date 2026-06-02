import {
  Controller, Get, Post, Put, Body, Param, Query, UseGuards, ParseUUIDPipe,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { FeesService } from './fees.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { PaginationDto } from '../../common/dto/pagination.dto';
import { CreateFeeStructureDto, CollectFeeDto, CreateFeeCategoryDto } from './dto/fees.dto';

@ApiTags('Fees')
@ApiBearerAuth('access-token')
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller({ path: 'fees', version: '1' })
export class FeesController {
  constructor(private readonly feesService: FeesService) {}

  @Get('categories')
  @Roles('SCHOOL_ADMIN', 'ACCOUNTANT')
  @ApiOperation({ summary: 'Get all fee categories' })
  getCategories() { return this.feesService.getCategories(); }

  @Post('categories')
  @Roles('SCHOOL_ADMIN')
  @ApiOperation({ summary: 'Create fee category' })
  createCategory(@Body() dto: CreateFeeCategoryDto) { return this.feesService.createCategory(dto); }

  @Get('structures')
  @Roles('SCHOOL_ADMIN', 'ACCOUNTANT', 'TEACHER')
  @ApiOperation({ summary: 'Get fee structures' })
  @ApiQuery({ name: 'classId', required: false })
  @ApiQuery({ name: 'academicYearId', required: false })
  getFeeStructures(
    @Query('classId') classId?: string,
    @Query('academicYearId') academicYearId?: string,
  ) { return this.feesService.getFeeStructures(classId, academicYearId); }

  @Post('structures')
  @Roles('SCHOOL_ADMIN')
  @ApiOperation({ summary: 'Create fee structure for a class' })
  createFeeStructure(@Body() dto: CreateFeeStructureDto) {
    return this.feesService.createFeeStructure(dto);
  }

  @Post('collect')
  @Roles('SCHOOL_ADMIN', 'ACCOUNTANT')
  @ApiOperation({ summary: 'Collect fee payment' })
  collectFee(@Body() dto: CollectFeeDto, @CurrentUser('id') userId: string) {
    return this.feesService.collectFee(dto, userId);
  }

  @Get('student/:studentId')
  @Roles('SCHOOL_ADMIN', 'ACCOUNTANT', 'PARENT', 'STUDENT')
  @ApiOperation({ summary: 'Get student fee details and payment history' })
  @ApiQuery({ name: 'academicYearId', required: true })
  getStudentFees(
    @Param('studentId', ParseUUIDPipe) studentId: string,
    @Query('academicYearId') academicYearId: string,
  ) { return this.feesService.getStudentFeeDetails(studentId, academicYearId); }

  @Get('payments')
  @Roles('SCHOOL_ADMIN', 'ACCOUNTANT')
  @ApiOperation({ summary: 'Get all fee payments' })
  getPayments(
    @Query() pagination: PaginationDto,
    @Query('studentId') studentId?: string,
    @Query('fromDate') fromDate?: string,
    @Query('toDate') toDate?: string,
  ) { return this.feesService.getPayments({ ...pagination, studentId, fromDate, toDate }); }

  @Get('stats')
  @Roles('SCHOOL_ADMIN', 'ACCOUNTANT')
  @ApiOperation({ summary: 'Get fee collection statistics' })
  @ApiQuery({ name: 'academicYearId', required: true })
  getStats(@Query('academicYearId') academicYearId: string) {
    return this.feesService.getDashboardStats(academicYearId);
  }

  @Get('due-reminders') @Roles('SCHOOL_ADMIN', 'ACCOUNTANT') @ApiOperation({ summary: 'Get overdue fee installments' })
  getDueReminders() { return this.feesService.getDueReminders(); }

  // ─── Scholarships ─────────────────────────────────────────────────────────
  @Get('scholarships') @ApiOperation({ summary: 'Get all scholarships' })
  getScholarships() { return this.feesService.getScholarships(); }

  @Post('scholarships') @Roles('SCHOOL_ADMIN') @ApiOperation({ summary: 'Create scholarship' })
  createScholarship(@Body() dto: any) { return this.feesService.createScholarship(dto); }

  @Put('scholarships/:id') @Roles('SCHOOL_ADMIN') @ApiOperation({ summary: 'Update scholarship' })
  updateScholarship(@Param('scholarshipId', ParseUUIDPipe) id: string, @Body() dto: any) { return this.feesService.updateScholarship(id, dto); }

  @Post('scholarships/apply') @Roles('SCHOOL_ADMIN', 'ACCOUNTANT') @ApiOperation({ summary: 'Apply scholarship to student' })
  applyScholarship(@Body() dto: any) { return this.feesService.applyScholarship(dto); }

  @Post('concession') @Roles('SCHOOL_ADMIN', 'ACCOUNTANT') @ApiOperation({ summary: 'Grant fee concession/waiver' })
  grantConcession(@Body() dto: any, @CurrentUser('id') userId: string) { return this.feesService.grantConcession({ ...dto, approvedBy: userId }); }
}
