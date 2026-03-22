/**
 * NestJS Application Module for Decentralized Digital Will Protocol
 * 
 * Zero-Trust Backend - Never sees raw data or keys
 */

import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
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
import { StripeModule } from '../services/stripe/stripe.module';
import { EmailModule } from '../services/email/email.module';
import { CacheModule } from '../services/cache/cache.module';
import { LoggerModule } from '../services/logger/logger.module';
import { DrizzleModule } from '../src/db/drizzle.module';
import { CryptoModule } from '../services/crypto/crypto.module';

@Module({
  imports: [
    DrizzleModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        const uri = 'mongodb://admin:password@mongodb:27017/digital-will?authSource=admin';
        console.log('🔍 MongoDB URI:', uri);
        return { uri };
      },
      inject: [ConfigService],
    }),
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
    StripeModule,
    EmailModule,
    CryptoModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }