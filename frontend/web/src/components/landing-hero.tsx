'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import {
  Shield,
  Lock,
  Key,
  Globe,
  Zap,
  Heart,
  Users,
  FileText,
  Clock,
  CheckCircle,
  ArrowRight,
  Github,
  Twitter,
  MessageCircle,
} from 'lucide-react'
import Link from 'next/link'
import { useTranslation } from '@/hooks/use-translation'

interface LandingHeroProps {
  onGetStarted: () => void
}

export function LandingHero({ onGetStarted }: LandingHeroProps) {
  const { t } = useTranslation()
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-purple-900/20 dark:to-blue-900/20" />

        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob" />
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000" />
          <div className="absolute top-40 left-40 w-80 h-80 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000" />
        </div>

        {/* Content */}
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
          {/* Header */}
          <div className="text-center space-y-8 slide-up">
            <Badge variant="secondary" className="px-4 py-2 text-sm">
              <Zap className="h-3 w-3 mr-2 inline" />
              {t('hero_badge')}
            </Badge>

            <h1 className="text-5xl md:text-7xl font-bold tracking-tight">
              <span className="gradient-text">{t('hero_title')}</span>
              <br />
              <span className="text-gray-900 dark:text-white">{t('hero_title_accent')}</span>
            </h1>

            <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              {t('hero_subtitle')}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button
                size="lg"
                className="gradient-bg-blue text-white px-8 py-6 text-lg"
                onClick={onGetStarted}
              >
                {t('hero_cta')}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="px-8 py-6 text-lg"
              >
                Watch Demo
              </Button>
            </div>

            {/* Trust indicators */}
            <div className="flex flex-wrap justify-center gap-6 pt-8 text-sm text-gray-600 dark:text-gray-400">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <span>No credit card required</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <span>Open source</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <span>Audited smart contracts</span>
              </div>
            </div>
          </div>

          {/* Feature badges */}
          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            <div className="text-center p-4 rounded-lg bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm">
              <Lock className="h-8 w-8 mx-auto mb-2 text-blue-600" />
              <p className="font-semibold">Client-Side</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Encryption</p>
            </div>
            <div className="text-center p-4 rounded-lg bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm">
              <Key className="h-8 w-8 mx-auto mb-2 text-purple-600" />
              <p className="font-semibold">Shamir Secret</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Sharing</p>
            </div>
            <div className="text-center p-4 rounded-lg bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm">
              <Globe className="h-8 w-8 mx-auto mb-2 text-green-600" />
              <p className="font-semibold">Decentralized</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Storage</p>
            </div>
            <div className="text-center p-4 rounded-lg bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm">
              <Zap className="h-8 w-8 mx-auto mb-2 text-orange-600" />
              <p className="font-semibold">Smart Contract</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Automation</p>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Why Choose Digital Will Protocol?</h2>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              The most secure and user-friendly way to protect your digital legacy
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="crypto-card border-2 hover:border-blue-500 transition-all">
              <CardHeader>
                <Shield className="h-12 w-12 text-blue-600 mb-4" />
                <CardTitle className="text-2xl">Zero Trust Security</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-gray-600 dark:text-gray-400">
                  Your data is encrypted client-side with AES-256-GCM. Our servers never see your secrets.
                </p>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600 mt-0.5" />
                    <span>Military-grade encryption</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600 mt-0.5" />
                    <span>No server-side decryption</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600 mt-0.5" />
                    <span>Audited smart contracts</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="crypto-card border-2 hover:border-purple-500 transition-all">
              <CardHeader>
                <Users className="h-12 w-12 text-purple-600 mb-4" />
                <CardTitle className="text-2xl">Granular Control</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-gray-600 dark:text-gray-400">
                  Each asset has its own rules, beneficiaries, and release conditions. You're in complete control.
                </p>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600 mt-0.5" />
                    <span>Per-asset beneficiaries</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600 mt-0.5" />
                    <span>Custom release conditions</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600 mt-0.5" />
                    <span>Emergency override</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="crypto-card border-2 hover:border-green-500 transition-all">
              <CardHeader>
                <Clock className="h-12 w-12 text-green-600 mb-4" />
                <CardTitle className="text-2xl">Automated Execution</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-gray-600 dark:text-gray-400">
                  Smart contracts handle everything automatically. No lawyers, no courts, no delays.
                </p>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600 mt-0.5" />
                    <span>Heartbeat monitoring</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600 mt-0.5" />
                    <span>Automatic asset release</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600 mt-0.5" />
                    <span>Global accessibility</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* How It Works */}
      <div className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">How It Works</h2>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              Four simple steps to secure your digital legacy
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto text-white text-2xl font-bold">
                1
              </div>
              <FileText className="h-12 w-12 mx-auto text-blue-600" />
              <h3 className="text-xl font-semibold">Create Assets</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Upload files, messages, or crypto keys. Everything is encrypted in your browser.
              </p>
            </div>

            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center mx-auto text-white text-2xl font-bold">
                2
              </div>
              <Lock className="h-12 w-12 mx-auto text-purple-600" />
              <h3 className="text-xl font-semibold">Encrypt & Split</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Data encrypted with AES-256, keys split into 5 shares using Shamir Secret Sharing.
              </p>
            </div>

            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto text-white text-2xl font-bold">
                3
              </div>
              <Heart className="h-12 w-12 mx-auto text-green-600" />
              <h3 className="text-xl font-semibold">Heartbeat Monitor</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Regular proof-of-life signals keep your assets secure until you're inactive.
              </p>
            </div>

            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full flex items-center justify-center mx-auto text-white text-2xl font-bold">
                4
              </div>
              <Users className="h-12 w-12 mx-auto text-orange-600" />
              <h3 className="text-xl font-semibold">Auto Release</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Assets automatically released to beneficiaries when conditions are met.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-20 bg-gradient-to-br from-blue-600 to-purple-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
          <h2 className="text-4xl md:text-5xl font-bold">
            Ready to Secure Your Digital Legacy?
          </h2>
          <p className="text-xl opacity-90">
            Join thousands of users protecting their digital assets with military-grade encryption
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              variant="secondary"
              className="px-8 py-6 text-lg"
              onClick={onGetStarted}
            >
              Get Started Free
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="px-8 py-6 text-lg border-white text-white hover:bg-white hover:text-blue-600"
            >
              View Documentation
            </Button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="py-12 bg-[#050a1a] text-slate-400 border-t border-white/5 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <div className="text-[#2b52ff] flex items-center justify-center">
                  <Shield className="w-8 h-8" />
                </div>
                <span className="text-white font-bold text-lg tracking-tight">AlwaysThere</span>
              </div>
              <p className="text-sm">
                Securing digital legacies for the decentralized future. Your assets, your rules.
              </p>
            </div>

            <div>
              <h4 className="text-white font-bold mb-4">Product</h4>
              <ul className="space-y-3 text-sm">
                <li><Link href="/features" className="hover:text-[#2b52ff] transition-colors">Features</Link></li>
                <li><Link href="/security" className="hover:text-[#2b52ff] transition-colors">Security</Link></li>
                <li><Link href="/pricing" className="hover:text-[#2b52ff] transition-colors">Pricing</Link></li>
                <li><Link href="/roadmap" className="hover:text-[#2b52ff] transition-colors">Roadmap</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-bold mb-4">Resources</h4>
              <ul className="space-y-3 text-sm">
                <li><Link href="/docs" className="hover:text-[#2b52ff] transition-colors">Documentation</Link></li>
                <li><Link href="/api" className="hover:text-[#2b52ff] transition-colors">API Reference</Link></li>
                <li><Link href="/guides" className="hover:text-[#2b52ff] transition-colors">Guides</Link></li>
                <li><Link href="/support" className="hover:text-[#2b52ff] transition-colors">Support</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-bold mb-4">Company</h4>
              <ul className="space-y-3 text-sm">
                <li><Link href="/about" className="hover:text-[#2b52ff] transition-colors">About</Link></li>
                <li><Link href="/blog" className="hover:text-[#2b52ff] transition-colors">Blog</Link></li>
                <li><Link href="/careers" className="hover:text-[#2b52ff] transition-colors">Careers</Link></li>
                <li><Link href="/contact" className="hover:text-[#2b52ff] transition-colors">Contact</Link></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center text-sm">
            <p>© 2026 AlwaysThere. All rights reserved.</p>
            <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 mt-4 md:mt-0">
              <Link href="/privacy" className="hover:text-[#2b52ff] transition-colors">Privacy Policy</Link>
              <Link href="/terms" className="hover:text-[#2b52ff] transition-colors">Terms of Service</Link>
              <Link href="/security" className="hover:text-[#2b52ff] transition-colors">Security</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
