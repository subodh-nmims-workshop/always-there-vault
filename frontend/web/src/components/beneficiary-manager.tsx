'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Users, Plus, Mail, Wallet, Edit, Trash2, Check, X, Shield, CheckCircle, HelpCircle } from 'lucide-react'
import WebStorageService, { StoredBeneficiary } from '@/lib/storage'
import { useApp } from '@/contexts/AppContext'
import { addBeneficiary } from '@/lib/blockchain'
import { ConfirmationDialog } from './confirmation-dialog'
import { useSubscription } from '@/contexts/SubscriptionContext'
import { toast } from 'sonner'
import { Portal } from '@/components/portal'

export function BeneficiaryManager() {
  const { state, refreshState } = useApp()
  const beneficiaries = state?.beneficiaries || []

  const [showAddForm, setShowAddForm] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    walletAddress: '',
    verificationMethod: 'email', // 'email' | 'public_key'
    pgpPublicKey: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showPgpHelp, setShowPgpHelp] = useState(false)
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
    try {
      const walletAddress = localStorage.getItem('dwp_wallet_address')
      const token = localStorage.getItem('dwp_token')
      if (!walletAddress) return

      const apiEndpoint = process.env.NEXT_PUBLIC_API_URL || 'https://always-there-protocol-api.onrender.com'
      
      // Use JWT token if available, otherwise fall back to ownerAddress query
      const headers: any = {}
      if (token) headers['Authorization'] = `Bearer ${token}`

      const res = await fetch(`${apiEndpoint}/api/beneficiaries?ownerAddress=${walletAddress}`, { headers })
      if (res.ok) {
        const data = await res.json()

        // ⚡ SAFETY GUARD: Never delete local data if backend returns nothing
        // This prevents data loss on network errors, wrong wallet address, or expired sessions
        if (!data || data.length === 0) {
          console.warn('⚠️ Backend returned 0 beneficiaries — skipping local sync to prevent data loss.')
          return
        }

        // Restore/sync backend beneficiaries into local IndexedDB
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

        // Only remove local beneficiaries that were explicitly deleted from backend
        // (only when backend has MORE data than nothing — the safety guard above ensures this)
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
    if (!formData.name) return
    if (formData.verificationMethod === 'email' && !formData.email) return
    if (formData.verificationMethod === 'public_key' && !formData.pgpPublicKey) return

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

    // Check local list of beneficiaries for duplicate email/wallet, case-insensitive
    if (formData.email) {
      const duplicateEmail = beneficiaries.find(b => 
        b.id !== editingId && 
        b.email?.trim().toLowerCase() === formData.email.trim().toLowerCase()
      )
      if (duplicateEmail) {
        toast.error('Duplicate Beneficiary', {
          description: `A beneficiary with the email ${formData.email} has already been added.`
        })
        return
      }
    }

    if (formData.walletAddress && formData.walletAddress !== '0x0000000000000000000000000000000000000000') {
      const duplicateWallet = beneficiaries.find(b => 
        b.id !== editingId && 
        b.walletAddress?.trim().toLowerCase() === formData.walletAddress.trim().toLowerCase()
      )
      if (duplicateWallet) {
        toast.error('Duplicate Beneficiary', {
          description: `A beneficiary with the wallet address ${formData.walletAddress} has already been added.`
        })
        return
      }
    }

    setIsSubmitting(true)

    try {
      // Step 1: Engage Decentralized Backend Wallet Config (if web3 presence exists)
      const isZeroAddress = formData.walletAddress === '0x0000000000000000000000000000000000000000'
      if (formData.walletAddress && !isZeroAddress) {
        const txResult = await addBeneficiary(formData.walletAddress)
        if (!txResult.success) {
          // If contract is not configured or wallet is not available, show warning instead of blocking
          const isConfigOrWalletError = 
            txResult.error?.includes('contract is not configured') || 
            txResult.error?.includes('not configured') ||
            txResult.error?.includes('No Web3 wallet found') ||
            txResult.error?.includes('MetaMask');

          if (isConfigOrWalletError) {
            toast.warning('On-chain registration skipped', {
              description: `${txResult.error}. Saved locally and to cloud database.`
            })
          } else {
            toast.error(`Decentralized Registry Failed: ${txResult.error}`)
            return
          }
        }
      }

      // If PGP mode, append +pgp tag before @ to support real email inputs with bypass mode
      const emailToSubmit = formData.verificationMethod === 'public_key'
        ? (formData.email.includes('@') ? formData.email.replace('@', '+pgp@') : formData.email)
        : formData.email;

      const beneficiary: StoredBeneficiary = {
        id: editingId || storage.generateId(),
        name: formData.name,
        email: emailToSubmit,
        walletAddress: formData.walletAddress,
        createdAt: editingId ? beneficiaries.find(b => b.id === editingId)?.createdAt || Date.now() : Date.now(),
        enabled: true,
        verificationMethod: formData.verificationMethod as 'email' | 'public_key',
        pgpPublicKey: formData.verificationMethod === 'public_key' ? formData.pgpPublicKey : undefined,
        isVerified: formData.verificationMethod === 'public_key' ? true : undefined
      }

      await storage.saveBeneficiary(beneficiary)

      // Sync to Backend Postgres
      let backendId = beneficiary.id;
      const walletAddress = localStorage.getItem('dwp_wallet_address') || '0x0000000000000000000000000000000000000000'
      const apiEndpoint = process.env.NEXT_PUBLIC_API_URL || 'https://always-there-protocol-api.onrender.com' /* 'http://localhost:7001' */
      const url = editingId
        ? `${apiEndpoint}/api/beneficiaries/${editingId}`
        : `${apiEndpoint}/api/beneficiaries`

      const requestBody: any = {
        name: beneficiary.name,
        email: beneficiary.email,
        walletAddress: beneficiary.walletAddress || "0x0000000000000000000000000000000000000000",
        relationship: 'nominee'
      }
      if (!editingId) {
        requestBody.ownerAddress = walletAddress
      }

      const syncRes = await fetch(url, {
        method: editingId ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestBody)
      })

      if (!syncRes.ok) {
        const errData = await syncRes.json().catch(() => null)
        throw new Error(errData?.message || 'Failed to sync beneficiary with server.')
      }

      if (!editingId) {
        const createdBen = await syncRes.json()
        backendId = createdBen.id;
        await storage.deleteBeneficiary(beneficiary.id)
        await storage.saveBeneficiary({
          ...beneficiary,
          id: createdBen.id,
          isVerified: formData.verificationMethod === 'public_key' ? true : (createdBen.isVerified || false)
        })
      }

      // If public key mode, immediately verify on backend too
      if (formData.verificationMethod === 'public_key') {
        const verifyRes = await fetch(`${apiEndpoint}/api/beneficiaries/${backendId}/verify`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ code: 'BYPASS_PGP_VERIFICATION' })
        })
        if (!verifyRes.ok) {
          const errData = await verifyRes.json().catch(() => null)
          console.error('Failed to verify PGP beneficiary on backend:', errData)
        }
      }

      await refreshState()
      await fetchAndSyncBeneficiaries()

      // Skip sending email bridge if PGP Mode
      if (formData.verificationMethod !== 'public_key') {
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
      setFormData({ name: '', email: '', walletAddress: '', verificationMethod: 'email', pgpPublicKey: '' })
      setShowAddForm(false)
      setEditingId(null)

      toast.success('Beneficiary Saved', {
        description: 'Global database synced successfully.'
      })

    } catch (error: any) {
      console.error('Failed to save beneficiary:', error)
      toast.error(error.message || 'Failed to save beneficiary')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleEdit = (beneficiary: StoredBeneficiary) => {
    const isPgp = beneficiary.email && (beneficiary.email.includes('+pgp@') || beneficiary.email.startsWith('pgp-'));
    const cleanEmail = beneficiary.email
      ? beneficiary.email.replace('+pgp@', '@')
      : '';
    setFormData({
      name: beneficiary.name,
      email: cleanEmail,
      walletAddress: beneficiary.walletAddress,
      verificationMethod: isPgp ? 'public_key' : 'email',
      pgpPublicKey: isPgp ? beneficiary.pgpPublicKey || '' : ''
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

      // Delete from Backend Postgres
      try {
        const apiEndpoint = process.env.NEXT_PUBLIC_API_URL || 'https://always-there-protocol-api.onrender.com' /* 'http://localhost:7001' */
        await fetch(`${apiEndpoint}/api/beneficiaries/${deleteConfirmation.beneficiaryId}`, {
          method: 'DELETE'
        })
      } catch (err) {
        console.error('Failed to delete beneficiary from backend', err)
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
    setFormData({ name: '', email: '', walletAddress: '', verificationMethod: 'email', pgpPublicKey: '' })
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
    if (formData.name.trim() === '') return false
    if (!validateEmail(formData.email)) return false
    if (formData.verificationMethod === 'public_key' && !formData.pgpPublicKey.trim()) return false
    return !formData.walletAddress || validateWalletAddress(formData.walletAddress)
  }

  return (
    <div className="space-y-6">
      {/* Beneficiaries List */}
      <div className="premium-card p-4 sm:p-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div className="flex items-center space-x-3">
            <div className="icon-container bg-gradient-to-br from-green-600 to-emerald-600 shrink-0">
              <Users className="h-5 w-5 text-white" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-bold gradient-text-premium leading-tight">Beneficiary Management</h2>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">Manage who will receive your digital assets</p>
            </div>
          </div>
          <button
            onClick={() => setShowAddForm(true)}
            disabled={showAddForm}
            className="btn-premium px-6 py-3 disabled:opacity-50 w-full sm:w-auto justify-center"
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
              <div key={beneficiary.id} className="premium-card p-4 sm:p-6 hover:scale-[1.02] transition-transform">
                <div className="flex flex-col sm:flex-row items-start justify-between gap-4">
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
                          {beneficiary.email && (beneficiary.email.includes('+pgp@') || beneficiary.email.startsWith('pgp-')) && (
                            <span className="inline-flex items-center gap-1 bg-blue-500/10 border border-blue-500/20 text-blue-600 dark:text-blue-400 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                              PGP Mode
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2 mt-4">
                      <div className="flex items-center space-x-2 text-sm">
                        <Mail className="h-4 w-4 text-slate-500 flex-shrink-0" />
                        <span className="text-slate-600 dark:text-slate-400 truncate">
                          {beneficiary.email ? beneficiary.email.replace('+pgp@', '@') : ''}
                        </span>
                      </div>
                      {beneficiary.email && (beneficiary.email.includes('+pgp@') || beneficiary.email.startsWith('pgp-')) && (
                        <div className="flex items-start space-x-2 text-sm">
                          <Shield className="h-4 w-4 text-slate-500 mt-0.5 flex-shrink-0" />
                          <span className="text-slate-600 dark:text-slate-400 font-mono text-xs break-all line-clamp-1" title={beneficiary.pgpPublicKey}>
                            PGP Key: {beneficiary.pgpPublicKey ? beneficiary.pgpPublicKey.substring(0, 30) + '...' : 'Key Uploaded'}
                          </span>
                        </div>
                      )}
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

                  <div className="flex flex-row sm:flex-col gap-2 w-full sm:w-auto justify-end sm:justify-start sm:ml-4 border-t sm:border-t-0 border-slate-150 dark:border-slate-850 pt-3 sm:pt-0 shrink-0">
                    {!beneficiary.isVerified && (
                      <button
                        onClick={() => {
                          setVerifyingBeneficiary(beneficiary)
                          handleSendVerificationCode(beneficiary)
                        }}
                        className="px-3 py-2 rounded-lg bg-amber-500/10 hover:bg-amber-500/20 text-amber-600 dark:text-amber-450 text-xs font-semibold transition-colors border border-amber-200 dark:border-amber-500/20 hover:border-amber-500/50 flex-1 sm:flex-initial"
                        title="Verify Nominee Email"
                      >
                        Verify
                      </button>
                    )}
                    <button
                      onClick={() => handleEdit(beneficiary)}
                      className="px-3 py-2 rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-sm font-medium transition-colors border border-slate-200 dark:border-slate-700 hover:border-blue-500/50 flex items-center justify-center flex-1 sm:flex-initial"
                    >
                      <Edit className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(beneficiary.id, beneficiary.name)}
                      className="px-3 py-2 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-600 dark:text-red-400 text-sm font-medium transition-colors border border-red-200 dark:border-red-500/20 hover:border-red-500/50 flex items-center justify-center flex-1 sm:flex-initial"
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
        <div className="premium-card p-4 sm:p-8">
          <div className="flex items-center space-x-3 mb-6">
            <div className="icon-container bg-gradient-to-br from-blue-600 to-cyan-600 shrink-0">
              <Users className="h-5 w-5 text-white" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-bold gradient-text-premium leading-tight">
                {editingId ? 'Edit Beneficiary' : 'Add New Beneficiary'}
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">Enter beneficiary details and wallet address</p>
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
              <div className="flex items-center justify-between mb-2">
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-200">Email Address *</label>
                <div className="relative group">
                  <span className="text-[11px] text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 cursor-pointer flex items-center gap-1 bg-slate-100 dark:bg-slate-800/80 px-2 py-0.5 rounded-md transition-colors">
                    <HelpCircle className="h-3 w-3 text-slate-400 dark:text-slate-500" />
                    Why verify?
                  </span>
                  <div className="absolute right-0 top-6 hidden group-hover:block z-50 w-72 p-3 bg-slate-900 dark:bg-slate-950 text-white text-xs rounded-xl shadow-[0_10px_30px_rgba(0,0,0,0.3)] border border-slate-850 dark:border-slate-800 leading-relaxed transition-all duration-200">
                    <p className="font-bold mb-1 text-slate-100 flex items-center gap-1">
                      <HelpCircle className="h-3.5 w-3.5 text-blue-400" /> Why verify nominee email?
                    </p>
                    <p className="text-[11px] text-slate-350">
                      - Prevents accidental typos that could permanently lock or lose your inheritance assets.<br />
                      - Ensures the nominee's inbox is active, verified, and secure to receive access links.
                    </p>
                  </div>
                </div>
              </div>
              <input
                type="email"
                className={`input-premium w-full ${formData.email && !validateEmail(formData.email) ? 'border-red-500' : ''
                  }`}
                placeholder="nominee@example.com"
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
              <label className="block text-sm font-medium mb-3 text-slate-700 dark:text-slate-200">Verification Protocol *</label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Option 1: Email Mode */}
                <div
                  onClick={() => setFormData(prev => ({ ...prev, verificationMethod: 'email' }))}
                  className={`cursor-pointer p-4 rounded-xl border-2 transition-all duration-300 relative flex flex-col justify-between ${formData.verificationMethod === 'email'
                      ? 'border-blue-500 bg-blue-500/5 shadow-[0_4px_20px_rgba(59,130,246,0.15)] dark:border-blue-500/75'
                      : 'border-slate-200 dark:border-slate-800 hover:border-slate-350 dark:hover:border-slate-700 bg-transparent'
                    }`}
                >
                  <div className="flex items-start space-x-3">
                    <div className={`p-2 rounded-lg ${formData.verificationMethod === 'email' ? 'bg-blue-500 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-500'}`}>
                      <Mail className="h-4 w-4" />
                    </div>
                    <div>
                      <h4 className="font-bold text-sm text-slate-800 dark:text-slate-200">Standard Email Mode</h4>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">Best for family members and friends. We send an OTP code to verify this address. Prevents access loss through confirmation checks.</p>
                    </div>
                  </div>
                  {formData.verificationMethod === 'email' && (
                    <div className="absolute top-2 right-2 h-2.5 w-2.5 rounded-full bg-blue-500 animate-pulse" />
                  )}
                </div>

                {/* Option 2: Public Key Mode */}
                <div
                  onClick={() => setFormData(prev => ({ ...prev, verificationMethod: 'public_key' }))}
                  className={`cursor-pointer p-4 rounded-xl border-2 transition-all duration-300 relative flex flex-col justify-between ${formData.verificationMethod === 'public_key'
                      ? 'border-amber-500 bg-amber-500/5 shadow-[0_4px_20px_rgba(245,158,11,0.15)] dark:border-amber-500/75'
                      : 'border-slate-200 dark:border-slate-800 hover:border-slate-350 dark:hover:border-slate-700 bg-transparent'
                    }`}
                >
                  <div className="flex items-start space-x-3">
                    <div className={`p-2 rounded-lg ${formData.verificationMethod === 'public_key' ? 'bg-amber-500 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-500'}`}>
                      <Shield className="h-4 w-4" />
                    </div>
                    <div>
                      <h4 className="font-bold text-sm text-slate-800 dark:text-slate-200">PGP Key Mode (Stealth)</h4>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">Best for high confidentiality, whistleblowers, or political targets. Bypasses emails to eliminate digital trails. Files are encrypted locally with the nominee's public key.</p>
                    </div>
                  </div>
                  {formData.verificationMethod === 'public_key' && (
                    <div className="absolute top-2 right-2 h-2.5 w-2.5 rounded-full bg-amber-500 animate-pulse" />
                  )}
                </div>
              </div>
            </div>

            {formData.verificationMethod === 'public_key' && (
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-200">PGP Public Key *</label>
                  <button
                    type="button"
                    onClick={() => setShowPgpHelp(!showPgpHelp)}
                    className="text-xs text-amber-600 dark:text-amber-400 hover:underline flex items-center gap-1"
                  >
                    <HelpCircle className="h-3.5 w-3.5" />
                    {showPgpHelp ? "Hide Guide" : "What is PGP? / Easy Guide"}
                  </button>
                </div>

                {showPgpHelp && (
                  <div className="bg-amber-50 dark:bg-amber-500/10 border border-amber-250 dark:border-amber-500/25 p-4 rounded-xl text-xs space-y-3 text-slate-600 dark:text-slate-350 animate-fadeIn max-h-[380px] overflow-y-auto leading-relaxed">
                    <div className="bg-amber-500/10 dark:bg-amber-500/20 p-3 rounded-lg border border-amber-500/20 mb-2">
                      <p className="font-bold text-amber-850 dark:text-amber-300 flex items-center gap-1">
                        <HelpCircle className="h-4 w-4 text-amber-600 dark:text-amber-400" />
                        💡 Short & Simple Explanation:
                      </p>
                      <p className="text-[11.5px] mt-1 text-slate-700 dark:text-slate-200">
                        Use this mode if you want to keep the setup a <strong>secret or surprise</strong> from your nominee. No verification email will be sent to their inbox right now. You just need to paste their Encryption Key (Public Key) below to lock your files securely.
                      </p>
                    </div>

                    <div>
                      <p className="font-bold text-amber-700 dark:text-amber-400 mb-1">🔑 How PGP Works (Lock & Key Analogy)</p>
                      <p>
                        PGP works exactly like a physical **Lock** and **Key**:
                      </p>
                      <ul className="list-disc pl-4 mt-1 space-y-1 text-slate-500 dark:text-slate-400">
                        <li>
                          <strong>Public Key (The Lock):</strong> This is a digital lock that you get from your nominee and paste here. We use this lock to encrypt your files. It is 100% safe to share.
                        </li>
                        <li>
                          <strong>Private Key (The Key):</strong> This is the key that only your nominee has. When the protocol triggers, they will use their secret key to unlock and open your files.
                        </li>
                      </ul>
                    </div>

                    <div className="border-t border-amber-200/50 dark:border-amber-500/20 pt-2">
                      <p className="font-bold text-amber-700 dark:text-amber-400 mb-1">🛠️ How to get your Nominee's PGP Key? (Quick Steps)</p>
                      <div className="space-y-2 mt-1 pl-1">
                        <div>
                          <strong className="text-[11px] text-slate-700 dark:text-slate-300">Option A: Ask your nominee for their Public Key</strong>
                          <p className="text-[10.5px] text-slate-500 mt-0.5">
                            If your nominee already knows PGP, ask them to copy and send their **PGP Public Key** to you, then paste it in the box below.
                          </p>
                        </div>
                        <div>
                          <strong className="text-[11px] text-slate-700 dark:text-slate-300">Option B: Generate a new key pair</strong>
                          <p className="text-[10.5px] text-slate-500 mt-0.5">
                            Install a free tool on your nominee's device to generate a key pair:<br />
                            - <strong>Windows:</strong> Download <a href="https://gpg4win.org/" target="_blank" rel="noreferrer" className="underline text-amber-600 hover:text-amber-750 dark:text-amber-400 font-semibold">Gpg4win (Kleopatra)</a> → Open it and click <strong>New certificate / Key Pair</strong> → Enter Name/Email and set a strong passphrase.<br />
                            - <strong>Mac:</strong> Download <a href="https://gpgtools.org/" target="_blank" rel="noreferrer" className="underline text-amber-600 hover:text-amber-750 dark:text-amber-400 font-semibold">GPG Suite</a>.<br />
                            - <strong>Linux:</strong> Open terminal and run: <code>gpg --full-generate-key</code>.
                          </p>
                        </div>
                        <div>
                          <strong className="text-[11px] text-slate-700 dark:text-slate-300">Step 3: Copy and paste the Public Key</strong>
                          <p className="text-[10.5px] text-slate-500 mt-0.5">
                            Once generated, click **Export** or copy the key. Copy the entire text block starting with <code>-----BEGIN PGP PUBLIC KEY BLOCK-----</code> and paste it in the box below!
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                <textarea
                  className="input-premium w-full h-56 font-mono text-xs py-3 px-4 resize-y focus:ring-1 focus:ring-amber-500"
                  placeholder="-----BEGIN PGP PUBLIC KEY BLOCK-----&#10;...&#10;-----END PGP PUBLIC KEY BLOCK-----"
                  value={formData.pgpPublicKey}
                  onChange={(e) => setFormData(prev => ({ ...prev, pgpPublicKey: e.target.value }))}
                  required
                />
                <p className="text-[11px] text-slate-500 dark:text-slate-450 mt-1">
                  Paste the nominee's PGP Public Key. We use this key to locally encrypt files so only the nominee can read them.
                </p>
              </div>
            )}

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

            {formData.verificationMethod === 'email' ? (
              <div className="bg-blue-50 dark:bg-blue-500/10 border border-blue-200 dark:border-blue-500/20 p-4 rounded-xl">
                <div className="flex items-start space-x-3">
                  <Shield className="h-5 w-5 text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" />
                  <div className="text-sm text-slate-700 dark:text-slate-300">
                    <p className="font-medium text-blue-700 dark:text-blue-300 mb-1">Standard Email Verification</p>
                    <p className="text-xs">The nominee will get an email with a 6-digit code to verify their access. When the switch triggers, the files are released to their email.</p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-amber-50 dark:bg-amber-500/10 border border-amber-200 dark:border-amber-500/20 p-4 rounded-xl">
                <div className="flex items-start space-x-3">
                  <Shield className="h-5 w-5 text-amber-600 dark:text-amber-400 mt-0.5 flex-shrink-0" />
                  <div className="text-sm text-slate-700 dark:text-slate-300">
                    <p className="font-medium text-amber-700 dark:text-amber-300 mb-1">PGP Stealth Mode (No Immediate Email)</p>
                    <p className="text-xs text-slate-600 dark:text-slate-400">Perfect for high confidentiality. No verification email is sent to the nominee's inbox right now, leaving zero digital trail. When the switch triggers, files are encrypted with this PGP key before being sent.</p>
                  </div>
                </div>
              </div>
            )}

            <div className="flex flex-col sm:flex-row gap-3">
              <button
                type="submit"
                className="btn-premium w-full sm:flex-1 justify-center py-4 disabled:opacity-50 disabled:cursor-not-allowed"
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
                className="w-full sm:w-auto px-8 py-4 rounded-xl border-2 border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-200 font-semibold hover:bg-slate-50 dark:hover:bg-slate-800/50 hover:border-blue-500/50 transition-all duration-300 flex items-center justify-center"
              >
                <X className="h-5 w-5 mr-2" />
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
      <Portal>
        <AnimatePresence>
          {verifyingBeneficiary && (
            <div className="fixed inset-0 z-50 flex items-start justify-center p-4 bg-black/75 backdrop-blur-sm overflow-y-auto">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="bg-slate-900 border border-slate-800 p-8 md:p-10 rounded-3xl max-w-lg w-full text-slate-100 shadow-2xl relative my-8 md:my-16"
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
                    <div className="icon-container w-14 h-14 mx-auto bg-amber-500/10 border border-amber-500/20 rounded-2xl flex items-center justify-center mb-4">
                      <Mail className="size-7 text-amber-400" />
                    </div>
                    <h3 className="text-2xl font-bold text-white">Verify Nominee Email</h3>
                    <p className="text-sm text-slate-400 mt-2">
                      We sent a 6-digit verification code to <span className="text-white font-bold">{verifyingBeneficiary.email}</span>
                    </p>
                  </div>

                  <div className="space-y-3">
                    <label className="text-xs uppercase tracking-widest text-slate-450 font-bold block">
                      Verification Code
                    </label>
                    <input
                      type="text"
                      maxLength={6}
                      placeholder="000000"
                      value={verificationOtp}
                      onChange={(e) => setVerificationOtp(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-4 text-center text-3xl font-mono tracking-[0.5em] text-white focus:outline-none focus:border-amber-500 focus:ring-4 focus:ring-amber-500/20 transition-all"
                    />
                    <div className="flex justify-between items-center px-1">
                      <p className="text-xs text-slate-400">
                        Enter the code sent to your nominee's email.
                      </p>
                      <button
                        onClick={() => handleSendVerificationCode(verifyingBeneficiary)}
                        disabled={isSendingCode}
                        className="text-xs text-amber-400 hover:text-amber-300 font-bold underline disabled:opacity-50 transition-colors"
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
                          try {
                            const apiEndpoint = process.env.NEXT_PUBLIC_API_URL || 'https://always-there-protocol-api.onrender.com'
                            await fetch(`${apiEndpoint}/api/beneficiaries/${verifyingBeneficiary.id}`, {
                              method: 'DELETE'
                            })
                          } catch (err) {
                            console.error('Failed to delete beneficiary from backend', err)
                          }
                          await refreshState()
                          await fetchAndSyncBeneficiaries()
                          toast.success('Nominee registration discarded')
                        }
                      }}
                      className="text-xs text-red-400 hover:text-red-300 font-bold underline cursor-pointer transition-colors"
                    >
                      Discard nominee registration
                    </button>
                  </div>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </Portal>
    </div>
  )
}