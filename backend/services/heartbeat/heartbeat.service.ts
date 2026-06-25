import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { eq, sql } from 'drizzle-orm';
import { users } from '../../src/db/schema/users';
import { subscriptions } from '../../src/db/schema/subscriptions';
import { heartbeatConfigs, type HeartbeatConfig, type NewHeartbeatConfig } from '../../src/db/schema/heartbeat';
import { UsersService } from '../users/users.service';

@Injectable()
export class HeartbeatService {
  constructor(
    @Inject('DRIZZLE_DB') private db: any,
    private usersService: UsersService,
  ) { }

  async recordHeartbeat(walletAddress: string, method: string = 'dashboard'): Promise<any> {
    const user = await this.usersService.createOrUpdateUser(walletAddress);
    
    // Check for premium expiry (Software Lock)
    // Only if user was previously premium. Free users always have 500MB access.
    const sub = await this.db.query.subscriptions.findFirst({
        where: eq(subscriptions.userId, user.id),
    });

    if (sub && sub.status === 'EXPIRED' && new Date() > sub.endDate) {
        throw new Error('SUBSCRIPTION_EXPIRED: Your premium access has expired. Please upgrade to continue using the software.');
    }
    
    // Update config
    await this.db.update(heartbeatConfigs)
      .set({
        lastHeartbeat: new Date(),
        missedCount: 0,
        updatedAt: new Date(),
      })
      .where(eq(heartbeatConfigs.userId, user.id));

    // Update user last active
    // await this.usersService.updateLastActive(walletAddress);

    return { success: true };
  }

  async getHeartbeatStatus(walletAddress: string) {
    const user = await this.usersService.findUserByWallet(walletAddress);
    
    const config = await this.db.query.heartbeatConfigs.findFirst({
      where: eq(heartbeatConfigs.userId, user.id),
    });

    if (!config) {
      return { 
        status: 'active', 
        daysUntilDue: 999, 
        minutesUntilDue: 0,
        interval: 30,
        gracePeriod: 7,
        bufferMisses: 3,
        lastHeartbeat: null
      };
    }

    const lastCheck = config.lastHeartbeat || config.createdAt;
    const now = new Date();
    const isDemo = config.intervalDays < 7;
    const timeUnit = isDemo ? (1000 * 60) : (1000 * 60 * 60 * 24);
    
    const diff = Math.floor((now.getTime() - lastCheck.getTime()) / timeUnit);
    
    const interval = config.intervalDays;
    const grace = config.gracePeriodDays;

    const common = {
      interval,
      gracePeriod: grace,
      bufferMisses: config.bufferMisses,
      lastHeartbeat: config.lastHeartbeat
    };

    if (diff > interval + grace) {
      return { 
        status: 'overdue', 
        daysUntilDue: isDemo ? 0 : interval + grace - diff,
        minutesUntilDue: isDemo ? interval + grace - diff : 0,
        ...common
      };
    } else if (diff > interval) {
      return { 
        status: 'grace_period', 
        daysUntilDue: isDemo ? 0 : interval + grace - diff,
        minutesUntilDue: isDemo ? interval + grace - diff : 0,
        ...common
      };
    } else {
      return { 
        status: 'active', 
        daysUntilDue: isDemo ? 0 : interval - diff,
        minutesUntilDue: isDemo ? interval - diff : 0,
        ...common
      };
    }
  }

  async updateConfig(walletAddress: string, interval: number, grace: number, buffer: number) {
    const user = await this.usersService.createOrUpdateUser(walletAddress);
    
    const [config] = await this.db.insert(heartbeatConfigs).values({
      userId: user.id,
      intervalDays: interval,
      gracePeriodDays: grace,
      bufferMisses: buffer,
    } as NewHeartbeatConfig).onConflictDoUpdate({
      target: [heartbeatConfigs.userId],
      set: {
        intervalDays: interval,
        gracePeriodDays: grace,
        bufferMisses: buffer,
        updatedAt: new Date(),
      },
    }).returning();

    return config;
  }
}
