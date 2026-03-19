import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SubscriptionController } from './subscription.controller';
import { SubscriptionService } from './subscription.service';
import { PricingService } from './pricing.service';
import { Subscription, SubscriptionSchema } from './subscription.schema';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [
    UsersModule,
  ],
  controllers: [SubscriptionController],
  providers: [SubscriptionService, PricingService],
  exports: [SubscriptionService, PricingService],
})
export class SubscriptionModule {}
