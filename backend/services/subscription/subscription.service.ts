import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ConfigService } from '@nestjs/config';
import Stripe from 'stripe';
import {
  Subscription,
  SubscriptionDocument,
  ServiceMode,
  PlanType,
  SubscriptionStatus,
} from './subscription.schema';
import { PLANS, TRIAL_CONFIG } from './plans.config';

@Injectable()
export class SubscriptionService {
  private stripe: Stripe;

  constructor(
    @InjectModel(Subscription.name)
    private subscriptionModel: Model<SubscriptionDocument>,
    private configService: ConfigService,
  ) {
    const stripeKey = this.configService.get<string>('STRIPE_SECRET_KEY');
    if (stripeKey) {
      this.stripe = new Stripe(stripeKey, { apiVersion: '2026-02-25.clover' as any });
    }
  }

  async createTrialSubscription(userId: string, mode: ServiceMode): Promise<SubscriptionDocument> {
    const existingSub = await this.subscriptionModel.findOne({ userId });
    if (existingSub) {
      throw new BadRequestException('User already has a subscription');
    }

    const trialEndsAt = new Date();
    trialEndsAt.setDate(trialEndsAt.getDate() + TRIAL_CONFIG.durationDays);

    const defaultPlan = mode === ServiceMode.CENTRALIZED ? PlanType.STARTER : PlanType.FREEDOM;

    const subscription = new this.subscriptionModel({
      userId,
      mode,
      plan: defaultPlan,
      status: SubscriptionStatus.TRIAL,
      trialEndsAt,
      currentPeriodStart: new Date(),
      currentPeriodEnd: trialEndsAt,
      limits: TRIAL_CONFIG.limits,
      features: TRIAL_CONFIG.features,
      price: 0,
      autoRenew: false,
      canSwitchMode: true,
    });

    return subscription.save();
  }

  async getSubscription(userId: string): Promise<SubscriptionDocument> {
    const subscription = await this.subscriptionModel.findOne({ userId });
    if (!subscription) {
      throw new NotFoundException('Subscription not found');
    }
    return subscription;
  }

  async checkTrialExpiry(userId: string): Promise<{
    isExpired: boolean;
    daysRemaining: number;
    status: SubscriptionStatus;
  }> {
    const subscription: SubscriptionDocument = await this.getSubscription(userId);

    if (subscription.status !== SubscriptionStatus.TRIAL) {
      return {
        isExpired: false,
        daysRemaining: 0,
        status: subscription.status,
      };
    }

    const now = new Date();
    const daysRemaining = Math.ceil(
      (subscription.trialEndsAt.getTime() - now.getTime()) / (1000 * 60 * 60 * 24),
    );

    const isExpired = daysRemaining <= 0;

    if (isExpired && subscription.status === SubscriptionStatus.TRIAL) {
      subscription.status = SubscriptionStatus.EXPIRED;
      await subscription.save();
    }

    return {
      isExpired,
      daysRemaining: Math.max(0, daysRemaining),
      status: subscription.status,
    };
  }

  async createStripeCheckoutSession(
    userId: string,
    planType: PlanType,
    successUrl: string,
    cancelUrl: string,
  ): Promise<{ sessionId: string; url: string }> {
    if (!this.stripe) {
      throw new BadRequestException('Stripe not configured');
    }

    const subscription: SubscriptionDocument = await this.getSubscription(userId);
    const plan = PLANS[planType];

    if (!plan) {
      throw new BadRequestException('Invalid plan');
    }

    // Create or get Stripe customer
    let customerId = subscription.stripeCustomerId;
    if (!customerId) {
      const customer = await this.stripe.customers.create({
        metadata: { userId },
      });
      customerId = customer.id;
      subscription.stripeCustomerId = customerId;
      await subscription.save();
    }

    // Create checkout session
    const session = await this.stripe.checkout.sessions.create({
      customer: customerId,
      mode: 'subscription',
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: `${plan.name} Plan`,
              description: plan.features.join(', '),
            },
            unit_amount: Math.round(plan.price * 100),
            recurring: {
              interval: plan.interval,
            },
          },
          quantity: 1,
        },
      ],
      success_url: successUrl,
      cancel_url: cancelUrl,
      metadata: {
        userId,
        planType,
      },
    });

    return {
      sessionId: session.id,
      url: session.url,
    };
  }

  async activateSubscription(
    userId: string,
    planType: PlanType,
    stripeSubscriptionId?: string,
  ): Promise<SubscriptionDocument> {
    const subscription = await this.getSubscription(userId);
    const plan = PLANS[planType];

    if (!plan) {
      throw new BadRequestException('Invalid plan');
    }

    const now = new Date();
    const periodEnd = new Date();
    periodEnd.setMonth(periodEnd.getMonth() + 1);

    subscription.plan = planType;
    subscription.mode = plan.mode;
    subscription.status = SubscriptionStatus.ACTIVE;
    subscription.currentPeriodStart = now;
    subscription.currentPeriodEnd = periodEnd;
    subscription.limits = plan.limits;
    subscription.features = plan.features;
    subscription.price = plan.price;
    subscription.interval = plan.interval;
    subscription.autoRenew = true;

    if (stripeSubscriptionId) {
      subscription.stripeSubscriptionId = stripeSubscriptionId;
    }

    return subscription.save();
  }

  async upgradeSubscription(userId: string, planType: PlanType, mode: ServiceMode): Promise<SubscriptionDocument> {
    const subscription = await this.getSubscription(userId);
    const plan = PLANS[planType];

    if (!plan) {
      throw new BadRequestException('Invalid plan');
    }

    const now = new Date();
    const periodEnd = new Date();
    periodEnd.setMonth(periodEnd.getMonth() + 1);

    subscription.plan = planType;
    subscription.mode = mode;
    subscription.status = SubscriptionStatus.ACTIVE;
    subscription.currentPeriodStart = now;
    subscription.currentPeriodEnd = periodEnd;
    subscription.limits = plan.limits;
    subscription.features = plan.features;
    subscription.price = plan.price;
    subscription.interval = plan.interval;
    subscription.autoRenew = true;

    return subscription.save();
  }

  async switchMode(userId: string, newMode: ServiceMode): Promise<Subscription> {
    const subscription = await this.getSubscription(userId);

    if (!subscription.canSwitchMode) {
      throw new BadRequestException('Mode switching not allowed');
    }

    if (subscription.status === SubscriptionStatus.EXPIRED) {
      throw new BadRequestException('Cannot switch mode with expired subscription');
    }

    if (subscription.mode === newMode) {
      throw new BadRequestException('Already in this mode');
    }

    // Determine new plan based on current plan tier
    let newPlan: PlanType;
    if (newMode === ServiceMode.CENTRALIZED) {
      // Decentralized -> Centralized
      if (subscription.plan === PlanType.FREEDOM) newPlan = PlanType.STARTER;
      else if (subscription.plan === PlanType.SOVEREIGN) newPlan = PlanType.PROFESSIONAL;
      else newPlan = PlanType.ENTERPRISE;
    } else {
      // Centralized -> Decentralized
      if (subscription.plan === PlanType.STARTER) newPlan = PlanType.FREEDOM;
      else if (subscription.plan === PlanType.PROFESSIONAL) newPlan = PlanType.SOVEREIGN;
      else newPlan = PlanType.IMMORTAL;
    }

    const plan = PLANS[newPlan];
    subscription.mode = newMode;
    subscription.plan = newPlan;
    subscription.limits = plan.limits;
    subscription.features = plan.features;
    subscription.price = plan.price;
    subscription.canSwitchMode = false; // One-time switch

    return subscription.save();
  }

  async cancelSubscription(userId: string, reason?: string): Promise<SubscriptionDocument> {
    const subscription = await this.getSubscription(userId);

    if (subscription.status === SubscriptionStatus.CANCELLED) {
      throw new BadRequestException('Subscription already cancelled');
    }

    if (subscription.stripeSubscriptionId && this.stripe) {
      try {
        await this.stripe.subscriptions.cancel(subscription.stripeSubscriptionId);
      } catch (error) {
        console.error('Failed to cancel Stripe subscription:', error);
      }
    }

    subscription.status = SubscriptionStatus.CANCELLED;
    subscription.cancelledAt = new Date();
    subscription.cancellationReason = reason;
    subscription.autoRenew = false;

    return subscription.save();
  }

  async checkLimits(userId: string): Promise<{
    canAddAsset: boolean;
    canAddBeneficiary: boolean;
    canUploadFile: boolean;
    usage: any;
  }> {
    const subscription = await this.getSubscription(userId);

    if (subscription.status === SubscriptionStatus.EXPIRED) {
      return {
        canAddAsset: false,
        canAddBeneficiary: false,
        canUploadFile: false,
        usage: {
          assets: subscription.assetsCount,
          beneficiaries: subscription.beneficiariesCount,
          storageGB: subscription.storageUsedGB,
        },
      };
    }

    return {
      canAddAsset: subscription.assetsCount < subscription.limits.assets,
      canAddBeneficiary: subscription.beneficiariesCount < subscription.limits.beneficiaries,
      canUploadFile: subscription.storageUsedGB < (subscription.limits.storageGB || 10),
      usage: {
        assets: `${subscription.assetsCount}/${subscription.limits.assets}`,
        beneficiaries: `${subscription.beneficiariesCount}/${subscription.limits.beneficiaries}`,
        storageGB: `${subscription.storageUsedGB}/${subscription.limits.storageGB || 10}`,
      },
    };
  }

  async updateUsage(
    userId: string,
    updates: { assets?: number; beneficiaries?: number; storageGB?: number },
  ): Promise<SubscriptionDocument> {
    const subscription = await this.getSubscription(userId);

    if (updates.assets !== undefined) {
      subscription.assetsCount = updates.assets;
    }
    if (updates.beneficiaries !== undefined) {
      subscription.beneficiariesCount = updates.beneficiaries;
    }
    if (updates.storageGB !== undefined) {
      subscription.storageUsedGB = updates.storageGB;
    }

    return subscription.save();
  }

  async handleStripeWebhook(event: Stripe.Event): Promise<void> {
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session;
        const metadata = session.metadata;
        if (metadata && metadata.userId && metadata.planType) {
          await this.activateSubscription(metadata.userId, metadata.planType as PlanType, session.subscription as string);
        }
        break;
      }

      case 'customer.subscription.updated': {
        const stripeSub = event.data.object as Stripe.Subscription;
        const userId = stripeSub.metadata.userId;
        if (userId) {
          if (stripeSub.status === 'active') {
            // Subscription renewed
          } else if (stripeSub.status === 'past_due') {
            const sub = await this.getSubscription(userId);
            sub.status = SubscriptionStatus.PAST_DUE;
            await sub.save();
          }
        }
        break;
      }

      case 'customer.subscription.deleted': {
        const stripeSub = event.data.object as Stripe.Subscription;
        const userId = stripeSub.metadata.userId;
        if (userId) {
          await this.cancelSubscription(userId, 'Stripe subscription deleted');
        }
        break;
      }
    }
  }

  getAllPlans() {
    return PLANS;
  }

  getTrialConfig() {
    return TRIAL_CONFIG;
  }
}
