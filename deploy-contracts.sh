#!/bin/bash

# ========================================================
# Smart Contract Deployment Script
# Deploy contracts to Mumbai Testnet (FREE)
# ========================================================

echo "╔══════════════════════════════════════════════════════╗"
echo "║   🌐 Decentralized Backend - Contract Deployment    ║"
echo "╚══════════════════════════════════════════════════════╝"
echo ""

cd backend-full-decentralised

# Check if .env exists
if [ ! -f ".env" ]; then
    echo "⚠️  .env file not found!"
    echo ""
    echo "Creating .env from template..."
    cp .env.example .env
    echo "✅ .env file created"
    echo ""
    echo "📝 IMPORTANT: Edit .env and add:"
    echo "   1. PRIVATE_KEY=your_wallet_private_key"
    echo "   2. WEB3_STORAGE_TOKEN=your_web3_storage_token"
    echo ""
    echo "🔗 Get FREE resources:"
    echo "   - Test MATIC: https://faucet.polygon.technology"
    echo "   - web3.storage token: https://web3.storage"
    echo ""
    echo "After updating .env, run this script again:"
    echo "   ./deploy-contracts.sh"
    echo ""
    exit 1
fi

# Check if private key is configured
if grep -q "your_wallet_private_key_here" .env; then
    echo "❌ ERROR: Private key not configured in .env"
    echo ""
    echo "Please edit backend-full-decentralised/.env and add:"
    echo "   PRIVATE_KEY=your_actual_private_key"
    echo ""
    echo "Get test MATIC from: https://faucet.polygon.technology"
    echo ""
    exit 1
fi

# Check if web3.storage token is configured
if grep -q "your_web3_storage_token_here" .env; then
    echo "⚠️  WARNING: web3.storage token not configured"
    echo "   IPFS uploads will not work without it"
    echo "   Get token from: https://web3.storage"
    echo ""
fi

# Install dependencies
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm install
    echo ""
fi

# Compile contracts
echo "🔨 Compiling smart contracts..."
npm run compile

if [ $? -ne 0 ]; then
    echo "❌ Compilation failed!"
    exit 1
fi

echo ""
echo "✅ Contracts compiled successfully"
echo ""

# Deploy to testnet
echo "🚀 Deploying to Mumbai Testnet (FREE)..."
echo ""
npm run deploy:testnet

if [ $? -ne 0 ]; then
    echo ""
    echo "❌ Deployment failed!"
    echo ""
    echo "Common issues:"
    echo "   1. Insufficient test MATIC - Get from: https://faucet.polygon.technology"
    echo "   2. Invalid private key - Check .env file"
    echo "   3. Network issues - Try again"
    echo ""
    exit 1
fi

echo ""
echo "╔══════════════════════════════════════════════════════╗"
echo "║          🎉 DEPLOYMENT SUCCESSFUL! 🎉                ║"
echo "╚══════════════════════════════════════════════════════╝"
echo ""
echo "📋 Next Steps:"
echo ""
echo "1. Copy the 3 contract addresses from above"
echo ""
echo "2. Update frontend/.env.local with:"
echo "   NEXT_PUBLIC_HEARTBEAT_CONTRACT=0xYourAddress"
echo "   NEXT_PUBLIC_DIGITAL_WILL_CONTRACT=0xYourAddress"
echo "   NEXT_PUBLIC_ASSET_MANAGER_CONTRACT=0xYourAddress"
echo "   NEXT_PUBLIC_WEB3_STORAGE_TOKEN=your_token"
echo ""
echo "3. Copy ABIs to frontend:"
echo "   cd backend-full-decentralised"
echo "   cp artifacts/contracts/HeartbeatTracker.sol/HeartbeatTracker.json ../frontend/web/src/contracts/"
echo "   cp artifacts/contracts/DigitalWill.sol/DigitalWill.json ../frontend/web/src/contracts/"
echo "   cp artifacts/contracts/AssetManager.sol/AssetManager.json ../frontend/web/src/contracts/"
echo ""
echo "4. Start the app:"
echo "   ./start.sh"
echo ""
echo "🎊 Your backend is now 100% decentralized!"
echo "   No server costs, no database, no hosting fees!"
echo ""
