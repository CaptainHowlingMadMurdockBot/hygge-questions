# Self-Hosting Cozy Queries

Want to run Cozy Queries on your own server? Here's how.

## Option 1: Python Simple Server (Easiest)

If you have Python installed:

```bash
# Navigate to the project directory
cd cozy-queries

# Start a simple HTTP server
python -m http.server 8000
```

Then open http://localhost:8000 in your browser.

## Option 2: Node.js (http-server)

If you have Node.js:

```bash
# Install http-server globally
npm install -g http-server

# Navigate to the project directory
cd cozy-queries

# Start the server
http-server -p 8000
```

## Option 3: Ollama + Local Running

To use Ollama locally:

1. Install Ollama: https://ollama.ai
2. Start Ollama: `ollama serve`
3. In the app, select "Ollama (Local)" as your provider
4. Generate questions without any API key!

## Option 4: Docker

Create a Dockerfile:

```dockerfile
FROM nginx:alpine
COPY . /usr/share/nginx/html/
EXPOSE 80
```

Build and run:

```bash
docker build -t cozy-queries .
docker run -p 8080:80 cozy-queries
```

Then open http://localhost:8080

## Troubleshooting

### "Cannot connect to server"
- Make sure no other service is using the same port
- Try a different port: `python -m http.server 8080`

### Ollama not connecting
- Ensure Ollama is running: `ollama serve`
- Check the URL in the settings (default: http://localhost:11434)

### API key not saving
- Check browser localStorage isn't full
- Try a different browser