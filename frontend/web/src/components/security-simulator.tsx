'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Lock, Unlock, Key, Layers, CloudLightning, ShieldCheck, ChevronRight, HelpCircle } from 'lucide-react'

type TabType = 'encrypt' | 'shamir' | 'ipfs'

export function SecuritySimulator() {
  const [activeTab, setActiveTab] = useState<TabType>('encrypt')
  
  // Step 1 State
  const [plainText, setPlainText] = useState('My secret digital legacy details...')
  const [cipherText, setCipherText] = useState('')
  const [aesKey, setAesKey] = useState('')
  const [isEncrypting, setIsEncrypting] = useState(false)

  // Step 2 State
  const [activeShares, setActiveShares] = useState<boolean[]>([true, true, true, false, false])
  const [isReconstructing, setIsReconstructing] = useState(false)

  // Step 3 State
  const [isChunking, setIsChunking] = useState(false)
  const [pinnedNodes, setPinnedNodes] = useState<string[]>([])

  const runEncryption = () => {
    setIsEncrypting(true)
    setTimeout(() => {
      // Mock ciphertext & key generation
      const mockKey = '0x' + Array.from({ length: 64 }, () => Math.floor(Math.random() * 16).toString(16)).join('')
      const mockCipher = 'AES-GCM-256:' + Array.from({ length: 48 }, () => Math.floor(Math.random() * 16).toString(16)).join('')
      setAesKey(mockKey)
      setCipherText(mockCipher)
      setIsEncrypting(false)
    }, 1500)
  }

  const toggleShare = (index: number) => {
    const updated = [...activeShares]
    updated[index] = !updated[index]
    setActiveShares(updated)
  }

  const activeCount = activeShares.filter(Boolean).length
  const hasThreshold = activeCount >= 3

  const startIPFSChunking = () => {
    setIsChunking(true)
    setPinnedNodes([])
    const nodes = ['Storacha-US-East', 'IPFS-Gateway-Paris', 'Arweave-Permanent-Node', 'Filecoin-Provider-Singapore']
    nodes.forEach((node, idx) => {
      setTimeout(() => {
        setPinnedNodes((prev) => [...prev, node])
        if (idx === nodes.length - 1) {
          setIsChunking(false)
        }
      }, (idx + 1) * 800)
    })
  }

  return (
    <div className="w-full bg-slate-50 dark:bg-white/[0.02] border border-slate-200 dark:border-white/5 rounded-3xl p-6 md:p-10 shadow-2xl relative overflow-hidden transition-colors duration-300">
      <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600" />
      
      {/* Title */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <span className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-600 dark:text-blue-400">Interactive Sandbox</span>
          <h3 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight mt-1">Zero-Trust Cryptography Simulator</h3>
        </div>
        <div className="flex gap-1.5 bg-slate-200/60 dark:bg-white/5 p-1 rounded-xl border border-slate-300/40 dark:border-white/10">
          {(['encrypt', 'shamir', 'ipfs'] as TabType[]).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-lg text-xs font-black uppercase tracking-wider transition-all duration-300 ${
                activeTab === tab 
                  ? 'bg-blue-600 text-white shadow-md' 
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
              }`}
            >
              {tab === 'encrypt' ? '1. AES Encrypt' : tab === 'shamir' ? '2. Shamir Split' : '3. IPFS Chunking'}
            </button>
          ))}
        </div>
      </div>

      {/* Tab Panels */}
      <div className="min-h-[360px] flex flex-col justify-between">
        <AnimatePresence mode="wait">
          {activeTab === 'encrypt' && (
            <motion.div
              key="encrypt"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.2 }}
              className="space-y-6"
            >
              <div className="grid md:grid-cols-2 gap-6">
                {/* Inputs */}
                <div className="space-y-4">
                  <div>
                    <label className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest block mb-2">Plaintext Input (Client-Side Only)</label>
                    <textarea
                      value={plainText}
                      onChange={(e) => setPlainText(e.target.value)}
                      placeholder="Type your secure message here..."
                      className="w-full h-32 bg-white dark:bg-black/20 border border-slate-300 dark:border-white/10 rounded-2xl p-4 text-sm font-medium text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                    />
                  </div>
                  <button
                    onClick={runEncryption}
                    disabled={isEncrypting || !plainText}
                    className="w-full bg-blue-600 hover:bg-blue-500 active:scale-[0.98] text-white py-3.5 rounded-xl font-black text-xs uppercase tracking-widest transition-all flex items-center justify-center gap-2 shadow-lg shadow-blue-600/20 disabled:opacity-50"
                  >
                    {isEncrypting ? (
                      <>
                        <span className="w-4 h-4 rounded-full border-2 border-white border-t-transparent animate-spin" />
                        Generating Key & Encrypting...
                      </>
                    ) : (
                      <>
                        <Lock className="w-3.5 h-3.5" />
                        Encrypt with AES-256-GCM
                      </>
                    )}
                  </button>
                </div>

                {/* Animation Screen */}
                <div className="bg-slate-100 dark:bg-black/20 border border-slate-200 dark:border-white/5 rounded-2xl p-6 font-mono text-xs flex flex-col justify-between relative overflow-hidden shadow-inner min-h-[220px]">
                  {isEncrypting ? (
                    <div className="flex-1 flex flex-col items-center justify-center gap-4 text-center">
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ repeat: Infinity, duration: 1.5, ease: 'linear' }}
                        className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full flex items-center justify-center"
                      />
                      <div className="text-blue-500 dark:text-blue-400 font-bold uppercase tracking-widest text-[9px] animate-pulse">Running WebCrypto AES-GCM...</div>
                    </div>
                  ) : cipherText ? (
                    <div className="space-y-4">
                      <div>
                        <div className="text-[9px] font-black text-emerald-500 uppercase tracking-widest mb-1.5 flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" /> Ciphertext output
                        </div>
                        <div className="bg-white dark:bg-black/30 border border-slate-200 dark:border-white/5 p-3 rounded-xl break-all text-[11px] text-slate-600 dark:text-slate-400 max-h-24 overflow-y-auto">
                          {cipherText}
                        </div>
                      </div>

                      <div>
                        <div className="text-[9px] font-black text-blue-500 uppercase tracking-widest mb-1.5 flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" /> Ephemeral Symmetric Key
                        </div>
                        <div className="bg-white dark:bg-black/30 border border-slate-200 dark:border-white/5 p-3 rounded-xl break-all text-[11px] text-blue-500 dark:text-blue-400 font-semibold max-h-16 overflow-y-auto">
                          {aesKey}
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="flex-1 flex flex-col items-center justify-center text-center text-slate-400 dark:text-slate-500 gap-2">
                      <Key className="w-8 h-8 opacity-30" />
                      <p className="text-xs font-semibold">Click encrypt to initiate client-side math</p>
                    </div>
                  )}
                  
                  <div className="text-[8px] font-bold text-slate-400 uppercase tracking-widest mt-4 pt-2 border-t border-slate-200 dark:border-white/5">
                    Zero-Trust: Ciphertext uploaded; Plaintext never stored.
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'shamir' && (
            <motion.div
              key="shamir"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.2 }}
              className="space-y-6"
            >
              <div className="space-y-4">
                <p className="text-sm font-medium text-slate-600 dark:text-slate-400">
                  Instead of storing the AES key intact, AlwaysThere splits it into 5 distinct shards using Shamir's Secret Sharing. 
                  Any 3 shards are mathematically capable of reconstructing the key. Fewer than 3 yields absolutely zero information.
                </p>

                {/* Shards Selector */}
                <div className="grid grid-cols-5 gap-3">
                  {activeShares.map((isActive, idx) => (
                    <button
                      key={idx}
                      onClick={() => toggleShare(idx)}
                      className={`p-4 rounded-2xl border transition-all duration-300 flex flex-col items-center justify-center gap-2 ${
                        isActive 
                          ? 'border-purple-500 bg-purple-500/10 text-purple-600 dark:text-purple-400 shadow-md shadow-purple-500/10' 
                          : 'border-slate-300 dark:border-white/10 bg-transparent text-slate-400 dark:text-slate-500 opacity-60 hover:opacity-100'
                      }`}
                    >
                      <Layers className="w-6 h-6" suppressHydrationWarning />
                      <span className="text-[10px] font-black uppercase tracking-wider">Shard {idx + 1}</span>
                      <span className={`text-[8px] font-black px-1.5 py-0.5 rounded ${isActive ? 'bg-purple-600 text-white' : 'bg-slate-200 dark:bg-white/10 text-slate-500'}`}>
                        {isActive ? 'Active' : 'Offline'}
                      </span>
                    </button>
                  ))}
                </div>

                {/* Reconstructor Area */}
                <div className="bg-slate-100 dark:bg-black/20 border border-slate-200 dark:border-white/5 rounded-2xl p-6 text-center shadow-inner relative overflow-hidden min-h-[140px] flex flex-col items-center justify-center">
                  <AnimatePresence mode="wait">
                    {hasThreshold ? (
                      <motion.div
                        key="success"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className="space-y-3"
                      >
                        <div className="inline-flex p-3 rounded-full bg-emerald-500/20 text-emerald-500 border border-emerald-500/20 mb-2">
                          <Unlock className="w-6 h-6" suppressHydrationWarning />
                        </div>
                        <h4 className="text-sm font-bold text-slate-800 dark:text-white uppercase tracking-wider">Threshold Reached ({activeCount}/5 Shares Available)</h4>
                        <p className="text-xs text-slate-500 dark:text-slate-400 max-w-md mx-auto">
                          Success! At least 3 shards are present. The math successfully completes and restores access to the vault.
                        </p>
                      </motion.div>
                    ) : (
                      <motion.div
                        key="locked"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className="space-y-3"
                      >
                        <div className="inline-flex p-3 rounded-full bg-red-500/10 text-red-500 border border-red-500/20 mb-2">
                          <Lock className="w-6 h-6" suppressHydrationWarning />
                        </div>
                        <h4 className="text-sm font-bold text-slate-800 dark:text-white uppercase tracking-wider">Access Locked ({activeCount}/5 Shares Available)</h4>
                        <p className="text-xs text-slate-500 dark:text-slate-400 max-w-md mx-auto">
                          Locked! Shamir threshold requires 3 shards. Your assets are secure even if 2 shards are compromised or lost.
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'ipfs' && (
            <motion.div
              key="ipfs"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.2 }}
              className="space-y-6"
            >
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div className="space-y-4">
                  <p className="text-sm font-medium text-slate-600 dark:text-slate-400 leading-relaxed">
                    Decentralization protects against server failures or host takedowns. 
                    The AES-256 encrypted payload is chunked and pinned to the global IPFS swarm using Storacha nodes.
                  </p>
                  <button
                    onClick={startIPFSChunking}
                    disabled={isChunking}
                    className="bg-indigo-600 hover:bg-indigo-500 active:scale-[0.98] text-white py-3 px-6 rounded-xl font-black text-xs uppercase tracking-widest transition-all inline-flex items-center gap-2 shadow-lg shadow-indigo-600/20 disabled:opacity-50"
                  >
                    <CloudLightning className="w-4 h-4" suppressHydrationWarning />
                    Simulate Pinned Chunk Distribution
                  </button>
                </div>

                {/* Nodes Swarm Visualizer */}
                <div className="bg-slate-100 dark:bg-black/20 border border-slate-200 dark:border-white/5 rounded-2xl p-6 min-h-[220px] flex flex-col justify-between shadow-inner">
                  <div className="space-y-3">
                    <div className="text-[9px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest">Global IPFS Nodes Swarm</div>
                    
                    <div className="space-y-2">
                      {[
                        { id: 'Storacha-US-East', label: 'Storacha Cluster (US East)' },
                        { id: 'IPFS-Gateway-Paris', label: 'IPFS Swarm Node (Paris)' },
                        { id: 'Arweave-Permanent-Node', label: 'Arweave Permanent Storage' },
                        { id: 'Filecoin-Provider-Singapore', label: 'Filecoin Storage Provider (Singapore)' }
                      ].map((node) => {
                        const isPinned = pinnedNodes.includes(node.id)
                        return (
                          <div
                            key={node.id}
                            className={`p-3 rounded-xl border flex items-center justify-between transition-all duration-300 ${
                              isPinned 
                                ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-600 dark:text-emerald-400' 
                                : 'bg-white dark:bg-black/10 border-slate-200 dark:border-white/5 text-slate-400'
                            }`}
                          >
                            <span className="text-xs font-bold font-mono">{node.label}</span>
                            <span className={`text-[8px] font-black uppercase tracking-wider px-2 py-0.5 rounded ${
                              isPinned ? 'bg-emerald-500 text-white animate-pulse' : 'bg-slate-200 dark:bg-white/10 text-slate-500'
                            }`}>
                              {isPinned ? 'Pinned & Verified' : 'Awaiting Shard'}
                            </span>
                          </div>
                        )
                      })}
                    </div>
                  </div>

                  {pinnedNodes.length === 4 && (
                    <motion.div
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-4 pt-3 border-t border-emerald-500/20 flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-bold text-[10px] uppercase tracking-wider"
                    >
                      <ShieldCheck className="w-4 h-4" suppressHydrationWarning /> Decoupled consensus reached across all nodes
                    </motion.div>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
