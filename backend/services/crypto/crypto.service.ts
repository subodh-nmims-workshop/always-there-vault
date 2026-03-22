import { Injectable, Logger, BadRequestException } from '@nestjs/common';
import * as crypto from 'crypto';

// Use the newly installed valid Shamir's Secret Sharing library
import * as sss from 'shamirs-secret-sharing';

export interface ShamirConfig {
    shares: number;
    threshold: number;
}

export interface EncryptedDocument {
    encrypted: string;
    keyId: string;
}

export interface ShareDistribution {
    shares: string[]; // hexadecimal representations of the shares
    keyId: string;
}

@Injectable()
export class CryptoService {
    private readonly logger = new Logger(CryptoService.name);

    /**
     * Splits a master key into `shares` parts, requiring `threshold` parts to reconstruct.
     * Uses cryptographically secure Shamir's Secret Sharing (Galois Field / Polynomial interpolation).
     */
    splitKey(masterKeyHex: string, conf: ShamirConfig = { shares: 5, threshold: 3 }): ShareDistribution {
        this.logger.log(`Splitting key into ${conf.shares} shares with threshold ${conf.threshold}`);
        
        if (!masterKeyHex || masterKeyHex.length === 0) {
            throw new BadRequestException('Master key cannot be empty');
        }

        if (conf.threshold > conf.shares) {
            throw new BadRequestException('Threshold cannot exceed total shares');
        }

        // Generate a deterministic identifier for this key based on a hash
        const keyId = crypto.createHash('sha256').update(masterKeyHex).digest('hex').substring(0, 16);
        const secretBuffer = Buffer.from(masterKeyHex, 'hex');

        // Split the secret buffer
        const shares = sss.split(secretBuffer, {
            shares: conf.shares,
            threshold: conf.threshold,
        });

        // Convert byte buffers to hex strings for storage
        const hexShares = shares.map((s: Buffer) => s.toString('hex'));

        return {
            shares: hexShares,
            keyId,
        };
    }

    /**
     * Reconstructs a master key from a given set of `shares`.
     * If the number of provided shares is less than the threshold, it will throw or return garbage.
     */
    reconstructKey(hexShares: string[]): string {
        this.logger.log(`Reconstructing key from ${hexShares.length} shares`);
        if (hexShares.length < 2) {
            throw new BadRequestException('At least 2 shares are needed to attempt reconstruction');
        }

        try {
            const shareBuffers = hexShares.map(s => Buffer.from(s, 'hex'));
            const recovered = sss.combine(shareBuffers);
            return recovered.toString('hex');
        } catch (error) {
            this.logger.error('Failed to reconstruct key from shares', error);
            throw new BadRequestException('Invalid or insufficient shares provided.');
        }
    }

    // AES-256-GCM symmetric encryption methods (for document payloads or large strings)
    encryptData(plaintext: string): EncryptedDocument {
        const key = crypto.randomBytes(32);
        const iv = crypto.randomBytes(12);
        const cipher = crypto.createCipheriv('aes-256-gcm', key, iv);
        
        let encrypted = cipher.update(plaintext, 'utf8', 'hex');
        encrypted += cipher.final('hex');
        const authTag = cipher.getAuthTag();
        
        return {
            encrypted: `${iv.toString('hex')}:${authTag.toString('hex')}:${encrypted}`,
            keyId: key.toString('hex'), // This key should be split via Shamir's Secret Sharing!
        };
    }

    decryptData(encryptedPackage: string, keyHex: string): string {
        try {
            const [ivHex, authTagHex, encryptedData] = encryptedPackage.split(':');
            const iv = Buffer.from(ivHex, 'hex');
            const authTag = Buffer.from(authTagHex, 'hex');
            const key = Buffer.from(keyHex, 'hex');
            
            const decipher = crypto.createDecipheriv('aes-256-gcm', key, iv);
            decipher.setAuthTag(authTag);
            
            let decrypted = decipher.update(encryptedData, 'hex', 'utf8');
            decrypted += decipher.final('utf8');
            
            return decrypted;
        } catch (error) {
            this.logger.error('Decryption failed', error);
            throw new BadRequestException('Decryption failed. Invalid key or corrupted data.');
        }
    }
}
