/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  reactStrictMode: true,
  env: {
    CUSTOM_KEY: process.env.CUSTOM_KEY,
  },
  // Turbopack configuration (Next.js 16+)
  turbopack: {},
  // Webpack fallback for compatibility
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        tls: false,
      };
    }
    return config;
  },
  // Prevent browser extension injection errors
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: "default-src 'self'; script-src 'self' 'unsafe-eval' 'unsafe-inline' https://www.googletagmanager.com; connect-src 'self' http://localhost:7001 http://127.0.0.1:8545 https://rpc.walletconnect.com https://relay.walletconnect.com wss://relay.walletconnect.com https://pulse.walletconnect.com https://*.infura.io https://*.alchemyapi.io; img-src 'self' blob: data: https://*.walletconnect.com https://*.rainbow.me https://*.coinbase.com; style-src 'self' 'unsafe-inline'; font-src 'self' data:; frame-src 'self' https://verify.walletconnect.com;",
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;