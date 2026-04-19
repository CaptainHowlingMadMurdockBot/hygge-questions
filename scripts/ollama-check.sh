#!/bin/bash
# Check if Ollama is running, start if not

if curl -s http://localhost:11434/api/tags > /dev/null 2>&1; then
    echo "✅ Ollama is running"
    echo ""
    echo "Available models:"
    curl -s http://localhost:11434/api/tags | python3 -c "import sys,json; m=json.load(sys.stdin)['models']; [print(f'  - {x[\"name\"]}') for x in m]"
else
    echo "❌ Ollama is not running"
    echo ""
    echo "Start it with: ollama serve"
fi