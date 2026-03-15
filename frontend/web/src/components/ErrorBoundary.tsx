'use client'

import React from 'react'

interface ErrorBoundaryProps {
  children: React.ReactNode
}

interface ErrorBoundaryState {
  hasError: boolean
  error?: Error
}

export class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    // Suppress browser extension errors
    if (error.message.includes('chrome.runtime.sendMessage') || 
        error.message.includes('Extension ID')) {
      console.warn('Browser extension error suppressed:', error)
      this.setState({ hasError: false })
      return
    }
    
    console.error('Error caught by boundary:', error, errorInfo)
  }

  render() {
    if (this.state.hasError && this.state.error) {
      // Don't show error UI for extension errors
      if (this.state.error.message.includes('chrome.runtime.sendMessage') || 
          this.state.error.message.includes('Extension ID')) {
        return this.props.children
      }

      return (
        <div className="min-h-screen flex items-center justify-center bg-slate-950 text-slate-50 p-4">
          <div className="max-w-md w-full bg-slate-900 rounded-lg p-6 border border-slate-800">
            <h2 className="text-xl font-bold text-red-500 mb-4">Something went wrong</h2>
            <p className="text-slate-300 mb-4">
              An error occurred while rendering this page.
            </p>
            <details className="mb-4">
              <summary className="cursor-pointer text-slate-400 hover:text-slate-300">
                Error details
              </summary>
              <pre className="mt-2 text-xs bg-slate-950 p-3 rounded overflow-auto">
                {this.state.error.message}
              </pre>
            </details>
            <button
              onClick={() => this.setState({ hasError: false })}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded transition-colors"
            >
              Try again
            </button>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}
