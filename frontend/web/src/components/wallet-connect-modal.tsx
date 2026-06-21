'use client'

import { useState, useRef, useEffect } from 'react'
import { X, Wallet, Shield, CheckCircle, Camera, FileText, Upload, RefreshCw, Key, Image as ImageIcon, Fingerprint, Lock } from 'lucide-react'
import { useConnectModal } from '@rainbow-me/rainbowkit'
import { useAccount, useDisconnect } from 'wagmi'
import { ethers } from 'ethers'
import jsQR from 'jsqr'
import { toast } from 'sonner'
import CryptoJS from 'crypto-js'
import { Portal } from '@/components/portal'

interface WalletConnectModalProps {
  isOpen: boolean
  onClose: () => void
  onConnect: (address: string, customPrivateKey?: string) => void
  isConnecting: boolean
}

type TabType = 'wallet' | 'recovery'
type RecoveryMethodType = 'file' | 'camera' | 'manual'

export function WalletConnectModal({ isOpen, onClose, onConnect, isConnecting }: WalletConnectModalProps) {
  const { openConnectModal } = useConnectModal()
  const { address, isConnected } = useAccount()
  const { disconnect } = useDisconnect()

  const [tab, setTab] = useState<TabType>('wallet')
  const [recoveryMethod, setRecoveryMethod] = useState<RecoveryMethodType>('file')
  const [manualKey, setManualKey] = useState('')
  const [isScanning, setIsScanning] = useState(false)
  const [showScanner, setShowScanner] = useState(false)
  const [hasLocalVault, setHasLocalVault] = useState(false)
  const [isUnlockingVault, setIsUnlockingVault] = useState(false)
  const [vaultPin, setVaultPin] = useState('')

  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const streamRef = useRef<MediaStream | null>(null)
  const animationFrameRef = useRef<number | null>(null)

  // Autodetect wallet connection if wallet tab is open
  useEffect(() => {
    if (!isOpen) return
    if (tab === 'wallet' && isConnected && address) {
      onConnect(address)
    }
  }, [isOpen, tab, isConnected, address]) // eslint-disable-line react-hooks/exhaustive-deps

  // Detect local vault presence when modal opens
  useEffect(() => {
    if (isOpen) {
      const vault = localStorage.getItem('always_there_recovery_vault')
      setHasLocalVault(!!vault)
      setIsUnlockingVault(false)
      setVaultPin('')
    }
  }, [isOpen])

  // Cleanup camera on close or tab change
  useEffect(() => {
    return () => {
      stopCamera()
    }
  }, [])

  const stopCamera = () => {
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current)
      animationFrameRef.current = null
    }
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop())
      streamRef.current = null
    }
    setIsScanning(false)
    setShowScanner(false)
  }

  const startCamera = async () => {
    setShowScanner(true)
    setIsScanning(true)
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: 'environment' } 
      })
      streamRef.current = stream
      if (videoRef.current) {
        videoRef.current.srcObject = stream
        videoRef.current.setAttribute('playsinline', 'true')
        videoRef.current.play()
        animationFrameRef.current = requestAnimationFrame(tick)
      }
    } catch (err: any) {
      console.error(err)
      toast.error('Could not access camera. Please upload an image of the QR code or use the manual text/file option.')
      stopCamera()
    }
  }

  const tick = () => {
    if (!videoRef.current || !canvasRef.current || !streamRef.current) return
    if (videoRef.current.readyState === videoRef.current.HAVE_ENOUGH_DATA) {
      const canvas = canvasRef.current
      const ctx = canvas.getContext('2d')
      if (ctx) {
        canvas.height = videoRef.current.videoHeight
        canvas.width = videoRef.current.videoWidth
        ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height)
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
        const code = jsQR(imageData.data, imageData.width, imageData.height, {
          inversionAttempts: 'dontInvert',
        })
        if (code) {
          handleRecoveryInput(code.data)
          stopCamera()
          return
        }
      }
    }
    if (isScanning) {
      animationFrameRef.current = requestAnimationFrame(tick)
    }
  }

  const handleRecoveryInput = (inputVal: string) => {
    let key = inputVal.trim()
    
    // Check if JSON-formatted string
    try {
      const parsed = JSON.parse(key)
      if (parsed.privateKey) {
        key = parsed.privateKey
      }
    } catch (_) {}

    // Add 0x prefix if needed
    if (!key.startsWith('0x') && key.length === 64) {
      key = '0x' + key
    }

    if (!ethers.isHexString(key) || (key.length !== 66 && key.length !== 64)) {
      toast.error('Invalid recovery private key format. Must be a 64 or 66 character hex string.')
      return
    }

    try {
      const wallet = new ethers.Wallet(key)
      toast.success('Recovery key verified successfully!')
      onConnect(wallet.address, key)
    } catch (err: any) {
      toast.error('Invalid private key: ' + err.message)
    }
  }

  const handleClearVault = () => {
    if (confirm("Are you sure you want to delete the saved recovery key from this device? You will still be able to use your printed QR code or JSON file.")) {
      localStorage.removeItem('always_there_recovery_vault')
      setHasLocalVault(false)
      setIsUnlockingVault(false)
      toast.success("Local recovery vault cleared.")
    }
  }

  const handleUnlockVault = (e: React.FormEvent) => {
    e.preventDefault()
    if (!vaultPin.trim()) {
      toast.error("Please enter your PIN/Password.")
      return
    }
    const vaultStr = localStorage.getItem('always_there_recovery_vault')
    if (!vaultStr) return
    
    try {
      const vaultData = JSON.parse(vaultStr)
      const bytes = CryptoJS.AES.decrypt(vaultData.encrypted, vaultPin.trim())
      const decryptedPrivateKey = bytes.toString(CryptoJS.enc.Utf8)
      
      if (decryptedPrivateKey && (decryptedPrivateKey.startsWith('0x') || decryptedPrivateKey.length === 64)) {
        toast.success("Vault successfully unlocked!")
        setIsUnlockingVault(false)
        setVaultPin('')
        handleRecoveryInput(decryptedPrivateKey)
      } else {
        toast.error("Incorrect PIN or Password. Could not decrypt vault.")
      }
    } catch (err) {
      toast.error("Incorrect PIN or Password. Could not decrypt vault.")
    }
  }

  const handleJsonUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = (event) => {
      try {
        const text = (event.target?.result as string).trim()
        try {
          const data = JSON.parse(text)
          if (data.privateKey) {
            handleRecoveryInput(data.privateKey)
            return
          }
        } catch (_) {}
        
        if (ethers.isHexString(text) || text.length === 64 || text.length === 66) {
          handleRecoveryInput(text)
        } else {
          toast.error('File content is not a valid private key or recovery JSON.')
        }
      } catch (err) {
        toast.error('Failed to read file.')
      }
    }
    reader.readAsText(file)
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = (event) => {
      const img = new Image()
      img.onload = () => {
        const canvas = document.createElement('canvas')
        const ctx = canvas.getContext('2d')
        if (ctx) {
          canvas.width = img.width
          canvas.height = img.height
          ctx.drawImage(img, 0, 0)
          const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
          const code = jsQR(imageData.data, imageData.width, imageData.height)
          if (code) {
            handleRecoveryInput(code.data)
          } else {
            toast.error('Could not find any readable QR code in this image.')
          }
        }
      }
      img.src = event.target?.result as string
    }
    reader.readAsDataURL(file)
  }

  const handleWalletSelect = () => {
    if (isConnected && address) {
      onConnect(address)
    } else if (openConnectModal) {
      openConnectModal()
    } else {
      disconnect()
    }
  }

  if (!isOpen) return null

  return (
    <Portal>
      <div className="fixed inset-0 z-50 flex items-start justify-center p-4 overflow-y-auto">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={() => {
          stopCamera()
          onClose()
        }}
      ></div>

      {/* Modal */}
      <div className="relative premium-card p-6 md:p-8 max-w-lg w-full animate-in fade-in zoom-in duration-300 bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl text-slate-100 max-h-[90vh] overflow-y-auto my-8 md:my-16">
        <button
          onClick={() => {
            stopCamera()
            onClose()
          }}
          className="absolute top-4 right-4 p-2 rounded-lg hover:bg-slate-800 transition-colors"
        >
          <X className="h-5 w-5 text-slate-400" />
        </button>

        {/* Tab Selection */}
        <div className="flex border-b border-slate-800 mb-6 mt-2">
          <button 
            type="button"
            onClick={() => {
              stopCamera()
              setTab('wallet')
            }} 
            className={`flex-1 pb-3 text-xs md:text-sm font-bold uppercase tracking-widest transition-colors flex items-center justify-center gap-2 ${tab === 'wallet' ? 'text-blue-500 border-b-2 border-blue-500' : 'text-slate-400 hover:text-slate-200'}`}
          >
            <Wallet className="size-4" />
            Primary Wallet
          </button>
          <button 
            type="button"
            onClick={() => setTab('recovery')} 
            className={`flex-1 pb-3 text-xs md:text-sm font-bold uppercase tracking-widest transition-colors flex items-center justify-center gap-2 ${tab === 'recovery' ? 'text-blue-500 border-b-2 border-blue-500' : 'text-slate-400 hover:text-slate-200'}`}
          >
            <Key className="size-4" />
            Recovery Key
          </button>
        </div>

        {tab === 'wallet' ? (
          <div className="text-center space-y-6">
            <div className="icon-container w-16 h-16 mx-auto bg-blue-500/10 border border-blue-500/20 rounded-2xl flex items-center justify-center">
              <Wallet className="h-8 w-8 text-blue-400" />
            </div>

            <div>
              <h2 className="text-2xl font-bold gradient-text-premium mb-2">
                Connect Primary Wallet
              </h2>
              <p className="text-sm text-slate-400">
                Unlock the protocol using your primary Web3 wallet identity.
              </p>
            </div>

            <div className="space-y-4">
              <button
                type="button"
                onClick={handleWalletSelect}
                className="w-full py-4 bg-blue-600 hover:bg-blue-500 text-white rounded-2xl font-bold text-lg shadow-[0_0_20px_rgba(37,99,235,0.3)] transition-all flex items-center justify-center gap-3"
              >
                <Wallet className="w-6 h-6" />
                Open Multi-Wallet Selector
              </button>
              
              {process.env.NODE_ENV === 'development' && (
                <button
                  type="button"
                  onClick={() => onConnect('0x70997970C51812dc3A010C7d01b50e0d17dc79C8')}
                  className="w-full py-3 bg-white/5 hover:bg-white/10 border border-white/10 text-slate-400 rounded-xl font-bold text-xs uppercase tracking-widest transition-all"
                >
                  🛠️ Dev Quick Login (Skip Wallet)
                </button>
              )}
              
              <p className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">Supported Networks</p>
              <div className="flex justify-center gap-4 opacity-50 grayscale hover:grayscale-0 transition-all">
                  <span className="text-2xl" title="Ethereum">🔹</span>
                  <span className="text-2xl" title="Polygon">🟣</span>
                  <span className="text-2xl" title="Local Hardhat">👷</span>
              </div>
              <p className="text-xs text-amber-500/80 mt-2 bg-amber-500/10 p-2.5 rounded-lg border border-amber-500/20 text-left leading-relaxed">
                ⚠️ <b>Local Testing:</b> Mobile wallets & WalletConnect do not support Localhost. Please install the MetaMask browser extension to connect.
              </p>
            </div>

            <div className="bg-blue-500/10 border border-blue-500/20 p-4 rounded-xl text-left">
              <div className="flex items-start space-x-3">
                <Shield className="h-5 w-5 text-blue-400 mt-0.5 flex-shrink-0" />
                <div className="text-sm text-slate-300">
                  <p className="font-medium text-blue-300 mb-1">RainbowKit Integrated</p>
                  <p className="text-xs">Access Rainbow, Coinbase, MetaMask, and hundreds of mobile wallets via WalletConnect.</p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-6 text-left">
            <div className="text-center">
              <div className="icon-container w-16 h-16 mx-auto bg-amber-500/10 border border-amber-500/20 rounded-2xl flex items-center justify-center mb-4">
                <Shield className="h-8 w-8 text-amber-400" />
              </div>
              <h2 className="text-2xl font-bold gradient-text-premium mb-2">
                Offline Recovery Access
              </h2>
              <p className="text-sm text-slate-400">
                Log in via your offline recovery key (stored on a pendrive, printed card, or QR image).
              </p>
            </div>

            {/* Quick Login Section if Vault is Present */}
            {hasLocalVault && (
              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
                    <Fingerprint className="size-4 text-emerald-400" /> Saved Local Vault Found
                  </span>
                  <button 
                    type="button"
                    onClick={handleClearVault}
                    className="text-[9px] uppercase tracking-widest text-red-400 hover:text-red-300 font-bold animate-pulse"
                  >
                    Clear Vault
                  </button>
                </div>
                
                {isUnlockingVault ? (
                  <form onSubmit={handleUnlockVault} className="space-y-2">
                    <div className="flex gap-2">
                      <input 
                        type="password"
                        placeholder="Enter your PIN/Password"
                        value={vaultPin}
                        onChange={(e) => setVaultPin(e.target.value)}
                        className="flex-1 bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-blue-500 font-mono"
                        autoFocus
                      />
                      <button 
                        type="submit"
                        className="px-4 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-bold text-xs uppercase tracking-widest transition-colors"
                      >
                        Unlock
                      </button>
                    </div>
                    <button 
                      type="button"
                      onClick={() => setIsUnlockingVault(false)}
                      className="text-[10px] text-slate-500 hover:text-slate-400 underline"
                    >
                      Cancel
                    </button>
                  </form>
                ) : (
                  <button
                    type="button"
                    onClick={() => {
                      setIsUnlockingVault(true)
                      setVaultPin('')
                    }}
                    className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-bold text-xs uppercase tracking-widest shadow-md transition-colors flex items-center justify-center gap-2"
                  >
                    <Lock className="size-4" /> Quick Login (Saved Key)
                  </button>
                )}
              </div>
            )}

            {/* Sub-tabs for Recovery Methods */}
            <div className="grid grid-cols-3 gap-2 bg-slate-950 p-1 rounded-xl border border-slate-800">
              <button
                type="button"
                onClick={() => {
                  stopCamera()
                  setRecoveryMethod('file')
                }}
                className={`py-2 text-[10px] md:text-xs font-black uppercase tracking-wider rounded-lg transition-colors flex items-center justify-center gap-1.5 ${recoveryMethod === 'file' ? 'bg-blue-600 text-white shadow-md' : 'text-slate-400 hover:text-slate-200'}`}
              >
                <FileText className="size-3.5" />
                Backup File
              </button>
              <button
                type="button"
                onClick={() => {
                  setRecoveryMethod('camera')
                }}
                className={`py-2 text-[10px] md:text-xs font-black uppercase tracking-wider rounded-lg transition-colors flex items-center justify-center gap-1.5 ${recoveryMethod === 'camera' ? 'bg-blue-600 text-white shadow-md' : 'text-slate-400 hover:text-slate-200'}`}
              >
                <Camera className="size-3.5" />
                Scan QR
              </button>
              <button
                type="button"
                onClick={() => {
                  stopCamera()
                  setRecoveryMethod('manual')
                }}
                className={`py-2 text-[10px] md:text-xs font-black uppercase tracking-wider rounded-lg transition-colors flex items-center justify-center gap-1.5 ${recoveryMethod === 'manual' ? 'bg-blue-600 text-white shadow-md' : 'text-slate-400 hover:text-slate-200'}`}
              >
                <Key className="size-3.5" />
                Manual Hex
              </button>
            </div>

            {/* Method Renderers */}
            <div className="bg-slate-950/50 p-6 rounded-2xl border border-slate-800/80 min-h-[180px] flex flex-col justify-center">
              {recoveryMethod === 'file' && (
                <div className="space-y-4 text-center">
                  <p className="text-xs text-slate-400">
                    Upload your recovery JSON backup file or scan/upload a QR code image of the key.
                  </p>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <label className="flex flex-col items-center justify-center p-4 bg-slate-900 border-2 border-dashed border-slate-800 hover:border-blue-500/50 rounded-xl cursor-pointer transition-colors group">
                      <FileText className="size-8 text-slate-500 group-hover:text-blue-400 transition-colors mb-2" />
                      <span className="text-xs font-bold text-slate-300">Upload Backup JSON</span>
                      <span className="text-[9px] text-slate-500 mt-1">recovery-key.json</span>
                      <input 
                        type="file" 
                        accept=".json" 
                        onChange={handleJsonUpload} 
                        className="hidden" 
                      />
                    </label>

                    <label className="flex flex-col items-center justify-center p-4 bg-slate-900 border-2 border-dashed border-slate-800 hover:border-blue-500/50 rounded-xl cursor-pointer transition-colors group">
                      <ImageIcon className="size-8 text-slate-500 group-hover:text-blue-400 transition-colors mb-2" />
                      <span className="text-xs font-bold text-slate-300">Upload QR Image</span>
                      <span className="text-[9px] text-slate-500 mt-1">PNG, JPG, SVG</span>
                      <input 
                        type="file" 
                        accept="image/*" 
                        onChange={handleImageUpload} 
                        className="hidden" 
                      />
                    </label>
                  </div>
                </div>
              )}

              {recoveryMethod === 'camera' && (
                <div className="space-y-4 text-center flex flex-col items-center justify-center">
                  {showScanner ? (
                    <div className="relative w-full max-w-[280px] aspect-square rounded-xl overflow-hidden bg-black border border-slate-800 shadow-inner flex items-center justify-center">
                      <video 
                        ref={videoRef} 
                        className="w-full h-full object-cover scale-x-[-1]"
                      />
                      <canvas ref={canvasRef} className="hidden" />
                      {/* Scanning Line overlay */}
                      <div className="absolute inset-x-0 h-0.5 bg-blue-500/80 shadow-[0_0_10px_rgba(59,130,246,0.8)] animate-pulse top-0 animate-[scan_2s_ease-in-out_infinite]" style={{
                        animation: 'scan 2s ease-in-out infinite'
                      }} />
                      <button
                        type="button"
                        onClick={stopCamera}
                        className="absolute bottom-3 right-3 bg-red-600/90 hover:bg-red-500 text-white text-[10px] font-black uppercase px-2.5 py-1 rounded-md shadow-md"
                      >
                        Stop
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      <p className="text-xs text-slate-400 leading-relaxed">
                        Use your device camera to scan the QR code printed on your AlwaysThere recovery card.
                      </p>
                      <button
                        type="button"
                        onClick={startCamera}
                        className="mx-auto py-3 px-6 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-bold text-xs uppercase tracking-widest shadow-md transition-colors flex items-center gap-2"
                      >
                        <Camera className="size-4" />
                        Enable Camera Stream
                      </button>
                    </div>
                  )}
                </div>
              )}

              {recoveryMethod === 'manual' && (
                <div className="space-y-4">
                  <p className="text-xs text-slate-400">
                    Paste your raw recovery private key (64 hex characters) to sign in.
                  </p>
                  <div className="space-y-2">
                    <input
                      type="password"
                      placeholder="0x..."
                      value={manualKey}
                      onChange={(e) => setManualKey(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-800 focus:border-blue-500/50 rounded-xl px-4 py-3 text-sm font-mono tracking-widest text-slate-200 outline-none transition-colors"
                    />
                    <button
                      type="button"
                      onClick={() => handleRecoveryInput(manualKey)}
                      disabled={!manualKey}
                      className="w-full py-3 bg-blue-600 hover:bg-blue-500 disabled:bg-slate-800 disabled:text-slate-500 disabled:cursor-not-allowed text-white rounded-xl font-bold text-xs uppercase tracking-widest transition-colors flex items-center justify-center gap-2"
                    >
                      <CheckCircle className="size-4" />
                      Authenticate Key
                    </button>
                  </div>
                </div>
              )}
            </div>

            <div className="bg-amber-500/10 border border-amber-500/20 p-4 rounded-xl">
              <div className="flex items-start space-x-3">
                <Shield className="h-5 w-5 text-amber-400 mt-0.5 flex-shrink-0" />
                <div className="text-xs text-slate-300 leading-relaxed">
                  <p className="font-bold text-amber-400 mb-1">Security Disclaimer</p>
                  <p>Never expose your recovery private key to third parties. The key is processed entirely locally within your browser to sign the authentication nonce; it is never uploaded to the server.</p>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="mt-6 pt-4 border-t border-slate-800 space-y-2 text-xs text-slate-400 text-center">
          <div className="flex items-center justify-center space-x-4">
            <div className="flex items-center space-x-1">
              <CheckCircle className="h-3.5 w-3.5 text-green-400" />
              <span>Zero-trust</span>
            </div>
            <div className="flex items-center space-x-1">
              <CheckCircle className="h-3.5 w-3.5 text-green-400" />
              <span>Client-side sign</span>
            </div>
            <div className="flex items-center space-x-1">
              <CheckCircle className="h-3.5 w-3.5 text-green-400" />
              <span>Hardware-backed</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Dynamic scan line style injection */}
      <style jsx global>{`
        @keyframes scan {
          0%, 100% { top: 0%; }
          50% { top: 100%; }
        }
      `}</style>
    </div>
    </Portal>
  )
}
