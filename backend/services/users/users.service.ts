import { Injectable, Inject, NotFoundException, BadRequestException } from '@nestjs/common';
import { users, type User, type NewUser } from '../../src/db/schema/users';
import { userStorageQuotas } from '../../src/db/schema/quotas';
import { heartbeatConfigs } from '../../src/db/schema/heartbeat';
import { eq, sql, and, or } from 'drizzle-orm';
import { EmailService } from '../email/email.service';
import { CacheService } from '../cache/cache.service';

@Injectable()
export class UsersService {
    constructor(
        @Inject('DRIZZLE_DB') private db: any,
        private readonly emailService: EmailService,
        private readonly cacheService: CacheService,
    ) { }

    // ─── User Lookup ──────────────────────────────────────────────────────────

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

        const subResult = await this.db.select()
            .from(require('../../src/db/schema/subscriptions').subscriptions)
            .where(eq(require('../../src/db/schema/subscriptions').subscriptions.userId, user.id));
        const subscription = subResult[0];
        const isPremium = subscription && subscription.status === 'ACTIVE' && subscription.planId !== 'free';

        return { ...user, isPremium: !!isPremium };
    }

    // ─── Create / Update Profile ──────────────────────────────────────────────

    async createOrUpdateUser(
        walletAddress: string,
        email?: string,
        alternativeEmail?: string
    ): Promise<User & {
        verificationRequired?: boolean;
        pendingEmail?: string;
        alternativeVerificationRequired?: boolean;
        alternativePendingEmail?: string;
    }> {
        const lowerAddress = walletAddress.toLowerCase();
        const existingUser = await this.db.query.users.findFirst({
            where: eq(users.walletAddress, lowerAddress),
        });

        if (existingUser) {
            await this.ensureQuotasExist(existingUser.id);
            await this.ensureHeartbeatConfigExists(existingUser.id);

            let verificationRequired = false;
            let pendingEmailStr: string | null = null;
            let alternativeVerificationRequired = false;
            let alternativePendingEmailStr: string | null = null;

            // ── Primary email ────────────────────────────────────────────────
            if (email === '') {
                // Clear primary email
                await this.db.update(users)
                    .set({
                        email: null,
                        pendingEmail: null,
                        emailVerified: false,
                        emailVerificationToken: null,
                    })
                    .where(eq(users.walletAddress, lowerAddress));

            } else if (email && (email.toLowerCase() !== existingUser.email?.toLowerCase() || !existingUser.emailVerified)) {
                const lowerEmail = email.toLowerCase();

                // 15-second cooldown guard — stored in cache, never touches updatedAt
                const cooldownKey = `otp_cooldown:primary:${existingUser.id}`;
                if (existingUser.pendingEmail?.toLowerCase() === lowerEmail && this.cacheService.get(cooldownKey)) {
                    throw new BadRequestException('Please wait 15 seconds before requesting another code.');
                }

                const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();

                await this.db.update(users)
                    .set({
                        pendingEmail: lowerEmail,
                        emailVerificationToken: verificationCode,
                    })
                    .where(eq(users.walletAddress, lowerAddress));

                // Set 15-second cooldown in cache
                this.cacheService.set(cooldownKey, true, 15000);

                // Send OTP email (non-blocking)
                this.emailService.sendVerificationEmail(lowerEmail, verificationCode).catch(err => {
                    console.error('Error sending verification email:', err);
                });

                verificationRequired = true;
                pendingEmailStr = lowerEmail;
            }

            // ── Alternative email ────────────────────────────────────────────
            if (alternativeEmail === '') {
                // Clear alternative email
                await this.db.update(users)
                    .set({
                        alternativeEmail: null,
                        alternativePendingEmail: null,
                        alternativeEmailVerified: false,
                        alternativeEmailVerificationToken: null,
                    })
                    .where(eq(users.walletAddress, lowerAddress));

            } else if (alternativeEmail && (alternativeEmail.toLowerCase() !== existingUser.alternativeEmail?.toLowerCase() || !existingUser.alternativeEmailVerified)) {
                const lowerAltEmail = alternativeEmail.toLowerCase();

                // 15-second cooldown guard
                const cooldownKey = `otp_cooldown:alt:${existingUser.id}`;
                if (existingUser.alternativePendingEmail?.toLowerCase() === lowerAltEmail && this.cacheService.get(cooldownKey)) {
                    throw new BadRequestException('Please wait 15 seconds before requesting another code for alternative email.');
                }

                const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();

                await this.db.update(users)
                    .set({
                        alternativePendingEmail: lowerAltEmail,
                        alternativeEmailVerificationToken: verificationCode,
                    })
                    .where(eq(users.walletAddress, lowerAddress));

                // Set 15-second cooldown in cache
                this.cacheService.set(cooldownKey, true, 15000);

                // Send OTP email (non-blocking)
                this.emailService.sendVerificationEmail(lowerAltEmail, verificationCode).catch(err => {
                    console.error('Error sending alternative verification email:', err);
                });

                alternativeVerificationRequired = true;
                alternativePendingEmailStr = lowerAltEmail;
            }

            // Return fresh user state (no updatedAt touched — avoids cooldown pollution)
            const freshUser = await this.db.query.users.findFirst({
                where: eq(users.walletAddress, lowerAddress),
            });

            return {
                ...freshUser,
                verificationRequired,
                pendingEmail: pendingEmailStr || undefined,
                alternativeVerificationRequired,
                alternativePendingEmail: alternativePendingEmailStr || undefined,
            };
        }

        // ── New user creation ─────────────────────────────────────────────────
        const lowerEmail = email ? email.toLowerCase() : null;
        const verificationCode = lowerEmail ? Math.floor(100000 + Math.random() * 900000).toString() : null;

        const lowerAltEmail = alternativeEmail ? alternativeEmail.toLowerCase() : null;
        const altVerificationCode = lowerAltEmail ? Math.floor(100000 + Math.random() * 900000).toString() : null;

        const [newUser] = await this.db.insert(users)
            .values({
                walletAddress: lowerAddress,
                email: null,
                pendingEmail: lowerEmail,
                emailVerificationToken: verificationCode,
                emailVerified: false,
                alternativeEmail: null,
                alternativePendingEmail: lowerAltEmail,
                alternativeEmailVerificationToken: altVerificationCode,
                alternativeEmailVerified: false,
            } as any)
            .returning();

        if (lowerEmail && verificationCode) {
            this.emailService.sendVerificationEmail(lowerEmail, verificationCode).catch(err => {
                console.error('Error sending verification email for new user:', err);
            });
        }

        if (lowerAltEmail && altVerificationCode) {
            this.emailService.sendVerificationEmail(lowerAltEmail, altVerificationCode).catch(err => {
                console.error('Error sending alternative verification email for new user:', err);
            });
        }

        // Auto-provision storage quotas
        await this.db.insert(userStorageQuotas).values([
            { userId: newUser.id, storageType: 'cloud', allocatedBytes: 524288000, usedBytes: 0 },
            { userId: newUser.id, storageType: 'web3', allocatedBytes: 524288000, usedBytes: 0 },
        ]);

        await this.ensureHeartbeatConfigExists(newUser.id);

        return {
            ...newUser,
            verificationRequired: !!lowerEmail,
            pendingEmail: lowerEmail || undefined,
            alternativeVerificationRequired: !!lowerAltEmail,
            alternativePendingEmail: lowerAltEmail || undefined,
        };
    }

    // ─── Email Verification ───────────────────────────────────────────────────

    async verifyEmail(userId: string, code: string): Promise<{ success: boolean; message: string; email?: string }> {
        const user = await this.findUserById(userId);
        if (!user) throw new NotFoundException('User not found');

        if (!user.emailVerificationToken || !user.pendingEmail) {
            return { success: false, message: 'No verification request pending' };
        }

        // Attempt counter (5 max)
        const attemptsKey = `email_otp_attempts:${userId}`;
        const attempts = this.cacheService.get<number>(attemptsKey) || 0;
        if (attempts >= 5) {
            return { success: false, message: 'Too many invalid attempts. Please request a new code.' };
        }

        // OTP expiry check (10 minutes) — stored in cache, independent of updatedAt
        const expiryKey = `otp_expiry:primary:${userId}`;
        if (!this.cacheService.get(expiryKey)) {
            return { success: false, message: 'Verification code has expired. Please request a new code.' };
        }

        if (user.emailVerificationToken !== code) {
            this.cacheService.set(attemptsKey, attempts + 1, 10 * 60 * 1000);
            return { success: false, message: `Invalid verification code. Attempt ${attempts + 1}/5` };
        }

        // Success — promote pendingEmail
        await this.db.update(users)
            .set({
                email: user.pendingEmail,
                emailVerified: true,
                pendingEmail: null,
                emailVerificationToken: null,
                updatedAt: new Date(),
            })
            .where(eq(users.id, userId));

        this.cacheService.delete(attemptsKey);
        this.cacheService.delete(expiryKey);
        return { success: true, message: 'Email verified successfully', email: user.pendingEmail };
    }

    async verifyAlternativeEmail(userId: string, code: string): Promise<{ success: boolean; message: string; alternativeEmail?: string }> {
        const user = await this.findUserById(userId);
        if (!user) throw new NotFoundException('User not found');

        if (!user.alternativeEmailVerificationToken || !user.alternativePendingEmail) {
            return { success: false, message: 'No alternative verification request pending' };
        }

        const attemptsKey = `alt_email_otp_attempts:${userId}`;
        const attempts = this.cacheService.get<number>(attemptsKey) || 0;
        if (attempts >= 5) {
            return { success: false, message: 'Too many invalid attempts. Please request a new code.' };
        }

        const expiryKey = `otp_expiry:alt:${userId}`;
        if (!this.cacheService.get(expiryKey)) {
            return { success: false, message: 'Verification code has expired. Please request a new code.' };
        }

        if (user.alternativeEmailVerificationToken !== code) {
            this.cacheService.set(attemptsKey, attempts + 1, 10 * 60 * 1000);
            return { success: false, message: `Invalid verification code. Attempt ${attempts + 1}/5` };
        }

        await this.db.update(users)
            .set({
                alternativeEmail: user.alternativePendingEmail,
                alternativeEmailVerified: true,
                alternativePendingEmail: null,
                alternativeEmailVerificationToken: null,
                updatedAt: new Date(),
            })
            .where(eq(users.id, userId));

        this.cacheService.delete(attemptsKey);
        this.cacheService.delete(expiryKey);
        return { success: true, message: 'Alternative email verified successfully', alternativeEmail: user.alternativePendingEmail };
    }

    // ─── Resend OTP ───────────────────────────────────────────────────────────

    async resendVerificationCode(userId: string): Promise<{ success: boolean; message: string }> {
        const user = await this.findUserById(userId);
        if (!user) throw new NotFoundException('User not found');

        // 15-second cooldown via cache
        const cooldownKey = `otp_cooldown:primary:${userId}`;
        if (this.cacheService.get(cooldownKey)) {
            throw new BadRequestException('Please wait 15 seconds before requesting another code.');
        }

        const emailToVerify = user.pendingEmail || (!user.emailVerified ? user.email : null);
        if (!emailToVerify) {
            return { success: false, message: 'No pending email to verify' };
        }

        const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();

        await this.db.update(users)
            .set({ pendingEmail: emailToVerify, emailVerificationToken: verificationCode })
            .where(eq(users.id, userId));

        this.cacheService.set(cooldownKey, true, 15000);
        this.cacheService.set(`otp_expiry:primary:${userId}`, true, 10 * 60 * 1000);

        await this.emailService.sendVerificationEmail(emailToVerify, verificationCode);
        return { success: true, message: 'Verification code resent successfully' };
    }

    async resendAlternativeVerificationCode(userId: string): Promise<{ success: boolean; message: string }> {
        const user = await this.findUserById(userId);
        if (!user) throw new NotFoundException('User not found');

        const cooldownKey = `otp_cooldown:alt:${userId}`;
        if (this.cacheService.get(cooldownKey)) {
            throw new BadRequestException('Please wait 15 seconds before requesting another code.');
        }

        const emailToVerify = user.alternativePendingEmail || (!user.alternativeEmailVerified ? user.alternativeEmail : null);
        if (!emailToVerify) {
            return { success: false, message: 'No pending alternative email to verify' };
        }

        const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();

        await this.db.update(users)
            .set({ alternativePendingEmail: emailToVerify, alternativeEmailVerificationToken: verificationCode })
            .where(eq(users.id, userId));

        this.cacheService.set(cooldownKey, true, 15000);
        this.cacheService.set(`otp_expiry:alt:${userId}`, true, 10 * 60 * 1000);

        await this.emailService.sendVerificationEmail(emailToVerify, verificationCode);
        return { success: true, message: 'Verification code resent successfully' };
    }

    // ─── Delete Email ─────────────────────────────────────────────────────────

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

    async deleteAlternativeEmail(walletAddress: string): Promise<{ success: boolean }> {
        const lowerAddress = walletAddress.toLowerCase();
        await this.db.update(users)
            .set({
                alternativeEmail: null,
                alternativePendingEmail: null,
                alternativeEmailVerified: false,
                alternativeEmailVerificationToken: null,
                updatedAt: new Date(),
            })
            .where(eq(users.walletAddress, lowerAddress));
        return { success: true };
    }

    // ─── Recovery Address ─────────────────────────────────────────────────────

    async updateRecoveryAddress(userId: string, recoveryAddress: string | null): Promise<{ success: boolean; recoveryAddress: string | null }> {
        const lowerAddress = recoveryAddress ? recoveryAddress.toLowerCase() : null;
        await this.db.update(users)
            .set({ recoveryAddress: lowerAddress, updatedAt: new Date() })
            .where(eq(users.id, userId));
        return { success: true, recoveryAddress: lowerAddress };
    }

    // ─── Storage ──────────────────────────────────────────────────────────────

    async checkAndIncrementStorage(walletAddress: string, additionalBytes: number, engine?: 'cloud' | 'web3'): Promise<boolean> {
        const user = await this.findUserByWallet(walletAddress);
        const storageEngine = engine || (user.storageEngine as 'cloud' | 'web3') || 'cloud';

        const quotaResult = await this.db.select().from(userStorageQuotas)
            .where(and(
                eq(userStorageQuotas.userId, user.id),
                eq(userStorageQuotas.storageType, storageEngine)
            ));

        const quota = quotaResult[0];
        if (!quota) return false;
        if (quota.usedBytes + additionalBytes > quota.allocatedBytes) return false;

        await this.db.update(userStorageQuotas)
            .set({ usedBytes: sql`${userStorageQuotas.usedBytes} + ${additionalBytes}`, updatedAt: new Date() })
            .where(and(
                eq(userStorageQuotas.userId, user.id),
                eq(userStorageQuotas.storageType, storageEngine)
            ));

        await this.db.update(users)
            .set({ storageUsed: sql`${users.storageUsed} + ${additionalBytes}`, updatedAt: new Date() })
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
            .set({ storageUsed: sql`GREATEST(0, ${users.storageUsed} - ${bytes})`, updatedAt: new Date() })
            .where(eq(users.id, user.id));
    }

    // ─── Misc ─────────────────────────────────────────────────────────────────

    async getAllUsers(): Promise<User[]> {
        return this.db.query.users.findMany();
    }

    async updateStorageEngine(userId: string, targetEngine: 'cloud' | 'web3'): Promise<{ success: boolean; message: string }> {
        const user = await this.findUserById(userId);
        if (!user) throw new NotFoundException(`User with ID ${userId} not found`);

        const subResult = await this.db.select()
            .from(require('../../src/db/schema/subscriptions').subscriptions)
            .where(eq(require('../../src/db/schema/subscriptions').subscriptions.userId, user.id));
        const subscription = subResult[0];

        if (user.storageEngine === targetEngine) {
            return { success: true, message: `Already on ${targetEngine} engine.` };
        }

        await this.db.update(users).set({ isMigrating: true }).where(eq(users.id, user.id));
        await new Promise(resolve => setTimeout(resolve, 2000));
        await this.db.update(users).set({ storageEngine: targetEngine, isMigrating: false }).where(eq(users.id, user.id));

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

    // ─── Private Helpers ──────────────────────────────────────────────────────

    private async ensureQuotasExist(userId: string): Promise<void> {
        const existingQuotas = await this.db.select().from(userStorageQuotas)
            .where(eq(userStorageQuotas.userId, userId));

        const hasCloud = existingQuotas.some((q: any) => q.storageType === 'cloud');
        const hasWeb3 = existingQuotas.some((q: any) => q.storageType === 'web3');

        if (!hasCloud) {
            await this.db.insert(userStorageQuotas).values({ userId, storageType: 'cloud', allocatedBytes: 524288000, usedBytes: 0 });
        }
        if (!hasWeb3) {
            await this.db.insert(userStorageQuotas).values({ userId, storageType: 'web3', allocatedBytes: 524288000, usedBytes: 0 });
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
