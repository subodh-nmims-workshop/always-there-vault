import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { HeartbeatController } from './heartbeat.controller';
import { HeartbeatService } from './heartbeat.service';
import { HeartbeatLog, HeartbeatLogSchema } from './schemas/heartbeat.schema';
import { HeartbeatCronService } from './heartbeat.cron';
import { UsersModule } from '../users/users.module';
import { BlockchainModule } from '../blockchain/blockchain.module';
import { EmailModule } from '../email/email.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: HeartbeatLog.name, schema: HeartbeatLogSchema }]),
    UsersModule,
    BlockchainModule,
    EmailModule
  ],
  controllers: [HeartbeatController],
  providers: [HeartbeatService, HeartbeatCronService],
  exports: [HeartbeatService],
})
export class HeartbeatModule { }
