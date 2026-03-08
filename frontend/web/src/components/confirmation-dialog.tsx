'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { AlertTriangle, X } from 'lucide-react'
import { useEffect } from 'react'

interface ConfirmationDialogProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
  title: string
  message: string
  confirmText?: string
  cancelText?: string
  type?: 'danger' | 'warning' | 'info'
}

export function ConfirmationDialog({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  type = 'danger'
}: ConfirmationDialogProps) {
  
  // Prevent body scroll when dialog is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  // Handle ESC key
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose()
      }
    }
    window.addEventListener('keydown', handleEsc)
    return () => window.removeEventListener('keydown', handleEsc)
  }, [isOpen, onClose])

  const typeStyles = {
    danger: {
      gradient: 'from-red-600 to-rose-600',
      glow: 'shadow-[0_0_50px_rgba(239,68,68,0.3)]',
      iconBg: 'bg-red-500/20',
      iconColor: 'text-red-400',
      buttonBg: 'bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500',
      buttonGlow: 'shadow-[0_0_30px_rgba(239,68,68,0.4)]'
    },
    warning: {
      gradient: 'from-amber-600 to-orange-600',
      glow: 'shadow-[0_0_50px_rgba(245,158,11,0.3)]',
      iconBg: 'bg-amber-500/20',
      iconColor: 'text-amber-400',
      buttonBg: 'bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-500 hover:to-orange-500',
      buttonGlow: 'shadow-[0_0_30px_rgba(245,158,11,0.4)]'
    },
    info: {
      gradient: 'from-blue-600 to-cyan-600',
      glow: 'shadow-[0_0_50px_rgba(59,130,246,0.3)]',
      iconBg: 'bg-blue-500/20',
      iconColor: 'text-blue-400',
      buttonBg: 'bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500',
      buttonGlow: 'shadow-[0_0_30px_rgba(59,130,246,0.4)]'
    }
  }

  const styles = typeStyles[type]

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-md z-[100]"
          />

          {/* Dialog */}
          <div className="fixed inset-0 flex items-center justify-center z-[101] p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: 'spring', duration: 0.5 }}
              className={`relative w-full max-w-md bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-3xl border-2 border-slate-700/50 ${styles.glow} overflow-hidden`}
            >
              {/* Animated gradient background */}
              <div className="absolute inset-0 opacity-10">
                <div className={`absolute inset-0 bg-gradient-to-br ${styles.gradient} animate-pulse`} />
              </div>

              {/* Close button */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 p-2 rounded-full bg-slate-800/50 hover:bg-slate-700/50 border border-slate-600/50 transition-all duration-300 hover:scale-110 z-10"
              >
                <X className="h-5 w-5 text-slate-300" />
              </button>

              {/* Content */}
              <div className="relative p-8">
                {/* Icon */}
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.1, type: 'spring', stiffness: 200 }}
                  className="flex justify-center mb-6"
                >
                  <div className={`${styles.iconBg} p-4 rounded-2xl border border-${type}-500/30`}>
                    <AlertTriangle className={`h-12 w-12 ${styles.iconColor}`} />
                  </div>
                </motion.div>

                {/* Title */}
                <motion.h2
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="text-2xl font-bold text-center mb-3 text-white"
                >
                  {title}
                </motion.h2>

                {/* Message */}
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="text-slate-300 text-center mb-8 leading-relaxed"
                >
                  {message}
                </motion.p>

                {/* Buttons */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="flex gap-3"
                >
                  {/* Cancel Button */}
                  <button
                    onClick={onClose}
                    className="flex-1 px-6 py-4 rounded-xl bg-slate-800/50 hover:bg-slate-700/50 border-2 border-slate-600/50 hover:border-slate-500/50 text-slate-200 font-semibold transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
                  >
                    {cancelText}
                  </button>

                  {/* Confirm Button */}
                  <button
                    onClick={() => {
                      onConfirm()
                      onClose()
                    }}
                    className={`flex-1 px-6 py-4 rounded-xl ${styles.buttonBg} ${styles.buttonGlow} text-white font-bold transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] border-2 border-transparent`}
                  >
                    {confirmText}
                  </button>
                </motion.div>

                {/* Decorative elements */}
                <div className="absolute top-0 left-0 w-32 h-32 bg-gradient-to-br from-purple-500/10 to-transparent rounded-full blur-3xl" />
                <div className="absolute bottom-0 right-0 w-32 h-32 bg-gradient-to-tl from-blue-500/10 to-transparent rounded-full blur-3xl" />
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  )
}
