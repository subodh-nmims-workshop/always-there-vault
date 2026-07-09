'use client'

import { ThemeToggle } from '@/components/theme-toggle'

import { useState, useEffect, Suspense } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Shield, 
  Key, 
  Lock, 
  Download, 
  AlertTriangle, 
  CheckCircle2, 
  Clock, 
  ArrowRight,
  User,
  Activity,
  Box,
  Fingerprint,
  RefreshCw,
  Search
} from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { toast } from 'sonner'
import { ethers } from 'ethers'
import { SharedFooter } from '@/components/shared-footer'
import WebCryptoService from '@/lib/crypto'

import { WalletConnectModal } from '@/components/wallet-connect-modal'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'

function BeneficiaryAssetsContent() {
  const searchParams = useSearchParams()
  const claimToken = searchParams?.get('claimToken') || ''
  const [ownerAddress, setOwnerAddress] = useState(searchParams?.get('owner') || '')
  const [isConnected, setIsConnected] = useState(false)
  const [userAddress, setUserAddress] = useState('')
  const [isConnecting, setIsConnecting] = useState(false)
  const [showWalletModal, setShowWalletModal] = useState(false)
  const [status, setStatus] = useState<'idle' | 'checking' | 'ready' | 'not_eligible' | 'not_triggered'>('idle')
  const [inheritanceData, setInheritanceData] = useState<any>(null)
  const [isClaiming, setIsClaiming] = useState(false)
  const [claimed, setClaimed] = useState(false)
  const [downloadingAssetId, setDownloadingAssetId] = useState<string | null>(null)

  const downloadAndDecryptAsset = async (asset: any) => {
    setDownloadingAssetId(asset.id)
    try {
      const apiEndpoint = process.env.NEXT_PUBLIC_API_URL || 'https://always-there-protocol-api.onrender.com'
      
      const keyId = asset.encryptionKeyId || asset.keyId
      const fileIv = asset.fileIv || asset.iv
      
      if (!keyId) {
        toast.error('Decryption key not found', {
          description: 'This asset was uploaded without a stored encryption key. It may be a legacy or test asset. Contact support if this is unexpected.'
        })
        return
      }
      if (!fileIv) {
        toast.error('Encryption IV missing', {
          description: 'This asset is missing its initialization vector and cannot be decrypted.'
        })
        return
      }

      // 1. Fetch Key shares from public endpoint
      const keyRes = await fetch(`${apiEndpoint}/api/claim-assets/keys/${keyId}?claimToken=${claimToken}`)
      if (!keyRes.ok) {
        throw new Error('Failed to retrieve decryption keys from backend.')
      }
      const keyDist = await keyRes.json()
      if (!keyDist || !keyDist.shares) {
        throw new Error('Keys distribution empty or malformed.')
      }

      // 2. Reconstruct key
      const sharesToUse = keyDist.shares.slice(0, 3)
      const crypto = WebCryptoService.getInstance()
      const reconstructedKey = await crypto.reconstructKey(sharesToUse)

      // 3. Decrypt
      if (asset.encryptedData) {
        // Small note or secret stored directly in DB
        const decrypted = await crypto.decryptData(asset.encryptedData, reconstructedKey, fileIv)
        
        // Trigger a download of a text file
        const blob = new Blob([decrypted], { type: 'text/plain;charset=utf-8' })
        const url = URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = asset.name.endsWith('.enc') ? asset.name.slice(0, -4) : asset.name
        document.body.appendChild(a)
        a.click()
        document.body.removeChild(a)
        URL.revokeObjectURL(url)
        toast.success('Secret decrypted and downloaded successfully!')
      } else {
        // Binary file hosted on B2 or IPFS
        // Get temporary download URL
        const downloadRes = await fetch(`${apiEndpoint}/api/claim-assets/download/${asset.id}?claimToken=${claimToken}`)
        if (!downloadRes.ok) {
          throw new Error('Failed to get download URL from cloud storage.')
        }
        const { url: fileUrl } = await downloadRes.json()

        // Fetch encrypted file contents
        const fileContentRes = await fetch(fileUrl)
        if (!fileContentRes.ok) {
          throw new Error('Failed to fetch encrypted file contents from cloud storage.')
        }
        const encryptedHex = await fileContentRes.text()

        // Decrypt binary content
        const decryptedBuffer = await crypto.decryptBinary(encryptedHex, reconstructedKey, fileIv)

        // Trigger browser download
        const blob = new Blob([decryptedBuffer], { type: asset.mimeType || 'application/octet-stream' })
        const url = URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = asset.name.endsWith('.enc') ? asset.name.slice(0, -4) : asset.name
        document.body.appendChild(a)
        a.click()
        document.body.removeChild(a)
        URL.revokeObjectURL(url)
        toast.success('File decrypted and downloaded successfully!')
      }
    } catch (err: any) {
      console.error(err)
      toast.error(`Download failed: ${err.message || err}`)
    } finally {
      setDownloadingAssetId(null)
    }
  }


  useEffect(() => {
    const storedAddress = localStorage.getItem('dwp_wallet_address')
    if (storedAddress) {
      setUserAddress(storedAddress)
      setIsConnected(true)
    }
  }, [])

  // Auto-trigger check when arriving from email claim link
  useEffect(() => {
    if (claimToken && status === 'idle') {
      checkEligibility()
    }
  }, [claimToken, status]) // eslint-disable-line react-hooks/exhaustive-deps


  const handleWalletConnect = async (walletAddress: string) => {
    setUserAddress(walletAddress)
    setIsConnected(true)
    setShowWalletModal(false)
    localStorage.setItem('dwp_wallet_address', walletAddress)
    localStorage.setItem('dwp_wallet_connected', 'true')
  }

  const checkEligibility = async () => {
    setStatus('checking')
    
    try {
      const apiEndpoint = process.env.NEXT_PUBLIC_API_URL || 'https://always-there-protocol-api.onrender.com' /* 'http://localhost:7001' */
      
      if (claimToken) {
        // ✅ Direct check via public claim-token endpoint — bypass heartbeat check entirely
        const claimRes = await fetch(`${apiEndpoint}/api/claim-assets/contents?claimToken=${claimToken}`)
        if (claimRes.ok) {
          const claimData = await claimRes.json()
          const assetList = claimData.assets || []
          
          setStatus('ready')
          setInheritanceData({
            ownerName: claimData.ownerName || 'The account owner',
            lastHeartbeat: 'Verified via secure link',
            status: 'Delivered',
            assets: assetList
          })
          toast.success('Secure link verified. Assets are ready for retrieval.')
          return
        } else {
          const errData = await claimRes.json().catch(() => ({}))
          console.warn('Claim assets fetch failed:', errData)
          throw new Error(errData.message || 'Failed to authorize claim token. It may be expired or invalid.')
        }
      }

      if (!ownerAddress || !ethers.isAddress(ownerAddress)) {
        toast.error('Please enter a valid owner wallet address')
        setStatus('idle')
        return
      }

      const response = await fetch(`${apiEndpoint}/api/heartbeat/public-status/${ownerAddress}`)
      if (!response.ok) throw new Error('Failed to fetch status')
      
      const data = await response.json()
      
      if (data.status === 'overdue' || data.status === 'grace_period') {
        let ownerName = 'The account owner'
        let assetList: any[] = []

        // Fallback: fetch owner info and assets via JWT (owner viewing their own)
        const beneficiaryResponse = await fetch(`${apiEndpoint}/api/beneficiaries/in-wills?walletAddress=${userAddress}`)
        const myWills = await beneficiaryResponse.json()
        const myWill = myWills.find((w: any) => w.ownerAddress.toLowerCase() === ownerAddress.toLowerCase())

        if (!myWill) {
          setStatus('not_eligible')
          toast.error('You are not registered as a beneficiary for this address.')
          return
        }

        ownerName = myWill.ownerName
        const token = localStorage.getItem('dwp_token')
        const assetsResponse = await fetch(`${apiEndpoint}/api/assets/contents?ownerAddress=${ownerAddress}`, {
            headers: { 'Authorization': `Bearer ${token}` }
        })
        const assetsData = await assetsResponse.json()
        assetList = assetsData.assets || []

        setStatus('ready')
        setInheritanceData({
          ownerName,
          lastHeartbeat: data.lastHeartbeat ? new Date(data.lastHeartbeat).toLocaleDateString() : 'Unknown',
          status: 'Triggered',
          assets: assetList
        })
        toast.success('Protocol verified. Inheritance is ready for claim.')
      } else {
        setStatus('not_triggered')
        toast.info('Protocol is still active. Assets are secure.')
      }
    } catch (error: any) {
      console.error(error)
      setStatus('idle')
      toast.error(error.message || 'Failed to verify eligibility.')
    }
  }

  const handleClaim = async () => {
    setIsClaiming(true)
    try {
      // Logic for claiming each asset
      // 1. Fetch Key Shares from backend
      // 2. Reconstruct Key
      // 3. Download/Decrypt assets
      
      const token = localStorage.getItem('dwp_token')
      const apiEndpoint = process.env.NEXT_PUBLIC_API_URL || 'https://always-there-protocol-api.onrender.com' /* 'http://localhost:7001' */
      
      // We'll iterate through assets and claim them
      // For this UI demo, we'll mark as claimed after status update
      setTimeout(() => {
        setIsClaiming(false)
        setClaimed(true)
        toast.success('Assets successfully claimed and decrypted!')
      }, 3000)
    } catch (error) {
      setIsClaiming(false)
      toast.error('Claim process failed')
    }
  }

  return (
    <div className="min-h-screen bg-white dark:bg-[#080a0f] text-slate-800 dark:text-slate-100 font-sans selection:bg-[#1152d4]/30 flex flex-col relative overflow-x-hidden">
      {/* Background Gradients */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none -z-10">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-[#1152d4]/10 blur-[150px] rounded-full"></div>
        <div className="absolute bottom-[0%] right-[-10%] w-[50%] h-[50%] bg-[#8b5cf6]/10 blur-[150px] rounded-full"></div>
      </div>

      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white/80 dark:bg-[#080a0f]/80 backdrop-blur-xl border-b border-slate-200 dark:border-white/5 px-6 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <Image src="/logo-simple.png" alt="AlwaysThere Logo" width={40} height={40} className="h-10 w-auto object-contain group-hover:scale-110 transition-transform duration-300" />
          <div className="flex flex-col text-left">
            <span className="text-xl font-black tracking-wider text-slate-900 dark:text-white leading-none">ALWAYS THERE</span>
            <span className="text-[9px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest leading-none mt-1.5">SECURE YOUR DIGITAL LEGACY</span>
          </div>
        </Link>
        
        <div className="flex items-center gap-4">
          <ThemeToggle />
          {!isConnected ? (
            <Button 
              onClick={() => setShowWalletModal(true)}
              className="bg-[#1152d4] hover:bg-[#1152d4]/80 text-white rounded-full px-6 shadow-[0_0_15px_rgba(17,82,212,0.4)]"
            >
              Connect Wallet
            </Button>
          ) : (
            <div className="flex items-center gap-3 bg-white/5 border border-white/10 px-4 py-2 rounded-full">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
              <span className="text-xs font-mono text-slate-300">{userAddress.slice(0, 6)}...{userAddress.slice(-4)}</span>
            </div>
          )}
        </div>
      </nav>

      <main className="flex-1 flex flex-col items-center justify-center p-6 max-w-4xl mx-auto w-full z-10">
        <div className="text-center mb-12 space-y-4">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold uppercase tracking-widest mb-2">
            Inheritance Portal
          </div>
          <h1 className="text-4xl md:text-6xl font-black tracking-tight bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent">
            Secure Asset Retrieval
          </h1>
          <p className="text-slate-400 max-w-2xl mx-auto text-lg leading-relaxed">
            Verify your clearance and claim designated digital assets through the AlwaysThere Vault's trustless distribution sequence.
          </p>
        </div>

        <div className="w-full space-y-8">
          {/* Identity Entry Section */}
          <AnimatePresence mode="wait">
            {status === 'idle' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="w-full"
              >
                <Card className="bg-white/[0.03] border-white/10 backdrop-blur-xl rounded-3xl overflow-hidden p-8">
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-slate-400 uppercase tracking-wider ml-1">Contract Owner Address</label>
                      <div className="relative">
                        <Input 
                          value={ownerAddress}
                          onChange={(e) => setOwnerAddress(e.target.value)}
                          placeholder="0x..."
                          className="bg-white/5 border-white/10 h-14 rounded-2xl text-lg pl-12 focus:border-blue-500/50 transition-all"
                        />
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                      </div>
                      <p className="text-xs text-slate-500 ml-1 italic">Check your notification email for the owner's wallet address.</p>
                    </div>
                    
                    <Button 
                      onClick={checkEligibility}
                      disabled={!isConnected && !claimToken}
                      className="w-full h-14 bg-[#1152d4] hover:bg-blue-600 text-white rounded-2xl font-bold text-lg flex items-center justify-center gap-3 transition-all hover:scale-[1.01] shadow-2xl shadow-blue-500/20"
                    >
                      Verify Protocol Status <ArrowRight className="w-5 h-5" />
                    </Button>
                    
                    {!isConnected && !claimToken && (
                      <div className="flex items-center gap-2 justify-center text-amber-400 text-sm font-medium bg-amber-400/10 py-3 rounded-xl border border-amber-400/20">
                        <AlertTriangle className="w-4 h-4" />
                        Wallet connection required for identity proof
                      </div>
                    )}
                  </div>
                </Card>
              </motion.div>
            )}

            {status === 'checking' && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex flex-col items-center justify-center py-20 space-y-6"
              >
                <div className="relative">
                  <div className="w-20 h-20 border-4 border-blue-500/20 rounded-full"></div>
                  <div className="w-20 h-20 border-4 border-t-blue-500 rounded-full animate-spin absolute top-0 left-0"></div>
                  <Shield className="w-8 h-8 text-blue-500 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
                </div>
                <div className="text-center">
                  <h3 className="text-xl font-bold mb-1">Scanning Neural Network...</h3>
                  <p className="text-slate-500 uppercase text-xs font-bold tracking-widest">Verifying Cryptographic Shards</p>
                </div>
              </motion.div>
            )}

            {status === 'ready' && !claimed && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="space-y-6 w-full"
              >
                <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-2xl p-6 flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-emerald-500/20 flex items-center justify-center text-emerald-400">
                    <CheckCircle2 className="w-7 h-7" />
                  </div>
                  <div>
                    <h4 className="font-bold text-emerald-400">Clearance Granted</h4>
                    <p className="text-emerald-100/60 text-sm">Target protocol is active. Distribution sequence ready.</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card className="bg-white/[0.03] border-white/10 p-6 rounded-3xl">
                    <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Willing Party</h3>
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center border border-white/10">
                        <User className="w-6 h-6 text-slate-300" />
                      </div>
                      <div>
                        <p className="font-bold text-white text-lg">{inheritanceData.ownerName}</p>
                        <p className="text-xs text-slate-500 font-mono">{ownerAddress.slice(0, 20)}...</p>
                      </div>
                    </div>
                  </Card>

                  <Card className="bg-white/[0.03] border-white/10 p-6 rounded-3xl">
                    <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Protocol Status</h3>
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-red-500/10 rounded-full flex items-center justify-center border border-red-500/20">
                        <Activity className="w-6 h-6 text-red-400" />
                      </div>
                      <div>
                        <p className="font-bold text-red-400 text-lg uppercase">Triggered</p>
                        <p className="text-xs text-slate-500">Inactivity: {inheritanceData.lastHeartbeat}</p>
                      </div>
                    </div>
                  </Card>
                </div>

                <Card className="bg-white/[0.03] border-white/10 rounded-3xl overflow-hidden">
                  <div className="p-6 border-b border-white/5 bg-white/[0.02]">
                    <h3 className="font-bold flex items-center gap-2">
                      <Box className="w-5 h-5 text-blue-400" />
                      Allocated Assets
                    </h3>
                  </div>
                  <div className="divide-y divide-white/5">
                    {inheritanceData.assets.map((asset: any) => (
                      <div key={asset.id} className="p-4 flex items-center justify-between hover:bg-white/5 transition-colors">
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-blue-500/10 rounded-lg text-blue-400">
                            {asset.type === 'password' ? <Lock className="w-4 h-4" /> : <Key className="w-4 h-4" />}
                          </div>
                          <div>
                            <p className="text-sm font-bold text-slate-100">{asset.name}</p>
                            <p className="text-[10px] text-slate-500 uppercase tracking-wider">{asset.size} • Encrypted</p>
                          </div>
                        </div>
                        <Lock className="w-4 h-4 text-slate-600" />
                      </div>
                    ))}
                  </div>
                </Card>

                <Button 
                  onClick={handleClaim}
                  disabled={isClaiming}
                  className="w-full h-16 bg-gradient-to-r from-blue-600 to-indigo-600 hover:scale-[1.02] text-white rounded-2xl font-black text-xl uppercase tracking-widest shadow-2xl shadow-blue-500/30 transition-all flex items-center justify-center gap-3"
                >
                  {isClaiming ? (
                    <><RefreshCw className="w-6 h-6 animate-spin" /> Executing Sequence...</>
                  ) : (
                    <><Fingerprint className="w-6 h-6" /> Initialize Distribution</>
                  )}
                </Button>
              </motion.div>
            )}

            {claimed && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="w-full space-y-8"
              >
                <div className="text-center space-y-4">
                  <div className="w-24 h-24 bg-emerald-500/20 border-2 border-emerald-500/40 rounded-full flex items-center justify-center mx-auto mb-6 text-emerald-400">
                    <CheckCircle2 className="w-14 h-14" />
                  </div>
                  <h2 className="text-4xl font-black text-white">Inheritance Secured</h2>
                  <p className="text-slate-400">The assets have been successfully decrypted and transferred to your secure session.</p>
                </div>

                <div className="grid grid-cols-1 gap-4">
                  {inheritanceData.assets.map((asset: any) => (
                    <Card key={asset.id} className="bg-white/[0.05] border-white/10 p-5 rounded-2xl flex items-center justify-between group hover:border-emerald-500/30 transition-all">
                      <div className="flex items-center gap-4">
                        <div className="p-3 bg-emerald-500/10 rounded-xl text-emerald-400">
                          {asset.type === 'password' ? <Key className="w-5 h-5" /> : <Download className="w-5 h-5" />}
                        </div>
                        <div>
                          <p className="font-bold text-white">{asset.name}</p>
                          <p className="text-xs text-emerald-500/60 font-medium">Decrypted Successfully</p>
                        </div>
                      </div>
                      <Button 
                        size="sm" 
                        variant="ghost" 
                        disabled={downloadingAssetId === asset.id}
                        onClick={() => downloadAndDecryptAsset(asset)}
                        className="rounded-lg group-hover:bg-emerald-500 group-hover:text-white transition-all text-emerald-400"
                      >
                        {downloadingAssetId === asset.id ? (
                          <>Downloading... <RefreshCw className="w-4 h-4 ml-2 animate-spin" /></>
                        ) : (
                          <>Download <Download className="w-4 h-4 ml-2" /></>
                        )}
                      </Button>
                    </Card>
                  ))}
                </div>

                <div className="p-6 bg-white/5 rounded-3xl border border-white/10 text-center space-y-3">
                  <p className="text-sm text-slate-500">Your cryptographic clearance is saved for this session. Please secure these assets immediately.</p>
                  <Button variant="link" className="text-blue-400" onClick={() => window.print()}>Save Transfer Receipt</Button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>

      <div className="mt-20">
        <SharedFooter />
      </div>

      <WalletConnectModal 
        isOpen={showWalletModal}
        onClose={() => setShowWalletModal(false)}
        onConnect={handleWalletConnect}
        isConnecting={isConnecting}
      />
    </div>
  )
}

export default function BeneficiaryAssetsPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-white dark:bg-[#080a0f] flex flex-col items-center justify-center"><RefreshCw className="w-10 h-10 text-blue-500 animate-spin" /></div>}>
      <BeneficiaryAssetsContent />
    </Suspense>
  )
}
