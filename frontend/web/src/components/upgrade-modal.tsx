'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Crown, Shield, Zap, CheckCircle2, ArrowRight, Wallet, CreditCard } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js"

import { Portal } from '@/components/portal'

interface UpgradeModalProps {
  isOpen: boolean
  onClose: () => void
  onUpgrade: (method: 'PAYPAL' | 'CRYPTO', reference?: string) => void
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
  const [method, setMethod] = useState<'PAYPAL' | 'CRYPTO' | null>(null)

  const handlePayment = () => {
    if (!method) {
        toast.error("Please select a payment method")
        return
    }
    onUpgrade(method)
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <Portal>
          <div className="fixed inset-0 z-[100] flex items-start justify-center p-4 overflow-y-auto">
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
              className="relative w-full max-w-lg overflow-hidden rounded-3xl border border-white/10 bg-slate-900 shadow-2xl shadow-blue-500/10 my-8 md:my-16"
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
                    Premium Guardian Tier
                  </div>
                </div>
              </div>

              <p className="text-slate-400 mb-8 leading-relaxed">
                {description}
              </p>

              <div className="space-y-4 mb-8">
                <FeatureItem 
                  icon={<Shield className="text-blue-400" size={18} />}
                  text="Decentralized IPFS Web3 Storage (5GB)"
                />
                <FeatureItem 
                  icon={<CheckCircle2 className="text-emerald-400" size={18} />}
                  text="Fail-Safe AlwaysThere Asset Release"
                />
              </div>

              <div className="grid grid-cols-2 gap-4 mb-8">
                <button
                    onClick={() => setMethod('PAYPAL')}
                    className={`flex flex-col items-center justify-center p-4 rounded-2xl border transition-all ${
                        method === 'PAYPAL' 
                        ? 'bg-blue-500/10 border-blue-500 shadow-lg shadow-blue-500/10' 
                        : 'bg-white/5 border-white/10 hover:border-white/20'
                    }`}
                >
                    <CreditCard className={method === 'PAYPAL' ? 'text-blue-400' : 'text-slate-400'} size={24} />
                    <span className={`text-xs font-bold mt-2 ${method === 'PAYPAL' ? 'text-white' : 'text-slate-400'}`}>PayPal</span>
                </button>
                <button
                    onClick={() => setMethod('CRYPTO')}
                    className={`flex flex-col items-center justify-center p-4 rounded-2xl border transition-all ${
                        method === 'CRYPTO' 
                        ? 'bg-purple-500/10 border-purple-500 shadow-lg shadow-purple-500/10' 
                        : 'bg-white/5 border-white/10 hover:border-white/20'
                    }`}
                >
                    <Wallet className={method === 'CRYPTO' ? 'text-purple-400' : 'text-slate-400'} size={24} />
                    <span className={`text-xs font-bold mt-2 ${method === 'CRYPTO' ? 'text-white' : 'text-slate-400'}`}>Crypto (ETH/USDT)</span>
                </button>
              </div>

              <div className="flex flex-col gap-3">
                {method === 'PAYPAL' ? (
                  <PayPalScriptProvider options={{ 
                      clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID || "test",
                      currency: "USD",
                      intent: "capture"
                  }}>
                      <PayPalButtons
                          style={{ layout: "vertical", color: "blue", shape: "rect", label: "pay" }}
                          createOrder={(data, actions) => {
                              return actions.order.create({
                                  intent: "CAPTURE",
                                  purchase_units: [{
                                      description: "AlwaysThere Vault - Premium Vault",
                                      amount: { currency_code: "USD", value: "49.99" }
                                  }]
                              });
                          }}
                          onApprove={async (data, actions) => {
                              if (!actions.order) return;
                              const details = await actions.order.capture();
                              onUpgrade('PAYPAL', data.orderID);
                          }}
                          onError={(err) => {
                              console.error("PayPal Error:", err);
                              toast.error("PayPal transaction failed or was cancelled.");
                          }}
                      />
                  </PayPalScriptProvider>
                ) : (
                  <Button 
                    onClick={handlePayment}
                    className="w-full h-12 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-bold rounded-xl shadow-lg shadow-blue-500/25 group transition-all duration-300 transform hover:scale-[1.02]"
                  >
                    Confirm & Pay $49.99 (Crypto)
                    <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                )}
                
                <button 
                  onClick={onClose}
                  className="w-full h-12 text-slate-400 hover:text-slate-200 text-sm font-medium transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>

            {/* Bottom Glow */}
            <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-24 -right-24 w-48 h-48 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />
            </motion.div>
          </div>
        </Portal>
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
