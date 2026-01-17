/**
 * AES-256 encryption utilities for digital asset storage
 * Ensures private keys are never stored in plain text
 */

const crypto = require('crypto');

export interface EncryptionResult {
  encryptedData: string;
  keyId: string;
}

export interface DecryptionResult {
  decryptedData: string;
  success: boolean;
}

/**
 * Generates a secure AES-256 encryption key
 */
export function generateEncryptionKey(): string {
  return crypto.randomBytes(32).toString('hex'); // 256 bits = 32 bytes
}

/**
 * Encrypts data using AES-256 encryption
 */
export function encryptData(data: string, key: string): EncryptionResult {
  if (!data || !key) {
    throw new Error('Data and key are required for encryption');
  }
  
  if (key.length !== 64) { // 32 bytes = 64 hex characters
    throw new Error('Invalid key length for AES-256 encryption');
  }
  
  try {
    const iv = crypto.randomBytes(16); // 16 bytes IV for AES
    const cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(key, 'hex'), iv);
    let encrypted = cipher.update(data, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    
    // Prepend IV to encrypted data
    const encryptedWithIv = iv.toString('hex') + encrypted;
    
    const keyId = crypto.createHash('sha256').update(key).digest('hex').substring(0, 16);
    
    return {
      encryptedData: encryptedWithIv,
      keyId
    };
  } catch (error) {
    throw new Error(`Encryption failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

/**
 * Decrypts data using AES-256 decryption
 */
export function decryptData(encryptedData: string, key: string): DecryptionResult {
  if (!encryptedData || !key) {
    return { decryptedData: '', success: false };
  }
  
  if (key.length !== 64) { // 32 bytes = 64 hex characters
    return { decryptedData: '', success: false };
  }
  
  try {
    // Extract IV from the beginning of encrypted data
    const iv = Buffer.from(encryptedData.substring(0, 32), 'hex'); // First 32 hex chars = 16 bytes
    const encrypted = encryptedData.substring(32);
    
    const decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(key, 'hex'), iv);
    let decrypted = decipher.update(encrypted, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    
    return {
      decryptedData: decrypted,
      success: true
    };
  } catch (error) {
    return { decryptedData: '', success: false };
  }
}

/**
 * Validates that a string does not contain plain text private keys
 * This is a security check to ensure private keys are never stored unencrypted
 */
export function validateNoPlainTextKeys(data: string): boolean {
  // Common patterns that might indicate private keys
  const suspiciousPatterns = [
    /-----BEGIN PRIVATE KEY-----/,
    /-----BEGIN RSA PRIVATE KEY-----/,
    /-----BEGIN EC PRIVATE KEY-----/,
    /^[0-9a-fA-F]{64}$/, // 64-character hex string (common for crypto private keys)
    /^[0-9a-fA-F]{66}$/, // 66-character hex string with 0x prefix
    /^0x[0-9a-fA-F]{64}$/, // Ethereum private key format
  ];
  
  return !suspiciousPatterns.some(pattern => pattern.test(data));
}

/**
 * Securely wipes sensitive data from memory (best effort)
 */
export function secureWipe(sensitiveData: string): void {
  // Note: JavaScript doesn't provide true secure memory wiping
  // This is a best-effort approach
  if (typeof sensitiveData === 'string') {
    // Overwrite the string content (limited effectiveness in JS)
    for (let i = 0; i < sensitiveData.length; i++) {
      sensitiveData = sensitiveData.substring(0, i) + '0' + sensitiveData.substring(i + 1);
    }
  }
}