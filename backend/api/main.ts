import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { LoggerService } from '../services/logger/logger.service';
import { RateLimitMiddleware } from '../middleware/rate-limit.middleware';

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

  // CORS
  app.enableCors({
    origin: (origin, callback) => callback(null, true),
    credentials: true,
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
