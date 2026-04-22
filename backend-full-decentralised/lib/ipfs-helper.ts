/**
 * IPFS Helper Library
 * Utility functions for IPFS operations
 */

import { Web3Storage, File as Web3File } from 'web3.storage'

/**
 * Create IPFS client
 */
export function createIPFSClient(token: string) {
  if (!token) {
    throw new Error('web3.storage token is required')
  }
  return new Web3Storage({ token })
}

/**
 * Upload file to IPFS
 */
export async function uploadFile(
  client: Web3Storage,
  file: File
): Promise<string> {
  const buffer = await file.arrayBuffer()
  const web3File = new Web3File([buffer], file.name, { type: file.type })
  
  const cid = await client.put([web3File], {
    name: file.name,
    maxRetries: 3,
    wrapWithDirectory: false
  })
  
  return cid
}

/**
 * Upload encrypted data
 */
export async function uploadEncryptedData(
  client: Web3Storage,
  data: ArrayBuffer,
  filename: string
): Promise<string> {
  const file = new Web3File([data], filename, {
    type: 'application/octet-stream'
  })
  
  const cid = await client.put([file], {
    name: filename,
    maxRetries: 3,
    wrapWithDirectory: false
  })
  
  return cid
}

/**
 * Upload JSON data
 */
export async function uploadJSON(
  client: Web3Storage,
  data: any,
  filename: string
): Promise<string> {
  const json = JSON.stringify(data)
  const blob = new Blob([json], { type: 'application/json' })
  const buffer = await blob.arrayBuffer()
  
  const file = new Web3File([buffer], filename, {
    type: 'application/json'
  })
  
  const cid = await client.put([file], {
    name: filename,
    maxRetries: 3,
    wrapWithDirectory: false
  })
  
  return cid
}

/**
 * Upload multiple files
 */
export async function uploadMultipleFiles(
  client: Web3Storage,
  files: File[]
): Promise<string> {
  const web3Files = await Promise.all(
    files.map(async (file) => {
      const buffer = await file.arrayBuffer()
      return new Web3File([buffer], file.name, { type: file.type })
    })
  )
  
  const cid = await client.put(web3Files, {
    name: 'asset-bundle',
    maxRetries: 3,
    wrapWithDirectory: true
  })
  
  return cid
}

/**
 * Retrieve file from IPFS
 */
export async function retrieveFile(
  client: Web3Storage,
  cid: string
): Promise<File | null> {
  const res = await client.get(cid)
  
  if (!res || !res.ok) {
    throw new Error('Failed to retrieve from IPFS')
  }
  
  const files = await res.files()
  return files[0] || null
}

/**
 * Retrieve JSON from IPFS
 */
export async function retrieveJSON(
  client: Web3Storage,
  cid: string
): Promise<any> {
  const file = await retrieveFile(client, cid)
  
  if (!file) {
    throw new Error('File not found on IPFS')
  }
  
  const text = await file.text()
  return JSON.parse(text)
}

/**
 * Get IPFS gateway URL
 */
export function getIPFSUrl(cid: string, filename?: string): string {
  const gateways = [
    'https://dweb.link/ipfs',
    'https://ipfs.io/ipfs',
    'https://cloudflare-ipfs.com/ipfs',
    'https://gateway.pinata.cloud/ipfs'
  ]
  
  const gateway = gateways[0]
  const path = filename ? `${cid}/${filename}` : cid
  
  return `${gateway}/${path}`
}

/**
 * Check if CID is valid
 */
export function isValidCID(cid: string): boolean {
  // Basic CID validation (v0 and v1)
  const cidV0Regex = /^Qm[1-9A-HJ-NP-Za-km-z]{44}$/
  const cidV1Regex = /^b[A-Za-z2-7]{58}$/
  
  return cidV0Regex.test(cid) || cidV1Regex.test(cid)
}

/**
 * Get file from IPFS via HTTP
 */
export async function fetchFromIPFS(cid: string): Promise<Response> {
  const url = getIPFSUrl(cid)
  
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Accept': '*/*'
    }
  })
  
  if (!response.ok) {
    throw new Error(`Failed to fetch from IPFS: ${response.statusText}`)
  }
  
  return response
}

/**
 * Check if file exists on IPFS
 */
export async function checkIPFSStatus(cid: string): Promise<boolean> {
  try {
    const url = getIPFSUrl(cid)
    const response = await fetch(url, { method: 'HEAD' })
    return response.ok
  } catch {
    return false
  }
}

/**
 * Get storage info
 */
export async function getStorageInfo(client: Web3Storage) {
  try {
    const uploads = await client.list({ maxResults: 100 })
    const uploadList = Array.from(uploads)
    
    return {
      success: true,
      totalUploads: uploadList.length,
      uploads: uploadList.map(upload => ({
        cid: upload.cid,
        name: upload.name,
        created: upload.created
      }))
    }
  } catch (error: any) {
    return {
      success: false,
      error: error.message
    }
  }
}

/**
 * Encrypt data before IPFS upload
 */
export async function encryptForIPFS(
  data: string | ArrayBuffer,
  password: string
): Promise<ArrayBuffer> {
  const encoder = new TextEncoder()
  const dataBuffer = typeof data === 'string' ? encoder.encode(data) : data
  
  // Generate key from password
  const passwordBuffer = encoder.encode(password)
  const keyMaterial = await crypto.subtle.importKey(
    'raw',
    passwordBuffer,
    'PBKDF2',
    false,
    ['deriveBits', 'deriveKey']
  )
  
  const key = await crypto.subtle.deriveKey(
    {
      name: 'PBKDF2',
      salt: encoder.encode('lastwish-protocol-salt'),
      iterations: 100000,
      hash: 'SHA-256'
    },
    keyMaterial,
    { name: 'AES-GCM', length: 256 },
    false,
    ['encrypt']
  )
  
  // Encrypt data
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
 * Decrypt data from IPFS
 */
export async function decryptFromIPFS(
  encryptedData: ArrayBuffer,
  password: string
): Promise<string> {
  const encoder = new TextEncoder()
  const decoder = new TextDecoder()
  
  // Extract IV and encrypted data
  const data = new Uint8Array(encryptedData)
  const iv = data.slice(0, 12)
  const encrypted = data.slice(12)
  
  // Generate key from password
  const passwordBuffer = encoder.encode(password)
  const keyMaterial = await crypto.subtle.importKey(
    'raw',
    passwordBuffer,
    'PBKDF2',
    false,
    ['deriveBits', 'deriveKey']
  )
  
  const key = await crypto.subtle.deriveKey(
    {
      name: 'PBKDF2',
      salt: encoder.encode('lastwish-protocol-salt'),
      iterations: 100000,
      hash: 'SHA-256'
    },
    keyMaterial,
    { name: 'AES-GCM', length: 256 },
    false,
    ['decrypt']
  )
  
  // Decrypt data
  const decrypted = await crypto.subtle.decrypt(
    { name: 'AES-GCM', iv },
    key,
    encrypted
  )
  
  return decoder.decode(decrypted)
}
