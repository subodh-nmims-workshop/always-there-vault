'use server'

import { revalidatePath } from 'next/cache'

const BACKEND_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:7001'

export interface HeartbeatPayload {
    walletAddress: string
    method: 'wallet_signature' | 'biometric' | 'two_factor' | 'manual'
    signature?: string
    ipAddress?: string
}

export async function recordHeartbeat(payload: HeartbeatPayload) {
    try {
        const res = await fetch(`${BACKEND_URL}/api/heartbeat`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload)
        })

        if (!res.ok) {
            throw new Error(`Failed to record heartbeat: ${res.statusText}`)
        }

        const data = await res.json()
        revalidatePath('/') // Revalidate the dashboard
        return { success: true, data }
    } catch (error) {
        console.error('Heartbeat action error:', error)
        return { success: false, error: 'Failed to communicate with protocol network.' }
    }
}

export async function getHeartbeatStatus(walletAddress: string) {
    try {
        const res = await fetch(`${BACKEND_URL}/api/heartbeat/status/${walletAddress}`, {
            cache: 'no-store'
        })

        if (!res.ok) {
            return { success: false, status: 'Not Found' }
        }

        const data = await res.json()
        return { success: true, ...data }
    } catch (error) {
        console.error('Status check error:', error)
        return { success: false, error: 'Network disconnected.' }
    }
}

export async function getHeartbeatHistory(walletAddress: string) {
    try {
        const res = await fetch(`${BACKEND_URL}/api/heartbeat/history/${walletAddress}`, {
            cache: 'no-store'
        })

        if (!res.ok) {
            return { success: true, heartbeats: [] }
        }

        const data = await res.json()
        return { success: true, heartbeats: data }
    } catch (error) {
        console.error('History fetch error:', error)
        return { success: false, heartbeats: [] }
    }
}

export async function getHeartbeatSettings(walletAddress: string) {
    try {
        const res = await fetch(`${BACKEND_URL}/api/heartbeat/settings/${walletAddress}`, {
            cache: 'no-store'
        })
        if (!res.ok) return { success: false, interval: 30, gracePeriod: 14 }
        const data = await res.json()
        return { success: true, ...data }
    } catch (error) {
        console.error('Settings fetch error:', error)
        return { success: false, interval: 30, gracePeriod: 14 }
    }
}

export async function updateHeartbeatSettings(walletAddress: string, interval: number, gracePeriod: number) {
    try {
        const res = await fetch(`${BACKEND_URL}/api/heartbeat/settings/${walletAddress}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ interval, gracePeriod })
        })
        if (!res.ok) return { success: false }
        return { success: true }
    } catch (error) {
        console.error('Settings update error:', error)
        return { success: false }
    }
}
