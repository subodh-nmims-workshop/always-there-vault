# 🛡️ DeadMan Protocol - Digital Legacy Platform

> Secure your digital assets and ensure they reach your loved ones when it matters most.

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![Node.js](https://img.shields.io/badge/Node.js-18+-green.svg)](https://nodejs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-blue.svg)](https://www.typescriptlang.org/)
[![Hardhat](https://img.shields.io/badge/Hardhat-2.19+-yellow.svg)](https://hardhat.org/)

## 🌟 Features

### Core Features
- ✅ **Dual Backend Architecture** - Centralized (NestJS) + Decentralized (Hardhat)
- ✅ **Asset Management** - Upload, encrypt, and manage digital assets
- ✅ **Beneficiary System** - Designate who receives your assets
- ✅ **Heartbeat Tracking** - Proof-of-life verification system
- ✅ **Smart Contracts** - Ethereum-based asset release mechanism
- ✅ **IPFS Storage** - Decentralized file storage
- ✅ **End-to-End Encryption** - Military-grade AES-256 encryption

### Payment & Subscription
- ✅ **Stripe Integration** - Secure payment processing
- ✅ **Crypto Payments** - Accept ETH and other cryptocurrencies
- ✅ **30-Day Free Trial** - Try all features risk-free
- ✅ **Flexible Plans** - Starter, Professional, Enterprise
- ✅ **Mode Switching** - Switch between centralized/decentralized

### Mobile App
- ✅ **React Native** - iOS and Android support
- ✅ **Biometric Auth** - Fingerprint and Face ID
- ✅ **Offline Mode** - Work without internet connection
- ✅ **Camera Integration** - Capture photos/videos directly
- ✅ **Push Notifications** - Heartbeat reminders

### Security & Performance
- ✅ **Rate Limiting** - Protection against abuse
- ✅ **Caching** - Improved performance
- ✅ **Logging** - Comprehensive error tracking
- ✅ **Database Indexes** - Optimized queries
- ✅ **Health Checks** - System monitoring
- ✅ **Email Notifications** - 7 different email types

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- MongoDB 7.0+
- Docker & Docker Compose (for production)

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/deadman-protocol.git
cd deadman-protocol

# Run complete setup
./setup-complete-system.sh

# Start all services
./start.sh
```

### Access the Application

- **Frontend**: http://localhost:7000
- **Backend API**: http://localhost:7001
- **API Docs**: http://localhost:7001/api/docs
- **Hardhat Node**: http://localhost:8545

## 📁 Project Structure

```
deadman-protocol/
├── backend/                      # NestJS Backend (Secondary)
│   ├── api/                     # API controllers
│   ├── services/                # Business logic
│   │   ├── auth/               # Authentication
│   │   ├── assets/             # Asset management
│   │   ├── beneficiaries/      # Beneficiary management
│   │   ├── heartbeat/          # Heartbeat tracking
│   │   ├── subscription/       # Subscription management
│   │   ├── stripe/             # Payment processing
│   │   ├── email/              # Email notifications
│   │   ├── cache/              # Caching service
│   │   └── logger/             # Logging service
│   ├── middleware/             # Custom middleware
│   └── scripts/                # Utility scripts
│
├── backend-full-decentralised/  # Hardhat Backend (Primary)
│   ├── contracts/              # Smart contracts
│   ├── scripts/                # Deployment scripts
│   ├── test/                   # Contract tests
│   └── hardhat.config.ts       # Hardhat configuration
│
├── frontend/
│   ├── web/                    # Next.js Web App
│   │   ├── src/
│   │   │   ├── app/           # Pages and routes
│   │   │   ├── components/    # React components
│   │   │   ├── contexts/      # React contexts
│   │   │   ├── hooks/         # Custom hooks
│   │   │   └── lib/           # Utilities
│   │   └── public/            # Static assets
│   │
│   └── mobile/                 # React Native App
│       ├── src/
│       │   ├── screens/       # App screens
│       │   ├── components/    # React Native components
│       │   └── services/      # Mobile services
│       └── App.tsx            # Main app component
│
├── nginx/                      # Nginx configuration
├── monitoring/                 # Monitoring configs
├── .github/workflows/          # CI/CD pipelines
├── docker-compose.yml          # Docker orchestration
└── start.sh                    # Main startup script
```

## 🛠️ Development

### Start Development Environment

```bash
# Start all services
./start.sh

# Stop all services
./start.sh stop

# Check status
./start.sh status

# Run tests
./start.sh test

# Deploy contracts
./start.sh deploy
```

### Run Tests

```bash
# Backend tests
cd backend
npm test

# Smart contract tests
cd backend-full-decentralised
npm test
npm run test:coverage

# Frontend tests
cd frontend/web
npm test
```

### Database Management

```bash
# Setup indexes
cd backend
npx ts-node scripts/setup-indexes.ts

# Backup database
./backup-database.sh

# Restore database
./restore-database.sh backups/deadman_backup_20240308_120000.gz
```

## 🐳 Docker Deployment

### Development

```bash
docker-compose up -d
```

### Production

```bash
# Deploy to production
./deploy-production.sh

# View logs
docker-compose logs -f

# Check status
docker-compose ps
```

## 📊 Monitoring

### Health Checks

```bash
# Backend health
curl http://localhost:7001/health

# Frontend health
curl http://localhost:7000

# Database health
docker exec deadman-mongodb mongosh --eval "db.adminCommand('ping')"
```

### Logs

```bash
# View all logs
docker-compose logs -f

# View specific service
docker-compose logs -f backend

# View last 100 lines
docker-compose logs --tail=100
```

## 🔐 Security

- **Encryption**: AES-256 for data at rest
- **Authentication**: JWT tokens with refresh
- **Rate Limiting**: 100 requests per 15 minutes
- **CORS**: Configured for production domains
- **Security Headers**: X-Frame-Options, CSP, etc.
- **Input Validation**: All inputs sanitized
- **SQL Injection**: Protected via Mongoose
- **XSS Protection**: React auto-escaping

## 📝 Environment Variables

### Backend (.env)
```env
NODE_ENV=production
PORT=7001
MONGODB_URI=mongodb://...
JWT_SECRET=your_secret
STRIPE_SECRET_KEY=sk_live_...
RESEND_API_KEY=re_...
SENTRY_DSN=https://...
```

### Frontend (.env.local)
```env
NEXT_PUBLIC_API_URL=https://api.yourdomain.com
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_...
```

### Hardhat (.env)
```env
PRIVATE_KEY=your_wallet_private_key
ETHEREUM_RPC_URL=https://...
POLYGONSCAN_API_KEY=your_api_key
```

## 📚 Documentation

- [Setup Guide](./STRIPE_SETUP_GUIDE.md)
- [Production Checklist](./PRODUCTION_CHECKLIST.txt)
- [API Documentation](http://localhost:7001/api/docs)
- [Smart Contract Tests](./backend-full-decentralised/test/)

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- OpenZeppelin for smart contract libraries
- NestJS for backend framework
- Next.js for frontend framework
- Hardhat for blockchain development
- Stripe for payment processing

## 📞 Support

- **Email**: support@deadmanprotocol.com
- **Documentation**: [docs.deadmanprotocol.com](https://docs.deadmanprotocol.com)
- **Issues**: [GitHub Issues](https://github.com/yourusername/deadman-protocol/issues)

---

**Built with ❤️ for securing digital legacies**

🚀 **Ready for Production!** - All features implemented and tested.
