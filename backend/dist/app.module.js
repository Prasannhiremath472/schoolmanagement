"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const throttler_1 = require("@nestjs/throttler");
const event_emitter_1 = require("@nestjs/event-emitter");
const schedule_1 = require("@nestjs/schedule");
const bull_1 = require("@nestjs/bull");
const cache_manager_1 = require("@nestjs/cache-manager");
const terminus_1 = require("@nestjs/terminus");
const cache_manager_ioredis_yet_1 = require("cache-manager-ioredis-yet");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const config_2 = require("./config");
const tenant_middleware_1 = require("./common/middlewares/tenant.middleware");
const logger_middleware_1 = require("./common/middlewares/logger.middleware");
const database_module_1 = require("./database/database.module");
const auth_module_1 = require("./modules/auth/auth.module");
const tenant_module_1 = require("./modules/tenant/tenant.module");
const storage_module_1 = require("./modules/storage/storage.module");
const notification_module_1 = require("./modules/notification/notification.module");
const super_admin_module_1 = require("./modules/super-admin/super-admin.module");
const subscription_module_1 = require("./modules/subscription/subscription.module");
const school_module_1 = require("./modules/school/school.module");
const student_module_1 = require("./modules/student/student.module");
const parent_module_1 = require("./modules/parent/parent.module");
const teacher_module_1 = require("./modules/teacher/teacher.module");
const staff_module_1 = require("./modules/staff/staff.module");
const academic_module_1 = require("./modules/academic/academic.module");
const attendance_module_1 = require("./modules/attendance/attendance.module");
const fees_module_1 = require("./modules/fees/fees.module");
const examination_module_1 = require("./modules/examination/examination.module");
const lms_module_1 = require("./modules/lms/lms.module");
const communication_module_1 = require("./modules/communication/communication.module");
const transport_module_1 = require("./modules/transport/transport.module");
const hostel_module_1 = require("./modules/hostel/hostel.module");
const library_module_1 = require("./modules/library/library.module");
const hr_payroll_module_1 = require("./modules/hr-payroll/hr-payroll.module");
const accounting_module_1 = require("./modules/accounting/accounting.module");
const reports_module_1 = require("./modules/reports/reports.module");
const analytics_module_1 = require("./modules/analytics/analytics.module");
const gateways_module_1 = require("./gateways/gateways.module");
const queues_module_1 = require("./queues/queues.module");
const reseller_module_1 = require("./modules/reseller/reseller.module");
const pdf_module_1 = require("./modules/pdf/pdf.module");
let AppModule = class AppModule {
    configure(consumer) {
        consumer
            .apply(logger_middleware_1.LoggerMiddleware, tenant_middleware_1.TenantMiddleware)
            .forRoutes('*');
    }
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
                load: [config_2.appConfig, config_2.databaseConfig, config_2.redisConfig, config_2.jwtConfig, config_2.storageConfig],
                envFilePath: ['.env.local', '.env'],
            }),
            throttler_1.ThrottlerModule.forRootAsync({
                inject: [config_1.ConfigService],
                useFactory: (config) => ([{
                        ttl: config.get('THROTTLE_TTL', 60000),
                        limit: config.get('THROTTLE_LIMIT', 100),
                    }]),
            }),
            cache_manager_1.CacheModule.registerAsync({
                isGlobal: true,
                inject: [config_1.ConfigService],
                useFactory: async (config) => {
                    const store = await (0, cache_manager_ioredis_yet_1.redisInsStore)({
                        host: config.get('REDIS_HOST', 'localhost'),
                        port: config.get('REDIS_PORT', 6379),
                        password: config.get('REDIS_PASSWORD') || undefined,
                    });
                    return { store, ttl: 300 };
                },
            }),
            bull_1.BullModule.forRootAsync({
                inject: [config_1.ConfigService],
                useFactory: (config) => ({
                    redis: {
                        host: config.get('REDIS_HOST', 'localhost'),
                        port: config.get('REDIS_PORT', 6379),
                        password: config.get('REDIS_PASSWORD'),
                    },
                }),
            }),
            event_emitter_1.EventEmitterModule.forRoot({ wildcard: true, delimiter: '.' }),
            schedule_1.ScheduleModule.forRoot(),
            terminus_1.TerminusModule,
            database_module_1.DatabaseModule,
            auth_module_1.AuthModule,
            tenant_module_1.TenantModule,
            storage_module_1.StorageModule,
            notification_module_1.NotificationModule,
            super_admin_module_1.SuperAdminModule,
            subscription_module_1.SubscriptionModule,
            school_module_1.SchoolModule,
            student_module_1.StudentModule,
            parent_module_1.ParentModule,
            teacher_module_1.TeacherModule,
            staff_module_1.StaffModule,
            academic_module_1.AcademicModule,
            attendance_module_1.AttendanceModule,
            fees_module_1.FeesModule,
            examination_module_1.ExaminationModule,
            lms_module_1.LmsModule,
            communication_module_1.CommunicationModule,
            transport_module_1.TransportModule,
            hostel_module_1.HostelModule,
            library_module_1.LibraryModule,
            hr_payroll_module_1.HrPayrollModule,
            accounting_module_1.AccountingModule,
            reports_module_1.ReportsModule,
            analytics_module_1.AnalyticsModule,
            gateways_module_1.GatewaysModule,
            queues_module_1.QueuesModule,
            reseller_module_1.ResellerModule,
            pdf_module_1.PdfModule,
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map