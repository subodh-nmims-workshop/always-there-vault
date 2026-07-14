'use client'

import React, { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react'
import WebStorageService, { AppState } from '@/lib/storage'
import { useSyncData } from '@/hooks/useSyncData'

interface AppContextType {
    state: AppState | null
    isLoading: boolean
    refreshState: () => Promise<void>
}

const AppContext = createContext<AppContextType | undefined>(undefined)

export function AppProvider({ children }: { children: ReactNode }) {
    const [state, setState] = useState<AppState | null>(null)
    const [isLoading, setIsLoading] = useState(true)

    // Call the synchronization hook to auto-sync backend data
    useSyncData()

    const refreshState = useCallback(async () => {
        try {
            const storage = WebStorageService.getInstance()
            const newState = await storage.getAppState()
            setState(newState)
        } catch (error) {
            console.error('Failed to load app state:', error)
        } finally {
            setIsLoading(false)
        }
    }, [])

    useEffect(() => {
        refreshState()

        // Add event listener for cross-tab sync if needed
        const handleStorageChange = (e: StorageEvent) => {
            if (e.key === 'digital-will-settings' || e.key === 'dwp_heartbeats') {
                refreshState()
            }
        }

        // Listen for backend data sync complete events
        const handleSyncEvent = () => {
            refreshState()
        }

        window.addEventListener('storage', handleStorageChange)
        window.addEventListener('dwp-state-synced', handleSyncEvent)

        return () => {
            window.removeEventListener('storage', handleStorageChange)
            window.removeEventListener('dwp-state-synced', handleSyncEvent)
        }
    }, [refreshState])

    return (
        <AppContext.Provider value={{ state, isLoading, refreshState }}>
            {children}
        </AppContext.Provider>
    )
}

export function useApp() {
    const context = useContext(AppContext)
    if (context === undefined) {
        throw new Error('useApp must be used within an AppProvider')
    }
    return context
}
