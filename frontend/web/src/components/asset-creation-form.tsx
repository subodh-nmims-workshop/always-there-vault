'use client'

import { useState, useEffect } from 'react'
import { FileText, Upload, Lock, Key, Trash2, Eye, Download, Shield, CheckCircle, AlertCircle } from 'lucide-react'
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
    }
  }

  const handleCreateAsset = async () => {
    if (!selectedFile || !assetType || !assetName) return

    setIsEncrypting(true)
    setUploadProgress(0)

    try {
      // Simulate progress
      setUploadProgress(20)

      // Read file as text/base64
      const fileContent = await readFileAsText(selectedFile)
      setUploadProgress(40)

      // Encrypt the file content
      const encryptionResult = await crypto.encryptData(fileContent)
      setUploadProgress(60)

      // Split the encryption key
      const keyDistribution = await crypto.splitKey(crypto.generateEncryptionKey())
      setUploadProgress(75)

      // Simulate IPFS upload
      const ipfsHash = await crypto.uploadToIPFS(encryptionResult.encryptedData)
      setUploadProgress(90)

      // Create asset object
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

      // Save asset and key distribution
      await storage.saveAsset(asset)
      await storage.saveKeyDistribution(keyDistribution)

      setUploadProgress(100)

      // Reload assets
      await loadAssets()

      // Reset form
      setSelectedFile(null)
      setAssetType('')
      setAssetName('')
      setUploadProgress(0)

    } catch (error) {
      console.error('Asset creation failed:', error)
      alert('Failed to create asset. Please try again.')
    } finally {
      setIsEncrypting(false)
    }
  }

  const handleDeleteAsset = async (assetId: string) => {
    if (confirm('Are you sure you want to delete this asset? This action cannot be undone.')) {
      try {
        await storage.deleteAsset(assetId)
        await loadAssets()
      } catch (error) {
        console.error('Failed to delete asset:', error)
        alert('Failed to delete asset.')
      }
    }
  }

  const readFileAsText = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.onload = () => {
        if (typeof reader.result === 'string') {
          resolve(reader.result)
        } else if (reader.result instanceof ArrayBuffer) {
          // Convert ArrayBuffer to base64 string
          const bytes = new Uint8Array(reader.result)
          const binary = bytes.reduce((acc, byte) => acc + String.fromCharCode(byte), '')
          resolve(btoa(binary))
        } else {
          reject(new Error('Unexpected file read result'))
        }
      }
      reader.onerror = () => reject(reader.error)

      // Read as text for text files, as ArrayBuffer for binary files
      if (file.type.startsWith('text/') || file.type === 'application/json') {
        reader.readAsText(file)
      } else {
        reader.readAsArrayBuffer(file)
      }
    })
  }

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  const formatDate = (timestamp: number): string => {
    return new Date(timestamp).toLocaleDateString()
  }

  return (
    <div className="space-y-6">
      {/* Create Asset Card */}
      <div className="premium-card p-8">
        <div className="flex items-center space-x-3 mb-6">
          <div className="icon-container">
            <FileText className="h-5 w-5 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold gradient-text-premium">Create Digital Asset</h2>
            <p className="text-sm text-slate-400">Upload and encrypt your digital assets for secure inheritance</p>
          </div>
        </div>

        <div className="space-y-6">
          {/* Asset Name */}
          <div>
            <label className="block text-sm font-medium mb-2 text-slate-200">Asset Name</label>
            <input
              type="text"
              className="input-premium w-full"
              placeholder="Enter asset name"
              value={assetName}
              onChange={(e) => setAssetName(e.target.value)}
            />
          </div>

          {/* Asset Type Selection */}
          <div>
            <label className="block text-sm font-medium mb-2 text-slate-200">Asset Type</label>
            <select
              className="input-premium w-full"
              value={assetType}
              onChange={(e) => setAssetType(e.target.value)}
            >
              <option value="">Select asset type...</option>
              <option value="crypto_keys">🔑 Crypto Keys / Seed Phrases</option>
              <option value="audio_message">🎵 Audio Message</option>
              <option value="photo">📸 Photos & Videos</option>
              <option value="document">📄 Documents</option>
              <option value="business_secret">💼 Business Secrets</option>
            </select>
          </div>

          {/* File Upload */}
          <div>
            <label className="block text-sm font-medium mb-2 text-slate-200">Upload File</label>
            <div className="border-2 border-dashed border-slate-700 hover:border-blue-500/50 rounded-xl p-8 text-center transition-all duration-300 bg-slate-900/30 backdrop-blur-sm">
              <Upload className="h-12 w-12 mx-auto mb-3 text-slate-500" />
              <input
                type="file"
                onChange={handleFileSelect}
                className="hidden"
                id="file-upload"
              />
              <label htmlFor="file-upload" className="cursor-pointer">
                <span className="text-blue-400 hover:text-blue-300 font-medium">
                  Click to upload
                </span>
                <span className="text-slate-400"> or drag and drop</span>
              </label>
              {selectedFile && (
                <div className="mt-4 p-4 bg-slate-800/50 rounded-lg border border-slate-700">
                  <div className="flex items-center justify-center space-x-2 text-sm">
                    <CheckCircle className="h-4 w-4 text-green-400" />
                    <span className="text-slate-200 font-medium">{selectedFile.name}</span>
                  </div>
                  <div className="mt-2 text-xs text-slate-400 space-y-1">
                    <p>Size: {formatFileSize(selectedFile.size)}</p>
                    <p>Type: {selectedFile.type || 'Unknown'}</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Encryption Info */}
          <div className="bg-blue-500/10 border border-blue-500/20 p-4 rounded-xl backdrop-blur-sm">
            <div className="flex items-start space-x-3">
              <Shield className="h-5 w-5 text-blue-400 mt-0.5 flex-shrink-0" />
              <div>
                <h4 className="font-medium text-blue-300 mb-1">
                  Client-Side Encryption
                </h4>
                <p className="text-sm text-slate-300">
                  Your file will be encrypted in your browser using AES-256-GCM before upload.
                  The encryption key will be split into 5 shares using Shamir Secret Sharing.
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  <span className="badge-premium badge-info-premium text-xs">AES-256-GCM</span>
                  <span className="badge-premium badge-success-premium text-xs">5 Key Shares</span>
                  <span className="badge-premium badge-warning-premium text-xs">3 Threshold</span>
                </div>
              </div>
            </div>
          </div>

          {/* Progress Bar */}
          {isEncrypting && uploadProgress > 0 && (
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-slate-300">Encrypting & Uploading...</span>
                <span className="text-blue-400 font-medium">{uploadProgress}%</span>
              </div>
              <div className="progress-bar">
                <div
                  className="progress-bar-fill"
                  style={{ width: `${uploadProgress}%` }}
                ></div>
              </div>
            </div>
          )}

          {/* Action Button */}
          <button
            onClick={handleCreateAsset}
            disabled={!selectedFile || !assetType || !assetName || isEncrypting}
            className="btn-premium w-full disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isEncrypting ? (
              <>
                <Key className="h-5 w-5 mr-2 animate-spin" />
                Encrypting & Storing...
              </>
            ) : (
              <>
                <Lock className="h-5 w-5 mr-2" />
                Create Encrypted Asset
              </>
            )}
          </button>
        </div>
      </div>

      {/* Asset List */}
      <div className="premium-card p-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold gradient-text-premium">Your Assets ({assets.length})</h2>
            <p className="text-sm text-slate-400">Encrypted digital assets ready for inheritance</p>
          </div>
          {assets.length > 0 && (
            <div className="badge-premium badge-success-premium">
              <Shield className="h-3 w-3 mr-1" />
              {assets.length} Protected
            </div>
          )}
        </div>

        {assets.length === 0 ? (
          <div className="text-center py-12 bg-slate-900/30 rounded-xl border border-slate-800">
            <FileText className="h-16 w-16 mx-auto mb-4 text-slate-600" />
            <p className="text-slate-300 font-medium">No assets created yet</p>
            <p className="text-sm text-slate-500 mt-2">Create your first encrypted asset above</p>
          </div>
        ) : (
          <div className="space-y-4">
            {assets.map((asset) => (
              <div key={asset.id} className="premium-card p-6 hover:scale-[1.02] transition-transform">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-3">
                      <div className="icon-container w-10 h-10">
                        <FileText className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <h3 className="font-bold text-lg text-slate-200">{asset.name}</h3>
                        <span className="badge-premium badge-info-premium text-xs">
                          {asset.type.replace('_', ' ')}
                        </span>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mt-4 text-sm">
                      <div className="flex items-center space-x-2 text-slate-400">
                        <Lock className="h-4 w-4 text-green-400" />
                        <span>Encrypted</span>
                      </div>
                      <div className="flex items-center space-x-2 text-slate-400">
                        <Key className="h-4 w-4 text-blue-400" />
                        <span>{asset.beneficiaries.length} Beneficiaries</span>
                      </div>
                      <div className="text-slate-400">
                        Size: {formatFileSize(asset.size)}
                      </div>
                      <div className="text-slate-400">
                        Created: {formatDate(asset.createdAt)}
                      </div>
                    </div>

                    {asset.ipfsHash && (
                      <div className="mt-3 p-3 bg-slate-800/50 rounded-lg border border-slate-700">
                        <p className="text-xs text-slate-400 mb-1">IPFS Hash:</p>
                        <p className="font-mono text-xs text-blue-400 break-all">{asset.ipfsHash}</p>
                      </div>
                    )}
                  </div>

                  <div className="flex flex-col space-y-2 ml-4">
                    <button className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-sm font-medium transition-colors border border-slate-700 hover:border-blue-500/50">
                      <Eye className="h-4 w-4 inline mr-1" />
                      View
                    </button>
                    <button
                      onClick={() => handleDeleteAsset(asset.id)}
                      className="px-4 py-2 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 text-sm font-medium transition-colors border border-red-500/20 hover:border-red-500/50"
                    >
                      <Trash2 className="h-4 w-4 inline mr-1" />
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}