#!/bin/bash

# 🚀 DeadMan Protocol - Decentralized Backend Setup Script

echo "=================================================="
echo "🌐 DeadMan Protocol - Decentralized Backend Setup"
echo "=================================================="
echo ""

# Colors
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo -e "${RED}❌ Node.js is not installed${NC}"
    echo "Please install Node.js from https://nodejs.org"
    exit 1
fi

echo -e "${GREEN}✅ Node.js found: $(node --version)${NC}"

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo -e "${RED}❌ npm is not installed${NC}"
    exit 1
fi

echo -e "${GREEN}✅ npm found: $(npm --version)${NC}"
echo ""

# Install dependencies
echo -e "${BLUE}📦 Installing dependencies...${NC}"
npm install

if [ $? -ne 0 ]; then
    echo -e "${RED}❌ Failed to install dependencies${NC}"
    exit 1
fi

echo -e "${GREEN}✅ Dependencies installed${NC}"
echo ""

# Check if .env exists
if [ ! -f .env ]; then
    echo -e "${YELLOW}⚠️  .env file not found${NC}"
    echo -e "${BLUE}📝 Creating .env from .env.example...${NC}"
    cp .env.example .env
    echo -e "${GREEN}✅ .env file created${NC}"
    echo ""
    echo -e "${YELLOW}⚠️  IMPORTANT: Edit .env and add:${NC}"
    echo "   1. Your wallet PRIVATE_KEY"
    echo "   2. Your WEB3_STORAGE_TOKEN"
    echo ""
    echo "Get test MATIC: https://faucet.polygon.technology"
    echo "Get web3.storage token: https://web3.storage"
    echo ""
else
    echo -e "${GREEN}✅ .env file found${NC}"
fi

# Compile contracts
echo -e "${BLUE}🔨 Compiling smart contracts...${NC}"
npm run compile

if [ $? -ne 0 ]; then
    echo -e "${RED}❌ Failed to compile contracts${NC}"
    exit 1
fi

echo -e "${GREEN}✅ Contracts compiled${NC}"
echo ""

# Check if private key is set
if grep -q "your_wallet_private_key_here" .env; then
    echo -e "${YELLOW}⚠️  WARNING: Private key not configured in .env${NC}"
    echo "Please add your wallet private key to deploy contracts"
    echo ""
fi

# Check if web3.storage token is set
if grep -q "your_web3_storage_token_here" .env; then
    echo -e "${YELLOW}⚠️  WARNING: web3.storage token not configured in .env${NC}"
    echo "Please add your web3.storage token for IPFS uploads"
    echo ""
fi

echo "=================================================="
echo -e "${GREEN}🎉 Setup Complete!${NC}"
echo "=================================================="
echo ""
echo "📋 Next Steps:"
echo ""
echo "1. Get test MATIC from faucet:"
echo "   https://faucet.polygon.technology"
echo ""
echo "2. Get web3.storage token (FREE 5GB):"
echo "   https://web3.storage"
echo ""
echo "3. Update .env file with:"
echo "   - PRIVATE_KEY=your_wallet_private_key"
echo "   - WEB3_STORAGE_TOKEN=your_token"
echo ""
echo "4. Deploy contracts to testnet:"
echo "   npm run deploy:testnet"
echo ""
echo "5. Copy contract addresses to frontend/.env.local"
echo ""
echo "=================================================="
echo -e "${GREEN}✨ Total Cost: ₹0 (100% FREE!)${NC}"
echo "=================================================="
echo ""
