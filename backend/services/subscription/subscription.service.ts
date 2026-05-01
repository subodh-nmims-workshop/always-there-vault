import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { eq, and, sql } from 'drizzle-orm';
import { users } from '../../src/db/schema/users';
import { subscriptions, type Subscription, type NewSubscription } from '../../src/db/schema/subscriptions';
import { UsersService } from '../users/users.service';

@Injectable()
export class SubscriptionService {
  constructor(
    @Inject('DRIZZLE_DB') private db: any,
    private usersService: UsersService,
  ) { }

  async createSubscription(userId: string, planId: string, billingCycle: string, price: number): Promise<any> {
    const user = await this.usersService.findUserById(userId);
    if (!user) throw new NotFoundException('User not found');
    
    // Map plan limits (simple for now)
    let storageLimit = 524288000; // 500MB
    if (planId === 'premium_10') storageLimit = 10 * 1024 * 1024 * 1024;
    if (planId === 'pro_100') storageLimit = 100 * 1024 * 1024 * 1024;

    const [sub] = await this.db.insert(subscriptions).values({
      userId: user.id,
      planId,
      planName: planId.toUpperCase(),
      storageLimit,
      billingCycle,
      price: price.toString(),
      startDate: new Date(),
      endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // +30 days
      status: 'ACTIVE',
    } as NewSubscription).onConflictDoUpdate({
      target: [subscriptions.userId],
      set: {
        planId,
        storageLimit,
        billingCycle,
        price: price.toString(),
        endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
        updatedAt: new Date(),
      },
    }).returning();

    // Update user storage quota
    await this.db.update(users)
      .set({ storageQuota: storageLimit })
      .where(eq(users.id, user.id));

    return sub;
  }

  async getSubscription(id: string) {
    try {
      // Check if id is UUID (userId) or walletAddress
      const isUuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(id);
      
      let userId = id;
      if (!isUuid) {
          const lowerAddress = id.toLowerCase();
          const user = await this.usersService.findUserByWallet(lowerAddress);
          if (!user) {
              console.log('GetSubscription: User not found by wallet', lowerAddress);
              return { status: 'ACTIVE', planId: 'free', storageLimit: 524288000, userId: lowerAddress, mode: 'decentralized' };
          }
          userId = user.id;
      }
      console.log('GetSubscription: Fetching for userId', userId);

      const user = await this.db.query.users.findFirst({ where: eq(users.id, userId) });
      const sub = await this.db.query.subscriptions.findFirst({
        where: eq(subscriptions.userId, userId),
      });

      if (!sub) {
          // Auto-create a trial for new users
          const newSub = await this.createSubscription(userId, 'trial', 'MONTHLY', 0);
          return { ...newSub, mode: user?.storageEngine === 'web3' ? 'decentralized' : 'centralized' };
      }
      return { ...sub, mode: user?.storageEngine === 'web3' ? 'decentralized' : 'centralized' };
    } catch (error) {
      console.error('GetSubscription Error:', error);
      return { status: 'ACTIVE', planId: 'free', storageLimit: 524288000, userId: id, mode: 'decentralized' };
    }
  }

  async checkLimits(userId: string) {
    try {
      const sub = await this.getSubscription(userId);
      const user = await this.db.query.users.findFirst({ where: eq(users.id, userId) });
      
      const used = user?.storageUsed || 0;
      const limit = sub.storageLimit || 524288000;

      return {
        canAddAsset: true, // Simplified for now
        canAddBeneficiary: true,
        canUploadCentralized: used < limit,
        canUploadDecentralized: used < limit,
      };
    } catch (error) {
      return {
        canAddAsset: true,
        canAddBeneficiary: true,
        canUploadCentralized: true,
        canUploadDecentralized: true,
      };
    }
  }

  async checkTrialExpiry(userId: string) {
    return { isExpired: false }; // Simplified for now
  }

  async upgradeSubscription(userId: string, planType: string, mode: string): Promise<any> {
    // Map plan limits
    let storageLimit = 524288000; // 500MB
    if (planType === 'professional') storageLimit = 10 * 1024 * 1024 * 1024;
    if (planType === 'enterprise') storageLimit = 100 * 1024 * 1024 * 1024;

    const [sub] = await this.db.insert(subscriptions).values({
      userId,
      planId: planType,
      planName: planType.toUpperCase(),
      storageLimit,
      billingCycle: 'MONTHLY',
      price: '0', // Stripe will manage actual billing
      startDate: new Date(),
      status: 'ACTIVE',
    }).onConflictDoUpdate({
      target: [subscriptions.userId],
      set: {
        planId: planType,
        planName: planType.toUpperCase(),
        storageLimit,
        status: 'ACTIVE',
        updatedAt: new Date(),
      },
    }).returning();

    // Update user storage quota
    await this.db.update(users)
      .set({ storageQuota: storageLimit })
      .where(eq(users.id, userId));

    return sub;
  }

  async cancelSubscription(userId: string): Promise<any> {
    const [sub] = await this.db.update(subscriptions)
      .set({ 
        status: 'CANCELLED',
        updatedAt: new Date() 
      })
      .where(eq(subscriptions.userId, userId))
      .returning();

    // Reset storage quota to free tier?
    await this.db.update(users)
      .set({ storageQuota: 524288000 })
      .where(eq(users.id, userId));

    return sub;
  }
}

export const SubscriptionStatus = {
    ACTIVE: 'ACTIVE',
    EXPIRED: 'EXPIRED',
    CANCELLED: 'CANCELLED',
    TRIAL: 'TRIAL',
};
