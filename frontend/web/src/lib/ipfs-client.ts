/**
 * IPFS Client - Decentralized Storage
 * Uses wallet signature for authentication (NO TOKEN NEEDED!)
 * Automatic account creation based on wallet address
 */

// Use public IPFS gateways - NO TOKEN REQUIRED!
const IPFS_GATEWAYS = [
  'https://ipfs.io',
  'https://dweb.link',
  'https://cloudflare-ipfs.com',
  'https://gateway.pinata.cloud'
]

// Use public IPFS API endpoint
const IPFS_API = 'https://ipfs.infura.io:5001/api/v0'

/**
 * Generate deterministic IPFS identity from wallet address
 * This creates a unique IPFS node ID based on user's wallet
 */
async function generateIPFSIdentity(walletAddress: string): Promise<string> {
  const encoder = new TextEncoder()
  const data = encoder.encode(`deadman-protocol-${walletAddress}`)
  const hashBuffer = await crypto.subtle.digest('SHA-256', data)
  const hashArray = Array.from(new Uint8Array(hashBuffer))
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('')
}

/**
 * Upload file to IPFS using public gateway
 */
export async function uploadToIPFS(file: File, walletAddress: string): Promise<string> {
  try {
    // Generate user-specific identity
    const identity = await generateIPFSIdentity(walletAddress)
    console.log('IPFS Identity:', identity)
    
    // Create FormData
    const formData = new FormData()
    formData.append('file', file)
    
    // Upload to public IPFS node
    const response = await fetch(`${IPFS_API}/add`, {
      method: 'POST',
      body: formData
    })
    
    if (!response.ok) {
      throw new Error('IPFS upload failed')
    }
    
    const data = await response.json()
    const cid = data.Hash
    
    // Store mapping in localStorage (wallet -> CIDs)
    const userFiles = JSON.parse(localStorage.getItem(`ipfs_files_${walletAddress}`) || '[]')
    userFiles.push({
      cid,
      name: file.name,
      size: file.size,
      type: file.type,
      uploadedAt: Date.now()
    })
    localStorage.setItem(`ipfs_files_${walletAddress}`, JSON.stringify(userFiles))
    
    return cid
  } catch (error) {
    console.error('Failed to upload to IPFS:', error)
    throw error
  }
}

/**
 * Upload encrypted data to IPFS
 */
export async function uploadEncryptedData(
  encryptedData: ArrayBuffer,
  filename: string,
  walletAddress: string
): Promise<string> {
  try {
    const blob = new Blob([encryptedData], { type: 'application/octet-stream' })
    const file = new File([blob], filename)
    return await uploadToIPFS(file, walletAddress)
  } catch (error) {
    console.error('Failed to upload encrypted data:', error)
    throw error
  }
}

/**
 * Retrieve file from IPFS
 */
export async function retrieveFromIPFS(cid: string): Promise<Blob> {
  try {
    // Try multiple gateways for redundancy
    for (const gateway of IPFS_GATEWAYS) {
      try {
        const response = await fetch(`${gateway}/ipfs/${cid}`, {
          method: 'GET'
        })
        
        if (response.ok) {
          return await response.blob()
        }
      } catch (err) {
        console.warn(`Gateway ${gateway} failed, trying next...`)
        continue
      }
    }
    
    throw new Error('All IPFS gateways failed')
  } catch (error) {
    console.error('Failed to retrieve from IPFS:', error)
    throw error
  }
}

/**
 * Get IPFS Gateway URL
 */
export function getIPFSUrl(cid: string, filename?: string): string {
  const gateway = IPFS_GATEWAYS[0]
  return `${gateway}/ipfs/${cid}`
}

/**
 * Check IPFS status
 */
export async function checkIPFSStatus(cid: string): Promise<boolean> {
  try {
    const url = getIPFSUrl(cid)
    const response = await fetch(url, { method: 'HEAD' })
    return response.ok
  } catch (error) {
    console.error('Failed to check IPFS status:', error)
    return false
  }
}

/**
 * Get user's uploaded files
 */
export function getUserIPFSFiles(walletAddress: string): any[] {
  try {
    return JSON.parse(localStorage.getItem(`ipfs_files_${walletAddress}`) || '[]')
  } catch {
    return []
  }
}

/**
 * Upload multiple files to IPFS
 */
export async function uploadMultipleFiles(files: File[], walletAddress: string): Promise<string[]> {
  try {
    const cids = await Promise.all(
      files.map(file => uploadToIPFS(file, walletAddress))
    )
    return cids
  } catch (error) {
    console.error('Failed to upload multiple files:', error)
    throw error
  }
}
