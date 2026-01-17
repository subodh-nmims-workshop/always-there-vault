#!/bin/bash

# Decentralized Digital Will Protocol - Setup Script
# This script sets up the entire development environment

set -e

echo "🚀 Setting up Decentralized Digital Will Protocol..."

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check prerequisites
print_status "Checking prerequisites..."

# Check Node.js version
if ! command -v node &> /dev/null; then
    print_error "Node.js is not installed. Please install Node.js 18+ first."
    exit 1
fi

NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 18 ]; then
    print_error "Node.js version 18+ is required. Current version: $(node -v)"
    exit 1
fi

print_success "Node.js $(node -v) ✓"

# Check npm
if ! command -v npm &> /dev/null; then
    print_error "npm is not installed."
    exit 1
fi

print_success "npm $(npm -v) ✓"

# Check if PostgreSQL is available (optional for development)
if command -v psql &> /dev/null; then
    print_success "PostgreSQL available ✓"
else
    print_warning "PostgreSQL not found. You'll need it for the backend."
fi

# Check if Redis is available (optional for development)
if command -v redis-cli &> /dev/null; then
    print_success "Redis available ✓"
else
    print_warning "Redis not found. You'll need it for the backend."
fi

# Install root dependencies
print_status "Installing root dependencies..."
npm install

# Setup core library
print_status "Setting up core library..."
cd core
npm install
npm run build
cd ..
print_success "Core library setup complete ✓"

# Setup backend
print_status "Setting up backend API..."
if [ ! -d "backend/api/node_modules" ]; then
    cd backend/api
    npm install
    cd ../..
    print_success "Backend API setup complete ✓"
else
    print_success "Backend API already set up ✓"
fi

# Setup frontend web
print_status "Setting up frontend web app..."
if [ ! -d "frontend/web/node_modules" ]; then
    cd frontend/web
    npm install
    cd ../..
    print_success "Frontend web app setup complete ✓"
else
    print_success "Frontend web app already set up ✓"
fi

# Setup blockchain
print_status "Setting up blockchain environment..."
if [ ! -d "blockchain/node_modules" ]; then
    cd blockchain
    npm install
    cd ..
    print_success "Blockchain environment setup complete ✓"
else
    print_success "Blockchain environment already set up ✓"
fi

# Create environment files
print_status "Creating environment configuration files..."

# Root .env
if [ ! -f ".env" ]; then
    cat > .env << EOF
# Decentralized Digital Will Protocol - Environment Configuration

# Application
NODE_ENV=development
APP_NAME="Decentralized Digital Will Protocol"
APP_VERSION=1.0.0

# API Configuration
API_PORT=3001
API_HOST=localhost
API_URL=http://localhost:3001

# Frontend Configuration
FRONTEND_PORT=3000
FRONTEND_URL=http://localhost:3000

# Database (PostgreSQL)
DB_HOST=localhost
DB_PORT=5432
DB_NAME=digital_will
DB_USERNAME=postgres
DB_PASSWORD=password

# Redis
REDIS_HOST=localhost
REDIS_PORT=6379
REDIS_PASSWORD=

# Blockchain
BLOCKCHAIN_NETWORK=localhost
BLOCKCHAIN_RPC_URL=http://localhost:8545
PRIVATE_KEY=

# Storage
IPFS_ENDPOINT=https://ipfs.infura.io:5001
ARWEAVE_ENDPOINT=https://arweave.net
STORAGE_ENCRYPTION_KEY=

# Security
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
ENCRYPTION_SALT=your-encryption-salt-change-this

# External Services
SENDGRID_API_KEY=
TWILIO_ACCOUNT_SID=
TWILIO_AUTH_TOKEN=

# Development
DEBUG=true
LOG_LEVEL=debug
EOF
    print_success "Created .env file ✓"
else
    print_success ".env file already exists ✓"
fi

# Backend .env
if [ ! -f "backend/api/.env" ]; then
    cat > backend/api/.env << EOF
# Backend API Environment
NODE_ENV=development
PORT=3001

# Database
DATABASE_URL=postgresql://postgres:password@localhost:5432/digital_will

# Redis
REDIS_URL=redis://localhost:6379

# JWT
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
JWT_EXPIRES_IN=7d

# Blockchain
ETHEREUM_RPC_URL=http://localhost:8545
POLYGON_RPC_URL=https://polygon-rpc.com

# Storage
IPFS_API_URL=https://ipfs.infura.io:5001/api/v0
ARWEAVE_API_URL=https://arweave.net

# Notifications
SENDGRID_API_KEY=
EMAIL_FROM=noreply@digitalwill.protocol
EOF
    print_success "Created backend/.env file ✓"
else
    print_success "Backend .env file already exists ✓"
fi

# Frontend .env
if [ ! -f "frontend/web/.env.local" ]; then
    cat > frontend/web/.env.local << EOF
# Frontend Environment
NEXT_PUBLIC_APP_NAME="Decentralized Digital Will Protocol"
NEXT_PUBLIC_API_URL=http://localhost:3001
NEXT_PUBLIC_FRONTEND_URL=http://localhost:3000

# Blockchain
NEXT_PUBLIC_CHAIN_ID=31337
NEXT_PUBLIC_RPC_URL=http://localhost:8545

# WalletConnect
NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=

# Features
NEXT_PUBLIC_ENABLE_TESTNET=true
NEXT_PUBLIC_ENABLE_ANALYTICS=false
EOF
    print_success "Created frontend/.env.local file ✓"
else
    print_success "Frontend .env.local file already exists ✓"
fi

# Create development database (if PostgreSQL is available)
if command -v psql &> /dev/null; then
    print_status "Setting up development database..."
    
    # Check if database exists
    if psql -lqt | cut -d \| -f 1 | grep -qw digital_will; then
        print_success "Database 'digital_will' already exists ✓"
    else
        createdb digital_will 2>/dev/null || print_warning "Could not create database. You may need to set it up manually."
        print_success "Database 'digital_will' created ✓"
    fi
fi

# Build everything
print_status "Building all components..."
npm run build

print_success "🎉 Setup complete!"

echo ""
echo "📋 Next steps:"
echo "1. Start the blockchain: npm run dev:blockchain"
echo "2. Start the backend: npm run dev:backend"
echo "3. Start the frontend: npm run dev:frontend"
echo ""
echo "Or start everything at once: npm run dev"
echo ""
echo "📚 Documentation: ./docs/README.md"
echo "🔧 Configuration: .env files created"
echo ""
echo "⚠️  Remember to:"
echo "   - Set up PostgreSQL and Redis if not already running"
echo "   - Configure your wallet and blockchain settings"
echo "   - Update API keys in .env files"
echo ""
print_success "Happy coding! 🚀"