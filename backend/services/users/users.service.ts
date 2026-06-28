import { Injectable, Inject, NotFoundException, BadRequestException } from '@nestjs/common';
import { users, type User, type NewUser } from '../../src/db/schema/users';
import { userStorageQuotas } from '../../src/db/schema/quotas';
import { heartbeatConfigs } from '../../src/db/schema/heartbeat';
import { eq, sql, and, or } from 'drizzle-orm';
import { EmailService } from '../email/email.service';

@Injectable()
export class UsersService {
    constructor(
        @Inject('DRIZZLE_DB') private db: any,
        private readonly emailService: EmailService,
    ) { }

    async findUserById(id: string): Promise<User | null> {
        const user = await this.db.query.users.findFirst({
            where: eq(users.id, id),
        });
        if (user) {
            await this.ensureQuotasExist(user.id);
            await this.ensureHeartbeatConfigExists(user.id);
        }
        return user || null;
    }

    async findUserByWalletOrRecovery(address: string): Promise<User | null> {
        const lowerAddress = address.toLowerCase();
        const user = await this.db.query.users.findFirst({
            where: or(
                eq(users.walletAddress, lowerAddress),
                eq(users.recoveryAddress, lowerAddress)
            ),
        });
        if (user) {
            await this.ensureQuotasExist(user.id);
            await this.ensureHeartbeatConfigExists(user.id);
        }
        return user || null;
    }

    async updateRecoveryAddress(userId: string, recoveryAddress: string | null): Promise<{ success: boolean; recoveryAddress: string | null }> {
        const lowerAddress = recoveryAddress ? recoveryAddress.toLowerCase() : null;
        await this.db.update(users)
            .set({ 
                recoveryAddress: lowerAddress,
                updatedAt: new Date()
            })
            .where(eq(users.id, userId));
        return { success: true, recoveryAddress: lowerAddress };
    }

    async deleteEmail(walletAddress: string): Promise<{ success: boolean }> {
        const lowerAddress = walletAddress.toLowerCase();
        await this.db.update(users)
            .set({
                email: null,
                pendingEmail: null,
                emailVerified: false,
                emailVerificationToken: null,
                updatedAt: new Date(),
            })
            .where(eq(users.walletAddress, lowerAddress));
        return { success: true };
    }

    async createOrUpdateUser(walletAddress: string, email?: string): Promise<User & { verificationRequired?: boolean; pendingEmail?: string }> {
        const lowerAddress = walletAddress.toLowerCase();
        const existingUser = await this.db.query.users.findFirst({
            where: eq(users.walletAddress, lowerAddress),
        });

        if (existingUser) {
            await this.ensureQuotasExist(existingUser.id);
            await this.ensureHeartbeatConfigExists(existingUser.id);

            // Handle email deletion/clearing if empty string is supplied
            if (email === '') {
                const [updatedUser] = await this.db.update(users)
                    .set({
                        email: null,
                        pendingEmail: null,
                        emailVerified: false,
                        emailVerificationToken: null,
                        updatedAt: new Date(),
                    })
                    .where(eq(users.walletAddress, lowerAddress))
                    .returning();
                return updatedUser;
            }

            // If a different email is specified or it is not yet verified, initiate verification
            if (email && (email.toLowerCase() !== existingUser.email?.toLowerCase() || !existingUser.emailVerified)) {
                const lowerEmail = email.toLowerCase();

                // Check 15-second cooldown if requesting for the same pending email
                if (existingUser.pendingEmail?.toLowerCase() === lowerEmail) {
                    if (existingUser.updatedAt && (new Date().getTime() - new Date(existingUser.updatedAt).getTime() < 15000)) {
                        throw new BadRequestException('Please wait 15 seconds before requesting another code.');
                    }
                }

                const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();
                
                await this.db.update(users)
                    .set({
                        pendingEmail: lowerEmail,
                        emailVerificationToken: verificationCode,
                        updatedAt: new Date(),
                    })
                    .where(eq(users.walletAddress, lowerAddress));

                // Send verification email asynchronously
                this.emailService.sendVerificationEmail(lowerEmail, verificationCode).catch(err => {
                    console.error('Error sending verification email:', err);
                });
                
                return {
                    ...existingUser,
                    verificationRequired: true,
                    pendingEmail: lowerEmail,
                };
            }

            // Otherwise standard update
            const [updatedUser] = await this.db.update(users)
                .set({
                    updatedAt: new Date(),
                })
                .where(eq(users.walletAddress, lowerAddress))
                .returning();
            return updatedUser;
        }

        // New user creation
        const lowerEmail = email ? email.toLowerCase() : null;
        const verificationCode = lowerEmail ? Math.floor(100000 + Math.random() * 900000).toString() : null;

        const [newUser] = await this.db.insert(users)
            .values({
                walletAddress: lowerAddress,
                email: null, // Keep verified email null until verified
                pendingEmail: lowerEmail,
                emailVerificationToken: verificationCode,
                emailVerified: false,
            } as any)
            .returning();

        if (lowerEmail && verificationCode) {
            this.emailService.sendVerificationEmail(lowerEmail, verificationCode).catch(err => {
                console.error('Error sending verification email for new user:', err);
            });
        }

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

        // AUTO-PROVISION HEARTBEAT CONFIG
        await this.ensureHeartbeatConfigExists(newUser.id);

        return {
            ...newUser,
            verificationRequired: !!lowerEmail,
            pendingEmail: lowerEmail || undefined,
        };
    }

    async verifyEmail(userId: string, code: string): Promise<{ success: boolean; message: string; email?: string }> {
        const user = await this.findUserById(userId);
        if (!user) {
            throw new NotFoundException('User not found');
        }

        if (!user.emailVerificationToken || !user.pendingEmail) {
            return { success: false, message: 'No verification request pending' };
        }

        if (user.emailVerificationToken !== code) {
            return { success: false, message: 'Invalid verification code' };
        }

        // Verification successful: promote pendingEmail to primary email
        await this.db.update(users)
            .set({
                email: user.pendingEmail,
                emailVerified: true,
                pendingEmail: null,
                emailVerificationToken: null,
                updatedAt: new Date()
            })
            .where(eq(users.id, userId));

        return { success: true, message: 'Email verified successfully', email: user.pendingEmail };
    }

    async resendVerificationCode(userId: string): Promise<{ success: boolean; message: string }> {
        const user = await this.findUserById(userId);
        if (!user) {
            throw new NotFoundException('User not found');
        }

        // Check 15-second cooldown
        if (user.updatedAt && (new Date().getTime() - new Date(user.updatedAt).getTime() < 15000)) {
            throw new BadRequestException('Please wait 15 seconds before requesting another code.');
        }

        const emailToVerify = user.pendingEmail || (!user.emailVerified ? user.email : null);
        if (!emailToVerify) {
            return { success: false, message: 'No pending email to verify' };
        }

        const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();

        await this.db.update(users)
            .set({
                pendingEmail: emailToVerify,
                emailVerificationToken: verificationCode,
                updatedAt: new Date()
            })
            .where(eq(users.id, userId));

        await this.emailService.sendVerificationEmail(emailToVerify, verificationCode);

        return { success: true, message: 'Verification code resent successfully' };
    }

    async findUserByWallet(walletAddress: string): Promise<User & { isPremium: boolean }> {
        const lowerAddress = walletAddress.toLowerCase();
        const user = await this.db.query.users.findFirst({
            where: eq(users.walletAddress, lowerAddress),
        });
        if (!user) {
            throw new NotFoundException(`User with wallet ${walletAddress} not found`);
        }

        await this.ensureQuotasExist(user.id);
        await this.ensureHeartbeatConfigExists(user.id);

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

    private async ensureHeartbeatConfigExists(userId: string): Promise<void> {
        const existingConfig = await this.db.select().from(heartbeatConfigs)
            .where(eq(heartbeatConfigs.userId, userId));
        
        if (existingConfig.length === 0) {
            await this.db.insert(heartbeatConfigs).values({
                userId,
                intervalDays: 30,
                gracePeriodDays: 7,
                bufferMisses: 3,
                lastHeartbeat: new Date(),
                missedCount: 0,
                isActive: true,
            });
        }
    }
}
