'use client'

import { ReactNode } from 'react'
import { ThemeProvider } from 'next-themes'
import { AppProvider } from '@/contexts/AppContext'
import { SubscriptionProvider } from '@/contexts/SubscriptionContext'
import { ErrorBoundary } from '@/components/ErrorBoundary'

interface ProvidersProps {
  children: ReactNode
}

export function Providers({ children }: ProvidersProps) {
  return (
    <ErrorBoundary>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        <SubscriptionProvider>
          <AppProvider>
            {children}
          </AppProvider>
        </SubscriptionProvider>
      </ThemeProvider>
    </ErrorBoundary>
  )
}