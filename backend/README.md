# Digital Will Protocol - Backend API

Zero-trust backend API for the Decentralized Digital Will Protocol. This API handles metadata management while maintaining the core principle that **encrypted data never touches the server**.

## 🏗️ Architecture

### Zero-Trust Design
- **No encrypted data storage**: All encrypted assets stored client-side or on IPFS
- **Metadata only**: Server only stores non-sensitive metadata (IPFS hashes, timestamps, etc.)
- **Signature verification**: All operations verified via wallet signatures
- **Stateless authentication**: JWT tokens for session management

### Technology Stack
- **Framework**: NestJS (TypeScript)
- **Database**: PostgreSQL (metadata only)
- **Cache**: Redis (session & performance)
- **Blockchain**: Ethers.js for smart contract interaction
- **API Docs**: Swagger/OpenAPI

## 🚀 Getting Started

### Prerequisites
- Node.js >= 18.0.0
- PostgreSQL >= 14
- Redis >= 6

### Installation

```bash
# Install dependencies
npm install

# Copy environment variables
cp .env.example .env

# Edit .env with your configuration
nano .env
```

### Running the API

```bash
# Development mode
npm run start:dev

# Production mode
npm run build
npm run start:prod
```

The API will be available at:
- **API**: http://localhost:3100
- **Swagger Docs**: http://localhost:3100/api/docs

## 📚 API Endpoints

### Assets
- `POST /api/assets` - Register asset metadata
- `GET /api/assets?walletAddress=0x...` - Get user's assets
- `GET /api/assets/:id` - Get specific asset
- `PUT /api/assets/:id` - Update asset metadata
- `DELETE /api/assets/:id` - Delete asset metadata
- `GET /api/assets/:id/release-status` - Check release status

### Beneficiaries
- `POST /api/beneficiaries` - Add beneficiary
- `GET /api/beneficiaries?ownerAddress=0x...` - Get user's beneficiaries
- `GET /api/beneficiaries/:id` - Get specific beneficiary
- `PUT /api/beneficiaries/:id` - Update beneficiary
- `DELETE /api/beneficiaries/:id` - Remove beneficiary

### Heartbeat
- `POST /api/heartbeat` - Record proof-of-life
- `GET /api/heartbeat/status/:walletAddress` - Get heartbeat status
- `GET /api/heartbeat/history/:walletAddress` - Get heartbeat history
- `GET /api/heartbeat/check/:walletAddress` - Check if heartbeat needed

### Blockchain
- `GET /api/blockchain/contract-info` - Get contract information
- `GET /api/blockchain/user/:walletAddress` - Get user blockchain data
- `POST /api/blockchain/verify-signature` - Verify wallet signature
- `GET /api/blockchain/gas-estimate/:operation` - Estimate gas costs

## 🔒 Security Features

### Authentication
- Wallet-based authentication (Sign-In With Ethereum)
- JWT tokens for session management
- Signature verification for all operations

### Data Protection
- No encrypted data stored on server
- Metadata only (IPFS hashes, timestamps, addresses)
- Rate limiting on all endpoints
- Input validation and sanitization

### Zero-Trust Principles
1. **Client-side encryption**: All encryption happens in browser
2. **Metadata only**: Server never sees plaintext or encryption keys
3. **Verifiable operations**: All actions verified via blockchain signatures
4. **Decentralized storage**: Encrypted data on IPFS/Arweave

## 🧪 Testing

```bash
# Run tests
npm test

# Run tests with coverage
npm run test:cov

# Run tests in watch mode
npm run test:watch
```

## 📦 Database Schema

### Assets (Metadata Only)
```sql
- id: UUID
- name: string
- type: string
- ownerAddress: string
- ipfsHash: string (encrypted data location)
- keyId: string (key identifier, not the key itself)
- beneficiaries: string[]
- status: enum (active, released, revoked)
- createdAt: timestamp
- updatedAt: timestamp
```

### Beneficiaries
```sql
- id: UUID
- name: string
- email: string
- walletAddress: string
- ownerAddress: string
- relationship: string
- enabled: boolean
- createdAt: timestamp
- updatedAt: timestamp
```

### Heartbeats
```sql
- id: UUID
- walletAddress: string
- timestamp: timestamp
- method: enum (wallet_signature, biometric, etc.)
- signature: string
- verified: boolean
- ipAddress: string
```

## 🔧 Configuration

### Environment Variables

```env
# Server
PORT=3100
NODE_ENV=development

# Database
DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_USER=postgres
DATABASE_PASSWORD=your_password
DATABASE_NAME=digital_will_db

# Redis
REDIS_HOST=localhost
REDIS_PORT=6379

# Blockchain
CONTRACT_ADDRESS=0x...
NETWORK_NAME=polygon-mumbai
RPC_URL=https://rpc-mumbai.maticvigil.com

# Security
JWT_SECRET=your-secret-key
JWT_EXPIRATION=7d

# CORS
CORS_ORIGIN=http://localhost:3000,http://localhost:3002
```

## 🚢 Deployment

### Docker Deployment

```bash
# Build image
docker build -t digital-will-api .

# Run container
docker run -p 3100:3100 --env-file .env digital-will-api
```

### Production Checklist
- [ ] Set strong JWT_SECRET
- [ ] Configure production database
- [ ] Set up Redis cluster
- [ ] Configure CORS for production domains
- [ ] Enable rate limiting
- [ ] Set up monitoring (Prometheus/Grafana)
- [ ] Configure logging (Winston/ELK)
- [ ] Set up SSL/TLS
- [ ] Configure backup strategy
- [ ] Set up CI/CD pipeline

## 📊 Monitoring

### Health Check
```bash
GET /health
```

### Metrics
- Request rate
- Response time
- Error rate
- Database connections
- Redis cache hit rate

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

## 📄 License

MIT License - see LICENSE file for details

## 🆘 Support

- Documentation: https://docs.digitalwill.protocol
- Issues: https://github.com/digital-will/backend/issues
- Discord: https://discord.gg/digitalwill
