# Quick Start Guide: AI Question Generator

## Getting Started (30 seconds)

1. **Open the App**: Visit https://[username].github.io/hygge-questions

2. **Choose Your AI Provider**:
   - **OpenAI** (easiest): Get API key from https://platform.openai.com/api-key
   - **Anthropic**: Get API key from https://console.anthropic.com/
   - **OpenRouter**: Get API key from https://openrouter.ai/
   - **Ollama** (local): Install from https://ollama.ai and ensure running

3. **Enter Your API Key**: Paste it in the API key field. It stays in your browser - we never see it.

4. **Generate Questions**:
   - Enter a topic (e.g., "ham radio ice breakers", "winter cozy conversations")
   - Choose how many questions (1-50)
   - Click "Generate"

5. **Use Your Questions**: Copy the list for your ham radio net or conversation starter!

## Troubleshooting

### "API key invalid"
- Check you've copied the entire key (starts with sk- for OpenAI)
- Ensure your API key hasn't expired or been revoked

### "Connection failed"
- For Ollama: Make sure it's running (`ollama serve`)
- For cloud providers: Check your internet connection

### "No questions generated"
- Try reducing the quantity
- Make your topic more specific

## Privacy Guarantee

Your API key and questions **never leave your browser**. The app makes direct calls to AI providers - nothing is stored on any server.

## Need Help?

- View the full README: https://github.com/[username]/hygge-questions#readme
- Want to self-host? See docs/self-hosting.md