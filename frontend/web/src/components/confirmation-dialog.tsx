'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { AlertTriangle, Trash2, Info, X } from 'lucide-react'
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

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : 'unset'
    return () => { document.body.style.overflow = 'unset' }
  }, [isOpen])

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => { if (e.key === 'Escape' && isOpen) onClose() }
    window.addEventListener('keydown', handleEsc)
    return () => window.removeEventListener('keydown', handleEsc)
  }, [isOpen, onClose])

  const config = {
    danger: {
      accent:      'bg-red-500',
      iconWrap:    'bg-red-500/10 border border-red-500/20',
      iconColor:   'text-red-400',
      Icon:        Trash2,
      labelColor:  'text-red-400',
      label:       'Permanent Action',
      btnBase:     'bg-red-600 hover:bg-red-500 focus:ring-red-500/40',
      btnBorder:   'border-red-500/30',
    },
    warning: {
      accent:      'bg-amber-500',
      iconWrap:    'bg-amber-500/10 border border-amber-500/20',
      iconColor:   'text-amber-400',
      Icon:        AlertTriangle,
      labelColor:  'text-amber-400',
      label:       'Warning',
      btnBase:     'bg-amber-600 hover:bg-amber-500 focus:ring-amber-500/40',
      btnBorder:   'border-amber-500/30',
    },
    info: {
      accent:      'bg-blue-500',
      iconWrap:    'bg-blue-500/10 border border-blue-500/20',
      iconColor:   'text-blue-400',
      Icon:        Info,
      labelColor:  'text-blue-400',
      label:       'Confirmation',
      btnBase:     'bg-blue-600 hover:bg-blue-500 focus:ring-blue-500/40',
      btnBorder:   'border-blue-500/30',
    },
  }

  const c = config[type]
  const { Icon } = c

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]"
          />

          {/* Dialog */}
          <div className="fixed inset-0 flex items-center justify-center z-[101] p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 12 }}
              transition={{ type: 'spring', stiffness: 380, damping: 30 }}
              className="relative w-full max-w-sm bg-[#0d0f17] border border-white/[0.08] rounded-2xl shadow-2xl overflow-hidden"
            >
              {/* Top accent line */}
              <div className={`absolute top-0 left-0 right-0 h-[2px] ${c.accent}`} />

              {/* Header */}
              <div className="flex items-start justify-between px-6 pt-7 pb-5">
                <div className="flex items-center gap-3.5">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${c.iconWrap}`}>
                    <Icon className={`w-5 h-5 ${c.iconColor}`} />
                  </div>
                  <div>
                    <p className={`text-[10px] font-bold uppercase tracking-widest mb-0.5 ${c.labelColor}`}>
                      {c.label}
                    </p>
                    <h2 className="text-base font-bold text-white leading-tight">
                      {title}
                    </h2>
                  </div>
                </div>
                <button
                  onClick={onClose}
                  className="p-1.5 rounded-lg text-slate-500 hover:text-white hover:bg-white/[0.06] transition-all duration-200 flex-shrink-0 mt-0.5"
                  aria-label="Close"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Divider */}
              <div className="mx-6 h-px bg-white/[0.06]" />

              {/* Body */}
              <div className="px-6 py-5">
                <p className="text-slate-400 text-sm leading-relaxed">
                  {message}
                </p>
              </div>

              {/* Footer */}
              <div className="px-6 pb-6 flex gap-3">
                <button
                  onClick={onClose}
                  className="flex-1 py-2.5 px-4 text-sm font-semibold text-slate-300 hover:text-white bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] hover:border-white/[0.14] rounded-xl transition-all duration-200"
                >
                  {cancelText}
                </button>
                <button
                  onClick={() => { onConfirm(); onClose() }}
                  className={`flex-1 py-2.5 px-4 text-sm font-bold text-white rounded-xl border ${c.btnBorder} ${c.btnBase} transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#0d0f17] shadow-lg`}
                >
                  {confirmText}
                </button>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  )
}
