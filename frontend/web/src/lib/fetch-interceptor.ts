/**
 * API Fetch Interceptor
 * Wraps the native fetch to handle:
 *  - JWT 401 expiry → auto redirect to login
 *  - Network failures → toast error
 *  - Rate limit 429 → friendly message
 */

const EXCLUDED_PATHS = ['/api/auth', '/api/login', '/api/register']

export function setupFetchInterceptor() {
  if (typeof window === 'undefined') return

  const originalFetch = window.fetch

  window.fetch = async function interceptedFetch(input: RequestInfo | URL, init?: RequestInit) {
    try {
      const response = await originalFetch(input, init)

      const url = typeof input === 'string' ? input : input.toString()
      const isExcluded = EXCLUDED_PATHS.some(path => url.includes(path))

      // 401 — JWT expired or invalid
      if (response.status === 401 && !isExcluded) {
        const cloned = response.clone()
        try {
          const data = await cloned.json()
          // Only redirect on actual auth errors, not on claim-asset endpoints
          if (data?.message?.toLowerCase().includes('unauthorized') ||
              data?.message?.toLowerCase().includes('jwt') ||
              data?.message?.toLowerCase().includes('token')) {
            console.warn('[Auth] Session expired — redirecting to login')
            // Clear stale auth data
            localStorage.removeItem('dwp_token')
            localStorage.removeItem('dwp_wallet_address')
            // Redirect only if not already on login/landing page
            if (!window.location.pathname.includes('/login') &&
                !window.location.pathname.includes('/beneficiary') &&
                window.location.pathname !== '/') {
              window.location.href = '/?session=expired'
            }
          }
        } catch (_) {
          // Non-JSON 401 — ignore
        }
      }

      // 429 — Rate limited
      if (response.status === 429) {
        console.warn('[RateLimit] Too many requests — slow down')
        // Toast will be shown by the calling component
      }

      return response
    } catch (err: any) {
      // Network failure
      if (err?.name === 'TypeError' && err?.message?.includes('fetch')) {
        console.error('[Network] Fetch failed — check connection', err)
      }
      throw err
    }
  }
}
