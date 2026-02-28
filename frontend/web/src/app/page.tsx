'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  Shield,
  Heart,
  Users,
  FileText,
  Key,
  Clock,
  Lock,
  Zap,
  Globe,
  CheckCircle,
  RefreshCw
} from 'lucide-react'
import { AssetCreationForm } from '@/components/asset-creation-form'
import { HeartbeatMonitor } from '@/components/heartbeat-monitor'
import { BeneficiaryManager } from '@/components/beneficiary-manager'
import { SystemStatus } from '@/components/system-status'
import { WalletConnectModal } from '@/components/wallet-connect-modal'
import WebStorageService, { AppState } from '@/lib/storage'

export default function HomePage() {
  const [isConnected, setIsConnected] = useState(false)
  const [activeTab, setActiveTab] = useState('overview')
  const [address] = useState('0x742d35Cc6634C0532925a3b8D4C2C4e0C8b83c8e')
  const [appState, setAppState] = useState<AppState | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isConnecting, setIsConnecting] = useState(false)
  const [showWalletModal, setShowWalletModal] = useState(false)

  const storage = WebStorageService.getInstance()

  useEffect(() => {
    if (isConnected) {
      loadAppState()

      // Auto-refresh every 10 seconds when connected
      const interval = setInterval(loadAppState, 10000)
      return () => clearInterval(interval)
    }
  }, [isConnected])

  const loadAppState = async () => {
    try {
      const state = await storage.getAppState()
      setAppState(state)
    } catch (error) {
      console.error('Failed to load app state:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleConnect = () => {
    setShowWalletModal(true)
  }

  const handleWalletConnect = () => {
    setIsConnecting(true)
    // Simulate wallet connection
    setTimeout(() => {
      setIsConnected(true)
      setIsConnecting(false)
      setShowWalletModal(false)
    }, 2000)
  }

  const getHeartbeatStatusInfo = () => {
    if (!appState) return { status: 'Unknown', color: 'gray', lastTime: 'Never' }

    const now = Date.now()
    const daysSinceLastHeartbeat = (now - appState.stats.lastHeartbeat) / (1000 * 60 * 60 * 24)

    if (daysSinceLastHeartbeat <= appState.settings.heartbeatInterval) {
      return {
        status: 'Active',
        color: 'green',
        lastTime: new Date(appState.stats.lastHeartbeat).toLocaleDateString()
      }
    } else if (daysSinceLastHeartbeat <= appState.settings.heartbeatInterval + appState.settings.gracePeriod) {
      return {
        status: 'Grace Period',
        color: 'yellow',
        lastTime: new Date(appState.stats.lastHeartbeat).toLocaleDateString()
      }
    } else {
      return {
        status: 'Overdue',
        color: 'red',
        lastTime: new Date(appState.stats.lastHeartbeat).toLocaleDateString()
      }
    }
  }

  const getSystemStatusInfo = () => {
    if (!appState) return { status: 'Unknown', color: 'gray' }

    switch (appState.stats.systemStatus) {
      case 'secure':
        return { status: 'Secure', color: 'green' }
      case 'warning':
        return { status: 'Warning', color: 'yellow' }
      case 'error':
        return { status: 'Error', color: 'red' }
      default:
        return { status: 'Unknown', color: 'gray' }
    }
  }

  if (!isConnected) {
    return (
      <>
        <div className="min-h-screen hero-bg">
          {/* Navigation */}
          <nav className="sticky top-0 z-50 backdrop-blur-xl bg-slate-900/80 dark:bg-slate-900/80 border-b border-slate-800 dark:border-slate-800">
            <div className="max-w-7xl mx-auto px-4 py-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="icon-container w-10 h-10">
                    <Shield className="h-5 w-5 text-white" />
                  </div>
                  <span className="text-xl font-bold gradient-text-premium">Digital Will Protocol</span>
                </div>
                <button
                  onClick={handleConnect}
                  disabled={isConnecting}
                  className="btn-premium px-6 py-2 text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isConnecting ? (
                    <>
                      <RefreshCw className="h-4 w-4 mr-2 inline animate-spin" />
                      Connecting...
                    </>
                  ) : (
                    'Launch App'
                  )}
                </button>
              </div>
            </div>
          </nav>

          <div className="max-w-7xl mx-auto px-4 py-12 space-y-24">
            {/* Hero Section */}
            <section className="text-center space-y-8 py-12 scroll-reveal">
              <div className="space-y-6">
                <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-slate-800/50 dark:bg-slate-800/50 border border-slate-700 dark:border-slate-700 backdrop-blur-sm">
                  <span className="status-indicator-active"></span>
                  <span className="text-sm font-medium text-slate-200">Secure • Decentralized • Trustless</span>
                </div>

                <h1 className="text-6xl md:text-7xl font-bold gradient-text-premium leading-tight">
                  Your Digital Legacy,
                  <br />
                  Protected Forever
                </h1>

                <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                  A blockchain-based system that ensures secure, automatic transfer of digital assets,
                  data, and access rights when you become inactive. Zero-trust architecture with
                  military-grade encryption.
                </p>

                <div className="flex flex-wrap justify-center gap-3 mt-8">
                  <div className="badge-premium badge-info-premium text-sm">
                    <Lock className="h-4 w-4 mr-1" />
                    AES-256-GCM Encryption
                  </div>
                  <div className="badge-premium badge-success-premium text-sm">
                    <Key className="h-4 w-4 mr-1" />
                    Shamir Secret Sharing
                  </div>
                  <div className="badge-premium badge-warning-premium text-sm">
                    <Globe className="h-4 w-4 mr-1" />
                    IPFS Storage
                  </div>
                  <div className="badge-premium badge-error-premium text-sm">
                    <Zap className="h-4 w-4 mr-1" />
                    Polygon Blockchain
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 justify-center mt-12">
                  <button
                    onClick={handleConnect}
                    disabled={isConnecting}
                    className="btn-premium px-8 py-4 text-lg disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isConnecting ? (
                      <>
                        <RefreshCw className="h-5 w-5 mr-2 animate-spin inline" />
                        Connecting...
                      </>
                    ) : (
                      'Access Protocol'
                    )}
                  </button>
                  <a
                    href="#use-cases"
                    className="px-8 py-4 text-lg rounded-xl border-2 border-slate-700 text-slate-200 font-semibold hover:bg-slate-800/50 hover:border-blue-500/50 transition-all duration-300 inline-flex items-center justify-center"
                  >
                    Explore Security
                  </a>
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16">
                <div className="premium-card p-6">
                  <div className="text-4xl font-bold gradient-text-premium">256-bit</div>
                  <div className="text-sm text-muted-foreground mt-2">Encryption Standard</div>
                </div>
                <div className="premium-card p-6">
                  <div className="text-4xl font-bold gradient-text-premium">5/3</div>
                  <div className="text-sm text-muted-foreground mt-2">Key Share Threshold</div>
                </div>
                <div className="premium-card p-6">
                  <div className="text-4xl font-bold gradient-text-premium">100%</div>
                  <div className="text-sm text-muted-foreground mt-2">Decentralized</div>
                </div>
                <div className="premium-card p-6">
                  <div className="text-4xl font-bold gradient-text-premium">0</div>
                  <div className="text-sm text-muted-foreground mt-2">Trust Required</div>
                </div>
              </div>
            </section>

            {/* Features Section */}
            <section className="space-y-12 scroll-reveal">
              <div className="text-center space-y-4">
                <h2 className="text-4xl md:text-5xl font-bold gradient-text-premium">
                  Enterprise-Grade Security
                </h2>
                <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                  Built with the same security standards used by Fortune 500 companies
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-8">
                <div className="premium-card p-8 hover:scale-105 transition-transform">
                  <div className="icon-container mb-6">
                    <Shield className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4">Zero Trust Security</h3>
                  <p className="text-muted-foreground mb-4">
                    Your data is encrypted client-side before it ever leaves your device.
                    Our servers never see your plaintext data or encryption keys.
                  </p>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                      Client-side AES-256-GCM encryption
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                      No server access to keys
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                      Verifiable on blockchain
                    </li>
                  </ul>
                </div>

                <div className="premium-card p-8 hover:scale-105 transition-transform">
                  <div className="icon-container mb-6 bg-gradient-to-br from-green-500 to-emerald-600">
                    <Key className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4">Shamir Secret Sharing</h3>
                  <p className="text-muted-foreground mb-4">
                    Your encryption keys are split into 5 shares distributed across different
                    locations. Only 3 shares needed to reconstruct.
                  </p>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                      5 shares, 3 threshold
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                      Distributed storage
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                      Fault-tolerant design
                    </li>
                  </ul>
                </div>

                <div className="premium-card p-8 hover:scale-105 transition-transform">
                  <div className="icon-container mb-6 bg-gradient-to-br from-purple-500 to-pink-600">
                    <Globe className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4">Decentralized Storage</h3>
                  <p className="text-muted-foreground mb-4">
                    Your encrypted data is stored on IPFS and Arweave, ensuring permanent
                    availability without central points of failure.
                  </p>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                      IPFS primary storage
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                      Arweave backup
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                      Permanent availability
                    </li>
                  </ul>
                </div>
              </div>
            </section>

            {/* How It Works */}
            <section className="space-y-12 scroll-reveal">
              <div className="text-center space-y-4">
                <h2 className="text-4xl md:text-5xl font-bold gradient-text-premium">
                  How It Works
                </h2>
                <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                  Four simple steps to secure your digital legacy
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="premium-card p-8 text-center hover:scale-105 transition-transform">
                  <div className="icon-container mx-auto mb-6 bg-gradient-to-br from-blue-500 to-cyan-600">
                    <FileText className="h-6 w-6 text-white" />
                  </div>
                  <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">01</div>
                  <h3 className="text-xl font-bold mb-3">Create Assets</h3>
                  <p className="text-sm text-muted-foreground">
                    Upload files, documents, crypto keys, or messages you want to protect
                  </p>
                </div>

                <div className="premium-card p-8 text-center hover:scale-105 transition-transform">
                  <div className="icon-container mx-auto mb-6 bg-gradient-to-br from-green-500 to-emerald-600">
                    <Lock className="h-6 w-6 text-white" />
                  </div>
                  <div className="text-3xl font-bold text-green-600 dark:text-green-400 mb-2">02</div>
                  <h3 className="text-xl font-bold mb-3">Encrypt & Split</h3>
                  <p className="text-sm text-muted-foreground">
                    Data encrypted with AES-256, keys split into 5 shares using Shamir's algorithm
                  </p>
                </div>

                <div className="premium-card p-8 text-center hover:scale-105 transition-transform">
                  <div className="icon-container mx-auto mb-6 bg-gradient-to-br from-purple-500 to-pink-600">
                    <Heart className="h-6 w-6 text-white" />
                  </div>
                  <div className="text-3xl font-bold text-purple-600 dark:text-purple-400 mb-2">03</div>
                  <h3 className="text-xl font-bold mb-3">Heartbeat Monitor</h3>
                  <p className="text-sm text-muted-foreground">
                    Regular proof-of-life signals (7-90 days) with 14-day grace period
                  </p>
                </div>

                <div className="premium-card p-8 text-center hover:scale-105 transition-transform">
                  <div className="icon-container mx-auto mb-6 bg-gradient-to-br from-orange-500 to-red-600">
                    <Users className="h-6 w-6 text-white" />
                  </div>
                  <div className="text-3xl font-bold text-orange-600 dark:text-orange-400 mb-2">04</div>
                  <h3 className="text-xl font-bold mb-3">Auto Release</h3>
                  <p className="text-sm text-muted-foreground">
                    Smart contracts automatically release assets to beneficiaries when needed
                  </p>
                </div>
              </div>
            </section>

            {/* Use Cases */}
            {/* Use Cases */}
            <section className="space-y-12 scroll-reveal" id="use-cases">
              <div className="text-center space-y-4">
                <h2 className="text-4xl md:text-5xl font-bold gradient-text-premium">
                  Perfect For Every Estate Need
                </h2>
                <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                  Protect what matters most to you and your beneficiaries
                </p>
              </div>

              {/* Use Cases Content */}
              <div className="grid md:grid-cols-2 gap-8">
                <div className="premium-card p-8">
                  <div className="flex items-start space-x-4">
                    <div className="icon-container bg-gradient-to-br from-blue-500 to-cyan-600">
                      <FileText className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-2">Crypto Assets</h3>
                      <p className="text-muted-foreground">
                        Securely store seed phrases, private keys, and wallet passwords.
                        Ensure your crypto doesn't get lost forever.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="premium-card p-8">
                  <div className="flex items-start space-x-4">
                    <div className="icon-container bg-gradient-to-br from-green-500 to-emerald-600">
                      <FileText className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-2">Personal Messages</h3>
                      <p className="text-muted-foreground">
                        Leave heartfelt messages, videos, or audio recordings for your
                        loved ones to receive when the time comes.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="premium-card p-8">
                  <div className="flex items-start space-x-4">
                    <div className="icon-container bg-gradient-to-br from-purple-500 to-pink-600">
                      <FileText className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-2">Business Secrets</h3>
                      <p className="text-muted-foreground">
                        Protect intellectual property, trade secrets, and critical business
                        information with enterprise-grade security.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="premium-card p-8">
                  <div className="flex items-start space-x-4">
                    <div className="icon-container bg-gradient-to-br from-orange-500 to-red-600">
                      <FileText className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-2">Legal Documents</h3>
                      <p className="text-muted-foreground">
                        Store wills, trusts, property deeds, and other important legal
                        documents with tamper-proof blockchain verification.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Technology Stack */}
            <section className="space-y-12 scroll-reveal">
              <div className="text-center space-y-4">
                <h2 className="text-4xl md:text-5xl font-bold gradient-text-premium">
                  Built on Cutting-Edge Technology
                </h2>
                <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                  Leveraging the best of Web3 and modern cryptography
                </p>
              </div>

              <div className="premium-card p-12">
                <div className="grid md:grid-cols-3 gap-8">
                  <div className="text-center space-y-3">
                    <div className="icon-container mx-auto bg-gradient-to-br from-purple-500 to-blue-600">
                      <Shield className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="font-bold text-lg">Blockchain</h3>
                    <p className="text-sm text-muted-foreground">
                      Polygon network for fast, low-cost smart contract execution
                    </p>
                  </div>

                  <div className="text-center space-y-3">
                    <div className="icon-container mx-auto bg-gradient-to-br from-green-500 to-emerald-600">
                      <Globe className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="font-bold text-lg">Storage</h3>
                    <p className="text-sm text-muted-foreground">
                      IPFS & Arweave for permanent, decentralized data storage
                    </p>
                  </div>

                  <div className="text-center space-y-3">
                    <div className="icon-container mx-auto bg-gradient-to-br from-orange-500 to-pink-600">
                      <Lock className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="font-bold text-lg">Encryption</h3>
                    <p className="text-sm text-muted-foreground">
                      AES-256-GCM with Shamir Secret Sharing for maximum security
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* CTA Section */}
            <section className="scroll-reveal">
              <div className="premium-card p-12 text-center space-y-6 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 via-cyan-600/20 to-blue-600/20 animate-pulse"></div>
                <div className="relative z-10">
                  <h2 className="text-4xl md:text-5xl font-bold text-slate-100">
                    Ready to Secure Your Digital Legacy?
                  </h2>
                  <p className="text-xl text-slate-300 max-w-2xl mx-auto">
                    Join thousands protecting their digital assets with military-grade encryption
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
                    <button
                      onClick={handleConnect}
                      disabled={isConnecting}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 text-lg rounded-xl font-semibold hover:scale-105 transition-transform shadow-2xl disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isConnecting ? (
                        <>
                          <RefreshCw className="h-5 w-5 mr-2 inline animate-spin" />
                          Connecting...
                        </>
                      ) : (
                        'Initialize Setup'
                      )}
                    </button>
                    <a
                      href="#use-cases"
                      className="bg-slate-800 hover:bg-slate-700 text-slate-200 border-2 border-slate-700 hover:border-blue-500/50 px-8 py-4 text-lg rounded-xl font-semibold transition-all inline-flex items-center justify-center"
                    >
                      Learn More
                    </a>
                  </div>
                </div>
              </div>
            </section>

            {/* Footer */}
            <footer className="border-t border-slate-800 dark:border-slate-800 pt-12 pb-8">
              <div className="grid md:grid-cols-4 gap-8 mb-8">
                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    {/* Custom Original Logo SVG */}
                    <div className="w-8 h-8 flex-shrink-0">
                      <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M50 5L90 25V65L50 95L10 65V25L50 5Z" fill="url(#grad1)" />
                        <path d="M50 15L80 30V60L50 85L20 60V30L50 15Z" fill="#0f172a" />
                        <path d="M50 25L70 35V55L50 75L30 55V35L50 25Z" fill="url(#grad2)" />
                        <defs>
                          <linearGradient id="grad1" x1="10" y1="5" x2="90" y2="95" gradientUnits="userSpaceOnUse">
                            <stop stopColor="#3b82f6" />
                            <stop offset="1" stopColor="#8b5cf6" />
                          </linearGradient>
                          <linearGradient id="grad2" x1="30" y1="25" x2="70" y2="75" gradientUnits="userSpaceOnUse">
                            <stop stopColor="#10b981" />
                            <stop offset="1" stopColor="#3b82f6" />
                          </linearGradient>
                        </defs>
                      </svg>
                    </div>
                    <span className="font-bold text-xl gradient-text-premium">Digital Will Protocol</span>
                  </div>
                  <p className="text-sm text-slate-400 mt-2">
                    Securing digital legacies for the decentralized future. Your assets, your rules.
                  </p>
                </div>

                <div>
                  <h4 className="font-bold mb-4 text-slate-200">Product</h4>
                  <ul className="space-y-3 text-sm text-slate-400">
                    <li><a href="/features" className="hover:text-blue-400 transition-colors">Features</a></li>
                    <li><a href="/security" className="hover:text-blue-400 transition-colors">Security</a></li>
                    <li><a href="/pricing" className="hover:text-blue-400 transition-colors">Pricing</a></li>
                    <li><a href="/roadmap" className="hover:text-blue-400 transition-colors">Roadmap</a></li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-bold mb-4 text-slate-200">Resources</h4>
                  <ul className="space-y-3 text-sm text-slate-400">
                    <li><a href="/docs" className="hover:text-blue-400 transition-colors">Documentation</a></li>
                    <li><a href="/api" className="hover:text-blue-400 transition-colors">API Reference</a></li>
                    <li><a href="/guides" className="hover:text-blue-400 transition-colors">Guides</a></li>
                    <li><a href="/support" className="hover:text-blue-400 transition-colors">Support</a></li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-bold mb-4 text-slate-200">Company</h4>
                  <ul className="space-y-3 text-sm text-slate-400">
                    <li><a href="/about" className="hover:text-blue-400 transition-colors">About</a></li>
                    <li><a href="/blog" className="hover:text-blue-400 transition-colors">Blog</a></li>
                    <li><a href="/careers" className="hover:text-blue-400 transition-colors">Careers</a></li>
                    <li><a href="/contact" className="hover:text-blue-400 transition-colors">Contact</a></li>
                  </ul>
                </div>
              </div>

              <div className="divider-gradient mb-8"></div>

              <div className="flex flex-col md:flex-row justify-between items-center text-sm text-slate-400">
                <p>© 2024 Digital Will Protocol. All rights reserved.</p>
                <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 mt-4 md:mt-0">
                  <a href="/privacy" className="hover:text-blue-400 transition-colors">Privacy Policy</a>
                  <a href="/terms" className="hover:text-blue-400 transition-colors">Terms of Service</a>
                  <a href="/security-policy" className="hover:text-blue-400 transition-colors">Security</a>
                </div>
              </div>
            </footer>
          </div>
        </div>

        {/* Wallet Connect Modal */}
        <WalletConnectModal
          isOpen={showWalletModal}
          onClose={() => setShowWalletModal(false)}
          onConnect={handleWalletConnect}
          isConnecting={isConnecting}
        />
      </>
    )
  }

  return (
    <div className="min-h-screen p-4 hero-bg">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8 premium-card p-6">
          <div className="flex items-center space-x-3">
            <div className="icon-container">
              <Shield className="h-5 w-5 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold gradient-text-premium">Digital Will Protocol</h1>
              <p className="text-sm text-muted-foreground flex items-center">
                <span className="status-indicator-active mr-2"></span>
                Connected: {address?.slice(0, 6)}...{address?.slice(-4)}
              </p>
            </div>
          </div>
          <Button variant="outline" onClick={() => setIsConnected(false)} className="hover:scale-105 transition-transform">
            Secure Disconnect
          </Button>
        </div>

        {/* Main Dashboard */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="assets">Assets</TabsTrigger>
            <TabsTrigger value="beneficiaries">Beneficiaries</TabsTrigger>
            <TabsTrigger value="heartbeat">Heartbeat</TabsTrigger>
            <TabsTrigger value="status">Status</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {isLoading ? (
              <div className="flex items-center justify-center py-8">
                <RefreshCw className="h-6 w-6 animate-spin mr-2" />
                <span>Loading dashboard...</span>
              </div>
            ) : (
              <>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="premium-card p-6 hover:scale-105 transition-transform">
                    <div className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <h3 className="text-sm font-medium text-muted-foreground">Total Assets</h3>
                      <div className="icon-container w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-600">
                        <FileText className="h-5 w-5 text-white" />
                      </div>
                    </div>
                    <div>
                      <div className="text-3xl font-bold gradient-text-premium">{appState?.stats.totalAssets || 0}</div>
                      <p className="text-xs text-muted-foreground mt-1">
                        {appState?.stats.totalAssets === 0 ? 'No assets created yet' : 'Encrypted assets'}
                      </p>
                    </div>
                  </div>

                  <div className="premium-card p-6 hover:scale-105 transition-transform">
                    <div className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <h3 className="text-sm font-medium text-muted-foreground">Beneficiaries</h3>
                      <div className="icon-container w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-600">
                        <Users className="h-5 w-5 text-white" />
                      </div>
                    </div>
                    <div>
                      <div className="text-3xl font-bold gradient-text-premium">{appState?.stats.totalBeneficiaries || 0}</div>
                      <p className="text-xs text-muted-foreground mt-1">
                        {appState?.stats.totalBeneficiaries === 0 ? 'No beneficiaries added' : 'Configured recipients'}
                      </p>
                    </div>
                  </div>

                  <div className="premium-card p-6 hover:scale-105 transition-transform">
                    <div className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <h3 className="text-sm font-medium text-muted-foreground">Heartbeat Status</h3>
                      <Heart className={`h-5 w-5 ${getHeartbeatStatusInfo().color === 'green' ? 'text-green-500 heartbeat-indicator' :
                        getHeartbeatStatusInfo().color === 'yellow' ? 'text-yellow-500' : 'text-red-500'
                        }`} />
                    </div>
                    <div>
                      <div className={`text-3xl font-bold ${getHeartbeatStatusInfo().color === 'green' ? 'text-green-600 dark:text-green-400' :
                        getHeartbeatStatusInfo().color === 'yellow' ? 'text-yellow-600 dark:text-yellow-400' :
                          'text-red-600 dark:text-red-400'
                        }`}>
                        {getHeartbeatStatusInfo().status}
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">
                        Last: {getHeartbeatStatusInfo().lastTime}
                      </p>
                    </div>
                  </div>

                  <div className="premium-card p-6 hover:scale-105 transition-transform">
                    <div className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <h3 className="text-sm font-medium text-muted-foreground">System Status</h3>
                      <CheckCircle className={`h-5 w-5 ${getSystemStatusInfo().color === 'green' ? 'text-green-500' :
                        getSystemStatusInfo().color === 'yellow' ? 'text-yellow-500' :
                          'text-red-500'
                        }`} />
                    </div>
                    <div>
                      <div className={`text-3xl font-bold ${getSystemStatusInfo().color === 'green' ? 'text-green-600 dark:text-green-400' :
                        getSystemStatusInfo().color === 'yellow' ? 'text-yellow-600 dark:text-yellow-400' :
                          'text-red-600 dark:text-red-400'
                        }`}>
                        {getSystemStatusInfo().status}
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">
                        {appState?.keyDistributions.length || 0} key distributions active
                      </p>
                    </div>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="premium-card p-6">
                    <h3 className="text-xl font-bold mb-2 gradient-text-premium">Quick Actions</h3>
                    <p className="text-sm text-muted-foreground mb-6">Get started with your digital will</p>
                    <div className="space-y-3">
                      <button
                        className="w-full flex items-center justify-start px-6 py-4 rounded-xl bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-950/30 dark:to-cyan-950/30 hover:from-blue-100 hover:to-cyan-100 dark:hover:from-blue-900/40 dark:hover:to-cyan-900/40 transition-all duration-300 hover:scale-105 border border-blue-200 dark:border-blue-800"
                        onClick={() => setActiveTab('assets')}
                      >
                        <div className="icon-container w-10 h-10 mr-3 bg-gradient-to-br from-blue-500 to-cyan-600">
                          <FileText className="h-5 w-5 text-white" />
                        </div>
                        <span className="font-medium">
                          {appState?.stats.totalAssets === 0 ? 'Create Your First Asset' : 'Manage Assets'}
                        </span>
                      </button>
                      <button
                        className="w-full flex items-center justify-start px-6 py-4 rounded-xl bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950/30 dark:to-emerald-950/30 hover:from-green-100 hover:to-emerald-100 dark:hover:from-green-900/40 dark:hover:to-emerald-900/40 transition-all duration-300 hover:scale-105 border border-green-200 dark:border-green-800"
                        onClick={() => setActiveTab('beneficiaries')}
                      >
                        <div className="icon-container w-10 h-10 mr-3 bg-gradient-to-br from-green-500 to-emerald-600">
                          <Users className="h-5 w-5 text-white" />
                        </div>
                        <span className="font-medium">
                          {appState?.stats.totalBeneficiaries === 0 ? 'Add Beneficiaries' : 'Manage Beneficiaries'}
                        </span>
                      </button>
                      <button
                        className="w-full flex items-center justify-start px-6 py-4 rounded-xl bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-950/30 dark:to-pink-950/30 hover:from-purple-100 hover:to-pink-100 dark:hover:from-purple-900/40 dark:hover:to-pink-900/40 transition-all duration-300 hover:scale-105 border border-purple-200 dark:border-purple-800"
                        onClick={() => setActiveTab('heartbeat')}
                      >
                        <div className="icon-container w-10 h-10 mr-3 bg-gradient-to-br from-purple-500 to-pink-600">
                          <Heart className="h-5 w-5 text-white" />
                        </div>
                        <span className="font-medium">
                          {getHeartbeatStatusInfo().status === 'Active' ? 'View Heartbeat' : 'Record Heartbeat'}
                        </span>
                      </button>
                    </div>
                  </div>

                  <div className="premium-card p-6">
                    <h3 className="text-xl font-bold mb-2 gradient-text-premium">Security Overview</h3>
                    <p className="text-sm text-muted-foreground mb-6">Your data protection status</p>
                    <div className="space-y-4">
                      <div className="flex items-center space-x-3 p-3 rounded-lg bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-800">
                        <CheckCircle className={`h-5 w-5 ${appState?.settings.encryptionEnabled ? 'text-green-600 neon-glow-green' : 'text-gray-400'
                          }`} />
                        <span className="text-sm font-medium">
                          Client-side encryption {appState?.settings.encryptionEnabled ? 'enabled' : 'disabled'}
                        </span>
                      </div>
                      <div className="flex items-center space-x-3 p-3 rounded-lg bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800">
                        <CheckCircle className={`h-5 w-5 ${(appState?.keyDistributions.length || 0) > 0 ? 'text-blue-600 neon-glow-blue' : 'text-gray-400'
                          }`} />
                        <span className="text-sm font-medium">
                          Shamir Secret Sharing {(appState?.keyDistributions.length || 0) > 0 ? 'active' : 'inactive'}
                        </span>
                      </div>
                      <div className="flex items-center space-x-3 p-3 rounded-lg bg-purple-50 dark:bg-purple-950/30 border border-purple-200 dark:border-purple-800">
                        <CheckCircle className="h-5 w-5 text-purple-600 neon-glow-purple" />
                        <span className="text-sm font-medium">Decentralized storage ready</span>
                      </div>
                      <div className="flex items-center space-x-3 p-3 rounded-lg bg-orange-50 dark:bg-orange-950/30 border border-orange-200 dark:border-orange-800">
                        <CheckCircle className="h-5 w-5 text-orange-600" />
                        <span className="text-sm font-medium">Smart contracts deployed</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Recent Activity */}
                {appState && (appState.assets.length > 0 || appState.beneficiaries.length > 0 || appState.heartbeats.length > 0) && (
                  <Card>
                    <CardHeader>
                      <CardTitle>Recent Activity</CardTitle>
                      <CardDescription>Latest system activity</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {appState.heartbeats.length > 0 && (
                          <div className="flex items-center space-x-3 text-sm">
                            <Heart className="h-4 w-4 text-green-600" />
                            <span>Last heartbeat recorded</span>
                            <span className="text-muted-foreground">
                              {new Date(appState.stats.lastHeartbeat).toLocaleString()}
                            </span>
                          </div>
                        )}
                        {appState.assets.length > 0 && (
                          <div className="flex items-center space-x-3 text-sm">
                            <FileText className="h-4 w-4 text-blue-600" />
                            <span>{appState.assets.length} asset{appState.assets.length !== 1 ? 's' : ''} encrypted and stored</span>
                          </div>
                        )}
                        {appState.beneficiaries.length > 0 && (
                          <div className="flex items-center space-x-3 text-sm">
                            <Users className="h-4 w-4 text-purple-600" />
                            <span>{appState.beneficiaries.length} beneficiar{appState.beneficiaries.length !== 1 ? 'ies' : 'y'} configured</span>
                          </div>
                        )}
                        {appState.keyDistributions.length > 0 && (
                          <div className="flex items-center space-x-3 text-sm">
                            <Key className="h-4 w-4 text-orange-600" />
                            <span>{appState.keyDistributions.length} key distribution{appState.keyDistributions.length !== 1 ? 's' : ''} active</span>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                )}
              </>
            )}
          </TabsContent>

          <TabsContent value="assets">
            <AssetCreationForm />
          </TabsContent>

          <TabsContent value="beneficiaries">
            <BeneficiaryManager />
          </TabsContent>

          <TabsContent value="heartbeat">
            <HeartbeatMonitor />
          </TabsContent>

          <TabsContent value="status">
            <SystemStatus />
          </TabsContent>
        </Tabs>
      </div>

      {/* Wallet Connect Modal */}
      <WalletConnectModal
        isOpen={showWalletModal}
        onClose={() => setShowWalletModal(false)}
        onConnect={handleWalletConnect}
        isConnecting={isConnecting}
      />
    </div>
  )
}