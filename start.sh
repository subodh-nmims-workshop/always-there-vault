#!/bin/bash

# ========================================================
# Digital Will Protocol - Initialization Script
# Required Ports: 7000 (Frontend), 7001 (Backend)
# ========================================================

echo "🚀 Starting Digital Will Protocol Services..."

# 1. Start Backend (NestJS)
echo "📦 Checking Backend Dependencies..."
cd backend
if [ ! -d "node_modules" ]; then
    echo "Installing backend dependencies..."
    npm install
fi

echo "🟢 Starting Backend on Port 7001..."
# Uses start:dev for hot reloading
npm run start:dev &
BACKEND_PID=$!

cd ..

# 2. Start Frontend (Next.js)
echo "📦 Checking Frontend Dependencies..."
cd frontend/web
if [ ! -d "node_modules" ]; then
    echo "Installing frontend dependencies..."
    npm install
fi

echo "🟢 Starting Frontend on Port 7000..."
# Uses dev script which is configured to -p 7000
npm run dev &
FRONTEND_PID=$!

echo "========================================================"
echo "✅ Protocol Initialization Sequence Initiated!"
echo "========================================================"
echo "🌐 User Interface : http://localhost:7000"
echo "⚙️ Backend API    : http://localhost:7001"
echo "📚 API Swagger Docs: http://localhost:7001/api/docs"
echo "========================================================"
echo "Press Ctrl+C to gracefully stop all services."

# Trap Ctrl+C and kill both processes
trap "echo '🛑 Terminating protocol services...'; kill $BACKEND_PID $FRONTEND_PID; exit" SIGINT SIGTERM

# Keep script running
wait
