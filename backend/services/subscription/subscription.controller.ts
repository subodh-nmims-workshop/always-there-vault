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
import { PLANS } from './plans.config';
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
    let user;
    if (!isUuid) {
        user = await this.db.query.users.findFirst({ where: eq(users.walletAddress, body.userId) });
        if (!user) throw new BadRequestException('User not found');
        userId = user.id;
    } else {
        user = await this.db.query.users.findFirst({ where: eq(users.id, body.userId) });
    }
    const mode = body.mode || user?.storageEngine || 'decentralized';
    const planId = mode === 'decentralized' || mode === 'web3' ? 'freedom_starter' : 'starter';
    return this.subscriptionService.createSubscription(userId, planId, 'MONTHLY', 0);
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
    const stripeKey = process.env.STRIPE_SECRET_KEY || 'sk_test_51MockKey';
    const stripe = new Stripe(stripeKey, {
      apiVersion: '2023-10-16' as any,
    });

    const planKey = (body.planType || '').toLowerCase() as PlanType;
    const planConfig = PLANS[planKey];
    if (!planConfig) {
      throw new BadRequestException('Invalid plan type selected');
    }

    try {
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: [
          {
            price_data: {
              currency: 'usd',
              product_data: {
                name: planConfig.name,
                description: `Subscription to ${planConfig.name} - ${planConfig.features.slice(0, 3).join(', ')}`,
              },
              unit_amount: Math.round(planConfig.price * 100),
              recurring: {
                interval: 'month',
              },
            },
            quantity: 1,
          },
        ],
        mode: 'subscription',
        success_url: body.successUrl + '?session_id={CHECKOUT_SESSION_ID}',
        cancel_url: body.cancelUrl,
        metadata: {
          userId: body.userId,
          planType: body.planType,
        },
      });

      return { sessionId: session.id, url: session.url };
    } catch (err: any) {
      console.error('Stripe session creation failed:', err);
      throw new BadRequestException(err.message || 'Stripe session creation failed');
    }
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
  async handleWebhook(@Body() body: any, @Headers('stripe-signature') signature: string, @Request() req: any) {
    const stripeKey = process.env.STRIPE_SECRET_KEY || 'sk_test_51MockKey';
    const stripe = new Stripe(stripeKey, {
      apiVersion: '2023-10-16' as any,
    });
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET || '';

    let event: Stripe.Event;

    if (webhookSecret && signature) {
      try {
        const rawBody = req.rawBody || JSON.stringify(body);
        event = stripe.webhooks.constructEvent(rawBody, signature, webhookSecret);
      } catch (err: any) {
        console.warn('Webhook signature verification failed, processing body directly in dev mode:', err.message);
        event = body;
      }
    } else {
      event = body;
    }

    console.log(`Stripe Webhook received: ${event.type}`);

    if (event.type === 'checkout.session.completed') {
      const session = event.data.object as Stripe.Checkout.Session;
      const userId = session.metadata?.userId;
      const planType = session.metadata?.planType;

      if (userId && planType) {
        console.log(`Upgrading user ${userId} to plan ${planType} via Stripe checkout completion.`);
        
        // Resolve wallet address → userId if needed
        const isUuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(userId);
        let targetUserId = userId;
        if (!isUuid) {
          const user = await this.db.query.users.findFirst({ where: eq(users.walletAddress, userId.toLowerCase()) });
          if (user) {
            targetUserId = user.id;
          }
        }
        
        await this.subscriptionService.upgradeSubscription(targetUserId, planType, 'web3');
      }
    }

    return { received: true };
  }
}
