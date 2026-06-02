"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.QueuesModule = void 0;
const common_1 = require("@nestjs/common");
const bull_1 = require("@nestjs/bull");
const attendance_notifications_processor_1 = require("./attendance-notifications.processor");
const fee_reminders_processor_1 = require("./fee-reminders.processor");
const report_cards_processor_1 = require("./report-cards.processor");
const gateways_module_1 = require("../gateways/gateways.module");
const notification_module_1 = require("../modules/notification/notification.module");
const storage_module_1 = require("../modules/storage/storage.module");
const pdf_module_1 = require("../modules/pdf/pdf.module");
let QueuesModule = class QueuesModule {
};
exports.QueuesModule = QueuesModule;
exports.QueuesModule = QueuesModule = __decorate([
    (0, common_1.Module)({
        imports: [
            bull_1.BullModule.registerQueue({ name: 'attendance-notifications' }, { name: 'fee-reminders' }, { name: 'report-cards' }),
            gateways_module_1.GatewaysModule,
            notification_module_1.NotificationModule,
            storage_module_1.StorageModule,
            pdf_module_1.PdfModule,
        ],
        providers: [
            attendance_notifications_processor_1.AttendanceNotificationsProcessor,
            fee_reminders_processor_1.FeeRemindersProcessor,
            report_cards_processor_1.ReportCardsProcessor,
        ],
        exports: [
            attendance_notifications_processor_1.AttendanceNotificationsProcessor,
            fee_reminders_processor_1.FeeRemindersProcessor,
            report_cards_processor_1.ReportCardsProcessor,
        ],
    })
], QueuesModule);
//# sourceMappingURL=queues.module.js.map