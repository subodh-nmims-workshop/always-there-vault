/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  reactStrictMode: true,
  optimizeFonts: false,
  env: {
    CUSTOM_KEY: process.env.CUSTOM_KEY,
  },
  // Webpack fallback for compatibility
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        tls: false,
        '@react-native-async-storage/async-storage': false,
        'pino-pretty': false,
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
            value: "default-src 'self'; script-src 'self' 'unsafe-eval' 'unsafe-inline' https://www.googletagmanager.com https://www.paypal.com https://www.sandbox.paypal.com https://*.paypal.com; connect-src 'self' http://localhost:7001 http://127.0.0.1:8545 https://*.onrender.com https://cloudflare-eth.com https://eth.merkle.io https://rpc.walletconnect.com https://*.walletconnect.com https://*.walletconnect.org wss://*.walletconnect.org wss://relay.walletconnect.com https://pulse.walletconnect.com https://pulse.walletconnect.org https://api.web3modal.org https://*.web3modal.org https://*.infura.io https://*.alchemyapi.io https://*.paypal.com https://*.sandbox.paypal.com https://*.paypalobjects.com; img-src 'self' blob: data: https://*.walletconnect.com https://*.rainbow.me https://*.coinbase.com https://*.paypalobjects.com; style-src 'self' 'unsafe-inline'; font-src 'self' data:; frame-src 'self' https://verify.walletconnect.com https://www.paypal.com https://www.sandbox.paypal.com https://*.paypal.com;",
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;