"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const config_1 = require("@nestjs/config");
const compression = require("compression");
const helmet_1 = require("helmet");
const app_module_1 = require("./app.module");
const http_exception_filter_1 = require("./common/filters/http-exception.filter");
const transform_interceptor_1 = require("./common/interceptors/transform.interceptor");
const audit_interceptor_1 = require("./common/interceptors/audit.interceptor");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule, {
        logger: ['error', 'warn', 'log', 'debug'],
    });
    const configService = app.get(config_1.ConfigService);
    app.use((0, helmet_1.default)({
        crossOriginResourcePolicy: { policy: 'cross-origin' },
        contentSecurityPolicy: false,
    }));
    app.use(compression());
    app.enableCors({
        origin: configService.get('CORS_ORIGINS', '*').split(','),
        methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
        allowedHeaders: ['Content-Type', 'Authorization', 'x-tenant-id', 'x-refresh-token'],
        credentials: true,
    });
    app.setGlobalPrefix('api');
    app.enableVersioning({ type: common_1.VersioningType.URI, defaultVersion: '1' });
    app.useGlobalPipes(new common_1.ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: false,
        transform: true,
        transformOptions: { enableImplicitConversion: true },
        skipMissingProperties: true,
    }));
    app.useGlobalFilters(new http_exception_filter_1.HttpExceptionFilter());
    app.useGlobalInterceptors(new transform_interceptor_1.TransformInterceptor(), new audit_interceptor_1.AuditInterceptor());
    const swaggerConfig = new swagger_1.DocumentBuilder()
        .setTitle('School ERP + LMS API')
        .setDescription('Enterprise Multi-Tenant School Management System API')
        .setVersion('1.0')
        .addBearerAuth({ type: 'http', scheme: 'bearer', bearerFormat: 'JWT' }, 'access-token')
        .addApiKey({ type: 'apiKey', name: 'x-tenant-id', in: 'header' }, 'tenant-id')
        .addTag('Auth', 'Authentication endpoints')
        .addTag('Super Admin', 'Platform administration')
        .addTag('Schools', 'School management')
        .addTag('Students', 'Student management')
        .addTag('Teachers', 'Teacher management')
        .addTag('Attendance', 'Attendance management')
        .addTag('Fees', 'Fee collection and management')
        .addTag('Examinations', 'Exam scheduling and results')
        .addTag('LMS', 'Learning Management System')
        .addTag('Communication', 'Messaging and notifications')
        .addTag('Transport', 'Transport management')
        .addTag('Hostel', 'Hostel management')
        .addTag('Library', 'Library management')
        .addTag('HR & Payroll', 'Human resources and payroll')
        .addTag('Accounting', 'Financial accounting')
        .addTag('Reports', 'Reports and analytics')
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, swaggerConfig);
    swagger_1.SwaggerModule.setup('api/docs', app, document, {
        swaggerOptions: {
            persistAuthorization: true,
            tagsSorter: 'alpha',
            operationsSorter: 'alpha',
        },
    });
    const port = configService.get('PORT', 4000);
    await app.listen(port, '0.0.0.0');
    console.log(`
  ╔═══════════════════════════════════════════════════╗
  ║       School ERP + LMS Platform Started           ║
  ║  API:     http://localhost:${port}/api/v1             ║
  ║  Docs:    http://localhost:${port}/api/docs           ║
  ║  Health:  http://localhost:${port}/api/v1/health      ║
  ╚═══════════════════════════════════════════════════╝
  `);
}
bootstrap();
//# sourceMappingURL=main.js.map