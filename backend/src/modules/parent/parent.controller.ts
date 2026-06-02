import { Controller, Get, Post, Body, Param, Query, UseGuards, ParseUUIDPipe } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { ParentService } from './parent.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { PaginationDto } from '../../common/dto/pagination.dto';

@ApiTags('Parents')
@ApiBearerAuth('access-token')
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller({ path: 'parents', version: '1' })
export class ParentController {
  constructor(private readonly parentService: ParentService) {}
  @Get() @Roles('SCHOOL_ADMIN') @ApiOperation({ summary: 'List parents' }) findAll(@Query() query: PaginationDto) { return this.parentService.findAll(query); }
  @Get(':id') @ApiOperation({ summary: 'Get parent' }) findOne(@Param('id', ParseUUIDPipe) id: string) { return this.parentService.findOne(id); }
  @Post() @Roles('SCHOOL_ADMIN') @ApiOperation({ summary: 'Create parent' }) create(@Body() dto: any) { return this.parentService.create(dto); }
}
