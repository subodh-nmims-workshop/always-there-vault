import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { eq, sql } from 'drizzle-orm';
import { users } from '../../src/db/schema/users';
import { heartbeatConfigs, type HeartbeatConfig, type NewHeartbeatConfig } from '../../src/db/schema/heartbeat';
import { UsersService } from '../users/users.service';

@Injectable()
export class HeartbeatService {
  constructor(
    @Inject('DRIZZLE_DB') private db: any,
    private usersService: UsersService,
  ) { }

  async recordHeartbeat(walletAddress: string, method: string = 'dashboard'): Promise<any> {
    const user = await this.usersService.findUserByWallet(walletAddress);
    
    // Update config
    await this.db.update(heartbeatConfigs)
      .set({
        lastHeartbeat: new Date(),
        missedCount: 0,
        updatedAt: new Date(),
      })
      .where(eq(heartbeatConfigs.userId, user.id));

    // Update user last active
    await this.usersService.updateLastActive(walletAddress);

    return { success: true };
  }

  async getHeartbeatStatus(walletAddress: string) {
    const user = await this.usersService.findUserByWallet(walletAddress);
    
    const config = await this.db.query.heartbeatConfigs.findFirst({
      where: eq(heartbeatConfigs.userId, user.id),
    });

    if (!config) {
      return { status: 'active', daysUntilDue: 999 }; // Default or unconfigured
    }

    const lastCheck = config.lastHeartbeat || config.createdAt;
    const now = new Date();
    const diffDays = Math.floor((now.getTime() - lastCheck.getTime()) / (1000 * 60 * 60 * 24));
    
    const interval = config.intervalDays;
    const grace = config.gracePeriodDays;

    if (diffDays > interval + grace) {
      return { status: 'overdue', daysUntilDue: interval + grace - diffDays };
    } else if (diffDays > interval) {
      return { status: 'grace_period', daysUntilDue: interval + grace - diffDays };
    } else {
      return { status: 'active', daysUntilDue: interval - diffDays };
    }
  }

  async updateConfig(walletAddress: string, interval: number, grace: number, buffer: number) {
    const user = await this.usersService.findUserByWallet(walletAddress);
    
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
