'use client'

import { X, Wallet, Shield, CheckCircle } from 'lucide-react'
import { connectWallet } from '@/lib/blockchain'

interface WalletConnectModalProps {
  isOpen: boolean
  onClose: () => void
  onConnect: (address: string) => void
  isConnecting: boolean
}

export function WalletConnectModal({ isOpen, onClose, onConnect, isConnecting }: WalletConnectModalProps) {
  if (!isOpen) return null

  const handleWalletSelect = async (type: string) => {
    try {
      const result = await connectWallet()
      if (result.success && result.address) {
        onConnect(result.address)
      } else {
        alert(result.error || 'Failed to connect wallet')
      }
    } catch (err: any) {
      alert(err.message || 'Connection failed')
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
      ></div>

      {/* Modal */}
      <div className="relative premium-card p-8 max-w-md w-full animate-in fade-in zoom-in duration-300">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-lg hover:bg-slate-800 transition-colors"
        >
          <X className="h-5 w-5 text-slate-400" />
        </button>

        <div className="text-center space-y-6">
          <div className="icon-container w-16 h-16 mx-auto">
            <Wallet className="h-8 w-8 text-white" />
          </div>

          <div>
            <h2 className="text-2xl font-bold gradient-text-premium mb-2">
              Connect Your Wallet
            </h2>
            <p className="text-sm text-slate-400">
              Choose how you want to connect to Digital Will Protocol
            </p>
          </div>

          <div className="space-y-3">
            <button
              onClick={() => handleWalletSelect('metamask')}
              disabled={isConnecting}
              className="w-full premium-card p-4 hover:scale-105 transition-transform disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center">
                  <span className="text-2xl">🦊</span>
                </div>
                <div className="flex-1 text-left">
                  <h3 className="font-bold text-slate-200">MetaMask</h3>
                  <p className="text-xs text-slate-400">Connect with MetaMask</p>
                </div>
                {isConnecting && (
                  <div className="animate-spin h-5 w-5 border-2 border-blue-500 border-t-transparent rounded-full"></div>
                )}
              </div>
            </button>
            <button
              onClick={() => handleWalletSelect('rainbow')}
              disabled={isConnecting}
              className="w-full premium-card p-4 hover:scale-105 transition-transform disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center">
                  <span className="text-2xl">🌈</span>
                </div>
                <div className="flex-1 text-left">
                  <h3 className="font-bold text-slate-200">Rainbow</h3>
                  <p className="text-xs text-slate-400">Connect with Rainbow</p>
                </div>
              </div>
            </button>

            <button
              onClick={() => handleWalletSelect('walletconnect')}
              disabled={isConnecting}
              className="w-full premium-card p-4 hover:scale-105 transition-transform disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
                  <Wallet className="h-6 w-6 text-white" />
                </div>
                <div className="flex-1 text-left">
                  <h3 className="font-bold text-slate-200">WalletConnect</h3>
                  <p className="text-xs text-slate-400">Scan with mobile wallet</p>
                </div>
              </div>
            </button>

            <button
              onClick={() => handleWalletSelect('coinbase')}
              disabled={isConnecting}
              className="w-full premium-card p-4 hover:scale-105 transition-transform disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center">
                  <span className="text-2xl">👛</span>
                </div>
                <div className="flex-1 text-left">
                  <h3 className="font-bold text-slate-200">Coinbase Wallet</h3>
                  <p className="text-xs text-slate-400">Connect with Coinbase</p>
                </div>
              </div>
            </button>
          </div>

          <div className="bg-blue-500/10 border border-blue-500/20 p-4 rounded-xl">
            <div className="flex items-start space-x-3">
              <Shield className="h-5 w-5 text-blue-400 mt-0.5 flex-shrink-0" />
              <div className="text-left text-sm text-slate-300">
                <p className="font-medium text-blue-300 mb-1">Secure Connection</p>
                <p className="text-xs">Your wallet credentials are never stored on our servers. All encryption happens client-side.</p>
              </div>
            </div>
          </div>

          <div className="space-y-2 text-xs text-slate-400">
            <div className="flex items-center justify-center space-x-2">
              <CheckCircle className="h-4 w-4 text-green-400" />
              <span>Zero-trust architecture</span>
            </div>
            <div className="flex items-center justify-center space-x-2">
              <CheckCircle className="h-4 w-4 text-green-400" />
              <span>Client-side encryption</span>
            </div>
            <div className="flex items-center justify-center space-x-2">
              <CheckCircle className="h-4 w-4 text-green-400" />
              <span>No data collection</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
