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
  async startTrial(@Body() body: { userId: string; mode: ServiceMode }) {
    return this.subscriptionService.createTrialSubscription(body.userId, body.mode);
  }

  @Get(':userId')
  async getSubscription(@Param('userId') userId: string) {
    return this.subscriptionService.getSubscription(userId);
  }

  @Get(':userId/trial-status')
  async checkTrialStatus(@Param('userId') userId: string) {
    return this.subscriptionService.checkTrialExpiry(userId);
  }

  @Get('plans/all')
  async getAllPlans() {
    return {
      plans: this.subscriptionService.getAllPlans(),
      trial: this.subscriptionService.getTrialConfig(),
    };
  }

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
    return this.subscriptionService.createStripeCheckoutSession(
      body.userId,
      body.planType,
      body.successUrl,
      body.cancelUrl,
    );
  }

  @Post('activate')
  async activateSubscription(
    @Body()
    body: {
      userId: string;
      planType: PlanType;
      stripeSubscriptionId?: string;
    },
  ) {
    return this.subscriptionService.activateSubscription(
      body.userId,
      body.planType,
      body.stripeSubscriptionId,
    );
  }

  @Post(':userId/switch-mode')
  async switchMode(@Param('userId') userId: string, @Body() body: { mode: ServiceMode }) {
    return this.subscriptionService.switchMode(userId, body.mode);
  }

  @Post(':userId/cancel')
  async cancelSubscription(@Param('userId') userId: string, @Body() body: { reason?: string }) {
    return this.subscriptionService.cancelSubscription(userId, body.reason);
  }

  @Get(':userId/limits')
  async checkLimits(@Param('userId') userId: string) {
    return this.subscriptionService.checkLimits(userId);
  }

  @Post(':userId/usage')
  async updateUsage(
    @Param('userId') userId: string,
    @Body() body: { assets?: number; beneficiaries?: number; storageGB?: number },
  ) {
    return this.subscriptionService.updateUsage(userId, body);
  }

  @Post('webhook')
  async handleWebhook(@Body() body: any, @Headers('stripe-signature') signature: string) {
    try {
      // Verify webhook signature
      const event = body as Stripe.Event;
      await this.subscriptionService.handleStripeWebhook(event);
      return { received: true };
    } catch (error) {
      throw new BadRequestException('Webhook error');
    }
  }
}
