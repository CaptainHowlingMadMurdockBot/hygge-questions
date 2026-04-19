#!/bin/bash
# Dev server script for Cozy Queries

PORT=${1:-8080}

echo "🚀 Starting Cozy Queries on http://localhost:$PORT"
echo ""
echo "Tips:"
echo "  - Stop server: Ctrl+C"
echo "  - Ollama should be running on http://localhost:11434"
echo ""

cd "$(dirname "$0")/.." || exit 1
python -m http.server "$PORT"