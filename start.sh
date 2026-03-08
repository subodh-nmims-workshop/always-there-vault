#!/bin/bash

# ========================================================
# Digital Will Protocol - Complete Management Script
# Commands: start, stop, status, test, deploy
# ========================================================

set -e  # Exit on error

# Parse command line arguments
COMMAND="${1:-start}"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
PURPLE='\033[0;35m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color

# Function to print colored output
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

print_header() {
    echo -e "${PURPLE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
    echo -e "${PURPLE}  $1${NC}"
    echo -e "${PURPLE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
}

# Store PIDs for cleanup
PIDS=()

# Check if port is in use
check_port() {
    if lsof -Pi :$1 -t >/dev/null 2>&1; then
        return 0
    else
        return 1
    fi
}

# Kill process on port
kill_port() {
    PORT=$1
    if check_port $PORT; then
        print_warning "Port $PORT is in use, cleaning up..."
        # Get all PIDs using the port and kill them with SIGKILL
        lsof -ti:$PORT | xargs kill -9 2>/dev/null || true
        sleep 2
        
        # Verify if still in use
        if check_port $PORT; then
            print_error "Could not clear port $PORT. Please manually kill the process."
            return 1
        fi
        print_status "Port $PORT cleared."
    fi
    return 0
}

# Wait for port to be ready
wait_for_port() {
    PORT=$1
    NAME=$2
    TIMEOUT=${3:-90} # Default to 90 seconds
    COUNTER=0
    
    print_info "Waiting for $NAME to be ready on port $PORT..."
    while ! lsof -Pi :$PORT -sTCP:LISTEN -t >/dev/null 2>&1; do
        sleep 1
        COUNTER=$((COUNTER + 1))
        if [ $COUNTER -ge $TIMEOUT ]; then
            echo ""
            print_error "$NAME failed to start within $TIMEOUT seconds"
            # Show last few lines of log if it failed
            LOG_FILE=""
            case $PORT in
                7001) LOG_FILE="backend-nestjs.log" ;;
                7000) LOG_FILE="web.log" ;;
                8545) LOG_FILE="hardhat-node.log" ;;
                8081) LOG_FILE="mobile.log" ;;
            esac
            if [ -n "$LOG_FILE" ] && [ -f "$LOG_FILE" ]; then
                print_info "Last 10 lines of $LOG_FILE:"
                tail -n 10 "$LOG_FILE"
            fi
            return 1
        fi
        # Print progress
        echo -n "."
    done
    echo ""
    print_status "$NAME is ready!"
    return 0
}

# ========================================================
# STOP COMMAND
# ========================================================
stop_services() {
    print_header "🛑 Stopping Digital Will Protocol Services"
    echo ""
    
    # Kill processes by port
    kill_port 7000
    kill_port 7001
    kill_port 8545
    kill_port 8081
    
    # Kill any remaining processes by pattern
    print_info "Cleaning up background processes..."
    pkill -9 -f "hardhat node" 2>/dev/null || true
    pkill -9 -f "nest start" 2>/dev/null || true
    pkill -9 -f "next-server" 2>/dev/null || true
    pkill -9 -f "next dev" 2>/dev/null || true
    pkill -9 -f "react-native start" 2>/dev/null || true
    
    # Remove PID files
    rm -f .primary-backend.pid .secondary-backend.pid .frontend.pid .subscription-*.pid
    
    echo ""
    print_status "All services stopped!"
}

# ========================================================
# STATUS COMMAND
# ========================================================
check_status() {
    print_header "📊 Digital Will Protocol - Service Status"
    echo ""
    
    # Function to check service
    check_service() {
        PORT=$1
        NAME=$2
        URL=$3
        
        if lsof -Pi :$PORT -sTCP:LISTEN -t >/dev/null 2>&1; then
            PID=$(lsof -ti:$PORT | head -n 1)
            print_status "$NAME"
            echo -e "   Port: $PORT | PID: $PID"
            echo -e "   URL:  $URL"
        else
            print_error "$NAME - Not Running"
            echo -e "   Port: $PORT"
        fi
        echo ""
    }
    
    # Check all services
    check_service 7000 "Frontend Web" "http://localhost:7000"
    check_service 7001 "Backend NestJS" "http://localhost:7001"
    check_service 8545 "Hardhat Node" "http://localhost:8545"
    check_service 8081 "Mobile Metro" "http://localhost:8081"
    
    print_header "📝 Log Files"
    echo ""
    
    for log in hardhat-node.log backend-nestjs.log web.log mobile.log deploy.log; do
        if [ -f "$log" ]; then
            SIZE=$(du -h "$log" | cut -f1)
            LINES=$(wc -l < "$log")
            echo -e "   $log - $SIZE ($LINES lines)"
        fi
    done
    
    echo ""
}

# ========================================================
# START COMMAND
# ========================================================
start_services() {
    # Cleanup function
    cleanup() {
        echo ""
        print_header "🛑 Shutting Down Services"
        # Kill everything in the same process group more effectively
        for pid in "${PIDS[@]}"; do
            if kill -0 "$pid" 2>/dev/null; then
                print_info "Stopping process $pid..."
                # Kill the process and all its children
                pkill -P "$pid" 2>/dev/null || true
                kill -9 "$pid" 2>/dev/null || true
            fi
        done
        # Final port cleanup
        kill_port 7000
        kill_port 7001
        kill_port 8545
        kill_port 8081
        print_status "All services stopped"
        exit 0
    }
    
    # Trap Ctrl+C
    trap cleanup SIGINT SIGTERM
    
    print_header "🚀 Digital Will Protocol - Complete Startup"
    echo ""
    print_info "This script will start both frontends and both backends:"
    print_info "  1. 🔷 PRIMARY Backend - Hardhat Node (Blockchain)"
    print_info "  2. 🔶 SECONDARY Backend - NestJS API"
    print_info "  3. 🌐 Frontend Web - Next.js"
    print_info "  4. 📱 Mobile App - Metro Bundler"
    echo ""
    
    # ========================================================
    # 1. PRIMARY BACKEND - HARDHAT NODE (Blockchain)
    # ========================================================
    print_header "🔷 Starting PRIMARY Backend - Hardhat Blockchain"
    
    cd backend-full-decentralised
    kill_port 8545
    
    print_info "Starting Hardhat node..."
    npx hardhat node > ../hardhat-node.log 2>&1 &
    HARDHAT_PID=$!
    PIDS+=($HARDHAT_PID)
    
    wait_for_port 8545 "Blockchain Node" 30
    
    print_info "Deploying smart contracts..."
    if npx hardhat run scripts/deploy.ts --network localhost 2>&1 | tee ../deploy.log; then
        print_status "Smart contracts deployed successfully"
    else
        print_warning "Contract deployment had issues (check deploy.log)"
    fi
    
    cd ..
    
    # ========================================================
    # 2. SECONDARY BACKEND - NESTJS API
    # ========================================================
    print_header "🔶 Starting SECONDARY Backend - NestJS API"
    
    cd backend
    kill_port 7001
    
    print_info "Starting NestJS API..."
    npm run start:dev > ../backend-nestjs.log 2>&1 &
    BACKEND_PID=$!
    PIDS+=($BACKEND_PID)
    
    cd ..
    
    # ========================================================
    # 3. FRONTEND WEB (Next.js)
    # ========================================================
    print_header "🌐 Starting Frontend Web"
    
    cd frontend/web
    kill_port 7000
    
    print_info "Starting Next.js Dev Server..."
    npm run dev > ../../web.log 2>&1 &
    FRONTEND_PID=$!
    PIDS+=($FRONTEND_PID)
    
    cd ../..
    
    # ========================================================
    # 4. MOBILE APP (React Native)
    # ========================================================
    print_header "📱 Starting Mobile App"
    
    cd frontend/mobile
    kill_port 8081
    
    print_info "Starting Metro Bundler..."
    npm start > ../../mobile.log 2>&1 &
    MOBILE_PID=$!
    PIDS+=($MOBILE_PID)
    
    cd ../..
    
    # ========================================================
    # WAIT FOR SERVICES TO BE READY
    # ========================================================
    print_header "⏳ Initializing Services"
    
    wait_for_port 7001 "NestJS API" 90
    wait_for_port 7000 "Frontend Web" 90
    wait_for_port 8081 "Mobile Metro" 60
    
    # Show QR Code for Mobile
    print_header "📱 Mobile App QR Code"
    print_info "Waiting for QR code to generate..."
    sleep 5
    sed -n '/[▒▓█]/,/Welcome to Metro/p' mobile.log | head -n -1 || echo "QR code not yet visible. Check mobile.log"
    
    # FINAL SUMMARY
    echo ""
    print_header "✨ Digital Will Protocol - All Services Running"
    echo ""
    echo -e "${CYAN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
    echo -e "${GREEN}🌐 Frontend Web:${NC}              http://localhost:7000"
    echo -e "${GREEN}🔷 PRIMARY Backend (Hardhat):${NC} http://localhost:8545"
    echo -e "${GREEN}🔶 SECONDARY Backend (NestJS):${NC} http://localhost:7001"
    echo -e "${GREEN}📱 Mobile Metro:${NC}              http://localhost:8081"
    echo -e "${CYAN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
    echo ""
    print_warning "Press Ctrl+C to stop all services"
    echo ""
    
    # Monitor loop
    while true; do
        sleep 5
        for pid in "${PIDS[@]}"; do
            if ! kill -0 "$pid" 2>/dev/null; then
                print_error "One of the services (PID: $pid) has stopped. Check logs."
                break
            fi
        done
    done
}

# ========================================================
# MAIN COMMAND ROUTER
# ========================================================
case "$COMMAND" in
    start)
        start_services
        ;;
    stop)
        stop_services
        ;;
    status)
        check_status
        ;;
    deploy)
        cd backend-full-decentralised && npx hardhat run scripts/deploy.ts --network localhost && cd ..
        ;;
    *)
        echo "Usage: ./start.sh [start|stop|status|deploy]"
        exit 1
        ;;
esac
