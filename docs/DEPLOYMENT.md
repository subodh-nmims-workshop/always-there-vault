# Deployment & Verification Guide (v1.0)

This guide outlines the steps to deploy the Last Wish Protocol to a production environment.

## 1. Secrets Management
The system requires a secure `.env` file with the following variables:
```bash
ENCRYPTION_MASTER_KEY=your-32-byte-hex-key
JWT_SECRET=your-randomly-generated-64-byte-secret
STRIPE_SECRET_KEY=sk_live_...
STRIPE_WEBHOOK_SECRET=whsec_...
RPC_URL=https://mainnet.infura.io/v3/your-project-id
ADMIN_PRIVATE_KEY=your-secure-admin-key
```

## 2. Docker Deployment
The protocol is containerized using Docker Compose. Run the following command:
```bash
# Build and start services in background
docker-compose up -d --build
```
This will start:
- **Backend (NestJS)**: Port 7001
- **Frontend (Web)**: Port 3000
- **Database (PostgreSQL/MongoDB)**: Managed containers

## 3. Smart Contract Verification
After deploying to a network like Polygon or Ethereum, verify the contract on Etherscan:
```bash
# Using Hardhat
npx hardhat verify --network <network> <contract_address>
```

## 4. Security Audit List
- [ ] Verify `ENCRYPTION_MASTER_KEY` is NOT hardcoded in code (checked ✅).
- [ ] Verify `JWT_SECRET` is NOT hardcoded in code (checked ✅).
- [ ] Verify `CORS` is NOT set to `*` in main.ts (checked ✅).
- [ ] Verify `ReentrancyGuard` is active on all `DigitalWill.sol` state-changing functions (checked ✅).
- [ ] Verify `express-rate-limit` is active on global API (checked ✅).

## 5. Maintenance
- Run `backup-database.sh` periodically to backup PostgreSQL/MongoDB.
- Monitor `monitoring/` service logs for any security alerts.
