'use client'

import { useState, useEffect, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  FileText, Upload, Lock, Key, Trash2, Eye, Download, Shield,
  CheckCircle, AlertCircle, Plus, Search, Grid, List as ListIcon,
  Image as ImageIcon, Video, File, FolderOpen, MoreVertical, X, XCircle
} from 'lucide-react'
import WebCryptoService from '@/lib/crypto'
import WebStorageService, { StoredAsset } from '@/lib/storage'

export function AssetCreationForm() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [assetType, setAssetType] = useState<string>('')
  const [assetName, setAssetName] = useState<string>('')
  const [isEncrypting, setIsEncrypting] = useState(false)

  const [assets, setAssets] = useState<StoredAsset[]>([])
  const [beneficiaries, setBeneficiaries] = useState<any[]>([])
  const [uploadProgress, setUploadProgress] = useState(0)

  // New UI States
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [searchQuery, setSearchQuery] = useState('')
  const [activeCategory, setActiveCategory] = useState<string>('all')

  const crypto = WebCryptoService.getInstance()
  const storage = WebStorageService.getInstance()

  useEffect(() => {
    loadAssets()
    loadBeneficiaries()
  }, [])

  const loadAssets = async () => {
    try {
      const storedAssets = await storage.getAllAssets()
      setAssets(storedAssets)
    } catch (error) {
      console.error('Failed to load assets:', error)
    }
  }

  const loadBeneficiaries = async () => {
    try {
      const storedBeneficiaries = await storage.getAllBeneficiaries()
      setBeneficiaries(storedBeneficiaries)
    } catch (error) {
      console.error('Failed to load beneficiaries:', error)
    }
  }

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setSelectedFile(file)
      if (!assetName) {
        setAssetName(file.name)
      }

      // Auto-detect asset type based on mime type
      if (file.type.startsWith('image/')) setAssetType('photo')
      else if (file.type.startsWith('video/')) setAssetType('photo') // group media
      else if (file.type.startsWith('audio/')) setAssetType('audio_message')
      else if (file.type === 'application/pdf' || file.type.includes('document')) setAssetType('document')
      else if (!assetType) setAssetType('document') // Default
    }
  }

  const handleCreateAsset = async () => {
    if (!selectedFile || !assetType || !assetName) return

    setIsEncrypting(true)
    setUploadProgress(0)

    try {
      setUploadProgress(20)
      const fileContent = await readFileAsText(selectedFile)

      setUploadProgress(40)
      const encryptionResult = await crypto.encryptData(fileContent)

      setUploadProgress(60)
      const keyDistribution = await crypto.splitKey(crypto.generateEncryptionKey())

      setUploadProgress(75)
      const ipfsHash = await crypto.uploadToIPFS(encryptionResult.encryptedData)

      setUploadProgress(90)
      const asset: StoredAsset = {
        id: storage.generateId(),
        name: assetName,
        type: assetType,
        encryptedData: encryptionResult.encryptedData,
        keyId: encryptionResult.keyId,
        iv: encryptionResult.iv,
        ipfsHash,
        beneficiaries: beneficiaries.map(b => b.walletAddress),
        createdAt: encryptionResult.timestamp,
        size: selectedFile.size,
        mimeType: selectedFile.type
      }

      await storage.saveAsset(asset)
      await storage.saveKeyDistribution(keyDistribution)

      setUploadProgress(100)

      // Smoothly close modal and reset
      setTimeout(() => {
        setIsModalOpen(false)
        resetForm()
        loadAssets()
      }, 800)

    } catch (error) {
      console.error('Asset creation failed:', error)
      alert('Failed to create asset. Please try again.')
      setIsEncrypting(false)
    }
  }

  const resetForm = () => {
    setSelectedFile(null)
    setAssetType('')
    setAssetName('')
    setUploadProgress(0)
    setIsEncrypting(false)
  }

  const handleDeleteAsset = async (assetId: string) => {
    if (confirm('Are you sure you want to permanently delete this digital asset?')) {
      try {
        await storage.deleteAsset(assetId)
        await loadAssets()
      } catch (error) {
        console.error('Failed to delete asset:', error)
      }
    }
  }

  const readFileAsText = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.onload = () => {
        if (typeof reader.result === 'string') resolve(reader.result)
        else if (reader.result instanceof ArrayBuffer) {
          const bytes = new Uint8Array(reader.result)
          let binary = ''
          for (let i = 0; i < bytes.byteLength; i++) {
            binary += String.fromCharCode(bytes[i])
          }
          resolve(btoa(binary))
        } else reject(new Error('Unexpected file read result'))
      }
      reader.onerror = () => reject(reader.error)

      if (file.type.startsWith('text/') || file.type === 'application/json') {
        reader.readAsText(file)
      } else {
        reader.readAsArrayBuffer(file)
      }
    })
  }

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 B'
    const k = 1024
    const sizes = ['B', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i]
  }

  // File System Helpers
  const getAssetIcon = (type: string, mimeType?: string) => {
    if (type === 'crypto_keys') return <Key className="h-8 w-8 text-yellow-500" />
    if (type === 'photo' || mimeType?.startsWith('image/')) return <ImageIcon className="h-8 w-8 text-blue-500" />
    if (mimeType?.startsWith('video/')) return <Video className="h-8 w-8 text-purple-500" />
    if (type === 'business_secret') return <Lock className="h-8 w-8 text-rose-500" />
    if (type === 'document' || mimeType?.includes('pdf')) return <FileText className="h-8 w-8 text-emerald-500" />
    return <File className="h-8 w-8 text-slate-400" />
  }

  const filteredAssets = useMemo(() => {
    return assets.filter(asset => {
      const matchesSearch = asset.name.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesCategory = activeCategory === 'all' || asset.type === activeCategory
      return matchesSearch && matchesCategory;
    }).sort((a, b) => b.createdAt - a.createdAt)
  }, [assets, searchQuery, activeCategory])

  const categories = [
    { id: 'all', label: 'All Files', icon: FolderOpen },
    { id: 'document', label: 'Documents', icon: FileText },
    { id: 'photo', label: 'Media', icon: ImageIcon },
    { id: 'crypto_keys', label: 'Crypto & Bank', icon: Key },
    { id: 'business_secret', label: 'Secrets', icon: Lock },
  ]

  // UI Components
  const GridItem = ({ asset }: { asset: StoredAsset }) => (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className="group relative bg-slate-900/40 border border-slate-800/60 hover:border-blue-500/50 hover:bg-slate-800/80 rounded-2xl p-4 transition-all duration-300 cursor-pointer flex flex-col items-center text-center shadow-lg"
    >
      <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
        <div className="relative group/menu">
          <button className="p-1.5 hover:bg-slate-700 rounded-lg text-slate-400 hover:text-white transition-colors">
            <MoreVertical className="h-4 w-4" />
          </button>
          {/* Dropdown snippet */}
          <div className="absolute right-0 top-8 mt-1 w-32 bg-slate-800 border border-slate-700 rounded-xl shadow-xl opacity-0 invisible group-hover/menu:opacity-100 group-hover/menu:visible transition-all z-20">
            <button className="w-full text-left px-4 py-2 text-sm text-slate-300 hover:text-white hover:bg-slate-700/50 rounded-t-xl flex items-center">
              <Eye className="h-3 w-3 mr-2" /> View
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); handleDeleteAsset(asset.id) }}
              className="w-full text-left px-4 py-2 text-sm text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-b-xl flex items-center"
            >
              <Trash2 className="h-3 w-3 mr-2" /> Delete
            </button>
          </div>
        </div>
      </div>

      <div className="h-16 w-16 bg-slate-800/80 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
        {getAssetIcon(asset.type, asset.mimeType)}
      </div>
      <h3 className="text-sm font-semibold text-slate-200 truncate w-full px-2" title={asset.name}>
        {asset.name}
      </h3>
      <div className="flex items-center justify-center space-x-2 mt-2 text-xs text-slate-500">
        <Shield className="h-3 w-3 text-green-500/70" />
        <span>{formatFileSize(asset.size)}</span>
      </div>
    </motion.div>
  )

  const ListItem = ({ asset }: { asset: StoredAsset }) => (
    <motion.div
      layout
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      className="group flex items-center bg-slate-900/40 border border-slate-800/60 hover:border-blue-500/50 hover:bg-slate-800/80 rounded-xl p-3 transition-all duration-300 cursor-pointer shadow-sm"
    >
      <div className="h-10 w-10 bg-slate-800 rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
        {getAssetIcon(asset.type, asset.mimeType)}
      </div>
      <div className="flex-1 min-w-0">
        <h3 className="text-sm font-semibold text-slate-200 truncate" title={asset.name}>
          {asset.name}
        </h3>
        <p className="text-xs text-slate-500 flex items-center mt-0.5">
          <Shield className="h-3 w-3 text-green-500/70 mr-1" />
          Encrypted • {new Date(asset.createdAt).toLocaleDateString()}
        </p>
      </div>
      <div className="hidden md:block w-24 text-right text-sm text-slate-400 pr-4">
        {formatFileSize(asset.size)}
      </div>
      <div className="flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
        <button className="p-2 bg-slate-800 hover:bg-slate-700 rounded-lg text-slate-300 transition-colors">
          <Eye className="h-4 w-4" />
        </button>
        <button
          onClick={(e) => { e.stopPropagation(); handleDeleteAsset(asset.id) }}
          className="p-2 bg-red-500/10 hover:bg-red-500/20 text-red-500 rounded-lg transition-colors"
        >
          <Trash2 className="h-4 w-4" />
        </button>
      </div>
    </motion.div>
  )

  return (
    <div className="flex flex-col h-[calc(100vh-120px)] w-full">
      {/* File System Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight flex items-center">
            <FolderOpen className="mr-3 h-6 w-6 text-blue-500" />
            Vault Drive
          </h1>
          <p className="text-sm text-slate-400 mt-1 ml-9">Securely encrypted files mapped to your digital will</p>
        </div>

        <div className="flex items-center space-x-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search vault..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-2.5 bg-slate-900/60 border border-slate-700/80 rounded-xl text-sm text-white focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all w-full md:w-64"
            />
          </div>

          <div className="flex bg-slate-900/60 border border-slate-700/80 rounded-xl p-1">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-1.5 rounded-lg transition-colors ${viewMode === 'grid' ? 'bg-slate-800 text-white shadow-sm' : 'text-slate-400 hover:text-white hover:bg-slate-800/50'}`}
            >
              <Grid className="h-4 w-4" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-1.5 rounded-lg transition-colors ${viewMode === 'list' ? 'bg-slate-800 text-white shadow-sm' : 'text-slate-400 hover:text-white hover:bg-slate-800/50'}`}
            >
              <ListIcon className="h-4 w-4" />
            </button>
          </div>

          <button
            onClick={() => setIsModalOpen(true)}
            className="btn-premium py-2.5 px-4 shadow-lg shadow-blue-500/20 flex items-center"
          >
            <Plus className="h-5 w-5 mr-1.5" />
            <span className="hidden sm:inline">New Asset</span>
          </button>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden min-h-0">
        {/* Left Sidebar - Categories */}
        <div className="w-48 hidden md:block shrink-0 pr-6 border-r border-slate-800/60 mr-6">
          <div className="space-y-1.5">
            {categories.map(cat => {
              const Icon = cat.icon
              const isActive = activeCategory === cat.id
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`w-full flex items-center px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${isActive
                      ? 'bg-blue-500/10 text-blue-400'
                      : 'text-slate-300 hover:bg-slate-800/50 hover:text-white'
                    }`}
                >
                  <Icon className={`h-4 w-4 mr-3 ${isActive ? 'text-blue-400' : 'text-slate-500'}`} />
                  {cat.label}
                </button>
              )
            })}
          </div>

          <div className="mt-8">
            <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-4">
              <div className="flex items-center text-slate-300 font-semibold text-sm mb-3">
                <Shield className="h-4 w-4 text-green-500 mr-2" /> Storage
              </div>
              <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden mb-2">
                <div className="bg-gradient-to-r from-blue-500 to-indigo-500 h-full w-1/4 rounded-full" />
              </div>
              <p className="text-xs text-slate-500">{assets.length} items encrypted</p>
            </div>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 overflow-y-auto pb-8 pr-2 custom-scrollbar">
          {assets.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center px-4">
              <div className="w-24 h-24 bg-slate-800/50 rounded-full flex items-center justify-center mb-6">
                <Upload className="h-10 w-10 text-blue-500 opacity-80" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Your Vault is Empty</h3>
              <p className="text-slate-400 max-w-sm mb-6">
                Securely upload files, passwords, and instructions. They are encrypted client-side and only released if protocol triggers.
              </p>
              <button
                onClick={() => setIsModalOpen(true)}
                className="px-6 py-3 bg-slate-800 hover:bg-slate-700 text-white rounded-xl font-medium transition-colors border border-slate-700 hover:border-blue-500/50 shadow-inner"
              >
                Upload First Asset
              </button>
            </div>
          ) : filteredAssets.length === 0 ? (
            <div className="py-20 text-center">
              <Search className="h-12 w-12 text-slate-600 mx-auto mb-4" />
              <p className="text-slate-400 font-medium">No files found matching your criteria</p>
            </div>
          ) : (
            <div className={viewMode === 'grid' ? "grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4" : "flex flex-col space-y-2"}>
              <AnimatePresence>
                {filteredAssets.map(asset =>
                  viewMode === 'grid'
                    ? <GridItem key={asset.id} asset={asset} />
                    : <ListItem key={asset.id} asset={asset} />
                )}
              </AnimatePresence>
            </div>
          )}
        </div>
      </div>

      {/* New Asset Creation Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center px-4 py-8">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => !isEncrypting && setIsModalOpen(false)}
              className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-lg bg-slate-900 border border-slate-700 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-full"
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800">
                <h3 className="text-xl font-bold text-white flex items-center">
                  <Upload className="h-5 w-5 mr-2 text-blue-500" /> Upload to Vault
                </h3>
                <button
                  onClick={() => !isEncrypting && setIsModalOpen(false)}
                  className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Modal Body */}
              <div className="p-6 overflow-y-auto custom-scrollbar">
                <div className="space-y-5">

                  {/* Dropzone */}
                  <div>
                    <label className="block text-sm font-semibold mb-2 text-slate-300 uppercase tracking-wide">Select File</label>
                    <div className={`relative border-2 border-dashed rounded-2xl p-8 text-center transition-all duration-300 ${selectedFile ? 'border-blue-500/50 bg-blue-500/5' : 'border-slate-700 bg-slate-800/30 hover:border-slate-500 hover:bg-slate-800/50'}`}>
                      <input type="file" onChange={handleFileSelect} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
                      {selectedFile ? (
                        <div className="flex items-center justify-center space-x-3">
                          <CheckCircle className="h-6 w-6 text-green-500" />
                          <div className="text-left">
                            <p className="text-slate-200 font-bold truncate max-w-[200px]">{selectedFile.name}</p>
                            <p className="text-xs text-slate-500">{formatFileSize(selectedFile.size)}</p>
                          </div>
                        </div>
                      ) : (
                        <>
                          <div className="w-12 h-12 bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-3">
                            <Plus className="h-6 w-6 text-slate-400" />
                          </div>
                          <p className="text-blue-400 font-medium">Browse Files</p>
                          <p className="text-xs text-slate-500 mt-1">or drag and drop here</p>
                        </>
                      )}
                    </div>
                  </div>

                  {/* Asset Details */}
                  <div>
                    <label className="block text-sm font-semibold mb-2 text-slate-300 uppercase tracking-wide">Name</label>
                    <input
                      type="text"
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all outline-none"
                      placeholder="e.g. Secret Master Password"
                      value={assetName}
                      onChange={(e) => setAssetName(e.target.value)}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold mb-2 text-slate-300 uppercase tracking-wide">Category</label>
                    <div className="relative">
                      <select
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all outline-none appearance-none"
                        value={assetType}
                        onChange={(e) => setAssetType(e.target.value)}
                      >
                        <option value="">Auto-detect / Select category...</option>
                        <option value="crypto_keys">Crypto Keys & Wallets</option>
                        <option value="document">Legal & Documents</option>
                        <option value="photo">Photos & Media</option>
                        <option value="business_secret">Passwords & Secrets</option>
                      </select>
                      <div className="absolute right-4 top-3.5 pointer-events-none text-slate-500">▼</div>
                    </div>
                  </div>

                  {/* Progress UI */}
                  <AnimatePresence>
                    {isEncrypting && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        className="bg-blue-900/10 border border-blue-500/20 p-4 rounded-xl"
                      >
                        <div className="flex justify-between text-sm mb-2">
                          <span className="text-blue-300 font-medium flex items-center">
                            <Lock className="h-3 w-3 mr-1.5" /> Client-Side Encryption...
                          </span>
                          <span className="text-blue-400 font-bold">{uploadProgress}%</span>
                        </div>
                        <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
                          <motion.div
                            className="h-full bg-gradient-to-r from-blue-500 to-indigo-500"
                            initial={{ width: 0 }}
                            animate={{ width: `${uploadProgress}%` }}
                            transition={{ ease: "easeInOut", duration: 0.2 }}
                          />
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>

              {/* Modal Footer */}
              <div className="p-6 border-t border-slate-800 bg-slate-900/50 flex space-x-3">
                <button
                  onClick={() => setIsModalOpen(false)}
                  disabled={isEncrypting}
                  className="px-6 py-3 rounded-xl font-medium text-slate-300 hover:text-white hover:bg-slate-800 transition-colors disabled:opacity-50"
                >
                  Cancel
                </button>
                <button
                  onClick={handleCreateAsset}
                  disabled={!selectedFile || !assetType || !assetName || isEncrypting}
                  className="flex-1 btn-premium flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isEncrypting ? (
                    <>
                      <Shield className="h-5 w-5 mr-2 animate-pulse" />
                      Securing Asset...
                    </>
                  ) : (
                    <>
                      <Upload className="h-5 w-5 mr-2" />
                      Encrypt & Store
                    </>
                  )}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  )
}