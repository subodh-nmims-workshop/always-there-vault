/**
 * NestJS Application Module for Decentralized Digital Will Protocol
 * 
 * Zero-Trust Backend - Never sees raw data or keys
 */

import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { ScheduleModule } from '@nestjs/schedule';
import { AuthModule } from '../services/auth/auth.module';
import { AssetsModule } from '../services/assets/assets.module';
import { BeneficiariesModule } from '../services/beneficiaries/beneficiaries.module';
import { HeartbeatModule } from '../services/heartbeat/heartbeat.module';
import { BlockchainModule } from '../services/blockchain/blockchain.module';
import { UsersModule } from '../services/users/users.module';
import { ReleaseModule } from '../services/release/release.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        const uri = 'mongodb://admin:password@127.0.0.1:27017/digital-will?authSource=admin';
        console.log('🔍 MongoDB URI:', uri);
        return { uri };
      },
      inject: [ConfigService],
    }),
    ScheduleModule.forRoot(),
    AuthModule,
    UsersModule,
    AssetsModule,
    BeneficiariesModule,
    HeartbeatModule,
    BlockchainModule,
    ReleaseModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }