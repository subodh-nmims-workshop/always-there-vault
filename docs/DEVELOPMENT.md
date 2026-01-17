# Development Guide

## 🚀 Quick Start

### 1. Setup
```bash
# Run the setup script
./scripts/setup.sh

# Or manually:
npm install
npm run setup:workspaces
```

### 2. Start Development
```bash
# Start all services
npm run dev

# Or start individually:
npm run dev:blockchain  # Local Hardhat network
npm run dev:backend     # NestJS API server
npm run dev:frontend    # Next.js web app
```

### 3. Access Applications
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:3001
- **Blockchain**: http://localhost:8545

## 🏗️ Architecture Deep Dive

### Core Principles
1. **Client-side encryption only** - Server never sees raw data
2. **Asset-level isolation** - Each asset has its own encryption key and rules
3. **Zero trust backend** - Backend cannot decrypt anything
4. **Blockchain for logic** - Smart contracts handle automation, not storage

### Data Flow

#### Asset Creation Flow
```
1. User uploads file/creates message
   ↓
2. Frontend encrypts with AES-256-GCM
   ↓
3. Encrypted data uploaded to IPFS
   ↓
4. IPFS returns Content ID (CID)
   ↓
5. Encryption key split using Shamir Secret Sharing (5 shares, 3 needed)
   ↓
6. Shares distributed to:
   - Smart contract (1 share)
   - User device (1 share)
   - Trusted contact (1 share)
   - DAO oracle (1 share)
   - Hardware wallet (1 share)
   ↓
7. Asset metadata + CID stored on blockchain
```

#### Asset Release Flow
```
1. Heartbeat missed beyond grace period
   ↓
2. Anyone can call triggerSystem() on smart contract
   ↓
3. Contract validates trigger conditions
   ↓
4. Assets become eligible for release based on individual rules
   ↓
5. Beneficiary calls releaseAsset()
   ↓
6. Contract verifies beneficiary and timing
   ↓
7. Key shares retrieved and combined (3 of 5 needed)
   ↓
8. Beneficiary decrypts asset with reconstructed key
```

## 🔧 Development Workflow

### Project Structure
```
/
├── core/                    # Shared libraries
│   ├── crypto/             # Encryption, key management
│   ├── types/              # TypeScript definitions
│   ├── utils/              # Utility functions
│   └── validation/         # Data validation
├── frontend/web/           # React + Next.js app
├── backend/api/            # NestJS API server
├── blockchain/             # Smart contracts
├── storage/                # IPFS/Arweave integration
└── docs/                   # Documentation
```

### Key Files
- `core/types/assets.ts` - Asset and folder type definitions
- `core/crypto/key-management.ts` - Shamir Secret Sharing implementation
- `blockchain/contracts/DigitalWillCore.sol` - Main smart contract
- `frontend/web/` - Web application
- `backend/api/` - Zero-trust API server

## 🔐 Security Implementation

### Encryption Stack
```typescript
// Client-side encryption (frontend only)
const encryptedData = encryptData(rawData, encryptionKey);
const keyShares = splitSecret(encryptionKey, {
  totalShares: 5,
  threshold: 3
});

// Key distribution
const distribution = {
  smart_contract: keyShares[0],
  user_device: keyShares[1], 
  trusted_person: keyShares[2],
  dao_oracle: keyShares[3],
  hardware_wallet: keyShares[4]
};
```

### Zero Trust Backend
The backend API never sees:
- Raw asset data
- Encryption keys
- Decrypted content

It only handles:
- Metadata storage
- Notifications
- Blockchain event listening
- User management

### Smart Contract Security
```solidity
// Only stores metadata, never actual data
struct Asset {
    string ipfsHash;           // Encrypted data location
    string[] keyShareHashes;   // Key share locations
    uint256 createdAt;
    bool exists;
}

// Automated release logic
function releaseAsset(address user, string memory assetId, uint256 ruleIndex) 
    external nonReentrant {
    // Verify timing and beneficiary
    // Mark as released
    // Emit event for key reconstruction
}
```

## 🧪 Testing

### Unit Tests
```bash
# Test core libraries
npm run test:core

# Test backend
npm run test:backend

# Test frontend
npm run test:frontend

# Test smart contracts
npm run test:contracts
```

### Integration Tests
```bash
# Full end-to-end test
npm run test:e2e

# Test specific flows
npm run test:asset-creation
npm run test:heartbeat-flow
npm run test:release-flow
```

### Security Tests
```bash
# Cryptographic tests
npm run test:crypto

# Smart contract security
npm run test:contracts:security

# Penetration testing
npm run test:pentest
```

## 🚀 Deployment

### Local Development
```bash
# Start local blockchain
npm run dev:blockchain

# Deploy contracts
cd blockchain
npx hardhat run scripts/deploy.js --network localhost

# Start services
npm run dev
```

### Testnet Deployment
```bash
# Deploy to Polygon Mumbai
cd blockchain
npx hardhat run scripts/deploy.js --network mumbai

# Update frontend config
# Update backend config
```

### Production Deployment
```bash
# Deploy to Polygon Mainnet
cd blockchain
npx hardhat run scripts/deploy.js --network polygon

# Deploy backend to cloud
# Deploy frontend to Vercel/Netlify
# Configure IPFS/Arweave
```

## 🔍 Debugging

### Common Issues

#### 1. Encryption/Decryption Errors
```bash
# Check key generation
npm run debug:crypto

# Verify Shamir shares
npm run debug:shamir
```

#### 2. Blockchain Connection Issues
```bash
# Check network configuration
npm run debug:blockchain

# Verify contract deployment
npm run debug:contracts
```

#### 3. Storage Issues
```bash
# Test IPFS connection
npm run debug:ipfs

# Test Arweave connection
npm run debug:arweave
```

### Debug Tools
- **Crypto**: `core/crypto/__tests__/`
- **Contracts**: Hardhat console
- **Frontend**: React DevTools
- **Backend**: NestJS debugging

## 📊 Monitoring

### Metrics to Track
- Heartbeat frequency
- Asset creation rate
- Release success rate
- Storage availability
- Key reconstruction success

### Logging
```typescript
// Structured logging
logger.info('Asset created', {
  userId: user.id,
  assetId: asset.id,
  assetType: asset.type,
  encrypted: true,
  keyShares: 5
});
```

## 🤝 Contributing

### Code Style
- TypeScript for all new code
- ESLint + Prettier for formatting
- Comprehensive tests required
- Security review for crypto code

### Pull Request Process
1. Fork repository
2. Create feature branch
3. Write tests
4. Update documentation
5. Submit PR with security checklist

### Security Guidelines
- Never log sensitive data
- Always encrypt before storage
- Validate all inputs
- Use secure random generation
- Regular security audits

## 📚 Additional Resources

- [Smart Contract Documentation](./blockchain/README.md)
- [API Documentation](./api/README.md)
- [Frontend Documentation](./frontend/README.md)
- [Security Audit Reports](./security/)
- [Deployment Guides](./deployment/)

## 🆘 Support

- **Issues**: GitHub Issues
- **Security**: security@digitalwill.protocol
- **Documentation**: docs@digitalwill.protocol

---

**Remember: This handles people's digital inheritance. Security and reliability are paramount.**