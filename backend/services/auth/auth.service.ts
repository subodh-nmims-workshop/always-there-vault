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
        const nonceBase = crypto.randomBytes(16).toString('hex'); // 32 chars
        const timestamp = Date.now();
        const secret = this.configService.get<string>('JWT_SECRET') || 'secret';
        
        // Create HMAC signature of (nonceBase + timestamp)
        const hmac = crypto.createHmac('sha256', secret)
            .update(`${nonceBase}:${timestamp}`)
            .digest('hex')
            .substring(0, 32); // 32 chars
            
        const fullNonce = nonceBase + hmac; // 64 chars total
        const message = `Welcome to AlwaysThere Vault.\n\nSign this message to prove ownership of this wallet and authorize your session.\n\nNonce: ${fullNonce}\nTimestamp: ${timestamp}`;

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
            const fullNonce = nonceMatch[1];

            const tsMatch = normalizedMessage.match(/Timestamp: (\d+)/);
            if (!tsMatch) {
                this.logger.error(`Timestamp missing in message for ${walletAddress}`);
                throw new BadRequestException('Invalid message format. Timestamp missing.');
            }
            const timestampStr = tsMatch[1];
            const timestamp = parseInt(timestampStr);
            const now = Date.now();

            // 2. Validate Stateless Nonce
            const nonceBase = fullNonce.substring(0, 32);
            const receivedHmac = fullNonce.substring(32);
            const secret = this.configService.get<string>('JWT_SECRET') || 'secret';
            
            const expectedHmac = crypto.createHmac('sha256', secret)
                .update(`${nonceBase}:${timestampStr}`)
                .digest('hex')
                .substring(0, 32);

            if (receivedHmac !== expectedHmac) {
                this.logger.error(`INVALID NONCE HMAC for ${walletAddress}. Tampering detected?`);
                throw new UnauthorizedException('Authentication session tampered or invalid.');
            }

            if (Math.abs(now - timestamp) > this.NONCE_EXPIRY) {
                this.logger.warn(`STALE SIGNATURE DETECTED for ${walletAddress}. Time diff: ${(now - timestamp) / 1000}s`);
                throw new UnauthorizedException('Signature expired. Please try again with a fresh session.');
            }

            // 3. Verify signature
            let recoveredAddress: string;
            try {
                // ethers.verifyMessage expects the original message that was signed
                recoveredAddress = ethers.verifyMessage(normalizedMessage, signature);
            } catch (err) {
                this.logger.error(`Ethers verification error for ${walletAddress}: ${err.message}`);
                throw new UnauthorizedException('Signature format invalid or tampered.');
            }

            let isRecoveryLogin = false;
            if (recoveredAddress.toLowerCase() !== walletAddress.toLowerCase()) {
                const user = await this.usersService.findUserByWalletOrRecovery(walletAddress);
                if (user && user.recoveryAddress && user.recoveryAddress.toLowerCase() === recoveredAddress.toLowerCase()) {
                    isRecoveryLogin = true;
                    this.logger.log(`RECOVERY LOGIN SUCCESSFUL: ${walletAddress} authenticated via recovery address ${recoveredAddress}`);
                } else {
                    this.logger.warn(`ADDRESS MISMATCH: Recovered ${recoveredAddress} vs Expected ${walletAddress}`);
                    throw new UnauthorizedException('Invalid signature. Wallet address mismatch.');
                }
            }

            // 4. Find user by primary wallet address or recovery address
            let dbUser = await this.usersService.findUserByWalletOrRecovery(walletAddress);

            if (dbUser && dbUser.isLocked) {
                this.logger.warn(`LOCKED ACCOUNT ATTEMPTED LOGIN: ${walletAddress}`);
                throw new UnauthorizedException('Your account has been locked due to suspicious activity.');
            }

            if (dbUser && dbUser.twoFactorEnabled) {
                const mfaToken = crypto.randomBytes(32).toString('hex');
                // MFA sessions still use cache for now, but they are shorter-lived
                this.cacheService.set(`mfa_pending:${mfaToken}`, { userId: dbUser.id, walletAddress: dbUser.walletAddress }, 10 * 60 * 1000);
                return {
                    status: 'PENDING_MFA',
                    mfaToken
                };
            }

            // 5. Regular login
            if (!dbUser) {
                // If user doesn't exist, create a new one using this walletAddress as primary
                dbUser = await this.usersService.createOrUpdateUser(walletAddress);
            } else {
                // If user exists, update their profile/active timestamp using their primary wallet address
                dbUser = await this.usersService.createOrUpdateUser(dbUser.walletAddress);
            }
            
            // Generate JWT using the primary walletAddress to maintain consistent session identity
            const token = jwt.sign(
                { walletAddress: dbUser.walletAddress, userId: dbUser.id },
                this.configService.get<string>('JWT_SECRET') || 'secret',
                { expiresIn: this.configService.get<string>('JWT_EXPIRATION') || '24h' }
            );

            return {
                authenticated: true,
                walletAddress: dbUser.walletAddress,
                token
            };
        } catch (e) {
            this.logger.error(`Authentication failed for ${walletAddress}: ${e.message}`);
            console.error('FULL DATABASE AUTH ERROR:', e);
            if (e instanceof UnauthorizedException || e instanceof BadRequestException) {
                throw e;
            }
            // Log full stack for non-HTTP exceptions to help debug in Render logs
            console.error(e);
            const detailMsg = [e.code, e.detail, e.hint].filter(Boolean).join(' - ');
            throw new UnauthorizedException(`Authentication failed: ${e.message}${detailMsg ? ' | ' + detailMsg : ''}`);
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
