'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Users, Plus, Mail, Wallet, Edit, Trash2, Check, X, Shield, CheckCircle } from 'lucide-react'
import WebStorageService, { StoredBeneficiary } from '@/lib/storage'
import { useApp } from '@/contexts/AppContext'
import { addBeneficiary } from '@/lib/blockchain'
import { ConfirmationDialog } from './confirmation-dialog'
import { useSubscription } from '@/contexts/SubscriptionContext'
import { toast } from 'sonner'

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
  const [deleteConfirmation, setDeleteConfirmation] = useState<{ isOpen: boolean; beneficiaryId: string | null; beneficiaryName: string }>({
    isOpen: false,
    beneficiaryId: null,
    beneficiaryName: ''
  })

  // Beneficiary Verification States
  const [verifyingBeneficiary, setVerifyingBeneficiary] = useState<StoredBeneficiary | null>(null)
  const [verificationOtp, setVerificationOtp] = useState('')
  const [isSendingCode, setIsSendingCode] = useState(false)
  const [isVerifyingCode, setIsVerifyingCode] = useState(false)

  const { subscription } = useSubscription()
  const storage = WebStorageService.getInstance()

  const fetchAndSyncBeneficiaries = async () => {
    const isDemo = localStorage.getItem('dwp_is_demo') === 'true'
    if (isDemo) return
    try {
      const walletAddress = localStorage.getItem('dwp_wallet_address')
      if (!walletAddress) return
      const apiEndpoint = process.env.NEXT_PUBLIC_API_URL || 'https://always-there-protocol-api.onrender.com'
      const res = await fetch(`${apiEndpoint}/api/beneficiaries?ownerAddress=${walletAddress}`)
      if (res.ok) {
        const data = await res.json()
        
        // Sync local IndexedDB
        for (const item of data) {
          await storage.saveBeneficiary({
            id: item.id,
            name: item.name || '',
            email: item.email || '',
            walletAddress: item.walletAddress || '',
            createdAt: new Date(item.createdAt).getTime(),
            enabled: item.isActive ?? true,
            isVerified: item.isVerified ?? false,
          })
        }
        
        // Remove locally deleted ones if they are not in backend
        const backendIds = data.map((b: any) => b.id)
        for (const localBen of beneficiaries) {
          if (!backendIds.includes(localBen.id)) {
            await storage.deleteBeneficiary(localBen.id)
          }
        }
        
        await refreshState()
      }
    } catch (err) {
      console.error('Failed to sync beneficiaries from backend', err)
    }
  }

  useEffect(() => {
    fetchAndSyncBeneficiaries()
  }, [])

  const handleSendVerificationCode = async (beneficiary: StoredBeneficiary) => {
    setIsSendingCode(true)
    try {
      const apiEndpoint = process.env.NEXT_PUBLIC_API_URL || 'https://always-there-protocol-api.onrender.com'
      const res = await fetch(`${apiEndpoint}/api/beneficiaries/${beneficiary.id}/send-verification`, {
        method: 'POST'
      })
      if (res.ok) {
        toast.success('Verification Code Sent', {
          description: `A 6-digit code has been sent to ${beneficiary.email}.`
        })
      } else {
        const errData = await res.json()
        toast.error('Failed to send code', {
          description: errData.message || 'Error occurred.'
        })
      }
    } catch (err) {
      console.error('Error sending beneficiary code', err)
      toast.error('Failed to send code')
    } finally {
      setIsSendingCode(false)
    }
  }

  const handleVerifyBeneficiary = async () => {
    if (!verifyingBeneficiary || !verificationOtp) return
    setIsVerifyingCode(true)
    try {
      const apiEndpoint = process.env.NEXT_PUBLIC_API_URL || 'https://always-there-protocol-api.onrender.com'
      const res = await fetch(`${apiEndpoint}/api/beneficiaries/${verifyingBeneficiary.id}/verify`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code: verificationOtp })
      })
      if (res.ok) {
        toast.success('Beneficiary Verified', {
          description: `${verifyingBeneficiary.name} is now a verified nominee.`
        })
        setVerifyingBeneficiary(null)
        setVerificationOtp('')
        await fetchAndSyncBeneficiaries()
      } else {
        const errData = await res.json()
        toast.error('Verification Failed', {
          description: errData.message || 'Incorrect OTP code.'
        })
      }
    } catch (err) {
      console.error('Error verifying beneficiary', err)
      toast.error('Verification Failed')
    } finally {
      setIsVerifyingCode(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.name || !formData.email) return

    // 1. Check subscription
    if (!subscription || subscription.status === 'expired') {
      toast.error('Subscription Expired', {
        description: 'Please upgrade to continue adding beneficiaries.'
      })
      return
    }

    // 2. Enforce limits
    if (subscription.limits && subscription.beneficiariesCount !== undefined) {
      if (subscription.beneficiariesCount >= subscription.limits.beneficiaries) {
        toast.error('Limit reached', {
          description: `Your ${subscription.plan} plan allows up to ${subscription.limits.beneficiaries} beneficiaries.`
        })
        return
      }
    }

    setIsSubmitting(true)

    try {
      const isDemo = localStorage.getItem('dwp_is_demo') === 'true'

      // Step 1: Engage Decentralized Backend Wallet Config (if web3 presence exists)
      if (formData.walletAddress && !isDemo) {
        const txResult = await addBeneficiary(formData.walletAddress)
        if (!txResult.success) {
          toast.error(`Decentralized Registry Failed: ${txResult.error}`)
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
      
      // Sync to Backend Postgres
      if (!isDemo) {
        try {
          const walletAddress = localStorage.getItem('dwp_wallet_address') || '0x0000000000000000000000000000000000000000'
          const apiEndpoint = process.env.NEXT_PUBLIC_API_URL || 'https://always-there-protocol-api.onrender.com' /* 'http://localhost:7001' */
          const url = editingId 
            ? `${apiEndpoint}/api/beneficiaries/${editingId}`
            : `${apiEndpoint}/api/beneficiaries`
          
          const syncRes = await fetch(url, {
            method: editingId ? 'PUT' : 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              ownerAddress: walletAddress,
              name: beneficiary.name,
              email: beneficiary.email,
              walletAddress: beneficiary.walletAddress || "0x0000000000000000000000000000000000000000",
              relationship: 'nominee'
            })
          })
          if (syncRes.ok && !editingId) {
            const createdBen = await syncRes.json()
            await storage.deleteBeneficiary(beneficiary.id)
            await storage.saveBeneficiary({
              ...beneficiary,
              id: createdBen.id,
              isVerified: createdBen.isVerified || false
            })
          }
        } catch (err) {
          console.error('Failed to sync beneficiary to backend', err)
        }
      }

      await refreshState()
      await fetchAndSyncBeneficiaries()
      
      if (!isDemo) {
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
      }

      // Reset form
      setFormData({ name: '', email: '', walletAddress: '' })
      setShowAddForm(false)
      setEditingId(null)

      toast.success('Beneficiary Saved', {
        description: isDemo ? 'Saved locally in sandbox demo mode.' : 'Global database synced successfully.'
      })

    } catch (error) {
      console.error('Failed to save beneficiary:', error)
      toast.error('Failed to save beneficiary')
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

  const handleDelete = (id: string, name: string) => {
    setDeleteConfirmation({
      isOpen: true,
      beneficiaryId: id,
      beneficiaryName: name
    })
  }

  const confirmDelete = async () => {
    if (!deleteConfirmation.beneficiaryId) return

    try {
      await storage.deleteBeneficiary(deleteConfirmation.beneficiaryId)
      
      const isDemo = localStorage.getItem('dwp_is_demo') === 'true'
      if (!isDemo) {
        // Delete from Backend Postgres
        try {
          const apiEndpoint = process.env.NEXT_PUBLIC_API_URL || 'https://always-there-protocol-api.onrender.com' /* 'http://localhost:7001' */
          await fetch(`${apiEndpoint}/api/beneficiaries/${deleteConfirmation.beneficiaryId}`, {
            method: 'DELETE'
          })
        } catch (err) {
          console.error('Failed to delete beneficiary from backend', err)
        }
      }

      await refreshState()
      toast.success('Beneficiary deleted successfully')
      setDeleteConfirmation({ isOpen: false, beneficiaryId: null, beneficiaryName: '' })
    } catch (error) {
      console.error('Failed to delete beneficiary:', error)
      toast.error('Failed to delete beneficiary')
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
              <p className="text-sm text-slate-500 dark:text-slate-400">Manage who will receive your digital assets</p>
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
          <div className="text-center py-12 bg-slate-50 dark:bg-slate-900/30 rounded-xl border border-slate-200 dark:border-slate-800">
            <Users className="h-16 w-16 mx-auto mb-4 text-slate-400 dark:text-slate-600" />
            <p className="text-slate-700 dark:text-slate-300 font-medium">No beneficiaries added yet</p>
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
                        <h3 className="font-bold text-lg text-slate-800 dark:text-slate-200">{beneficiary.name}</h3>
                        <div className="flex items-center gap-1.5 mt-1">
                          {beneficiary.enabled && (
                            <span className="badge-premium badge-success-premium text-[10px] py-0.5 px-2">Active</span>
                          )}
                          {beneficiary.isVerified ? (
                            <span className="inline-flex items-center gap-1 bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                              <Check className="size-3" /> Verified
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 bg-amber-500/10 border border-amber-500/20 text-amber-600 dark:text-amber-450 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                              Pending
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2 mt-4">
                      <div className="flex items-center space-x-2 text-sm">
                        <Mail className="h-4 w-4 text-slate-500" />
                        <span className="text-slate-600 dark:text-slate-400">{beneficiary.email}</span>
                      </div>
                      <div className="flex items-start space-x-2 text-sm">
                        <Wallet className="h-4 w-4 text-slate-500 mt-0.5 flex-shrink-0" />
                        <span className="text-slate-600 dark:text-slate-400 font-mono text-xs break-all">
                          {beneficiary.walletAddress}
                        </span>
                      </div>
                      <div className="text-xs text-slate-500 dark:text-slate-400 mt-2">
                        Added: {new Date(beneficiary.createdAt).toLocaleDateString()}
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col space-y-2 ml-4">
                    {!beneficiary.isVerified && (
                      <button
                        onClick={() => {
                          setVerifyingBeneficiary(beneficiary)
                          handleSendVerificationCode(beneficiary)
                        }}
                        className="px-3 py-2 rounded-lg bg-amber-500/10 hover:bg-amber-500/20 text-amber-600 dark:text-amber-450 text-xs font-semibold transition-colors border border-amber-200 dark:border-amber-500/20 hover:border-amber-500/50"
                        title="Verify Nominee Email"
                      >
                        Verify
                      </button>
                    )}
                    <button
                      onClick={() => handleEdit(beneficiary)}
                      className="px-3 py-2 rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-sm font-medium transition-colors border border-slate-200 dark:border-slate-700 hover:border-blue-500/50 flex items-center justify-center"
                    >
                      <Edit className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(beneficiary.id, beneficiary.name)}
                      className="px-3 py-2 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-600 dark:text-red-400 text-sm font-medium transition-colors border border-red-200 dark:border-red-500/20 hover:border-red-500/50 flex items-center justify-center"
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
              <p className="text-sm text-slate-500 dark:text-slate-400">Enter beneficiary details and wallet address</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-2 text-slate-700 dark:text-slate-200">Name *</label>
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
              <label className="block text-sm font-medium mb-2 text-slate-700 dark:text-slate-200">Email *</label>
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
              <label className="block text-sm font-medium mb-2 text-slate-700 dark:text-slate-200">
                Wallet Address <span className="text-slate-500 dark:text-slate-450 font-normal text-xs ml-1">(Optional - Can be added later)</span>
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
                <p className="text-xs text-green-600 dark:text-green-400 mt-1 flex items-center">
                  <CheckCircle className="h-3 w-3 mr-1" />
                  Valid Ethereum address
                </p>
              )}
            </div>

            <div className="bg-blue-50 dark:bg-blue-500/10 border border-blue-200 dark:border-blue-500/20 p-4 rounded-xl">
              <div className="flex items-start space-x-3">
                <Shield className="h-5 w-5 text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" />
                <div className="text-sm text-slate-700 dark:text-slate-300">
                  <p className="font-medium text-blue-700 dark:text-blue-300 mb-1">Beneficiary Verification</p>
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
                className="px-8 py-4 rounded-xl border-2 border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-200 font-semibold hover:bg-slate-50 dark:hover:bg-slate-800/50 hover:border-blue-500/50 transition-all duration-300"
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
            className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 flex items-center gap-3 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-500/30 backdrop-blur-xl px-6 py-4 rounded-2xl shadow-[0_10px_30px_rgba(16,185,129,0.1)] dark:shadow-[0_0_30px_rgba(16,185,129,0.2)]"
          >
            <div className="bg-emerald-100 dark:bg-emerald-500/20 p-2 rounded-full">
              <Check className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
            </div>
            <div>
              <p className="text-emerald-900 dark:text-white font-bold tracking-wide">Beneficiary Saved</p>
              <p className="text-emerald-700 dark:text-emerald-200 text-xs font-medium">Global database synced successfully.</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Delete Confirmation Dialog */}
      <ConfirmationDialog
        isOpen={deleteConfirmation.isOpen}
        onClose={() => setDeleteConfirmation({ isOpen: false, beneficiaryId: null, beneficiaryName: '' })}
        onConfirm={confirmDelete}
        title="Delete Beneficiary?"
        message={`Are you sure you want to remove ${deleteConfirmation.beneficiaryName} from your beneficiaries? This action cannot be undone.`}
        confirmText="Delete"
        cancelText="Cancel"
        type="danger"
      />
      {/* Beneficiary Email Verification Modal */}
      <AnimatePresence>
        {verifyingBeneficiary && (
          <div className="fixed inset-0 z-50 flex items-start justify-center p-4 bg-black/75 backdrop-blur-sm overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-slate-900 border border-slate-800 p-6 md:p-8 rounded-3xl max-w-lg w-full text-slate-100 shadow-2xl relative my-8 md:my-16"
            >
              <button
                onClick={() => {
                  setVerifyingBeneficiary(null)
                  setVerificationOtp('')
                }}
                className="absolute top-4 right-4 p-2 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
              >
                <X className="size-5" />
              </button>

              <div className="space-y-6">
                <div className="text-center">
                  <div className="icon-container w-12 h-12 mx-auto bg-amber-500/10 border border-amber-500/20 rounded-xl flex items-center justify-center mb-3">
                    <Mail className="size-6 text-amber-400" />
                  </div>
                  <h3 className="text-xl font-bold text-white">Verify Nominee Email</h3>
                  <p className="text-xs text-slate-400 mt-1">
                    We sent a 6-digit verification code to <span className="text-white font-bold">{verifyingBeneficiary.email}</span>
                  </p>
                </div>

                <div className="space-y-2">
                  <label className="text-[9px] uppercase tracking-widest text-slate-500 font-bold block">
                    Verification Code
                  </label>
                  <input
                    type="text"
                    maxLength={6}
                    placeholder="000000"
                    value={verificationOtp}
                    onChange={(e) => setVerificationOtp(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-center text-lg font-mono tracking-[0.5em] text-white focus:outline-none focus:border-amber-500"
                  />
                  <div className="flex justify-between items-center px-1">
                    <p className="text-[10px] text-slate-550">
                      Enter the code sent to your nominee's email.
                    </p>
                    <button
                      onClick={() => handleSendVerificationCode(verifyingBeneficiary)}
                      disabled={isSendingCode}
                      className="text-[10px] text-amber-400 hover:text-amber-300 font-bold underline disabled:opacity-50"
                    >
                      {isSendingCode ? "Sending..." : "Resend Code"}
                    </button>
                  </div>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => {
                      setVerifyingBeneficiary(null)
                      setVerificationOtp('')
                    }}
                    className="flex-1 bg-transparent border border-slate-800 text-slate-400 hover:text-white text-xs uppercase tracking-widest py-4 rounded-xl hover:bg-white/5 font-bold transition-all"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleVerifyBeneficiary}
                    disabled={isVerifyingCode || !verificationOtp}
                    className="flex-1 bg-amber-600 hover:bg-amber-500 disabled:bg-amber-600/40 text-white font-bold text-xs uppercase tracking-widest py-4 rounded-xl shadow-lg transition-all"
                  >
                    {isVerifyingCode ? "Verifying..." : "Verify & Activate"}
                  </button>
                </div>

                <div className="text-center pt-2">
                  <button
                    onClick={async () => {
                      if (confirm(`Discard this nominee registration and remove ${verifyingBeneficiary.name}?`)) {
                        setVerifyingBeneficiary(null)
                        setVerificationOtp('')
                        await storage.deleteBeneficiary(verifyingBeneficiary.id)
                        const isDemo = localStorage.getItem('dwp_is_demo') === 'true'
                        if (!isDemo) {
                          try {
                            const apiEndpoint = process.env.NEXT_PUBLIC_API_URL || 'https://always-there-protocol-api.onrender.com'
                            await fetch(`${apiEndpoint}/api/beneficiaries/${verifyingBeneficiary.id}`, {
                              method: 'DELETE'
                            })
                          } catch (err) {
                            console.error('Failed to delete beneficiary from backend', err)
                          }
                        }
                        await refreshState()
                        await fetchAndSyncBeneficiaries()
                        toast.success('Nominee registration discarded')
                      }
                    }}
                    className="text-[10px] text-red-400 hover:text-red-300 font-bold underline cursor-pointer"
                  >
                    Discard nominee registration
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  )
}