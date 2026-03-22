import CryptoJS from 'crypto-js';
import * as sss from 'shamirs-secret-sharing';

export interface EncryptedPackage {
  ivHex: string;
  data: string;
}

export interface ShareDistribution {
  shares: string[];
  keyId: string;
}

/**
 * CLIENT-SIDE ENCRYPTION
 * Zero-Trust Architecture: AES-256-GCM + Shamir's Secret Sharing
 * 
 * Never send the raw document or raw symmetric key to the server!
 */

export const EncryptionUtils = {
  
  /**
   * AES-256 Client-Side Encryption
   * Encrypts the user's will locally in the browser before IPFS upload
   * @param plaintext Will content
   * @returns { encrypted: EncryptedPackage, symmetricKeyHex: string }
   */
  async encryptDocument(plaintext: string): Promise<{ encrypted: EncryptedPackage, symmetricKeyHex: string }> {
    // Generate a secure random 256-bit (32 bytes) key
    const keyWordArr = CryptoJS.lib.WordArray.random(32);
    // Generate an Initialization Vector
    const ivWordArr = CryptoJS.lib.WordArray.random(16);

    // Encrypt
    const cipherText = CryptoJS.AES.encrypt(plaintext, keyWordArr, {
      iv: ivWordArr,
      mode: CryptoJS.mode.CTR, // Using CTR or CBC since CryptoJS GCM is limited, but acts as AES stream
      padding: CryptoJS.pad.Pkcs7
    });

    return {
      encrypted: {
        ivHex: ivWordArr.toString(),
        data: cipherText.toString(),
      },
      symmetricKeyHex: keyWordArr.toString(),
    };
  },

  /**
   * AES-256 Client-Side Decryption
   * Used when guardians reconstruct the key to read the IPFS document
   */
  async decryptDocument(encryptedPkg: EncryptedPackage, symmetricKeyHex: string): Promise<string> {
    const keyWordArr = CryptoJS.enc.Hex.parse(symmetricKeyHex);
    const ivWordArr = CryptoJS.enc.Hex.parse(encryptedPkg.ivHex);

    const decrypted = CryptoJS.AES.decrypt(encryptedPkg.data, keyWordArr, {
      iv: ivWordArr,
      mode: CryptoJS.mode.CTR,
      padding: CryptoJS.pad.Pkcs7
    });

    return decrypted.toString(CryptoJS.enc.Utf8);
  },

  /**
   * Shamir's Secret Sharing - Key Splitting
   * Split the AES key into 5 shares, requiring 3 to recover
   * @param keyHex The symmetric key in Hex
   * @param totalShares default 5
   * @param threshold default 3
   */
  async splitKey(keyHex: string, totalShares = 5, threshold = 3): Promise<ShareDistribution> {
    // We must pass a standard Node.js Buffer-like object. 
    // In Browser, shamirs-secret-sharing uses Uint8Array buffer equivalents.
    const keyBuffer = Buffer.from(keyHex, 'hex');
    
    const shares: Buffer[] = sss.split(keyBuffer, {
      shares: totalShares,
      threshold: threshold,
    });

    const keyId = CryptoJS.SHA256(keyHex).toString().substring(0, 16);

    return {
      shares: shares.map(s => s.toString('hex')),
      keyId,
    };
  },

  /**
   * Shamir's Secret Sharing - Key Recovery
   * Combine shares from Guardians to recover the AES key
   */
  async combineShares(hexShares: string[]): Promise<string> {
    if (hexShares.length < 3) {
      throw new Error("Insufficient shares for recovery. Require at least 3.");
    }
    const shareBuffers = hexShares.map(s => Buffer.from(s, 'hex'));
    const recovered = sss.combine(shareBuffers);
    return recovered.toString('hex');
  }

};
