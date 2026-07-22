'use client'

import { useState, useEffect, useMemo, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import Image from 'next/image'
import { ethers } from 'ethers'
import QRCode from 'qrcode'
import CryptoJS from 'crypto-js'
import { Button } from '@/components/ui/button'
import { useSendTransaction, useChainId } from 'wagmi'
import { parseEther } from 'viem'
import { 
    Globe, 
    Shield, 
    Wallet, 
    Zap, 
    Fingerprint, 
    Lock, 
    ShieldCheck, 
    AlertOctagon, 
    Crown, 
    User, 
    ExternalLink, 
    Copy, 
    Check, 
    LogOut,
    Eye,
    Key,
    Database,
    HelpCircle,
    Bell,
    Clock,
    Users,
    Activity,
    Settings,
    FileText,
    Share2,
    Cpu,
    Trash2,
    ChevronRight,
    RefreshCw,
    MessageSquare,
    Send,
    Terminal,
    X,
    Upload,
    Mail
} from 'lucide-react'
import { translations, Language, getLanguage, setLanguage, subscribeI18n } from '@/utils/i18n'
import { API_URL } from '@/lib/api-config'
import WebStorageService, { AppState } from '@/lib/storage'
import { UpgradeModal } from '@/components/upgrade-modal'
import { toast } from 'sonner'
import { Portal } from '@/components/portal'
import { updateHeartbeatSettings } from '@/app/actions/heartbeat'

import { useSubscription } from '@/contexts/SubscriptionContext'
import { ALL_PLANS, PlanType } from '@/types/subscription'

export function SettingsDashboard() {
  const chainId = useChainId()
  const [lang, setLang] = useState<Language>('en')
  const [t, setT] = useState<any>(translations.en)
  const [profile, setProfile] = useState<any>(null)
  const [isProfileLoading, setIsProfileLoading] = useState(true)
  const [showRecoveryWizard, setShowRecoveryWizard] = useState(false)
  const [generatedWallet, setGeneratedWallet] = useState<{ address: string; privateKey: string } | null>(null)
  const [isLinking, setIsLinking] = useState(false)
  const [showPrivateKey, setShowPrivateKey] = useState(false)
  const [saveLocally, setSaveLocally] = useState(false)
  const [localPin, setLocalPin] = useState('')
  const [showMfaModal, setShowMfaModal] = useState(false)
  const [mfaQrCode, setMfaQrCode] = useState('')
  const [mfaSecret, setMfaSecret] = useState('')
  const [mfaCode, setMfaCode] = useState('')
  const [isMfaLoading, setIsMfaLoading] = useState(false)

  // Email Verification States
  const [showEmailVerifyModal, setShowEmailVerifyModal] = useState(false)
  const [emailVerifyCode, setEmailVerifyCode] = useState('')
  const [isVerifyingEmail, setIsVerifyingEmail] = useState(false)
  const [verificationPendingEmail, setVerificationPendingEmail] = useState('')
  const [resendCooldown, setResendCooldown] = useState(0)

  // Alternative Email Verification States
  const [alternativeEmailInput, setAlternativeEmailInput] = useState('')
  const [showAlternativeEmailVerifyModal, setShowAlternativeEmailVerifyModal] = useState(false)
  const [alternativeEmailVerifyCode, setAlternativeEmailVerifyCode] = useState('')
  const [isVerifyingAlternativeEmail, setIsVerifyingAlternativeEmail] = useState(false)
  const [alternativeVerificationPendingEmail, setAlternativeVerificationPendingEmail] = useState('')
  const [alternativeResendCooldown, setAlternativeResendCooldown] = useState(0)

  useEffect(() => {
    if (showEmailVerifyModal) {
      if (profile?.updatedAt) {
        const lastUpdated = new Date(profile.updatedAt).getTime()
        const diff = Date.now() - lastUpdated
        if (diff > 0 && diff < 15000) {
          const remaining = Math.ceil((15000 - diff) / 1000)
          if (remaining > 0) {
            setResendCooldown(remaining)
            return
          }
        }
        setResendCooldown(0)
      } else {
        setResendCooldown(15)
      }
    }
  }, [showEmailVerifyModal, profile?.updatedAt])

  useEffect(() => {
    if (showAlternativeEmailVerifyModal) {
      if (profile?.updatedAt) {
        const lastUpdated = new Date(profile.updatedAt).getTime()
        const diff = Date.now() - lastUpdated
        if (diff > 0 && diff < 15000) {
          const remaining = Math.ceil((15000 - diff) / 1000)
          if (remaining > 0) {
            setAlternativeResendCooldown(remaining)
            return
          }
        }
        setAlternativeResendCooldown(0)
      } else {
        setAlternativeResendCooldown(15)
      }
    }
  }, [showAlternativeEmailVerifyModal, profile?.updatedAt])

  useEffect(() => {
    if (resendCooldown > 0) {
      const timer = setTimeout(() => {
        setResendCooldown(resendCooldown - 1)
      }, 1000)
      return () => clearTimeout(timer)
    }
  }, [resendCooldown])

  useEffect(() => {
    if (alternativeResendCooldown > 0) {
      const timer = setTimeout(() => {
        setAlternativeResendCooldown(alternativeResendCooldown - 1)
      }, 1000)
      return () => clearTimeout(timer)
    }
  }, [alternativeResendCooldown])

  const fetchProfile = async () => {
    try {
      const token = localStorage.getItem('dwp_token')
      if (!token) return
      const apiEndpoint = API_URL
      const res = await fetch(`${apiEndpoint}/api/users/profile`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      if (res.ok) {
        const data = await res.json()
        setProfile(data)
      }
    } catch (err) {
      console.error("Error fetching profile:", err)
    } finally {
      setIsProfileLoading(false)
    }
  }

  const handleGenerateRecoveryKey = () => {
    const w = ethers.Wallet.createRandom()
    setGeneratedWallet({
      address: w.address,
      privateKey: w.privateKey
    })
    setShowPrivateKey(false)
  }

  const handleDownloadBackup = () => {
    if (!generatedWallet) return
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify({
      address: generatedWallet.address,
      privateKey: generatedWallet.privateKey,
      createdAt: new Date().toISOString(),
      note: "AlwaysThere Vault Recovery Key. Keep this file offline on a secure external device (USB drive)."
    }, null, 2))
    const downloadAnchor = document.createElement('a')
    downloadAnchor.setAttribute("href", dataStr)
    downloadAnchor.setAttribute("download", `always-there-recovery-key.json`)
    document.body.appendChild(downloadAnchor)
    downloadAnchor.click()
    downloadAnchor.remove()
    toast.success("Backup file downloaded! Copy it to your physical USB drive / Pendrive.")
  }

  const handleLinkRecoveryKey = async () => {
    if (!generatedWallet) return
    if (saveLocally && !localPin.trim()) {
      toast.error("Please enter a PIN/Password to secure your local vault.")
      return
    }
    setIsLinking(true)
    try {
      const token = localStorage.getItem('dwp_token')
      const apiEndpoint = API_URL
      const res = await fetch(`${apiEndpoint}/api/users/recovery-key`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ recoveryAddress: generatedWallet.address })
      })
      if (res.ok) {
        if (saveLocally) {
          // Encrypt private key using CryptoJS
          const encrypted = CryptoJS.AES.encrypt(generatedWallet.privateKey, localPin.trim()).toString()
          localStorage.setItem('always_there_recovery_vault', JSON.stringify({
            address: generatedWallet.address,
            encrypted
          }))
          toast.success("Recovery key securely encrypted and saved to this device!")
        }
        toast.success("Recovery key linked to your account successfully!")
        setGeneratedWallet(null)
        setShowRecoveryWizard(false)
        setSaveLocally(false)
        setLocalPin('')
        fetchProfile()
      } else {
        const err = await res.json().catch(() => null)
        throw new Error(err?.message || "Failed to link recovery address")
      }
    } catch (err: any) {
      toast.error(err.message || "Error linking recovery key")
    } finally {
      setIsLinking(false)
    }
  }

  const handleUnlinkRecoveryKey = async () => {
    if (!confirm("Are you sure you want to unlink your recovery key? You will lose offline recovery access until you link a new key.")) return
    setIsLinking(true)
    try {
      const token = localStorage.getItem('dwp_token')
      const apiEndpoint = API_URL
      const res = await fetch(`${apiEndpoint}/api/users/recovery-key`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ recoveryAddress: null })
      })
      if (res.ok) {
        toast.success("Recovery key unlinked successfully.")
        fetchProfile()
      } else {
        throw new Error("Failed to unlink key")
      }
    } catch (err: any) {
      toast.error(err.message || "Error unlinking key")
    } finally {
      setIsLinking(false)
    }
  }

  const handleEnableMFASetup = async () => {
    setIsMfaLoading(true)
    try {
      const token = localStorage.getItem('dwp_token')
      const apiEndpoint = API_URL
      const res = await fetch(`${apiEndpoint}/api/auth/mfa/enable`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      })
      if (res.ok) {
        const data = await res.json()
        setMfaSecret(data.secret)
        setMfaQrCode(data.qrCode)
        setShowMfaModal(true)
        setMfaCode('')
      } else {
        throw new Error("Failed to generate MFA secret.")
      }
    } catch (err: any) {
      toast.error(err.message || "Error enabling MFA setup")
    } finally {
      setIsMfaLoading(false)
    }
  }

  const handleVerifyMFASetup = async () => {
    if (!mfaCode.trim() || mfaCode.trim().length !== 6) {
      toast.error("Please enter a valid 6-digit code.")
      return
    }
    setIsMfaLoading(true)
    try {
      const token = localStorage.getItem('dwp_token')
      const apiEndpoint = API_URL /* 'http://localhost:7001' */
      const res = await fetch(`${apiEndpoint}/api/auth/mfa/verify-setup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ code: mfaCode.trim() })
      })
      if (res.ok) {
        toast.success("Two-Factor Authentication enabled successfully!")
        setShowMfaModal(false)
        fetchProfile()
      } else {
        const err = await res.json().catch(() => null)
        throw new Error(err?.message || "Invalid verification code.")
      }
    } catch (err: any) {
      toast.error(err.message || "Error verifying 2FA code.")
    } finally {
      setIsMfaLoading(false)
    }
  }

  const handleDisableMFA = async () => {
    if (!confirm("Are you sure you want to disable Two-Factor Authentication? Your account will be less secure.")) return
    setIsMfaLoading(true)
    try {
      const token = localStorage.getItem('dwp_token')
      const apiEndpoint = API_URL /* 'http://localhost:7001' */
      const res = await fetch(`${apiEndpoint}/api/auth/mfa/disable`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      })
      if (res.ok) {
        toast.success("Two-Factor Authentication disabled.")
        fetchProfile()
      } else {
        throw new Error("Failed to disable MFA.")
      }
    } catch (err: any) {
      toast.error(err.message || "Error disabling MFA")
    } finally {
      setIsMfaLoading(false)
    }
  }

  const handleVerifyEmailCode = async () => {
    if (!emailVerifyCode.trim() || emailVerifyCode.trim().length !== 6) {
      toast.error("Please enter a valid 6-digit code.")
      return
    }
    setIsVerifyingEmail(true)
    try {
      const token = localStorage.getItem('dwp_token')
      const apiEndpoint = API_URL
      const res = await fetch(`${apiEndpoint}/api/users/verify-email`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ code: emailVerifyCode.trim() })
      })
      if (res.ok) {
        const data = await res.json()
        if (data.success) {
          toast.success("Email verified successfully!")
          setShowEmailVerifyModal(false)
          setEmailVerifyCode('')
          fetchProfile()
        } else {
          toast.error(data.message || "Invalid verification code.")
        }
      } else {
        throw new Error("Failed to verify email code.")
      }
    } catch (err: any) {
      toast.error(err.message || "Error verifying email code.")
    } finally {
      setIsVerifyingEmail(false)
    }
  }

  const handleResendEmailCode = async () => {
    if (resendCooldown > 0) return
    setIsVerifyingEmail(true)
    try {
      const token = localStorage.getItem('dwp_token')
      const apiEndpoint = API_URL
      const res = await fetch(`${apiEndpoint}/api/users/resend-verification`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      if (res.ok) {
        toast.success("Verification code resent successfully!")
        setResendCooldown(15)
      } else {
        throw new Error("Failed to resend code.")
      }
    } catch (err: any) {
      toast.error(err.message || "Error resending code.")
    } finally {
      setIsVerifyingEmail(false)
    }
  }

  const handleDeleteEmail = async () => {
    try {
      const token = localStorage.getItem('dwp_token')
      if (!token) throw new Error('No authentication token found. Please reconnect your wallet.')

      const apiEndpoint = API_URL
      setIsUpdating(true)
      const res = await fetch(`${apiEndpoint}/api/users/delete-email`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      setIsUpdating(false)

      if (res.ok) {
        storage.saveSettings({ emailNotification: '' })
        localStorage.removeItem('dwp_user_email')
        const newState = await storage.getAppState()
        setAppState(newState)
        
        toast.success('Email removed successfully')
        setEmailInput('')
        fetchProfile()
      } else {
        toast.error('Failed to remove email')
      }
    } catch (err: any) {
      setIsUpdating(false)
      console.error('Failed to delete email:', err)
      toast.error('Error removing email', { description: err.message })
    }
  }

  const handleVerifyAlternativeEmailCode = async () => {
    if (!alternativeEmailVerifyCode.trim() || alternativeEmailVerifyCode.trim().length !== 6) {
      toast.error("Please enter a valid 6-digit code.")
      return
    }
    setIsVerifyingAlternativeEmail(true)
    try {
      const token = localStorage.getItem('dwp_token')
      const apiEndpoint = API_URL
      const res = await fetch(`${apiEndpoint}/api/users/verify-alternative-email`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ code: alternativeEmailVerifyCode.trim() })
      })
      if (res.ok) {
        const data = await res.json()
        if (data.success) {
          toast.success("Alternative email verified successfully!")
          setShowAlternativeEmailVerifyModal(false)
          setAlternativeEmailVerifyCode('')
          fetchProfile()
        } else {
          toast.error(data.message || "Invalid verification code.")
        }
      } else {
        throw new Error("Failed to verify alternative email code.")
      }
    } catch (err: any) {
      toast.error(err.message || "Error verifying alternative email code.")
    } finally {
      setIsVerifyingAlternativeEmail(false)
    }
  }

  const handleResendAlternativeEmailCode = async () => {
    if (alternativeResendCooldown > 0) return
    setIsVerifyingAlternativeEmail(true)
    try {
      const token = localStorage.getItem('dwp_token')
      const apiEndpoint = API_URL
      const res = await fetch(`${apiEndpoint}/api/users/resend-alternative-verification`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      if (res.ok) {
        toast.success("Alternative verification code resent successfully!")
        setAlternativeResendCooldown(15)
      } else {
        throw new Error("Failed to resend alternative code.")
      }
    } catch (err: any) {
      toast.error(err.message || "Error resending alternative code.")
    } finally {
      setIsVerifyingAlternativeEmail(false)
    }
  }

  const handleDeleteAlternativeEmail = async () => {
    if (!confirm("Are you sure you want to delete your alternative email? Protocol warnings will no longer be sent here.")) {
      return;
    }
    try {
      const token = localStorage.getItem('dwp_token')
      if (!token) throw new Error('No authentication token found. Please reconnect your wallet.')

      const apiEndpoint = API_URL
      setIsUpdating(true)
      const res = await fetch(`${apiEndpoint}/api/users/delete-alternative-email`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      setIsUpdating(false)

      if (res.ok) {
        localStorage.removeItem('dwp_alt_user_email')
        toast.success('Alternative email removed successfully')
        setAlternativeEmailInput('')
        fetchProfile()
      } else {
        toast.error('Failed to remove alternative email')
      }
    } catch (err: any) {
      setIsUpdating(false)
      console.error('Failed to delete alternative email:', err)
      toast.error('Error removing alternative email', { description: err.message })
    }
  }

  const handleSaveAlternativeEmail = async () => {
    if (!alternativeEmailInput) {
      toast.error("Please enter a valid email address.")
      return
    }

    // Prevent adding same email as primary
    if (alternativeEmailInput.toLowerCase() === (profile?.email || '').toLowerCase() ||
        alternativeEmailInput.toLowerCase() === (profile?.pendingEmail || '').toLowerCase()) {
      toast.error("This email is already your primary alert email.", { description: "Please enter a different email address for backup notifications." })
      return
    }

    // Prevent re-adding same verified alternative email
    if (profile?.alternativeEmailVerified && alternativeEmailInput.toLowerCase() === (profile?.alternativeEmail || '').toLowerCase()) {
      toast.info("This email is already verified as your alternative notification email.")
      return
    }

    setIsUpdating(true)
    try {
      const token = localStorage.getItem('dwp_token')
      const apiEndpoint = API_URL
      const res = await fetch(`${apiEndpoint}/api/users/profile`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ alternativeEmail: alternativeEmailInput })
      })
      setIsUpdating(false)

      if (res.ok) {
        const data = await res.json()
        toast.success('Alternative email configuration updated')
        if (data.alternativePendingEmail) {
          setAlternativeVerificationPendingEmail(data.alternativePendingEmail)
          setShowAlternativeEmailVerifyModal(true)
          setAlternativeResendCooldown(15)
          toast.info('Verification code sent to your alternative email!')
        }
        fetchProfile()
      } else {
        const err = await res.json().catch(() => null)
        toast.error('Failed to update alternative email', { description: err?.message || 'Error' })
      }
    } catch (err: any) {
      setIsUpdating(false)
      toast.error('Update failed', { description: err.message })
    }
  }

  const [appState, setAppState] = useState<AppState | null>(null)
  const [emailInput, setEmailInput] = useState('')
  const [walletAddress, setWalletAddress] = useState('')
  const [copied, setCopied] = useState(false)
  const [isUpdating, setIsUpdating] = useState(false)
  const [showUpgradeModal, setShowUpgradeModal] = useState(false)
  const [isProcessingPayment, setIsProcessingPayment] = useState(false)

  const { subscription } = useSubscription()
  const storage = WebStorageService.getInstance()

  useEffect(() => {
    const currentLang = getLanguage()
    setLang(currentLang)
    setT(translations[currentLang] || translations.en)

    const addr = localStorage.getItem('dwp_wallet_address') || '0x0000000000000000000000000000000000000000'
    setWalletAddress(addr)

    const loadState = async () => {
        const state = await storage.getAppState()
        setAppState(state)
        if (state?.settings?.emailNotification) {
          setEmailInput(state.settings.emailNotification)
        }
    }

    loadState()
    fetchProfile()

    const unsubscribe = subscribeI18n(() => {
      const newLang = getLanguage()
      setLang(newLang)
      setT(translations[newLang] || translations.en)
    })
    
    return unsubscribe
}, [])

  useEffect(() => {
    if (profile) {
      setEmailInput(profile.pendingEmail || profile.email || '')
      setAlternativeEmailInput(profile.alternativePendingEmail || profile.alternativeEmail || '')
    } else if (appState?.settings?.emailNotification && !emailInput) {
      setEmailInput(appState.settings.emailNotification)
    }
  }, [appState, profile])

  const copyToClipboard = () => {
    navigator.clipboard.writeText(walletAddress)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const updateSetting = async (key: keyof AppState['settings'], value: any) => {
    setIsUpdating(true)
    storage.saveSettings({ [key]: value })
    const newState = await storage.getAppState()
    setAppState(newState)
    
    // Auto-sync select options and toggle switch changes immediately to backend
    if (['timeLock', 'multiSig', 'sessionTimeout', 'storageProvider', 'testnetMode', 'gasPrice'].includes(key)) {
      await syncHeartbeatSettings(undefined, newState.settings.heartbeatInterval, newState.settings.gracePeriod)
    }
    
    setTimeout(() => setIsUpdating(false), 500)
  }

  const syncHeartbeatSettings = async (email?: string, interval?: number, grace?: number) => {
    try {
      const activeAddress = walletAddress || localStorage.getItem('dwp_wallet_address') || 'local'
      const activeEmail = email !== undefined ? email : emailInput
      const activeInterval = interval !== undefined ? interval : (appState?.settings?.heartbeatInterval || 7)
      const activeGrace = grace !== undefined ? grace : (appState?.settings?.gracePeriod || 30)
      const activeBuffer = appState?.settings?.bufferMisses || 3

      // Update local storage settings
      storage.saveSettings({ 
        emailNotification: activeEmail,
        heartbeatInterval: activeInterval,
        gracePeriod: activeGrace,
        bufferMisses: activeBuffer
      })
      
      const newState = await storage.getAppState()
      setAppState(newState)

      // If email is explicitly provided or updated, keep dwp_user_email in sync
      if (activeEmail) {
        localStorage.setItem('dwp_user_email', activeEmail)
      }

      setIsUpdating(true)
      const res = await updateHeartbeatSettings(activeAddress, activeInterval, activeGrace, activeBuffer)
      setIsUpdating(false)

      if (res.success) {
        toast.success('Protocol configuration updated')
        if (res.verificationRequired) {
          setVerificationPendingEmail(res.pendingEmail || activeEmail)
          setShowEmailVerifyModal(true)
          setResendCooldown(15)
          toast.info('Verification code sent to your new email address!')
        }
        fetchProfile()
      } else {
        toast.error('Sync to backend failed', { description: res.error })
      }
    } catch (err: any) {
      setIsUpdating(false)
      console.error('Failed to sync settings:', err)
      toast.error('Sync failed', { description: err.message })
    }
  }

  const heartbeatDaysLeft = useMemo(() => {
    if (!appState) return 0
    const last = appState.stats.lastHeartbeat || Date.now()
    const interval = appState.settings.heartbeatInterval || 7
    const nextDue = last + (interval * 24 * 60 * 60 * 1000)
    const diff = nextDue - Date.now()
    return Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)))
  }, [appState])

  const { sendTransactionAsync } = useSendTransaction()

  const handleUpgrade = async (method: 'PAYPAL' | 'CRYPTO' | 'STRIPE', referenceFromModal?: string) => {
    setIsProcessingPayment(true)
    toast.info(`Processing ${method} payment...`)
    
    try {
        const targetPlanId = subscription?.mode === 'decentralized' ? 'sovereign_pro' : 'professional';

        if (method === 'STRIPE') {
            const apiEndpoint = API_URL;
            const checkoutRes = await fetch(`${apiEndpoint}/subscription/checkout`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    userId: walletAddress,
                    planType: targetPlanId,
                    successUrl: `${window.location.origin}/dashboard?payment=success`,
                    cancelUrl: `${window.location.origin}/dashboard?payment=cancelled`,
                })
            });
            if (!checkoutRes.ok) {
                const errData = await checkoutRes.json().catch(() => null);
                throw new Error(errData?.message || 'Failed to initialize Stripe checkout session');
            }
            const checkoutData = await checkoutRes.json();
            if (checkoutData.url) {
                toast.success('Redirecting to secure Stripe checkout...');
                window.location.href = checkoutData.url;
                return;
            }
            throw new Error('No checkout URL returned from server');
        }

        let referenceStr = '';
        if (method === 'CRYPTO') {
            const companyWallet = process.env.NEXT_PUBLIC_CRYPTO_RECEIVE_WALLET || '0xFF38De9C8f7B6A4cf810EAcE53D3E8EA9Dac1178';
            
            // Determine active token based on connected chain
            let geckoId = 'ethereum';
            if (chainId === 137) {
                geckoId = 'matic-network';
            } else if (chainId === 1) {
                geckoId = 'ethereum';
            } else if (chainId === 11155111) {
                geckoId = 'ethereum';
            }

            let ethAmountStr = '0.01'; // Default backup
            try {
                toast.info("Fetching real-time exchange rate...");
                const priceRes = await fetch(`https://api.coingecko.com/api/v3/simple/price?ids=${geckoId}&vs_currencies=usd`);
                const priceData = await priceRes.json();
                const usdPrice = priceData[geckoId]?.usd;
                if (usdPrice && usdPrice > 0) {
                    ethAmountStr = (49.99 / usdPrice).toFixed(18);
                }
            } catch (err) {
                console.error("CoinGecko API failed, using fallback:", err);
                if (chainId === 137) {
                    ethAmountStr = (49.99 / 0.45).toFixed(18); // Fallback matic price
                } else {
                    ethAmountStr = (49.99 / 3000.00).toFixed(18); // Fallback eth price
                }
            }

            // Clean string formatting to avoid parsing failures
            const parsedAmount = parseFloat(ethAmountStr).toFixed(18);
            toast.info(`Sending ${parseFloat(parsedAmount).toFixed(6)} native tokens ($49.99 USD equivalent)...`);

            const txHash = await sendTransactionAsync({
                to: companyWallet as `0x${string}`,
                value: parseEther(parsedAmount),
            });
            toast.info(`Transaction submitted: ${txHash}. Verifying on blockchain...`);
            referenceStr = txHash;
        } else {
            // PAYPAL
            if (!referenceFromModal) throw new Error("PayPal payment was not completed.");
            referenceStr = referenceFromModal;
        }



        const response = await fetch(process.env.NEXT_PUBLIC_API_URL + '/api/payment/process', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                walletAddress,
                method,
                planId: targetPlanId,
                reference: referenceStr,
                chainId: chainId
            })
        })

        if (response.ok) {
            toast.success("Payment Successful! Premium Features Unlocked.")
            setShowUpgradeModal(false)
            // Reload state
            const newState = await storage.getAppState()
            setAppState(newState)
            window.location.reload()
        } else {
            throw new Error("Payment verification failed on backend")
        }
    } catch (e: any) {
        console.error(e);
        toast.error(`Payment failed: ${e.message || 'Please try again.'}`)
    } finally {
        setIsProcessingPayment(false)
    }
  }

  const totalUsedBytes = useMemo(() => {
      if (!appState) return 0
      return appState.assets.reduce((acc, asset) => acc + (asset.size || 0), 0)
  }, [appState])

  const isPremium = subscription?.plan && subscription.plan !== 'starter' && subscription.plan !== 'freedom_starter'
  const quotaBytes = subscription?.storageLimit || (isPremium ? 50 * 1024 * 1024 * 1024 : 500 * 1024 * 1024)
  const planInfo = subscription?.plan ? ALL_PLANS[subscription.plan as PlanType] : null
  const quotaGB = planInfo?.limits?.storageGB ?? (quotaBytes / (1024 * 1024 * 1024))
  const usagePercent = Math.min((totalUsedBytes / quotaBytes) * 100, 100)
  const isTrial = subscription?.status === 'trial'

  if (!appState) return <div className="p-8 text-center text-slate-500 font-mono">INITIALIZING KERNEL...</div>

  return (
    <div className="max-w-5xl mx-auto space-y-12 p-4 pb-24">
      {/* -- PAGE HEADER -- */}
      <div className="space-y-2">
        <h1 className="text-4xl font-black text-slate-900 dark:text-white tracking-tighter flex items-center gap-3">
            <Settings className="size-8 text-blue-500" />
            PROTOCOL SETTINGS
        </h1>
        <p className="text-slate-500 font-medium">Configure global parameters for the AlwaysThere decentralized digital will protocol.</p>
      </div>

      {/* -- SECTION: ACCOUNT -- */}
      <section className="space-y-6">
        <div className="flex items-center gap-3 border-b border-slate-200 dark:border-white/5 pb-2">
            <User className="size-5 text-slate-500 dark:text-slate-400" />
            <h2 className="text-sm font-black uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">Account</h2>
        </div>
        
        <Card className="bg-white dark:bg-slate-900/50 border-slate-200 dark:border-slate-800 shadow-xl overflow-hidden">
            <CardContent className="p-6">
                <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-6 w-full">
                    <div className="flex items-center gap-6">
                        <div className="size-16 shrink-0 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-500 p-0.5">
                            <div className="size-full bg-slate-50 dark:bg-slate-950 rounded-[14px] flex items-center justify-center text-blue-600 dark:text-blue-400 font-black">
                                {walletAddress.substring(2, 4).toUpperCase()}
                            </div>
                        </div>
                        <div className="space-y-1 text-left">
                            <div className="flex items-center justify-start gap-2">
                                <span className="text-slate-800 dark:text-white font-mono font-bold break-all">{walletAddress}</span>
                                <button onClick={copyToClipboard} className="text-slate-400 hover:text-slate-700 dark:text-slate-500 dark:hover:text-white transition-colors shrink-0">
                                    {copied ? <Check className="size-4 text-green-500" /> : <Copy className="size-4" />}
                                </button>
                            </div>
                            <div className="flex flex-wrap items-center justify-start gap-3">
                                <div className="flex items-center gap-1.5 px-2 py-0.5 bg-emerald-500/10 border border-emerald-500/20 rounded-md">
                                    <div className="size-1.5 rounded-full bg-emerald-500 animate-pulse" />
                                    <span className="text-[10px] font-bold text-emerald-500 uppercase tracking-tighter">Ethereum Mainnet</span>
                                </div>
                                <span className="text-[10px] font-bold text-slate-600 uppercase tracking-tighter">Protocol Version v1.0.0</span>
                            </div>
                        </div>
                    </div>
                    
                    <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0 mt-4 xl:mt-0 w-full xl:w-auto">
                        <Button variant="outline" className="bg-slate-100 dark:bg-white/5 border-slate-200 dark:border-white/10 hover:bg-slate-200 dark:hover:bg-white/10 text-slate-700 dark:text-slate-200 text-xs font-bold gap-2 whitespace-nowrap flex-1 sm:flex-none">
                            <Key className="size-3" /> Export Key
                        </Button>
                        <Button variant="outline" className="bg-red-50 dark:bg-red-500/10 border-red-200 dark:border-red-500/20 hover:bg-red-100 dark:hover:bg-red-500/20 text-red-600 dark:text-red-400 text-xs font-bold gap-2 whitespace-nowrap flex-1 sm:flex-none">
                            <LogOut className="size-3" /> Disconnect
                        </Button>
                        {!isPremium && (
                            <Button 
                                onClick={() => setShowUpgradeModal(true)}
                                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-bold text-[10px] uppercase h-10 rounded-xl shadow-lg shadow-blue-500/20 whitespace-nowrap flex-1 sm:flex-none"
                            >
                                <Crown className="size-3 mr-2" /> Upgrade to Premium
                            </Button>
                        )}
                    </div>
                </div>
            </CardContent>
        </Card>
      </section>

      {/* -- SECTION: HARDWARE RECOVERY & KEY BACKUP -- */}
      <section className="space-y-6">
        <div className="flex items-center gap-3 border-b border-slate-200 dark:border-white/5 pb-2">
            <Key className="size-5 text-blue-500" />
            <h2 className="text-sm font-black uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">Hardware Recovery & Key Backup</h2>
        </div>

        <Card className="bg-white dark:bg-slate-900/50 border-slate-200 dark:border-slate-800 shadow-xl overflow-hidden">
            <CardContent className="p-6 space-y-6">
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                    <div className="space-y-1">
                        <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                            Offline Recovery Credentials
                        </h3>
                        <p className="text-sm text-slate-500 max-w-xl">
                            Backup your authentication key to external physical hardware (USB drive/pendrive) or generate a printable QR recovery card to log in if you lose access to your primary Web3 wallet.
                        </p>
                    </div>
                    {profile?.recoveryAddress ? (
                        <Button 
                            onClick={handleUnlinkRecoveryKey}
                            disabled={isLinking}
                            variant="outline" 
                            className="bg-red-50 hover:bg-red-100 border-red-200 text-red-600 dark:bg-red-950/20 dark:hover:bg-red-950/30 dark:border-red-800/30 dark:text-red-400 text-xs font-bold gap-2 whitespace-nowrap self-stretch md:self-auto"
                        >
                            Unlink Key
                        </Button>
                    ) : (
                        <Button 
                            onClick={() => {
                                handleGenerateRecoveryKey()
                                setShowRecoveryWizard(true)
                            }}
                            className="bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs gap-2 whitespace-nowrap self-stretch md:self-auto shadow-md"
                        >
                            <Key className="size-3.5" /> Setup Recovery Key
                        </Button>
                    )}
                </div>

                <div className="p-4 bg-slate-50 dark:bg-slate-950/40 rounded-2xl border border-slate-200 dark:border-white/5 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                        <div className={`size-10 rounded-xl flex items-center justify-center ${profile?.recoveryAddress ? 'bg-emerald-500/10 text-emerald-500' : 'bg-amber-500/10 text-amber-500'}`}>
                            <Shield className="size-5" />
                        </div>
                        <div className="space-y-0.5">
                            <span className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest">Recovery Switch Status</span>
                            <div className="text-sm font-bold text-slate-900 dark:text-white font-mono">
                                {profile?.recoveryAddress ? (
                                    <span className="text-emerald-500 flex items-center gap-1.5 font-sans font-bold">
                                        <ShieldCheck className="size-4" /> Linked Recovery Address: <span className="font-mono text-xs">{profile.recoveryAddress}</span>
                                    </span>
                                ) : (
                                    <span className="text-amber-500 flex items-center gap-1.5 font-sans font-bold">
                                        Inactive / No Backup Configured
                                    </span>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
      </section>

      {/* 2FA Authenticator App Setup */}
      <section className="space-y-4">
        <div className="flex items-center gap-3 border-b border-slate-200 dark:border-white/5 pb-2">
            <Fingerprint className="size-5 text-emerald-500" />
            <h2 className="text-sm font-black uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">Two-Factor Authentication (MFA)</h2>
        </div>

        <Card className="bg-white dark:bg-slate-900/50 border-slate-200 dark:border-slate-800 shadow-xl overflow-hidden">
            <CardContent className="p-6 space-y-6">
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                    <div className="space-y-1">
                        <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                            Authenticator App Integration
                        </h3>
                        <p className="text-sm text-slate-500 max-w-xl">
                            Secure your account using standard TOTP authenticator apps like Google Authenticator or Microsoft Authenticator. Each login will require entering a rolling 6-digit code.
                        </p>
                    </div>
                    {profile?.twoFactorEnabled ? (
                        <Button 
                            onClick={handleDisableMFA}
                            disabled={isMfaLoading}
                            variant="outline" 
                            className="bg-red-50 hover:bg-red-100 border-red-200 text-red-600 dark:bg-red-950/20 dark:hover:bg-red-950/30 dark:border-red-800/30 dark:text-red-400 text-xs font-bold gap-2 whitespace-nowrap self-stretch md:self-auto"
                        >
                            Disable 2FA
                        </Button>
                    ) : (
                        <Button 
                            onClick={handleEnableMFASetup}
                            disabled={isMfaLoading}
                            className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs gap-2 whitespace-nowrap self-stretch md:self-auto shadow-md"
                        >
                            <Fingerprint className="size-3.5" /> Enable Authenticator 2FA
                        </Button>
                    )}
                </div>

                <div className="p-4 bg-slate-50 dark:bg-slate-950/40 rounded-2xl border border-slate-200 dark:border-white/5 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                        <div className={`size-10 rounded-xl flex items-center justify-center ${profile?.twoFactorEnabled ? 'bg-emerald-500/10 text-emerald-500' : 'bg-amber-500/10 text-amber-500'}`}>
                            <Shield className="size-5" />
                        </div>
                        <div className="space-y-0.5">
                            <span className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest">MFA Status</span>
                            <div className="text-sm font-bold text-slate-900 dark:text-white font-mono">
                                {profile?.twoFactorEnabled ? (
                                    <span className="text-emerald-500 flex items-center gap-1.5 font-sans font-bold">
                                        <ShieldCheck className="size-4" /> Enabled (Google / Microsoft Authenticator)
                                    </span>
                                ) : (
                                    <span className="text-amber-500 flex items-center gap-1.5 font-sans font-bold">
                                        Disabled / Setup recommended
                                    </span>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
      </section>

      {/* MFA Setup & Verification Modal */}
      <AnimatePresence>
        {showMfaModal && (
          <Portal>
            <div className="fixed inset-0 z-50 flex items-start justify-center p-4 bg-black/75 backdrop-blur-sm overflow-y-auto">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-slate-900 border border-slate-800 p-6 md:p-8 rounded-3xl max-w-lg w-full text-slate-100 shadow-2xl relative my-8 md:my-16"
            >
              <button 
                onClick={() => setShowMfaModal(false)}
                className="absolute top-4 right-4 p-2 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
              >
                <X className="size-5" />
              </button>

              <div className="space-y-6">
                <div className="text-center">
                  <div className="icon-container w-12 h-12 mx-auto bg-emerald-500/10 border border-emerald-500/20 rounded-xl flex items-center justify-center mb-3">
                    <Fingerprint className="size-6 text-emerald-400" />
                  </div>
                  <h3 className="text-xl font-bold text-white">Setup Authenticator App</h3>
                  <p className="text-xs text-slate-400 mt-1">Scan the QR code with Google Authenticator or Microsoft Authenticator.</p>
                </div>

                <div className="flex flex-col items-center justify-center p-4 bg-white rounded-2xl border border-slate-200">
                  <Image src={mfaQrCode} alt="MFA QR Code" width={192} height={192} className="size-48" unoptimized />
                  <p className="text-[10px] text-slate-500 mt-2 font-mono select-all">Secret: {mfaSecret}</p>
                </div>

                <div className="space-y-2">
                  <label className="text-[9px] uppercase tracking-widest text-slate-500 font-bold block">
                    Verify Code
                  </label>
                  <input 
                    type="text"
                    maxLength={6}
                    placeholder="000000"
                    value={mfaCode}
                    onChange={(e) => setMfaCode(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-center text-lg font-mono tracking-[0.5em] text-white focus:outline-none focus:border-blue-500"
                  />
                  <p className="text-[10px] text-slate-500 text-center leading-normal">
                    Enter the 6-digit rolling code generated in your app to confirm.
                  </p>
                </div>

                <div className="flex gap-3">
                  <Button 
                    onClick={() => setShowMfaModal(false)}
                    variant="outline"
                    className="flex-1 bg-transparent border-slate-800 text-slate-400 hover:text-white text-xs uppercase tracking-widest py-5 rounded-xl hover:bg-white/5"
                  >
                    Cancel
                  </Button>
                  <Button 
                    onClick={handleVerifyMFASetup}
                    disabled={isMfaLoading}
                    className="flex-1 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs uppercase tracking-widest py-5 rounded-xl shadow-lg"
                  >
                    Verify & Enable
                  </Button>
                </div>
              </div>
            </motion.div>
          </div>
          </Portal>
        )}
      </AnimatePresence>

      {/* Email Verification Modal */}
      <AnimatePresence>
        {showEmailVerifyModal && (
          <Portal>
            <div className="fixed inset-0 z-50 flex items-start justify-center p-4 bg-black/75 backdrop-blur-sm overflow-y-auto">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-slate-900 border border-slate-800 p-6 md:p-8 rounded-3xl max-w-lg w-full text-slate-100 shadow-2xl relative my-8 md:my-16"
            >
              <button 
                onClick={() => setShowEmailVerifyModal(false)}
                className="absolute top-4 right-4 p-2 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
              >
                <X className="size-5" />
              </button>

              <div className="space-y-6">
                <div className="text-center">
                  <div className="icon-container w-12 h-12 mx-auto bg-blue-500/10 border border-blue-500/20 rounded-xl flex items-center justify-center mb-3">
                    <Mail className="size-6 text-blue-400" />
                  </div>
                  <h3 className="text-xl font-bold text-white">Verify Your Email</h3>
                  <p className="text-xs text-slate-400 mt-1">We sent a 6-digit verification code to <span className="text-white font-bold">{verificationPendingEmail}</span></p>
                </div>

                <div className="space-y-2">
                  <label className="text-[9px] uppercase tracking-widest text-slate-500 font-bold block">
                    Verification Code
                  </label>
                  <input 
                    type="text"
                    maxLength={6}
                    placeholder="000000"
                    value={emailVerifyCode}
                    onChange={(e) => setEmailVerifyCode(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-center text-lg font-mono tracking-[0.5em] text-white focus:outline-none focus:border-blue-500"
                  />
                  <div className="flex justify-between items-center px-1">
                    <p className="text-[10px] text-slate-500">
                      Enter the code to verify your address.
                    </p>
                    <button 
                      onClick={handleResendEmailCode}
                      disabled={isVerifyingEmail || resendCooldown > 0}
                      className="text-[10px] text-blue-400 hover:text-blue-300 font-bold underline disabled:opacity-50"
                    >
                      {resendCooldown > 0 ? `Resend Code (${resendCooldown}s)` : "Resend Code"}
                    </button>
                  </div>
                </div>

                <div className="flex gap-3">
                  <Button 
                    onClick={() => setShowEmailVerifyModal(false)}
                    variant="outline"
                    className="flex-1 bg-transparent border-slate-800 text-slate-400 hover:text-white text-xs uppercase tracking-widest py-5 rounded-xl hover:bg-white/5"
                  >
                    Cancel
                  </Button>
                  <Button 
                    onClick={handleVerifyEmailCode}
                    disabled={isVerifyingEmail}
                    className="flex-1 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs uppercase tracking-widest py-5 rounded-xl shadow-lg"
                  >
                    {isVerifyingEmail ? "Verifying..." : "Verify & Save"}
                  </Button>
                </div>

                <div className="text-center pt-2">
                  <button
                    onClick={async () => {
                      if (confirm("Discard this verification and reset the email?")) {
                        setShowEmailVerifyModal(false)
                        await handleDeleteEmail()
                      }
                    }}
                    className="text-[10px] text-red-400 hover:text-red-300 font-bold underline cursor-pointer"
                  >
                    Discard verification request & clear email
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
          </Portal>
        )}
      </AnimatePresence>

      {/* Alternative Email Verification Modal */}
      <AnimatePresence>
        {showAlternativeEmailVerifyModal && (
          <Portal>
            <div className="fixed inset-0 z-50 flex items-start justify-center p-4 bg-black/75 backdrop-blur-sm overflow-y-auto">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-slate-900 border border-slate-800 p-6 md:p-8 rounded-3xl max-w-lg w-full text-slate-100 shadow-2xl relative my-8 md:my-16"
            >
              <button 
                onClick={() => setShowAlternativeEmailVerifyModal(false)}
                className="absolute top-4 right-4 p-2 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
              >
                <X className="size-5" />
              </button>

              <div className="space-y-6">
                <div className="text-center">
                  <div className="icon-container w-12 h-12 mx-auto bg-blue-500/10 border border-blue-500/20 rounded-xl flex items-center justify-center mb-3">
                    <Mail className="size-6 text-blue-400" />
                  </div>
                  <h3 className="text-xl font-bold text-white">Verify Alternative Email</h3>
                  <p className="text-xs text-slate-400 mt-1">We sent a 6-digit verification code to <span className="text-white font-bold">{alternativeVerificationPendingEmail}</span></p>
                </div>

                <div className="space-y-2">
                  <label className="text-[9px] uppercase tracking-widest text-slate-500 font-bold block">
                    Verification Code
                  </label>
                  <input 
                    type="text"
                    maxLength={6}
                    placeholder="000000"
                    value={alternativeEmailVerifyCode}
                    onChange={(e) => setAlternativeEmailVerifyCode(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-center text-lg font-mono tracking-[0.5em] text-white focus:outline-none focus:border-blue-500"
                  />
                  <div className="flex justify-between items-center px-1">
                    <p className="text-[10px] text-slate-500">
                      Enter the code to verify your address.
                    </p>
                    <button 
                      onClick={handleResendAlternativeEmailCode}
                      disabled={isVerifyingAlternativeEmail || alternativeResendCooldown > 0}
                      className="text-[10px] text-blue-400 hover:text-blue-300 font-bold underline disabled:opacity-50"
                    >
                      {alternativeResendCooldown > 0 ? `Resend Code (${alternativeResendCooldown}s)` : "Resend Code"}
                    </button>
                  </div>
                </div>

                <div className="flex gap-3">
                  <Button 
                    onClick={() => setShowAlternativeEmailVerifyModal(false)}
                    variant="outline"
                    className="flex-1 bg-transparent border-slate-800 text-slate-400 hover:text-white text-xs uppercase tracking-widest py-5 rounded-xl hover:bg-white/5"
                  >
                    Cancel
                  </Button>
                  <Button 
                    onClick={handleVerifyAlternativeEmailCode}
                    disabled={isVerifyingAlternativeEmail}
                    className="flex-1 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs uppercase tracking-widest py-5 rounded-xl shadow-lg"
                  >
                    {isVerifyingAlternativeEmail ? "Verifying..." : "Verify & Save"}
                  </Button>
                </div>

                <div className="text-center pt-2">
                  <button
                    onClick={async () => {
                      if (confirm("Discard this verification and reset the alternative email?")) {
                        setShowAlternativeEmailVerifyModal(false)
                        await handleDeleteAlternativeEmail()
                      }
                    }}
                    className="text-[10px] text-red-400 hover:text-red-300 font-bold underline cursor-pointer"
                  >
                    Discard verification request & clear email
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
          </Portal>
        )}
      </AnimatePresence>

      {/* Recovery Setup Wizard Dialog */}
      <AnimatePresence>
        {showRecoveryWizard && generatedWallet && (
          <Portal>
            <div className="fixed inset-0 z-50 flex items-start justify-center p-4 bg-black/75 backdrop-blur-sm overflow-y-auto">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-slate-900 border border-slate-800 p-6 md:p-8 rounded-3xl max-w-lg w-full text-slate-100 shadow-2xl relative my-8 md:my-16"
            >
              <button 
                onClick={() => setShowRecoveryWizard(false)}
                className="absolute top-4 right-4 p-2 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
              >
                <X className="size-5" />
              </button>

              <div className="space-y-6">
                <div className="text-center">
                  <div className="icon-container w-12 h-12 mx-auto bg-blue-500/10 border border-blue-500/20 rounded-xl flex items-center justify-center mb-3">
                    <Key className="size-6 text-blue-400" />
                  </div>
                  <h3 className="text-xl font-bold text-white">Setup Offline Recovery Key</h3>
                  <p className="text-xs text-slate-400 mt-1">Export, download, or print your backup credentials.</p>
                </div>

                {/* Warning */}
                <div className="bg-amber-500/10 border border-amber-500/20 p-4 rounded-xl text-xs text-amber-400/90 space-y-1">
                  <p className="font-bold flex items-center gap-1">⚠️ IMPORTANT SECURITY WARNING</p>
                  <p>Do NOT share this recovery key with anyone. This key grants full recovery access to your wills, digital assets, and sensitive files. Keep it offline in a secure physical location.</p>
                </div>

                {/* Key details */}
                <div className="space-y-4 bg-slate-950 p-4 rounded-xl border border-slate-800">
                  <div className="space-y-1">
                    <span className="text-[9px] uppercase tracking-widest text-slate-500 font-bold">Generated Recovery Address</span>
                    <p className="text-xs font-mono text-slate-300 break-all select-all">{generatedWallet.address}</p>
                  </div>

                  <div className="space-y-1">
                    <span className="text-[9px] uppercase tracking-widest text-slate-500 font-bold">Recovery Private Key</span>
                    {showPrivateKey ? (
                      <p className="text-xs font-mono text-amber-400 break-all select-all">{generatedWallet.privateKey}</p>
                    ) : (
                      <div className="flex items-center justify-between">
                        <p className="text-xs font-mono text-slate-500">••••••••••••••••••••••••</p>
                        <button 
                          onClick={() => setShowPrivateKey(true)} 
                          className="text-[10px] font-bold text-blue-400 hover:text-blue-300 uppercase underline"
                        >
                          Reveal Key
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                {/* Save Locally Option */}
                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-3">
                  <label className="flex items-center gap-3 cursor-pointer select-none">
                    <input 
                      type="checkbox" 
                      checked={saveLocally}
                      onChange={(e) => {
                        setSaveLocally(e.target.checked);
                        if (!e.target.checked) setLocalPin('');
                      }}
                      className="rounded border-slate-700 bg-slate-800 text-blue-500 focus:ring-blue-500 size-4"
                    />
                    <span className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
                      <Fingerprint className="size-4 text-emerald-400" /> Save to this device for Quick Login
                    </span>
                  </label>

                  {saveLocally && (
                    <motion.div 
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      className="space-y-2 pt-2 border-t border-slate-800"
                    >
                      <label className="text-[9px] uppercase tracking-widest text-slate-500 font-bold block">
                        Set secure PIN or Password
                      </label>
                      <input 
                        type="password"
                        placeholder="Enter PIN (e.g. 123456) or Password"
                        value={localPin}
                        onChange={(e) => setLocalPin(e.target.value)}
                        className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-blue-500 font-mono"
                      />
                      <p className="text-[10px] text-slate-500 leading-normal">
                        This encrypts your key locally in this browser. You will need this PIN/Password to decrypt and log in.
                      </p>
                    </motion.div>
                  )}
                </div>

                {/* Print / QR Display */}
                <div className="flex flex-col items-center justify-center space-y-3 bg-white p-4 rounded-2xl">
                  <canvas ref={(el) => {
                    if (el && generatedWallet) {
                      QRCode.toCanvas(
                        el,
                        generatedWallet.privateKey,
                        {
                          width: 180,
                          margin: 2,
                          color: {
                            dark: '#0f172a',
                            light: '#ffffff'
                          }
                        },
                        (err) => {
                          if (err) console.error("Error generating QR code:", err)
                        }
                      )
                    }
                  }} />
                  <span className="text-[10px] text-slate-800 font-bold uppercase tracking-wider">Printable Recovery QR Code</span>
                </div>

                {/* Actions */}
                <div className="space-y-3">
                  <Button 
                    onClick={handleDownloadBackup}
                    className="w-full bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs uppercase tracking-widest py-5 rounded-xl border border-slate-700 flex items-center justify-center gap-2"
                  >
                    <Upload className="size-4 rotate-180" /> Download Key Backup (.json)
                  </Button>

                  <div className="flex gap-3">
                    <Button 
                      onClick={() => setShowRecoveryWizard(false)}
                      variant="outline"
                      className="flex-1 bg-transparent border-slate-800 text-slate-400 hover:text-white text-xs uppercase tracking-widest py-5 rounded-xl hover:bg-white/5"
                    >
                      Cancel
                    </Button>
                    <Button 
                      onClick={handleLinkRecoveryKey}
                      disabled={isLinking}
                      className="flex-1 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs uppercase tracking-widest py-5 rounded-xl shadow-lg"
                    >
                      {isLinking ? "Linking..." : "Confirm & Link"}
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
          </Portal>
        )}
      </AnimatePresence>

      {/* -- SECTION: SUBSCRIPTION -- */}
      <section className="space-y-6">
        <div className="flex items-center gap-3 border-b border-slate-200 dark:border-white/5 pb-2">
            <Database className="size-5 text-indigo-400" />
            <h2 className="text-sm font-black uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">Subscription Status</h2>
        </div>
        
        <Card className="bg-white dark:bg-slate-900/40 border-slate-200 dark:border-slate-800">
            <CardContent className="p-6">
                <div className="flex items-center justify-between">
                    <div className="space-y-1">
                        <div className="flex items-center gap-2">
                            <span className="text-lg font-black text-slate-900 dark:text-white">{quotaGB.toFixed(2)} GB Total Quota</span>
                            <span className={`px-2 py-0.5 rounded border text-[8px] font-black uppercase tracking-widest ${isPremium ? 'bg-blue-500/10 border-blue-500/20 text-blue-400' : isTrial ? 'bg-orange-500/10 border-orange-500/20 text-orange-400' : 'bg-slate-100 dark:bg-slate-500/10 border-slate-200 dark:border-slate-500/20 text-slate-600 dark:text-slate-400'}`}>
                                {isPremium ? 'Premium Active' : isTrial ? 'Trial Active' : 'Free Tier'}
                            </span>
                        </div>
                        <p className="text-xs text-slate-500">
                            {subscription?.subscriptionEndsAt 
                                ? `Expiring on: **${new Date(subscription.subscriptionEndsAt).toLocaleDateString()}**` 
                                : 'No expiry set'} (Automatic Fail-Safe Enabled)
                        </p>
                    </div>
                    <div className="text-right">
                        <div className="text-xl font-black text-slate-900 dark:text-white">{usagePercent.toFixed(2)}%</div>
                        <div className="text-[10px] font-bold text-slate-500 dark:text-slate-600 uppercase">Usage</div>
                    </div>
                </div>
                <div className="mt-4 w-full h-2 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
                    <div 
                        className={`h-full shadow-[0_0_10px_rgba(59,130,246,0.5)] ${usagePercent > 90 ? 'bg-red-500' : usagePercent > 75 ? 'bg-orange-500' : 'bg-blue-500'}`} 
                        style={{ width: `${Math.max(usagePercent, 0.5)}%` }}
                    />
                </div>
                <div className="mt-2 text-right">
                    <span className="text-[10px] text-slate-500 font-mono">{(totalUsedBytes / (1024 * 1024)).toFixed(2)} MB / {Math.round(quotaBytes / (1024 * 1024))} MB</span>
                </div>
            </CardContent>
        </Card>
      </section>

      {/* -- SECTION: AlwaysThere CORE -- */}
      <section className="space-y-6">
        <div className="flex items-center gap-3 border-b border-slate-200 dark:border-white/5 pb-4">
          <Shield className="w-5 h-5 text-[#2b52ff]" />
          <div>
            <h2 className="text-base font-black uppercase tracking-[0.2em] text-slate-900 dark:text-white">AlwaysThere Core (Protocol Lifecycle Config)</h2>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="bg-white dark:bg-white/[0.02] border-slate-200 dark:border-white/10 backdrop-blur-xl">
                <CardHeader>
                    <CardTitle className="text-base flex items-center gap-2 font-black text-slate-950 dark:text-white">
                        <Clock className="size-4 text-blue-500 dark:text-blue-400" />
                        Heartbeat Parameters
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <div className="flex justify-between items-center">
                                <label className="text-xs font-extrabold text-slate-800 dark:text-slate-200 uppercase tracking-wider">Heartbeat Interval</label>
                                <span className="text-blue-600 dark:text-blue-400 font-mono font-black text-base">{appState.settings.heartbeatInterval} Days</span>
                            </div>
                            <input 
                                type="range" min="1" max="90" 
                                value={appState.settings.heartbeatInterval}
                                onChange={(e) => updateSetting('heartbeatInterval', parseInt(e.target.value))}
                                onMouseUp={() => syncHeartbeatSettings(undefined, appState.settings.heartbeatInterval, appState.settings.gracePeriod)}
                                onTouchEnd={() => syncHeartbeatSettings(undefined, appState.settings.heartbeatInterval, appState.settings.gracePeriod)}
                                className="w-full h-1.5 bg-slate-200 dark:bg-slate-800 rounded-full appearance-none cursor-pointer accent-blue-500"
                            />
                        </div>

                        <div className="space-y-2">
                            <div className="flex justify-between items-center">
                                <label className="text-xs font-extrabold text-slate-800 dark:text-slate-200 uppercase tracking-wider">Grace Period</label>
                                <span className="text-orange-600 dark:text-orange-400 font-mono font-black text-base">{appState.settings.gracePeriod} Days</span>
                            </div>
                            <input 
                                type="range" min="1" max="60" 
                                value={appState.settings.gracePeriod}
                                onChange={(e) => updateSetting('gracePeriod', parseInt(e.target.value))}
                                onMouseUp={() => syncHeartbeatSettings(undefined, appState.settings.heartbeatInterval, appState.settings.gracePeriod)}
                                onTouchEnd={() => syncHeartbeatSettings(undefined, appState.settings.heartbeatInterval, appState.settings.gracePeriod)}
                                className="w-full h-1.5 bg-slate-200 dark:bg-slate-800 rounded-full appearance-none cursor-pointer accent-orange-500"
                            />
                        </div>
                    </div>
                </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-blue-600/5 to-indigo-600/5 dark:from-blue-600/10 dark:to-indigo-600/10 border-blue-200 dark:border-blue-500/20 shadow-lg relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-10">
                    <Zap className="size-24 -mr-8 -mt-8 text-blue-400" />
                </div>
                <CardHeader>
                    <CardTitle className="text-base flex items-center gap-2 text-slate-900 dark:text-white">
                        <Activity className="size-4 text-blue-500 dark:text-blue-400" />
                        Live Status
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6 relative z-10">
                    <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-950/40 rounded-2xl border border-slate-200 dark:border-white/5">
                        <div className="space-y-1">
                            <span className="text-[10px] font-black text-slate-500 dark:text-slate-500 uppercase tracking-widest">Protocol Integrity</span>
                            <div className="text-xl font-black text-slate-900 dark:text-white">{heartbeatDaysLeft} Days Remaining</div>
                            <p className="text-[10px] text-slate-500 font-medium">Until beneficiary execution trigger</p>
                        </div>
                        <Button className="bg-blue-600 hover:bg-blue-500 text-white font-black text-xs px-4 h-10 rounded-xl shadow-[0_0_20px_rgba(37,99,235,0.3)]">
                            SEND PULSE
                        </Button>
                    </div>
                    <div className="flex justify-between px-2">
                        <div className="text-center">
                            <div className="text-xs font-mono font-bold text-slate-600 dark:text-slate-400">APR 19, 2026</div>
                            <div className="text-[8px] font-black text-slate-500 dark:text-slate-600 uppercase tracking-tighter">Last Heartbeat</div>
                        </div>
                        <div className="text-center">
                            <div className="text-xs font-mono font-bold text-slate-600 dark:text-slate-400">APR 26, 2026</div>
                            <div className="text-[8px] font-black text-slate-500 dark:text-slate-600 uppercase tracking-tighter">Next Due</div>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
      </section>

      {/* -- SECTION: BENEFICIARIES -- */}
      <section className="space-y-6">
        <div className="flex items-center gap-3 border-b border-slate-200 dark:border-white/5 pb-2">
            <Users className="size-5 text-emerald-500 dark:text-emerald-400" />
            <h2 className="text-sm font-black uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">Beneficiary Registry</h2>
        </div>

        <Card className="bg-white dark:bg-white/[0.02] border-slate-200 dark:border-white/10">
            <CardContent className="p-6 space-y-4">
                <div className="flex items-center justify-between">
                    <div className="space-y-1">
                        <h3 className="text-slate-900 dark:text-white font-bold">Distribution Summary</h3>
                        <p className="text-xs text-slate-500">Currently mapping {appState.stats.totalBeneficiaries} unique addresses.</p>
                    </div>
                    <Button variant="ghost" className="text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300 font-bold text-xs gap-1">
                        Manage Registry <ChevronRight className="size-3" />
                    </Button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {appState.beneficiaries.slice(0, 3).map((ben, idx) => (
                        <div key={idx} className="p-3 bg-slate-50 dark:bg-white/5 rounded-xl border border-slate-200 dark:border-white/5 flex items-center gap-3">
                            <div className="size-8 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-600 dark:text-emerald-400 text-xs font-bold">
                                {idx + 1}
                            </div>
                            <div className="flex-1 overflow-hidden">
                                <div className="text-slate-900 dark:text-white text-xs font-bold truncate">{ben.name}</div>
                                <div className="text-[10px] text-slate-500 font-mono truncate">{ben.walletAddress}</div>
                            </div>
                        </div>
                    ))}
                    {appState.beneficiaries.length === 0 && (
                        <div className="md:col-span-3 p-8 text-center text-slate-600 dark:text-slate-600 font-mono text-xs border-2 border-dashed border-slate-200 dark:border-white/5 rounded-2xl">
                            NO BENEFICIARIES MAPPED IN THIS VAULT
                        </div>
                    )}
                </div>
            </CardContent>
        </Card>
      </section>

      {/* -- SECTION: SECURITY -- */}
      <section className="space-y-6">
        <div className="flex items-center gap-3 border-b border-slate-200 dark:border-white/5 pb-2">
            <ShieldCheck className="size-5 text-orange-500 dark:text-orange-400" />
            <h2 className="text-sm font-black uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">Security & Trust</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="bg-white dark:bg-white/[0.02] border-slate-200 dark:border-white/10">
                <CardContent className="p-6 space-y-6">
                    <div className="flex items-center justify-between">
                        <div className="space-y-0.5 text-left">
                            <div className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                                <Clock className="size-3.5 text-slate-500" />
                                Execution Time Lock
                            </div>
                            <p className="text-[10px] text-slate-500 uppercase font-black">Delay before assets release</p>
                        </div>
                        <select 
                            value={appState.settings.timeLock}
                            onChange={(e) => updateSetting('timeLock', parseInt(e.target.value))}
                            className="bg-white dark:bg-slate-950 border border-slate-200 dark:border-white/10 rounded-lg text-xs font-bold text-slate-800 dark:text-white px-3 py-1.5 outline-none"
                        >
                            <option value={0}>Instant</option>
                            <option value={24}>24 Hours</option>
                            <option value={48}>48 Hours</option>
                            <option value={168}>7 Days</option>
                        </select>
                    </div>

                    <div className="flex items-center justify-between">
                        <div className="space-y-0.5 text-left">
                            <div className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                                <Share2 className="size-3.5 text-slate-500" />
                                Multi-Sig Distribution
                            </div>
                            <p className="text-[10px] text-slate-500 uppercase font-black">Required shares for decryption</p>
                        </div>
                        <select 
                            value={appState.settings.multiSig}
                            onChange={(e) => updateSetting('multiSig', e.target.value)}
                            className="bg-white dark:bg-slate-950 border border-slate-200 dark:border-white/10 rounded-lg text-xs font-bold text-slate-800 dark:text-white px-3 py-1.5 outline-none"
                        >
                            <option value="off">Disabled</option>
                            <option value="2of3">2 of 3 Shards</option>
                            <option value="3of5">3 of 5 Shards</option>
                        </select>
                    </div>
                </CardContent>
            </Card>

            <Card className="bg-white dark:bg-white/[0.02] border-slate-200 dark:border-white/10">
                <CardContent className="p-6 space-y-6">
                    <div className="flex items-center justify-between">
                        <div className="space-y-0.5 text-left">
                            <div className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                                <Fingerprint className="size-3.5 text-slate-500" />
                                Biometric Verification
                            </div>
                        </div>
                        <div className="w-10 h-5 bg-slate-200 dark:bg-slate-800 rounded-full p-1 cursor-not-allowed opacity-50">
                            <div className="size-3 bg-slate-400 dark:bg-slate-600 rounded-full" />
                        </div>
                    </div>

                    <div className="flex items-center justify-between">
                        <div className="space-y-0.5 text-left">
                            <div className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                                <Lock className="size-3.5 text-slate-500" />
                                Session Timeout
                            </div>
                        </div>
                        <select 
                            value={appState.settings.sessionTimeout}
                            onChange={(e) => updateSetting('sessionTimeout', parseInt(e.target.value))}
                            className="bg-white dark:bg-slate-950 border border-slate-200 dark:border-white/10 rounded-lg text-xs font-bold text-slate-800 dark:text-white px-3 py-1.5 outline-none"
                        >
                            <option value={15}>15 Mins</option>
                            <option value={30}>30 Mins</option>
                            <option value={60}>1 Hour</option>
                        </select>
                    </div>
                </CardContent>
            </Card>
        </div>
      </section>

      {/* -- SECTION: NOTIFICATIONS -- */}
      <section className="space-y-6">
        <div className="flex items-center gap-3 border-b border-slate-200 dark:border-white/5 pb-2">
            <Bell className="size-5 text-purple-500 dark:text-purple-400" />
            <h2 className="text-sm font-black uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">Notifications</h2>
        </div>

        <Card className="bg-white dark:bg-white/[0.02] border-slate-200 dark:border-white/10">
            <CardContent className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <div className="flex justify-between items-center mb-1">
                                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest flex items-center gap-2">
                                    <MessageSquare className="size-3" /> Email Alerts (Verification Required)
                                </label>
                                {profile?.email && profile?.emailVerified && profile.email === emailInput && (
                                  <span className="text-[9px] font-bold text-emerald-500 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                                    VERIFIED
                                  </span>
                                )}
                                {profile?.pendingEmail && profile.pendingEmail === emailInput && (
                                  <button 
                                    onClick={() => {
                                      setVerificationPendingEmail(profile.pendingEmail || '')
                                      setShowEmailVerifyModal(true)
                                    }}
                                    className="text-[9px] font-bold text-amber-500 bg-amber-500/10 hover:bg-amber-500/20 px-2 py-0.5 rounded border border-amber-500/20 flex items-center gap-1 cursor-pointer transition-colors"
                                  >
                                    PENDING VERIFICATION (VERIFY NOW)
                                  </button>
                                )}
                            </div>
                            <div className="flex flex-col sm:flex-row gap-2">
                                <input 
                                    type="email" 
                                    placeholder="Enter backup email"
                                    value={emailInput}
                                    onChange={(e) => setEmailInput(e.target.value)}
                                    className="flex-1 bg-white dark:bg-slate-950 border border-slate-200 dark:border-white/5 rounded-xl px-4 py-2 text-sm font-medium text-slate-800 dark:text-white outline-none focus:border-blue-500/50 transition-colors w-full"
                                />
                                {profile?.email === emailInput && profile?.emailVerified ? (
                                  <div className="flex gap-2">
                                    <Button 
                                        onClick={async () => {
                                          try {
                                            const apiEndpoint = API_URL
                                            const token = localStorage.getItem('dwp_token')
                                            if (!token) throw new Error('No authentication token found. Please reconnect your wallet.')
                                            
                                            toast.info('Sending test email...')
                                            const testRes = await fetch(`${apiEndpoint}/api/heartbeat/test-email`, {
                                              headers: {
                                                'Authorization': `Bearer ${token}`
                                              }
                                            })
                                            if (testRes.ok) {
                                              const data = await testRes.json()
                                              if (data.sent) {
                                                toast.success('Test email sent!', { description: `Sent to: ${emailInput}` })
                                              } else {
                                                toast.error('Failed to send test email', { description: data.preview || 'Error' })
                                              }
                                            } else {
                                              toast.error('Server error triggering test email')
                                            }
                                          } catch (err: any) {
                                            toast.error('Failed to trigger test email', { description: err.message })
                                          }
                                        }}
                                        className="bg-slate-100 hover:bg-slate-200 dark:bg-white/5 dark:hover:bg-white/10 text-slate-700 dark:text-slate-200 text-[10px] font-black px-4 h-10 rounded-xl"
                                    >
                                      TEST MAIL
                                    </Button>
                                    <Button 
                                        onClick={handleDeleteEmail}
                                        className="bg-red-500/10 hover:bg-red-500/20 text-red-500 border border-red-500/20 text-[10px] font-black px-3 h-10 rounded-xl flex items-center justify-center cursor-pointer transition-colors"
                                        title="Remove Email"
                                    >
                                      <Trash2 className="size-4" />
                                    </Button>
                                  </div>
                                ) : profile?.pendingEmail === emailInput ? (
                                  <div className="flex gap-2">
                                    <Button 
                                        onClick={() => {
                                          setVerificationPendingEmail(emailInput)
                                          setShowEmailVerifyModal(true)
                                        }}
                                        className="bg-amber-600 hover:bg-amber-500 text-white text-[10px] font-black px-4 h-10 rounded-xl shadow-md"
                                    >
                                      VERIFY
                                    </Button>
                                    <Button 
                                        onClick={handleDeleteEmail}
                                        className="bg-red-500/10 hover:bg-red-500/20 text-red-500 border border-red-500/20 text-[10px] font-black px-3 h-10 rounded-xl flex items-center justify-center cursor-pointer transition-colors"
                                        title="Discard Verification"
                                    >
                                      <Trash2 className="size-4" />
                                    </Button>
                                  </div>
                                ) : (
                                  <Button 
                                      onClick={() => syncHeartbeatSettings(emailInput)}
                                      className="bg-blue-600 hover:bg-blue-500 text-white text-[10px] font-black px-4 h-10 rounded-xl shadow-md"
                                  >
                                    SAVE & VERIFY
                                  </Button>
                                )}
                            </div>
                        </div>

                        {/* Alternative Email section */}
                        <div className="space-y-2 pt-2 border-t border-slate-200 dark:border-white/5">
                            <div className="flex justify-between items-center mb-1">
                                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest flex items-center gap-2">
                                    <MessageSquare className="size-3" /> Alternative Email Alerts (Backup Notification)
                                </label>
                                {profile?.alternativeEmail && profile?.alternativeEmailVerified && profile.alternativeEmail === alternativeEmailInput && (
                                  <span className="text-[9px] font-bold text-emerald-500 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                                    VERIFIED
                                  </span>
                                )}
                                {profile?.alternativePendingEmail && profile.alternativePendingEmail === alternativeEmailInput && (
                                  <button 
                                    onClick={() => {
                                      setAlternativeVerificationPendingEmail(profile.alternativePendingEmail || '')
                                      setShowAlternativeEmailVerifyModal(true)
                                    }}
                                    className="text-[9px] font-bold text-amber-500 bg-amber-500/10 hover:bg-amber-500/20 px-2 py-0.5 rounded border border-amber-500/20 flex items-center gap-1 cursor-pointer transition-colors"
                                  >
                                    PENDING VERIFICATION (VERIFY NOW)
                                  </button>
                                )}
                            </div>
                            <div className="flex flex-col sm:flex-row gap-2">
                                <input 
                                    type="email" 
                                    placeholder="Enter secondary backup email"
                                    value={alternativeEmailInput}
                                    onChange={(e) => setAlternativeEmailInput(e.target.value)}
                                    className="flex-1 bg-white dark:bg-slate-950 border border-slate-200 dark:border-white/5 rounded-xl px-4 py-2 text-sm font-medium text-slate-800 dark:text-white outline-none focus:border-blue-500/50 transition-colors w-full"
                                />
                                {profile?.alternativeEmail === alternativeEmailInput && profile?.alternativeEmailVerified ? (
                                  <div className="flex gap-2">
                                    <Button 
                                        onClick={handleDeleteAlternativeEmail}
                                        className="bg-red-500/10 hover:bg-red-500/20 text-red-500 border border-red-500/20 text-[10px] font-black px-3 h-10 rounded-xl flex items-center justify-center cursor-pointer transition-colors"
                                        title="Remove Alternative Email"
                                    >
                                      <Trash2 className="size-4" />
                                    </Button>
                                  </div>
                                ) : profile?.alternativePendingEmail === alternativeEmailInput ? (
                                  <div className="flex gap-2">
                                    <Button 
                                        onClick={() => {
                                          setAlternativeVerificationPendingEmail(alternativeEmailInput)
                                          setShowAlternativeEmailVerifyModal(true)
                                        }}
                                        className="bg-amber-600 hover:bg-amber-500 text-white text-[10px] font-black px-4 h-10 rounded-xl shadow-md"
                                    >
                                      VERIFY
                                    </Button>
                                    <Button 
                                        onClick={handleDeleteAlternativeEmail}
                                        className="bg-red-500/10 hover:bg-red-500/20 text-red-500 border border-red-500/20 text-[10px] font-black px-3 h-10 rounded-xl flex items-center justify-center cursor-pointer transition-colors"
                                        title="Discard Verification"
                                    >
                                      <Trash2 className="size-4" />
                                    </Button>
                                  </div>
                                ) : (
                                  <Button 
                                      onClick={handleSaveAlternativeEmail}
                                      className="bg-blue-600 hover:bg-blue-500 text-white text-[10px] font-black px-4 h-10 rounded-xl shadow-md"
                                  >
                                    SAVE & VERIFY
                                  </Button>
                                )}
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest flex items-center gap-2">
                                <Send className="size-3" /> Telegram Bot
                            </label>
                            <Button variant="outline" className="w-full bg-white dark:bg-slate-950 border border-slate-200 dark:border-white/5 text-blue-600 dark:text-blue-400 text-xs font-bold gap-2 rounded-xl py-5">
                                CONNECT TO AlwaysThere_BOT
                            </Button>
                        </div>
                    </div>

                    <div className="bg-purple-50 dark:bg-purple-600/5 rounded-2xl p-6 border border-purple-200 dark:border-purple-500/10 space-y-4">
                        <h4 className="text-xs font-black text-purple-700 dark:text-purple-300 uppercase tracking-widest flex items-center gap-2">
                            <Zap className="size-3" /> Web3 Push (EPNS)
                        </h4>
                        <p className="text-[10px] text-purple-700/70 dark:text-purple-200/60 leading-relaxed">
                            Receive wallet-to-wallet notifications for critical heartbeat warnings and execution alerts via the EPNS protocol.
                        </p>
                        <Button className="w-full bg-purple-600 hover:bg-purple-500 text-white font-black text-xs rounded-xl py-5">
                            ENABLE PUSH CHANNEL
                        </Button>
                    </div>
                </div>
            </CardContent>
        </Card>
      </section>

      {/* -- SECTION: STORAGE -- */}
      <section className="space-y-6">
        <div className="flex items-center gap-3 border-b border-slate-200 dark:border-white/5 pb-2">
            <Database className="size-5 text-indigo-500 dark:text-indigo-400" />
            <h2 className="text-sm font-black uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">Decentralized Storage</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div 
                onClick={() => updateSetting('storageProvider', 'ipfs')}
                className={`p-6 rounded-3xl border-2 transition-all cursor-pointer flex gap-4 text-left ${appState.settings.storageProvider === 'ipfs' ? 'bg-blue-600/10 border-blue-600 shadow-[0_0_30px_rgba(37,99,235,0.1)]' : 'bg-white dark:bg-white/[0.02] border-slate-200 dark:border-white/5 hover:border-slate-300 dark:hover:border-white/20'}`}
            >
                <div className={`size-12 rounded-2xl flex items-center justify-center ${appState.settings.storageProvider === 'ipfs' ? 'bg-blue-500 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-500'}`}>
                    <Globe className="size-6" />
                </div>
                <div className="flex-1 space-y-1">
                    <h3 className="text-slate-900 dark:text-white font-black text-sm">IPFS / Filecoin</h3>
                    <p className="text-[10px] text-slate-500 leading-tight">Distributed content-addressed storage. Fast & resilient.</p>
                    {appState.settings.storageProvider === 'ipfs' && (
                        <div className="text-[8px] font-black text-blue-600 dark:text-blue-400 uppercase tracking-widest mt-2">ACTIVE PRIMARY</div>
                    )}
                </div>
            </div>

            <div 
                onClick={() => updateSetting('storageProvider', 'arweave')}
                className={`p-6 rounded-3xl border-2 transition-all cursor-pointer flex gap-4 text-left ${appState.settings.storageProvider === 'arweave' ? 'bg-amber-600/10 border-amber-600 shadow-[0_0_30px_rgba(217,119,6,0.1)]' : 'bg-white dark:bg-white/[0.02] border-slate-200 dark:border-white/5 hover:border-slate-300 dark:hover:border-white/20'}`}
            >
                <div className={`size-12 rounded-2xl flex items-center justify-center ${appState.settings.storageProvider === 'arweave' ? 'bg-amber-500 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-500'}`}>
                    <Database className="size-6" />
                </div>
                <div className="flex-1 space-y-1">
                    <h3 className="text-slate-900 dark:text-white font-black text-sm">Arweave (Permanent)</h3>
                    <p className="text-[10px] text-slate-500 leading-tight">Pay once, store forever. Immutable blockchain storage.</p>
                    {appState.settings.storageProvider === 'arweave' && (
                        <div className="text-[8px] font-black text-amber-600 dark:text-amber-400 uppercase tracking-widest mt-2">ACTIVE PRIMARY</div>
                    )}
                </div>
            </div>
        </div>
      </section>

      {/* -- SECTION: ADVANCED -- */}
      <section className="space-y-6">
        <div className="flex items-center gap-3 border-b border-slate-200 dark:border-white/5 pb-2">
            <Cpu className="size-5 text-slate-500 dark:text-slate-400" />
            <h2 className="text-sm font-black uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">Advanced Engine</h2>
        </div>

        <Card className="bg-white dark:bg-white/[0.02] border-slate-200 dark:border-white/10">
            <CardContent className="p-6 space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-6">
                        <div className="flex items-center justify-between">
                            <div className="space-y-0.5 text-left">
                                <div className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-tighter">Gas Settings</div>
                                <p className="text-[10px] text-slate-500">Auto-calculated execution costs</p>
                            </div>
                            <div className="flex items-center gap-2 bg-slate-100 dark:bg-slate-950 p-1 rounded-lg border border-slate-200 dark:border-white/5">
                                <button 
                                    onClick={() => updateSetting('gasPrice', 'auto')}
                                    className={`px-3 py-1 rounded-md text-[10px] font-black uppercase transition-colors ${appState.settings.gasPrice === 'auto' ? 'bg-blue-600 text-white' : 'text-slate-400 dark:text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'}`}
                                >
                                    AUTO
                                </button>
                                <button 
                                    onClick={() => updateSetting('gasPrice', 50)}
                                    className={`px-3 py-1 rounded-md text-[10px] font-black uppercase transition-colors ${appState.settings.gasPrice !== 'auto' ? 'bg-blue-600 text-white' : 'text-slate-400 dark:text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'}`}
                                >
                                    MANUAL
                                </button>
                            </div>
                        </div>

                        <div className="flex items-center justify-between">
                            <div className="space-y-0.5 text-left">
                                <div className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-tighter">Testnet Mode</div>
                                <p className="text-[10px] text-slate-500">Enable Sepolia / Mumbai support</p>
                            </div>
                            <div 
                                className={`w-10 h-5 rounded-full p-1 cursor-pointer transition-colors ${appState.settings.testnetMode ? 'bg-blue-600' : 'bg-slate-200 dark:bg-slate-800'}`}
                                onClick={() => updateSetting('testnetMode', !appState.settings.testnetMode)}
                            >
                                <div className={`size-3 bg-white rounded-full transition-transform ${appState.settings.testnetMode ? 'translate-x-5' : 'translate-x-0'}`} />
                            </div>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <Button className="w-full bg-slate-100 hover:bg-slate-200 dark:bg-slate-950 border border-slate-200 dark:border-blue-500/20 dark:hover:border-blue-500/40 text-blue-700 dark:text-blue-400 text-xs font-bold gap-3 rounded-2xl py-6 group">
                            <Terminal className="size-4 group-hover:scale-110 transition-transform text-blue-600 dark:text-blue-400" />
                            SIMULATE EXECUTION (DRY RUN)
                        </Button>
                        <div className="grid grid-cols-2 gap-3">
                            <Button variant="outline" className="bg-slate-100 hover:bg-slate-200 dark:bg-white/5 dark:border-white/5 dark:hover:bg-white/10 text-slate-700 dark:text-slate-200 text-[10px] font-black tracking-widest rounded-xl py-5">
                                VIEW AUDIT LOG
                            </Button>
                            <Button variant="outline" className="bg-slate-100 hover:bg-slate-200 dark:bg-white/5 dark:border-white/5 dark:hover:bg-white/10 text-slate-700 dark:text-slate-200 text-[10px] font-black tracking-widest rounded-xl py-5">
                                JSON CONFIG
                            </Button>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
      </section>

      {/* -- SECTION: DANGER ZONE -- */}
      <section className="space-y-6">
        <div className="flex items-center gap-3 border-b border-red-200 dark:border-red-500/20 pb-2">
            <AlertOctagon className="size-5 text-red-500" />
            <h2 className="text-sm font-black uppercase tracking-[0.2em] text-red-500 dark:text-red-400/60">Danger Zone</h2>
        </div>

        <Card className="bg-red-50/20 dark:bg-red-500/[0.02] border-red-200 dark:border-red-500/20 shadow-[0_0_50px_rgba(239,68,68,0.05)]">
            <CardContent className="p-6">
                <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                    <div className="space-y-1 text-center md:text-left">
                        <h3 className="text-red-600 dark:text-red-400 font-black text-base uppercase">Revoke Protocol Instance</h3>
                        <p className="text-xs text-red-600 dark:text-red-400/40 font-medium">This will permanently delete all encrypted shards and stop the switch switch. This action is irreversible.</p>
                    </div>
                    <Button variant="destructive" className="bg-red-600 hover:bg-red-500 text-white font-black text-xs px-8 h-12 rounded-2xl shadow-lg shadow-red-600/20 uppercase tracking-widest">
                        DELETE WILL
                    </Button>
                </div>
            </CardContent>
        </Card>
      </section>

      {/* -- STICKY SAVE STATUS -- */}
      <AnimatePresence>
          {isUpdating && (
              <motion.div 
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 50 }}
                className="fixed bottom-8 left-1/2 -translate-x-1/2 bg-blue-600 text-white px-6 py-3 rounded-full shadow-2xl flex items-center gap-3 z-50 border border-blue-400/30"
              >
                  <RefreshCw className="size-4 animate-spin" />
                  <span className="text-xs font-black uppercase tracking-widest">Syncing Kernel Config...</span>
              </motion.div>
          )}
      </AnimatePresence>

      <UpgradeModal 
        isOpen={showUpgradeModal}
        onClose={() => setShowUpgradeModal(false)}
        onUpgrade={handleUpgrade}
      />
    </div>
  )
}
