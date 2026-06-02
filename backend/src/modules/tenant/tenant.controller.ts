import { Controller, Get, Param } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { TenantService } from './tenant.service';

@ApiTags('Tenant')
@Controller({ path: 'tenant', version: '1' })
export class TenantController {
  constructor(private readonly tenantService: TenantService) {}
  @Get(':slug/branding') @ApiOperation({ summary: 'Get school branding config' })
  getBranding(@Param('slug') slug: string) { return this.tenantService.getTenantBranding(slug); }
}
