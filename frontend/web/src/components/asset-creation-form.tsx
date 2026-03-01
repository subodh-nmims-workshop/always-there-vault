'use client'

import { useState, useEffect, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  FileText, Upload, Lock, Key, Trash2, Eye, Shield,
  CheckCircle, Plus, Search, Grid, List as ListIcon,
  Image as ImageIcon, Video, FolderOpen, MoreVertical, X
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

  const getAssetIconInfo = (type: string, mimeType?: string) => {
    if (type === 'crypto_keys') return { icon: Key, color: 'text-purple-400', bg: 'bg-purple-500/10' }
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

  const categories = [
    { id: 'all', label: 'All Files', icon: Grid },
    { id: 'document', label: 'Docs', icon: FileText },
    { id: 'photo', label: 'Photos', icon: ImageIcon },
    { id: 'crypto_keys', label: 'Keys', icon: Key },
    { id: 'business_secret', label: 'Secrets', icon: Eye },
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
        className="bg-white/[0.03] border border-white/5 backdrop-blur-md rounded-2xl p-4 relative overflow-hidden group hover:border-blue-500/30 transition-all shadow-lg"
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
              <button className="w-full text-left px-4 py-2 text-sm text-slate-300 hover:text-white hover:bg-slate-700/50 rounded-t-xl flex items-center">
                <Eye className="h-3 w-3 mr-2" /> View
              </button>
              <button onClick={(e) => { e.stopPropagation(); handleDeleteAsset(asset.id) }} className="w-full text-left px-4 py-2 text-sm text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-b-xl flex items-center">
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
          <button className="p-2 bg-slate-800 hover:bg-slate-700 rounded-lg text-slate-300 transition-colors">
            <Eye className="h-4 w-4" />
          </button>
          <button onClick={(e) => { e.stopPropagation(); handleDeleteAsset(asset.id) }} className="p-2 bg-red-500/10 hover:bg-red-500/20 text-red-500 rounded-lg transition-colors">
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      </motion.div>
    )
  }

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
          <p className="text-[10px] uppercase tracking-widest text-blue-500 font-semibold mt-1">DeadMan Protocol</p>
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
          <button onClick={() => setIsModalOpen(true)} className="bg-gradient-to-br from-blue-600 to-purple-600 p-[1px] rounded-xl shadow-[0_0_20px_rgba(37,99,235,0.2)] hover:shadow-[0_0_25px_rgba(37,99,235,0.4)] transition-all group">
            <div className="bg-slate-900 md:bg-transparent rounded-[11px] px-4 py-2 flex items-center gap-2 transition-colors">
              <Plus className="w-4 h-4 text-white group-hover:scale-110 transition-transform" />
              <span className="text-sm font-bold text-white hidden sm:inline">New Asset</span>
            </div>
          </button>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Mobile categories scale */}
        <div className="flex md:hidden gap-4 overflow-x-auto py-2 no-scrollbar px-2 max-w-[100vw] text-transparent">
          {categories.map(cat => (
            <div key={cat.id} onClick={() => setActiveCategory(cat.id)} className="flex flex-col items-center gap-2 min-w-[70px] cursor-pointer group">
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
                onClick={() => setActiveCategory(cat.id)}
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
                  <p className="text-xl font-bold text-slate-200">{assets.length} <span className="text-xs font-normal text-slate-500">Assets</span></p>
                </div>
              </div>
              <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden mb-1 mt-2">
                <div className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full w-[10%]"></div>
              </div>
              <p className="text-[10px] text-slate-500 mt-2 text-right">Encrypted Safe</p>
            </div>
          </div>
        </div>

        {/* Main Vault Content */}
        <div className="flex-1 px-2 md:px-0">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-sm font-semibold text-slate-400 uppercase tracking-wider">{activeCategory === 'all' ? 'Recent Assets' : `${categories.find(c => c.id === activeCategory)?.label}`}</h2>

            <div className="flex bg-white/[0.03] border border-white/10 rounded-lg p-1">
              <button onClick={() => setViewMode('grid')} className={`p-1.5 rounded-md transition-colors ${viewMode === 'grid' ? 'bg-slate-800 text-white shadow-sm' : 'text-slate-400 hover:text-white'}`}>
                <Grid className="w-4 h-4" />
              </button>
              <button onClick={() => setViewMode('list')} className={`p-1.5 rounded-md transition-colors ${viewMode === 'list' ? 'bg-slate-800 text-white shadow-sm' : 'text-slate-400 hover:text-white'}`}>
                <ListIcon className="w-4 h-4" />
              </button>
            </div>
          </div>

          {assets.length === 0 ? (
            <div className="h-64 flex flex-col items-center justify-center text-center px-4 bg-white/[0.02] border border-white/5 rounded-3xl">
              <div className="w-20 h-20 bg-blue-500/10 rounded-full flex items-center justify-center mb-6 shadow-[0_0_20px_rgba(37,99,235,0.15)]">
                <Shield className="h-10 w-10 text-blue-400" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Initialize Your Secure Vault</h3>
              <p className="text-slate-400 max-w-sm mb-6 text-sm">Upload files to encrypt and bound them to your zero-trust digital will protocol.</p>
              <button onClick={() => setIsModalOpen(true)} className="px-6 py-2.5 bg-white/[0.05] hover:bg-white/[0.1] text-white rounded-xl font-medium transition-colors border border-white/10 text-sm">
                Upload First Asset
              </button>
            </div>
          ) : filteredAssets.length === 0 ? (
            <div className="h-64 flex flex-col items-center justify-center text-center bg-white/[0.02] border border-white/5 rounded-3xl">
              <Search className="h-12 w-12 text-slate-600 mb-4" />
              <p className="text-slate-400 font-medium text-sm">No files found matching criteria.</p>
            </div>
          ) : (
            <div className={viewMode === 'grid' ? "grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4" : "flex flex-col space-y-3"}>
              <AnimatePresence>
                {filteredAssets.map(asset => viewMode === 'grid' ? <GridItem key={asset.id} asset={asset} /> : <ListItem key={asset.id} asset={asset} />)}
              </AnimatePresence>
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
                          <option value="document">Documentation</option>
                          <option value="photo">Media Backup</option>
                          <option value="business_secret">Secret Notes</option>
                        </select>
                        <div className="absolute right-4 top-3.5 pointer-events-none text-slate-500">▼</div>
                      </div>
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
    </div>
  )
}