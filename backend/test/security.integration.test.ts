import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../api/app.module';

describe('Backend API (Security Checks)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  describe('CORS & Security Headers', () => {
    it('should have security headers from Helmet', async () => {
      const response = await request(app.getHttpServer()).get('/api/health');
      expect(response.headers['x-dns-prefetch-control']).toBeDefined();
      expect(response.headers['x-frame-options']).toBe('DENY');
    });

    it('should enforce CORS restricted origins if provided', async () => {
      const response = await request(app.getHttpServer())
        .get('/api/health')
        .set('Origin', 'https://malicious-site.com');
      
      // If CORS is strictly configured, it might block or origin won't be as desired
      // Nest CORS can be configured to throw error or just not return Access-Control-Allow-Origin
      expect(response.headers['access-control-allow-origin']).toBeUndefined();
    });
  });

  describe('Rate Limiting', () => {
    it('should have rate limit headers', async () => {
      const response = await request(app.getHttpServer()).get('/api/health');
      expect(response.headers['ratelimit-limit']).toBeDefined();
      expect(response.headers['ratelimit-remaining']).toBeDefined();
    });
  });

  describe('Input Validation', () => {
    it('should reject invalid asset creation (missing fields)', async () => {
      const response = await request(app.getHttpServer())
        .post('/api/assets')
        .send({ name: 'Valid Name but missing other required fields' })
        .query({ walletAddress: '0x1234' });
      
      expect(response.status).toBe(400);
    });
  });
});
