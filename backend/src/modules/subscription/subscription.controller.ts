import { Controller, Get, Post, Body, Param, UseGuards, ParseUUIDPipe } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { SubscriptionService } from './subscription.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';

@ApiTags('Subscriptions')
@ApiBearerAuth('access-token')
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller({ path: 'subscriptions', version: '1' })
export class SubscriptionController {
  constructor(private readonly subscriptionService: SubscriptionService) {}
  @Get('plans') @ApiOperation({ summary: 'Get subscription plans' }) getPlans() { return this.subscriptionService.getPlans(); }
  @Get('school/:schoolId') @Roles('SUPER_ADMIN', 'SCHOOL_ADMIN') @ApiOperation({ summary: 'Get school subscription' }) getSubscription(@Param('schoolId', ParseUUIDPipe) schoolId: string) { return this.subscriptionService.getSchoolSubscription(schoolId); }
  @Post() @Roles('SUPER_ADMIN') @ApiOperation({ summary: 'Create subscription' }) createSubscription(@Body() dto: any) { return this.subscriptionService.createSubscription(dto); }
  @Post(':id/payment') @Roles('SUPER_ADMIN') @ApiOperation({ summary: 'Record payment' }) recordPayment(@Param('id', ParseUUIDPipe) id: string, @Body() dto: any) { return this.subscriptionService.recordPayment(id, dto); }
}
