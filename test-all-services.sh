#!/bin/bash

# Quick test to verify all services are running

GREEN='\033[0;32m'
RED='\033[0;31m'
NC='\033[0m'

echo "Testing all services..."
echo ""

check_port() {
    if lsof -Pi :$1 -t >/dev/null 2>&1; then
        echo -e "${GREEN}✅ $2 (Port $1)${NC}"
        return 0
    else
        echo -e "${RED}❌ $2 (Port $1)${NC}"
        return 1
    fi
}

check_port 8545 "Blockchain"
check_port 7001 "Backend API"
check_port 7000 "Web Frontend"
check_port 8081 "Mobile App"

echo ""
echo "If all services are running, you can access:"
echo "  Web: http://localhost:7000"
echo "  Backend: http://localhost:7001"
echo "  Mobile: Scan QR code in terminal"
