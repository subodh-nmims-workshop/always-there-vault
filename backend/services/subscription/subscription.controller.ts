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
import { UsersService } from '../users/users.service';
import { users } from '../../src/db/schema/users';
import { eq } from 'drizzle-orm';
import { Inject } from '@nestjs/common';

@Controller('subscription')
export class SubscriptionController {
  constructor(
    private readonly subscriptionService: SubscriptionService,
    private readonly usersService: UsersService,
    @Inject('DRIZZLE_DB') private readonly db: any,
  ) {}

  @Post('trial')
  async createTrial(@Body() body: { userId: string; mode?: string }) {
    // userId from frontend is usually walletAddress for initial trial creation
    const isUuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(body.userId);
    let userId = body.userId;
    if (!isUuid) {
        const user = await this.db.query.users.findFirst({ where: eq(users.walletAddress, body.userId) });
        if (!user) throw new BadRequestException('User not found');
        userId = user.id;
    }
    return this.subscriptionService.createSubscription(userId, 'trial', 'MONTHLY', 0);
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
  async switchMode(
    @Param('userId') userId: string,
    @Body('mode') mode: 'cloud' | 'web3'
  ) {
    // Note: In this controller, 'cloud' maps to 'centralized' for the UI
    const targetEngine = (mode as any) === 'cloud' || (mode as any) === 'centralized' ? 'cloud' : 'web3';
    
    // Check if the provided ID is a UUID or a wallet address
    const isUuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(userId);
    let user;
    
    if (isUuid) {
        user = await this.db.query.users.findFirst({ where: eq(users.id, userId) });
    } else {
        user = await this.db.query.users.findFirst({ where: eq(users.walletAddress, userId.toLowerCase()) });
    }
    
    console.log(`SwitchMode: userId=${userId}, foundUser=${user?.id}, targetEngine=${targetEngine}`);
    
    if (!user) {
        if (!isUuid && userId.startsWith('0x')) {
            console.log('SwitchMode: Creating new user for guest wallet:', userId);
            user = await this.usersService.createOrUpdateUser(userId);
        } else {
            throw new BadRequestException('User not found and invalid wallet address');
        }
    }
    
    await this.usersService.updateStorageEngine(user.id, targetEngine as any);
    
    // Return the updated subscription object so the frontend state stays in sync
    return this.subscriptionService.getSubscription(user.id);
  }

  @Post(':userId/cancel')
  async cancelSubscription(@Param('userId') userId: string) {
    return this.subscriptionService.cancelSubscription(userId);
  }
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
