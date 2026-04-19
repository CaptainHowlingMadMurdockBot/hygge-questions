/**
 * AI Provider configurations
 * Defines endpoints, auth requirements, and default models for each supported provider
 */

const AI_PROVIDERS = {
    openai: {
        id: 'openai',
        name: 'OpenAI',
        endpoint: 'https://api.openai.com/v1/chat/completions',
        authType: 'api_key',
        requiresApiKey: true,
        defaultModel: 'gpt-4o-mini',
        headerFormat: 'Bearer',
        contentFormat: 'messages'
    },
    anthropic: {
        id: 'anthropic',
        name: 'Anthropic (Claude)',
        endpoint: 'https://api.anthropic.com/v1/messages',
        authType: 'api_key',
        requiresApiKey: true,
        defaultModel: 'claude-3-haiku-20240307',
        headerFormat: 'Api-Key',
        contentFormat: 'messages',
        extraHeaders: {
            'anthropic-version': '2023-06-01'
        }
    },
    openrouter: {
        id: 'openrouter',
        name: 'OpenRouter',
        endpoint: 'https://openrouter.ai/api/v1/chat/completions',
        authType: 'api_key',
        requiresApiKey: true,
        defaultModel: 'openai/gpt-4o-mini',
        headerFormat: 'Bearer',
        contentFormat: 'messages'
    },
    ollama: {
        id: 'ollama',
        name: 'Ollama (Local)',
        endpoint: null, // Set dynamically from settings
        authType: 'none',
        requiresApiKey: false,
        defaultModel: 'llama3.2',
        headerFormat: null,
        contentFormat: 'prompt'
    }
};

/**
 * Get provider configuration by ID
 * @param {string} providerId - The provider ID
 * @returns {object|null} Provider configuration or null if not found
 */
function getProvider(providerId) {
    return AI_PROVIDERS[providerId] || null;
}

/**
 * Get all available providers
 * @returns {array} Array of provider configurations
 */
function getAllProviders() {
    return Object.values(AI_PROVIDERS);
}

/**
 * Check if a provider requires an API key
 * @param {string} providerId - The provider ID
 * @returns {boolean} True if provider requires API key
 */
function requiresApiKey(providerId) {
    const provider = getProvider(providerId);
    return provider ? provider.requiresApiKey : false;
}

/**
 * Get the endpoint for a provider, considering custom settings
 * @param {string} providerId - The provider ID
 * @param {object} settings - User settings including custom URLs
 * @returns {string} The endpoint URL
 */
function getEndpoint(providerId, settings = {}) {
    const provider = getProvider(providerId);
    if (!provider) return null;

    if (providerId === 'ollama') {
        const url = settings.ollamaUrl || 'http://localhost:11434';
        // Ensure we have the full API endpoint
        if (!url.includes('/api/')) {
            return url + '/api/generate';
        }
        return url;
    }

    return provider.endpoint;
}