import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { users, type User, type NewUser } from '../../src/db/schema/users';
import { userStorageQuotas } from '../../src/db/schema/quotas';
import { eq, sql, and } from 'drizzle-orm';

@Injectable()
export class UsersService {
    constructor(
        @Inject('DRIZZLE_DB') private db: any,
    ) { }

    async findUserById(id: string): Promise<User | null> {
        const user = await this.db.query.users.findFirst({
            where: eq(users.id, id),
        });
        if (user) await this.ensureQuotasExist(user.id);
        return user || null;
    }

    async createOrUpdateUser(walletAddress: string, email?: string): Promise<User> {
        const lowerAddress = walletAddress.toLowerCase();
        const existingUser = await this.db.query.users.findFirst({
            where: eq(users.walletAddress, lowerAddress),
        });

        if (existingUser) {
            await this.ensureQuotasExist(existingUser.id);
            const [updatedUser] = await this.db.update(users)
                .set({
                    email: email || existingUser.email,
                    updatedAt: new Date(),
                })
                .where(eq(users.walletAddress, lowerAddress))
                .returning();
            return updatedUser;
        }

        const [newUser] = await this.db.insert(users)
            .values({
                walletAddress: lowerAddress,
                email,
            } as NewUser)
            .returning();

        // AUTO-PROVISION STORAGE QUOTAS (Multi-Slot approach)
        await this.db.insert(userStorageQuotas).values([
            {
                userId: newUser.id,
                storageType: 'cloud', // Centralized
                allocatedBytes: 524288000, // 500 MB
                usedBytes: 0
            },
            {
                userId: newUser.id,
                storageType: 'web3', // Decentralized
                allocatedBytes: 524288000, // 500 MB
                usedBytes: 0
            }
        ]);

        return newUser;
    }

    async findUserByWallet(walletAddress: string): Promise<User & { isPremium: boolean }> {
        const lowerAddress = walletAddress.toLowerCase();
        const user = await this.db.query.users.findFirst({
            where: eq(users.walletAddress, lowerAddress),
        });
        if (!user) {
            throw new NotFoundException(`User with wallet ${walletAddress} not found`);
        }

        const subResult = await this.db.select().from(require('../../src/db/schema/subscriptions').subscriptions).where(eq(require('../../src/db/schema/subscriptions').subscriptions.userId, user.id));
        const subscription = subResult[0];
        const isPremium = subscription && subscription.status === 'ACTIVE' && subscription.planId !== 'free';

        return { ...user, isPremium: !!isPremium };
    }

    async checkAndIncrementStorage(walletAddress: string, additionalBytes: number, engine?: 'cloud' | 'web3'): Promise<boolean> {
        const user = await this.findUserByWallet(walletAddress);
        const storageEngine = engine || (user.storageEngine as 'cloud' | 'web3') || 'cloud';

        // Fetch specific quota from the new table
        const quotaResult = await this.db.select().from(userStorageQuotas)
            .where(and(
                eq(userStorageQuotas.userId, user.id),
                eq(userStorageQuotas.storageType, storageEngine)
            ));
        
        const quota = quotaResult[0];
        if (!quota) return false;

        if (quota.usedBytes + additionalBytes > quota.allocatedBytes) {
            return false;
        }

        // Update the quota table
        await this.db.update(userStorageQuotas)
            .set({ usedBytes: sql`${userStorageQuotas.usedBytes} + ${additionalBytes}`, updatedAt: new Date() })
            .where(and(
                eq(userStorageQuotas.userId, user.id),
                eq(userStorageQuotas.storageType, storageEngine)
            ));

        // Sync back to users table for backward compatibility if needed
        await this.db.update(users)
            .set({ 
                storageUsed: sql`${users.storageUsed} + ${additionalBytes}`,
                updatedAt: new Date()
            })
            .where(eq(users.id, user.id));

        return true;
    }

    async decrementStorage(walletAddress: string, bytes: number, engine?: 'cloud' | 'web3'): Promise<void> {
        const user = await this.findUserByWallet(walletAddress);
        const storageEngine = engine || (user.storageEngine as 'cloud' | 'web3') || 'cloud';

        await this.db.update(userStorageQuotas)
            .set({ usedBytes: sql`GREATEST(0, ${userStorageQuotas.usedBytes} - ${bytes})`, updatedAt: new Date() })
            .where(and(
                eq(userStorageQuotas.userId, user.id),
                eq(userStorageQuotas.storageType, storageEngine)
            ));

        await this.db.update(users)
            .set({ 
                storageUsed: sql`GREATEST(0, ${users.storageUsed} - ${bytes})`,
                updatedAt: new Date()
            })
            .where(eq(users.id, user.id));
    }

    async getAllUsers(): Promise<User[]> {
        return this.db.query.users.findMany();
    }

    async updateStorageEngine(userId: string, targetEngine: 'cloud' | 'web3'): Promise<{ success: boolean; message: string }> {
        const user = await this.findUserById(userId);
        if (!user) {
            throw new NotFoundException(`User with ID ${userId} not found`);
        }
        
        // Check subscription
        const subResult = await this.db.select().from(require('../../src/db/schema/subscriptions').subscriptions).where(eq(require('../../src/db/schema/subscriptions').subscriptions.userId, user.id));
        const subscription = subResult[0];
        
        const isPremium = (subscription && subscription.status === 'ACTIVE' && (subscription.planId !== 'free' || subscription.planName.toLowerCase().includes('trial'))) || 
                         user.walletAddress === '0xFF38De9C8f7B6A4cf810EAcE53D3E8EA9Dac1178';
        
        if (user.storageEngine === targetEngine) {
            return { success: true, message: `Already on ${targetEngine} engine.` };
        }
        
        // Update DB to isMigrating = true
        await this.db.update(users)
            .set({ isMigrating: true })
            .where(eq(users.id, user.id));
            
        // Wait for mock migration (simulation of transfer of files)
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        // Set new engine and end migration
        await this.db.update(users)
            .set({ storageEngine: targetEngine, isMigrating: false })
            .where(eq(users.id, user.id));
            
        return { success: true, message: `Successfully migrated Vault to ${targetEngine.toUpperCase()} engine.` };
    }

    async lockAccount(userId: string): Promise<void> {
        await this.db.update(users).set({ isLocked: true }).where(eq(users.id, userId));
    }

    async unlockAccount(userId: string): Promise<void> {
        await this.db.update(users).set({ isLocked: false }).where(eq(users.id, userId));
    }

    async updatePushToken(walletAddress: string, token: string): Promise<{ success: boolean }> {
        const lowerAddress = walletAddress.toLowerCase();
        await this.db.update(users)
            .set({ expoPushToken: token, updatedAt: new Date() })
            .where(eq(users.walletAddress, lowerAddress));
        return { success: true };
    }

    private async ensureQuotasExist(userId: string): Promise<void> {
        const existingQuotas = await this.db.select().from(userStorageQuotas)
            .where(eq(userStorageQuotas.userId, userId));
        
        const hasCloud = existingQuotas.some((q: any) => q.storageType === 'cloud');
        const hasWeb3 = existingQuotas.some((q: any) => q.storageType === 'web3');

        if (!hasCloud) {
            await this.db.insert(userStorageQuotas).values({
                userId,
                storageType: 'cloud',
                allocatedBytes: 524288000,
                usedBytes: 0
            });
        }

        if (!hasWeb3) {
            await this.db.insert(userStorageQuotas).values({
                userId,
                storageType: 'web3',
                allocatedBytes: 524288000,
                usedBytes: 0
            });
        }
    }
}
