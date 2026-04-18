# AI Provider API Contracts

This document describes the interface contracts for connecting to various AI providers.

## Common Request Format

All AI providers accept a request with:
- `model`: The model to use
- `messages`: Array of message objects with `role` and `content`
- `temperature`: Creativity level (0-2, default 0.7)
- `max_tokens`: Maximum response size

## OpenAI API

**Endpoint**: `https://api.openai.com/v1/chat/completions`

**Headers**:
```
Authorization: Bearer YOUR_API_KEY
Content-Type: application/json
```

**Request**:
```json
{
  "model": "gpt-4o-mini",
  "messages": [
    {
      "role": "system",
      "content": "You generate engaging questions for conversations. Use the hygge question style: warm, reflective, open-ended."
    },
    {
      "role": "user",
      "content": "Generate 5 icebreaker questions about amateur radio for a ham radio net."
    }
  ],
  "temperature": 0.8,
  "max_tokens": 1000
}
```

**Response** (relevant fields):
```json
{
  "choices": [
    {
      "message": {
        "content": "1. What got you into amateur radio?\n2. ..."
      }
    }
  ]
}
```

## Anthropic API

**Endpoint**: `https://api.anthropic.com/v1/messages`

**Headers**:
```
x-api-key: YOUR_API_KEY
anthropic-version: 2023-06-01
Content-Type: application/json
```

**Request**:
```json
{
  "model": "claude-3-haiku-20240307",
  "max_tokens": 1000,
  "system": "You generate engaging questions for conversations. Use the hygge question style: warm, reflective, open-ended.",
  "messages": [
    {
      "role": "user",
      "content": "Generate 5 icebreaker questions about amateur radio for a ham radio net."
    }
  ]
}
```

## OpenRouter API

**Endpoint**: `https://openrouter.ai/api/v1/chat/completions`

**Headers**:
```
Authorization: Bearer YOUR_API_KEY
Content-Type: application/json
```

**Request**: Same as OpenAI format

## Ollama (Local)

**Endpoint**: `http://localhost:11434/api/generate`

**Request**:
```json
{
  "model": "llama3.2",
  "prompt": "Generate 5 icebreaker questions about amateur radio for a ham radio net.",
  "stream": false
}
```

**Response**:
```json
{
  "response": "1. What got you into amateur radio?\n2. ..."
}
```

## Prompt Template

Regardless of provider, the user message follows this pattern:

```
Generate {quantity} {style} questions about {topic} for a {context}.

Style definitions:
- icebreaker: Simple, fun, easy to answer
- deep: Thought-provoking, reflective  
- casual: Relaxed, friendly conversation starters

Use hygge question style: warm, reflective, open-ended, comfort-focused.
```