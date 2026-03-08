'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Users, Plus, Mail, Wallet, Edit, Trash2, Check, X, Shield, CheckCircle } from 'lucide-react'
import WebStorageService, { StoredBeneficiary } from '@/lib/storage'
import { useApp } from '@/contexts/AppContext'
import { addBeneficiary } from '@/lib/blockchain'

export function BeneficiaryManager() {
  const { state, refreshState } = useApp()
  const beneficiaries = state?.beneficiaries || []

  const [showAddForm, setShowAddForm] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    walletAddress: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showSuccessPopup, setShowSuccessPopup] = useState(false)

  const storage = WebStorageService.getInstance()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.name || !formData.email) return

    setIsSubmitting(true)

    try {
      // Step 1: Engage Decentralized Backend Wallet Config (if web3 presence exists)
      if (formData.walletAddress) {
        const txResult = await addBeneficiary(formData.walletAddress)
        if (!txResult.success) {
          alert(`Decentralized Registry Failed: ${txResult.error}`)
          return
        }
      }

      const beneficiary: StoredBeneficiary = {
        id: editingId || storage.generateId(),
        name: formData.name,
        email: formData.email,
        walletAddress: formData.walletAddress,
        createdAt: editingId ? beneficiaries.find(b => b.id === editingId)?.createdAt || Date.now() : Date.now(),
        enabled: true
      }

      await storage.saveBeneficiary(beneficiary)
      await refreshState()

      // Step 2: Bridge to traditional Web2 Email Service via Next.js Server Route
      // This allows the 100% decentralized Web3 backend to still fire emails
      try {
        const emailReq = await fetch('/api/send-email', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: formData.name,
            email: formData.email,
            walletAddress: formData.walletAddress
          })
        })

        if (!emailReq.ok) {
          console.error('Failed to trigger background email bridge')
        }
      } catch (emailOutage) {
        console.error('Email Bridge Unavailable:', emailOutage)
      }

      // Reset form
      setFormData({ name: '', email: '', walletAddress: '' })
      setShowAddForm(false)
      setEditingId(null)

      setShowSuccessPopup(true)
      setTimeout(() => setShowSuccessPopup(false), 3000)

    } catch (error) {
      console.error('Failed to save beneficiary:', error)
      alert('Failed to save beneficiary. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleEdit = (beneficiary: StoredBeneficiary) => {
    setFormData({
      name: beneficiary.name,
      email: beneficiary.email,
      walletAddress: beneficiary.walletAddress
    })
    setEditingId(beneficiary.id)
    setShowAddForm(true)
  }

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this beneficiary?')) {
      try {
        await storage.deleteBeneficiary(id)
        await refreshState()
      } catch (error) {
        console.error('Failed to delete beneficiary:', error)
        alert('Failed to delete beneficiary.')
      }
    }
  }

  const handleCancel = () => {
    setFormData({ name: '', email: '', walletAddress: '' })
    setShowAddForm(false)
    setEditingId(null)
  }

  const validateWalletAddress = (address: string): boolean => {
    // Basic Ethereum address validation
    return /^0x[a-fA-F0-9]{40}$/.test(address)
  }

  const validateEmail = (email: string): boolean => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  }

  const isFormValid = () => {
    return formData.name.trim() !== '' &&
      validateEmail(formData.email) &&
      (!formData.walletAddress || validateWalletAddress(formData.walletAddress))
  }

  return (
    <div className="space-y-6">
      {/* Beneficiaries List */}
      <div className="premium-card p-8">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <div className="icon-container bg-gradient-to-br from-green-600 to-emerald-600">
              <Users className="h-5 w-5 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold gradient-text-premium">Beneficiary Management</h2>
              <p className="text-sm text-slate-400">Manage who will receive your digital assets</p>
            </div>
          </div>
          <button
            onClick={() => setShowAddForm(true)}
            disabled={showAddForm}
            className="btn-premium px-6 py-3 disabled:opacity-50"
          >
            <Plus className="h-5 w-5 mr-2" />
            Add Beneficiary
          </button>
        </div>

        {beneficiaries.length === 0 ? (
          <div className="text-center py-12 bg-slate-900/30 rounded-xl border border-slate-800">
            <Users className="h-16 w-16 mx-auto mb-4 text-slate-600" />
            <p className="text-slate-300 font-medium">No beneficiaries added yet</p>
            <p className="text-sm text-slate-500 mt-2">Add your first beneficiary to get started</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-4">
            {beneficiaries.map((beneficiary) => (
              <div key={beneficiary.id} className="premium-card p-6 hover:scale-[1.02] transition-transform">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-600 to-emerald-600 flex items-center justify-center">
                        <span className="text-white font-bold text-lg">
                          {beneficiary.name.charAt(0).toUpperCase()}
                        </span>
                      </div>
                      <div>
                        <h3 className="font-bold text-lg text-slate-200">{beneficiary.name}</h3>
                        {beneficiary.enabled && (
                          <span className="badge-premium badge-success-premium text-xs">Active</span>
                        )}
                      </div>
                    </div>

                    <div className="space-y-2 mt-4">
                      <div className="flex items-center space-x-2 text-sm">
                        <Mail className="h-4 w-4 text-slate-500" />
                        <span className="text-slate-400">{beneficiary.email}</span>
                      </div>
                      <div className="flex items-start space-x-2 text-sm">
                        <Wallet className="h-4 w-4 text-slate-500 mt-0.5 flex-shrink-0" />
                        <span className="text-slate-400 font-mono text-xs break-all">
                          {beneficiary.walletAddress}
                        </span>
                      </div>
                      <div className="text-xs text-slate-500 mt-2">
                        Added: {new Date(beneficiary.createdAt).toLocaleDateString()}
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col space-y-2 ml-4">
                    <button
                      onClick={() => handleEdit(beneficiary)}
                      className="px-3 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-sm font-medium transition-colors border border-slate-700 hover:border-blue-500/50"
                    >
                      <Edit className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(beneficiary.id)}
                      className="px-3 py-2 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 text-sm font-medium transition-colors border border-red-500/20 hover:border-red-500/50"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Add/Edit Form */}
      {showAddForm && (
        <div className="premium-card p-8">
          <div className="flex items-center space-x-3 mb-6">
            <div className="icon-container bg-gradient-to-br from-blue-600 to-cyan-600">
              <Users className="h-5 w-5 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold gradient-text-premium">
                {editingId ? 'Edit Beneficiary' : 'Add New Beneficiary'}
              </h2>
              <p className="text-sm text-slate-400">Enter beneficiary details and wallet address</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-2 text-slate-200">Name *</label>
              <input
                type="text"
                className="input-premium w-full"
                placeholder="Beneficiary name"
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2 text-slate-200">Email *</label>
              <input
                type="email"
                className={`input-premium w-full ${formData.email && !validateEmail(formData.email) ? 'border-red-500' : ''
                  }`}
                placeholder="email@example.com"
                value={formData.email}
                onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                required
              />
              {formData.email && !validateEmail(formData.email) && (
                <p className="text-xs text-red-400 mt-1 flex items-center">
                  <X className="h-3 w-3 mr-1" />
                  Please enter a valid email address
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium mb-2 text-slate-200">
                Wallet Address <span className="text-slate-500 font-normal text-xs ml-1">(Optional - Can be added later)</span>
              </label>
              <input
                type="text"
                className={`input-premium w-full font-mono text-sm ${formData.walletAddress && !validateWalletAddress(formData.walletAddress) ? 'border-red-500' : ''
                  }`}
                placeholder="0x..."
                value={formData.walletAddress}
                onChange={(e) => setFormData(prev => ({ ...prev, walletAddress: e.target.value }))}
              />
              {formData.walletAddress && !validateWalletAddress(formData.walletAddress) && (
                <p className="text-xs text-red-400 mt-1 flex items-center">
                  <X className="h-3 w-3 mr-1" />
                  Please enter a valid Ethereum address (0x...)
                </p>
              )}
              {formData.walletAddress && validateWalletAddress(formData.walletAddress) && (
                <p className="text-xs text-green-400 mt-1 flex items-center">
                  <CheckCircle className="h-3 w-3 mr-1" />
                  Valid Ethereum address
                </p>
              )}
            </div>

            <div className="bg-blue-500/10 border border-blue-500/20 p-4 rounded-xl">
              <div className="flex items-start space-x-3">
                <Shield className="h-5 w-5 text-blue-400 mt-0.5 flex-shrink-0" />
                <div className="text-sm text-slate-300">
                  <p className="font-medium text-blue-300 mb-1">Beneficiary Verification</p>
                  <p>The beneficiary will receive email notifications. If they don't have a Web3 wallet yet, they can create one and provide the address later to access assets.</p>
                </div>
              </div>
            </div>

            <div className="flex space-x-3">
              <button
                type="submit"
                className="btn-premium flex-1 disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={!isFormValid() || isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <Check className="h-5 w-5 mr-2 animate-spin" />
                    {editingId ? 'Updating...' : 'Adding...'}
                  </>
                ) : (
                  <>
                    <Check className="h-5 w-5 mr-2" />
                    {editingId ? 'Update Beneficiary' : 'Add Beneficiary'}
                  </>
                )}
              </button>
              <button
                type="button"
                onClick={handleCancel}
                disabled={isSubmitting}
                className="px-8 py-4 rounded-xl border-2 border-slate-700 text-slate-200 font-semibold hover:bg-slate-800/50 hover:border-blue-500/50 transition-all duration-300"
              >
                <X className="h-5 w-5 mr-2 inline" />
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Success Popup */}
      <AnimatePresence>
        {showSuccessPopup && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 50 }}
            className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 flex items-center gap-3 bg-emerald-500/10 border border-emerald-500/30 backdrop-blur-xl px-6 py-4 rounded-2xl shadow-[0_0_30px_rgba(16,185,129,0.2)]"
          >
            <div className="bg-emerald-500/20 p-2 rounded-full">
              <Check className="w-6 h-6 text-emerald-400" />
            </div>
            <div>
              <p className="text-white font-bold tracking-wide">Beneficiary Saved</p>
              <p className="text-emerald-200 text-xs font-medium">Global database synced successfully.</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}