import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../../src/app.module';

describe('Auth API (Integration)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.setGlobalPrefix('api');
    app.enableVersioning();
    app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  describe('POST /api/v1/auth/super-admin/login', () => {
    it('should return 400 for missing credentials', async () => {
      return request(app.getHttpServer())
        .post('/api/v1/auth/super-admin/login')
        .send({})
        .expect(400);
    });

    it('should return 401 for invalid credentials', async () => {
      return request(app.getHttpServer())
        .post('/api/v1/auth/super-admin/login')
        .send({ email: 'wrong@email.com', password: 'wrongpassword' })
        .expect(401);
    });
  });

  describe('GET /api/v1/health', () => {
    it('should return health status', async () => {
      return request(app.getHttpServer())
        .get('/api/v1/health')
        .expect(200)
        .expect((res) => {
          expect(res.body.status).toBe('ok');
        });
    });
  });

  describe('Protected routes', () => {
    it('should return 401 without auth token', async () => {
      return request(app.getHttpServer())
        .get('/api/v1/students')
        .expect(401);
    });

    it('should return 401 with invalid token', async () => {
      return request(app.getHttpServer())
        .get('/api/v1/students')
        .set('Authorization', 'Bearer invalid.token.here')
        .expect(401);
    });
  });
});
