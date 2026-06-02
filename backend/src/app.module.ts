import { Module, MiddlewareConsumer, NestModule } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ThrottlerModule } from '@nestjs/throttler';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { ScheduleModule } from '@nestjs/schedule';
import { BullModule } from '@nestjs/bull';
import { CacheModule } from '@nestjs/cache-manager';
import { TerminusModule } from '@nestjs/terminus';
import { redisInsStore } from 'cache-manager-ioredis-yet';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { appConfig, databaseConfig, redisConfig, jwtConfig, storageConfig } from './config';
import { TenantMiddleware } from './common/middlewares/tenant.middleware';
import { LoggerMiddleware } from './common/middlewares/logger.middleware';

// Core modules
import { DatabaseModule } from './database/database.module';
import { AuthModule } from './modules/auth/auth.module';
import { TenantModule } from './modules/tenant/tenant.module';
import { StorageModule } from './modules/storage/storage.module';
import { NotificationModule } from './modules/notification/notification.module';

// Super Admin
import { SuperAdminModule } from './modules/super-admin/super-admin.module';
import { SubscriptionModule } from './modules/subscription/subscription.module';

// School Modules
import { SchoolModule } from './modules/school/school.module';
import { StudentModule } from './modules/student/student.module';
import { ParentModule } from './modules/parent/parent.module';
import { TeacherModule } from './modules/teacher/teacher.module';
import { StaffModule } from './modules/staff/staff.module';
import { AcademicModule } from './modules/academic/academic.module';
import { AttendanceModule } from './modules/attendance/attendance.module';
import { FeesModule } from './modules/fees/fees.module';
import { ExaminationModule } from './modules/examination/examination.module';
import { LmsModule } from './modules/lms/lms.module';
import { CommunicationModule } from './modules/communication/communication.module';
import { TransportModule } from './modules/transport/transport.module';
import { HostelModule } from './modules/hostel/hostel.module';
import { LibraryModule } from './modules/library/library.module';
import { HrPayrollModule } from './modules/hr-payroll/hr-payroll.module';
import { AccountingModule } from './modules/accounting/accounting.module';
import { ReportsModule } from './modules/reports/reports.module';
import { AnalyticsModule } from './modules/analytics/analytics.module';

// New modules
import { GatewaysModule } from './gateways/gateways.module';
import { QueuesModule } from './queues/queues.module';
import { ResellerModule } from './modules/reseller/reseller.module';
import { PdfModule } from './modules/pdf/pdf.module';

@Module({
  imports: [
    // Configuration
    ConfigModule.forRoot({
      isGlobal: true,
      load: [appConfig, databaseConfig, redisConfig, jwtConfig, storageConfig],
      envFilePath: ['.env.local', '.env'],
    }),

    // Rate Limiting
    ThrottlerModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ([{
        ttl: config.get('THROTTLE_TTL', 60000),
        limit: config.get('THROTTLE_LIMIT', 100),
      }]),
    }),

    // Redis Cache
    CacheModule.registerAsync({
      isGlobal: true,
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => {
        const store = await redisInsStore({
          host: config.get('REDIS_HOST', 'localhost'),
          port: config.get<number>('REDIS_PORT', 6379),
          password: config.get('REDIS_PASSWORD') || undefined,
        } as any);
        return { store, ttl: 300 };
      },
    }),

    // Bull Queue (Redis-backed)
    BullModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        redis: {
          host: config.get('REDIS_HOST', 'localhost'),
          port: config.get('REDIS_PORT', 6379),
          password: config.get('REDIS_PASSWORD'),
        },
      }),
    }),

    // Event system
    EventEmitterModule.forRoot({ wildcard: true, delimiter: '.' }),

    // Scheduled tasks
    ScheduleModule.forRoot(),

    // Health checks
    TerminusModule,

    // Core
    DatabaseModule,
    AuthModule,
    TenantModule,
    StorageModule,
    NotificationModule,

    // Super Admin
    SuperAdminModule,
    SubscriptionModule,

    // School ERP Modules
    SchoolModule,
    StudentModule,
    ParentModule,
    TeacherModule,
    StaffModule,
    AcademicModule,
    AttendanceModule,
    FeesModule,
    ExaminationModule,
    LmsModule,
    CommunicationModule,
    TransportModule,
    HostelModule,
    LibraryModule,
    HrPayrollModule,
    AccountingModule,
    ReportsModule,
    AnalyticsModule,

    // New infrastructure modules
    GatewaysModule,
    QueuesModule,
    ResellerModule,
    PdfModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware, TenantMiddleware)
      .forRoutes('*');
  }
}
