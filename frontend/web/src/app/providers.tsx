'use client'

import { ReactNode } from 'react'
import { ThemeProvider } from 'next-themes'
import { AppProvider } from '@/contexts/AppContext'

interface ProvidersProps {
  children: ReactNode
}

export function Providers({ children }: ProvidersProps) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <AppProvider>
        {children}
      </AppProvider>
    </ThemeProvider>
  )
}