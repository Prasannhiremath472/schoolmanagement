import { Module } from '@nestjs/common';
import { FeesController } from './fees.controller';
import { FeesService } from './fees.service';
import { PaymentGatewayService } from './payment-gateway.service';
import { PaymentGatewayController } from './payment-gateway.controller';
import { BullModule } from '@nestjs/bull';

@Module({
  imports: [BullModule.registerQueue({ name: 'fee-reminders' })],
  controllers: [FeesController, PaymentGatewayController],
  providers: [FeesService, PaymentGatewayService],
  exports: [FeesService, PaymentGatewayService],
})
export class FeesModule {}
