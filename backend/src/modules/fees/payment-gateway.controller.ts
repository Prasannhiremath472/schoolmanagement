import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { PaymentGatewayService } from './payment-gateway.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { CurrentUser } from '../auth/decorators/current-user.decorator';

@ApiTags('Fees')
@ApiBearerAuth('access-token')
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller({ path: 'fees/payment', version: '1' })
export class PaymentGatewayController {
  constructor(private readonly paymentGatewayService: PaymentGatewayService) {}

  @Post('razorpay/create-order')
  @Roles('SCHOOL_ADMIN', 'ACCOUNTANT', 'PARENT', 'STUDENT')
  @ApiOperation({ summary: 'Create Razorpay order to initiate fee payment' })
  createRazorpayOrder(@Body() dto: { studentId: string; installmentId: string; amount: number; currency?: string }) {
    return this.paymentGatewayService.createRazorpayOrder(dto);
  }

  @Post('razorpay/verify')
  @Roles('SCHOOL_ADMIN', 'ACCOUNTANT', 'PARENT', 'STUDENT')
  @ApiOperation({ summary: 'Verify Razorpay payment signature and record payment' })
  verifyRazorpay(
    @Body() dto: { razorpayOrderId: string; razorpayPaymentId: string; razorpaySignature: string; studentId: string; installmentId: string; amount: number },
    @CurrentUser('id') userId: string,
  ) {
    return this.paymentGatewayService.verifyAndRecordRazorpayPayment({ ...dto, collectedBy: userId });
  }

  @Post('stripe/create-intent')
  @Roles('SCHOOL_ADMIN', 'ACCOUNTANT', 'PARENT', 'STUDENT')
  @ApiOperation({ summary: 'Create Stripe PaymentIntent for fee payment' })
  createStripeIntent(@Body() dto: { studentId: string; installmentId: string; amount: number; currency?: string }) {
    return this.paymentGatewayService.createStripePaymentIntent(dto);
  }

  @Post('stripe/confirm')
  @Roles('SCHOOL_ADMIN', 'ACCOUNTANT', 'PARENT', 'STUDENT')
  @ApiOperation({ summary: 'Confirm Stripe payment and record it' })
  confirmStripe(@Body() dto: { paymentIntentId: string; studentId: string; installmentId: string; amount: number }, @CurrentUser('id') userId: string) {
    return this.paymentGatewayService.confirmStripePayment({ ...dto, collectedBy: userId });
  }

  @Post('razorpay/payment-link')
  @Roles('SCHOOL_ADMIN', 'ACCOUNTANT')
  @ApiOperation({ summary: 'Create shareable Razorpay payment link (for SMS/WhatsApp)' })
  createPaymentLink(@Body() dto: { studentId: string; installmentId: string; amount: number; studentName: string; description?: string; expiryMinutes?: number }) {
    return this.paymentGatewayService.createPaymentLink(dto);
  }
}
