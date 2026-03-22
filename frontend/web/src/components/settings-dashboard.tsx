'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { UpgradeModal } from './upgrade-modal'
import { Globe, Shield, Wallet, Zap, Fingerprint, Lock, ShieldCheck, AlertOctagon, Crown } from 'lucide-react'
import { translations, Language, getLanguage, setLanguage, subscribeI18n } from '@/utils/i18n'

export function SettingsDashboard() {
  const [lang, setLang] = useState<Language>('en')
  const [t, setT] = useState<any>(translations.en)
  const [bioEnabled, setBioEnabled] = useState(true)
  const [notifEnabled, setNotifEnabled] = useState(true)
  const [storagePreference, setStoragePreference] = useState<'cloud' | 'web3'>('cloud')
  const [isMigrating, setIsMigrating] = useState(false)
  const [migrationProgress, setMigrationProgress] = useState(0)
  const [storageUsed, setStorageUsed] = useState(0)
  const [storageQuota, setStorageQuota] = useState(524288000) // Default 500MB
  
  // Subscription verification (mocked for UI context, real logic in backend)
  const [isPremium, setIsPremium] = useState(false)
  const [isUpgradeModalOpen, setIsUpgradeModalOpen] = useState(false)

  useEffect(() => {
    // Initial load
    const currentLang = getLanguage()
    setLang(currentLang)
    setT(translations[currentLang] || translations.en)

    // Subscribe to changes
    const unsubscribe = subscribeI18n(() => {
      const newLang = getLanguage()
      setLang(newLang)
      setT(translations[newLang] || translations.en)
    })
    
    // Fetch actual storage usage
    const fetchStorageInfo = async () => {
        try {
            const walletAddress = localStorage.getItem('dwp_wallet_address') || '0x742d35Cc6634C0532925a3b8D4C2C4e0C8b83c8e'
            const res = await fetch(`http://localhost:7001/api/users/profile?walletAddress=${walletAddress}`)
            if (res.ok) {
                const data = await res.json()
                setStorageUsed(data.storageUsed || 0)
                setStorageQuota(data.storageQuota || 524288000)
                setStoragePreference(data.storageEngine || 'cloud')
                setIsPremium(!!data.isPremium)
            }
        } catch (error) {
            console.error('Failed to fetch storage info:', error)
        }
    }

    fetchStorageInfo()

    return unsubscribe
}, [])

  const handleLanguageChange = (value: string) => {
    setLanguage(value as Language)
  }

  const handleStorageSwitch = async (engine: 'cloud' | 'web3') => {
    if (storagePreference === engine) return
    
    if (engine === 'web3' && !isPremium) {
        setIsUpgradeModalOpen(true)
        return
    }

    setIsMigrating(true)
    setMigrationProgress(0)
    
    // Simulate migration progress
    const interval = setInterval(() => {
        setMigrationProgress(prev => {
            if (prev >= 95) {
                clearInterval(interval)
                return prev
            }
            return prev + 5
        })
    }, 100)
    
    try {
        const walletAddress = localStorage.getItem('dwp_wallet_address') || '0x742d35Cc6634C0532925a3b8D4C2C4e0C8b83c8e'
        const res = await fetch(`http://localhost:7001/api/users/storage-engine?walletAddress=${walletAddress}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ engine })
        })
        
        await new Promise(r => setTimeout(r, 2000)) // delay for visual effect
        clearInterval(interval)
        
        if (res.ok) {
            setMigrationProgress(100)
            setStoragePreference(engine)
            setTimeout(() => setIsMigrating(false), 500)
        } else {
            throw new Error('Migration failed on server')
        }
    } catch (error) {
        clearInterval(interval)
        setIsMigrating(false)
        setMigrationProgress(0)
        alert('Storage engine migration failed. Please ensure backend is running.')
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2">
        <h2 className="text-3xl font-bold tracking-tight text-slate-100">{t.settings_title || 'Global Preferences'}</h2>
        <p className="text-slate-400">Manage protocol settings, storage engines, and security.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* -- STORAGE ENGINE -- */}
        <Card className="bg-white/[0.02] border-white/10 backdrop-blur-xl md:col-span-2">
          <CardHeader>
            <CardTitle className="text-xl flex items-center text-slate-100">
              <ServerIcon className="w-5 h-5 mr-3 text-[#2b52ff]" />
              {t.settings_storage || 'Smart Storage Engine'}
            </CardTitle>
            <CardDescription className="text-slate-400">
              {t.settings_storage_desc || 'Manage your 500MB shared vault allocation and deployment strategy.'}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex flex-col gap-2 p-4 bg-white/5 rounded-xl border border-white/10">
                <div className="flex justify-between items-center text-sm font-semibold">
                    <span className="text-slate-300 uppercase">{(storageQuota / (1024 * 1024)).toFixed(0)}MB SHARED QUOTA</span>
                    <span className="text-[#2b52ff] uppercase">{(storageUsed / (1024 * 1024)).toFixed(2)}MB USED</span>
                </div>
                <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
                    <div 
                        className="h-full bg-gradient-to-r from-[#2b52ff] to-[#00d2ff] transition-all duration-1000" 
                        style={{ width: `${Math.min(100, (storageUsed / storageQuota) * 100)}%` }} 
                    />
                </div>
            </div>

            <div className="flex flex-col md:flex-row gap-4">
                {/* Cloud Vault */}
                <div 
                    onClick={() => !isMigrating && handleStorageSwitch('cloud')}
                    className={`flex-1 p-6 rounded-xl border-2 transition-all cursor-pointer flex flex-col items-center text-center ${storagePreference === 'cloud' ? 'bg-[#2b52ff]/10 border-[#2b52ff]' : 'bg-white/5 border-transparent hover:border-white/20'} ${isMigrating ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                    <Globe className={`w-8 h-8 mb-3 ${storagePreference === 'cloud' ? 'text-[#2b52ff]' : 'text-slate-400'}`} />
                    <h3 className="font-bold text-lg text-slate-200 mb-1">{t.settings_cloud || 'Cloud Vault (Fast)'}</h3>
                    <p className="text-sm text-slate-400">{t.settings_cloud_desc || 'Centralized, instant access, managed security.'}</p>
                    
                    {storagePreference === 'cloud' && (
                        <div className="mt-4 px-3 py-1 bg-[#2b52ff] text-xs font-bold rounded-full text-white">ACTIVE</div>
                    )}
                </div>

                {/* Web3 Vault */}
                <div 
                    onClick={() => !isMigrating && handleStorageSwitch('web3')}
                    className={`flex-1 p-6 rounded-xl border-2 transition-all cursor-pointer flex flex-col items-center text-center ${storagePreference === 'web3' ? 'bg-[#8b5cf6]/10 border-[#8b5cf6]' : 'bg-white/5 border-transparent hover:border-white/20'} ${!isPremium ? 'opacity-80' : ''} ${isMigrating ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                    <Wallet className={`w-8 h-8 mb-3 ${storagePreference === 'web3' ? 'text-[#8b5cf6]' : 'text-slate-400'}`} />
                    <h3 className="font-bold text-lg text-slate-200 mb-1 flex items-center gap-2">
                        {t.settings_web3 || 'Web3 Vault (IPFS)'}
                        {!isPremium && <Crown className="w-4 h-4 text-amber-400 animate-pulse" />}
                    </h3>
                    <p className="text-sm text-slate-400">{t.settings_web3_desc || 'Decentralized, self-custodial, immutable storage.'}</p>
                    
                    {storagePreference === 'web3' && (
                        <div className="mt-4 px-3 py-1 bg-[#8b5cf6] text-xs font-bold rounded-full text-white">ACTIVE</div>
                    )}
                </div>
            </div>

            {isMigrating && (
                <div className="p-4 bg-orange-500/10 border border-orange-500/30 rounded-xl flex flex-col gap-3">
                    <div className="flex items-center gap-3">
                        <AlertOctagon className="w-5 h-5 text-orange-400 animate-pulse" />
                        <span className="font-semibold text-orange-200">{t.settings_migrate || 'Migrating Vault Identity...'}</span>
                    </div>
                    <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                        <div className="h-full bg-orange-400 transition-all duration-300" style={{ width: `${migrationProgress}%` }} />
                    </div>
                    <span className="text-xs text-orange-300 text-right">{migrationProgress}% Complete</span>
                </div>
            )}
          </CardContent>
        </Card>

        {/* -- SECURITY -- */}
        <Card className="bg-white/[0.02] border-white/10 backdrop-blur-xl">
          <CardHeader>
            <CardTitle className="text-xl flex items-center text-slate-100">
              <Shield className="w-5 h-5 mr-3 text-orange-400" />
              Vault Security
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <div className="flex items-center text-slate-200 font-medium whitespace-nowrap"><Fingerprint className="w-4 h-4 mr-2 text-slate-400"/> Biometric Override</div>
                <div className="text-sm text-slate-400">Hardware auth requirement</div>
              </div>
              <div 
                className={`w-11 h-6 rounded-full p-1 cursor-pointer transition-colors ${bioEnabled ? 'bg-orange-500' : 'bg-slate-700'}`}
                onClick={() => setBioEnabled(!bioEnabled)}
              >
                <div className={`w-4 h-4 rounded-full bg-white transition-transform ${bioEnabled ? 'translate-x-5' : 'translate-x-0'}`} />
              </div>
            </div>
            <div className="flex items-center justify-between cursor-pointer group">
              <div className="space-y-0.5">
                <div className="flex items-center text-slate-200 font-medium"><Lock className="w-4 h-4 mr-2 text-slate-400"/> Rotate Security PIN</div>
              </div>
            </div>
            <div className="flex items-center justify-between cursor-pointer group">
              <div className="space-y-0.5">
                <div className="flex items-center text-slate-200 font-medium"><ShieldCheck className="w-4 h-4 mr-2 text-slate-400"/> Verify Master Keys</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* -- CONFIG -- */}
        <Card className="bg-white/[0.02] border-white/10 backdrop-blur-xl">
          <CardHeader>
            <CardTitle className="text-xl flex items-center text-slate-100">
              <Zap className="w-5 h-5 mr-3 text-emerald-400" />
              Operational Config
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <div className="flex items-center text-slate-200 font-medium"><Globe className="w-4 h-4 mr-2 text-slate-400"/> {t.settings_language || 'Interface Language'}</div>
              </div>
              <select 
                value={lang} 
                onChange={(e) => handleLanguageChange(e.target.value)}
                className="bg-white/5 border border-white/10 text-slate-200 text-sm rounded-md px-3 py-2 outline-none focus:border-[#2b52ff]"
              >
                <option value="en">English</option>
                <option value="es">Español</option>
                <option value="fr">Français</option>
                <option value="hi">हिंदी (Hindi)</option>
              </select>
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <div className="flex items-center text-slate-200 font-medium">Push Notifications</div>
              </div>
              <div 
                className={`w-11 h-6 rounded-full p-1 cursor-pointer transition-colors ${notifEnabled ? 'bg-emerald-500' : 'bg-slate-700'}`}
                onClick={() => setNotifEnabled(!notifEnabled)}
              >
                <div className={`w-4 h-4 rounded-full bg-white transition-transform ${notifEnabled ? 'translate-x-5' : 'translate-x-0'}`} />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <UpgradeModal 
        isOpen={isUpgradeModalOpen} 
        onClose={() => setIsUpgradeModalOpen(false)}
        onUpgrade={() => {
            // In a real app, this would redirect to stripe or open payment flow
            console.log("Redirecting to upgrade flow...")
            setIsUpgradeModalOpen(false)
            alert("Upgrade flow initiated (Check console)")
        }}
        description={t.settings_web3_locked || 'Web3 storage is locked to premium accounts during the trial period. Upgrade your plan to unlock.'}
      />
    </div>
  )
}

function ServerIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="20" height="8" x="2" y="2" rx="2" ry="2" />
      <rect width="20" height="8" x="2" y="14" rx="2" ry="2" />
      <line x1="6" x2="6.01" y1="6" y2="6" />
      <line x1="6" x2="6.01" y1="18" y2="18" />
    </svg>
  )
}
