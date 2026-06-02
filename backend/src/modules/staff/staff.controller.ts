import { Controller, Get, Post, Put, Body, Param, Query, UseGuards, ParseUUIDPipe } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { StaffService } from './staff.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { PaginationDto } from '../../common/dto/pagination.dto';

@ApiTags('Staff')
@ApiBearerAuth('access-token')
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller({ path: 'staff', version: '1' })
export class StaffController {
  constructor(private readonly staffService: StaffService) {}
  @Get() @ApiOperation({ summary: 'List staff' }) findAll(@Query() q: PaginationDto) { return this.staffService.findAll(q); }
  @Get(':id') @ApiOperation({ summary: 'Get staff' }) findOne(@Param('id', ParseUUIDPipe) id: string) { return this.staffService.findOne(id); }
  @Post() @Roles('SCHOOL_ADMIN') @ApiOperation({ summary: 'Create staff' }) create(@Body() dto: any) { return this.staffService.create(dto); }
  @Put(':id') @Roles('SCHOOL_ADMIN') @ApiOperation({ summary: 'Update staff' }) update(@Param('id', ParseUUIDPipe) id: string, @Body() dto: any) { return this.staffService.update(id, dto); }
}
