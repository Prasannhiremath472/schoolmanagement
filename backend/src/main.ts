import { NestFactory } from '@nestjs/core';
import { ValidationPipe, VersioningType } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';
import * as compression from 'compression';
import helmet from 'helmet';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import { TransformInterceptor } from './common/interceptors/transform.interceptor';
import { AuditInterceptor } from './common/interceptors/audit.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['error', 'warn', 'log', 'debug'],
  });

  const configService = app.get(ConfigService);

  // Security
  app.use(helmet({
    crossOriginResourcePolicy: { policy: 'cross-origin' },
    contentSecurityPolicy: false,
  }));
  app.use(compression());

  // CORS
  app.enableCors({
    origin: configService.get('CORS_ORIGINS', '*').split(','),
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'x-tenant-id', 'x-refresh-token'],
    credentials: true,
  });

  // Global prefix and versioning
  app.setGlobalPrefix('api');
  app.enableVersioning({ type: VersioningType.URI, defaultVersion: '1' });

  // Global pipes
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: false,   // allow extra query params (status, sectionId, etc.)
      transform: true,
      transformOptions: { enableImplicitConversion: true },
      skipMissingProperties: true,
    }),
  );

  // Global filters and interceptors
  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalInterceptors(
    new TransformInterceptor(),
    new AuditInterceptor(),
  );

  // Swagger Documentation
  const swaggerConfig = new DocumentBuilder()
    .setTitle('School ERP + LMS API')
    .setDescription('Enterprise Multi-Tenant School Management System API')
    .setVersion('1.0')
    .addBearerAuth(
      { type: 'http', scheme: 'bearer', bearerFormat: 'JWT' },
      'access-token',
    )
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

  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api/docs', app, document, {
    swaggerOptions: {
      persistAuthorization: true,
      tagsSorter: 'alpha',
      operationsSorter: 'alpha',
    },
  });

  const port = configService.get<number>('PORT', 4000);
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
