# Data Model: AI Question Generator

## Entities

### AIProvider
Represents a configured AI service provider.

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| id | string | Yes | Unique identifier (e.g., "openai", "ollama") |
| name | string | Yes | Display name (e.g., "OpenAI", "Ollama") |
| endpoint | string | Yes | API endpoint URL |
| authType | enum | Yes | "api_key" or "none" (for Ollama local) |
| defaultModel | string | No | Default model to use |
| requiresApiKey | boolean | Yes | Whether this provider needs an API key |

**Supported Providers**:
- OpenAI: endpoint=https://api.openai.com/v1/chat/completions, requiresApiKey=true
- Anthropic: endpoint=https://api.anthropic.com/v1/messages, requiresApiKey=true
- OpenRouter: endpoint=https://openrouter.ai/api/v1/chat/completions, requiresApiKey=true
- Ollama: endpoint=http://localhost:11434/api/generate, requiresApiKey=false

### UserConfig
User preferences stored in browser localStorage.

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| selectedProvider | string | Yes | ID of selected AI provider |
| apiKey | string | No | Encrypted API key (stored locally only) |
| preferredQuantity | number | No | Default number of questions (1-50) |
| savedTopics | string[] | No | User's saved topic presets |

### QuestionRequest
Input from user to generate questions.

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| topic | string | Yes | Topic or context for questions |
| quantity | number | Yes | Number of questions to generate (1-50) |
| style | enum | No | "icebreaker" (default), "deep", "casual" |

### GeneratedQuestion
Output question from AI.

| Field | Type | Description |
|-------|------|-------------|
| text | string | The question text |
| index | number | Position in list (1-based) |
| metadata | object | Optional: category, tone, source |

## Data Flow

1. User enters topic and quantity in UI
2. App retrieves API key from localStorage (or user enters new one)
3. App constructs prompt using hygge question style
4. App calls AI provider directly from browser
5. AI returns generated questions
6. App displays questions in copyable format
7. User can optionally post to Pastebin

## Storage

- **localStorage**: API keys and user preferences (key: "hygge-ai-config")
- **Session**: Temporary API key during session (key: "hygge-api-key-temp")

## Security

- API keys are stored in browser localStorage only
- No server-side storage of keys
- Keys are never transmitted to any server except directly to AI providers
- Clear privacy message displayed to users

## Validation Rules

- Topic: Required, 1-500 characters
- Quantity: Required, integer 1-50
- API Key: Required for cloud providers, format validated per provider