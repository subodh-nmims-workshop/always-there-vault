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

  async createSubscription(walletAddress: string, planId: string, billingCycle: string, price: number): Promise<any> {
    const user = await this.usersService.findUserByWallet(walletAddress);
    
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
    // Check if id is UUID (userId) or walletAddress
    const isUuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(id);
    
    let userId = id;
    if (!isUuid) {
        const user = await this.usersService.findUserByWallet(id);
        userId = user.id;
    }

    const sub = await this.db.query.subscriptions.findFirst({
      where: eq(subscriptions.userId, userId),
    });

    if (!sub) return { status: 'ACTIVE', planId: 'free', storageLimit: 524288000 };
    return sub;
  }

  async checkLimits(userId: string) {
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
  }

  async checkTrialExpiry(userId: string) {
    return { isExpired: false }; // Simplified for now
  }
}

export const SubscriptionStatus = {
    ACTIVE: 'ACTIVE',
    EXPIRED: 'EXPIRED',
    CANCELLED: 'CANCELLED',
    TRIAL: 'TRIAL',
};
