import {
  Controller, Get, Post, Put, Patch, Delete, Body, Param, Query,
  UseGuards, ParseUUIDPipe,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { ResellerService } from './reseller.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { PaginationDto } from '../../common/dto/pagination.dto';

@ApiTags('Resellers')
@ApiBearerAuth('access-token')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('SUPER_ADMIN', 'ADMIN')
@Controller({ path: 'resellers', version: '1' })
export class ResellerController {
  constructor(private readonly resellerService: ResellerService) {}

  @Get() @ApiOperation({ summary: 'List all resellers' })
  findAll(@Query() query: PaginationDto) { return this.resellerService.findAll(query); }

  @Get(':id') @ApiOperation({ summary: 'Get reseller details' })
  findOne(@Param('id', ParseUUIDPipe) id: string) { return this.resellerService.findOne(id); }

  @Post() @ApiOperation({ summary: 'Create reseller' })
  create(@Body() dto: any) { return this.resellerService.create(dto); }

  @Put(':id') @ApiOperation({ summary: 'Update reseller' })
  update(@Param('id', ParseUUIDPipe) id: string, @Body() dto: any) { return this.resellerService.update(id, dto); }

  @Delete(':id') @ApiOperation({ summary: 'Delete reseller' })
  delete(@Param('id', ParseUUIDPipe) id: string) { return this.resellerService.delete(id); }

  @Get(':id/commissions') @ApiOperation({ summary: 'Get reseller commissions' })
  getCommissions(@Param('id', ParseUUIDPipe) id: string, @Query() query: PaginationDto) {
    return this.resellerService.getCommissions(id, query);
  }

  @Get(':id/stats') @ApiOperation({ summary: 'Get reseller revenue stats' })
  getStats(@Param('id', ParseUUIDPipe) id: string) { return this.resellerService.getRevenueStats(id); }

  @Patch(':id/assign-school/:schoolId') @ApiOperation({ summary: 'Assign school to reseller' })
  assignSchool(@Param('id', ParseUUIDPipe) id: string, @Param('schoolId', ParseUUIDPipe) schoolId: string) {
    return this.resellerService.assignSchool(id, schoolId);
  }

  @Patch('commissions/:commissionId/pay') @ApiOperation({ summary: 'Mark commission as paid' })
  markPaid(@Param('commissionId', ParseUUIDPipe) id: string) { return this.resellerService.markCommissionPaid(id); }
}
