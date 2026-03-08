'use client'

import WebStorageService from '@/lib/storage'

const BACKEND_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:7001'

export interface HeartbeatPayload {
    walletAddress: string
    method: 'wallet_signature' | 'biometric' | 'two_factor' | 'manual'
    signature?: string
    ipAddress?: string
}

export async function recordHeartbeat(payload: HeartbeatPayload) {
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

        return { success: true, data: heartbeat }
    } catch (error) {
        console.error('Heartbeat action error:', error)
        return { success: false, error: 'Failed to communicate with protocol network.' }
    }
}

export async function getHeartbeatStatus(walletAddress: string) {
    try {
        const storage = WebStorageService.getInstance()
        const heartbeats = await storage.getAllHeartbeats()
        const settings = storage.getSettings()

        const intervalDays = settings.heartbeatInterval || 30
        const gracePeriodDays = settings.gracePeriod || 14

        if (heartbeats.length === 0) {
            const nextDue = Date.now() + (intervalDays * 24 * 60 * 60 * 1000)
            const daysUntilDue = Math.ceil((nextDue - Date.now()) / (1000 * 60 * 60 * 24))
            return {
                success: true,
                status: 'active',
                lastHeartbeat: Date.now(),
                nextDue,
                daysUntilDue,
                isOverdue: false
            }
        }

        const lastHeartbeat = Math.max(...heartbeats.map((h: any) => h.timestamp))
        const daysSince = (Date.now() - lastHeartbeat) / (1000 * 60 * 60 * 24)

        const nextDue = lastHeartbeat + (intervalDays * 24 * 60 * 60 * 1000)
        let status = 'active'
        let isOverdue = false

        if (daysSince > intervalDays + gracePeriodDays) {
            status = 'triggered'
            isOverdue = true
        } else if (daysSince > intervalDays) {
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
        const settings = storage.getSettings()
        return { success: true, interval: settings.heartbeatInterval, gracePeriod: settings.gracePeriod }
    } catch (error) {
        console.error('Settings fetch error:', error)
        return { success: false, interval: 30, gracePeriod: 14 }
    }
}

export async function updateHeartbeatSettings(walletAddress: string, interval: number, gracePeriod: number) {
    try {
        const storage = WebStorageService.getInstance()
        storage.saveSettings({ heartbeatInterval: interval, gracePeriod })
        return { success: true }
    } catch (error) {
        console.error('Settings update error:', error)
        return { success: false }
    }
}
