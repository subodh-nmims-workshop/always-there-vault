#!/bin/bash

# ==============================================================================
# 💀 DEADMAN PROTOCOL - ULTIMATE STARTUP ENGINE
# ==============================================================================
# Optimized for: Parrot OS / Ubuntu / Debian / macOS
# Version: 3.2.0 (Monitoring & Docker Ready)
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
    echo -e "\n${ORANGE}${BOLD}🛑 TERMINATING LOCAL SERVICES...${NC}"
    local PORTS=(7000 7001 8545 8081 8082 19000 19001 19002 9090 3001)
    for p in "${PORTS[@]}"; do
        if port_in_use "$p"; then
            info "Port $p is active. Cleaning up..."
            # kill_port "$p" # We don't necessarily want to kill Docker containers here
        fi
    done

    # Force kill only native dev processes
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
    port_in_use 7000 && echo -e "🌐 Web Dashboard    : ${GREEN}ONLINE (7000)${NC}" || echo -e "🌐 Web Dashboard    : ${RED}OFFLINE${NC}"
    port_in_use 7001 && echo -e "⚙️  Backend API      : ${GREEN}ONLINE (7001)${NC}" || echo -e "⚙️  Backend API      : ${RED}OFFLINE${NC}"
    port_in_use 8545 && echo -e "⛓️  Local Chain      : ${GREEN}ONLINE (8545)${NC}" || echo -e "⛓️  Local Chain      : ${RED}OFFLINE${NC}"
    port_in_use 8081 && echo -e "📱 Metro Bundler    : ${GREEN}ONLINE (8081)${NC}" || echo -e "📱 Metro Bundler    : ${RED}OFFLINE${NC}"
    port_in_use 3001 && echo -e "📊 Grafana Analytics: ${GREEN}ONLINE (3001)${NC}" || echo -e "📊 Grafana Analytics: ${RED}OFFLINE${NC}"
    port_in_use 9090 && echo -e "📈 Prometheus       : ${GREEN}ONLINE (9090)${NC}" || echo -e "📈 Prometheus       : ${RED}OFFLINE${NC}"
    echo -e "------------------------------------------------\n"
}

do_install() {
    print_banner
    info "Starting full ecosystem dependency installation..."
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
    step "0" "Checking for conflicting local processes..."
    do_stop

    # 1. Start Docker Ecosystem (Background)
    step "1" "Initialising Docker Core Services..."
    sudo docker compose up -d
    
    if wait_for_port 8545 "Blockchain (Docker)"; then
        ok "Docker Backend & Blockchain READY."
    else
        err "Docker ignition check timed out. Port 8545 not responding."
    fi

    # Display Dashboard immediately
    do_status

    echo -e "${BOLD}${MAGENTA}🔗 USEFUL ACCESS LINKS:${NC}"
    echo -e "${CYAN}🌍 Web Dashboard     :${NC} http://localhost:7000"
    echo -e "${CYAN}📜 API Docs (Swagger) :${NC} http://localhost:7001/api/docs"
    echo -e "${CYAN}📊 Grafana Analytics  :${NC} http://localhost:3001"
    echo -e "${CYAN}📈 Prometheus Server  :${NC} http://localhost:9090"
    echo -e "${CYAN}⛓️  Local RPC Node     :${NC} http://localhost:8545"
    echo -e "${CYAN}🐳 Container Health   :${NC} http://localhost:9000 (Portainer)"
    echo -e "------------------------------------------------"

    # 2. Start Mobile (Local Host via Tunnel)
    if [ -d "$ROOT/frontend/mobile" ]; then
        step "2" "Launching Mobile App with EXPO DEDICATED TUNNEL..."
        warn "Mobile is starting in Tunnel mode for stable remote access."
        cd "$ROOT/frontend/mobile"
        
        # Clean metro cache to prevent stale builds
        info "Purging Metro cache..."
        rm -rf node_modules/.cache/metro 2>/dev/null || true
        
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
        echo -e "Usage: $0 {start|stop|status|install}"
        exit 1 
        ;;
esac
