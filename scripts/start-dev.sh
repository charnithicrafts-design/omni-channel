#!/bin/bash

# --- CONFIGURATION ---
BACKEND_PORT=8000
FRONTEND_PORT=5173
OLLAMA_PORT=11434

# --- COLORS ---
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

echo -e "${BLUE}🚀 Starting Omni-Channel Development Environment...${NC}"

# --- 1. PRE-FLIGHT CHECKS ---
echo -e "${BLUE}🔍 Checking environment...${NC}"

if ! command -v docker &> /dev/null; then
    echo -e "${RED}❌ Docker not found. Please install Docker.${NC}"
    exit 1
fi

if ! command -v python &> /dev/null; then
    echo -e "${RED}❌ Python not found. Please install Python 3.12+.${NC}"
    exit 1
fi

if ! command -v npm &> /dev/null; then
    echo -e "${RED}❌ npm not found. Please install Node.js.${NC}"
    exit 1
fi

# --- 2. SETUP DEPENDENCIES ---
# Backend
if ! pip show fastapi &> /dev/null; then
    echo -e "${YELLOW}📦 Installing backend dependencies...${NC}"
    pip install -e . --quiet
fi

# Frontend
if [ ! -d "frontend/node_modules" ]; then
    echo -e "${YELLOW}📦 Installing frontend dependencies (this may take a minute)...${NC}"
    cd frontend && npm install --silent && cd ..
fi

# --- 3. START DOCKER SERVICES ---
echo -e "${BLUE}🐳 Starting Docker dependencies (Ollama)...${NC}"
docker-compose up -d ollama --quiet-pull &> /dev/null

# --- CLEANUP OLD PROCESSES ---
echo -e "${BLUE}🧹 Cleaning up old processes...${NC}"
fuser -k $BACKEND_PORT/tcp &>/dev/null
fuser -k $FRONTEND_PORT/tcp &>/dev/null

# --- 4. START BACKEND ---
echo -e "${BLUE}🐍 Starting Backend (FastAPI)...${NC}"
# Use setsid and nohup to ensure it stays up after script exit
setsid nohup uvicorn app.main:app --host 0.0.0.0 --port $BACKEND_PORT --reload > backend.log 2>&1 &
BACKEND_PID=$!
disown $BACKEND_PID

# --- 5. START FRONTEND ---
echo -e "${BLUE}⚛️  Starting Frontend (Vite)...${NC}"
cd frontend
# Use npx for a more robust execution
setsid nohup npx vite --host 0.0.0.0 --port $FRONTEND_PORT > ../frontend.log 2>&1 &
FRONTEND_PID=$!
disown $FRONTEND_PID
cd ..

# --- 6. WAIT FOR READINESS ---
echo -e "${YELLOW}⏳ Waiting for services to be ready...${NC}"

# Function to check port readiness
check_port() {
    local port=$1
    local name=$2
    for i in {1..30}; do
        if lsof -Pi :$port -sTCP:LISTEN -t >/dev/null ; then
            echo -e "${GREEN}✅ $name is ready on port $port!${NC}"
            return 0
        fi
        sleep 1
    done
    echo -e "${RED}❌ $name failed to start on port $port.${NC}"
    return 1
}

check_port $BACKEND_PORT "Backend"
check_port $FRONTEND_PORT "Frontend"

echo -e "\n${GREEN}✨ SUCCESS! Omni-Channel is running.${NC}"
echo -e "${BLUE}🔗 Backend:  http://localhost:$BACKEND_PORT${NC}"
echo -e "${BLUE}🔗 Frontend: http://localhost:$FRONTEND_PORT${NC}"
echo -e "${YELLOW}📝 Logs:     tail -f backend.log frontend.log${NC}"
echo -e "${YELLOW}🛑 Stop:     kill $BACKEND_PID $FRONTEND_PID && docker-compose down${NC}"
