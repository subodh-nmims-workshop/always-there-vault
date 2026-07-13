'use client'

import WebStorageService from '@/lib/storage'

const BACKEND_URL = process.env.NEXT_PUBLIC_API_URL || 'https://always-there-protocol-api.onrender.com' /* 'http://localhost:7001' */

export interface HeartbeatPayload {
    walletAddress: string
    method: 'wallet_signature' | 'biometric' | 'two_factor' | 'manual'
    signature?: string
    ipAddress?: string
}

export interface HeartbeatActionResult {
    success: boolean
    data?: any
    syncFailed?: boolean
    error?: string
}

export interface SettingsActionResult {
    success: boolean
    syncFailed?: boolean
    verificationRequired?: boolean
    pendingEmail?: string
    error?: string
}

export async function recordHeartbeat(payload: HeartbeatPayload): Promise<HeartbeatActionResult> {
    try {
        const storage = WebStorageService.getInstance()
        const heartbeat = {
            id: Date.now().toString(),
            timestamp: Date.now(),
            method: payload.method,
            signature: payload.signature || '',
            verified: true
        }

        await storage.saveHeartbeat(heartbeat)

        // SYNC TO BACKEND for email alerts and cron monitoring
        try {
            const apiEndpoint = process.env.NEXT_PUBLIC_API_URL || 'https://always-there-protocol-api.onrender.com' /* 'http://localhost:7001' */
            const token = localStorage.getItem('dwp_token')
            if (!token) throw new Error('No authentication token found. Please reconnect your wallet.')

            const response = await fetch(`${apiEndpoint}/api/heartbeat`, {
                method: 'POST',
                headers: { 
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ method: payload.method, signature: payload.signature })
            })
            if (!response.ok) {
                if (response.status === 401) {
                    localStorage.removeItem('dwp_token')
                    throw new Error('Authentication expired. Please reconnect your wallet.')
                }
                throw new Error(`Heartbeat sync failed: ${response.statusText}`)
            }
            console.log('✅ Heartbeat synced to backend')
        } catch (syncErr: any) {
            console.warn('⚠️ Backend sync failed', syncErr)
            return { success: true, syncFailed: true, data: heartbeat, error: syncErr.message || 'Failed to sync heartbeat with protocol cloud.' }
        }

        return { success: true, data: heartbeat }
    } catch (error: any) {
        console.error('Heartbeat action error:', error)
        return { success: false, error: error.message || 'Failed to communicate with protocol network.' }
    }
}

export async function getHeartbeatStatus(walletAddress: string) {
    try {
        const storage = WebStorageService.getInstance()

        // Sync latest heartbeat timestamp from backend if online
        try {
            const apiEndpoint = process.env.NEXT_PUBLIC_API_URL || 'https://always-there-protocol-api.onrender.com'
            const token = localStorage.getItem('dwp_token')
            if (token) {
                const res = await fetch(`${apiEndpoint}/api/heartbeat/status`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                })
                if (res.ok) {
                    const data = await res.json()
                    if (data && data.lastHeartbeat) {
                        const backendTs = new Date(data.lastHeartbeat).getTime()
                        const localHeartbeats = await storage.getAllHeartbeats()
                        const maxLocal = localHeartbeats.length > 0 ? Math.max(...localHeartbeats.map((h: any) => h.timestamp)) : 0
                        if (backendTs > maxLocal) {
                            await storage.saveHeartbeat({
                                id: `backend_sync_${backendTs}`,
                                timestamp: backendTs,
                                method: 'sync',
                                verified: true
                            })
                        }
                    }
                } else if (res.status === 401) {
                    localStorage.removeItem('dwp_token')
                }
            }
        } catch (syncErr) {
            console.warn('⚠️ Status sync from backend failed (offline fallback)', syncErr)
        }

        const heartbeats = await storage.getAllHeartbeats()
        const settings = storage.getSettings()

        const intervalDays = settings.heartbeatInterval || 30
        const gracePeriodDays = settings.gracePeriod || 14

        const intervalMs = intervalDays * 24 * 60 * 60 * 1000;
        const graceMs = gracePeriodDays * 24 * 60 * 60 * 1000;

        if (heartbeats.length === 0) {
            let initialTime = Date.now()
            if (typeof window !== 'undefined') {
                const storageKey = `dwp_initial_heartbeat_${walletAddress}`
                const cached = localStorage.getItem(storageKey)
                if (cached) {
                    initialTime = parseInt(cached, 10)
                } else {
                    localStorage.setItem(storageKey, initialTime.toString())
                }
            }

            const nextDue = initialTime + intervalMs
            const msSince = Date.now() - initialTime
            let status = 'active'
            let isOverdue = false

            if (msSince > intervalMs + graceMs) {
                status = 'triggered'
                isOverdue = true
            } else if (msSince > intervalMs) {
                status = 'grace_period'
                isOverdue = true
            }

            const daysUntilDue = Math.ceil((nextDue - Date.now()) / (1000 * 60 * 60 * 24))

            return {
                success: true,
                status,
                lastHeartbeat: initialTime,
                nextDue,
                daysUntilDue,
                isOverdue,
                interval: intervalDays,
                gracePeriod: gracePeriodDays
            }
        }

        const lastHeartbeat = Math.max(...heartbeats.map((h: any) => h.timestamp))
        const msSince = Date.now() - lastHeartbeat;

        const nextDue = lastHeartbeat + intervalMs
        let status = 'active'
        let isOverdue = false

        if (msSince > intervalMs + graceMs) {
            status = 'triggered'
            isOverdue = true
        } else if (msSince > intervalMs) {
            status = 'grace_period'
            isOverdue = true
        }

        const daysUntilDue = Math.ceil((nextDue - Date.now()) / (1000 * 60 * 60 * 24))

        return {
            success: true,
            status,
            lastHeartbeat,
            nextDue,
            daysUntilDue,
            isOverdue,
            interval: intervalDays,
            gracePeriod: gracePeriodDays
        }
    } catch (error) {
        console.error('Status check error:', error)
        return { success: false, error: 'Network disconnected.' }
    }
}

export async function getHeartbeatHistory(walletAddress: string) {
    try {
        const storage = WebStorageService.getInstance()
        const heartbeats = await storage.getAllHeartbeats()
        return { success: true, heartbeats }
    } catch (error) {
        console.error('History fetch error:', error)
        return { success: false, heartbeats: [] }
    }
}

export async function getHeartbeatSettings(walletAddress: string) {
    try {
        const storage = WebStorageService.getInstance()
        
        try {
            const apiEndpoint = process.env.NEXT_PUBLIC_API_URL || 'https://always-there-protocol-api.onrender.com' /* 'http://localhost:7001' */
            const token = localStorage.getItem('dwp_token')
            if (token) {
                const res = await fetch(`${apiEndpoint}/api/heartbeat/settings`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                })
                if (res.ok) {
                    const data = await res.json()
                    if (data && data.success) {
                        storage.saveSettings({
                            heartbeatInterval: data.interval,
                            gracePeriod: data.gracePeriod,
                            bufferMisses: data.bufferMisses
                        })
                    }
                } else if (res.status === 401) {
                    localStorage.removeItem('dwp_token')
                }
            }
        } catch (syncErr) {
            console.warn('⚠️ Settings sync from backend failed (offline fallback)', syncErr)
        }

        const settings = storage.getSettings()
        return { success: true, interval: settings.heartbeatInterval, gracePeriod: settings.gracePeriod, bufferMisses: settings.bufferMisses }
    } catch (error) {
        console.error('Settings fetch error:', error)
        return { success: false, interval: 30, gracePeriod: 14, bufferMisses: 3 }
    }
}

export async function updateHeartbeatSettings(walletAddress: string, interval: number, gracePeriod: number, bufferMisses: number = 3): Promise<SettingsActionResult> {
    try {
        const storage = WebStorageService.getInstance()
        storage.saveSettings({ heartbeatInterval: interval, gracePeriod, bufferMisses })

        // SYNC TO BACKEND
        try {
            const apiEndpoint = process.env.NEXT_PUBLIC_API_URL || 'https://always-there-protocol-api.onrender.com' /* 'http://localhost:7001' */
            const email = localStorage.getItem('dwp_user_email') || ''
            const token = localStorage.getItem('dwp_token')
            if (!token) throw new Error('No authentication token found. Please reconnect your wallet.')
            
            // First update/create user profile (ensure email is in backend)
            const profileRes = await fetch(`${apiEndpoint}/api/users/profile`, {
                method: 'POST',
                headers: { 
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ email })
            })
            if (!profileRes.ok) {
                if (profileRes.status === 401) {
                    localStorage.removeItem('dwp_token')
                    throw new Error('Authentication expired. Please reconnect your wallet.')
                }
                const errorData = await profileRes.json().catch(() => ({}))
                throw new Error(errorData.message || `Profile sync failed: ${profileRes.statusText}`)
            }
            const profileData = await profileRes.json();

            // Then update heartbeat config
            const settingsRes = await fetch(`${apiEndpoint}/api/heartbeat/settings`, {
                method: 'PUT',
                headers: { 
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ 
                    interval, 
                    gracePeriod,
                    bufferMisses
                })
            })
            if (!settingsRes.ok) {
                if (settingsRes.status === 401) {
                    localStorage.removeItem('dwp_token')
                    throw new Error('Authentication expired. Please reconnect your wallet.')
                }
                throw new Error(`Settings sync failed: ${settingsRes.statusText}`)
            }
            console.log('✅ Settings synced to backend')
            return { 
                success: true, 
                verificationRequired: profileData.verificationRequired, 
                pendingEmail: profileData.pendingEmail 
            }
        } catch (syncErr: any) {
            console.warn('⚠️ Settings sync failed', syncErr)
            return { success: true, syncFailed: true, error: syncErr.message || 'Failed to sync settings with protocol cloud.' }
        }
    } catch (error: any) {
        console.error('Settings update error:', error)
        return { success: false, error: error.message || 'Failed to update protocol settings.' }
    }
}
