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
    echo '   / __ \___  ____ _____/  |/  /___ _____  '
    echo '  / / / / _ \/ __ `/ __  / /|_/ / __ `/ __ \ '
    echo ' / /_/ /  __/ /_/ / /_/ / /  / / /_/ / / / / '
    echo '/_____/\___/\__,_/\__,_/_/  /_/\__,_/_/ /_/  '
    echo -e "                                             "
    echo -e "         ${CYAN}🌟 ALWAYSTHERE DIGITAL WILL PROTOCOL (V5.0.0)${NC}"
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
    # Force kill processes on key ports using fuser and lsof
    for port in 7000 7001 8081 8545 19000 19001 19002; do
        fuser -k -9 ${port}/tcp 2>/dev/null || true
        PID=$(lsof -t -i :$port 2>/dev/null)
        if [ ! -z "$PID" ]; then
            kill -9 $PID 2>/dev/null || true
        fi
    done

    # Cleanup common process names
    pkill -9 -f "ngrok" 2>/dev/null || true
    pkill -9 -f "localtunnel" 2>/dev/null || true
    pkill -9 -f "expo" 2>/dev/null || true
    pkill -9 -f "metro" 2>/dev/null || true
    pkill -9 -f "next-dev" 2>/dev/null || true
    pkill -9 -f "next-server" 2>/dev/null || true
    pkill -9 -f "next dev" 2>/dev/null || true
    pkill -9 -f "next" 2>/dev/null || true
    pkill -9 -f "nest" 2>/dev/null || true
    pkill -9 -f "hardhat" 2>/dev/null || true
    pkill -9 -f "ts-node" 2>/dev/null || true
    pkill -9 -f "backend/dist/main" 2>/dev/null || true
    
    docker compose down 2>/dev/null || true
}

do_status() {
    echo -e "${BOLD}${CYAN}📊 SYSTEM BRAIN STATUS${NC}"
    echo -e "------------------------------------------------"
    port_in_use 7000 && echo -e "🌐 Web Dashboard    : ${GREEN}ONLINE${NC}" || echo -e "🌐 Web Dashboard    : ${RED}OFFLINE${NC}"
    port_in_use 7001 && echo -e "⚙️  Backend API      : ${GREEN}ONLINE${NC}" || echo -e "⚙️  Backend API      : ${RED}OFFLINE${NC}"
    port_in_use 8545 && echo -e "⛓️  Local Chain      : ${GREEN}ONLINE${NC}" || echo -e "⛓️  Local Chain      : ${RED}OFFLINE${NC}"
    port_in_use 8081 && echo -e "📱 Metro Bundler    : ${GREEN}ONLINE${NC}" || echo -e "📱 Metro Bundler    : ${RED}OFFLINE${NC}"
    port_in_use 5434 && echo -e "🐘 Database (PG)    : ${GREEN}ONLINE${NC}" || echo -e "🐘 Database (PG)    : ${RED}OFFLINE${NC}"
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
    if ! docker compose up -d 2>/tmp/docker_error; then
        ERROR_MSG=$(cat /tmp/docker_error)
        if [[ "$ERROR_MSG" == *"iptables"* ]] || [[ "$ERROR_MSG" == *"chain"* ]] || [[ "$ERROR_MSG" == *"network"* ]]; then
            warn "Detected Docker Networking/Iptables failure. Attempting Deep Recovery..."
            docker compose down --remove-orphans || true
            systemctl restart docker || true
            sleep 2
            docker network prune -f || true
            info "Retrying Docker Services..."
            docker compose up -d
        else
            err "Docker Start Failed: $ERROR_MSG"
        fi
    fi
    
    # Step 2: Backend API
    step "2" "Launching Backend API Intelligence..."
    if [ -d "$ROOT/backend" ]; then
        cd "$ROOT/backend"
        rm -rf dist 2>/dev/null
        nohup npm run start:dev > "$ROOT/logs/backend.log" 2>&1 &
        info "Waiting for API to bind to port 7001 (Compiling...)"
        
        # Smart wait for backend
        for i in {1..30}; do
            if port_in_use 7001; then
                ok "Backend is UP!"
                break
            fi
            sleep 2
        done
    fi

    # Step 3: Web Dashboard
    cd "$ROOT"
    step "3" "Deploying Web Command Center..."
    if [ -d "$ROOT/frontend/web" ]; then
        cd "$ROOT/frontend/web"
        # Keep .next cache for instant startup and hot reloading
        nohup npm run dev > "$ROOT/logs/web.log" 2>&1 &
        info "Waiting for Dashboard to bind to port 7000..."
        # Wait for web dashboard
        for i in {1..15}; do
            if port_in_use 7000; then
                ok "Dashboard is LIVE!"
                break
            fi
            sleep 1
        done
    fi

    cd "$ROOT"
    echo -e "\n\r" # Ensure clean line

    if [ -d "$ROOT/frontend/mobile" ]; then
        step "4" "Launching Deep Tunnel Bypass (Mobile)..."
        cd "$ROOT/frontend/mobile"
        
        # Quiet cleanup
        pkill -9 -f "ngrok" >/dev/null 2>&1
        pkill -9 -f "ngrok" >/dev/null 2>&1
        sleep 1
        
        # Try Ngrok
        info "Spawning Ngrok Agent..."
        nohup ngrok http 8081 --log=stdout --authtoken "$NGROK_AUTHTOKEN" > "$ROOT/logs/ngrok.log" 2>&1 &
        
        # Get Tunnel URL (Safe extraction)
        for i in {1..10}; do
            TUNNEL_URL=$(curl -s http://localhost:4040/api/tunnels | grep -o 'https://[^"]*ngrok-free.app' | head -n 1)
            if [ ! -z "$TUNNEL_URL" ]; then break; fi
            sleep 1
        done
        
        echo -e "\r" # Fix indentation
        if [ ! -z "$TUNNEL_URL" ]; then
            ok "GLOBAL TUNNEL ACTIVE (NGROK): $TUNNEL_URL"
            do_status
            print_links
            EXPO_PACKAGER_PROXY_URL="$TUNNEL_URL" npx expo start --localhost --clear
        else
            warn "Ngrok failed. Trying LAN Mode..."
            do_status
            print_links
            npx expo start --host lan --clear
        fi
    else
        info "Mobile frontend not found."
        do_status
        print_links
        tail -f "$ROOT/logs/backend.log"
    fi
}

case "$COMMAND" in
    start)  do_start  ;;
    stop)   do_stop   ;;
    status) do_status ;;
    *) echo "Usage: $0 {start|stop|status}"; exit 1 ;;
esac
