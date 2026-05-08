import { Module } from '@nestjs/common';
import { TimeCapsulesService } from './time-capsules.service';
import { TimeCapsulesController } from './time-capsules.controller';
import { TimeCapsuleCronService } from './time-capsule.cron';
import { DrizzleModule } from '../../src/db/drizzle.module';
import { EmailModule } from '../email/email.module';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [DrizzleModule, EmailModule, AuthModule],
  controllers: [TimeCapsulesController],
  providers: [TimeCapsulesService, TimeCapsuleCronService],
})
export class TimeCapsulesModule {}
