import { Module } from '@nestjs/common';
import { AttendanceController } from './attendance.controller';
import { AttendanceService } from './attendance.service';
import { BiometricService } from './biometric.service';
import { BiometricController } from './biometric.controller';
import { BullModule } from '@nestjs/bull';

@Module({
  imports: [
    BullModule.registerQueue({ name: 'attendance-notifications' }),
  ],
  controllers: [AttendanceController, BiometricController],
  providers: [AttendanceService, BiometricService],
  exports: [AttendanceService, BiometricService],
})
export class AttendanceModule {}
