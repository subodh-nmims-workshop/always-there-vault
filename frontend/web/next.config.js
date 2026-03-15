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
            value: "script-src 'self' 'unsafe-eval' 'unsafe-inline'; object-src 'none';",
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;