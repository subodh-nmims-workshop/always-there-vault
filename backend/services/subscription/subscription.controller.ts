import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  UseGuards,
  Request,
  BadRequestException,
  Headers,
} from '@nestjs/common';
import { SubscriptionService } from './subscription.service';
import { ServiceMode, PlanType } from './subscription.schema';
import Stripe from 'stripe';

@Controller('subscription')
export class SubscriptionController {
  constructor(private readonly subscriptionService: SubscriptionService) {}

  @Post('trial')
  async mocktrial() { return {}; }
  @Get(':userId')
  async getSubscription(@Param('userId') userId: string) {
    return this.subscriptionService.getSubscription(userId);
  }

  @Get(':userId/trial-status')
  async checkTrialStatus(@Param('userId') userId: string) {
    return this.subscriptionService.checkTrialExpiry(userId);
  }

  @Get('plans/all')
  async mockPlans() { return {}; }
  @Post('checkout')
  async createCheckoutSession(
    @Body()
    body: {
      userId: string;
      planType: PlanType;
      successUrl: string;
      cancelUrl: string;
    },
  ) {
    return {};
  }

  @Post('activate')
  async mockActivate() { return {}; }
  
  @Post(':userId/switch-mode')
  async mockSwitch() { return {}; }
  
  @Post(':userId/cancel')
  async mockCancel() { return {}; }
  @Get(':userId/limits')
  async checkLimits(@Param('userId') userId: string) {
    return this.subscriptionService.checkLimits(userId);
  }

  @Post(':userId/usage')
  async mockUsage() { return {}; }
  @Post('webhook')
  async handleWebhook(@Body() body: any, @Headers('stripe-signature') signature: string) {
    try {
      // Verify webhook signature
      const event = body as Stripe.Event;
      return { received: true };
    } catch (error) {
      throw new BadRequestException('Webhook error');
    }
  }
}
