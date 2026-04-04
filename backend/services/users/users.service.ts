import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { users, type User, type NewUser } from '../../src/db/schema/users';
import { eq, sql } from 'drizzle-orm';

@Injectable()
export class UsersService {
    constructor(
        @Inject('DRIZZLE_DB') private db: any,
    ) { }

    async createOrUpdateUser(walletAddress: string, email?: string): Promise<User> {
        const existingUser = await this.db.query.users.findFirst({
            where: eq(users.walletAddress, walletAddress),
        });

        if (existingUser) {
            const [updatedUser] = await this.db.update(users)
                .set({
                    email: email || existingUser.email,
                    updatedAt: new Date(),
                    // lastActive: new Date(), // If we have this field
                })
                .where(eq(users.walletAddress, walletAddress))
                .returning();
            return updatedUser;
        }

        const [newUser] = await this.db.insert(users)
            .values({
                walletAddress,
                email,
            } as NewUser)
            .returning();
        return newUser;
    }

    async findUserByWallet(walletAddress: string): Promise<User & { isPremium: boolean }> {
        const user = await this.db.query.users.findFirst({
            where: eq(users.walletAddress, walletAddress),
        });
        if (!user) {
            throw new NotFoundException(`User with wallet ${walletAddress} not found`);
        }

        const subResult = await this.db.select().from(require('../../src/db/schema/subscriptions').subscriptions).where(eq(require('../../src/db/schema/subscriptions').subscriptions.userId, user.id));
        const subscription = subResult[0];
        const isPremium = subscription && subscription.status === 'ACTIVE' && subscription.planId !== 'free';

        return { ...user, isPremium: !!isPremium };
    }

    async checkAndIncrementStorage(walletAddress: string, additionalBytes: number): Promise<boolean> {
        const user = await this.findUserByWallet(walletAddress);
        
        if (user.storageUsed + additionalBytes > user.storageQuota) {
            return false;
        }

        await this.db.update(users)
            .set({ storageUsed: sql`${users.storageUsed} + ${additionalBytes}` })
            .where(eq(users.walletAddress, walletAddress));
        return true;
    }

    async decrementStorage(walletAddress: string, bytes: number): Promise<void> {
        await this.db.update(users)
            .set({ storageUsed: sql`${users.storageUsed} - ${bytes}` })
            .where(eq(users.walletAddress, walletAddress));
    }

    async getAllUsers(): Promise<User[]> {
        return this.db.query.users.findMany();
    }

    async updateStorageEngine(walletAddress: string, targetEngine: 'cloud' | 'web3'): Promise<{ success: boolean; message: string }> {
        const user = await this.findUserByWallet(walletAddress);
        
        // Check subscription
        const subResult = await this.db.select().from(require('../../src/db/schema/subscriptions').subscriptions).where(eq(require('../../src/db/schema/subscriptions').subscriptions.userId, user.id));
        const subscription = subResult[0];
        
        const isPremium = subscription && subscription.status === 'ACTIVE' && subscription.planId !== 'free';

        if (targetEngine === 'web3' && !isPremium) {
            return { success: false, message: 'Web3 storage is locked to premium plans during trial/free mode.' };
        }
        
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
}
