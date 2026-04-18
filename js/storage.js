/**
 * Storage service for persisting user configuration
 * Uses browser localStorage to save API keys and preferences
 */

const STORAGE_KEYS = {
    CONFIG: 'cozy-queries-config',
    API_KEY: 'cozy-queries-api-key',
    TEMP_KEY: 'cozy-queries-temp-key'
};

/**
 * Save configuration to localStorage
 * @param {object} config - Configuration object to save
 */
function saveConfig(config) {
    try {
        localStorage.setItem(STORAGE_KEYS.CONFIG, JSON.stringify(config));
    } catch (e) {
        console.error('Failed to save config:', e);
    }
}

/**
 * Load configuration from localStorage
 * @returns {object} Configuration object
 */
function loadConfig() {
    try {
        const stored = localStorage.getItem(STORAGE_KEYS.CONFIG);
        return stored ? JSON.parse(stored) : getDefaultConfig();
    } catch (e) {
        console.error('Failed to load config:', e);
        return getDefaultConfig();
    }
}

/**
 * Get default configuration
 * @returns {object} Default config values
 */
function getDefaultConfig() {
    return {
        selectedProvider: 'openai',
        preferredQuantity: 5,
        savedTopics: [],
        ollamaUrl: 'http://localhost:11434'
    };
}

/**
 * Save API key to localStorage
 * @param {string} apiKey - The API key to save
 * @param {boolean} permanent - Whether to save permanently (true) or for session only (false)
 */
function saveApiKey(apiKey, permanent = true) {
    try {
        const key = permanent ? STORAGE_KEYS.API_KEY : STORAGE_KEYS.TEMP_KEY;
        localStorage.setItem(key, apiKey);
    } catch (e) {
        console.error('Failed to save API key:', e);
    }
}

/**
 * Load API key from localStorage
 * @returns {string|null} The stored API key or null
 */
function loadApiKey() {
    try {
        // Try permanent storage first
        let key = localStorage.getItem(STORAGE_KEYS.API_KEY);
        if (!key) {
            // Fall back to session-only storage
            key = localStorage.getItem(STORAGE_KEYS.TEMP_KEY);
        }
        return key;
    } catch (e) {
        console.error('Failed to load API key:', e);
        return null;
    }
}

/**
 * Clear API key from localStorage
 * @param {boolean} permanent - Whether to clear permanent storage (true) or session only (false)
 */
function clearApiKey(permanent = true) {
    try {
        const key = permanent ? STORAGE_KEYS.API_KEY : STORAGE_KEYS.TEMP_KEY;
        localStorage.removeItem(key);
    } catch (e) {
        console.error('Failed to clear API key:', e);
    }
}

/**
 * Save a topic to recent topics
 * @param {string} topic - The topic to save
 */
function saveRecentTopic(topic) {
    const config = loadConfig();
    if (!config.savedTopics) {
        config.savedTopics = [];
    }
    // Add to beginning, remove duplicates, keep max 10
    config.savedTopics = [topic, ...config.savedTopics.filter(t => t !== topic)].slice(0, 10);
    saveConfig(config);
}

/**
 * Get recent topics
 * @returns {array} Array of recent topics
 */
function getRecentTopics() {
    const config = loadConfig();
    return config.savedTopics || [];
}

/**
 * Clear all stored data
 */
function clearAll() {
    try {
        localStorage.removeItem(STORAGE_KEYS.CONFIG);
        localStorage.removeItem(STORAGE_KEYS.API_KEY);
        localStorage.removeItem(STORAGE_KEYS.TEMP_KEY);
    } catch (e) {
        console.error('Failed to clear storage:', e);
    }
}