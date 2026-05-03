import { Injectable, UnauthorizedException, BadRequestException, Logger } from '@nestjs/common';
import { ethers } from 'ethers';
import * as crypto from 'crypto';
import { UsersService } from '../users/users.service';
import { MFAService } from './mfa.service';
import { CacheService } from '../cache/cache.service';
import { ConfigService } from '@nestjs/config';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthService {
    private readonly logger = new Logger(AuthService.name);
    private readonly NONCE_PREFIX = 'auth_nonce:';
    private readonly NONCE_EXPIRY = 5 * 60 * 1000; // 5 minutes

    constructor(
        private readonly usersService: UsersService,
        private readonly mfaService: MFAService,
        private readonly cacheService: CacheService,
        private readonly configService: ConfigService
    ) { }

    generateNonce(): string {
        const nonce = crypto.randomBytes(32).toString('hex');
        const timestamp = Date.now();
        const message = `Welcome to AlwaysThere Protocol.\n\nSign this message to prove ownership of this wallet and authorize your session.\n\nNonce: ${nonce}\nTimestamp: ${timestamp}`;

        // Store nonce in cache to prevent replay attacks
        this.cacheService.set(`${this.NONCE_PREFIX}${nonce}`, { walletRequested: true }, this.NONCE_EXPIRY);

        return message;
    }
    async verifySignature(walletAddress: string, message: string, signature: string): Promise<any> {
        try {
            // 1. Normalize line endings (CRLF -> LF) to prevent verification mismatch
            const normalizedMessage = message.replace(/\r\n/g, '\n');

            // Extract and verify nonce & timestamp
            const nonceMatch = normalizedMessage.match(/Nonce: ([a-f0-9]{64})/);
            if (!nonceMatch) {
                this.logger.error(`Nonce missing in message for ${walletAddress}`);
                throw new BadRequestException('Invalid message format. Nonce missing.');
            }
            const nonce = nonceMatch[1];

            const tsMatch = normalizedMessage.match(/Timestamp: (\d+)/);
            if (!tsMatch) {
                this.logger.error(`Timestamp missing in message for ${walletAddress}`);
                throw new BadRequestException('Invalid message format. Timestamp missing.');
            }
            const timestamp = parseInt(tsMatch[1]);
            const now = Date.now();

            if (Math.abs(now - timestamp) > this.NONCE_EXPIRY) {
                this.logger.warn(`STALE SIGNATURE DETECTED for ${walletAddress}. Time diff: ${(now - timestamp) / 1000}s`);
                throw new UnauthorizedException('Signature expired. Please try again with a fresh session.');
            }

            const cachedNonce = this.cacheService.get<any>(`${this.NONCE_PREFIX}${nonce}`);
            if (!cachedNonce) {
                this.logger.warn(`EXPIRED OR MISSING NONCE for ${walletAddress}: ${nonce}`);
                throw new UnauthorizedException('Nonce expired or used. Please request a new one.');
            }

            // Mark nonce as used
            this.cacheService.delete(`${this.NONCE_PREFIX}${nonce}`);

            // 2. Verify signature
            let recoveredAddress: string;
            try {
                // ethers.verifyMessage expects the original message that was signed
                recoveredAddress = ethers.verifyMessage(normalizedMessage, signature);
            } catch (err) {
                this.logger.error(`Ethers verification error for ${walletAddress}: ${err.message}`);
                throw new UnauthorizedException('Signature format invalid or tampered.');
            }

            if (recoveredAddress.toLowerCase() !== walletAddress.toLowerCase()) {
                this.logger.warn(`ADDRESS MISMATCH: Recovered ${recoveredAddress} vs Expected ${walletAddress}`);
                throw new UnauthorizedException('Invalid signature. Wallet address mismatch.');
            }

            // 3. Check for 2FA
            let user;
            try {
                user = await this.usersService.findUserByWallet(walletAddress);
            } catch (e) {
                user = null;
            }

            if (user && user.isLocked) {
                this.logger.warn(`LOCKED ACCOUNT ATTEMPTED LOGIN: ${walletAddress}`);
                throw new UnauthorizedException('Your account has been locked due to suspicious activity.');
            }

            if (user && user.twoFactorEnabled) {
                const mfaToken = crypto.randomBytes(32).toString('hex');
                this.cacheService.set(`mfa_pending:${mfaToken}`, { userId: user.id, walletAddress }, 10 * 60 * 1000);
                return {
                    status: 'PENDING_MFA',
                    mfaToken
                };
            }

            // 4. Regular login
            const dbUser = await this.usersService.createOrUpdateUser(walletAddress);
            
            // Generate JWT
            const token = jwt.sign(
                { walletAddress, userId: dbUser.id },
                this.configService.get<string>('JWT_SECRET') || 'secret',
                { expiresIn: this.configService.get<string>('JWT_EXPIRATION') || '24h' }
            );

            return {
                authenticated: true,
                walletAddress,
                token
            };
        } catch (e) {
            this.logger.error(`Authentication failed for ${walletAddress}: ${e.message}`);
            if (e instanceof UnauthorizedException || e instanceof BadRequestException) {
                throw e;
            }
            // Log full stack for non-HTTP exceptions to help debug in Render logs
            console.error(e);
            throw new UnauthorizedException('Authentication failed. Signature cannot be verified.');
        }
    }

    async verifyMFA(mfaToken: string, code: string): Promise<any> {
        const pending = this.cacheService.get<{ userId: string; walletAddress: string }>(`mfa_pending:${mfaToken}`);
        if (!pending) {
            throw new UnauthorizedException('Invalid or expired MFA session.');
        }

        const isValid = await this.mfaService.verify2FA(pending.userId, code);
        if (!isValid) {
            throw new UnauthorizedException('Invalid 2FA code.');
        }

        // MFA Verified
        this.cacheService.delete(`mfa_pending:${mfaToken}`);
        await this.usersService.createOrUpdateUser(pending.walletAddress);

        // Generate JWT
        const token = jwt.sign(
            { walletAddress: pending.walletAddress, userId: pending.userId },
            this.configService.get<string>('JWT_SECRET') || 'secret',
            { expiresIn: this.configService.get<string>('JWT_EXPIRATION') || '24h' }
        );

        return {
            authenticated: true,
            walletAddress: pending.walletAddress,
            token
        };
    }
}
