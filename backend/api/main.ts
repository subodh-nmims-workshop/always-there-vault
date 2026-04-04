import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { LoggerService } from '../services/logger/logger.service';
import { RateLimitMiddleware } from '../middleware/rate-limit.middleware';
import helmet from 'helmet';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: new LoggerService(null as any),
  });

  // Global validation pipe
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  // Security Headers using Helmet for Best-In-Class protection
  app.use(helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'", "'unsafe-inline'"],
        styleSrc: ["'self'", "'unsafe-inline'"],
        imgSrc: ["'self'", "data:", "blob:"],
        connectSrc: ["'self'", "https://api.deadman-protocol.com", "http://localhost:*"],
      },
    },
    xFrameOptions: { action: "deny" },
    referrerPolicy: { policy: "strict-origin-when-cross-origin" },
  }));

  // Extra hardening headers
  app.use((req, res, next) => {
    res.setHeader('Permissions-Policy', 'geolocation=(), microphone=(), camera=()');
    next();
  });

  // CORS with strict origins
  const allowedOrigins = [
    'https://app.deadman-protocol.com',
    'http://localhost:3000',
    'http://localhost:3001',
    'http://localhost:7000',
    'http://localhost:8081',
    process.env.FRONTEND_URL,
    process.env.MOBILE_URL,
    ...(process.env.CORS_ORIGIN ? process.env.CORS_ORIGIN.split(',').map(o => o.trim()) : []),
  ].filter(Boolean) as string[];

  app.enableCors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.some(ao => origin.includes(ao) || ao === '*')) {
        callback(null, true);
      } else {
        console.warn(`CORS blocked request from origin: ${origin}`);
        callback(new Error('Not allowed by CORS'));
      }
    },
    credentials: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    allowedHeaders: 'Content-Type, Accept, Authorization',
    maxAge: 86400 // 24 hours
  });

  // Rate limiting
  app.use(new RateLimitMiddleware().use.bind(new RateLimitMiddleware()));

  // Swagger API Documentation
  const config = new DocumentBuilder()
    .setTitle('DeadMan Protocol API')
    .setDescription('Decentralized Digital Will Protocol - Backend API Documentation')
    .setVersion('1.0')
    .addTag('auth', 'Authentication endpoints')
    .addTag('users', 'User management')
    .addTag('assets', 'Digital asset management')
    .addTag('beneficiaries', 'Beneficiary management')
    .addTag('heartbeat', 'Heartbeat tracking')
    .addTag('subscription', 'Subscription management')
    .addTag('stripe', 'Payment processing')
    .addTag('email', 'Email notifications')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  const port = process.env.PORT || 7001;
  await app.listen(port);

  console.log('');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('🚀 DeadMan Protocol - Backend Server');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('');
  console.log(`✅ Server running on: http://localhost:${port}`);
  console.log(`📚 API Documentation: http://localhost:${port}/api/docs`);
  console.log(`🔷 Primary Backend (Hardhat): http://localhost:8545`);
  console.log(`🔶 Secondary Backend (NestJS): http://localhost:${port}`);
  console.log('');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('');
}

bootstrap();
