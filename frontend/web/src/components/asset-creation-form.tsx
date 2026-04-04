'use client'

import { useState, useEffect, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  FileText, Upload, Lock, Key, Trash2, Eye, Shield,
  CheckCircle, Plus, Search, Grid, List as ListIcon,
  Image as ImageIcon, Video, FolderOpen, MoreVertical, X,
  FolderPlus, ChevronRight, CornerLeftUp, Coins, Pencil
} from 'lucide-react'
import WebCryptoService from '@/lib/crypto'
import WebStorageService, { StoredAsset, StoredFolder } from '@/lib/storage'
import { registerTokenAsset } from '@/lib/blockchain'
import { CategoryModal } from './category-modal'
import type { AssetCategory } from '@/lib/category-handlers'
import ModeService from '@/lib/mode-service'
import { useSubscription } from '@/contexts/SubscriptionContext'
import { ConfirmationDialog } from './confirmation-dialog'
import { toast } from 'sonner'

export function AssetCreationForm() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [assetType, setAssetType] = useState<string>('')
  const [assetName, setAssetName] = useState<string>('')
  const [isEncrypting, setIsEncrypting] = useState(false)

  const [assets, setAssets] = useState<StoredAsset[]>([])
  const [totalAssetsCount, setTotalAssetsCount] = useState(0)
  const [folders, setFolders] = useState<StoredFolder[]>([])
  const [beneficiaries, setBeneficiaries] = useState<any[]>([])
  const [uploadProgress, setUploadProgress] = useState(0)

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState<AssetCategory | null>(null)
  const [isViewModalOpen, setIsViewModalOpen] = useState(false)
  const [viewingAsset, setViewingAsset] = useState<StoredAsset | null>(null)
  const [decryptedContent, setDecryptedContent] = useState<string>('')
  const [isDecrypting, setIsDecrypting] = useState(false)
  const [isNewFolderModalOpen, setIsNewFolderModalOpen] = useState(false)
  const [isShareFolderModalOpen, setIsShareFolderModalOpen] = useState(false)
  const [shareFolderTarget, setShareFolderTarget] = useState<StoredFolder | null>(null)
  const [shareFolderSelection, setShareFolderSelection] = useState<string[]>([])
  const [newFolderName, setNewFolderName] = useState('')
  const [isShareAssetModalOpen, setIsShareAssetModalOpen] = useState(false)
  const [shareAssetTarget, setShareAssetTarget] = useState<StoredAsset | null>(null)
  const [shareAssetSelection, setShareAssetSelection] = useState<string[]>([])
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [isOnChainModalOpen, setIsOnChainModalOpen] = useState(false)
  const [onChainForm, setOnChainForm] = useState({
    tokenAddress: '',
    tokenType: 'erc20' as 'erc20' | 'erc721',
    amountOrId: '',
    beneficiaryId: ''
  })
  const [deleteConfirmation, setDeleteConfirmation] = useState<{ isOpen: boolean; assetId: string | null; assetName: string }>({
    isOpen: false,
    assetId: null,
    assetName: ''
  })
  const [deleteFolderConfirmation, setDeleteFolderConfirmation] = useState<{ isOpen: boolean; folderId: string | null; folderName: string }>({
    isOpen: false,
    folderId: null,
    folderName: ''
  })
  const [renameFolderState, setRenameFolderState] = useState<{ isOpen: boolean; folderId: string | null; currentName: string }>({
    isOpen: false,
    folderId: null,
    currentName: ''
  })
  const [renameInput, setRenameInput] = useState('')
  const [selectedBeneficiaries, setSelectedBeneficiaries] = useState<string[]>([])

  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [searchQuery, setSearchQuery] = useState('')
  const [activeCategory, setActiveCategory] = useState<string>('all')

  const [currentFolderId, setCurrentFolderId] = useState<string | null>(null)
  const [breadcrumbs, setBreadcrumbs] = useState<StoredFolder[]>([])
  const [contextMenu, setContextMenu] = useState<{
    x: number
    y: number
    target: 'root' | 'folder' | 'asset'
    folder?: StoredFolder
    asset?: StoredAsset
  } | null>(null)

  const crypto = WebCryptoService.getInstance()
  const storage = WebStorageService.getInstance()
  const modeService = ModeService.getInstance()
  const { subscription } = useSubscription()

  useEffect(() => {
    loadAssets()
    loadBeneficiaries()
  }, [])

  const loadAssets = async () => {
    try {
      // Use modeService to load assets (handles centralized/decentralized/sync)
      const allAssets = await modeService.loadAssets();
      setTotalAssetsCount(allAssets.length);

      // Filter assets for the current folder view
      const folderAssets = allAssets.filter(asset => asset.folderId === currentFolderId);
      setAssets(folderAssets)

      const storedFolders = await storage.getFoldersByParent(currentFolderId);
      setFolders(storedFolders)

      if (currentFolderId) {
        const path = await storage.getFolderPath(currentFolderId);
        setBreadcrumbs(path);
      } else {
        setBreadcrumbs([]);
      }
    } catch (error) {
      console.error('Failed to load assets/folders:', error)
    }
  }

  // Load immediately on mount and folder navigation
  useEffect(() => {
    loadAssets()
  }, [currentFolderId])

  const loadBeneficiaries = async () => {
    try {
      const storedBeneficiaries = await storage.getAllBeneficiaries()
      console.log('📋 Loaded beneficiaries:', storedBeneficiaries.length)
      setBeneficiaries(storedBeneficiaries)

      // If no beneficiaries, create a default one for testing
      if (storedBeneficiaries.length === 0) {
        console.log('⚠️ No beneficiaries found. Assets will be saved without beneficiary assignment.')
      }
    } catch (error) {
      console.error('Failed to load beneficiaries:', error)
    }
  }

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setSelectedFile(file)
      if (!assetName) setAssetName(file.name)

      if (file.type.startsWith('image/')) setAssetType('photo')
      else if (file.type.startsWith('video/')) setAssetType('photo')
      else if (file.type.startsWith('audio/')) setAssetType('audio_message')
      else if (file.type === 'application/pdf' || file.type.includes('document')) setAssetType('document')
      else if (!assetType) setAssetType('document')
    }
  }


  const handleCreateAsset = async () => {
    if (!selectedFile || !assetType || !assetName) return

    // Ensure at least one beneficiary is selected
    if (selectedBeneficiaries.length === 0) {
      toast.error('No Nominee Selected', {
        description: 'Please select at least one nominee for this asset.'
      })
      return
    }

    // Check subscription status
    if (!subscription || subscription.status === 'expired') {
      toast.error('Subscription Expired', {
        description: 'Please upgrade your plan to continue creating assets.'
      })
      return
    }

    // Enforce limits
    if (subscription.limits && subscription.assetsCount !== undefined) {
      if (subscription.assetsCount >= subscription.limits.assets) {
        toast.error('Asset Limit Reached', {
          description: `Your ${subscription.plan} plan allows up to ${subscription.limits.assets} assets. Please upgrade for more.`
        })
        return
      }
    }

    // Get wallet address from localStorage
    const walletAddress = localStorage.getItem('dwp_wallet_address') || '0x0000000000000000000000000000000000000000'

    setIsEncrypting(true)
    setUploadProgress(0)

    try {
      setUploadProgress(20)
      const fileBuffer = await readFileAsBuffer(selectedFile)

      setUploadProgress(40)
      const encryptionKey = crypto.generateEncryptionKey()
      // Use the new binary encryption method
      const encryptionResult = await crypto.encryptBinary(fileBuffer, encryptionKey)

      setUploadProgress(60)
      const keyDistribution = await crypto.splitKey(encryptionKey)

      setUploadProgress(75)
      // Upload to IPFS with wallet-based identity
      let ipfsCID = ''
      try {
        const { uploadToIPFS } = await import('@/lib/ipfs-client')
        ipfsCID = await uploadToIPFS(selectedFile, walletAddress, encryptionResult.keyId, encryptionResult.iv)
        console.log('✅ Uploaded to IPFS:', ipfsCID)
      } catch (ipfsErr) {
        console.warn('⚠️ IPFS upload failed, continuing with local save:', ipfsErr)
        ipfsCID = `bafybei_local_${Math.random().toString(36).substring(2, 15)}`
      }

      setUploadProgress(90)
      const asset: StoredAsset = {
        id: storage.generateId(),
        name: assetName,
        type: assetType,
        folderId: currentFolderId,
        encryptedData: encryptionResult.encryptedData,
        keyId: encryptionResult.keyId,
        iv: encryptionResult.iv,
        ipfsHash: ipfsCID,
        beneficiaries: selectedBeneficiaries,
        createdAt: encryptionResult.timestamp,
        size: selectedFile.size,
        mimeType: selectedFile.type
      }

      // Use ModeService to save based on current mode
      const saveResult = await modeService.saveAsset(asset)
      await storage.saveKeyDistribution(keyDistribution)

      // Sync Key to Backend for cloud backup
      try {
        await fetch(`http://localhost:7001/api/assets/keys/${keyDistribution.keyId}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ shares: keyDistribution.shares })
        })
        console.log('✅ Key synced to backend for recovery')
      } catch (syncErr) {
        console.warn('⚠️ Key sync failed', syncErr)
      }

      setUploadProgress(100)

      setTimeout(() => {
        setIsModalOpen(false)
        resetForm()
        loadAssets()
        if (saveResult.syncPending) {
          toast.warning('Saved Locally', {
            description: 'Sync with backend pending (offline mode)'
          })
        } else {
          toast.success('Asset created successfully')
        }
      }, 800)

    } catch (error) {
      console.error('Asset creation failed:', error)
      toast.error('Failed to create asset')
      setIsEncrypting(false)
    }
  }

  const resetForm = () => {
    setSelectedFile(null)
    setAssetType('')
    setAssetName('')
    setUploadProgress(0)
    setIsEncrypting(false)
    setSelectedBeneficiaries([])
  }

  const handleDeleteAsset = (assetId: string, assetName: string) => {
    setDeleteConfirmation({ isOpen: true, assetId, assetName })
  }

  const confirmDeleteAsset = async () => {
    if (!deleteConfirmation.assetId) return

    try {
      // Use ModeService to delete based on current mode
      await modeService.deleteAsset(deleteConfirmation.assetId)
      await loadAssets()
      setDeleteConfirmation({ isOpen: false, assetId: null, assetName: '' })
    } catch (error) {
      console.error('Failed to delete asset:', error)
    }
  }

  const handleViewAsset = async (asset: StoredAsset) => {
    setViewingAsset(asset)
    setIsViewModalOpen(true)
    setIsDecrypting(true)
    setDecryptedContent('')

    try {
      console.log('🔓 Decrypting asset:', asset.name)

      // Get all key distributions and find the one for this asset
      let allKeyDists = await storage.getAllKeyDistributions()
      let keyDist = allKeyDists.find(kd => kd.keyId === asset.keyId)

      // Self-Healing: If key not found locally, try to fetch from backend
      if (!keyDist) {
        console.warn('⚠️ Key not found locally, attempting backend fetch...')
        try {
          const response = await fetch(`http://localhost:7001/api/assets/keys/${asset.keyId}`)
          if (response.ok) {
            keyDist = await response.json()
            if (keyDist) {
              await storage.saveKeyDistribution(keyDist) // Cache locally
              console.log('✅ Key recovered from backend')
            }
          }
        } catch (fetchErr) {
          console.error('Failed to fetch key from backend:', fetchErr)
        }
      }

      if (!keyDist) {
        throw new Error('Key distribution not found for this asset. If you created this in another browser, ensure sync is complete.')
      }

      // Reconstruct the key from shares (using first 3 shares)
      const sharesToUse = keyDist.shares.slice(0, 3)
      const reconstructedKey = await crypto.reconstructKey(sharesToUse)
      console.log('✅ Key reconstructed')

      // Decrypt the data
      const isImage = asset.type?.toLowerCase() === 'photo' || asset.mimeType?.toLowerCase().startsWith('image/')

      if (isImage) {
        // Decrypt as binary and convert to Blob Object URL (much faster for large files)
        const decryptedBuffer = await crypto.decryptBinary(
          asset.encryptedData,
          reconstructedKey,
          asset.iv
        )
        const blob = new Blob([decryptedBuffer], { type: asset.mimeType || 'image/png' })
        const objectURL = URL.createObjectURL(blob)
        setDecryptedContent(objectURL)
      } else {
        const decrypted = await crypto.decryptData(
          asset.encryptedData,
          reconstructedKey,
          asset.iv
        )
        setDecryptedContent(decrypted)
      }
      console.log('✅ Data decrypted')
    } catch (error) {
      console.error('❌ Failed to decrypt asset:', error)
      setDecryptedContent('Failed to decrypt: ' + (error as Error).message)
    } finally {
      setIsDecrypting(false)
    }
  }

  const handleCreateFolder = async () => {
    if (!newFolderName.trim()) return
    try {
      // Use selected beneficiaries if any and tag with current category if appropriate
      const folderType = activeCategory !== 'all' ? activeCategory : undefined;
      await storage.createFolder(newFolderName, currentFolderId, selectedBeneficiaries, folderType)
      setNewFolderName('')
      setIsNewFolderModalOpen(false)
      setSelectedBeneficiaries([])
      loadAssets()
    } catch (error) {
      console.error('Failed to create directory:', error)
    }
  }

  const handleRenameFolder = async () => {
    if (!renameInput.trim() || !renameFolderState.folderId) return
    try {
      await storage.updateFolder(renameFolderState.folderId, { name: renameInput.trim() })
      setRenameFolderState({ isOpen: false, folderId: null, currentName: '' })
      setRenameInput('')
      loadAssets()
      toast.success('Folder renamed')
    } catch (error) {
      console.error('Failed to rename folder:', error)
      toast.error('Rename failed')
    }
  }

  const openCryptoWalletUpload = () => {
    setActiveCategory('self_custody_crypto')
    setAssetType('self_custody_crypto')
    setAssetName('')
    setIsModalOpen(true)
  }

  const openOnChainFromCrypto = () => {
    setIsOnChainModalOpen(true)
  }

  const handleRegisterOnChainAsset = async () => {
    if (!onChainForm.tokenAddress || !onChainForm.amountOrId || !onChainForm.beneficiaryId) return

    const beneficiary = beneficiaries.find((b: any) => b.id === onChainForm.beneficiaryId)
    if (!beneficiary || !beneficiary.walletAddress) {
      toast.error('Beneficiary error', {
        description: 'Selected beneficiary is missing a wallet address.'
      })
      return
    }

    const result = await registerTokenAsset(
      onChainForm.tokenAddress,
      onChainForm.tokenType,
      onChainForm.amountOrId,
      beneficiary.walletAddress
    )

    if (!result.success) {
      toast.error(`Failed to register token asset: ${result.error}`)
      return
    }

    toast.success('On-chain asset registered')

    setIsOnChainModalOpen(false)
    setOnChainForm({
      tokenAddress: '',
      tokenType: 'erc20',
      amountOrId: '',
      beneficiaryId: ''
    })
  }

  const openShareFolderModal = (folder: StoredFolder) => {
    setShareFolderTarget(folder)
    // Preselect beneficiaries already attached to this folder (by beneficiary ID)
    setShareFolderSelection(folder.beneficiaries || [])
    setIsShareFolderModalOpen(true)
  }

  const openShareAssetModal = (asset: StoredAsset) => {
    setShareAssetTarget(asset)
    setShareAssetSelection(asset.beneficiaries || [])
    setIsShareAssetModalOpen(true)
  }

  const toggleShareSelection = (beneficiaryId: string) => {
    setShareFolderSelection(prev =>
      prev.includes(beneficiaryId)
        ? prev.filter(id => id !== beneficiaryId)
        : [...prev, beneficiaryId]
    )
  }

  const handleSaveFolderSharing = async () => {
    if (!shareFolderTarget) return
    try {
      await storage.shareFolderWithBeneficiaries(shareFolderTarget.id, shareFolderSelection)
      setIsShareFolderModalOpen(false)
      setShareFolderTarget(null)
      setShareFolderSelection([])
      await loadAssets()
      toast.success('Folder permissions updated')
    } catch (error) {
      console.error('Failed to update folder sharing:', error)
      toast.error('Failed to update folder sharing')
    }
  }

  const handleSaveAssetSharing = async () => {
    if (!shareAssetTarget) return
    try {
      await storage.updateAssetBeneficiaries(shareAssetTarget.id, shareAssetSelection)
      setIsShareAssetModalOpen(false)
      setShareAssetTarget(null)
      setShareAssetSelection([])
      await loadAssets()
      toast.success('Asset permissions updated')
    } catch (error) {
      console.error('Failed to update asset sharing:', error)
      toast.error('Failed to update asset sharing')
    }
  }

  const toggleAssetShareSelection = (beneficiaryId: string) => {
    setShareAssetSelection(prev =>
      prev.includes(beneficiaryId)
        ? prev.filter(id => id !== beneficiaryId)
        : [...prev, beneficiaryId]
    )
  }

  const handleDeleteFolder = (folderId: string, folderName: string) => {
    setDeleteFolderConfirmation({ isOpen: true, folderId, folderName })
  }

  const confirmDeleteFolder = async () => {
    if (!deleteFolderConfirmation.folderId) return

    try {
      // Fallback for custom logic if storage method doesn't trigger recursion natively in UI layer
      await storage.deleteFolder(deleteFolderConfirmation.folderId)
      await loadAssets()
      setDeleteFolderConfirmation({ isOpen: false, folderId: null, folderName: '' })
    } catch (error) {
      console.error('Failed to prune folder:', error)
    }
  }

  const readFileAsBuffer = (file: File): Promise<Uint8Array> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.onload = () => {
        if (reader.result instanceof ArrayBuffer) {
          resolve(new Uint8Array(reader.result))
        } else {
          reject(new Error('Failed to read file as ArrayBuffer'))
        }
      }
      reader.onerror = () => reject(reader.error)
      reader.readAsArrayBuffer(file)
    })
  }

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 B'
    const k = 1024
    const sizes = ['B', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i]
  }

  const getAssetIconInfo = (type: string, mimeType?: string) => {
    if (type === 'crypto_keys') return { icon: Key, color: 'text-purple-400', bg: 'bg-purple-500/10' }
    if (type === 'self_custody_crypto') return { icon: Coins, color: 'text-amber-300', bg: 'bg-amber-500/15' }
    if (type === 'bank_account') return { icon: Shield, color: 'text-emerald-400', bg: 'bg-emerald-500/10' }
    if (type === 'exchange_account') return { icon: Shield, color: 'text-cyan-400', bg: 'bg-cyan-500/10' }
    if (type === 'photo' || mimeType?.startsWith('image/')) return { icon: ImageIcon, color: 'text-orange-400', bg: 'bg-orange-500/10' }
    if (mimeType?.startsWith('video/')) return { icon: Video, color: 'text-pink-400', bg: 'bg-pink-500/10' }
    if (type === 'business_secret') return { icon: Lock, color: 'text-slate-400', bg: 'bg-slate-500/10' }
    if (type === 'document' || mimeType?.includes('pdf')) return { icon: FileText, color: 'text-blue-500', bg: 'bg-blue-500/10' }
    return { icon: FolderOpen, color: 'text-blue-400', bg: 'bg-blue-500/10' }
  }

  const filteredAssets = useMemo(() => {
    return assets.filter(asset => {
      const matchesSearch = asset.name.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesCategory = activeCategory === 'all' || asset.type === activeCategory
      return matchesSearch && matchesCategory;
    }).sort((a, b) => b.createdAt - a.createdAt)
  }, [assets, searchQuery, activeCategory])

  const filteredFolders = useMemo(() => {
    return folders
      .filter(folder => {
        const matchesSearch = folder.name.toLowerCase().includes(searchQuery.toLowerCase())
        
        // Use name-based heuristic if type is missing (for legacy folders)
        const folderType = folder.type || WebStorageService.getFolderType(folder.name);
        const matchesCategory = activeCategory === 'all' || folderType === activeCategory;
        
        return matchesSearch && matchesCategory;
      })
      .sort((a, b) => {
        if (a.createdAt !== b.createdAt) return a.createdAt - b.createdAt
        return a.name.localeCompare(b.name)
      })
  }, [folders, searchQuery, activeCategory])

  const handleRootContextMenu = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault()
    setContextMenu({
      x: e.clientX,
      y: e.clientY,
      target: 'root'
    })
  }

  const handleFolderContextMenu = (e: React.MouseEvent<HTMLDivElement>, folder: StoredFolder) => {
    e.preventDefault()
    e.stopPropagation()
    setContextMenu({
      x: e.clientX,
      y: e.clientY,
      target: 'folder',
      folder
    })
  }

  const handleAssetContextMenu = (e: React.MouseEvent<HTMLDivElement>, asset: StoredAsset) => {
    e.preventDefault()
    e.stopPropagation()
    setContextMenu({
      x: e.clientX,
      y: e.clientY,
      target: 'asset',
      asset
    })
  }

  const closeContextMenu = () => setContextMenu(null)

  // Open category-specific modal
  const openCategoryModal = (categoryId: string) => {
    // Validate that this is a valid AssetCategory
    const validCategories: AssetCategory[] = [
      'bank_account',
      'self_custody_crypto',
      'exchange_account',
      'crypto_keys',
      'business_secret',
      'document',
      'photo',
      'video'
    ]

    if (!validCategories.includes(categoryId as AssetCategory)) {
      console.error('❌ Invalid category ID:', categoryId)
      return
    }

    console.log('✅ Opening category modal for:', categoryId)
    setSelectedCategory(categoryId as AssetCategory)
    setIsCategoryModalOpen(true)
  }

  // Handle category modal submission
  const handleCategorySubmit = async (data: { name: string; type: string; structuredData: string; file?: File }) => {
    // Check subscription status
    if (!subscription || subscription.status === 'expired') {
      toast.error('Subscription Expired', {
        description: 'Please upgrade your plan to continue creating assets.'
      })
      throw new Error('Subscription expired')
    }

    // Enforce limits
    if (subscription.limits && subscription.assetsCount !== undefined) {
      if (subscription.assetsCount >= subscription.limits.assets) {
        toast.error('Asset Limit Reached', {
          description: `Your ${subscription.plan} plan allows up to ${subscription.limits.assets} assets. Please upgrade for more.`
        })
        throw new Error('Asset limit reached')
      }
    }

    const walletAddress = localStorage.getItem('dwp_wallet_address') || '0x0000000000000000000000000000000000000000'

    try {
      console.log('🔐 Starting category asset encryption...', { name: data.name, type: data.type })

      // Generate and split encryption key (using SAME key for encryption and splitting)
      const encryptionKey = crypto.generateEncryptionKey()
      const encryptionResult = await crypto.encryptData(data.structuredData, encryptionKey)
      console.log('✅ Data encrypted successfully')

      const keyDistribution = await crypto.splitKey(encryptionKey)
      console.log('✅ Key split into shares')

      // If file is provided, upload to IPFS
      let ipfsCID = ''
      if (data.file) {
        try {
          const { uploadToIPFS } = await import('@/lib/ipfs-client')
          ipfsCID = await uploadToIPFS(data.file, walletAddress)
          console.log('✅ File uploaded to IPFS:', ipfsCID)
        } catch (ipfsError) {
          console.warn('⚠️ IPFS upload failed, continuing without file:', ipfsError)
        }
      }

      // Get beneficiary IDs
      const beneficiaryIds = selectedBeneficiaries.length > 0
        ? selectedBeneficiaries
        : []

      if (beneficiaryIds.length === 0) {
        toast.error('No Nominee Selected', {
          description: 'Please select at least one nominee for this asset.'
        })
        throw new Error('No nominee selected')
      }

      const asset: StoredAsset = {
        id: storage.generateId(),
        name: data.name,
        type: data.type,
        folderId: currentFolderId,
        encryptedData: encryptionResult.encryptedData,
        keyId: encryptionResult.keyId,
        iv: encryptionResult.iv,
        ipfsHash: ipfsCID,
        beneficiaries: beneficiaryIds,
        createdAt: encryptionResult.timestamp,
        size: data.file?.size || data.structuredData.length,
        mimeType: data.file?.type || 'application/json'
      }

      console.log('💾 Saving asset using ModeService...')
      // Use ModeService to save based on current mode
      const saveResult = await modeService.saveAsset(asset)
      console.log('💾 Saving key distribution...', keyDistribution.keyId)
      await storage.saveKeyDistribution(keyDistribution)

      // Sync Key to Backend for cloud backup (CRITICAL for multi-device support)
      try {
        await fetch(`http://localhost:7001/api/assets/keys/${keyDistribution.keyId}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ shares: keyDistribution.shares })
        })
        console.log('✅ Key synced to backend for recovery')
      } catch (syncErr) {
        console.warn('⚠️ Key sync to cloud failed (Offline mode?)', syncErr)
      }

      console.log('✅ Asset saved successfully!')

      await loadAssets()

      setIsCategoryModalOpen(false)
      setSelectedCategory(null)

      if (saveResult.syncPending) {
        setTimeout(() => toast.warning('Saved Locally', {
          description: 'Sync with backend or blockchain pending'
        }), 500)
      } else {
        setTimeout(() => toast.success('Asset saved successfully'), 500)
      }
    } catch (error: any) {
      console.error('❌ Failed to save category asset:', error)
      console.error('Error details:', {
        message: error?.message,
        stack: error?.stack,
        name: error?.name
      })
      throw new Error(error?.message || 'Failed to save asset. Check console for details.')
    }
  }

  const categories = [
    { id: 'all', label: 'All Files', icon: Grid, isFilter: true, showAddButton: false },
    { id: 'document', label: 'Docs', icon: FileText, isFilter: false, showAddButton: true },
    { id: 'photo', label: 'Photos', icon: ImageIcon, isFilter: true, showAddButton: false },
    { id: 'bank_account', label: 'Bank / Finance', icon: Shield, isFilter: false, showAddButton: true },
    { id: 'self_custody_crypto', label: 'Crypto Wallets', icon: Coins, isFilter: false, showAddButton: true },
    { id: 'exchange_account', label: 'Exchange Accounts', icon: Key, isFilter: false, showAddButton: true },
    { id: 'crypto_keys', label: 'Raw Keys', icon: Key, isFilter: false, showAddButton: true },
    { id: 'business_secret', label: 'Secrets', icon: Eye, isFilter: false, showAddButton: true },
  ]

  const GridItem = ({ asset }: { asset: StoredAsset }) => {
    const iconInfo = getAssetIconInfo(asset.type, asset.mimeType)
    const Icon = iconInfo.icon
    return (
      <motion.div
        layout
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        onClick={() => handleViewAsset(asset)}
        onContextMenu={(e) => handleAssetContextMenu(e, asset)}
        className="bg-white/[0.03] border border-white/5 backdrop-blur-md rounded-2xl p-4 relative overflow-hidden group hover:border-blue-500/30 transition-all shadow-lg cursor-pointer"
      >
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-600 to-purple-600 opacity-0 group-hover:opacity-40 transition-opacity"></div>

        <div className="flex justify-between items-start mb-6">
          <div className={`w-10 h-10 rounded-xl ${iconInfo.bg} flex items-center justify-center ${iconInfo.color}`}>
            <Icon className="w-5 h-5" />
          </div>

          <div className="relative group/menu">
            <button className="text-slate-500 hover:text-white transition-colors p-1">
              <MoreVertical className="w-5 h-5" />
            </button>
            <div className="absolute right-0 top-6 mt-1 w-32 bg-slate-800 border border-slate-700 rounded-xl shadow-xl opacity-0 invisible group-hover/menu:opacity-100 group-hover/menu:visible transition-all z-20">
              <button
                onClick={(e) => { e.stopPropagation(); handleViewAsset(asset) }}
                className="w-full text-left px-4 py-2 text-sm text-slate-300 hover:text-white hover:bg-slate-700/50 rounded-t-xl flex items-center"
              >
                <Eye className="h-3 w-3 mr-2" /> View
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); openShareAssetModal(asset) }}
                className="w-full text-left px-4 py-2 text-sm text-slate-300 hover:text-white hover:bg-slate-700/50 flex items-center"
              >
                <Shield className="h-3 w-3 mr-2 text-emerald-400" /> Share
              </button>
              <button onClick={(e) => { e.stopPropagation(); handleDeleteAsset(asset.id, asset.name) }} className="w-full text-left px-4 py-2 text-sm text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-b-xl flex items-center">
                <Trash2 className="h-3 w-3 mr-2" /> Delete
              </button>
            </div>
          </div>
        </div>

        <h3 className="font-bold text-sm text-white truncate mb-1" title={asset.name}>{asset.name}</h3>

        <div className="flex items-center justify-between mt-4">
          <span className="text-[10px] text-slate-500">{formatFileSize(asset.size)}</span>
          <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 shadow-[0_0_10px_rgba(16,185,129,0.2)]">
            <Shield className="w-3 h-3 text-emerald-500" />
            <span className="text-[9px] font-bold text-emerald-500 uppercase tracking-tighter">Secure</span>
          </div>
        </div>
      </motion.div>
    )
  }

  const ListItem = ({ asset }: { asset: StoredAsset }) => {
    const iconInfo = getAssetIconInfo(asset.type, asset.mimeType)
    const Icon = iconInfo.icon
    return (
      <motion.div
        layout
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: 20 }}
        onClick={() => handleViewAsset(asset)}
        onContextMenu={(e) => handleAssetContextMenu(e, asset)}
        className="group flex items-center bg-white/[0.03] border border-white/5 hover:border-blue-500/30 backdrop-blur-md rounded-xl p-3 transition-all duration-300 cursor-pointer shadow-sm relative overflow-hidden"
      >
        <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-600 to-purple-600 opacity-0 group-hover:opacity-40 transition-opacity"></div>
        <div className={`h-10 w-10 ${iconInfo.bg} rounded-lg flex items-center justify-center mr-4 flex-shrink-0`}>
          <Icon className={`h-5 w-5 ${iconInfo.color}`} />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-sm font-bold text-white truncate" title={asset.name}>{asset.name}</h3>
          <p className="text-[10px] text-slate-500 flex items-center mt-0.5">
            <Shield className="h-3 w-3 text-emerald-500/70 mr-1 shadow-[0_0_5px_rgba(16,185,129,0.2)]" />
            Encrypted • {new Date(asset.createdAt).toLocaleDateString()}
          </p>
        </div>
        <div className="hidden md:block w-24 text-right text-sm text-slate-400 pr-4">{formatFileSize(asset.size)}</div>
        <div className="flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity pr-2">
          <button
            onClick={(e) => { e.stopPropagation(); handleViewAsset(asset) }}
            className="p-2 bg-slate-800 hover:bg-slate-700 rounded-lg text-slate-300 transition-colors"
          >
            <Eye className="h-4 w-4" />
          </button>
          <button onClick={(e) => { e.stopPropagation(); handleDeleteAsset(asset.id, asset.name) }} className="p-2 bg-red-500/10 hover:bg-red-500/20 text-red-500 rounded-lg transition-colors">
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      </motion.div>
    )
  }

  // File System Extrapolations 
  const GridFolderItem = ({ folder }: { folder: StoredFolder }) => (
    <div
      onClick={() => setCurrentFolderId(folder.id)}
      onContextMenu={(e) => handleFolderContextMenu(e, folder)}
      className="bg-white/[0.02] border border-white/5 backdrop-blur-md rounded-2xl p-4 relative overflow-hidden group hover:border-[#1152d4]/40 hover:bg-white/[0.04] transition-all shadow-lg cursor-pointer"
    >
      <div className="flex justify-between items-start mb-6">
        <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-400">
          <FolderOpen className="w-6 h-6 fill-blue-500/20" />
        </div>
        <div className="relative group/menu">
          <button onClick={(e) => e.stopPropagation()} className="text-slate-500 hover:text-white transition-colors p-1">
            <MoreVertical className="w-5 h-5" />
          </button>
          <div className="absolute right-0 top-6 mt-1 w-40 bg-slate-800 border border-slate-700 rounded-xl shadow-xl opacity-0 invisible group-hover/menu:opacity-100 group-hover/menu:visible transition-all z-20">
            <button
              onClick={(e) => {
                e.stopPropagation()
                openShareFolderModal(folder)
              }}
              className="w-full text-left px-4 py-2 text-sm text-slate-200 hover:text-white hover:bg-slate-700/70 rounded-t-xl flex items-center"
            >
              <Shield className="h-3 w-3 mr-2" /> Share Folder
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation()
                setRenameFolderState({ isOpen: true, folderId: folder.id, currentName: folder.name })
                setRenameInput(folder.name)
              }}
              className="w-full text-left px-4 py-2 text-sm text-slate-200 hover:text-white hover:bg-slate-700/70 flex items-center"
            >
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  setRenameFolderState({ isOpen: true, folderId: folder.id, currentName: folder.name })
                  setRenameInput(folder.name)
                }}
                className="p-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg transition-colors"
              >
                <Pencil className="h-4 w-4" />
              </button>
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation()
                handleDeleteFolder(folder.id, folder.name)
              }}
              className="w-full text-left px-4 py-2 text-sm text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-b-xl flex items-center"
            >
              <Trash2 className="h-3 w-3 mr-2" /> Delete
            </button>
          </div>
        </div>
      </div>
      <h3 className="font-bold text-sm text-white truncate mb-1" title={folder.name}>{folder.name}</h3>
      <div className="text-[10px] text-slate-500 mt-2">Folder • {new Date(folder.createdAt).toLocaleDateString()}</div>
    </div>
  )

  const ListFolderItem = ({ folder }: { folder: StoredFolder }) => (
    <div
      onClick={() => setCurrentFolderId(folder.id)}
      onContextMenu={(e) => handleFolderContextMenu(e, folder)}
      className="group flex items-center bg-white/[0.02] border border-white/5 hover:border-blue-500/30 backdrop-blur-md rounded-xl p-3 transition-all duration-300 cursor-pointer shadow-sm relative"
    >
      <div className="h-10 w-10 bg-blue-500/10 rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
        <FolderOpen className="h-5 w-5 fill-blue-500/20 text-blue-400" />
      </div>
      <div className="flex-1 min-w-0">
        <h3 className="text-sm font-bold text-white truncate" title={folder.name}>{folder.name}</h3>
        <p className="text-[10px] text-slate-500 flex items-center mt-0.5">
          Directory • {new Date(folder.createdAt).toLocaleDateString()}
        </p>
      </div>
      <div className="hidden md:block w-24 text-right text-sm text-slate-400 pr-4">--</div>
      <div className="flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity pr-2">
        <button
          onClick={(e) => {
            e.stopPropagation()
            setRenameFolderState({ isOpen: true, folderId: folder.id, currentName: folder.name })
            setRenameInput(folder.name)
          }}
          className="p-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg transition-colors"
        >
          <Pencil className="h-4 w-4" />
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation()
            openShareFolderModal(folder)
          }}
          className="p-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg transition-colors"
        >
          <Shield className="h-4 w-4" />
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation()
            handleDeleteFolder(folder.id, folder.name)
          }}
          className="p-2 bg-red-500/10 hover:bg-red-500/20 text-red-500 rounded-lg transition-colors"
        >
          <Trash2 className="h-4 w-4" />
        </button>
      </div>
    </div>
  )

  return (
    <div className="flex flex-col min-h-[calc(100vh-120px)] w-full w-full max-w-6xl mx-auto font-sans relative">
      {/* Background glow effects */}
      <div className="fixed top-0 right-0 w-96 h-96 bg-blue-600/10 blur-[120px] -z-10 rounded-full pointer-events-none text-transparent"></div>
      <div className="fixed bottom-0 left-0 w-96 h-96 bg-purple-600/10 blur-[120px] -z-10 rounded-full pointer-events-none text-transparent"></div>

      <div className="flex items-center justify-between mb-8 px-2 md:px-0">
        <div className="flex flex-col">
          <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent flex items-center">
            Vault Drive
          </h1>
          <p className="text-[10px] uppercase tracking-widest text-blue-500 font-semibold mt-1">LASTWISH</p>
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden md:flex relative mr-2">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
            <input
              type="text"
              placeholder="Search assets..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-2 bg-white/[0.03] border border-white/10 rounded-full text-sm text-white focus:ring-1 focus:ring-blue-500/50 focus:border-blue-500 transition-all w-48 outline-none placeholder-slate-500 shadow-inner"
            />
          </div>

          <div className="relative">
            <button onClick={() => setIsDropdownOpen(!isDropdownOpen)} className="bg-gradient-to-br from-[#1152d4] to-purple-600 rounded-xl shadow-[0_0_20px_rgba(17,82,212,0.4)] hover:scale-105 transition-all group flex items-center px-4 py-2">
              <Plus className="w-4 h-4 text-white mr-2" />
              <span className="text-sm font-bold text-white hidden sm:inline">New Item</span>
            </button>
            <AnimatePresence>
              {isDropdownOpen && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }} className="absolute right-0 top-12 w-48 bg-[#0a0c10] border border-white/10 shadow-2xl rounded-xl z-50 overflow-hidden">
                  <button onClick={() => { setIsDropdownOpen(false); setIsModalOpen(true); }} className="w-full text-left px-4 py-3 text-sm text-slate-300 hover:text-white hover:bg-[#1152d4]/10 flex items-center transition-colors">
                    <Shield className="w-4 h-4 mr-3 text-emerald-400" /> Secure Asset
                  </button>
                  <button onClick={() => { setIsDropdownOpen(false); setIsNewFolderModalOpen(true); }} className="w-full text-left px-4 py-3 text-sm text-slate-300 hover:text-white hover:bg-white/5 flex items-center transition-colors border-t border-white/5">
                    <FolderPlus className="w-4 h-4 mr-3 text-blue-400" /> New Folder
                  </button>
                  <button onClick={() => { setIsDropdownOpen(false); setIsOnChainModalOpen(true); }} className="w-full text-left px-4 py-3 text-sm text-slate-300 hover:text-white hover:bg-yellow-500/10 flex items-center transition-colors border-t border-white/5">
                    <Coins className="w-4 h-4 mr-3 text-yellow-400" /> On-Chain Token
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Mobile categories scale */}
        <div className="flex md:hidden gap-4 overflow-x-auto py-2 no-scrollbar px-2 max-w-[100vw] text-transparent">
          {categories.map(cat => (
            <div
              key={cat.id}
              onClick={() => {
                if (cat.isFilter || cat.id === 'all') {
                  setActiveCategory(cat.id)
                } else {
                  // For category views, just set active category (don't open modal)
                  setActiveCategory(cat.id)
                }
              }}
              className="flex flex-col items-center gap-2 min-w-[70px] cursor-pointer group"
            >
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all ${activeCategory === cat.id ? 'bg-blue-600/20 border border-blue-500/30 text-blue-400 shadow-[0_0_15px_rgba(37,99,235,0.2)]' : 'bg-white/[0.03] border border-white/5 text-slate-400 group-hover:bg-white/[0.08]'}`}>
                <cat.icon className="w-6 h-6" />
              </div>
              <span className={`text-[11px] font-medium ${activeCategory === cat.id ? 'text-blue-400' : 'text-slate-500'}`}>{cat.label}</span>
            </div>
          ))}
        </div>

        {/* Desktop Sidebar Navigation */}
        <div className="hidden md:flex flex-col w-48 shrink-0">
          <div className="space-y-2">
            {categories.map(cat => (
              <button
                key={cat.id}
                onClick={() => {
                  // Just set active category, don't open modal
                  setActiveCategory(cat.id)
                }}
                className={`w-full flex items-center px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300 ${activeCategory === cat.id ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20 shadow-inner' : 'text-slate-400 hover:bg-white/[0.05] hover:text-white border border-transparent'}`}
              >
                <cat.icon className={`w-5 h-5 mr-3 ${activeCategory === cat.id ? 'text-blue-400' : 'text-slate-500'}`} />
                {cat.label}
              </button>
            ))}
          </div>

          <div className="mt-auto pt-8">
            <div className="p-5 bg-white/[0.02] rounded-2xl border border-white/5 shadow-inner">
              <div className="flex justify-between items-end mb-3 mt-1">
                <div>
                  <p className="text-[10px] text-slate-500 uppercase tracking-widest mb-1 font-bold">Storage Usage</p>
                  <p className="text-xl font-bold text-slate-200">{totalAssetsCount} <span className="text-xs font-normal text-slate-500">Assets</span></p>
                </div>
              </div>
              <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden mb-1 mt-2">
                <div
                  className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full transition-all duration-500"
                  style={{ width: `${Math.min(100, (totalAssetsCount / 50) * 100)}%` }}
                ></div>
              </div>
              <p className="text-[10px] text-slate-500 mt-2 text-right">Encrypted Safe</p>
            </div>
          </div>
        </div>

        {/* Main Vault Content */}
        <div className="flex-1 px-2 md:px-0" onContextMenu={handleRootContextMenu}>

          {/* Breadcrumb Navigation Row */}
          <div className="flex items-center space-x-2 text-sm text-slate-400 mb-6 bg-white/[0.01] border border-white/5 px-4 py-3 rounded-xl">
            <button onClick={() => setCurrentFolderId(null)} className={`hover:text-white transition-colors flex items-center font-medium ${!currentFolderId && 'text-white'}`}>
              <Shield className="w-4 h-4 mr-2" /> Vault Drive
            </button>
            {breadcrumbs.map((crumb, index) => (
              <div key={crumb.id} className="flex items-center space-x-2">
                <ChevronRight className="w-4 h-4 text-slate-600" />
                <button
                  onClick={() => setCurrentFolderId(crumb.id)}
                  className={`hover:text-white font-medium transition-colors ${index === breadcrumbs.length - 1 ? 'text-blue-400' : ''}`}
                >
                  {crumb.name}
                </button>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-between mb-6">
            <h2 className="text-sm font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-3">
              {activeCategory === 'all' ? 'Directory Contents' : `${categories.find(c => c.id === activeCategory)?.label}`}

              {/* Add button for category views */}
              {activeCategory !== 'all' && !currentFolderId && (
                <button
                  onClick={() => openCategoryModal(activeCategory)}
                  className="ml-2 px-3 py-1.5 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white text-xs font-semibold rounded-lg flex items-center gap-1.5 shadow-lg shadow-blue-500/20 transition-all"
                >
                  <Plus className="w-3.5 h-3.5" />
                  Add New
                </button>
              )}
            </h2>

            <div className="flex bg-white/[0.03] border border-white/10 rounded-lg p-1">
              <button onClick={() => setViewMode('grid')} className={`p-1.5 rounded-md transition-colors ${viewMode === 'grid' ? 'bg-slate-800 text-white shadow-sm' : 'text-slate-400 hover:text-white'}`}>
                <Grid className="w-4 h-4" />
              </button>
              <button onClick={() => setViewMode('list')} className={`p-1.5 rounded-md transition-colors ${viewMode === 'list' ? 'bg-slate-800 text-white shadow-sm' : 'text-slate-400 hover:text-white'}`}>
                <ListIcon className="w-4 h-4" />
              </button>
            </div>
          </div>

          {assets.length === 0 && folders.length === 0 ? (
            <div className="min-h-[500px] py-12 flex flex-col items-center justify-center text-center px-4 bg-white/[0.02] border border-white/5 rounded-3xl relative overflow-hidden group">
              <div className="absolute inset-0 bg-[#1152d4]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>

              <div className="w-20 h-20 bg-[#1152d4]/10 rounded-full flex items-center justify-center mb-6 shadow-[0_0_20px_rgba(17,82,212,0.15)] relative z-10">
                <FolderOpen className="h-10 w-10 text-[#1152d4]" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2 relative z-10">Empty Directory</h3>
              <p className="text-slate-400 max-w-sm mb-6 text-sm relative z-10">Create a sub-folder or encrypt a new payload into this location.</p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 relative z-10 w-full max-w-lg mb-8 px-4">
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="flex flex-col items-center justify-center p-6 rounded-2xl bg-gradient-to-br from-blue-600/20 to-purple-600/20 border border-blue-500/30 hover:border-blue-400/60 hover:from-blue-600/30 hover:to-purple-600/30 transition-all group"
                >
                  <div className="w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-[0_0_15px_rgba(59,130,246,0.3)]">
                    <Shield className="w-6 h-6 text-blue-400" />
                  </div>
                  <span className="text-white font-bold text-sm">Secure Asset</span>
                  <span className="text-slate-400 text-xs mt-1">Upload encrypted file</span>
                </button>

                <button
                  onClick={() => setIsNewFolderModalOpen(true)}
                  className="flex flex-col items-center justify-center p-6 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-white/20 hover:bg-white/[0.06] transition-all group"
                >
                  <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <FolderPlus className="w-6 h-6 text-slate-300" />
                  </div>
                  <span className="text-white font-bold text-sm">Create Folder</span>
                  <span className="text-slate-400 text-xs mt-1">Organize locally</span>
                </button>
              </div>

              {currentFolderId && (
                <button onClick={() => {
                  const parentNode = breadcrumbs.length > 1 ? breadcrumbs[breadcrumbs.length - 2].id : null;
                  setCurrentFolderId(parentNode);
                }} className="px-5 py-2 hover:bg-white/[0.05] text-slate-400 hover:text-white rounded-lg font-medium transition-colors text-xs flex items-center relative z-10 group-hover:opacity-100">
                  <CornerLeftUp className="w-4 h-4 mr-2" /> Navigate Up
                </button>
              )}
            </div>
          ) : filteredAssets.length === 0 && filteredFolders.length === 0 ? (
            // Empty state - Category specific
            (() => {
              const currentCategory = categories.find(c => c.id === activeCategory)
              const Icon = currentCategory?.icon || FolderOpen

              // Special handling for crypto wallets
              if (activeCategory === 'self_custody_crypto') {
                return (
                  <div className="h-64 flex flex-col items-center justify-center text-center bg-white/[0.02] border border-white/5 rounded-3xl px-6">
                    <Coins className="h-10 w-10 text-amber-300 mb-4" />
                    <p className="text-slate-200 font-semibold text-sm mb-1">No crypto wallet blueprints yet</p>
                    <p className="text-slate-400 text-xs max-w-md mb-4">
                      Save instructions for your BTC / ETH / multi‑chain wallets and optionally link on‑chain tokens for automatic transfer when your DeadMan switch triggers.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-3">
                      <button
                        onClick={() => openCategoryModal('self_custody_crypto')}
                        className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold shadow-[0_0_15px_rgba(16,185,129,0.35)] flex items-center justify-center gap-2"
                      >
                        <Plus className="w-4 h-4" />
                        Add Wallet Blueprint
                      </button>
                      <button
                        onClick={openOnChainFromCrypto}
                        className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-600"
                      >
                        Register On‑Chain Token
                      </button>
                    </div>
                  </div>
                )
              }

              // Generic empty state for other categories
              if (currentCategory && !currentCategory.isFilter && activeCategory !== 'all') {
                return (
                  <div className="min-h-[550px] py-12 flex flex-col items-center justify-center text-center bg-gradient-to-br from-white/[0.02] to-white/[0.01] border border-white/5 rounded-3xl px-6 relative overflow-hidden">
                    <div className="absolute inset-0 bg-blue-500/5 opacity-30"></div>
                    <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-blue-500/10 to-purple-500/10 flex items-center justify-center mb-6 border border-white/5 relative z-10 shadow-[0_0_30px_rgba(59,130,246,0.1)]">
                      <Icon className="h-10 w-10 text-blue-400" />
                    </div>
                    <h3 className="text-2xl font-black text-white mb-2 relative z-10">{currentCategory.label}</h3>
                    <p className="text-slate-400 text-sm max-w-sm mb-10 relative z-10">
                      No encrypted {currentCategory.label.toLowerCase()} found. Secure your first asset in this category now.
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 relative z-10 w-full max-w-lg px-4">
                      <button
                        onClick={() => openCategoryModal(activeCategory)}
                        className="flex flex-col items-center justify-center p-6 rounded-2xl bg-gradient-to-br from-blue-600/20 to-purple-600/20 border border-blue-500/30 hover:border-blue-400/60 hover:from-blue-600/30 hover:to-purple-600/30 transition-all group"
                      >
                        <div className="w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-[0_0_15px_rgba(59,130,246,0.3)]">
                          <Plus className="w-6 h-6 text-blue-400" />
                        </div>
                        <span className="text-white font-bold text-sm">Add {currentCategory.label}</span>
                        <span className="text-slate-400 text-xs mt-1">New encrypted entry</span>
                      </button>

                      <button
                        onClick={() => setIsNewFolderModalOpen(true)}
                        className="flex flex-col items-center justify-center p-6 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-white/20 hover:bg-white/[0.06] transition-all group"
                      >
                        <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                          <FolderPlus className="w-6 h-6 text-slate-300" />
                        </div>
                        <span className="text-white font-bold text-sm">Create Folder</span>
                        <span className="text-slate-400 text-xs mt-1">Organize locally</span>
                      </button>
                    </div>
                  </div>
                )
              }

              // Default empty state for "All Files" or filter views
              return (
                <div className="h-64 flex flex-col items-center justify-center text-center bg-white/[0.02] border border-white/5 rounded-3xl">
                  <Search className="h-12 w-12 text-slate-600 mb-4" />
                  <p className="text-slate-400 font-medium text-sm">No files found matching criteria.</p>
                </div>
              )
            })()
          ) : (
            <div className={viewMode === 'grid' ? "grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4" : "flex flex-col space-y-3"}>
              {/* ALWAYS map folders first, then assets, with stable sort to avoid jumping */}
              {filteredFolders.map(folder =>
                viewMode === 'grid'
                  ? <GridFolderItem key={folder.id} folder={folder} />
                  : <ListFolderItem key={folder.id} folder={folder} />
              )}

              {filteredAssets.map(asset =>
                viewMode === 'grid'
                  ? <GridItem key={asset.id} asset={asset} />
                  : <ListItem key={asset.id} asset={asset} />
              )}
            </div>
          )}
        </div>
      </div>

      {/* Modal matching standard UI glow */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => !isEncrypting && setIsModalOpen(false)} className="absolute inset-0 bg-black/60 backdrop-blur-md" />

            <motion.div initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 20 }} className="relative w-full max-w-md bg-[#0a0c12] border border-white/10 rounded-3xl shadow-[0_30px_60px_rgba(0,0,0,0.8)] overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-600 to-purple-600"></div>

              <div className="flex items-center justify-between px-6 py-5 border-b border-white/5">
                <h3 className="text-lg font-bold text-white flex items-center">
                  <Shield className="w-5 h-5 mr-3 text-blue-500" /> Secure Asset Upload
                </h3>
                <button onClick={() => !isEncrypting && setIsModalOpen(false)} className="text-slate-500 hover:text-white transition-colors bg-white/5 p-1.5 rounded-full">
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="p-6">
                <div className="space-y-6">
                  {/* Dropzone */}
                  <div>
                    <div className={`relative border border-dashed rounded-2xl p-8 text-center transition-all duration-300 ${selectedFile ? 'border-blue-500 bg-blue-500/5' : 'border-slate-700 bg-white/[0.02] hover:border-slate-500'}`}>
                      <input type="file" onChange={handleFileSelect} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
                      {selectedFile ? (
                        <div className="flex flex-col items-center justify-center space-y-2">
                          <CheckCircle className="h-8 w-8 text-emerald-500 shadow-[0_0_15px_theme(colors.emerald.500/40)] rounded-full mb-1" />
                          <p className="text-white font-bold truncate max-w-[200px] text-sm">{selectedFile.name}</p>
                          <p className="text-xs text-slate-500">{formatFileSize(selectedFile.size)}</p>
                        </div>
                      ) : (
                        <div className="flex flex-col items-center">
                          <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center mb-3">
                            <Upload className="w-5 h-5 text-blue-400" />
                          </div>
                          <p className="text-sm font-medium text-white mb-1">Select File to Encrypt</p>
                          <p className="text-xs text-slate-500">Max size 50MB</p>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Details */}
                  <div className="space-y-4">
                    <div>
                      <label className="block text-[10px] uppercase tracking-widest text-slate-400 font-bold mb-2">Asset Name</label>
                      <input type="text" value={assetName} onChange={(e) => setAssetName(e.target.value)} className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:ring-1 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all shadow-inner" placeholder="e.g. Master Passwords" />
                    </div>

                    <div>
                      <label className="block text-[10px] uppercase tracking-widest text-slate-400 font-bold mb-2">Category Classification</label>
                      <div className="relative">
                        <select value={assetType} onChange={(e) => setAssetType(e.target.value)} className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:ring-1 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all appearance-none shadow-inner">
                          <option value="">Auto-Detect Category</option>
                          <option value="crypto_keys">Crypto Keys</option>
                          <option value="bank_account">Bank / Financial Accounts</option>
                          <option value="self_custody_crypto">Self-Custody Crypto (BTC, etc.)</option>
                          <option value="exchange_account">Exchange / Broker Accounts</option>
                          <option value="document">Documentation</option>
                          <option value="photo">Media Backup</option>
                          <option value="business_secret">Secret Notes</option>
                        </select>
                        <div className="absolute right-4 top-3.5 pointer-events-none text-slate-500">▼</div>
                      </div>
                    </div>

                    {/* Nominee Selection */}
                    <div>
                      <label className="block text-[10px] uppercase tracking-widest text-slate-400 font-bold mb-3 flex justify-between">
                        <span>Assign Nominees <span className="text-red-400">*</span></span>
                        <span className="text-blue-500">{selectedBeneficiaries.length} selected</span>
                      </label>
                      {beneficiaries.length === 0 ? (
                        <div className="p-4 bg-yellow-500/5 border border-yellow-500/20 rounded-xl text-center">
                          <p className="text-xs text-yellow-500 mb-2">No nominees found!</p>
                          <button
                            type="button"
                            onClick={() => window.location.href = '/vault/beneficiaries'}
                            className="text-[10px] bg-yellow-500/20 text-yellow-200 px-3 py-1 rounded-full border border-yellow-500/30 hover:bg-yellow-500/30 transition-all"
                          >
                            Add Nominees First
                          </button>
                        </div>
                      ) : (
                        <div className="grid grid-cols-1 gap-2 max-h-32 overflow-y-auto pr-1 custom-scrollbar">
                          {beneficiaries.map(b => (
                            <button
                              key={b.id}
                              type="button"
                              onClick={() => {
                                setSelectedBeneficiaries(prev =>
                                  prev.includes(b.id) ? prev.filter(id => id !== b.id) : [...prev, b.id]
                                )
                              }}
                              className={`flex items-center justify-between px-4 py-2.5 rounded-xl border text-left transition-all ${selectedBeneficiaries.includes(b.id)
                                ? 'bg-blue-500/10 border-blue-500/40 text-blue-400'
                                : 'bg-black/40 border-white/5 text-slate-400 hover:border-white/10'
                                }`}
                            >
                              <span className="text-xs font-semibold truncate">{b.name}</span>
                              <div className={`w-4 h-4 rounded-md border flex items-center justify-center ${selectedBeneficiaries.includes(b.id)
                                ? 'bg-blue-500 border-blue-400'
                                : 'bg-white/5 border-white/10'
                                }`}>
                                {selectedBeneficiaries.includes(b.id) && <CheckCircle className="w-2.5 h-2.5 text-white" />}
                              </div>
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <AnimatePresence>
                    {isEncrypting && (
                      <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="overflow-hidden">
                        <div className="bg-blue-900/10 border border-blue-500/20 p-4 rounded-xl mt-2">
                          <div className="flex justify-between items-center text-xs mb-3">
                            <span className="text-blue-400 font-medium flex items-center">
                              <Lock className="w-3 h-3 mr-1.5" /> AES-256-GCM
                            </span>
                            <span className="text-white font-bold">{uploadProgress}%</span>
                          </div>
                          <div className="w-full h-1.5 bg-black/50 rounded-full overflow-hidden">
                            <motion.div className="h-full bg-gradient-to-r from-blue-500 to-emerald-400" initial={{ width: 0 }} animate={{ width: `${uploadProgress}%` }} transition={{ ease: 'easeInOut', duration: 0.2 }} />
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>

              <div className="p-4 bg-white/[0.02] border-t border-white/5 flex gap-3">
                <button onClick={() => setIsModalOpen(false)} disabled={isEncrypting} className="flex-1 py-3 text-sm font-medium text-slate-400 hover:text-white bg-white/5 hover:bg-white/10 rounded-xl transition-all disabled:opacity-50">
                  Cancel
                </button>
                <button onClick={handleCreateAsset} disabled={!selectedFile || !assetType || !assetName || isEncrypting} className="flex-[2] py-3 text-sm font-bold text-white bg-blue-600 hover:bg-blue-500 rounded-xl transition-all shadow-[0_0_15px_rgba(37,99,235,0.3)] flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed">
                  {isEncrypting ? <><Shield className="w-4 h-4 mr-2 animate-pulse" /> Ciphering...</> : 'Encrypt Asset'}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* New Folder Creation Modal */}
      <AnimatePresence>
        {isNewFolderModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsNewFolderModalOpen(false)} className="absolute inset-0 bg-black/60 backdrop-blur-md" />

            <motion.div initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 20 }} className="relative w-full max-w-sm bg-[#0a0c12] border border-white/10 rounded-3xl shadow-[0_30px_60px_rgba(0,0,0,0.8)] overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#1152d4] to-cyan-400"></div>

              <div className="flex items-center justify-between px-6 py-5 border-b border-white/5">
                <h3 className="text-lg font-bold text-white flex items-center">
                  <FolderPlus className="w-5 h-5 mr-3 text-blue-400" /> Create Directory
                </h3>
                <button onClick={() => setIsNewFolderModalOpen(false)} className="text-slate-500 hover:text-white transition-colors bg-white/5 p-1.5 rounded-full">
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="p-6">
                <label className="block text-[10px] uppercase tracking-widest text-slate-400 font-bold mb-2">Folder Name</label>
                <input
                  type="text"
                  value={newFolderName}
                  onChange={(e) => setNewFolderName(e.target.value)}
                  autoFocus
                  onKeyDown={(e) => e.key === 'Enter' && handleCreateFolder()}
                  className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:ring-1 focus:ring-[#1152d4] focus:border-[#1152d4] outline-none transition-all shadow-inner"
                  placeholder="e.g. Legal Documents 2026"
                />

                {/* Add Nominee selection for Folders too */}
                <div className="mt-6">
                  <label className="block text-[10px] uppercase tracking-widest text-slate-400 font-bold mb-3 flex justify-between">
                    <span>Default Folder Nominees</span>
                    <span className="text-blue-500">{selectedBeneficiaries.length} selected</span>
                  </label>
                  {beneficiaries.length === 0 ? (
                    <div className="p-3 bg-white/5 border border-white/10 rounded-xl text-center">
                      <p className="text-[10px] text-slate-500">No nominees available.</p>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 gap-1.5 max-h-32 overflow-y-auto pr-1 custom-scrollbar">
                      {beneficiaries.map(b => (
                        <button
                          key={b.id}
                          type="button"
                          onClick={() => {
                            setSelectedBeneficiaries(prev =>
                              prev.includes(b.id) ? prev.filter(id => id !== b.id) : [...prev, b.id]
                            )
                          }}
                          className={`flex items-center justify-between px-3 py-2 rounded-xl border text-left transition-all ${selectedBeneficiaries.includes(b.id)
                            ? 'bg-blue-500/10 border-blue-500/40 text-blue-400'
                            : 'bg-black/40 border-white/5 text-slate-400 hover:border-white/10'
                            }`}
                        >
                          <span className="text-[11px] font-semibold truncate">{b.name}</span>
                          <div className={`w-3.5 h-3.5 rounded-md border flex items-center justify-center ${selectedBeneficiaries.includes(b.id)
                            ? 'bg-blue-500 border-blue-400'
                            : 'bg-white/5 border-white/10'
                            }`}>
                            {selectedBeneficiaries.includes(b.id) && <CheckCircle className="w-2 h-2 text-white" />}
                          </div>
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                <p className="text-xs text-slate-500 mt-4">This folder will reside {currentFolderId ? `inside ${breadcrumbs[breadcrumbs.length - 1]?.name}` : 'in the Root Drive Sandbox'}.</p>
              </div>

              <div className="p-4 bg-white/[0.02] border-t border-white/5 flex gap-3">
                <button onClick={() => setIsNewFolderModalOpen(false)} className="flex-1 py-3 text-sm font-medium text-slate-400 hover:text-white bg-white/5 hover:bg-white/10 rounded-xl transition-all">
                  Cancel
                </button>
                <button onClick={handleCreateFolder} disabled={!newFolderName.trim()} className="flex-1 py-3 text-sm font-bold text-white bg-[#1152d4] hover:bg-[#1152d4]/80 rounded-xl transition-all shadow-[0_0_15px_rgba(17,82,212,0.3)] disabled:opacity-50">
                  Create
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* On-Chain Token Registration Modal */}
      <AnimatePresence>
        {isOnChainModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsOnChainModalOpen(false)} className="absolute inset-0 bg-black/60 backdrop-blur-md" />

            <motion.div initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 20 }} className="relative w-full max-w-md bg-[#05070a] border border-white/10 rounded-3xl shadow-[0_30px_60px_rgba(0,0,0,0.8)] overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-yellow-400 via-emerald-400 to-blue-500"></div>

              <div className="flex items-center justify-between px-6 py-5 border-b border-white/5">
                <h3 className="text-lg font-bold text-white flex items-center">
                  <Coins className="w-5 h-5 mr-3 text-yellow-400" /> Register On-Chain Token
                </h3>
                <button onClick={() => setIsOnChainModalOpen(false)} className="text-slate-500 hover:text-white transition-colors bg-white/5 p-1.5 rounded-full">
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="p-6 space-y-4">
                <div>
                  <label className="block text-[10px] uppercase tracking-widest text-slate-400 font-bold mb-2">Token Contract Address</label>
                  <input
                    type="text"
                    value={onChainForm.tokenAddress}
                    onChange={(e) => setOnChainForm(prev => ({ ...prev, tokenAddress: e.target.value }))}
                    className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:ring-1 focus:ring-yellow-400 focus:border-yellow-400 outline-none transition-all shadow-inner font-mono"
                    placeholder="0x..."
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[10px] uppercase tracking-widest text-slate-400 font-bold mb-2">Token Type</label>
                    <select
                      value={onChainForm.tokenType}
                      onChange={(e) => setOnChainForm(prev => ({ ...prev, tokenType: e.target.value as 'erc20' | 'erc721' }))}
                      className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:ring-1 focus:ring-yellow-400 focus:border-yellow-400 outline-none transition-all"
                    >
                      <option value="erc20">ERC‑20 (fungible)</option>
                      <option value="erc721">ERC‑721 (NFT)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[10px] uppercase tracking-widest text-slate-400 font-bold mb-2">
                      {onChainForm.tokenType === 'erc20' ? 'Amount (wei)' : 'Token ID'}
                    </label>
                    <input
                      type="text"
                      value={onChainForm.amountOrId}
                      onChange={(e) => setOnChainForm(prev => ({ ...prev, amountOrId: e.target.value }))}
                      className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:ring-1 focus:ring-yellow-400 focus:border-yellow-400 outline-none transition-all shadow-inner"
                      placeholder={onChainForm.tokenType === 'erc20' ? 'e.g. 1000000000000000000' : 'e.g. 1'}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] uppercase tracking-widest text-slate-400 font-bold mb-2">Beneficiary</label>
                  <select
                    value={onChainForm.beneficiaryId}
                    onChange={(e) => setOnChainForm(prev => ({ ...prev, beneficiaryId: e.target.value }))}
                    className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:ring-1 focus:ring-yellow-400 focus:border-yellow-400 outline-none transition-all"
                  >
                    <option value="">Select beneficiary...</option>
                    {beneficiaries.map((b: any) => (
                      <option key={b.id} value={b.id}>
                        {b.name} ({b.walletAddress || 'no wallet'})
                      </option>
                    ))}
                  </select>
                </div>

                <p className="text-[11px] text-slate-500 leading-relaxed">
                  Make sure you have **approved** the Digital Will contract to move this token from your wallet.
                  On trigger, the contract will transfer this amount / token ID directly to the selected beneficiary.
                </p>
              </div>

              <div className="p-4 bg-white/[0.02] border-t border-white/5 flex gap-3">
                <button onClick={() => setIsOnChainModalOpen(false)} className="flex-1 py-3 text-sm font-medium text-slate-400 hover:text-white bg-white/5 hover:bg-white/10 rounded-xl transition-all">
                  Cancel
                </button>
                <button
                  onClick={handleRegisterOnChainAsset}
                  disabled={!onChainForm.tokenAddress || !onChainForm.amountOrId || !onChainForm.beneficiaryId}
                  className="flex-1 py-3 text-sm font-bold text-black bg-yellow-400 hover:bg-yellow-300 rounded-xl transition-all shadow-[0_0_15px_rgba(250,204,21,0.4)] disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Register Token
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
      {/* Share Folder Modal */}
      <AnimatePresence>
        {isShareFolderModalOpen && shareFolderTarget && (
          <div className="fixed inset-0 z-[110] flex items-center justify-center px-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsShareFolderModalOpen(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-md"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-md bg-[#05070a] border border-white/10 rounded-3xl shadow-[0_30px_60px_rgba(0,0,0,0.8)] overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-400 via-blue-500 to-purple-500" />

              <div className="flex items-center justify-between px-6 py-5 border-b border-white/5">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-400 border border-emerald-500/30">
                    <Shield className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-white">Share Folder Access</h3>
                    <p className="text-[11px] text-slate-400">
                      Choose who receives this folder when the protocol triggers.
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setIsShareFolderModalOpen(false)}
                  className="text-slate-500 hover:text-white transition-colors bg-white/5 p-1.5 rounded-full"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="p-6 space-y-5">
                <div className="bg-slate-900/60 border border-slate-800 rounded-2xl px-4 py-3 mb-1 flex items-center justify-between">
                  <div>
                    <p className="text-xs font-semibold text-slate-400 tracking-widest uppercase">Folder</p>
                    <p className="text-sm font-bold text-white truncate max-w-[220px]" title={shareFolderTarget.name}>
                      {shareFolderTarget.name}
                    </p>
                  </div>
                </div>

                {beneficiaries.length === 0 ? (
                  <div className="text-center py-10 bg-slate-900/40 border border-slate-800 rounded-2xl">
                    <p className="text-slate-400 text-sm mb-1">No beneficiaries configured yet.</p>
                    <p className="text-slate-500 text-xs">
                      Add beneficiaries first from the Beneficiaries tab, then share this folder.
                    </p>
                  </div>
                ) : (
                  <div className="max-h-64 overflow-y-auto space-y-2 custom-scrollbar">
                    {beneficiaries.map((b: any) => {
                      const checked = shareFolderSelection.includes(b.id)
                      return (
                        <button
                          key={b.id}
                          type="button"
                          onClick={() => toggleShareSelection(b.id)}
                          className={`w-full flex items-center justify-between px-4 py-3 rounded-xl border text-left transition-all ${checked
                            ? 'bg-emerald-500/10 border-emerald-500/40'
                            : 'bg-slate-900/40 border-slate-800 hover:border-slate-600'
                            }`}
                        >
                          <div>
                            <p className="text-sm font-semibold text-white">{b.name}</p>
                            <p className="text-[11px] text-slate-400">{b.email}</p>
                          </div>
                          <div
                            className={`w-5 h-5 rounded-md border flex items-center justify-center ${checked
                              ? 'bg-emerald-500 border-emerald-400'
                              : 'bg-slate-900 border-slate-600'
                              }`}
                          >
                            {checked && <CheckCircle className="w-3 h-3 text-white" />}
                          </div>
                        </button>
                      )
                    })}
                  </div>
                )}

                <p className="text-[11px] text-slate-500 leading-relaxed">
                  Selected beneficiaries will receive decryption rights to assets in this folder{' '}
                  <span className="text-slate-200 font-semibold">only after your DeadMan heartbeat stops</span>{' '}
                  and the protocol marks your vault as triggered.
                </p>
              </div>

              <div className="p-4 bg-white/[0.02] border-t border-white/5 flex gap-3">
                <button
                  onClick={() => setIsShareFolderModalOpen(false)}
                  className="flex-1 py-3 text-sm font-medium text-slate-400 hover:text-white bg-white/5 hover:bg-white/10 rounded-xl transition-all"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveFolderSharing}
                  disabled={beneficiaries.length === 0}
                  className="flex-1 py-3 text-sm font-bold text-white bg-emerald-600 hover:bg-emerald-500 rounded-xl transition-all shadow-[0_0_15px_rgba(16,185,129,0.35)] disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Save Access Rules
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Share Asset Modal */}
      <AnimatePresence>
        {isShareAssetModalOpen && shareAssetTarget && (
          <div className="fixed inset-0 z-[110] flex items-center justify-center px-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsShareAssetModalOpen(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-md"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-md bg-[#05070a] border border-white/10 rounded-3xl shadow-[0_30px_60px_rgba(0,0,0,0.8)] overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-emerald-400 to-purple-500" />

              <div className="flex items-center justify-between px-6 py-5 border-b border-white/5">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-400 border border-blue-500/30">
                    <Shield className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-white">Share Asset Access</h3>
                    <p className="text-[11px] text-slate-400">
                      Choose which nominee receives decryption rights to this asset.
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setIsShareAssetModalOpen(false)}
                  className="text-slate-500 hover:text-white transition-colors bg-white/5 p-1.5 rounded-full"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="p-6 space-y-5">
                <div className="bg-slate-900/60 border border-slate-800 rounded-2xl px-4 py-3 mb-1 flex items-center justify-between">
                  <div>
                    <p className="text-xs font-semibold text-slate-400 tracking-widest uppercase">Asset</p>
                    <p className="text-sm font-bold text-white truncate max-w-[220px]" title={shareAssetTarget.name}>
                      {shareAssetTarget.name}
                    </p>
                  </div>
                </div>

                {beneficiaries.length === 0 ? (
                  <div className="text-center py-10 bg-slate-900/40 border border-slate-800 rounded-2xl">
                    <p className="text-slate-400 text-sm mb-1">No beneficiaries configured yet.</p>
                  </div>
                ) : (
                  <div className="max-h-64 overflow-y-auto space-y-2 custom-scrollbar">
                    {beneficiaries.map((b: any) => {
                      const checked = shareAssetSelection.includes(b.id)
                      return (
                        <button
                          key={b.id}
                          type="button"
                          onClick={() => toggleAssetShareSelection(b.id)}
                          className={`w-full flex items-center justify-between px-4 py-3 rounded-xl border text-left transition-all ${checked
                            ? 'bg-blue-500/10 border-blue-500/40'
                            : 'bg-slate-900/40 border-slate-800 hover:border-slate-600'
                            }`}
                        >
                          <div>
                            <p className="text-sm font-semibold text-white">{b.name}</p>
                            <p className="text-[11px] text-slate-400">{b.email}</p>
                          </div>
                          <div
                            className={`w-5 h-5 rounded-md border flex items-center justify-center ${checked
                              ? 'bg-blue-500 border-blue-400'
                              : 'bg-slate-900 border-slate-600'
                              }`}
                          >
                            {checked && <CheckCircle className="w-3 h-3 text-white" />}
                          </div>
                        </button>
                      )
                    })}
                  </div>
                )}
              </div>

              <div className="p-4 bg-white/[0.02] border-t border-white/5 flex gap-3">
                <button
                  onClick={() => setIsShareAssetModalOpen(false)}
                  className="flex-1 py-3 text-sm font-medium text-slate-400 hover:text-white bg-white/5 hover:bg-white/10 rounded-xl transition-all"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveAssetSharing}
                  disabled={beneficiaries.length === 0}
                  className="flex-1 py-3 text-sm font-bold text-white bg-blue-600 hover:bg-blue-500 rounded-xl transition-all shadow-[0_0_15px_rgba(59,130,246,0.35)] disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Save Access Rules
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Context Menu (Right Click) */}
      <AnimatePresence>
        {contextMenu && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[120]"
            onClick={closeContextMenu}
          >
            <div
              className="absolute z-[121] min-w-[180px] bg-[#05070a] border border-slate-700 rounded-xl shadow-2xl py-1"
              style={{ top: contextMenu.y, left: contextMenu.x }}
              onClick={(e) => e.stopPropagation()}
            >
              {contextMenu.target === 'root' && (
                <>
                  <button
                    className="w-full px-4 py-2 text-sm text-slate-200 hover:bg-slate-800 flex items-center gap-2"
                    onClick={() => {
                      closeContextMenu()
                      setIsNewFolderModalOpen(true)
                    }}
                  >
                    <FolderPlus className="w-4 h-4 text-blue-400" />
                    New Folder
                  </button>
                  <button
                    className="w-full px-4 py-2 text-sm text-slate-200 hover:bg-slate-800 flex items-center gap-2"
                    onClick={() => {
                      closeContextMenu()
                      setIsModalOpen(true)
                    }}
                  >
                    <Shield className="w-4 h-4 text-emerald-400" />
                    Secure Asset
                  </button>
                </>
              )}

              {contextMenu.target === 'folder' && contextMenu.folder && (
                <>
                  <button
                    className="w-full px-4 py-2 text-sm text-slate-200 hover:bg-slate-800 flex items-center gap-2"
                    onClick={() => {
                      closeContextMenu()
                      setCurrentFolderId(contextMenu.folder!.id)
                    }}
                  >
                    <FolderOpen className="w-4 h-4 text-blue-400" />
                    Open
                  </button>
                  <button
                    className="w-full px-4 py-2 text-sm text-slate-200 hover:bg-slate-800 flex items-center gap-2"
                    onClick={() => {
                      closeContextMenu()
                      openShareFolderModal(contextMenu.folder!)
                    }}
                  >
                    <Shield className="w-4 h-4 text-emerald-400" />
                    Share Folder
                  </button>
                  <button
                    className="w-full px-4 py-2 text-sm text-red-400 hover:bg-red-500/10 flex items-center gap-2"
                    onClick={() => {
                      closeContextMenu()
                      handleDeleteFolder(contextMenu.folder!.id, contextMenu.folder!.name)
                    }}
                  >
                    <Trash2 className="w-4 h-4" />
                    Delete
                  </button>
                </>
              )}

              {contextMenu.target === 'asset' && contextMenu.asset && (
                <>
                  <button
                    className="w-full px-4 py-2 text-sm text-slate-200 hover:bg-slate-800 flex items-center gap-2"
                    onClick={() => {
                      closeContextMenu()
                      handleViewAsset(contextMenu.asset!)
                    }}
                  >
                    <Eye className="w-4 h-4 text-blue-400" />
                    View Asset
                  </button>
                  <button
                    className="w-full px-4 py-2 text-sm text-slate-200 hover:bg-slate-800 flex items-center gap-2"
                    onClick={() => {
                      closeContextMenu()
                      openShareAssetModal(contextMenu.asset!)
                    }}
                  >
                    <Shield className="w-4 h-4 text-emerald-400" />
                    Share Asset
                  </button>
                  <button
                    className="w-full px-4 py-2 text-sm text-red-400 hover:bg-red-500/10 flex items-center gap-2"
                    onClick={() => {
                      closeContextMenu()
                      handleDeleteAsset(contextMenu.asset!.id, contextMenu.asset!.name)
                    }}
                  >
                    <Trash2 className="w-4 h-4" />
                    Delete
                  </button>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Category-Specific Modal */}
      {selectedCategory && (
        <CategoryModal
          isOpen={isCategoryModalOpen}
          onClose={() => {
            setIsCategoryModalOpen(false)
            setSelectedCategory(null)
          }}
          category={selectedCategory}
          beneficiaries={beneficiaries}
          onSubmit={handleCategorySubmit}
        />
      )}

      {/* View Asset Modal */}
      <AnimatePresence>
        {isViewModalOpen && viewingAsset && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setIsViewModalOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 border border-white/10 rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-hidden"
            >
              {/* Header */}
              <div className="bg-gradient-to-r from-blue-600/10 to-purple-600/10 border-b border-white/10 p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center">
                      <Eye className="w-6 h-6 text-blue-400" />
                    </div>
                    <div>
                      <h2 className="text-xl font-bold text-white">{viewingAsset.name}</h2>
                      <p className="text-xs text-slate-400 mt-1">
                        {new Date(viewingAsset.createdAt).toLocaleString()} • {formatFileSize(viewingAsset.size)}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => setIsViewModalOpen(false)}
                    className="text-slate-400 hover:text-white transition-colors p-2 hover:bg-white/5 rounded-lg"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 overflow-y-auto max-h-[calc(90vh-200px)]">
                {isDecrypting ? (
                  <div className="flex flex-col items-center justify-center py-12">
                    <div className="w-16 h-16 border-4 border-blue-500/20 border-t-blue-500 rounded-full animate-spin mb-4"></div>
                    <p className="text-slate-400 text-sm">Decrypting data...</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {/* Beneficiaries */}
                    {viewingAsset.beneficiaries && viewingAsset.beneficiaries.length > 0 && (
                      <div className="bg-blue-500/5 border border-blue-500/10 rounded-xl p-4">
                        <p className="text-xs uppercase tracking-widest text-blue-400 font-bold mb-2">Shared With</p>
                        <div className="flex flex-wrap gap-2">
                          {viewingAsset.beneficiaries.map((benId, idx) => {
                            const ben = beneficiaries.find((b: any) => b.id === benId)
                            return (
                              <span key={idx} className="text-xs bg-blue-500/10 text-blue-300 px-3 py-1 rounded-full">
                                {ben?.name || `Beneficiary ${idx + 1}`}
                              </span>
                            )
                          })}
                        </div>
                      </div>
                    )}

                    {/* Decrypted Content */}
                    <div className="bg-black/40 border border-white/10 rounded-xl p-4">
                      <p className="text-xs uppercase tracking-widest text-slate-400 font-bold mb-3 flex items-center gap-2">
                        <Lock className={`w-3 h-3 ${decryptedContent?.includes('Failed') ? 'text-red-400' : 'text-green-400'}`} />
                        {decryptedContent?.includes('Failed') ? 'Decryption Failed' : 'Decrypted Content'}
                      </p>

                      {decryptedContent?.includes('Key distribution not found') ? (
                        <div className="py-8 px-4 text-center">
                          <Shield className="w-12 h-12 text-slate-600 mx-auto mb-4 opacity-50" />
                          <p className="text-slate-400 text-sm leading-relaxed mb-4">
                            Encryption key for this asset is not found in local storage or cloud backup.
                          </p>
                          <div className="inline-block p-1 rounded-lg bg-yellow-400/10 border border-yellow-400/20">
                            <p className="text-[10px] font-bold text-yellow-400 px-3 uppercase">Recommendation: Delete and re-upload this asset</p>
                          </div>
                        </div>
                      ) : (viewingAsset.type?.toLowerCase() === 'photo' || viewingAsset.mimeType?.toLowerCase().startsWith('image/')) && !decryptedContent?.includes('Failed') ? (
                        <div className="flex justify-center bg-slate-900/40 rounded-lg p-2 overflow-hidden min-h-[300px] items-center">
                          <img
                            src={decryptedContent.startsWith('blob:') || decryptedContent.startsWith('data:image') ? decryptedContent : `data:${viewingAsset.mimeType || 'image/png'};base64,${decryptedContent}`}
                            alt={viewingAsset.name}
                            className="max-h-[50vh] object-contain rounded-md shadow-2xl"
                          />
                        </div>
                      ) : (
                        <pre className="text-sm text-slate-200 whitespace-pre-wrap font-mono overflow-x-auto">
                          {decryptedContent}
                        </pre>
                      )}
                    </div>

                    {/* Metadata */}
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-white/5 border border-white/5 rounded-xl p-4 group hover:bg-white/10 transition-colors">
                        <p className="text-xs text-slate-500 mb-1">Type</p>
                        <p className="text-sm text-white font-medium uppercase tracking-tighter">{viewingAsset.type.replace('_', ' ')}</p>
                      </div>
                      <div className="bg-white/5 border border-white/5 rounded-xl p-4 group hover:bg-white/10 transition-colors">
                        <p className="text-xs text-slate-500 mb-1">IPFS CID</p>
                        <p className="text-[10px] text-blue-400 font-mono truncate">{viewingAsset.ipfsHash || 'Qm...fallback (Cloud Copy Active)'}</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Footer */}
              <div className="border-t border-white/10 p-6 bg-black/20">
                <button
                  onClick={() => setIsViewModalOpen(false)}
                  className="w-full px-6 py-3 bg-white/5 hover:bg-white/10 text-white rounded-xl transition-all font-medium"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Delete Asset Confirmation Dialog */}
      <ConfirmationDialog
        isOpen={deleteConfirmation.isOpen}
        onClose={() => setDeleteConfirmation({ isOpen: false, assetId: null, assetName: '' })}
        onConfirm={confirmDeleteAsset}
        title="Delete Asset?"
        message={`Are you sure you want to permanently delete "${deleteConfirmation.assetName}"? This action cannot be undone and all encrypted data will be lost.`}
        confirmText="Delete"
        cancelText="Cancel"
        type="danger"
      />

      {/* Delete Folder Confirmation Dialog */}
      <ConfirmationDialog
        isOpen={deleteFolderConfirmation.isOpen}
        onClose={() => setDeleteFolderConfirmation({ isOpen: false, folderId: null, folderName: '' })}
        onConfirm={confirmDeleteFolder}
        title="Delete Folder?"
        message={`Are you sure you want to delete "${deleteFolderConfirmation.folderName}" and ALL its contents? This will permanently remove all assets inside this folder and cannot be undone.`}
        confirmText="Delete All"
        cancelText="Cancel"
        type="danger"
      />

      {/* Rename Folder Modal */}
      <AnimatePresence>
        {renameFolderState.isOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setRenameFolderState({ ...renameFolderState, isOpen: false })} className="absolute inset-0 bg-black/60 backdrop-blur-md" />

            <motion.div initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 20 }} className="relative w-full max-w-sm bg-[#0a0c12] border border-white/10 rounded-3xl shadow-[0_30px_60px_rgba(0,0,0,0.8)] overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-purple-500"></div>

              <div className="flex items-center justify-between px-6 py-5 border-b border-white/5">
                <h3 className="text-lg font-bold text-white flex items-center">
                  <Pencil className="w-5 h-5 mr-3 text-blue-400" /> Rename Folder
                </h3>
                <button onClick={() => setRenameFolderState({ ...renameFolderState, isOpen: false })} className="text-slate-500 hover:text-white transition-colors bg-white/5 p-1.5 rounded-full">
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="p-6">
                <label className="block text-[10px] uppercase tracking-widest text-slate-400 font-bold mb-2">New Name</label>
                <input
                  type="text"
                  value={renameInput}
                  onChange={(e) => setRenameInput(e.target.value)}
                  autoFocus
                  onKeyDown={(e) => e.key === 'Enter' && handleRenameFolder()}
                  className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:ring-1 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all shadow-inner"
                />
              </div>

              <div className="p-4 bg-white/[0.02] border-t border-white/5 flex gap-3">
                <button onClick={() => setRenameFolderState({ ...renameFolderState, isOpen: false })} className="flex-1 py-3 text-sm font-medium text-slate-400 hover:text-white bg-white/5 hover:bg-white/10 rounded-xl transition-all">
                  Cancel
                </button>
                <button onClick={handleRenameFolder} disabled={!renameInput.trim() || renameInput === renameFolderState.currentName} className="flex-[2] py-3 text-sm font-bold text-white bg-blue-600 hover:bg-blue-500 rounded-xl transition-all shadow-[0_0_15px_rgba(37,99,235,0.3)] disabled:opacity-50">
                  Save Changes
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  )
}