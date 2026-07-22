/**
 * NestJS Application Module for Decentralized AlwaysThere Vault
 * 
 * Zero-Trust Backend - Never sees raw data or keys
 */

import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { ThrottlerModule, ThrottlerGuard } from '@nestjs/throttler';
import { HoneypotMiddleware } from '../middleware/honeypot.middleware';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';
import { PrometheusModule } from '@willsoto/nestjs-prometheus';
import { AuthModule } from '../services/auth/auth.module';
import { AssetsModule } from '../services/assets/assets.module';
import { BeneficiariesModule } from '../services/beneficiaries/beneficiaries.module';
import { HeartbeatModule } from '../services/heartbeat/heartbeat.module';
import { BlockchainModule } from '../services/blockchain/blockchain.module';
import { UsersModule } from '../services/users/users.module';
import { ReleaseModule } from '../services/release/release.module';
import { SubscriptionModule } from '../services/subscription/subscription.module';
import { EmailModule } from '../services/email/email.module';
import { CacheModule } from '../services/cache/cache.module';
import { LoggerModule } from '../services/logger/logger.module';
import { DrizzleModule } from '../src/db/drizzle.module';
import { CryptoModule } from '../services/crypto/crypto.module';
import { AuditModule } from '../services/audit/audit.module';
import { PaymentModule } from '../services/payment/payment.module';
import { AppController } from './app.controller';
import { HealthController } from './health.controller';
import { TimeCapsulesModule } from '../services/time-capsules/time-capsules.module';
import { NotificationsModule } from '../services/notifications/notifications.module';

@Module({
  imports: [
    DrizzleModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    // ─── Rate Limiting (Global) ───────────────────────────────────────
    // Authenticated dashboard users fire 7-10 parallel calls on load.
    // Keep strict limits only on sensitive endpoints via @Throttle() decorators.
    ThrottlerModule.forRoot([{
      name: 'default',
      ttl: 60000,   // 1 minute window
      limit: 500,   // 500 requests per IP per minute
    }, {
      name: 'strict',
      ttl: 60000,
      limit: 60,    // 60 requests per minute for auth/MFA retries
    }]),
    ScheduleModule.forRoot(),
    PrometheusModule.register(),
    LoggerModule,
    CacheModule,
    AuthModule,
    UsersModule,
    AssetsModule,
    BeneficiariesModule,
    HeartbeatModule,
    BlockchainModule,
    ReleaseModule,
    SubscriptionModule,
    EmailModule,
    CryptoModule,
    AuditModule,
    PaymentModule,
    TimeCapsulesModule,
    NotificationsModule,
  ],
  controllers: [AppController, HealthController],
  providers: [
    // Apply rate limiting globally to all routes
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(HoneypotMiddleware)
      .forRoutes('*');
  }
}