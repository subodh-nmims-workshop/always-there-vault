'use client'

import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Crown, Shield, Zap, CheckCircle2, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface UpgradeModalProps {
  isOpen: boolean
  onClose: () => void
  onUpgrade: () => void
  title?: string
  description?: string
}

export function UpgradeModal({ 
  isOpen, 
  onClose, 
  onUpgrade,
  title = "Unlock Premium Security",
  description = "Web3 storage and advanced vault features are reserved for our premium guardians."
}: UpgradeModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-slate-950/60 backdrop-blur-sm"
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative w-full max-w-lg overflow-hidden rounded-3xl border border-white/10 bg-slate-900 shadow-2xl shadow-blue-500/10"
          >
            {/* Header Gradient */}
            <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-br from-blue-600/20 to-purple-600/20 pointer-events-none" />
            
            <button 
              onClick={onClose}
              className="absolute top-4 right-4 p-2 rounded-full bg-white/5 text-slate-400 hover:text-white hover:bg-white/10 transition-colors z-10"
            >
              <X size={20} />
            </button>

            <div className="relative p-8 pt-10">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-lg shadow-blue-500/20">
                  <Crown className="text-white" size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white tracking-tight">{title}</h3>
                  <div className="inline-flex items-center px-2 py-0.5 mt-1 rounded-md bg-blue-500/10 border border-blue-500/20 text-[10px] font-bold text-blue-400 uppercase tracking-wider">
                    Premium Feature
                  </div>
                </div>
              </div>

              <p className="text-slate-400 mb-8 leading-relaxed">
                {description}
              </p>

              <div className="space-y-4 mb-8">
                <FeatureItem 
                  icon={<Shield className="text-blue-400" size={18} />}
                  text="Decentralized IPFS Web3 Storage"
                />
                <FeatureItem 
                  icon={<Zap className="text-purple-400" size={18} />}
                  text="Zero-Knowledge Identity Protection"
                />
                <FeatureItem 
                  icon={<CheckCircle2 className="text-emerald-400" size={18} />}
                  text="Unlimited Nominees & Beneficiaries"
                />
              </div>

              <div className="flex flex-col gap-3">
                <Button 
                  onClick={onUpgrade}
                  className="w-full h-12 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-bold rounded-xl shadow-lg shadow-blue-500/25 group transition-all duration-300 transform hover:scale-[1.02]"
                >
                  Upgrade Now
                  <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Button>
                <button 
                  onClick={onClose}
                  className="w-full h-12 text-slate-400 hover:text-slate-200 text-sm font-medium transition-colors"
                >
                  Maybe Later
                </button>
              </div>
            </div>

            {/* Bottom Glow */}
            <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-24 -right-24 w-48 h-48 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}

function FeatureItem({ icon, text }: { icon: React.ReactNode, text: string }) {
  return (
    <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/5">
      <div className="flex-shrink-0">
        {icon}
      </div>
      <span className="text-sm font-medium text-slate-300">{text}</span>
    </div>
  )
}
