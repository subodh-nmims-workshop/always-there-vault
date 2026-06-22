'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Shield, Users, Lock, Unlock, Key, Layers, Server, ArrowRight, Play, RotateCcw } from 'lucide-react'

type StepType = 'connect' | 'nominee' | 'encrypt' | 'consensus'

export function DemoWalkthroughPlayer() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentStep, setCurrentStep] = useState<StepType>('connect')

  const steps: { id: StepType; label: string; desc: string }[] = [
    { id: 'connect', label: '1. One-Click Login', desc: 'Securely entering the local vault sandbox.' },
    { id: 'nominee', label: '2. Register Nominee', desc: 'Adding heirs and secure recovery keys.' },
    { id: 'encrypt', label: '3. Zero-Trust AES', desc: 'Client-side file encryption and Shamir sharding.' },
    { id: 'consensus', label: '4. Consensus Pinned', desc: 'Uploading chunks to the decentralized IPFS swarm.' }
  ]

  useEffect(() => {
    if (!isPlaying) return

    const interval = setInterval(() => {
      setCurrentStep((prev) => {
        if (prev === 'connect') return 'nominee'
        if (prev === 'nominee') return 'encrypt'
        if (prev === 'encrypt') return 'consensus'
        return 'connect'
      })
    }, 4500)

    return () => clearInterval(interval)
  }, [isPlaying])

  const handleRestart = () => {
    setCurrentStep('connect')
    setIsPlaying(true)
  }

  return (
    <div className="w-full bg-slate-900 border border-slate-800 rounded-[2rem] overflow-hidden shadow-2xl relative">
      {/* Title Bar */}
      <div className="bg-slate-950/80 px-6 py-4 flex items-center justify-between border-b border-slate-900">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500" />
          <div className="w-3 h-3 rounded-full bg-yellow-500" />
          <div className="w-3 h-3 rounded-full bg-green-500" />
          <span className="text-[10px] text-slate-500 font-mono ml-4">https://alwaysthere.io/sandbox-walkthrough</span>
        </div>
        <div className="flex items-center gap-4">
          {!isPlaying ? (
            <button 
              onClick={() => setIsPlaying(true)}
              className="px-4 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-black uppercase tracking-wider flex items-center gap-1.5 transition-all shadow-lg shadow-blue-500/20"
            >
              <Play className="w-3 h-3 fill-current" /> Play Walkthrough
            </button>
          ) : (
            <button 
              onClick={handleRestart}
              className="px-4 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-black uppercase tracking-wider flex items-center gap-1.5 transition-all"
            >
              <RotateCcw className="w-3.5 h-3.5" /> Restart
            </button>
          )}
        </div>
      </div>

      {/* Simulator Grid */}
      <div className="grid md:grid-cols-3 min-h-[420px]">
        {/* Step Selector Panel */}
        <div className="bg-slate-950 p-6 border-r border-slate-900 flex flex-col justify-between">
          <div className="space-y-4">
            <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-500">Walkthrough Progress</h4>
            <div className="space-y-2">
              {steps.map((s) => {
                const isActive = currentStep === s.id
                return (
                  <button
                    key={s.id}
                    onClick={() => {
                      setCurrentStep(s.id)
                      setIsPlaying(false) // Pause auto-play on user selection
                    }}
                    className={`w-full text-left p-3.5 rounded-xl border transition-all ${
                      isActive 
                        ? 'bg-blue-600/10 border-blue-500/30 text-white' 
                        : 'border-transparent text-slate-500 hover:text-slate-300'
                    }`}
                  >
                    <div className="text-xs font-bold uppercase tracking-wider">{s.label}</div>
                    <div className="text-[10px] opacity-70 mt-1 leading-normal font-medium">{s.desc}</div>
                  </button>
                )
              })}
            </div>
          </div>
          
          <div className="pt-6 border-t border-slate-900">
            <div className="text-[9px] font-bold uppercase tracking-wider text-slate-600">Zero-Trust Protocol Status</div>
            <div className="flex items-center gap-2 mt-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-[10px] font-mono text-emerald-400">Consensus Engine Active</span>
            </div>
          </div>
        </div>

        {/* Dynamic Display Screen */}
        <div className="col-span-2 bg-[#080b11] p-8 flex flex-col justify-between relative overflow-hidden min-h-[360px]">
          
          {/* Inside Simulator - Background Glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-blue-500/10 rounded-full blur-[100px] pointer-events-none" />

          {/* Interactive Screen States */}
          <div className="flex-1 flex flex-col justify-center items-center relative z-10 w-full">
            <AnimatePresence mode="wait">
              {currentStep === 'connect' && (
                <motion.div 
                  key="connect-state"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="w-full max-w-sm text-center space-y-6"
                >
                  <div className="w-16 h-16 rounded-3xl bg-blue-600/20 border border-blue-500/30 flex items-center justify-center mx-auto">
                    <Shield className="w-8 h-8 text-blue-500" />
                  </div>
                  <div>
                    <h5 className="text-sm font-bold text-white uppercase tracking-wider">One-Click Sandbox Demo</h5>
                    <p className="text-[11px] text-slate-400 mt-2 max-w-xs mx-auto leading-relaxed">
                      Click the sandbox CTA to bypass web3 wallet prompts and generate ephemeral keyrings.
                    </p>
                  </div>
                  
                  {/* Mock Button Click Simulation */}
                  <div className="relative inline-block mx-auto">
                    <div className="px-6 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 text-white text-xs font-black uppercase tracking-widest shadow-lg shadow-purple-600/20 border border-purple-500/20">
                      Try Sandbox Demo
                    </div>
                    {/* Simulated cursor */}
                    <motion.div 
                      animate={{ x: [40, 0, 0], y: [40, 0, 0], scale: [1, 1, 0.9, 1] }}
                      transition={{ repeat: Infinity, duration: 2.5, repeatDelay: 1 }}
                      className="absolute -bottom-2 -right-2 pointer-events-none"
                    >
                      <svg className="w-6 h-6 text-white drop-shadow" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M4.5 2v17.5l5.3-5.3 4.2 8.3 2.5-1.3-4.2-8.3h6.7L4.5 2z" />
                      </svg>
                    </motion.div>
                  </div>
                </motion.div>
              )}

              {currentStep === 'nominee' && (
                <motion.div 
                  key="nominee-state"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="w-full max-w-md space-y-4"
                >
                  <div className="flex items-center justify-between">
                    <h5 className="text-xs font-black uppercase tracking-wider text-slate-400">Nominee Directory</h5>
                    <span className="text-[9px] font-mono bg-blue-600/20 text-blue-400 px-2 py-0.5 rounded">Active Vault</span>
                  </div>
                  
                  {/* Mock Nominee Adding Animation */}
                  <div className="space-y-2 bg-slate-950/60 border border-slate-900 rounded-2xl p-4">
                    {/* Row 1 */}
                    <div className="flex items-center justify-between p-3 bg-slate-900/40 border border-slate-900 rounded-xl">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-xs font-bold text-slate-300">SC</div>
                        <div>
                          <div className="text-[11px] font-bold text-white">Sarah Connor</div>
                          <div className="text-[9px] text-slate-500 font-mono">0x71C...392b</div>
                        </div>
                      </div>
                      <span className="text-[8px] font-black uppercase tracking-wider text-emerald-500 px-2 py-0.5 bg-emerald-500/10 border border-emerald-500/20 rounded">Keys Held</span>
                    </div>

                    {/* Row 2 (Typing/Adding simulation) */}
                    <motion.div 
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 1 }}
                      className="flex items-center justify-between p-3 bg-blue-600/5 border border-blue-500/20 rounded-xl"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center text-xs font-bold text-blue-400">JC</div>
                        <div>
                          <motion.div 
                            initial={{ width: 0 }}
                            animate={{ width: '100px' }}
                            transition={{ duration: 1.5, delay: 1.5 }}
                            className="text-[11px] font-bold text-white overflow-hidden whitespace-nowrap"
                          >
                            John Connor
                          </motion.div>
                          <div className="text-[9px] text-slate-500 font-mono">0x84A...829c</div>
                        </div>
                      </div>
                      <span className="text-[8px] font-black uppercase tracking-wider text-yellow-500 px-2 py-0.5 bg-yellow-500/10 border border-yellow-500/20 rounded animate-pulse">Syncing...</span>
                    </motion.div>
                  </div>
                </motion.div>
              )}

              {currentStep === 'encrypt' && (
                <motion.div 
                  key="encrypt-state"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="w-full max-w-sm text-center space-y-6"
                >
                  <div className="text-xs font-black uppercase tracking-wider text-slate-400">Client-Side Shamir Splitting</div>
                  
                  {/* Animated Key Split */}
                  <div className="relative h-28 flex items-center justify-center">
                    
                    {/* Ephemeral Key */}
                    <motion.div 
                      animate={{ 
                        scale: [1, 0.8, 0], 
                        opacity: [1, 1, 0],
                        y: [0, 0, 0] 
                      }}
                      transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                      className="absolute z-20 w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center shadow-lg border border-blue-500"
                    >
                      <Key className="w-5 h-5 text-white" />
                    </motion.div>

                    {/* Split Shards */}
                    {[...Array(5)].map((_, idx) => {
                      const angle = (idx * 2 * Math.PI) / 5
                      const radius = 55
                      const x = Math.cos(angle) * radius
                      const y = Math.sin(angle) * radius

                      return (
                        <motion.div
                          key={idx}
                          animate={{ 
                            x: [0, x], 
                            y: [0, y], 
                            scale: [0, 1], 
                            opacity: [0, 1] 
                          }}
                          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                          className="absolute w-8 h-8 rounded-lg bg-purple-600/20 border border-purple-500/40 flex items-center justify-center shadow-inner"
                        >
                          <Layers className="w-4 h-4 text-purple-400" />
                        </motion.div>
                      )
                    })}
                  </div>

                  <div className="text-[10px] font-mono text-slate-400 max-w-xs mx-auto leading-relaxed">
                    Symmetric AES-256 Key is shattered into 5 shares. Key is deleted from local memory forever.
                  </div>
                </motion.div>
              )}

              {currentStep === 'consensus' && (
                <motion.div 
                  key="consensus-state"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="w-full max-w-md space-y-4"
                >
                  <div className="flex items-center justify-between">
                    <h5 className="text-xs font-black uppercase tracking-wider text-slate-400">Decentralized consensus</h5>
                    <span className="text-[8px] font-bold text-emerald-400 uppercase tracking-widest px-2 py-0.5 bg-emerald-500/10 border border-emerald-500/20 rounded">Consensus Reached</span>
                  </div>

                  {/* Cloud Consensus Map */}
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      { name: 'Storacha US-East', delay: 0.5 },
                      { name: 'IPFS Paris Gateway', delay: 1.0 },
                      { name: 'Arweave Node Permanent', delay: 1.5 },
                      { name: 'Filecoin Provider SG', delay: 2.0 }
                    ].map((node, i) => (
                      <motion.div 
                        key={i}
                        initial={{ opacity: 0.3, borderColor: 'rgba(255,255,255,0.05)' }}
                        animate={{ opacity: 1, borderColor: '#10b981', background: 'rgba(16,185,129,0.05)' }}
                        transition={{ delay: node.delay, duration: 0.6 }}
                        className="p-3.5 border rounded-xl flex items-center gap-2.5"
                      >
                        <Server className="w-4 h-4 text-emerald-500" />
                        <div className="text-left">
                          <div className="text-[10px] font-bold text-white">{node.name}</div>
                          <div className="text-[8px] text-emerald-400/80 font-mono">Pinned & Confirmed</div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Bottom Alert Message */}
          <div className="text-center pt-4 border-t border-slate-900 relative z-10">
            <span className="text-[9px] font-bold uppercase tracking-widest text-slate-500">
              {currentStep === 'connect' && 'Bypasses backend wallet signers entirely.'}
              {currentStep === 'nominee' && 'Ensures immediate recoverability upon expiry triggers.'}
              {currentStep === 'encrypt' && 'Only the AES ciphertext is sent over IPFS.'}
              {currentStep === 'consensus' && 'No single point of storage failure possible.'}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
