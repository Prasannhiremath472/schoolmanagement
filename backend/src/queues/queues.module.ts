import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bull';
import { AttendanceNotificationsProcessor } from './attendance-notifications.processor';
import { FeeRemindersProcessor } from './fee-reminders.processor';
import { ReportCardsProcessor } from './report-cards.processor';
import { GatewaysModule } from '../gateways/gateways.module';
import { NotificationModule } from '../modules/notification/notification.module';
import { StorageModule } from '../modules/storage/storage.module';
import { PdfModule } from '../modules/pdf/pdf.module';

@Module({
  imports: [
    BullModule.registerQueue(
      { name: 'attendance-notifications' },
      { name: 'fee-reminders' },
      { name: 'report-cards' },
    ),
    GatewaysModule,
    NotificationModule,
    StorageModule,
    PdfModule,
  ],
  providers: [
    AttendanceNotificationsProcessor,
    FeeRemindersProcessor,
    ReportCardsProcessor,
  ],
  exports: [
    AttendanceNotificationsProcessor,
    FeeRemindersProcessor,
    ReportCardsProcessor,
  ],
})
export class QueuesModule {}
