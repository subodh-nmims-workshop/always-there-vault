'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Heart, Clock, CheckCircle, AlertTriangle, Settings } from 'lucide-react'
import WebStorageService, { StoredHeartbeat } from '@/lib/storage'

export function HeartbeatMonitor() {
  const [lastHeartbeat, setLastHeartbeat] = useState<Date>(new Date())
  const [isRecording, setIsRecording] = useState(false)
  const [heartbeats, setHeartbeats] = useState<StoredHeartbeat[]>([])
  const [settings, setSettings] = useState({
    heartbeatInterval: 30,
    gracePeriod: 14
  })
  const [showSettings, setShowSettings] = useState(false)

  const storage = WebStorageService.getInstance()

  useEffect(() => {
    loadHeartbeats()
    loadSettings()
  }, [])

  const loadHeartbeats = async () => {
    try {
      const stored = await storage.getAllHeartbeats()
      setHeartbeats(stored)
      
      if (stored.length > 0) {
        const latest = stored.reduce((latest, current) => 
          current.timestamp > latest.timestamp ? current : latest
        )
        setLastHeartbeat(new Date(latest.timestamp))
      }
    } catch (error) {
      console.error('Failed to load heartbeats:', error)
    }
  }

  const loadSettings = () => {
    const appSettings = storage.getSettings()
    setSettings({
      heartbeatInterval: appSettings.heartbeatInterval,
      gracePeriod: appSettings.gracePeriod
    })
  }

  const handleHeartbeat = async () => {
    setIsRecording(true)
    
    try {
      // Simulate wallet signature or biometric verification
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      const heartbeat: StoredHeartbeat = {
        id: storage.generateId(),
        timestamp: Date.now(),
        method: 'wallet_signature',
        signature: generateMockSignature(),
        verified: true
      }
      
      await storage.saveHeartbeat(heartbeat)
      await loadHeartbeats()
      
      setLastHeartbeat(new Date(heartbeat.timestamp))
      
    } catch (error) {
      console.error('Failed to record heartbeat:', error)
      alert('Failed to record heartbeat. Please try again.')
    } finally {
      setIsRecording(false)
    }
  }

  const handleSettingsUpdate = (newSettings: typeof settings) => {
    setSettings(newSettings)
    storage.saveSettings({
      heartbeatInterval: newSettings.heartbeatInterval,
      gracePeriod: newSettings.gracePeriod
    })
    setShowSettings(false)
  }

  const generateMockSignature = (): string => {
    // Generate a mock signature for demo purposes
    return '0x' + Array.from({ length: 128 }, () => 
      Math.floor(Math.random() * 16).toString(16)
    ).join('')
  }

  const getHeartbeatStatus = () => {
    const now = Date.now()
    const daysSinceLastHeartbeat = (now - lastHeartbeat.getTime()) / (1000 * 60 * 60 * 24)
    
    if (daysSinceLastHeartbeat <= settings.heartbeatInterval) {
      return { status: 'active', color: 'green', message: 'Active' }
    } else if (daysSinceLastHeartbeat <= settings.heartbeatInterval + settings.gracePeriod) {
      return { status: 'grace', color: 'yellow', message: 'Grace Period' }
    } else {
      return { status: 'triggered', color: 'red', message: 'Triggered' }
    }
  }

  const getNextHeartbeatDue = (): Date => {
    return new Date(lastHeartbeat.getTime() + settings.heartbeatInterval * 24 * 60 * 60 * 1000)
  }

  const getDaysUntilDue = (): number => {
    const nextDue = getNextHeartbeatDue()
    const now = new Date()
    return Math.ceil((nextDue.getTime() - now.getTime()) / (1000 * 60 * 60 * 24))
  }

  const heartbeatStatus = getHeartbeatStatus()
  const daysUntilDue = getDaysUntilDue()

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Heart className="h-5 w-5 text-red-500" />
              <span>Heartbeat Monitor</span>
            </div>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => setShowSettings(true)}
            >
              <Settings className="h-4 w-4 mr-2" />
              Settings
            </Button>
          </CardTitle>
          <CardDescription>
            Regular proof-of-life signals to prevent accidental asset release
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Current Status */}
          <div className="grid md:grid-cols-3 gap-4">
            <div className={`text-center p-4 rounded-lg ${
              heartbeatStatus.color === 'green' ? 'bg-green-50 dark:bg-green-900/20' :
              heartbeatStatus.color === 'yellow' ? 'bg-yellow-50 dark:bg-yellow-900/20' :
              'bg-red-50 dark:bg-red-900/20'
            }`}>
              {heartbeatStatus.status === 'active' ? (
                <CheckCircle className={`h-8 w-8 mx-auto mb-2 text-${heartbeatStatus.color}-600`} />
              ) : heartbeatStatus.status === 'grace' ? (
                <AlertTriangle className={`h-8 w-8 mx-auto mb-2 text-${heartbeatStatus.color}-600`} />
              ) : (
                <AlertTriangle className={`h-8 w-8 mx-auto mb-2 text-${heartbeatStatus.color}-600`} />
              )}
              <p className={`font-medium text-${heartbeatStatus.color}-900 dark:text-${heartbeatStatus.color}-100`}>
                {heartbeatStatus.message}
              </p>
              <p className={`text-sm text-${heartbeatStatus.color}-700 dark:text-${heartbeatStatus.color}-200`}>
                System Status
              </p>
            </div>
            
            <div className="text-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <Clock className="h-8 w-8 text-blue-600 mx-auto mb-2" />
              <p className="font-medium text-blue-900 dark:text-blue-100">
                {settings.heartbeatInterval} Days
              </p>
              <p className="text-sm text-blue-700 dark:text-blue-200">Heartbeat Interval</p>
            </div>
            
            <div className="text-center p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
              <Heart className="h-8 w-8 text-purple-600 mx-auto mb-2" />
              <p className="font-medium text-purple-900 dark:text-purple-100">
                {lastHeartbeat.toLocaleDateString()}
              </p>
              <p className="text-sm text-purple-700 dark:text-purple-200">Last Heartbeat</p>
            </div>
          </div>

          {/* Status Alert */}
          {daysUntilDue <= 7 && daysUntilDue > 0 && (
            <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
              <div className="flex items-center space-x-2">
                <AlertTriangle className="h-5 w-5 text-yellow-600" />
                <p className="text-yellow-800 dark:text-yellow-200">
                  Heartbeat due in {daysUntilDue} day{daysUntilDue !== 1 ? 's' : ''}
                </p>
              </div>
            </div>
          )}

          {daysUntilDue <= 0 && (
            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
              <div className="flex items-center space-x-2">
                <AlertTriangle className="h-5 w-5 text-red-600" />
                <p className="text-red-800 dark:text-red-200">
                  Heartbeat is overdue! Record immediately to prevent asset release.
                </p>
              </div>
            </div>
          )}

          {/* Heartbeat Button */}
          <div className="text-center">
            <Button 
              onClick={handleHeartbeat}
              disabled={isRecording}
              size="lg"
              className="px-8"
            >
              {isRecording ? (
                <>
                  <Heart className="h-4 w-4 mr-2 animate-pulse" />
                  Recording...
                </>
              ) : (
                <>
                  <Heart className="h-4 w-4 mr-2" />
                  Record Heartbeat
                </>
              )}
            </Button>
            <p className="text-sm text-muted-foreground mt-2">
              Click to prove you're still active
            </p>
          </div>

          {/* Configuration */}
          <div className="border-t pt-6">
            <h3 className="font-medium mb-4">Configuration</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm">Heartbeat Interval</span>
                <span className="text-sm font-medium">{settings.heartbeatInterval} days</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Grace Period</span>
                <span className="text-sm font-medium">{settings.gracePeriod} days</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Next Required</span>
                <span className="text-sm font-medium">
                  {getNextHeartbeatDue().toLocaleDateString()}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Total Heartbeats</span>
                <span className="text-sm font-medium">{heartbeats.length}</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Settings Modal */}
      {showSettings && (
        <Card>
          <CardHeader>
            <CardTitle>Heartbeat Settings</CardTitle>
            <CardDescription>
              Configure your heartbeat monitoring preferences
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">
                Heartbeat Interval (days)
              </label>
              <select 
                className="w-full p-2 border rounded-md"
                value={settings.heartbeatInterval}
                onChange={(e) => setSettings(prev => ({ 
                  ...prev, 
                  heartbeatInterval: parseInt(e.target.value) 
                }))}
              >
                <option value={7}>7 days (Weekly)</option>
                <option value={14}>14 days (Bi-weekly)</option>
                <option value={30}>30 days (Monthly)</option>
                <option value={60}>60 days (Bi-monthly)</option>
                <option value={90}>90 days (Quarterly)</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Grace Period (days)
              </label>
              <select 
                className="w-full p-2 border rounded-md"
                value={settings.gracePeriod}
                onChange={(e) => setSettings(prev => ({ 
                  ...prev, 
                  gracePeriod: parseInt(e.target.value) 
                }))}
              >
                <option value={7}>7 days</option>
                <option value={14}>14 days</option>
                <option value={30}>30 days</option>
                <option value={60}>60 days</option>
              </select>
            </div>

            <div className="flex space-x-3">
              <Button 
                onClick={() => handleSettingsUpdate(settings)}
                className="flex-1"
              >
                Save Settings
              </Button>
              <Button 
                variant="outline"
                onClick={() => setShowSettings(false)}
              >
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}