#!/bin/bash

# ==============================================================================
# 💀 DEADMAN PROTOCOL - ULTIMATE STARTUP ENGINE
# ==============================================================================
# Optimized for: Parrot OS / Ubuntu / Debian / macOS
# Version: 3.1.0
# Description: Starts Blockchain, Backend, Web, and Mobile (Tunnel Mode)
# ==============================================================================

COMMAND="${1:-start}"
ROOT="$(cd "$(dirname "$(readlink -f "$0")")" && pwd)"

# --- Premium Color Palette ---
RED='\033[38;5;196m'
GREEN='\033[38;5;82m'
YELLOW='\033[38;5;226m'
BLUE='\033[38;5;33m'
CYAN='\033[38;5;51m'
MAGENTA='\033[38;5;201m'
ORANGE='\033[38;5;208m'
BOLD='\033[1m'
NC='\033[0m'

# --- UI Helpers ---
print_banner() {
    clear
    echo -e "${MAGENTA}${BOLD}"
    echo "    ____                 __  ___            "
    echo "   / __ \___  ____ _____/  |/  /___ _____  "
    echo "  / / / / _ \/ __ \`/ __  / /|_/ / __ \`/ __ \\ "
    echo " / /_/ /  __/ /_/ / /_/ / /  / / /_/ / / / / "
    echo "/_____/\___/\__,_/\__,_/_/  /_/\__,_/_/ /_/  "
    echo "                                             "
    echo -e "         ${CYAN}💀 DECENTRALIZED DIGITAL WILL PROTOCOL${NC}"
    echo -e "    ${BOLD}================================================${NC}\n"
}

ok()    { echo -e "${GREEN}${BOLD}✅ SUCCESS :${NC} $1"; }
info()  { echo -e "${BLUE}${BOLD}ℹ️  INFO    :${NC} $1"; }
warn()  { echo -e "${YELLOW}${BOLD}⚠️  WARNING :${NC} $1"; }
err()   { echo -e "${RED}${BOLD}❌ ERROR   :${NC} $1"; }
step()  { echo -e "${CYAN}${BOLD}🚀 STEP $1  :${NC} $2"; }

# --- Process Management ---
port_in_use() { (echo > /dev/tcp/127.0.0.1/"$1") >/dev/null 2>&1; }

kill_port() {
    if port_in_use "$1"; then
        lsof -ti:"$1" | xargs kill -9 2>/dev/null || true
        sleep 0.5
    fi
}

wait_for_port() {
    local port="$1" name="$2"
    for i in $(seq 1 60); do
        port_in_use "$port" && return 0
        sleep 1
    done
    return 1
}

# --- Service Operations ---
do_stop() {
    echo -e "\n${ORANGE}${BOLD}🛑 TERMINATING SERVICES...${NC}"
    local PORTS=(7000 7001 8545 8081 8082 19000 19001 19002)
    for p in "${PORTS[@]}"; do
        if port_in_use "$p"; then
            info "Port $p is active. Killing..."
            kill_port "$p"
        fi
    done

    # Force kill by name for stubborn processes
    pkill -9 -f "hardhat" 2>/dev/null || true
    pkill -9 -f "next-server" 2>/dev/null || true
    pkill -9 -f "nest" 2>/dev/null || true
    pkill -9 -f "expo" 2>/dev/null || true
    pkill -9 -f "ngrok" 2>/dev/null || true
    pkill -9 -f "metro" 2>/dev/null || true
    
    ok "Environment cleaned."
}

do_status() {
    print_banner
    echo -e "${BOLD}${CYAN}📊 SYSTEM BRAIN STATUS${NC}"
    echo -e "------------------------------------------------"
    port_in_use 7000 && echo -e "🌐 Web Dashboard  : ${GREEN}ONLINE (7000)${NC}" || echo -e "🌐 Web Dashboard  : ${RED}OFFLINE${NC}"
    port_in_use 7001 && echo -e "⚙️  Backend API    : ${GREEN}ONLINE (7001)${NC}" || echo -e "⚙️  Backend API    : ${RED}OFFLINE${NC}"
    port_in_use 8545 && echo -e "⛓️  Local Chain    : ${GREEN}ONLINE (8545)${NC}" || echo -e "⛓️  Local Chain    : ${RED}OFFLINE${NC}"
    port_in_use 8081 && echo -e "📱 Metro Bundler  : ${GREEN}ONLINE (8081)${NC}" || echo -e "📱 Metro Bundler  : ${RED}OFFLINE${NC}"
    port_in_use 3001 && echo -e "📊 Grafana Dashboard: ${GREEN}ONLINE (3001)${NC}" || echo -e "📊 Grafana Dashboard: ${RED}OFFLINE${NC}"
    port_in_use 9090 && echo -e "📈 Prometheus      : ${GREEN}ONLINE (9090)${NC}" || echo -e "📈 Prometheus      : ${RED}OFFLINE${NC}"
    echo -e "------------------------------------------------\n"
}

do_install() {
    print_banner
    info "Starting full ecosystem dependency installation..."
    # Root (Blockchain)
    step "INSTALL" "Processing Root (Blockchain)..."
    cd "$ROOT" && npm install --legacy-peer-deps
    
    local DIRS=("backend" "frontend/web" "frontend/mobile")
    for dir in "${DIRS[@]}"; do
        if [ -d "$ROOT/$dir" ]; then
            step "INSTALL" "Processing $dir..."
            cd "$ROOT/$dir" && npm install --legacy-peer-deps
            ok "$dir dependencies installed."
        fi
    done
}

do_start() {
    trap 'echo -e "\n"; do_stop; exit' SIGINT SIGTERM
    print_banner
    
    # 0. Cleanup
    step "0" "Cleaning up previous sessions..."
    do_stop

    # 1. Blockchain (Hardhat) - Try Root first, then blockchain/
    step "1" "Igniting Local Blockchain..."
    local CHAIN_DIR="$ROOT"
    if [ ! -f "$ROOT/hardhat.config.ts" ] && [ -d "$ROOT/blockchain" ]; then
        CHAIN_DIR="$ROOT/blockchain"
    fi

    cd "$CHAIN_DIR"
    info "Running blockchain node in $CHAIN_DIR..."
    npx hardhat node > "$ROOT/logs/hardhat.log" 2>&1 &
    
    if wait_for_port 8545 "Blockchain"; then
        info "Deploying Smart Contracts..."
        # Find where the contracts/scripts are
        local SCRIPT="./scripts/deploy.ts"
        [ ! -f "$SCRIPT" ] && SCRIPT="./blockchain/scripts/deploy.ts"
        
        info "Using deployment script: $SCRIPT"
        npx hardhat run "$SCRIPT" --network localhost > "$ROOT/logs/deploy.log" 2>&1
        if [ $? -eq 0 ]; then
            ok "Blockchain & Contracts READY."
        else
            warn "Contract deployment had issues. Check logs/deploy.log"
            tail -n 5 "$ROOT/logs/deploy.log"
        fi
    else
        err "Blockchain ignition failed. Port 8545 not responding."
        echo -e "${YELLOW}Check logs/hardhat.log for details:${NC}"
        tail -n 10 "$ROOT/logs/hardhat.log"
        exit 1
    fi

    # 2. Backend (NestJS)
    if [ -d "$ROOT/backend" ]; then
        step "2" "Waking up the Backend..."
        cd "$ROOT/backend"
        npm run start:dev > "$ROOT/logs/backend.log" 2>&1 &
        if wait_for_port 7001 "Backend"; then
            ok "Backend HEARTBEAT detected."
        else
            warn "Backend is taking longer than usual. Check logs/backend.log"
        fi
    fi

    # 3. Web (Next.js)
    if [ -d "$ROOT/frontend/web" ]; then
        step "3" "Launching Web Control Center..."
        cd "$ROOT/frontend/web"
        npm run dev > "$ROOT/logs/web.log" 2>&1 &
        if wait_for_port 7000 "Web"; then
            ok "Web Dashboard ACCESS GRANTED."
        else
            warn "Web dashboard startup issue. Check logs/web.log"
        fi
    fi

    echo -e "\n${GREEN}${BOLD}✨ CORE SERVICES ARE LIVE ✨${NC}"
    do_status

    echo -e "${BOLD}${MAGENTA}🔗 USEFUL ACCESS LINKS:${NC}"
    echo -e "${CYAN}🌍 Web Dashboard   :${NC} http://localhost:7000"
    echo -e "${CYAN}📜 API Docs (Swagger):${NC} http://localhost:7001/api/docs"
    echo -e "${CYAN}📊 Grafana Analytics:${NC} http://localhost:3001"
    echo -e "${CYAN}📈 Prometheus Nodes :${NC} http://localhost:9090"
    echo -e "${CYAN}⛓️  Local RPC Node   :${NC} http://localhost:8545"
    echo -e "${CYAN}🐳 Container Health :${NC} http://localhost:9000 (Portainer)"
    echo -e "------------------------------------------------"

    # 4. Mobile (Expo - TUNNEL MODE)
    if [ -d "$ROOT/frontend/mobile" ]; then
        step "4" "Launching Mobile App with EXPO DEDICATED TUNNEL..."
        warn "Mobile is starting in Tunnel mode for stable remote access."
        cd "$ROOT/frontend/mobile"
        
        # Clean metro cache to prevent stale builds
        info "Purging Metro cache..."
        rm -rf node_modules/.cache/metro 2>/dev/null || true
        
        # Explicitly removed tunnel as Ngrok is failing due to IPv6 routing issues. Using default LAN.
        info "Initializing Expo Tunnel Server..."
        npx expo start --tunnel --clear
    else
        warn "Mobile project not found. Monitoring background services..."
        tail -f "$ROOT/logs/backend.log"
    fi
}

# --- Router ---
case "$COMMAND" in
    start)   do_start   ;;
    stop)    do_stop    ;;
    status)  do_status  ;;
    install) do_install ;;
    *) 
        echo -e "Usage: $0 {${CYAN}start${NC}|${RED}stop${NC}|${BLUE}status${NC}|${YELLOW}install${NC}}"
        exit 1 
        ;;
esac
