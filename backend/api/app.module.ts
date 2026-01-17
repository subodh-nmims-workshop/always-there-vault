/**
 * NestJS Application Module for Decentralized Digital Will Protocol
 * 
 * Zero-Trust Backend - Never sees raw data or keys
 */

import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AssetsModule } from '../services/assets/assets.module';
import { BeneficiariesModule } from '../services/beneficiaries/beneficiaries.module';
import { HeartbeatModule } from '../services/heartbeat/heartbeat.module';
import { BlockchainModule } from '../services/blockchain/blockchain.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    AssetsModule,
    BeneficiariesModule,
    HeartbeatModule,
    BlockchainModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}