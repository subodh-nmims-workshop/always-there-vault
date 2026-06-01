'use client'

import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, AlertTriangle, Info } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface ConfirmModalProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
  title: string
  description: string
  confirmText?: string
  cancelText?: string
  variant?: 'danger' | 'info' | 'warning'
  requiresVerification?: boolean
  verificationText?: string
}

export function ConfirmModal({
  isOpen,
  onClose,
  onConfirm,
  title,
  description,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  variant = 'info',
  requiresVerification = false,
  verificationText = 'cancel renewal'
}: ConfirmModalProps) {
  const [userInput, setUserInput] = React.useState('')

  React.useEffect(() => {
    if (!isOpen) {
      setUserInput('')
    }
  }, [isOpen])

  const getIcon = () => {
    switch (variant) {
      case 'danger':
        return <AlertTriangle className="text-red-500" size={24} />
      case 'warning':
        return <AlertTriangle className="text-amber-500" size={24} />
      default:
        return <Info className="text-blue-500" size={24} />
    }
  }

  const getHeaderGradient = () => {
    switch (variant) {
      case 'danger':
        return 'from-red-500/10 to-transparent'
      case 'warning':
        return 'from-amber-500/10 to-transparent'
      default:
        return 'from-blue-500/10 to-transparent'
    }
  }

  const getConfirmButtonStyles = () => {
    switch (variant) {
      case 'danger':
        return 'bg-red-600 hover:bg-red-500 text-white shadow-lg shadow-red-500/20'
      case 'warning':
        return 'bg-amber-600 hover:bg-amber-500 text-white shadow-lg shadow-amber-500/20'
      default:
        return 'bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-500/20'
    }
  }

  const isConfirmedDisabled = requiresVerification && userInput.trim().toLowerCase() !== verificationText.trim().toLowerCase()

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-slate-950/60 backdrop-blur-sm"
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            className="relative w-full max-w-md overflow-hidden rounded-3xl border border-slate-200 dark:border-white/10 bg-white dark:bg-slate-900 shadow-2xl p-6 md:p-8"
          >
            {/* Header Gradient */}
            <div className={`absolute top-0 left-0 right-0 h-24 bg-gradient-to-b ${getHeaderGradient()} pointer-events-none`} />
            
            <button 
              onClick={onClose}
              className="absolute top-4 right-4 p-2 rounded-full bg-slate-100 hover:bg-slate-200 dark:bg-white/5 text-slate-400 hover:text-slate-800 dark:hover:text-white dark:hover:bg-white/10 transition-colors z-10"
            >
              <X size={16} />
            </button>

            <div className="relative">
              <div className="flex items-center gap-4 mb-4">
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center bg-slate-100 dark:bg-white/5`}>
                  {getIcon()}
                </div>
                <div>
                  <h3 className="text-lg font-black text-slate-900 dark:text-white tracking-tight">{title}</h3>
                </div>
              </div>

              <p className="text-sm text-slate-500 dark:text-slate-400 mb-6 leading-relaxed">
                {description}
              </p>

              {requiresVerification && (
                <div className="mb-6">
                  <p className="text-xs text-slate-500 dark:text-slate-400 mb-2 font-medium">
                    To confirm, please type <span className="font-mono font-bold text-red-500 dark:text-red-400 bg-red-500/5 dark:bg-red-500/10 px-1.5 py-0.5 rounded">"{verificationText}"</span> below:
                  </p>
                  <input
                    type="text"
                    value={userInput}
                    onChange={(e) => setUserInput(e.target.value)}
                    placeholder={`Type "${verificationText}"`}
                    className="w-full h-11 px-4 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/[0.02] text-sm text-slate-850 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500/50 transition-all font-mono"
                  />
                </div>
              )}

              <div className="flex flex-col sm:flex-row gap-3">
                <Button 
                  onClick={onClose}
                  variant="outline"
                  className="w-full sm:order-1 bg-slate-50 hover:bg-slate-100 dark:bg-white/5 dark:hover:bg-white/10 text-slate-750 dark:text-slate-300 border-slate-200 dark:border-white/5 rounded-xl font-bold h-11"
                >
                  {cancelText}
                </Button>
                <Button 
                  onClick={onConfirm}
                  disabled={isConfirmedDisabled}
                  className={`w-full sm:order-2 rounded-xl font-bold h-11 transition-all duration-300 transform active:scale-95 ${getConfirmButtonStyles()} disabled:opacity-50 disabled:cursor-not-allowed`}
                >
                  {confirmText}
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
