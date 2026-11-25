#!/bin/bash
# ===============================================
# Run AI Resume Analyser (Full Stack) on macOS/Linux
# ===============================================

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
BACKEND_DIR="$ROOT_DIR/career-recommender/backend"
FRONTEND_DIR="$ROOT_DIR/frontend/career-compass-3d-main"

echo "================================================"
echo "🚀 Starting AI Resume Analyser"
echo "================================================"

# Trap SIGINT to clean up child processes on exit
cleanup() {
    echo ""
    echo "🛑 Stopping all services..."
    kill $(jobs -p) 2>/dev/null
    exit
}
trap cleanup SIGINT SIGTERM EXIT

# 1. Start Django Backend
echo "🔥 Starting Django Backend on http://127.0.0.1:8000 ..."
cd "$BACKEND_DIR"
source ../venv/bin/activate
python manage.py runserver --noreload 127.0.0.1:8000 &
BACKEND_PID=$!

# Wait for Backend to become ready
echo "⏳ Waiting for backend to be ready..."
until curl -s -X OPTIONS http://127.0.0.1:8000/api/analyze/ > /dev/null 2>&1; do
    sleep 1
done
echo "✅ Backend is live!"

# 2. Start Frontend
echo "⚡ Starting Vite Frontend on http://localhost:8080 ..."
cd "$FRONTEND_DIR"
npm run dev -- --port 8080 &
FRONTEND_PID=$!

echo "================================================"
echo "✅ Project is running!"
echo "👉 Frontend: http://localhost:8080"
echo "👉 Backend:  http://127.0.0.1:8000/api/analyze/"
echo "Press Ctrl+C to stop both servers."
echo "================================================"

wait

