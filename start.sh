#!/bin/bash

# ========================================================
# Digital Will Protocol - Decentralized Initialization Script
# Required Ports: 7000 (Frontend ONLY)
# NO BACKEND SERVER - 100% Decentralized!
# ========================================================

echo "🚀 Starting Digital Will Protocol (Decentralized Mode)..."
echo ""
echo "⚡ NOTE: No backend server needed!"
echo "   Smart contracts handle everything on blockchain"
echo ""

# 1. Check if Smart Contracts are Deployed
echo "📦 Checking Decentralized Backend Setup..."
cd backend-full-decentralised

if [ ! -d "node_modules" ]; then
    echo "Installing decentralized backend dependencies..."
    npm install
fi

# Check and compile contracts
if [ ! -d "artifacts" ]; then
    echo "🔨 Compiling smart contracts..."
    npx hardhat compile
else
    echo "✅ Smart contracts already compiled"
fi

echo "🌐 Starting Local Blockchain (Hardhat Node)..."
npx hardhat node > hardhat_node.log 2>&1 &
HARDHAT_PID=$!

echo "⏳ Waiting for local blockchain to initialize..."
sleep 3

echo "🚀 Deploying Smart Contracts to Local Node..."
npx hardhat run scripts/deploy.ts --network localhost

echo "✅ Local backend deployment complete! Frontend .env updated."

cd ..

# 2. Start Frontend (Next.js)
echo "📦 Checking Frontend Dependencies..."
cd frontend/web
if [ ! -d "node_modules" ]; then
    echo "Installing frontend dependencies..."
    npm install
fi

echo "🟢 Starting Frontend on Port 7000..."
# Uses dev script which is configured to -p 7000
npm run dev &
FRONTEND_PID=$!

cd ../..

# 3. Start Mobile (React Native)
echo "📦 Checking Mobile Dependencies..."
cd frontend/mobile
if [ ! -d "node_modules" ]; then
    echo "Installing mobile dependencies..."
    npm install
fi

echo "🟢 Starting Mobile Packager on Port 8081..."
npm start &
MOBILE_PID=$!

cd ../..

echo "========================================================"
echo "✅ Decentralized Protocol Started!"
echo "========================================================"
echo "🌐 User Interface : http://localhost:7000"
echo "⛓️  Blockchain     : Polygon Mumbai Testnet (FREE)"
echo "📦 IPFS Storage   : web3.storage (FREE 5GB)"
echo "💰 Backend Cost   : ₹0 (No server running!)"
echo "📱 Mobile Packager: http://localhost:8081"
echo "========================================================"
echo ""
echo "📚 Documentation:"
echo "   - Quick Start: backend-full-decentralised/QUICK_START.md"
echo "   - Integration: backend-full-decentralised/INTEGRATION_GUIDE.md"
echo ""
echo "🔗 Useful Links:"
echo "   - Get Test MATIC: https://faucet.polygon.technology"
echo "   - Get IPFS Token: https://web3.storage"
echo "   - Mumbai Explorer: https://mumbai.polygonscan.com"
echo ""
echo "========================================================"
echo "Press Ctrl+C to gracefully stop all services."

# Trap Ctrl+C and kill all processes
trap "echo '🛑 Terminating protocol services...'; kill $FRONTEND_PID $MOBILE_PID $HARDHAT_PID; exit" SIGINT SIGTERM

# Keep script running
wait
