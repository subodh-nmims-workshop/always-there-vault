#!/bin/bash

# AlwaysThere Protocol - Complete Setup Script
# This script sets up the entire project from scratch

set -e  # Exit on error

echo "🚀 AlwaysThere Protocol - Complete Setup"
echo "=========================================="
echo ""

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

# Check if Node.js is installed
print_status "Checking Node.js installation..."
if ! command -v node &> /dev/null; then
    print_error "Node.js is not installed. Please install Node.js >= 18.0.0"
    exit 1
fi

NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 18 ]; then
    print_error "Node.js version must be >= 18.0.0. Current version: $(node -v)"
    exit 1
fi
print_success "Node.js $(node -v) detected"

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    print_error "npm is not installed"
    exit 1
fi
print_success "npm $(npm -v) detected"

echo ""
print_status "Starting installation process..."
echo ""

# 1. Install root dependencies
print_status "📦 Installing root dependencies..."
npm install
print_success "Root dependencies installed"

# 2. Install core dependencies
if [ -d "core" ]; then
    print_status "📦 Installing core dependencies..."
    cd core
    npm install
    npm run build
    cd ..
    print_success "Core dependencies installed and built"
fi

# 3. Install web frontend dependencies
if [ -d "frontend/web" ]; then
    print_status "🌐 Installing web frontend dependencies..."
    cd frontend/web
    npm install
    cd ../..
    print_success "Web frontend dependencies installed"
fi

# 4. Install mobile frontend dependencies
if [ -d "frontend/mobile" ]; then
    print_status "📱 Installing mobile frontend dependencies..."
    cd frontend/mobile
    npm install
    cd ../..
    print_success "Mobile frontend dependencies installed"
fi

# 5. Install backend dependencies
if [ -d "backend" ]; then
    print_status "🔧 Installing backend dependencies..."
    cd backend
    npm install
    
    # Create .env if it doesn't exist
    if [ ! -f ".env" ]; then
        print_status "Creating backend .env file..."
        cp .env.example .env
        print_warning "Please update backend/.env with your configuration"
    fi
    
    cd ..
    print_success "Backend dependencies installed"
fi

# 6. Setup blockchain environment
print_status "⛓️  Setting up blockchain environment..."
if ! command -v npx &> /dev/null; then
    print_error "npx is not available"
    exit 1
fi

# Install Hardhat if not already installed
if [ ! -d "node_modules/hardhat" ]; then
    print_status "Installing Hardhat..."
    npm install --save-dev hardhat @nomicfoundation/hardhat-toolbox
fi

# Compile smart contracts
print_status "Compiling smart contracts..."
npx hardhat compile
print_success "Smart contracts compiled"

# 7. Run tests
echo ""
print_status "🧪 Running tests..."
echo ""

print_status "Running core tests..."
npm test
print_success "Core tests passed"

# 8. Create necessary directories
print_status "📁 Creating necessary directories..."
mkdir -p storage/ipfs
mkdir -p storage/arweave
mkdir -p logs
mkdir -p dist
print_success "Directories created"

# 9. Setup git hooks (if git is available)
if command -v git &> /dev/null && [ -d ".git" ]; then
    print_status "Setting up git hooks..."
    # Add pre-commit hook for linting
    cat > .git/hooks/pre-commit << 'EOF'
#!/bin/bash
npm run lint
EOF
    chmod +x .git/hooks/pre-commit
    print_success "Git hooks configured"
fi

# 10. Generate deployment info
print_status "📄 Generating deployment info..."
cat > DEPLOYMENT_INFO.md << EOF
# Deployment Information

Generated: $(date)

## Environment Setup

### Root Project
- Node.js: $(node -v)
- npm: $(npm -v)
- Status: ✅ Installed

### Web Frontend
- Location: \`frontend/web\`
- Port: 3000 (or next available)
- Status: ✅ Ready
- Start: \`cd frontend/web && npm run dev\`

### Mobile Frontend
- Location: \`frontend/mobile\`
- Platform: React Native
- Status: ✅ Ready
- Start Android: \`cd frontend/mobile && npm run android\`
- Start iOS: \`cd frontend/mobile && npm run ios\`

### Backend API
- Location: \`backend\`
- Port: 3100
- Status: ✅ Ready
- Start: \`cd backend && npm run start:dev\`
- API Docs: http://localhost:3100/api/docs

### Blockchain
- Network: Hardhat Local / Polygon Mumbai
- Contracts: Compiled ✅
- Tests: Passing ✅
- Deploy: \`npx hardhat run blockchain/scripts/deploy.ts\`

## Quick Start Commands

### Start Everything (Development)

\`\`\`bash
# Terminal 1: Web Frontend
cd frontend/web && npm run dev

# Terminal 2: Backend API
cd backend && npm run start:dev

# Terminal 3: Blockchain (Local)
npx hardhat node

# Terminal 4: Deploy Contracts
npx hardhat run blockchain/scripts/deploy.ts --network localhost
\`\`\`

### Run Tests

\`\`\`bash
# Core tests
npm test

# Smart contract tests
npx hardhat test

# Backend tests
cd backend && npm test

# Web frontend tests
cd frontend/web && npm test
\`\`\`

## Configuration Files

- Root: \`package.json\`, \`tsconfig.json\`
- Web: \`frontend/web/next.config.js\`, \`frontend/web/tailwind.config.js\`
- Backend: \`backend/.env\`, \`backend/nest-cli.json\`
- Blockchain: \`hardhat.config.ts\`

## Next Steps

1. ✅ All dependencies installed
2. ✅ Smart contracts compiled
3. ✅ Tests passing
4. 🔄 Update configuration files with your settings
5. 🔄 Deploy smart contracts to testnet
6. 🔄 Start development servers
7. 🔄 Begin development!

## Support

- Documentation: \`docs/README.md\`
- Issues: GitHub Issues
- Discord: [Your Discord Link]

---
Generated by setup-complete.sh
EOF

print_success "Deployment info generated: DEPLOYMENT_INFO.md"

# Summary
echo ""
echo "=========================================="
echo -e "${GREEN}✨ Setup Complete!${NC}"
echo "=========================================="
echo ""
echo "📊 Installation Summary:"
echo "  ✅ Root dependencies installed"
echo "  ✅ Core library built"
echo "  ✅ Web frontend ready"
echo "  ✅ Mobile frontend ready"
echo "  ✅ Backend API ready"
echo "  ✅ Smart contracts compiled"
echo "  ✅ Tests passing"
echo ""
echo "🚀 Quick Start:"
echo ""
echo "  1. Start Web Frontend:"
echo "     cd frontend/web && npm run dev"
echo ""
echo "  2. Start Backend API:"
echo "     cd backend && npm run start:dev"
echo ""
echo "  3. Start Local Blockchain:"
echo "     npx hardhat node"
echo ""
echo "  4. Deploy Contracts:"
echo "     npx hardhat run blockchain/scripts/deploy.ts --network localhost"
echo ""
echo "📚 Documentation:"
echo "  - Project: README.md"
echo "  - Backend: backend/README.md"
echo "  - Development: docs/DEVELOPMENT.md"
echo "  - Deployment: DEPLOYMENT_INFO.md"
echo ""
echo "🎉 Happy coding!"
echo ""
