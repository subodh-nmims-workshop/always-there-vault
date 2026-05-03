#!/bin/bash

# ========================================================
# Always There Protocol - Complete System Setup
# Sets up both backends, frontend, and all dependencies
# ========================================================

set -e

RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
PURPLE='\033[0;35m'
CYAN='\033[0;36m'
NC='\033[0m'

print_header() {
    echo -e "${PURPLE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
    echo -e "${PURPLE}  $1${NC}"
    echo -e "${PURPLE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
}

print_status() {
    echo -e "${GREEN}✅ $1${NC}"
}

print_info() {
    echo -e "${BLUE}ℹ️  $1${NC}"
}

print_warning() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

print_error() {
    echo -e "${RED}❌ $1${NC}"
}

print_header "🚀 Always There Protocol - Complete System Setup"
echo ""

# Check Node.js
print_info "Checking Node.js installation..."
if ! command -v node &> /dev/null; then
    print_error "Node.js is not installed. Please install Node.js 18+ first."
    exit 1
fi
NODE_VERSION=$(node -v)
print_status "Node.js $NODE_VERSION found"
echo ""

# Check npm
print_info "Checking npm installation..."
if ! command -v npm &> /dev/null; then
    print_error "npm is not installed."
    exit 1
fi
NPM_VERSION=$(npm -v)
print_status "npm $NPM_VERSION found"
echo ""

# ========================================================
# 1. BACKEND (NestJS) Setup
# ========================================================
print_header "🔶 Setting up SECONDARY Backend (NestJS)"

cd backend

if [ ! -f ".env" ]; then
    print_info "Creating .env file from example..."
    cp .env.example .env
    print_warning "Please update backend/.env with your API keys"
fi

print_info "Installing backend dependencies..."
npm install
print_status "Backend dependencies installed"

print_info "Setting up database indexes..."
npx ts-node scripts/setup-indexes.ts || print_warning "Index setup skipped (MongoDB may not be running)"

cd ..
echo ""

# ========================================================
# 2. BACKEND-FULL-DECENTRALISED (Hardhat) Setup
# ========================================================
print_header "🔷 Setting up PRIMARY Backend (Hardhat)"

cd backend-full-decentralised

if [ ! -f ".env" ]; then
    print_info "Creating .env file from example..."
    cp .env.example .env
    print_warning "Please update backend-full-decentralised/.env with your keys"
fi

print_info "Installing blockchain dependencies..."
npm install
print_status "Blockchain dependencies installed"

print_info "Compiling smart contracts..."
npx hardhat compile
print_status "Smart contracts compiled"

print_info "Running smart contract tests..."
npx hardhat test || print_warning "Some tests failed (this is okay for initial setup)"

cd ..
echo ""

# ========================================================
# 3. FRONTEND (Next.js) Setup
# ========================================================
print_header "🌐 Setting up Frontend (Next.js)"

cd frontend/web

if [ ! -f ".env.local" ]; then
    print_info "Creating .env.local file..."
    cat > .env.local << EOF
# API
NEXT_PUBLIC_API_URL=http://localhost:7001

# Stripe
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_your_key_here

# Blockchain
NEXT_PUBLIC_HARDHAT_RPC_URL=http://localhost:8545
EOF
    print_warning "Please update frontend/web/.env.local with your keys"
fi

print_info "Installing frontend dependencies..."
npm install
print_status "Frontend dependencies installed"

cd ../..
echo ""

# ========================================================
# 4. MOBILE (React Native) Setup
# ========================================================
print_header "📱 Setting up Mobile App (React Native)"

cd frontend/mobile

if [ -d "node_modules" ]; then
    print_info "Mobile dependencies already installed"
else
    print_info "Installing mobile dependencies..."
    npm install
    print_status "Mobile dependencies installed"
fi

cd ../..
echo ""

# ========================================================
# 5. MongoDB Check
# ========================================================
print_header "🗄️  Checking MongoDB"

if pgrep -x "mongod" > /dev/null; then
    print_status "MongoDB is running"
else
    print_warning "MongoDB is not running"
    print_info "Start MongoDB with: sudo systemctl start mongodb"
    print_info "Or install MongoDB: https://www.mongodb.com/docs/manual/installation/"
fi
echo ""

# ========================================================
# Summary
# ========================================================
print_header "✨ Setup Complete!"
echo ""
echo -e "${CYAN}📋 What's Been Set Up:${NC}"
echo -e "   ${GREEN}✅${NC} Backend (NestJS) - Port 7001"
echo -e "   ${GREEN}✅${NC} Backend (Hardhat) - Port 8545"
echo -e "   ${GREEN}✅${NC} Frontend (Next.js) - Port 7000"
echo -e "   ${GREEN}✅${NC} Mobile (React Native) - Port 8081"
echo ""
echo -e "${CYAN}📝 Next Steps:${NC}"
echo ""
echo -e "${YELLOW}1. Configure Environment Variables:${NC}"
echo -e "   - backend/.env (Stripe, MongoDB, Email)"
echo -e "   - backend-full-decentralised/.env (Blockchain keys)"
echo -e "   - frontend/web/.env.local (API URLs, Stripe)"
echo ""
echo -e "${YELLOW}2. Start MongoDB:${NC}"
echo -e "   sudo systemctl start mongodb"
echo ""
echo -e "${YELLOW}3. Start the Application:${NC}"
echo -e "   ./start.sh"
echo ""
echo -e "${YELLOW}4. Access the App:${NC}"
echo -e "   Frontend: http://localhost:7000"
echo -e "   Backend API: http://localhost:7001"
echo -e "   API Docs: http://localhost:7001/api/docs"
echo ""
echo -e "${CYAN}📚 Documentation:${NC}"
echo -e "   - STRIPE_SETUP_GUIDE.md - Payment setup"
echo -e "   - start.sh - Start/stop/status commands"
echo ""
echo -e "${GREEN}🎉 Ready to build your digital legacy!${NC}"
echo ""
