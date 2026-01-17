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
import WebStorageService, { AppState } from '@/lib/storage'

export default function HomePage() {
  const [isConnected, setIsConnected] = useState(false)
  const [activeTab, setActiveTab] = useState('overview')
  const [address] = useState('0x742d35Cc6634C0532925a3b8D4C2C4e0C8b83c8e')
  const [appState, setAppState] = useState<AppState | null>(null)
  const [isLoading, setIsLoading] = useState(true)

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
    setIsConnected(true)
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
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          {/* Hero Section */}
          <div className="space-y-6">
            <div className="flex items-center justify-center space-x-2 mb-8">
              <Shield className="h-12 w-12 text-blue-600" />
              <h1 className="text-4xl font-bold gradient-text">
                Decentralized Digital Will Protocol
              </h1>
            </div>
            
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              A decentralized, non-custodial system that encrypts your digital life and 
              automatically releases only what you choose, only to whom you choose, 
              only when you are no longer active.
            </p>
            
            <div className="flex flex-wrap justify-center gap-2 mt-6">
              <Badge variant="secondary" className="px-3 py-1">
                <Lock className="h-3 w-3 mr-1" />
                Client-side Encryption
              </Badge>
              <Badge variant="secondary" className="px-3 py-1">
                <Key className="h-3 w-3 mr-1" />
                Shamir Secret Sharing
              </Badge>
              <Badge variant="secondary" className="px-3 py-1">
                <Globe className="h-3 w-3 mr-1" />
                Decentralized Storage
              </Badge>
              <Badge variant="secondary" className="px-3 py-1">
                <Zap className="h-3 w-3 mr-1" />
                Smart Contract Automation
              </Badge>
            </div>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-3 gap-6 mt-12">
            <Card className="crypto-card">
              <CardHeader>
                <Shield className="h-8 w-8 text-blue-600 mb-2" />
                <CardTitle>Zero Trust Security</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Your data is encrypted client-side. Our servers never see your secrets.
                </p>
              </CardContent>
            </Card>

            <Card className="crypto-card">
              <CardHeader>
                <Users className="h-8 w-8 text-green-600 mb-2" />
                <CardTitle>Granular Control</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Each asset has its own rules, beneficiaries, and release conditions.
                </p>
              </CardContent>
            </Card>

            <Card className="crypto-card">
              <CardHeader>
                <Clock className="h-8 w-8 text-purple-600 mb-2" />
                <CardTitle>Automated Execution</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Smart contracts handle everything automatically. No human intervention needed.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Connect Wallet */}
          <div className="mt-12">
            <Card className="max-w-md mx-auto">
              <CardHeader>
                <CardTitle>Get Started</CardTitle>
                <CardDescription>
                  Connect your wallet to begin securing your digital inheritance
                </CardDescription>
              </CardHeader>
              <CardContent className="flex justify-center">
                <Button onClick={handleConnect} size="lg">
                  Connect Wallet (Demo)
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Architecture Overview */}
          <div className="mt-16 text-left">
            <h2 className="text-2xl font-bold text-center mb-8">How It Works</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="text-center space-y-2">
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto">
                  <FileText className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="font-semibold">1. Create Assets</h3>
                <p className="text-sm text-muted-foreground">
                  Upload files, messages, or crypto keys
                </p>
              </div>
              
              <div className="text-center space-y-2">
                <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto">
                  <Lock className="h-6 w-6 text-green-600" />
                </div>
                <h3 className="font-semibold">2. Encrypt & Split</h3>
                <p className="text-sm text-muted-foreground">
                  Data encrypted, keys split into 5 shares
                </p>
              </div>
              
              <div className="text-center space-y-2">
                <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center mx-auto">
                  <Heart className="h-6 w-6 text-purple-600" />
                </div>
                <h3 className="font-semibold">3. Heartbeat Monitor</h3>
                <p className="text-sm text-muted-foreground">
                  Regular proof-of-life signals
                </p>
              </div>
              
              <div className="text-center space-y-2">
                <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900 rounded-full flex items-center justify-center mx-auto">
                  <Users className="h-6 w-6 text-orange-600" />
                </div>
                <h3 className="font-semibold">4. Auto Release</h3>
                <p className="text-sm text-muted-foreground">
                  Assets released to beneficiaries
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-3">
            <Shield className="h-8 w-8 text-blue-600" />
            <div>
              <h1 className="text-2xl font-bold">Digital Will Protocol</h1>
              <p className="text-sm text-muted-foreground">
                Connected: {address?.slice(0, 6)}...{address?.slice(-4)}
              </p>
            </div>
          </div>
          <Button variant="outline" onClick={() => setIsConnected(false)}>
            Disconnect (Demo)
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
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Total Assets</CardTitle>
                      <FileText className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{appState?.stats.totalAssets || 0}</div>
                      <p className="text-xs text-muted-foreground">
                        {appState?.stats.totalAssets === 0 ? 'No assets created yet' : 'Encrypted assets'}
                      </p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Beneficiaries</CardTitle>
                      <Users className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{appState?.stats.totalBeneficiaries || 0}</div>
                      <p className="text-xs text-muted-foreground">
                        {appState?.stats.totalBeneficiaries === 0 ? 'No beneficiaries added' : 'Configured recipients'}
                      </p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Heartbeat Status</CardTitle>
                      <Heart className={`h-4 w-4 text-${getHeartbeatStatusInfo().color}-600 ${
                        getHeartbeatStatusInfo().color === 'green' ? 'heartbeat-indicator' : ''
                      }`} />
                    </CardHeader>
                    <CardContent>
                      <div className={`text-2xl font-bold text-${getHeartbeatStatusInfo().color}-600`}>
                        {getHeartbeatStatusInfo().status}
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Last: {getHeartbeatStatusInfo().lastTime}
                      </p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">System Status</CardTitle>
                      <CheckCircle className={`h-4 w-4 text-${getSystemStatusInfo().color}-600`} />
                    </CardHeader>
                    <CardContent>
                      <div className={`text-2xl font-bold text-${getSystemStatusInfo().color}-600`}>
                        {getSystemStatusInfo().status}
                      </div>
                      <p className="text-xs text-muted-foreground">
                        {appState?.keyDistributions.length || 0} key distributions active
                      </p>
                    </CardContent>
                  </Card>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Quick Actions</CardTitle>
                      <CardDescription>Get started with your digital will</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <Button 
                        className="w-full justify-start" 
                        variant="outline"
                        onClick={() => setActiveTab('assets')}
                      >
                        <FileText className="h-4 w-4 mr-2" />
                        {appState?.stats.totalAssets === 0 ? 'Create Your First Asset' : 'Manage Assets'}
                      </Button>
                      <Button 
                        className="w-full justify-start" 
                        variant="outline"
                        onClick={() => setActiveTab('beneficiaries')}
                      >
                        <Users className="h-4 w-4 mr-2" />
                        {appState?.stats.totalBeneficiaries === 0 ? 'Add Beneficiaries' : 'Manage Beneficiaries'}
                      </Button>
                      <Button 
                        className="w-full justify-start" 
                        variant="outline"
                        onClick={() => setActiveTab('heartbeat')}
                      >
                        <Heart className="h-4 w-4 mr-2" />
                        {getHeartbeatStatusInfo().status === 'Active' ? 'View Heartbeat' : 'Record Heartbeat'}
                      </Button>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Security Overview</CardTitle>
                      <CardDescription>Your data protection status</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex items-center space-x-2">
                        <CheckCircle className={`h-4 w-4 ${
                          appState?.settings.encryptionEnabled ? 'text-green-600' : 'text-gray-400'
                        }`} />
                        <span className="text-sm">
                          Client-side encryption {appState?.settings.encryptionEnabled ? 'enabled' : 'disabled'}
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <CheckCircle className={`h-4 w-4 ${
                          (appState?.keyDistributions.length || 0) > 0 ? 'text-green-600' : 'text-gray-400'
                        }`} />
                        <span className="text-sm">
                          Shamir Secret Sharing {(appState?.keyDistributions.length || 0) > 0 ? 'active' : 'inactive'}
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        <span className="text-sm">Decentralized storage ready</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        <span className="text-sm">Smart contracts deployed</span>
                      </div>
                    </CardContent>
                  </Card>
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
    </div>
  )
}