#!/bin/bash

# ========================================================
# Always There Protocol - Production Deployment Script
# ========================================================

set -e

RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

print_header() {
    echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
    echo -e "${BLUE}  $1${NC}"
    echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
}

print_status() {
    echo -e "${GREEN}✅ $1${NC}"
}

print_warning() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

print_error() {
    echo -e "${RED}❌ $1${NC}"
}

print_header "🚀 Always There Protocol - Production Deployment"
echo ""

# Check if .env file exists
if [ ! -f ".env" ]; then
    print_error ".env file not found!"
    echo ""
    echo "Create .env file with:"
    echo "  MONGO_PASSWORD=your_secure_password"
    echo "  JWT_SECRET=your_jwt_secret"
    echo "  STRIPE_SECRET_KEY=sk_live_..."
    echo "  STRIPE_WEBHOOK_SECRET=whsec_..."
    echo "  RESEND_API_KEY=re_..."
    echo "  NEXT_PUBLIC_API_URL=https://api.yourdomain.com"
    echo "  NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_..."
    exit 1
fi

print_status ".env file found"
echo ""

# Pull latest code
print_header "📥 Pulling Latest Code"
git pull origin main
print_status "Code updated"
echo ""

# Build Docker images
print_header "🐳 Building Docker Images"
docker-compose build --no-cache
print_status "Images built"
echo ""

# Stop existing containers
print_header "🛑 Stopping Existing Containers"
docker-compose down
print_status "Containers stopped"
echo ""

# Start new containers
print_header "🚀 Starting New Containers"
docker-compose up -d
print_status "Containers started"
echo ""

# Wait for services to be ready
print_header "⏳ Waiting for Services"
sleep 10

# Check health
print_header "🏥 Health Check"

if curl -f http://localhost:7001/health > /dev/null 2>&1; then
    print_status "Backend is healthy"
else
    print_warning "Backend health check failed"
fi

if curl -f http://localhost:7000 > /dev/null 2>&1; then
    print_status "Frontend is healthy"
else
    print_warning "Frontend health check failed"
fi

echo ""

# Show running containers
print_header "📊 Running Containers"
docker-compose ps
echo ""

# Show logs
print_header "📝 Recent Logs"
docker-compose logs --tail=20
echo ""

print_header "✨ Deployment Complete!"
echo ""
echo -e "${GREEN}🎉 Always There Protocol is now running in production!${NC}"
echo ""
echo "Services:"
echo "  Frontend: http://localhost:7000"
echo "  Backend:  http://localhost:7001"
echo "  Nginx:    http://localhost:80"
echo ""
echo "Commands:"
echo "  View logs:    docker-compose logs -f"
echo "  Stop:         docker-compose down"
echo "  Restart:      docker-compose restart"
echo "  Status:       docker-compose ps"
echo ""
