import * as crypto from 'crypto';
import { KMS } from 'aws-sdk'; // Or Google KMS, Azure KeyVault
import { Injectable, Inject, Logger } from '@nestjs/common';
import { eq, and, desc, between } from 'drizzle-orm';
import { users } from '../../src/db/schema/users';
import { userKeys } from '../../src/db/schema/userKeys';
import { files } from '../../src/db/schema/files';

export interface EncryptedFile {
    encrypted: Buffer;
    encryptedFEK: string;
    fekIv: string;
    fekAuthTag: string;
    fileIv: string;
    fileAuthTag: string;
}

export interface EncryptedData {
    encrypted: Buffer;
    iv: Buffer;
    authTag: Buffer;
}

@Injectable()
export class SecureEncryptionService {
    private readonly ALGORITHM = 'aes-256-gcm';
    private readonly KEY_LENGTH = 32;
    private readonly IV_LENGTH = 12;
    private readonly AUTH_TAG_LENGTH = 16;
    private readonly SALT_LENGTH = 64;
    private readonly ITERATIONS = 100000; // PBKDF2 iterations
    private readonly logger = new Logger(SecureEncryptionService.name);
    
    private kms: KMS;

    constructor(@Inject('DRIZZLE_DB') private db: any) {
        this.kms = new KMS({
            region: process.env.AWS_REGION || 'us-east-1'
        });
    }
    
    // Generate Master Key from environment (with KMS integration)
    private async getMasterKey(): Promise<Buffer> {
        try {
            if (process.env.NODE_ENV === 'development' && !process.env.ENCRYPTION_MASTER_KEY_CIPHER) {
                // Return a dummy key for local dev if KMS not configured
                return Buffer.from('01234567890123456789012345678901');
            }
            const { Plaintext } = await this.kms.decrypt({
                CiphertextBlob: Buffer.from(process.env.ENCRYPTION_MASTER_KEY_CIPHER!, 'base64')
            }).promise();
            return Plaintext as Buffer;
        } catch (error) {
            this.logger.error('Failed to decrypt master key via KMS', error);
            // Fallback for development if needed, but in production this should fail
            if (process.env.ENCRYPTION_MASTER_KEY) {
                return Buffer.from(process.env.ENCRYPTION_MASTER_KEY, 'hex');
            }
            throw new Error('Could not retrieve encryption master key');
        }
    }
    
    // Generate User Data Encryption Key (DEK)
    async generateUserDEK(userId: string): Promise<string> {
        const masterKey = await this.getMasterKey();
        const userSalt = crypto.randomBytes(this.SALT_LENGTH);
        
        // Derive user-specific key using PBKDF2
        const userKey = crypto.pbkdf2Sync(
            masterKey,
            userSalt,
            this.ITERATIONS,
            this.KEY_LENGTH,
            'sha512'
        );
        
        // Store encrypted in database
        const encryptedDEK = this.encryptWithKey(userKey, masterKey);
        
        await this.db.insert(userKeys).values({
            userId,
            encryptedDEK: encryptedDEK.encrypted.toString('base64'),
            iv: encryptedDEK.iv.toString('hex'),
            authTag: encryptedDEK.authTag.toString('hex'),
            salt: userSalt.toString('hex'),
            createdAt: new Date()
        });
        
        return userKey.toString('hex');
    }

    async getUserDEK(userId: string): Promise<string> {
        const keyRecord = await this.db.query.userKeys.findFirst({
            where: eq(userKeys.userId, userId),
            orderBy: [desc(userKeys.createdAt)]
        });

        if (!keyRecord) {
            return await this.generateUserDEK(userId);
        }

        const masterKey = await this.getMasterKey();
        const userKey = this.decryptWithKey(
            Buffer.from(keyRecord.encryptedDEK, 'base64'),
            Buffer.from(keyRecord.iv, 'hex'),
            Buffer.from(keyRecord.authTag, 'hex'),
            masterKey
        );

        return userKey.toString('hex');
    }
    
    // Encrypt file with user's DEK
    async encryptFile(file: Buffer, userId: string): Promise<EncryptedFile> {
        // Get user's DEK
        const userDEK = await this.getUserDEK(userId);
        
        // Generate per-file encryption key (FEK)
        const fek = crypto.randomBytes(this.KEY_LENGTH);
        const iv = crypto.randomBytes(this.IV_LENGTH);
        
        // Encrypt file with FEK
        const cipher = crypto.createCipheriv(this.ALGORITHM, fek, iv);
        const encrypted = Buffer.concat([cipher.update(file), cipher.final()]);
        const authTag = cipher.getAuthTag();
        
        // Encrypt FEK with user's DEK (Envelope Encryption)
        const encryptedFEK = this.encryptWithKey(fek, Buffer.from(userDEK, 'hex'));
        
        return {
            encrypted,
            encryptedFEK: encryptedFEK.encrypted.toString('base64'),
            fekIv: encryptedFEK.iv.toString('hex'),
            fekAuthTag: encryptedFEK.authTag.toString('hex'),
            fileIv: iv.toString('hex'),
            fileAuthTag: authTag.toString('hex')
        };
    }
    
    // Decrypt file with user's DEK
    async decryptFile(fileId: string, userId: string, encryptedFileBuffer: Buffer): Promise<Buffer> {
        // Get file metadata
        const file = await this.db.query.files.findFirst({
            where: eq(files.id, fileId)
        });

        if (!file) throw new Error('File not found');
        
        // Get user's DEK
        const userDEK = await this.getUserDEK(userId);
        
        // Decrypt FEK using user's DEK
        const fek = this.decryptWithKey(
            Buffer.from(file.encryptedFEK, 'base64'),
            Buffer.from(file.fekIv, 'hex'),
            Buffer.from(file.fekAuthTag, 'hex'),
            Buffer.from(userDEK, 'hex')
        );
        
        // Decrypt file using FEK
        const decipher = crypto.createDecipheriv(
            this.ALGORITHM,
            fek,
            Buffer.from(file.fileIv, 'hex')
        );
        decipher.setAuthTag(Buffer.from(file.fileAuthTag, 'hex'));
        
        return Buffer.concat([decipher.update(encryptedFileBuffer), decipher.final()]);
    }
    
    // Helper: Encrypt with specific key
    private encryptWithKey(data: Buffer, key: Buffer): EncryptedData {
        const iv = crypto.randomBytes(this.IV_LENGTH);
        const cipher = crypto.createCipheriv(this.ALGORITHM, key, iv);
        const encrypted = Buffer.concat([cipher.update(data), cipher.final()]);
        const authTag = cipher.getAuthTag();
        
        return { encrypted, iv, authTag };
    }
    
    // Helper: Decrypt with specific key
    private decryptWithKey(encrypted: Buffer, iv: Buffer, authTag: Buffer, key: Buffer): Buffer {
        const decipher = crypto.createDecipheriv(this.ALGORITHM, key, iv);
        decipher.setAuthTag(authTag);
        return Buffer.concat([decipher.update(encrypted), decipher.final()]);
    }

    // Public general purpose encryption (using Master Key)
    async encrypt(text: string): Promise<string> {
        const masterKey = await this.getMasterKey();
        const encrypted = this.encryptWithKey(Buffer.from(text), masterKey);
        return `${encrypted.iv.toString('hex')}:${encrypted.authTag.toString('hex')}:${encrypted.encrypted.toString('base64')}`;
    }

    async decrypt(encryptedText: string): Promise<string> {
        const [ivHex, authTagHex, encryptedBase64] = encryptedText.split(':');
        const masterKey = await this.getMasterKey();
        const decrypted = this.decryptWithKey(
            Buffer.from(encryptedBase64, 'base64'),
            Buffer.from(ivHex, 'hex'),
            Buffer.from(authTagHex, 'hex'),
            masterKey
        );
        return decrypted.toString();
    }
}
