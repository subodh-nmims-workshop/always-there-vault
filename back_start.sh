#!/bin/bash

set -e

COMMAND="${1:-start}"

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

print_status() { echo -e "${GREEN}✅ $1${NC}"; }
print_info() { echo -e "${BLUE}ℹ️  $1${NC}"; }
print_error() { echo -e "${RED}❌ $1${NC}"; }
print_warning() { echo -e "${YELLOW}⚠️  $1${NC}"; }

PIDS=()

check_port() { lsof -Pi :$1 -t >/dev/null 2>&1; }

kill_port() {
    if check_port $1; then
        print_info "Killing process on port $1"
        lsof -ti:$1 | xargs kill -9 2>/dev/null || true
        sleep 1
    fi
}

wait_port() {
    print_info "Waiting for $2 on port $1..."
    for i in {1..30}; do
        check_port $1 && { print_status "$2 ready on port $1"; return 0; }
        sleep 1
    done
    print_error "$2 failed to start on port $1"
    return 1
}

cleanup() {
    echo ""
    print_info "Stopping all services..."
    for pid in "${PIDS[@]}"; do
        if ps -p "$pid" > /dev/null 2>&1; then
            kill -9 "$pid" 2>/dev/null || true
        fi
    done
    kill_port 7000; kill_port 7001; kill_port 8545; kill_port 8081; kill_port 19000; kill_port 19001; kill_port 19002
    pkill -9 -f "hardhat node" 2>/dev/null || true
    pkill -9 -f "nest start" 2>/dev/null || true
    pkill -9 -f "next dev" 2>/dev/null || true
    pkill -9 -f "expo start" 2>/dev/null || true
    print_status "All services stopped"
    exit 0
}

check_dependencies() {
    print_info "Checking dependencies..."
    
    # Check Node.js
    if ! command -v node &> /dev/null; then
        print_error "Node.js is not installed"
        exit 1
    fi
    print_status "Node.js $(node -v) found"
    
    # Check npm
    if ! command -v npm &> /dev/null; then
        print_error "npm is not installed"
        exit 1
    fi
    print_status "npm $(npm -v) found"
    
    # Check if node_modules exist
    if [ ! -d "backend/node_modules" ]; then
        print_warning "Backend dependencies not installed. Run: cd backend && npm install"
    fi
    
    if [ ! -d "frontend/web/node_modules" ]; then
        print_warning "Web frontend dependencies not installed. Run: cd frontend/web && npm install"
    fi
    
    if [ ! -d "frontend/mobile/node_modules" ]; then
        print_warning "Mobile app dependencies not installed. Run: cd frontend/mobile && npm install"
    fi
    
    if [ ! -d "backend-full-decentralised/node_modules" ]; then
        print_warning "Blockchain dependencies not installed. Run: cd backend-full-decentralised && npm install"
    fi
}

start_services() {
    trap cleanup SIGINT SIGTERM
    
    print_info "Starting Digital Will Protocol..."
    echo ""
    
    check_dependencies
    echo ""
    
    # Clean up any existing processes
    print_info "Cleaning up existing processes..."
    kill_port 7000; kill_port 7001; kill_port 8545; kill_port 8081; kill_port 19000; kill_port 19001; kill_port 19002
    pkill -9 -f "hardhat node" 2>/dev/null || true
    pkill -9 -f "nest start" 2>/dev/null || true
    pkill -9 -f "next dev" 2>/dev/null || true
    pkill -9 -f "expo start" 2>/dev/null || true
    sleep 2
    echo ""
    
    # Start Blockchain
    print_info "Starting Hardhat Blockchain Node..."
    if [ -d "backend-full-decentralised" ]; then
        cd backend-full-decentralised
        
        # Check if hardhat is properly installed
        if [ ! -d "node_modules" ]; then
            print_warning "Installing blockchain dependencies..."
            npm install --legacy-peer-deps > /dev/null 2>&1
        fi
        
        npx hardhat node > ../hardhat-node.log 2>&1 &
        PIDS+=($!)
        cd ..
        
        if wait_port 8545 "Blockchain"; then
            # Deploy contracts
            print_info "Deploying smart contracts..."
            cd backend-full-decentralised
            npx hardhat run scripts/deploy.ts --network localhost > ../deploy.log 2>&1 && print_status "Contracts deployed" || print_warning "Contract deployment failed (check deploy.log)"
            cd ..
        else
            print_error "Blockchain failed to start. Check hardhat-node.log"
            cat hardhat-node.log | tail -20
            cleanup
        fi
    else
        print_warning "backend-full-decentralised directory not found, skipping blockchain"
    fi
    echo ""
    
    # Start Backend API
    print_info "Starting Backend API..."
    if [ -d "backend" ]; then
        cd backend
        
        # Check if dependencies are installed
        if [ ! -d "node_modules" ]; then
            print_warning "Installing backend dependencies..."
            npm install > /dev/null 2>&1
        fi
        
        npm run start:dev > ../backend.log 2>&1 &
        PIDS+=($!)
        cd ..
        
        if ! wait_port 7001 "Backend API"; then
            print_error "Backend failed to start. Check backend.log"
            cat backend.log | tail -20
        fi
    else
        print_warning "backend directory not found, skipping backend"
    fi
    echo ""
    
    # Start Web Frontend
    print_info "Starting Web Frontend..."
    if [ -d "frontend/web" ]; then
        cd frontend/web
        
        # Check if dependencies are installed
        if [ ! -d "node_modules" ]; then
            print_warning "Installing web dependencies..."
            npm install > /dev/null 2>&1
        fi
        
        # Clear Next.js cache
        rm -rf .next 2>/dev/null || true
        
        npm run dev > ../../web.log 2>&1 &
        PIDS+=($!)
        cd ../..
        
        if ! wait_port 7000 "Web Frontend"; then
            print_error "Web Frontend failed to start. Check web.log"
            cat web.log | tail -20
        fi
    else
        print_warning "frontend/web directory not found, skipping web"
    fi
    echo ""
    
    # Display service URLs
    echo "======================================================"
    print_status "All services are running!"
    echo "======================================================"
    echo ""
    echo -e "${GREEN}🌐 Web Frontend:${NC}    http://localhost:7000"
    echo -e "${GREEN}🔧 Backend API:${NC}     http://localhost:7001"
    echo -e "${GREEN}⛓️  Blockchain:${NC}      http://localhost:8545"
    echo ""
    echo "======================================================"
    print_info "Starting Mobile App (Expo)..."
    echo "======================================================"
    echo ""
    print_warning "Scan the QR code below with Expo Go app on your phone"
    echo ""
    
    # Start Mobile in foreground — piping via tee breaks QR code ANSI graphics
    if [ -d "frontend/mobile" ]; then
        cd frontend/mobile
        
        # Install dependencies if missing
        if [ ! -d "node_modules" ]; then
            print_warning "Installing mobile dependencies..."
            npm install --legacy-peer-deps > /dev/null 2>&1
        fi
        
        # Run expo with clear cache - non-interactive for better stability
        print_info "Starting Metro on LAN (Cache Clear)..."
        npx expo start --clear
    else
        print_warning "frontend/mobile directory not found"
        print_info "Press Ctrl+C to stop all services"
        wait
    fi
}

stop_services() {
    print_info "Stopping all services..."
    kill_port 7000; kill_port 7001; kill_port 8545; kill_port 8081; kill_port 19000; kill_port 19001; kill_port 19002
    pkill -9 -f "hardhat node" 2>/dev/null || true
    pkill -9 -f "nest start" 2>/dev/null || true
    pkill -9 -f "next dev" 2>/dev/null || true
    pkill -9 -f "expo start" 2>/dev/null || true
    print_status "All services stopped"
}

check_status() {
    echo "======================================================"
    echo "Service Status:"
    echo "======================================================"
    check_port 7000 && echo -e "${GREEN}✅ Web Frontend (7000)${NC}" || echo -e "${RED}❌ Web Frontend (7000)${NC}"
    check_port 7001 && echo -e "${GREEN}✅ Backend API (7001)${NC}" || echo -e "${RED}❌ Backend API (7001)${NC}"
    check_port 8545 && echo -e "${GREEN}✅ Blockchain (8545)${NC}" || echo -e "${RED}❌ Blockchain (8545)${NC}"
    check_port 8081 && echo -e "${GREEN}✅ Mobile Expo (8081)${NC}" || echo -e "${RED}❌ Mobile Expo (8081)${NC}"
    check_port 19000 && echo -e "${GREEN}✅ Expo DevTools (19000)${NC}" || echo -e "${RED}❌ Expo DevTools (19000)${NC}"
    echo "======================================================"
}

install_dependencies() {
    print_info "Installing all dependencies..."
    echo ""
    
    # Root dependencies
    if [ -f "package.json" ]; then
        print_info "Installing root dependencies..."
        npm install --legacy-peer-deps
        print_status "Root dependencies installed"
    fi
    echo ""
    
    # Backend dependencies
    if [ -d "backend" ]; then
        print_info "Installing backend dependencies..."
        cd backend
        npm install
        cd ..
        print_status "Backend dependencies installed"
    fi
    echo ""
    
    # Blockchain dependencies
    if [ -d "backend-full-decentralised" ]; then
        print_info "Installing blockchain dependencies..."
        cd backend-full-decentralised
        npm install --legacy-peer-deps
        # Install required hardhat toolbox dependencies
        npm install --save-dev "@nomicfoundation/hardhat-network-helpers@^1.0.0" "@nomicfoundation/hardhat-verify@^2.0.0" "@types/mocha@>=9.1.0" "hardhat-gas-reporter@^1.0.8" "solidity-coverage@^0.8.1" --legacy-peer-deps
        cd ..
        print_status "Blockchain dependencies installed"
    fi
    echo ""
    
    # Web frontend dependencies
    if [ -d "frontend/web" ]; then
        print_info "Installing web frontend dependencies..."
        cd frontend/web
        npm install
        cd ../..
        print_status "Web frontend dependencies installed"
    fi
    echo ""
    
    # Mobile app dependencies
    if [ -d "frontend/mobile" ]; then
        print_info "Installing mobile app dependencies..."
        cd frontend/mobile
        npm install --legacy-peer-deps
        cd ../..
        print_status "Mobile app dependencies installed"
    fi
    echo ""
    
    print_status "All dependencies installed successfully!"
}

case "$COMMAND" in
    start) start_services ;;
    stop) stop_services ;;
    status) check_status ;;
    install) install_dependencies ;;
    *) 
        echo "Usage: ./start.sh [start|stop|status|install]"
        echo ""
        echo "Commands:"
        echo "  start   - Start all services (blockchain, backend, web, mobile)"
        echo "  stop    - Stop all running services"
        echo "  status  - Check status of all services"
        echo "  install - Install all dependencies"
        exit 1 
        ;;
esac
