import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { eq, and, sql, count, sum } from 'drizzle-orm';
import { users } from '../../src/db/schema/users';
import { subscriptions, type Subscription, type NewSubscription } from '../../src/db/schema/subscriptions';
import { files } from '../../src/db/schema/files';
import { beneficiaries } from '../../src/db/schema/beneficiaries';
import { UsersService } from '../users/users.service';
import { PLANS } from './plans.config';
import { PlanType } from './subscription.schema';

@Injectable()
export class SubscriptionService {
  constructor(
    @Inject('DRIZZLE_DB') private db: any,
    private usersService: UsersService,
  ) { }

  async createSubscription(userId: string, planId: string, billingCycle: string, price: number): Promise<any> {
    const user = await this.usersService.findUserById(userId);
    if (!user) throw new NotFoundException('User not found');
    
    // Resolve plan config dynamically
    const planKey = (planId || '').toLowerCase() as PlanType;
    const planConfig = PLANS[planKey] || PLANS[PlanType.STARTER];
    
    const isDecentralized = planConfig.mode === 'decentralized';
    const storageLimitMB = isDecentralized 
      ? planConfig.limits.decentralizedStorageMB 
      : planConfig.limits.centralizedStorageMB;
      
    // Handle Infinity storage
    const storageLimit = storageLimitMB === Infinity 
      ? 1024 * 1024 * 1024 * 1024 * 10 // 10 TB default for unlimited
      : storageLimitMB * 1024 * 1024;

    const [sub] = await this.db.insert(subscriptions).values({
      userId: user.id,
      planId,
      planName: planConfig.name,
      storageLimit,
      billingCycle: (billingCycle || 'MONTHLY').toUpperCase(),
      price: price.toString(),
      startDate: new Date(),
      endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // +30 days
      status: 'ACTIVE',
    } as NewSubscription).onConflictDoUpdate({
      target: [subscriptions.userId],
      set: {
        planId,
        planName: planConfig.name,
        storageLimit,
        billingCycle: (billingCycle || 'MONTHLY').toUpperCase(),
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
      // Resolve wallet address → userId
      const isUuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(id);
      let userId = id;

      if (!isUuid) {
        const lowerAddress = id.toLowerCase();
        const user = await this.usersService.findUserByWallet(lowerAddress);
        if (!user) {
          console.log('GetSubscription: User not found by wallet', lowerAddress);
          return {
            status: 'ACTIVE', planId: 'freedom_starter', storageLimit: 500 * 1024 * 1024,
            userId: lowerAddress, mode: 'decentralized',
            storageUsed: 0, assetsCount: 0, beneficiariesCount: 0,
          };
        }
        userId = user.id;
      }
      console.log('GetSubscription: Fetching for userId', userId);

      const user = await this.db.query.users.findFirst({ where: eq(users.id, userId) });
      const sub = await this.db.query.subscriptions.findFirst({
        where: eq(subscriptions.userId, userId),
      });

      // Fetch live counts from DB
      const [assetCountRow] = await this.db
        .select({ count: count() })
        .from(files)
        .where(eq(files.userId, userId));

      const [storageSumRow] = await this.db
        .select({ total: sum(files.size) })
        .from(files)
        .where(eq(files.userId, userId));

      const [beneficiaryCountRow] = await this.db
        .select({ count: count() })
        .from(beneficiaries)
        .where(eq(beneficiaries.userId, userId));

      const assetsCount = Number(assetCountRow?.count || 0);
      const storageUsed = Number(storageSumRow?.total || user?.storageUsed || 0);
      const beneficiariesCount = Number(beneficiaryCountRow?.count || 0);

      const mode = user?.storageEngine === 'web3' ? 'decentralized' : 'centralized';

      if (!sub) {
        const planId = mode === 'decentralized' ? 'freedom_starter' : 'starter';
        const newSub = await this.createSubscription(userId, planId, 'MONTHLY', 0);
        return { ...newSub, mode, assetsCount, storageUsed, beneficiariesCount };
      }

      // If the database has an expired starter plan, override status to ACTIVE since they are lifetime free
      const isStarter = sub.planId === 'freedom_starter' || sub.planId === 'starter';
      if (isStarter && sub.status === 'EXPIRED') {
        sub.status = 'ACTIVE';
      }

      return { ...sub, mode, assetsCount, storageUsed, beneficiariesCount };
    } catch (error) {
      console.error('GetSubscription Error:', error);
      return {
        status: 'ACTIVE', planId: 'freedom_starter', storageLimit: 500 * 1024 * 1024,
        userId: id, mode: 'decentralized',
        storageUsed: 0, assetsCount: 0, beneficiariesCount: 0,
      };
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
    // Resolve plan config dynamically
    const planKey = (planType || '').toLowerCase() as PlanType;
    const planConfig = PLANS[planKey] || PLANS[PlanType.STARTER];
    
    const isDecentralized = planConfig.mode === 'decentralized';
    const storageLimitMB = isDecentralized 
      ? planConfig.limits.decentralizedStorageMB 
      : planConfig.limits.centralizedStorageMB;
      
    // Handle Infinity storage
    const storageLimit = storageLimitMB === Infinity 
      ? 1024 * 1024 * 1024 * 1024 * 10 // 10 TB default for unlimited
      : storageLimitMB * 1024 * 1024;

    const [sub] = await this.db.insert(subscriptions).values({
      userId,
      planId: planType,
      planName: planConfig.name,
      storageLimit,
      billingCycle: 'MONTHLY',
      price: planConfig.price.toString(),
      startDate: new Date(),
      status: 'ACTIVE',
    }).onConflictDoUpdate({
      target: [subscriptions.userId],
      set: {
        planId: planType,
        planName: planConfig.name,
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

    // Reset storage quota to starter free tier
    const starterConfig = PLANS[PlanType.STARTER];
    const starterLimit = (starterConfig?.limits.centralizedStorageMB || 500) * 1024 * 1024;

    await this.db.update(users)
      .set({ storageQuota: starterLimit })
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
