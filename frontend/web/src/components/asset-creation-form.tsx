'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { FileText, Upload, Lock, Key, Trash2, Eye, Download } from 'lucide-react'
import WebCryptoService from '@/lib/crypto'
import WebStorageService, { StoredAsset } from '@/lib/storage'

export function AssetCreationForm() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [assetType, setAssetType] = useState<string>('')
  const [assetName, setAssetName] = useState<string>('')
  const [isEncrypting, setIsEncrypting] = useState(false)
  const [assets, setAssets] = useState<StoredAsset[]>([])
  const [beneficiaries, setBeneficiaries] = useState<any[]>([])
  
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
    
    try {
      // Read file as text/base64
      const fileContent = await readFileAsText(selectedFile)
      
      // Encrypt the file content
      const encryptionResult = await crypto.encryptData(fileContent)
      
      // Split the encryption key
      const keyDistribution = crypto.splitKey(crypto.generateEncryptionKey())
      
      // Simulate IPFS upload
      const ipfsHash = await crypto.uploadToIPFS(encryptionResult.encryptedData)
      
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
      
      // Reload assets
      await loadAssets()
      
      // Reset form
      setSelectedFile(null)
      setAssetType('')
      setAssetName('')
      
      alert('Asset created and encrypted successfully!')
      
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
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <FileText className="h-5 w-5" />
            <span>Create Digital Asset</span>
          </CardTitle>
          <CardDescription>
            Upload and encrypt your digital assets for secure inheritance
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Asset Name */}
          <div>
            <label className="block text-sm font-medium mb-2">Asset Name</label>
            <input 
              type="text"
              className="w-full p-2 border rounded-md"
              placeholder="Enter asset name"
              value={assetName}
              onChange={(e) => setAssetName(e.target.value)}
            />
          </div>

          {/* Asset Type Selection */}
          <div>
            <label className="block text-sm font-medium mb-2">Asset Type</label>
            <select 
              className="w-full p-2 border rounded-md"
              value={assetType}
              onChange={(e) => setAssetType(e.target.value)}
            >
              <option value="">Select asset type...</option>
              <option value="crypto_keys">Crypto Keys / Seed Phrases</option>
              <option value="audio_message">Audio Message</option>
              <option value="photo">Photos & Videos</option>
              <option value="document">Documents</option>
              <option value="business_secret">Business Secrets</option>
            </select>
          </div>

          {/* File Upload */}
          <div>
            <label className="block text-sm font-medium mb-2">Upload File</label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
              <Upload className="h-8 w-8 mx-auto mb-2 text-gray-400" />
              <input
                type="file"
                onChange={handleFileSelect}
                className="hidden"
                id="file-upload"
              />
              <label htmlFor="file-upload" className="cursor-pointer">
                <span className="text-blue-600 hover:text-blue-500">
                  Click to upload
                </span>
                <span className="text-gray-500"> or drag and drop</span>
              </label>
              {selectedFile && (
                <div className="mt-2 text-sm text-gray-600">
                  <p>Selected: {selectedFile.name}</p>
                  <p>Size: {formatFileSize(selectedFile.size)}</p>
                  <p>Type: {selectedFile.type || 'Unknown'}</p>
                </div>
              )}
            </div>
          </div>

          {/* Encryption Info */}
          <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
            <div className="flex items-start space-x-3">
              <Lock className="h-5 w-5 text-blue-600 mt-0.5" />
              <div>
                <h4 className="font-medium text-blue-900 dark:text-blue-100">
                  Client-Side Encryption
                </h4>
                <p className="text-sm text-blue-700 dark:text-blue-200 mt-1">
                  Your file will be encrypted in your browser using AES-256-GCM before upload. 
                  The encryption key will be split into 5 shares using Shamir Secret Sharing.
                </p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-3">
            <Button 
              onClick={handleCreateAsset}
              disabled={!selectedFile || !assetType || !assetName || isEncrypting}
              className="flex-1"
            >
              {isEncrypting ? (
                <>
                  <Key className="h-4 w-4 mr-2 animate-spin" />
                  Encrypting & Storing...
                </>
              ) : (
                <>
                  <Lock className="h-4 w-4 mr-2" />
                  Create Encrypted Asset
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Asset List */}
      <Card>
        <CardHeader>
          <CardTitle>Your Assets ({assets.length})</CardTitle>
          <CardDescription>Encrypted digital assets ready for inheritance</CardDescription>
        </CardHeader>
        <CardContent>
          {assets.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <FileText className="h-12 w-12 mx-auto mb-3 opacity-50" />
              <p>No assets created yet</p>
              <p className="text-sm">Create your first encrypted asset above</p>
            </div>
          ) : (
            <div className="space-y-4">
              {assets.map((asset) => (
                <div key={asset.id} className="border rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2">
                        <FileText className="h-4 w-4 text-blue-600" />
                        <h3 className="font-medium">{asset.name}</h3>
                        <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                          {asset.type.replace('_', ' ')}
                        </span>
                      </div>
                      <div className="mt-2 text-sm text-muted-foreground space-y-1">
                        <p>Size: {formatFileSize(asset.size)}</p>
                        <p>Created: {formatDate(asset.createdAt)}</p>
                        <p>Beneficiaries: {asset.beneficiaries.length}</p>
                        {asset.ipfsHash && (
                          <p className="font-mono text-xs">IPFS: {asset.ipfsHash.substring(0, 20)}...</p>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button variant="outline" size="sm">
                        <Eye className="h-3 w-3 mr-1" />
                        View
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleDeleteAsset(asset.id)}
                      >
                        <Trash2 className="h-3 w-3 mr-1" />
                        Delete
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}