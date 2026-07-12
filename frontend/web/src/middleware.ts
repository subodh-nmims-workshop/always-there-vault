import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Generate a random UUID and convert it to Base64 to use as nonce
  const nonce = btoa(crypto.randomUUID());
  
  // Construct CSP directive header
  const cspHeader = `default-src 'self'; script-src 'self' 'nonce-${nonce}' 'strict-dynamic' 'unsafe-eval' https://www.googletagmanager.com https://www.paypal.com https://www.sandbox.paypal.com https://*.paypal.com https://static.cloudflareinsights.com; connect-src 'self' http://localhost:7001 http://127.0.0.1:8545 https://*.onrender.com https://cloudflare-eth.com https://eth.merkle.io https://rpc.walletconnect.com https://*.walletconnect.com https://*.walletconnect.org wss://*.walletconnect.org wss://relay.walletconnect.com https://pulse.walletconnect.com https://pulse.walletconnect.org https://api.web3modal.org https://*.web3modal.org https://*.infura.io https://*.alchemyapi.io https://*.paypal.com https://*.sandbox.paypal.com https://*.paypalobjects.com; img-src 'self' blob: data: https://*.walletconnect.com https://*.rainbow.me https://*.coinbase.com https://*.paypalobjects.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' data: https://fonts.gstatic.com; frame-src 'self' https://verify.walletconnect.com https://www.paypal.com https://www.sandbox.paypal.com https://*.paypal.com; media-src 'self' data: blob:;`;

  // Set the nonce in the request headers so Next.js reads it and injects it into script tags automatically
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set('x-nonce', nonce);
  requestHeaders.set('Content-Security-Policy', cspHeader);

  const response = NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });

  // Set the CSP header on the response
  response.headers.set('Content-Security-Policy', cspHeader);

  return response;
}

// Ensure middleware runs on all page requests, excluding static files / API routes
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    {
      source: '/((?!api|_next/static|_next/image|favicon.ico).*)',
      missing: [
        { type: 'header', key: 'next-router-prefetch' },
        { type: 'header', key: 'purpose', value: 'prefetch' },
      ],
    },
  ],
};
