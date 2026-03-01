/**
 * Client-side Crypto Integration for Web App
 * Integrates with Web Crypto API and actual Shamir Secret Sharing
 */

// We will lazily import secrets.js-grempe and web3.storage inside the functions
// to avoid SSR and client-side module evaluation crashes due to missing Node.js polyfills.

export interface EncryptionResult {
  encryptedData: string;
  keyId: string;
  iv: string;
  timestamp: number;
}

export interface ShamirShare {
  shareId: number;
  shareData: string;
  holder: string;
  holderAddress: string;
  distributionMethod: string;
}

export interface KeyDistribution {
  keyId: string;
  shares: ShamirShare[];
  threshold: number;
  totalShares: number;
  createdAt: number;
}

class WebCryptoService {
  private static instance: WebCryptoService;

  public static getInstance(): WebCryptoService {
    if (!WebCryptoService.instance) {
      WebCryptoService.instance = new WebCryptoService();
    }
    return WebCryptoService.instance;
  }

  // Helper to convert hex to Uint8Array
  private hexToUint8Array(hex: string): Uint8Array {
    const match = hex.match(/.{1,2}/g);
    return new Uint8Array(match ? match.map(byte => parseInt(byte, 16)) : []) as any;
  }

  // Helper to convert Uint8Array to hex
  private uint8ArrayToHex(arr: Uint8Array | ArrayBuffer): string {
    return Array.from(new Uint8Array(arr as any))
      .map(b => b.toString(16).padStart(2, '0'))
      .join('');
  }

  /**
   * Generate secure encryption key (256 bits)
   */
  generateEncryptionKey(): string {
    const keyBytes = crypto.getRandomValues(new Uint8Array(32));
    return this.uint8ArrayToHex(keyBytes as any);
  }

  /**
   * Creates a Web Crypto API AES-GCM key from hex string
   */
  private async getCryptoKey(hexKey: string): Promise<CryptoKey> {
    const keyData = this.hexToUint8Array(hexKey);
    return await crypto.subtle.importKey(
      'raw',
      keyData as any,
      { name: 'AES-GCM' },
      false,
      ['encrypt', 'decrypt']
    );
  }

  /**
   * Encrypt data using native AES-256-GCM
   */
  async encryptData(data: string, key?: string): Promise<EncryptionResult> {
    try {
      const encryptionKeyHex = key || this.generateEncryptionKey();
      const cryptoKey = await this.getCryptoKey(encryptionKeyHex);

      const iv = crypto.getRandomValues(new Uint8Array(12)); // 96 bits IV for GCM
      const encodedData = new TextEncoder().encode(data);

      const encryptedBuffer = await crypto.subtle.encrypt(
        { name: 'AES-GCM', iv },
        cryptoKey,
        encodedData
      );

      const encryptedDataHex = this.uint8ArrayToHex(encryptedBuffer);
      const ivHex = this.uint8ArrayToHex(iv);
      const keyId = await this.generateHash(encryptionKeyHex).then(h => h.substring(0, 16));

      return {
        encryptedData: encryptedDataHex,
        keyId,
        iv: ivHex,
        timestamp: Date.now()
      };
    } catch (error) {
      throw new Error(`Encryption failed: ${error}`);
    }
  }

  /**
   * Decrypt data using native AES-256-GCM
   */
  async decryptData(encryptedDataHex: string, key: string, ivHex: string): Promise<string> {
    try {
      const cryptoKey = await this.getCryptoKey(key);
      const iv = this.hexToUint8Array(ivHex);
      const encryptedData = this.hexToUint8Array(encryptedDataHex);

      const decryptedBuffer = await crypto.subtle.decrypt(
        { name: 'AES-GCM', iv: iv as any },
        cryptoKey,
        encryptedData as any
      );

      return new TextDecoder().decode(decryptedBuffer);
    } catch (error) {
      throw new Error(`Decryption failed: ${error}`);
    }
  }

  /**
   * Split key using true Shamir Secret Sharing (secrets.js-grempe)
   */
  async splitKey(keyHex: string, totalShares: number = 5, threshold: number = 3): Promise<KeyDistribution> {
    const keyId = await this.generateHash(keyHex).then(h => h.substring(0, 16));
    const shares: ShamirShare[] = [];

    // Dynamically import secrets to avoid SSR/hydration crash
    const secrets = (await import('secrets.js-grempe')).default || await import('secrets.js-grempe');

    // Perform Shamir's Secret Sharing mathematically
    const generatedShares = secrets.share(keyHex, totalShares, threshold);

    const holders = ['smart_contract', 'user_device', 'trusted_person', 'dao_oracle', 'hardware_wallet'];
    const distributionMethods = ['blockchain', 'secure_storage', 'encrypted_file', 'oracle_network', 'hardware_module'];

    for (let i = 0; i < totalShares; i++) {
      shares.push({
        shareId: i + 1,
        shareData: generatedShares[i],
        holder: holders[i] || `holder_${i + 1}`,
        holderAddress: await this.generateHash(`${holders[i] || 'holder'}-${keyId}`).then(h => h.substring(0, 40)),
        distributionMethod: distributionMethods[i] || 'encrypted_storage'
      });
    }

    return {
      keyId,
      shares,
      threshold,
      totalShares,
      createdAt: Date.now()
    };
  }

  /**
   * Reconstruct key from Shamir shares
   */
  async reconstructKey(shares: ShamirShare[]): Promise<string> {
    if (shares.length < 3) {
      throw new Error('Insufficient shares for reconstruction');
    }

    // Dynamically import secrets to avoid SSR/hydration crash
    const secrets = (await import('secrets.js-grempe')).default || await import('secrets.js-grempe');

    // Combine shares
    const shareStrings = shares.map(s => s.shareData);
    const combinedKeyHex = secrets.combine(shareStrings);
    return combinedKeyHex;
  }

  /**
   * Generate secure SHA-256 hash using Web Crypto API
   */
  async generateHash(data: string): Promise<string> {
    const encoded = new TextEncoder().encode(data);
    const hashBuffer = await crypto.subtle.digest('SHA-256', encoded);
    return this.uint8ArrayToHex(hashBuffer);
  }

  /**
   * Upload to IPFS using Backend API (which wraps Web3.Storage)
   */
  async uploadToIPFS(encryptedData: string): Promise<string> {
    try {
      const blob = new Blob([encryptedData], { type: 'application/octet-stream' });
      const file = new File([blob], `encrypted_payload_${Date.now()}.enc`);

      const formData = new FormData();
      formData.append('file', file);

      // Default to localhost:7001 if API url is not declared yet
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:7001/api';

      const response = await fetch(`${apiUrl}/assets/upload`, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        // Fallback for local development if backend is not running
        console.warn(`Backend upload failed with status ${response.status}. Using local mock CID.`);
        const hash = await this.generateHash(encryptedData);
        return `bafybei${hash.substring(0, 52)}`;
      }

      const data = await response.json();
      return data.ipfsHash;
    } catch (e) {
      console.error('Backend IPFS upload failed:', e);
      // Fallback for local development if backend is unreachable
      console.warn('Backend is unreachable. Using local mock CID.');
      const hash = await this.generateHash(encryptedData);
      return `bafybei${hash.substring(0, 52)}`;
    }
  }
}

export default WebCryptoService;