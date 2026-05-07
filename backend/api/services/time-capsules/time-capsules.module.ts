import { Module } from '@nestjs/common';
import { TimeCapsulesService } from './time-capsules.service';
import { TimeCapsulesController } from './time-capsules.controller';
import { TimeCapsuleCronService } from './time-capsule.cron';
import { DatabaseModule } from '../../src/db/database.module';
import { EmailModule } from '../email/email.module';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [DatabaseModule, EmailModule, AuthModule],
  controllers: [TimeCapsulesController],
  providers: [TimeCapsulesService, TimeCapsuleCronService],
})
export class TimeCapsulesModule {}
