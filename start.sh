#!/bin/bash

# ==============================================================================
# 💀 DEADMAN PROTOCOL - ULTIMATE STARTUP ENGINE (V5.0.0 - PRO RECOVERY)
# ==============================================================================

COMMAND="${1:-start}"
ROOT="$(cd "$(dirname "$(readlink -f "$0")" )" && pwd)"

# --- Premium Color Palette ---
RED='\033[38;5;196m'
GREEN='\033[38;5;82m'
YELLOW='\033[38;5;226m'
BLUE='\033[38;5;33m'
CYAN='\033[38;5;51m'
MAGENTA='\033[38;5;201m'
NC='\033[0m'
BOLD='\033[1m'

mkdir -p "$ROOT/logs"

# --- UI Helpers ---
print_banner() {
    clear
    echo -e "${MAGENTA}${BOLD}    ____                 __  ___            "
    echo "   / __ \___  ____ _____/  |/  /___ _____  "
    echo "  / / / / _ \/ __ \`/ __  / /|_/ / __ \`/ __ \ "
    echo " / /_/ /  __/ /_/ / /_/ / /  / / /_/ / / / / "
    echo "/_____/\___/\__,_/\__,_/_/  /_/\__,_/_/ /_/  "
    echo -e "                                             "
    echo -e "         ${CYAN}💀 DECENTRALIZED DIGITAL WILL PROTOCOL (V5.0.0)${NC}"
    echo -e "    ${BOLD}================================================${NC}\n"
}

ok()    { echo -e "${GREEN}${BOLD}✅ SUCCESS :${NC} $1"; }
info()  { echo -e "${BLUE}${BOLD}ℹ️  INFO    :${NC} $1"; }
warn()  { echo -e "${YELLOW}${BOLD}⚠️  WARNING :${NC} $1"; }
err()   { echo -e "${RED}${BOLD}❌ ERROR   :${NC} $1"; }
step()  { echo -e "${CYAN}${BOLD}🚀 STEP $1  :${NC} $2"; }

port_in_use() { (echo > /dev/tcp/127.0.0.1/"$1") >/dev/null 2>&1; }

do_stop() {
    echo -e "\n${YELLOW}${BOLD}🛑 CLEANING ENVIRONMENT...${NC}"
    sudo pkill -9 -f "ngrok" 2>/dev/null || true
    sudo pkill -9 -f "localtunnel" 2>/dev/null || true
    pkill -9 -f "ngrok" 2>/dev/null || true
    pkill -9 -f "localtunnel" 2>/dev/null || true
    pkill -9 -f "expo" 2>/dev/null || true
    pkill -9 -f "metro" 2>/dev/null || true
    pkill -9 -f "next-dev" 2>/dev/null || true
    pkill -9 -f "nest" 2>/dev/null || true
    pkill -9 -f "hardhat" 2>/dev/null || true
    pkill -9 -p $(lsof -t -i :7000) 2>/dev/null || true
    pkill -9 -p $(lsof -t -i :7001) 2>/dev/null || true
    pkill -9 -p $(lsof -t -i :8545) 2>/dev/null || true
    sudo docker compose down 2>/dev/null || true
}

do_status() {
    echo -e "${BOLD}${CYAN}📊 SYSTEM BRAIN STATUS${NC}"
    echo -e "------------------------------------------------"
    port_in_use 7000 && echo -e "🌐 Web Dashboard    : ${GREEN}ONLINE${NC}" || echo -e "🌐 Web Dashboard    : ${RED}OFFLINE${NC}"
    port_in_use 7001 && echo -e "⚙️  Backend API      : ${GREEN}ONLINE${NC}" || echo -e "⚙️  Backend API      : ${RED}OFFLINE${NC}"
    port_in_use 8545 && echo -e "⛓️  Local Chain      : ${GREEN}ONLINE${NC}" || echo -e "⛓️  Local Chain      : ${RED}OFFLINE${NC}"
    port_in_use 8081 && echo -e "📱 Metro Bundler    : ${GREEN}ONLINE${NC}" || echo -e "📱 Metro Bundler    : ${RED}OFFLINE${NC}"
    echo -e "------------------------------------------------"
}

print_links() {
    echo -e "${BOLD}${CYAN}🔗 USEFUL ACCESS LINKS:${NC}"
    echo -e "🌍 Web Dashboard     : ${BLUE}http://localhost:7000${NC}"
    echo -e "📜 API Docs (Swagger) : ${BLUE}http://localhost:7001/api/docs${NC}"
    echo -e "📊 Grafana Analytics  : ${BLUE}http://localhost:3001${NC}"
    echo -e "🐳 Container Health   : ${BLUE}http://localhost:9000${NC}"
    echo -e "------------------------------------------------\n"
}

do_start() {
    trap 'do_stop; exit' SIGINT SIGTERM
    print_banner
    
    # Load .env safely (handling spaces in values)
    if [ -f "$ROOT/.env" ]; then
        set -a
        source "$ROOT/.env"
        set +a
    fi

    step "1" "Igniting Docker Core Services..."
    sudo docker compose up -d
    
    sleep 3
    do_status
    print_links

    if [ -d "$ROOT/frontend/mobile" ]; then
        step "2" "Launching Deep Tunnel Bypass..."
        cd "$ROOT/frontend/mobile"
        
        sudo pkill -9 -f "ngrok" 2>/dev/null || true
        pkill -9 -f "ngrok" 2>/dev/null || true
        sleep 2
        
        # Try Ngrok
        info "Spawning Ngrok Agent..."
        ngrok http 8081 --log=stdout --authtoken "$NGROK_AUTHTOKEN" > "$ROOT/logs/ngrok.log" 2>&1 &
        sleep 5
        
        # Get Tunnel URL (Safe extraction)
        TUNNEL_URL=$(curl -s http://localhost:4040/api/tunnels | grep -o 'https://[^"]*ngrok-free.app' | head -n 1)
        
        if [ ! -z "$TUNNEL_URL" ]; then
            ok "GLOBAL TUNNEL ACTIVE (NGROK): $TUNNEL_URL"
            EXPO_PACKAGER_PROXY_URL="$TUNNEL_URL" npx expo start --localhost --clear
        else
            warn "Ngrok is blocked or failed. Trying Localtunnel..."
            # Use specific subdomain to keep consistent across restarts
            npx -y localtunnel --port 8081 > "$ROOT/logs/lt.log" 2>&1 &
            sleep 8
            LT_URL=$(grep -o 'https://[^ ]*' "$ROOT/logs/lt.log" | head -n 1)
            
            if [ ! -z "$LT_URL" ]; then
                ok "GLOBAL TUNNEL ACTIVE (LT): $LT_URL"
                EXPO_PACKAGER_PROXY_URL="$LT_URL" npx expo start --localhost --clear
            else
                warn "All Tunnels FAILED. Switching to LAN Mode..."
                npx expo start --host lan --clear
            fi
        fi
    else
        tail -f "$ROOT/logs/backend.log"
    fi
}

case "$COMMAND" in
    start)  do_start  ;;
    stop)   do_stop   ;;
    status) do_status ;;
    *) echo "Usage: $0 {start|stop|status}"; exit 1 ;;
esac
