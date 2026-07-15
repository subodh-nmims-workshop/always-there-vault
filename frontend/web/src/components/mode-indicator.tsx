'use client'

import { Server, Network, ChevronDown, Check, ExternalLink, ShieldCheck, Zap } from 'lucide-react'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import ModeService from '@/lib/mode-service'
import { useSubscription } from '@/contexts/SubscriptionContext'
import { useRouter } from 'next/navigation'

export function ModeIndicator({ compact = false }: { compact?: boolean }) {
  const [isOpen, setIsOpen] = useState(false)
  const [isSwitching, setIsSwitching] = useState(false)
  const [switchMessage, setSwitchMessage] = useState('')
  const router = useRouter()
  const modeService = ModeService.getInstance()
  const { subscription, switchMode } = useSubscription()
  const currentMode = subscription?.mode || 'centralized'

  const handleModeSwitch = async (newMode: 'centralized' | 'decentralized') => {
    if (newMode === currentMode || isSwitching) return

    console.log(`🔄 Switching from ${currentMode} to ${newMode}`)
    setIsSwitching(true)
    setSwitchMessage(`Initiating ${newMode} synchronization...`)

    try {
      await modeService.switchMode(newMode, setSwitchMessage)
      await switchMode(newMode)
      console.log(`✅ Mode switched successfully to ${newMode}`)

      setSwitchMessage('Switch Complete! Reloading Interface...')
      setTimeout(() => {
        window.location.reload()
      }, 1000)
    } catch (error: any) {
      console.error('❌ Failed to switch mode:', error)
      setSwitchMessage(`Access Denied: ${error.message}`)
      setTimeout(() => {
        setIsSwitching(false)
        setSwitchMessage('')
      }, 4000)
    }
  }

  const handlePricingClick = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsOpen(false)
    router.push('/pricing')
  }

  const isCentralized = currentMode === 'centralized'

  return (
    <div className={`relative z-[100] ${compact ? 'w-full' : ''}`}>
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center justify-between w-full ${compact ? 'px-4 py-3 rounded-xl' : 'px-2 py-2 sm:px-5 sm:py-3 rounded-xl sm:rounded-2xl'} transition-all duration-300 group border box-border ${isCentralized
          ? 'bg-white dark:bg-[#0f172a]/80 border-blue-500/20 dark:border-blue-500/30 hover:bg-slate-50 dark:hover:bg-[#1e293b]/90 hover:border-blue-500/40 dark:hover:border-blue-400/50 hover:shadow-[0_4px_20px_rgba(59,130,246,0.08)] dark:hover:shadow-[0_0_25px_rgba(59,130,246,0.3)]'
          : 'bg-white dark:bg-[#0f172a]/80 border-purple-500/20 dark:border-purple-500/30 hover:bg-slate-50 dark:hover:bg-[#1e293b]/90 hover:border-purple-500/40 dark:hover:border-purple-400/50 hover:shadow-[0_4px_20px_rgba(168,85,247,0.08)] dark:hover:shadow-[0_0_25px_rgba(168,85,247,0.3)]'
          } backdrop-blur-xl relative overflow-hidden`}
      >
        {/* Subtle animated background gradient */}
        <div className={`absolute inset-0 opacity-10 dark:opacity-20 transition-opacity duration-500 group-hover:opacity-20 dark:group-hover:opacity-40 bg-gradient-to-r ${isCentralized ? 'from-blue-600/30 to-cyan-500/30' : 'from-purple-600/30 to-fuchsia-500/30'
          }`} />

        <div className="relative flex items-center gap-2 sm:gap-3 z-10">
          <motion.div
            layoutId="mode-icon-container"
            className={`${compact ? 'w-8 h-8' : 'w-8 h-8 sm:w-12 sm:h-12'} rounded-xl flex items-center justify-center border shadow-inner ${isCentralized
              ? 'bg-blue-50 dark:bg-blue-500/20 border-blue-200 dark:border-blue-400/30 text-blue-600 dark:text-blue-400 shadow-blue-500/10'
              : 'bg-purple-50 dark:bg-purple-500/20 border-purple-200 dark:border-purple-400/30 text-purple-600 dark:text-purple-400 shadow-purple-500/10'
              }`}
          >
            {isCentralized ? <Server className={compact ? "w-4 h-4" : "w-4 h-4 sm:w-6 sm:h-6"} /> : <Network className={compact ? "w-4 h-4" : "w-4 h-4 sm:w-6 sm:h-6"} />}
          </motion.div>

          <div className={`text-left ${compact ? '' : 'hidden md:block'}`}>
            {!compact && (
              <>
                <div className="hidden sm:flex items-center gap-2 mb-0.5">
                  <p className="text-[10px] uppercase tracking-widest text-slate-500 dark:text-slate-400 font-bold">Storage Tier</p>
                  <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold uppercase border backdrop-blur-md flex items-center gap-1 ${isCentralized
                    ? 'bg-blue-500/10 text-blue-600 dark:text-blue-300 border-blue-500/20'
                    : 'bg-purple-500/10 text-purple-600 dark:text-purple-300 border-purple-500/20'
                    }`}>
                    <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" />
                    Active
                  </span>
                </div>
                <p className="text-[9px] uppercase tracking-tighter text-slate-500 font-bold mb-0.5 sm:hidden">Storage</p>
              </>
            )}
            {compact && (
              <p className="text-[9px] uppercase tracking-tighter text-slate-500 font-black mb-0.5">Node Status</p>
            )}
            <p className={`${compact ? 'text-sm' : 'text-xs sm:text-lg'} font-black text-slate-900 dark:text-white tracking-wide capitalize`}>
              {currentMode}
            </p>
          </div>
        </div>
        <motion.div animate={{ rotate: isOpen ? 180 : 0 }} transition={{ type: "spring", stiffness: 300, damping: 20 }} className={compact ? "" : "hidden md:block"}>
          <ChevronDown className={`${compact ? 'w-4 h-4' : 'w-4 h-4 sm:w-5 sm:h-5'} relative z-10 transition-colors ${isCentralized ? 'text-blue-500 group-hover:text-blue-600 dark:text-blue-400 dark:group-hover:text-blue-300' : 'text-purple-500 group-hover:text-purple-600 dark:text-purple-400 dark:group-hover:text-purple-300'}`} />
        </motion.div>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[110]"
              onClick={() => setIsOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: compact ? 0 : -15, x: compact ? -15 : 0, transformOrigin: compact ? 'left center' : 'top right' }}
              animate={{ opacity: 1, scale: 1, y: 0, x: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: compact ? 0 : -10, x: compact ? -10 : 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 350 }}
              className={`absolute ${compact ? 'left-[calc(100%+16px)] top-1/2 -translate-y-1/2' : 'fixed sm:absolute right-4 sm:right-0 top-[76px] sm:top-[calc(100%+12px)]'} w-[calc(100vw-32px)] sm:w-[420px] max-w-[420px] bg-white/95 dark:bg-[#050914]/95 backdrop-blur-2xl border border-slate-200 dark:border-white/10 rounded-[2rem] shadow-[0_20px_50px_rgba(0,0,0,0.1)] dark:shadow-[0_40px_100px_rgba(0,0,0,0.8)] overflow-hidden z-[120] ring-1 ring-black/5 dark:ring-white/5`}
            >
              <div className="absolute inset-0 bg-gradient-to-b from-slate-500/[0.02] dark:from-white/[0.03] to-transparent pointer-events-none" />
              <div className="absolute top-0 right-0 w-48 h-48 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />

              <div className="p-5 border-b border-slate-100 dark:border-white/10 relative">
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-1.5 flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_12px_rgba(16,185,129,0.5)]"></div>
                  Storage Architecture
                </h3>
                <p className="text-sm text-slate-550 dark:text-slate-400 font-medium">Configure how your data and keys are secured</p>
              </div>

              <div className="p-4 space-y-3 relative">
                {/* Centralized Option */}
                <motion.button
                  whileHover={{ scale: isCentralized ? 1 : 1.01 }}
                  whileTap={{ scale: isCentralized ? 1 : 0.98 }}
                  onClick={() => handleModeSwitch('centralized')}
                  disabled={isSwitching}
                  className={`w-full text-left p-4 rounded-2xl transition-all duration-300 relative overflow-hidden flex flex-col gap-3 group border-2 ${isCentralized
                    ? 'bg-blue-50/50 dark:bg-blue-950/10 border-blue-500 shadow-[0_8px_30px_rgba(59,130,246,0.08)] dark:shadow-[0_0_30px_rgba(59,130,246,0.15)]'
                    : 'bg-slate-50/50 dark:bg-white/[0.02] border-transparent hover:bg-slate-100/50 dark:hover:bg-white/[0.04] hover:border-slate-200 dark:hover:border-white/10'
                    }`}
                >
                  <div className="flex items-start justify-between w-full">
                    <div className="flex items-center gap-4">
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-500 ${isCentralized
                        ? 'bg-blue-500/10 dark:bg-blue-500/20 border border-blue-500/20 dark:border-blue-400/50 text-blue-600 dark:text-blue-400 shadow-blue-500/10 dark:shadow-[0_0_15px_rgba(59,130,246,0.3)]'
                        : 'bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-500 dark:text-slate-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 group-hover:bg-blue-500/10 group-hover:border-blue-500/30'
                        }`}>
                        <Server className="w-6 h-6" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className={`font-bold text-lg leading-none ${isCentralized ? 'text-slate-900 dark:text-white' : 'text-slate-700 dark:text-slate-300 group-hover:text-slate-950 dark:group-hover:text-white transition-colors'}`}>
                            Cloud Vault
                          </span>
                          {isCentralized && (
                            <span className="px-2 py-0.5 rounded text-[9px] font-black tracking-wider uppercase bg-blue-500/10 dark:bg-blue-500/20 text-blue-600 dark:text-blue-300 border border-blue-500/20 dark:border-blue-500/30">
                              Current
                            </span>
                          )}
                        </div>
                        <p className={`text-xs font-medium ${isCentralized ? 'text-blue-600/80 dark:text-blue-300/75' : 'text-slate-550 group-hover:text-slate-650 dark:group-hover:text-slate-450 transition-colors'}`}>
                          Managed Security • Fast Recovery
                        </p>
                      </div>
                    </div>
                    {isCentralized ? (
                      <div className="w-6 h-6 rounded-full bg-blue-500 dark:bg-blue-500/20 flex items-center justify-center border border-blue-500 dark:border-blue-500/40 shadow-[0_2px_8px_rgba(59,130,246,0.2)]">
                        <Check className="w-3.5 h-3.5 text-white dark:text-blue-400" strokeWidth={3.5} />
                      </div>
                    ) : (
                      <div className="w-6 h-6 rounded-full border-2 border-slate-300 dark:border-slate-700 group-hover:border-blue-500/50 transition-colors" />
                    )}
                  </div>

                  <div className="flex flex-wrap gap-2 mt-1">
                    {[
                      { l: 'Auto Backup', i: <ShieldCheck className="w-3 h-3" /> },
                      { l: 'Instant Restore', i: <Zap className="w-3 h-3" /> }
                    ].map((feature, idx) => (
                      <span key={idx} className={`flex items-center gap-1.5 text-[11px] px-2.5 py-1 rounded-lg font-semibold ${isCentralized
                        ? 'bg-blue-500/10 text-blue-600 dark:text-blue-300 border border-blue-500/20'
                        : 'bg-slate-100 dark:bg-white/[0.03] text-slate-550 dark:text-slate-400 border border-slate-200 dark:border-white/5 group-hover:border-slate-300 dark:group-hover:border-white/10'
                        }`}>
                        {feature.i}
                        {feature.l}
                      </span>
                    ))}
                  </div>
                </motion.button>

                {/* Decentralized Option */}
                <motion.button
                  whileHover={{ scale: !isCentralized ? 1 : 1.01 }}
                  whileTap={{ scale: !isCentralized ? 1 : 0.98 }}
                  onClick={() => handleModeSwitch('decentralized')}
                  disabled={isSwitching}
                  className={`w-full text-left p-4 rounded-2xl transition-all duration-300 relative overflow-hidden flex flex-col gap-3 group border-2 ${!isCentralized
                    ? 'bg-purple-50/50 dark:bg-purple-950/10 border-purple-500 shadow-[0_8px_30px_rgba(168,85,247,0.08)] dark:shadow-[0_0_30px_rgba(168,85,247,0.15)]'
                    : 'bg-slate-50/50 dark:bg-white/[0.02] border-transparent hover:bg-slate-100/50 dark:hover:bg-white/[0.04] hover:border-slate-200 dark:hover:border-white/10'
                    }`}
                >
                  <div className="flex items-start justify-between w-full">
                    <div className="flex items-center gap-4">
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-500 ${!isCentralized
                        ? 'bg-purple-500/10 dark:bg-purple-500/20 border border-purple-500/20 dark:border-purple-400/50 text-purple-600 dark:text-purple-400 shadow-purple-500/10 dark:shadow-[0_0_15px_rgba(168,85,247,0.3)]'
                        : 'bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-500 dark:text-slate-400 group-hover:text-purple-600 dark:group-hover:text-purple-400 group-hover:bg-purple-500/10 group-hover:border-purple-500/30'
                        }`}>
                        <Network className="w-6 h-6" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className={`font-bold text-lg leading-none ${!isCentralized ? 'text-slate-900 dark:text-white' : 'text-slate-700 dark:text-slate-300 group-hover:text-slate-950 dark:group-hover:text-white transition-colors'}`}>
                            Web3 Vault
                          </span>
                          {!isCentralized && (
                            <span className="px-2 py-0.5 rounded text-[9px] font-black tracking-wider uppercase bg-purple-500/10 dark:bg-purple-500/20 text-purple-600 dark:text-purple-300 border border-purple-500/20 dark:border-purple-500/30">
                              Current
                            </span>
                          )}
                        </div>
                        <p className={`text-xs font-medium ${!isCentralized ? 'text-purple-600/80 dark:text-purple-300/75' : 'text-slate-550 group-hover:text-slate-655 dark:group-hover:text-slate-455 transition-colors'}`}>
                          Self-Custodial • Smart Contract
                        </p>
                      </div>
                    </div>
                    {!isCentralized ? (
                      <div className="w-6 h-6 rounded-full bg-purple-500 dark:bg-purple-500/20 flex items-center justify-center border border-purple-500 dark:border-purple-500/40 shadow-[0_2px_8px_rgba(168,85,247,0.2)]">
                        <Check className="w-3.5 h-3.5 text-white dark:text-purple-400" strokeWidth={3.5} />
                      </div>
                    ) : (
                      <div className="w-6 h-6 rounded-full border-2 border-slate-300 dark:border-slate-700 group-hover:border-purple-500/50 transition-colors" />
                    )}
                  </div>

                  <div className="flex flex-wrap gap-2 mt-1">
                    {[
                      { l: 'Zero-Knowledge', i: <ShieldCheck className="w-3 h-3" /> },
                      { l: 'True Ownership', i: <Zap className="w-3 h-3" /> }
                    ].map((feature, idx) => (
                      <span key={idx} className={`flex items-center gap-1.5 text-[11px] px-2.5 py-1 rounded-lg font-semibold ${!isCentralized
                        ? 'bg-purple-500/10 text-purple-600 dark:text-purple-300 border border-purple-500/20'
                        : 'bg-slate-100 dark:bg-white/[0.03] text-slate-550 dark:text-slate-400 border border-slate-200 dark:border-white/5 group-hover:border-slate-300 dark:group-hover:border-white/10'
                        }`}>
                        {feature.i}
                        {feature.l}
                      </span>
                    ))}
                  </div>
                </motion.button>
              </div>

              {/* Status footer for switching */}
              <AnimatePresence>
                {isSwitching && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="px-4 py-3 bg-slate-50 dark:bg-[#111827] border-t border-slate-100 dark:border-white/5 overflow-hidden"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-4 h-4 border-2 border-blue-500/30 border-t-blue-500 rounded-full animate-spin flex-shrink-0" />
                      <motion.span
                        key={switchMessage}
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-xs font-semibold text-blue-600 dark:text-blue-200/90 leading-tight"
                      >
                        {switchMessage}
                      </motion.span>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="p-4 bg-slate-50/85 dark:bg-[#0a0f1d] border-t border-slate-150 dark:border-white/10 group/link cursor-pointer hover:bg-slate-100/70 dark:hover:bg-[#0c1325] transition-colors" onClick={handlePricingClick}>
                <div className="flex items-center justify-between text-sm">
                  <span className="font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 group-hover/link:from-blue-500 group-hover/link:to-purple-500 transition-all">
                    Upgrade to Enterprise Tier
                  </span>
                  <ExternalLink className="w-4 h-4 text-slate-500 dark:text-slate-400 group-hover/link:text-slate-800 dark:group-hover/link:text-white transition-colors group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}
