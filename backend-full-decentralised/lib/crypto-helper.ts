/**
 * Crypto Helper Library
 * Client-side encryption utilities
 */

/**
 * Generate random encryption key
 */
export async function generateEncryptionKey(): Promise<CryptoKey> {
  return await crypto.subtle.generateKey(
    {
      name: 'AES-GCM',
      length: 256
    },
    true,
    ['encrypt', 'decrypt']
  )
}

/**
 * Export key to base64
 */
export async function exportKey(key: CryptoKey): Promise<string> {
  const exported = await crypto.subtle.exportKey('raw', key)
  return btoa(String.fromCharCode(...new Uint8Array(exported)))
}

/**
 * Import key from base64
 */
export async function importKey(keyString: string): Promise<CryptoKey> {
  const keyData = Uint8Array.from(atob(keyString), c => c.charCodeAt(0))
  
  return await crypto.subtle.importKey(
    'raw',
    keyData,
    'AES-GCM',
    true,
    ['encrypt', 'decrypt']
  )
}

/**
 * Encrypt data with key
 */
export async function encryptData(
  data: string | ArrayBuffer,
  key: CryptoKey
): Promise<ArrayBuffer> {
  const encoder = new TextEncoder()
  const dataBuffer = typeof data === 'string' ? encoder.encode(data) : data
  
  const iv = crypto.getRandomValues(new Uint8Array(12))
  const encrypted = await crypto.subtle.encrypt(
    { name: 'AES-GCM', iv },
    key,
    dataBuffer
  )
  
  // Combine IV and encrypted data
  const result = new Uint8Array(iv.length + encrypted.byteLength)
  result.set(iv, 0)
  result.set(new Uint8Array(encrypted), iv.length)
  
  return result.buffer
}

/**
 * Decrypt data with key
 */
export async function decryptData(
  encryptedData: ArrayBuffer,
  key: CryptoKey
): Promise<string> {
  const data = new Uint8Array(encryptedData)
  const iv = data.slice(0, 12)
  const encrypted = data.slice(12)
  
  const decrypted = await crypto.subtle.decrypt(
    { name: 'AES-GCM', iv },
    key,
    encrypted
  )
  
  const decoder = new TextDecoder()
  return decoder.decode(decrypted)
}

/**
 * Hash data with SHA-256
 */
export async function hashData(data: string): Promise<string> {
  const encoder = new TextEncoder()
  const dataBuffer = encoder.encode(data)
  const hashBuffer = await crypto.subtle.digest('SHA-256', dataBuffer)
  
  return btoa(String.fromCharCode(...new Uint8Array(hashBuffer)))
}

/**
 * Generate random password
 */
export function generatePassword(length = 32): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*'
  const randomValues = crypto.getRandomValues(new Uint8Array(length))
  
  return Array.from(randomValues)
    .map(x => chars[x % chars.length])
    .join('')
}

/**
 * Derive key from password using PBKDF2
 */
export async function deriveKeyFromPassword(
  password: string,
  salt?: string
): Promise<CryptoKey> {
  const encoder = new TextEncoder()
  const passwordBuffer = encoder.encode(password)
  const saltBuffer = encoder.encode(salt || 'alwaysthere-protocol-salt')
  
  const keyMaterial = await crypto.subtle.importKey(
    'raw',
    passwordBuffer,
    'PBKDF2',
    false,
    ['deriveBits', 'deriveKey']
  )
  
  return await crypto.subtle.deriveKey(
    {
      name: 'PBKDF2',
      salt: saltBuffer,
      iterations: 100000,
      hash: 'SHA-256'
    },
    keyMaterial,
    { name: 'AES-GCM', length: 256 },
    true,
    ['encrypt', 'decrypt']
  )
}

/**
 * Encrypt file
 */
export async function encryptFile(
  file: File,
  key: CryptoKey
): Promise<ArrayBuffer> {
  const buffer = await file.arrayBuffer()
  return await encryptData(buffer, key)
}

/**
 * Decrypt file
 */
export async function decryptFile(
  encryptedData: ArrayBuffer,
  key: CryptoKey,
  filename: string,
  mimeType: string
): Promise<File> {
  const decrypted = await crypto.subtle.decrypt(
    { name: 'AES-GCM', iv: new Uint8Array(encryptedData.slice(0, 12)) },
    key,
    encryptedData.slice(12)
  )
  
  return new File([decrypted], filename, { type: mimeType })
}

/**
 * Generate Shamir Secret Shares (simplified version)
 * For production, use a proper library like secrets.js
 */
export function generateShares(
  secret: string,
  totalShares: number,
  threshold: number
): string[] {
  // This is a simplified implementation
  // In production, use a proper Shamir Secret Sharing library
  
  const shares: string[] = []
  const encoder = new TextEncoder()
  const secretBytes = encoder.encode(secret)
  
  for (let i = 0; i < totalShares; i++) {
    const shareData = new Uint8Array(secretBytes.length + 4)
    shareData.set([i + 1, totalShares, threshold, 0], 0)
    shareData.set(secretBytes, 4)
    
    // XOR with random data for each share
    const random = crypto.getRandomValues(new Uint8Array(secretBytes.length))
    for (let j = 0; j < secretBytes.length; j++) {
      shareData[j + 4] ^= random[j]
    }
    
    shares.push(btoa(String.fromCharCode(...shareData)))
  }
  
  return shares
}

/**
 * Combine Shamir Secret Shares (simplified version)
 */
export function combineShares(shares: string[]): string {
  // This is a simplified implementation
  // In production, use a proper Shamir Secret Sharing library
  
  if (shares.length === 0) {
    throw new Error('No shares provided')
  }
  
  const firstShare = Uint8Array.from(atob(shares[0]), c => c.charCodeAt(0))
  const threshold = firstShare[2]
  
  if (shares.length < threshold) {
    throw new Error(`Need at least ${threshold} shares to reconstruct secret`)
  }
  
  // Simplified reconstruction - just return the secret from first share
  // In production, use proper Shamir reconstruction
  const secretBytes = firstShare.slice(4)
  const decoder = new TextDecoder()
  
  return decoder.decode(secretBytes)
}

/**
 * Generate mnemonic phrase (BIP39-like)
 */
export function generateMnemonic(wordCount = 12): string {
  const words = [
    'abandon', 'ability', 'able', 'about', 'above', 'absent', 'absorb', 'abstract',
    'absurd', 'abuse', 'access', 'accident', 'account', 'accuse', 'achieve', 'acid',
    // Add more words for production use
  ]
  
  const randomIndices = crypto.getRandomValues(new Uint8Array(wordCount))
  return Array.from(randomIndices)
    .map(i => words[i % words.length])
    .join(' ')
}

/**
 * Validate mnemonic phrase
 */
export function validateMnemonic(mnemonic: string): boolean {
  const words = mnemonic.trim().split(/\s+/)
  return words.length === 12 || words.length === 24
}
