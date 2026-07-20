import * as Sentry from '@sentry/node';
import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { LoggerService } from '../services/logger/logger.service';
import rateLimit from 'express-rate-limit';
import helmet from 'helmet';
const hpp = require('hpp');
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  // Initialize Sentry before everything else
  Sentry.init({
    dsn: process.env.SENTRY_DSN,
    environment: process.env.NODE_ENV || 'development',
    tracesSampleRate: 1.0,
  });

  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    logger: new LoggerService(),
  });

  // Trust proxy for accurate rate limiting (essential for Ngrok/Cloudflare)
  app.set('trust proxy', 1);

  // Global validation pipe
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  // Global security exception filter
  const { AllExceptionsFilter } = await import('../middleware/all-exceptions.filter');
  app.useGlobalFilters(new AllExceptionsFilter());

  // Security Headers using Helmet for Best-In-Class protection
  app.use(helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'", "'unsafe-inline'"],
        styleSrc: ["'self'", "'unsafe-inline'"],
        imgSrc: ["'self'", "data:", "blob:"],
        connectSrc: ["'self'", "https://api.alwaysthere-protocol.com", "http://localhost:*"],
      },
    },
    xFrameOptions: { action: "deny" },
    referrerPolicy: { policy: "strict-origin-when-cross-origin" },
    dnsPrefetchControl: { allow: false },
    hidePoweredBy: true,
    hsts: {
      maxAge: 31536000,
      includeSubDomains: true,
      preload: true,
    },
  }));

  // Prevent HTTP Parameter Pollution
  app.use(hpp());

  // Extra hardening headers
  app.use((req, res, next) => {
    res.setHeader('Permissions-Policy', 'geolocation=(), microphone=(), camera=()');
    next();
  });

  // CORS with strict origins
  const allowedOrigins = [
    '.vercel.app',
    'https://app.alwaysthere-protocol.com',
    'https://decentralized-digital-will-protocol.vercel.app',
    'https://alwaystherevault.com',
    'https://www.alwaystherevault.com',
    'alwaystherevault.com',
    'www.alwaystherevault.com',
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
      // Allow requests with no origin (like mobile apps or curl)
      if (!origin) {
        return callback(null, true);
      }
      
      const isAllowed = allowedOrigins.some(ao => {
        if (ao === '*') return true;
        try {
          const allowedUrl = new URL(ao);
          const originUrl = new URL(origin);
          return originUrl.hostname === allowedUrl.hostname;
        } catch {
          return origin.includes(ao);
        }
      });

      if (isAllowed) {
        callback(null, true);
      } else {
        console.warn(`CORS blocked request from origin: ${origin}`);
        callback(null, false);
      }
    },
    credentials: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    allowedHeaders: 'Content-Type, Accept, Authorization',
    maxAge: 86400 // 24 hours
  });

  // Prevent Large Payload Attacks (DDoS)
  app.use(require('body-parser').json({ limit: '50mb' }));
  app.use(require('body-parser').urlencoded({ limit: '50mb', extended: true }));

  // Standard Rate limiting
  // Dashboard fires 7-10 parallel API calls on load per user, so general limit is set high.
  // Sensitive endpoints (auth, claim) have their own stricter limiters below.
  const generalLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, 
    max: 500, // 500 per IP per 15 min — accommodates normal dashboard usage
    standardHeaders: true,
    legacyHeaders: false,
    message: { statusCode: 429, message: 'Normal traffic limit exceeded.' },
  });

  const authLimiter = rateLimit({
    windowMs: 60 * 60 * 1000, // 1 hour
    max: 10, // Only 10 login attempts per hour
    message: { statusCode: 429, message: 'Too many authentication attempts. Please try again in an hour.' },
  });

  app.use('/api/auth', authLimiter);
  app.use(generalLimiter);

  // Swagger API Documentation - Disable in Production
  if (process.env.NODE_ENV !== 'production') {
    const config = new DocumentBuilder()
      .setTitle('AlwaysThere Vault API')
      .setDescription('Decentralized AlwaysThere Vault - Backend API Documentation')
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
  }

  const port = process.env.PORT || 7001;
  await app.listen(port);

  const hostUrl = process.env.RENDER_EXTERNAL_URL || `http://localhost:${port}`;
  const rpcUrl = process.env.RPC_URL || process.env.ETHEREUM_RPC_URL || 'http://localhost:8545';

  console.log('');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('🚀 AlwaysThere Vault - Backend Server');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('');
  console.log(`✅ Server running on: ${hostUrl}`);
  console.log(`📚 API Documentation: ${hostUrl}/api/docs`);
  console.log(`🔷 Blockchain RPC: ${rpcUrl}`);
  console.log(`🔶 Backend Port: ${port}`);
  console.log('');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('');
}

bootstrap();
