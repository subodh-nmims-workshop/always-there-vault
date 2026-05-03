import * as speakeasy from 'speakeasy';
import * as qrcode from 'qrcode';
import * as crypto from 'crypto';
import { Injectable, Inject } from '@nestjs/common';
import { eq } from 'drizzle-orm';
import { users } from '../../src/db/schema/users';
import { SecureEncryptionService } from '../crypto/secure-encryption.service';

@Injectable()
export class MFAService {
    
    constructor(
        @Inject('DRIZZLE_DB') private db: any,
        private readonly encryptionService: SecureEncryptionService
    ) {}
    
    // Enable 2FA for user
    async enable2FA(userId: string): Promise<{ secret: string; qrCode: string }> {
        const secret = speakeasy.generateSecret({
            name: `AlwaysThere Protocol:${userId}`,
            length: 20
        });
        
        // Store secret encrypted
        const encryptedSecret = await this.encryptionService.encrypt(secret.base32);
        
        await this.db.update(users)
            .set({
                twoFactorSecret: encryptedSecret,
                twoFactorEnabled: true,
                updatedAt: new Date()
            })
            .where(eq(users.id, userId));
        
        // Generate QR code
        const qrCode = await qrcode.toDataURL(secret.otpauth_url!);
        
        return { secret: secret.base32, qrCode };
    }
    
    // Verify 2FA token
    async verify2FA(userId: string, token: string): Promise<boolean> {
        const user = await this.db.query.users.findFirst({
            where: eq(users.id, userId)
        });
        
        if (!user || !user.twoFactorEnabled || !user.twoFactorSecret) return true;
        
        const decryptedSecret = await this.encryptionService.decrypt(user.twoFactorSecret);
        
        return speakeasy.totp.verify({
            secret: decryptedSecret,
            encoding: 'base32',
            token: token,
            window: 1 // Allow 1 step time drift
        });
    }
    
    // Recovery codes (in case user loses 2FA)
    async generateRecoveryCodes(userId: string): Promise<string[]> {
        const codes = Array.from({ length: 10 }, () => 
            crypto.randomBytes(4).toString('hex').toUpperCase()
        );
        
        const encryptedCodes = await this.encryptionService.encrypt(JSON.stringify(codes));
        
        await this.db.update(users)
            .set({
                recoveryCodes: encryptedCodes,
                updatedAt: new Date()
            })
            .where(eq(users.id, userId));
        
        return codes;
    }
}
