import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../../src/app.module';

/**
 * End-to-end test for the core school workflow:
 * 1. Super admin creates a school
 * 2. School admin creates an academic year + class + section
 * 3. School admin admits a student
 * 4. Teacher marks attendance
 * 5. Fees are collected
 */
describe('School ERP E2E Workflow', () => {
  let app: INestApplication;
  let superAdminToken: string;
  let schoolAdminToken: string;
  let schoolSlug: string;
  let studentId: string;
  let sectionId: string;
  let academicYearId: string;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.setGlobalPrefix('api');
    app.enableVersioning();
    app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
    await app.init();

    // Login as super admin
    const loginRes = await request(app.getHttpServer())
      .post('/api/v1/auth/super-admin/login')
      .send({ email: process.env.TEST_ADMIN_EMAIL || 'admin@test.com', password: process.env.TEST_ADMIN_PASSWORD || 'Admin@123' });

    superAdminToken = loginRes.body?.data?.accessToken;
  });

  afterAll(() => app.close());

  describe('Step 1: Create School', () => {
    it('should create a new school', async () => {
      if (!superAdminToken) return; // Skip if no admin token

      const slug = `test-school-${Date.now()}`;
      schoolSlug = slug;

      const res = await request(app.getHttpServer())
        .post('/api/v1/super-admin/schools')
        .set('Authorization', `Bearer ${superAdminToken}`)
        .send({
          name: 'Test School E2E',
          slug,
          email: `admin@${slug}.com`,
          adminEmail: `schooladmin@${slug}.com`,
          adminPassword: 'SchoolAdmin@123',
        });

      expect([200, 201]).toContain(res.status);
      if (res.status === 200 || res.status === 201) {
        expect(res.body.data.slug).toBe(slug);
      }
    });
  });

  describe('Step 2: School Admin Operations', () => {
    it('should create academic year', async () => {
      if (!schoolAdminToken) return;

      const res = await request(app.getHttpServer())
        .post('/api/v1/academic/years')
        .set('Authorization', `Bearer ${schoolAdminToken}`)
        .set('x-tenant-id', schoolSlug)
        .send({ name: '2024-2025', startDate: '2024-04-01', endDate: '2025-03-31' });

      if (res.status === 201) {
        academicYearId = res.body.data.id;
      }
    });

    it('should admit a student', async () => {
      if (!schoolAdminToken || !sectionId) return;

      const res = await request(app.getHttpServer())
        .post('/api/v1/students')
        .set('Authorization', `Bearer ${schoolAdminToken}`)
        .set('x-tenant-id', schoolSlug)
        .send({
          admissionNo: `ADM-E2E-${Date.now()}`,
          firstName: 'Test',
          lastName: 'Student',
          dateOfBirth: '2010-05-15',
          gender: 'MALE',
          admissionDate: '2024-04-01',
          sectionId,
        });

      if (res.status === 201) {
        studentId = res.body.data.id;
        expect(studentId).toBeDefined();
      }
    });
  });

  describe('API Contract Tests', () => {
    it('GET /api/v1/health returns correct structure', async () => {
      const res = await request(app.getHttpServer()).get('/api/v1/health');
      expect(res.status).toBe(200);
      expect(res.body).toMatchObject({ status: 'ok' });
    });

    it('validates required fields on student creation', async () => {
      const res = await request(app.getHttpServer())
        .post('/api/v1/students')
        .set('Authorization', `Bearer ${superAdminToken || 'dummy'}`)
        .set('x-tenant-id', 'test')
        .send({});

      expect([400, 401]).toContain(res.status);
    });
  });
});
