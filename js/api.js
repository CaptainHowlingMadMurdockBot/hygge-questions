/**
 * AI API service
 * Handles communication with various AI providers
 */

/**
 * Generate questions using the specified provider
 * @param {string} providerId - The AI provider ID
 * @param {string} apiKey - The API key
 * @param {string} topic - The topic/context for questions
 * @param {number} quantity - Number of questions to generate
 * @param {object} settings - Additional settings (e.g., ollamaUrl)
 * @returns {Promise<string[]>} Array of generated questions
 */
async function generateQuestions(providerId, apiKey, topic, quantity, settings = {}) {
    const provider = getProvider(providerId);
    if (!provider) {
        throw new Error('Unknown provider: ' + providerId);
    }

    const endpoint = getEndpoint(providerId, settings);
    const prompt = buildPrompt(topic, quantity);

    if (providerId === 'ollama') {
        const model = settings.ollamaModel || provider.defaultModel;
        return generateWithOllama(endpoint, prompt, model);
    }

    return generateWithChatAPI(provider, endpoint, apiKey, prompt, quantity);
}

/**
 * Build the prompt for question generation
 * @param {string} topic - The topic/context
 * @param {number} quantity - Number of questions
 * @returns {string} The formatted prompt
 */
function buildPrompt(topic, quantity) {
    return `Generate exactly ${quantity} icebreaker questions for a conversation about "${topic}".

Use the "cozy query" style:
- Warm, reflective, and open-ended
- Comfort-focused, like a cozy conversation by the fire
- Easy to answer but spark meaningful discussion
- No technical jargon

Format: One question per line, numbered 1-${quantity}.
Examples of cozy query style:
- "What smell reminds you of home?"
- "What's your favorite way to unwind after a long day?"
- "What small everyday moment brings you joy?"

Generate exactly ${quantity} questions:`;
}

/**
 * Generate questions using Chat API format (OpenAI, OpenRouter)
 * @param {object} provider - Provider configuration
 * @param {string} endpoint - API endpoint
 * @param {string} apiKey - API key
 * @param {string} prompt - The prompt
 * @param {number} quantity - Expected number of questions
 * @returns {Promise<string[]>} Array of questions
 */
async function generateWithChatAPI(provider, endpoint, apiKey, prompt, quantity) {
    const headers = {
        'Content-Type': 'application/json'
    };

    // Set auth header based on provider format
    if (provider.headerFormat === 'Bearer') {
        headers['Authorization'] = `Bearer ${apiKey}`;
    } else if (provider.headerFormat === 'Api-Key') {
        headers['x-api-key'] = apiKey;
    }

    // Add extra headers for providers that need them
    if (provider.extraHeaders) {
        Object.assign(headers, provider.extraHeaders);
    }

    const body = {
        model: provider.defaultModel,
        messages: [
            {
                role: 'system',
                content: 'You generate cozy, warm questions for conversations. Each question should be reflective, open-ended, and comfort-focused.'
            },
            {
                role: 'user',
                content: prompt
            }
        ],
        temperature: 0.8,
        max_tokens: 1500
    };

    const response = await fetch(endpoint, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(body)
    });

    if (!response.ok) {
        const error = await response.json().catch(() => ({}));
        throw new Error(error.error?.message || `API error: ${response.status}`);
    }

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content || '';

    return parseQuestions(content, quantity);
}

/**
 * Generate questions using Ollama (local)
 * @param {string} endpoint - Ollama endpoint
 * @param {string} prompt - The prompt
 * @param {string} model - Model name
 * @returns {Promise<string[]>} Array of questions
 */
async function generateWithOllama(endpoint, prompt, model) {
    // Extract quantity from prompt for proper parsing
    const quantityMatch = prompt.match(/exactly (\d+) questions/);
    const quantity = quantityMatch ? parseInt(quantityMatch[1]) : 5;

    // Use chat API format (modern Ollama)
    const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            model: model,
            messages: [
                {
                    role: 'system',
                    content: 'You generate cozy, warm questions for conversations. Each question should be reflective, open-ended, and comfort-focused. Format your response as a numbered list with exactly ' + quantity + ' questions, one per line, with no additional text.'
                },
                {
                    role: 'user',
                    content: prompt
                }
            ],
            stream: false,
            options: {
                temperature: 0.8,
                num_predict: 1500
            }
        })
    });

    if (!response.ok) {
        if (response.status === 0 || response.type === 'opaque' || response.type === 'error') {
            throw new Error('Cannot connect to Ollama. Make sure Ollama is running: `ollama serve`');
        }
        const errorText = await response.text();
        throw new Error(`Ollama error (${response.status}): ${errorText}`);
    }

    const data = await response.json();
    const content = data.message?.content || data.response || '';

    return parseQuestions(content, quantity);
}

/**
 * Parse questions from AI response
 * @param {string} content - Raw AI response
 * @param {number} expectedCount - Expected number of questions
 * @returns {string[]} Array of questions
 */
function parseQuestions(content, expectedCount) {
    const lines = content.split('\n').filter(line => line.trim());

    const questions = [];
    for (const line of lines) {
        // Remove numbering prefixes like "1.", "1)", "-", etc.
        const cleaned = line.replace(/^(\d+[\)\. \-]+|\- +)/, '').trim();
        if (cleaned && cleaned.length > 10) {
            questions.push(cleaned);
        }
    }

    // If we didn't get enough, try harder parsing
    if (questions.length < expectedCount && questions.length > 0) {
        // Split by any line that looks like a question
        const allText = lines.join(' ');
        const matches = allText.split(/(?:\d+[\)\. \-]+|\- +)/).filter(t => t.trim().length > 10);
        if (matches.length > questions.length) {
            return matches.slice(0, expectedCount);
        }
    }

    return questions.slice(0, expectedCount);
}

/**
 * Test connection to a provider
 * @param {string} providerId - Provider ID
 * @param {string} apiKey - API key
 * @param {object} settings - Additional settings
 * @returns {Promise<boolean>} True if connection successful
 */
async function testConnection(providerId, apiKey, settings = {}) {
    try {
        // For Ollama, try a simple chat request
        if (providerId === 'ollama') {
            const url = (settings.ollamaUrl || 'http://localhost:11434').replace(/\/+$/, '');
            const model = settings.ollamaModel || 'llama3.2:1b';

            const response = await fetch(url + '/api/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    model: model,
                    messages: [{ role: 'user', content: 'Hi' }],
                    stream: false
                })
            });
            return response.ok;
        }

        // For others, make a minimal request
        const provider = getProvider(providerId);
        const endpoint = getEndpoint(providerId, settings);

        const headers = {
            'Content-Type': 'application/json'
        };

        if (provider.headerFormat === 'Bearer') {
            headers['Authorization'] = `Bearer ${apiKey}`;
        } else if (provider.headerFormat === 'Api-Key') {
            headers['x-api-key'] = apiKey;
        }

        if (provider.extraHeaders) {
            Object.assign(headers, provider.extraHeaders);
        }

        const body = {
            model: provider.defaultModel,
            messages: [{ role: 'user', content: 'Hi' }],
            max_tokens: 1
        };

        const response = await fetch(endpoint, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(body)
        });

        return response.ok;
    } catch (e) {
        console.error('Connection test failed:', e);
        return false;
    }
}