#!/bin/bash

# Define colors for terminal output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${BLUE}====================================================${NC}"
echo -e "${GREEN}   Starting Decentralized Digital Will Protocol   ${NC}"
echo -e "${BLUE}====================================================${NC}"

# 1. Dependency checks
if ! command -v node &> /dev/null; then
    echo -e "${RED}Error: Node.js is not installed. Please install Node.js.${NC}"
    exit 1
fi

if ! command -v npm &> /dev/null; then
    echo -e "${RED}Error: npm is not installed. Please install npm.${NC}"
    exit 1
fi

echo -e "${YELLOW}Checking environment setups...${NC}"

# Start Backend
echo -e "\n${GREEN}[1/2] Starting Backend API (Port 7001)...${NC}"
cd backend || exit
if [ ! -d "node_modules" ]; then
    echo -e "${YELLOW}Installing backend dependencies...${NC}"
    npm install
fi
# Starting backend in background
npm run start:dev &
BACKEND_PID=$!
cd ..

# Start Frontend
echo -e "\n${GREEN}[2/2] Starting Web Frontend (Port 7000)...${NC}"
cd frontend/web || exit
if [ ! -d "node_modules" ]; then
    echo -e "${YELLOW}Installing frontend dependencies...${NC}"
    npm install
fi
# Starting frontend in background
npm run dev &
FRONTEND_PID=$!
cd ../..

echo -e "\n${BLUE}====================================================${NC}"
echo -e "${GREEN}🚀 All services are booting up!${NC}"
echo -e "Wait a few seconds for compilation to finish."
echo -e ""
echo -e "🌐 Frontend App: ${YELLOW}http://localhost:7000${NC}"
echo -e "⚙️  Backend API:  ${YELLOW}http://localhost:7001${NC}"
echo -e "📚 Swagger Docs: ${YELLOW}http://localhost:7001/api/docs${NC}"
echo -e ""
echo -e "${RED}Press Ctrl+C to gracefully stop all services.${NC}"
echo -e "${BLUE}====================================================${NC}"

# Process termination handler
cleanup() {
    echo -e "\n${YELLOW}Stopping processes...${NC}"
    kill $BACKEND_PID 2>/dev/null
    kill $FRONTEND_PID 2>/dev/null
    echo -e "${GREEN}All services stopped successfully. Goodbye!${NC}"
    exit 0
}

# Trap Ctrl+C (SIGINT) and SIGTERM
trap cleanup INT TERM

# Wait for background processes to keep script running
wait
