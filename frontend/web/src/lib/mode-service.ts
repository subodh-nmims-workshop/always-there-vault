/**
 * Mode Service - Handles Centralized vs Decentralized Operations
 */

import WebCryptoService from './crypto'
import WebStorageService, { StoredAsset } from './storage'
import type { UserMode } from '@/types/subscription'

export interface ModeConfig {
  mode: UserMode
  apiEndpoint?: string // For centralized
  contractAddress?: string // For decentralized
  ipfsGateway: string
}

class ModeService {
  private static instance: ModeService
  private currentMode: UserMode = 'centralized'
  private config: ModeConfig

  private constructor() {
    // Load mode from localStorage
    const savedMode = localStorage.getItem('dwp_mode') as UserMode
    this.currentMode = savedMode || 'centralized'

    this.config = {
      mode: this.currentMode,
      apiEndpoint: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:7001',
      contractAddress: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS,
      ipfsGateway: 'https://ipfs.io/ipfs/'
    }
  }

  public static getInstance(): ModeService {
    if (!ModeService.instance) {
      ModeService.instance = new ModeService()
    }
    return ModeService.instance
  }

  /**
   * Get current mode
   */
  getMode(): UserMode {
    return this.currentMode
  }

  /**
   * Switch mode and migrate assets
   */
  async switchMode(newMode: UserMode, onProgress?: (msg: string) => void): Promise<void> {
    if (this.currentMode === newMode) return

    console.log(`🔄 Switching mode from ${this.currentMode} to ${newMode}`)

    try {
      if (onProgress) onProgress(`Preparing migration to ${newMode}...`)
      await new Promise(resolve => setTimeout(resolve, 800)) // simulate prep Time

      // 1. Load existing assets
      if (onProgress) onProgress('Loading existing vault ledger...')
      const existingAssets = await this.loadAssets()

      // 2. Sync engine preference with backend
      if (onProgress) onProgress(`Syncing ${newMode} protocol with backend...`)
      try {
        const response = await fetch(`${this.config.apiEndpoint}/api/users/storage-engine`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('dwp_token')}`
          },
          body: JSON.stringify({ engine: newMode === 'centralized' ? 'cloud' : 'web3' })
        })

        const result = await response.json()
        if (!response.ok || !result.success) {
          throw new Error(result.message || `Failed to sync ${newMode} status with backend`)
        }
        console.log('✅ Backend storage engine updated')
      } catch (apiError: any) {
        console.warn('⚠️ Backend sync failed:', apiError.message)
        // If it's a "locked" message from backend, we MUST abort the migration
        if (apiError.message.includes('requires a Professional plan')) {
          throw apiError
        }
      }

      // 3. Set new mode context
      const oldMode = this.currentMode
      this.currentMode = newMode
      this.config.mode = newMode
      localStorage.setItem('dwp_mode', newMode)

      if (existingAssets.length > 0) {
        if (onProgress) onProgress(`Found ${existingAssets.length} assets. Restructuring payload...`)
        await new Promise(resolve => setTimeout(resolve, 1000))

        // 4. Migrate assets to new mode
        let migrated = 0
        for (const asset of existingAssets) {
          try {
            if (onProgress) onProgress(`Syncing asset ${migrated + 1}/${existingAssets.length}: ${asset.name}`)
            // Small artificial delay for visual feedback on fast locals
            await new Promise(resolve => setTimeout(resolve, 500))

            // saveAsset will use the *new* this.currentMode
            await this.saveAsset(asset)
            migrated++
          } catch (err) {
            console.error(`Failed to migrate asset ${asset.name}`, err)
          }
        }

        if (onProgress) onProgress(`Vault Restructured. Successfully mapped ${migrated} assets.`)
        await new Promise(resolve => setTimeout(resolve, 1000))
      } else {
        if (onProgress) onProgress('Vault is empty. No mapping required.')
        await new Promise(resolve => setTimeout(resolve, 800))
      }

      console.log(`✅ Mode switched to ${newMode}`)
    } catch (error) {
      console.error('Migration failed during mode switch', error)
      throw error // Let the UI handle the failure
    }
  }

  /**
   * Save asset based on current mode
   */
  async saveAsset(asset: StoredAsset): Promise<{ success: boolean; id: string; syncPending?: boolean }> {
    if (this.currentMode === 'centralized') {
      return this.saveAssetCentralized(asset)
    } else {
      return this.saveAssetDecentralized(asset)
    }
  }

  /**
   * CENTRALIZED: Save to backend API + MongoDB
   */
  private async saveAssetCentralized(asset: StoredAsset): Promise<{ success: boolean; id: string; syncPending?: boolean }> {
    try {
      console.log('💾 Saving asset (Centralized mode)...')
      let syncPending = false

      // Save to IndexedDB (local cache)
      const storage = WebStorageService.getInstance()
      await storage.saveAsset(asset)

      // Also save to backend API
      try {
        const walletAddress = localStorage.getItem('dwp_wallet_address')
        const response = await fetch(`${this.config.apiEndpoint}/api/assets?walletAddress=${walletAddress}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('dwp_token')}`
          },
          body: JSON.stringify({
            id: asset.id,
            name: asset.name,
            type: asset.type,
            encryptedData: asset.encryptedData,
            keyId: asset.keyId,
            iv: asset.iv,
            ipfsHash: asset.ipfsHash,
            beneficiaries: asset.beneficiaries,
            size: asset.size,
            mimeType: asset.mimeType,
            folderId: asset.folderId
          })
        })

        if (!response.ok) {
          console.warn('⚠️ Backend save failed, using local storage only')
          syncPending = true
        } else {
          console.log('✅ Asset saved to backend')
        }
      } catch (apiError) {
        console.warn('⚠️ Backend unavailable, using local storage only:', apiError)
        syncPending = true
      }

      return { success: true, id: asset.id, syncPending }
    } catch (error) {
      console.error('❌ Centralized save failed:', error)
      throw error
    }
  }

  /**
   * DECENTRALIZED: Save to smart contract + IPFS only
   */
  private async saveAssetDecentralized(asset: StoredAsset): Promise<{ success: boolean; id: string; syncPending?: boolean }> {
    try {
      console.log('⛓️ Saving asset (Decentralized mode)...')
      let syncPending = false

      // Save to IndexedDB (local)
      const storage = WebStorageService.getInstance()
      await storage.saveAsset(asset)

      // Save metadata to smart contract
      try {
        const { ethers } = await import('ethers')
        const provider = new ethers.BrowserProvider((window as any).ethereum)
        const signer = await provider.getSigner()

        // Contract ABI (simplified)
        const contractABI = [
          'function createAsset(string memory ipfsCID, string memory encryptedKeyShares) public returns (uint256)',
          'function getAsset(uint256 assetId) public view returns (string memory, string memory, address, uint256)'
        ]

        if (!this.config.contractAddress) {
          console.warn('⚠️ No contract address, using local storage only')
          return { success: true, id: asset.id, syncPending: true }
        }

        const contract = new ethers.Contract(
          this.config.contractAddress,
          contractABI,
          signer
        )

        // Create asset on-chain
        const tx = await contract.createAsset(
          asset.ipfsHash || 'local',
          JSON.stringify({ keyId: asset.keyId, iv: asset.iv })
        )

        await tx.wait()
        console.log('✅ Asset saved to blockchain')

      } catch (blockchainError) {
        console.warn('⚠️ Blockchain save failed, using local storage only:', blockchainError)
        syncPending = true
      }

      return { success: true, id: asset.id, syncPending }
    } catch (error) {
      console.error('❌ Decentralized save failed:', error)
      throw error
    }
  }

  /**
   * Load assets based on current mode
   */
  async loadAssets(): Promise<StoredAsset[]> {
    if (this.currentMode === 'centralized') {
      return this.loadAssetsCentralized()
    } else {
      return this.loadAssetsDecentralized()
    }
  }

  /**
   * CENTRALIZED: Load from backend API
   */
  private async loadAssetsCentralized(): Promise<StoredAsset[]> {
    try {
      console.log('📥 Loading assets (Centralized mode)...')

      // Always load local IndexedDB first (has encryptedData for decryption)
      const storage = WebStorageService.getInstance()
      const localAssets = await storage.getAllAssets()
      const localMap = new Map(localAssets.map(a => [a.id, a]))

      // Try to merge with backend (for metadata sync across devices)
      try {
        const walletAddress = localStorage.getItem('dwp_wallet_address')
        const response = await fetch(`${this.config.apiEndpoint}/api/assets?walletAddress=${walletAddress}`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('dwp_token')}`
          }
        })

        if (response.ok) {
          const backendAssets = await response.json()
          console.log('✅ Loaded from backend:', backendAssets.length, 'assets')

          // Map backend fields → frontend StoredAsset shape
          // Then merge: prefer local copy (has encryptedData) over backend copy
          const merged: StoredAsset[] = backendAssets.map((b: any) => {
            const local = localMap.get(b.id)
            return {
              id: b.id,
              name: b.name,
              type: b.type || b.mimeType?.split('/')[0]?.toUpperCase() || 'FILE',
              folderId: b.folderId || null,
              // Critical: use local encryptedData — backend only stores it for notes
              encryptedData: local?.encryptedData || b.encryptedData || '',
              keyId: local?.keyId || b.keyId || b.encryptionKeyId || '',
              iv: local?.iv || b.iv || b.fileIv || '',
              ipfsHash: b.ipfsHash || b.cid || local?.ipfsHash || '',
              beneficiaries: b.beneficiaries || local?.beneficiaries || [],
              createdAt: b.createdAt ? new Date(b.createdAt).getTime() : (local?.createdAt || Date.now()),
              size: b.size || local?.size || 0,
              mimeType: b.mimeType || local?.mimeType || '',
            } as StoredAsset
          })

          // Also include local-only assets (not yet synced to backend)
          const backendIds = new Set(backendAssets.map((b: any) => b.id))
          const localOnly = localAssets.filter(a => !backendIds.has(a.id))

          return [...merged, ...localOnly]
        }
      } catch (apiError) {
        console.warn('⚠️ Backend unavailable, using local storage')
      }

      console.log('✅ Loaded from local storage:', localAssets.length, 'assets')
      return localAssets

    } catch (error) {
      console.error('❌ Failed to load assets:', error)
      return []
    }
  }

  /**
   * DECENTRALIZED: Load from smart contract + IPFS
   */
  private async loadAssetsDecentralized(): Promise<StoredAsset[]> {
    try {
      console.log('📥 Loading assets (Decentralized mode)...')

      // Load from IndexedDB (local cache)
      const storage = WebStorageService.getInstance()
      const localAssets = await storage.getAllAssets()

      // TODO: Sync with blockchain if needed
      // For now, use local storage as source of truth

      console.log('✅ Loaded from local storage:', localAssets.length, 'assets')
      return localAssets

    } catch (error) {
      console.error('❌ Failed to load assets:', error)
      return []
    }
  }

  /**
   * Delete asset based on current mode
   */
  async deleteAsset(assetId: string): Promise<void> {
    if (this.currentMode === 'centralized') {
      await this.deleteAssetCentralized(assetId)
    } else {
      await this.deleteAssetDecentralized(assetId)
    }
  }

  /**
   * CENTRALIZED: Delete from backend + local
   */
  private async deleteAssetCentralized(assetId: string): Promise<void> {
    try {
      // Delete from backend
      try {
        await fetch(`${this.config.apiEndpoint}/api/assets/${assetId}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('dwp_token')}`
          }
        })
      } catch (apiError) {
        console.warn('⚠️ Backend delete failed')
      }

      // Delete from local
      const storage = WebStorageService.getInstance()
      await storage.deleteAsset(assetId)

      console.log('✅ Asset deleted (Centralized)')
    } catch (error) {
      console.error('❌ Delete failed:', error)
      throw error
    }
  }

  /**
   * DECENTRALIZED: Mark as deleted (can't delete from blockchain)
   */
  private async deleteAssetDecentralized(assetId: string): Promise<void> {
    try {
      // In decentralized mode, we can only delete from local storage
      // Blockchain records are immutable
      const storage = WebStorageService.getInstance()
      await storage.deleteAsset(assetId)

      console.log('✅ Asset deleted from local storage (Decentralized)')
      console.log('ℹ️ Note: Blockchain record remains (immutable)')
    } catch (error) {
      console.error('❌ Delete failed:', error)
      throw error
    }
  }

  /**
   * Get mode info for UI
   */
  getModeInfo() {
    return {
      mode: this.currentMode,
      isCentralized: this.currentMode === 'centralized',
      isDecentralized: this.currentMode === 'decentralized',
      features: this.currentMode === 'centralized'
        ? ['Fast & Easy', 'Auto Backup', '24/7 Support', 'Account Recovery']
        : ['Full Control', 'Zero-Knowledge', 'Censorship Resistant', 'True Ownership']
    }
  }
}

export default ModeService
