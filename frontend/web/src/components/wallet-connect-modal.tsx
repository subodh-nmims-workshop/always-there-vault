'use client'

import { X, Wallet, Shield, CheckCircle } from 'lucide-react'
import { useConnectModal } from '@rainbow-me/rainbowkit'
import { useAccount, useDisconnect } from 'wagmi'
import { useEffect } from 'react'

interface WalletConnectModalProps {
  isOpen: boolean
  onClose: () => void
  onConnect: (address: string) => void
  isConnecting: boolean
}

export function WalletConnectModal({ isOpen, onClose, onConnect, isConnecting }: WalletConnectModalProps) {
  const { openConnectModal } = useConnectModal()
  const { address, isConnected } = useAccount()
  const { disconnect } = useDisconnect()

  useEffect(() => {
    if (!isOpen) return
    // Wallet already connected (e.g. MetaMask still has session) — skip RainbowKit modal, go straight to signing
    if (isConnected && address) {
      onConnect(address)
      return
    }
  }, [isOpen]) // eslint-disable-line react-hooks/exhaustive-deps

  // When wallet connects after user picks one from RainbowKit
  useEffect(() => {
    if (isConnected && address && isOpen) {
      onConnect(address)
    }
  }, [isConnected, address]) // eslint-disable-line react-hooks/exhaustive-deps

  if (!isOpen) return null

  const handleWalletSelect = () => {
    if (isConnected && address) {
      // Already connected, just trigger auth signing
      onConnect(address)
    } else if (openConnectModal) {
      openConnectModal()
    } else {
      // Fallback: disconnect stale session and retry
      disconnect()
      setTimeout(() => openConnectModal?.(), 300)
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
              Unlock the protocol with your decentralized identity
            </p>
          </div>

          <div className="space-y-4">
            <button
              onClick={handleWalletSelect}
              className="w-full py-4 bg-[#1152d4] hover:bg-[#1152d4]/90 text-white rounded-2xl font-bold text-lg shadow-[0_0_20px_rgba(17,82,212,0.3)] transition-all flex items-center justify-center gap-3"
            >
              <Wallet className="w-6 h-6" />
              Open Multi-Wallet Selector
            </button>
            
            <p className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">Supported Networks</p>
            <div className="flex justify-center gap-4 opacity-50 grayscale hover:grayscale-0 transition-all">
                <span className="text-2xl" title="Ethereum">🔹</span>
                <span className="text-2xl" title="Polygon">🟣</span>
                <span className="text-2xl" title="Local Hardhat">👷</span>
            </div>
            <p className="text-xs text-amber-500/80 mt-2 bg-amber-500/10 p-2 rounded-lg border border-amber-500/20">
              ⚠️ <b>Local Testing:</b> Mobile wallets & WalletConnect do not support Localhost. Please install the MetaMask browser extension to connect.
            </p>
          </div>

          <div className="bg-blue-500/10 border border-blue-500/20 p-4 rounded-xl">
            <div className="flex items-start space-x-3">
              <Shield className="h-5 w-5 text-blue-400 mt-0.5 flex-shrink-0" />
              <div className="text-left text-sm text-slate-300">
                <p className="font-medium text-blue-300 mb-1">RainbowKit Integrated</p>
                <p className="text-xs">Access Rainbow, Coinbase, MetaMask, and hundreds of mobile wallets via WalletConnect.</p>
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
          </div>
        </div>
      </div>
    </div>
  )
}
