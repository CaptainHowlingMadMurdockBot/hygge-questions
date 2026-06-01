/**
 * Cozy Queries - Main Application
 * Handles UI interactions and coordinates services
 */

// DOM Elements
const elements = {
    provider: document.getElementById('provider'),
    apiKey: document.getElementById('api-key'),
    toggleApiKey: document.getElementById('toggle-api-key'),
    ollamaUrl: document.getElementById('ollama-url'),
    ollamaModel: document.getElementById('ollama-model'),
    ollamaGroup: document.querySelector('.ollama-url-group'),
    ollamaModelGroup: document.querySelector('.ollama-model-group'),
    testOllamaBtn: document.getElementById('test-ollama-btn'),
    ollamaStatus: document.getElementById('ollama-status'),
    topic: document.getElementById('topic'),
    quantity: document.getElementById('quantity'),
    generateBtn: document.getElementById('generate-btn'),
    outputSection: document.getElementById('output-section'),
    questionsList: document.getElementById('questions-list'),
    copyAllBtn: document.getElementById('copy-all-btn'),
    pastebinBtn: document.getElementById('pastebin-btn'),
    loading: document.getElementById('loading'),
    error: document.getElementById('error'),
    errorMessage: document.getElementById('error-message'),
    dismissError: document.getElementById('dismiss-error')
};

// Initialize app
function init() {
    loadSavedConfig();
    setupEventListeners();
    updateOllamaVisibility();
}

// Load saved configuration
function loadSavedConfig() {
    const config = loadConfig();

    elements.provider.value = config.selectedProvider || 'openai';
    elements.quantity.value = config.preferredQuantity || 5;

    const savedApiKey = loadApiKey();
    if (savedApiKey) {
        elements.apiKey.value = savedApiKey;
    }

    if (config.ollamaUrl) {
        elements.ollamaUrl.value = config.ollamaUrl;
    }
    if (config.ollamaModel) {
        elements.ollamaModel.value = config.ollamaModel;
    }
}

// Setup event listeners
function setupEventListeners() {
    // Provider change
    elements.provider.addEventListener('change', () => {
        updateOllamaVisibility();
        saveConfig({ ...loadConfig(), selectedProvider: elements.provider.value });
    });

    // API key toggle
    elements.toggleApiKey.addEventListener('click', () => {
        const isPassword = elements.apiKey.type === 'password';
        elements.apiKey.type = isPassword ? 'text' : 'password';
        elements.toggleApiKey.textContent = isPassword ? 'Hide' : 'Show';
    });

    // Test Ollama connection
    elements.testOllamaBtn?.addEventListener('click', async () => {
        const settings = {
            ollamaUrl: elements.ollamaUrl.value,
            ollamaModel: elements.ollamaModel.value
        };

        elements.ollamaStatus.textContent = 'Testing...';
        elements.ollamaStatus.className = 'status-text';

        try {
            const success = await testConnection('ollama', '', settings);
            if (success) {
                elements.ollamaStatus.textContent = 'Connected!';
                elements.ollamaStatus.className = 'status-text success';
            } else {
                elements.ollamaStatus.textContent = 'Connection failed';
                elements.ollamaStatus.className = 'status-text error';
            }
        } catch (e) {
            elements.ollamaStatus.textContent = 'Error: ' + e.message;
            elements.ollamaStatus.className = 'status-text error';
        }
    });

    // Generate button
    elements.generateBtn.addEventListener('click', handleGenerate);

    // Copy all button
    elements.copyAllBtn.addEventListener('click', handleCopyAll);

    // Pastebin button
    elements.pastebinBtn.addEventListener('click', handlePastebin);

    // Dismiss error
    elements.dismissError.addEventListener('click', () => {
        elements.error.style.display = 'none';
    });
}

// Update Ollama URL visibility
function updateOllamaVisibility() {
    // Only show URL field for local Ollama
    const isLocalOllama = elements.provider.value === 'ollama';
    elements.ollamaGroup.style.display = isLocalOllama ? 'block' : 'none';
    elements.ollamaModelGroup.style.display = isLocalOllama ? 'block' : 'none';

    // Auto-save API key for cloud providers (not local Ollama)
    const isCloudProvider = elements.provider.value !== 'ollama';
    if (isCloudProvider && elements.apiKey.value) {
        saveApiKey(elements.apiKey.value, true);
    }
}

// Handle question generation
async function handleGenerate() {
    const providerId = elements.provider.value;
    const apiKey = elements.apiKey.value;
    const topic = elements.topic.value.trim();
    const quantity = parseInt(elements.quantity.value) || 5;

    // Validation
    if (!topic) {
        showError('Please enter a topic for your questions.');
        return;
    }

    if (requiresApiKey(providerId) && !apiKey) {
        showError('Please enter your API key.');
        return;
    }

    // Get Ollama settings if applicable
    const settings = {};
    if (providerId === 'ollama') {
        settings.ollamaUrl = elements.ollamaUrl.value;
        settings.ollamaModel = elements.ollamaModel.value;
    }

    // Show loading
    hideError();
    elements.outputSection.style.display = 'none';
    elements.loading.style.display = 'block';
    elements.generateBtn.disabled = true;

    try {
        // Save preferences
        saveConfig({
            ...loadConfig(),
            selectedProvider: providerId,
            preferredQuantity: quantity,
            ollamaUrl: settings.ollamaUrl || loadConfig().ollamaUrl,
            ollamaModel: settings.ollamaModel || loadConfig().ollamaModel
        });
        if (apiKey && requiresApiKey(providerId)) {
            saveApiKey(apiKey, true);
        }
        saveRecentTopic(topic);

        // Generate questions
        const questions = await generateQuestions(providerId, apiKey, topic, quantity, settings);

        if (questions.length === 0) {
            showError('No questions were generated. Please try a different topic.');
            return;
        }

        // Display questions
        displayQuestions(questions);

    } catch (e) {
        console.error('Generation failed:', e);
        let message = e.message || 'Failed to generate questions. Please try again.';

        // Detect CORS errors and suggest alternatives for Ollama
        if (message.includes('NetworkError') || message.includes('Failed to fetch') || message.includes('CORS') || message.includes('Cannot connect')) {
            if (elements.provider.value === 'ollama') {
                message = 'Cannot connect to Ollama. Common causes:\n\n' +
                    '1. Ollama is not running - start it with: `ollama serve`\n' +
                    '2. CORS not enabled - Ollama blocks browser requests by default\n' +
                    '3. Wrong URL - check the Ollama URL field\n\n' +
                    'For local use, try one of these fixes:\n' +
                    '- Install a CORS proxy (e.g., "ollama-cors" npm package)\n' +
                    '- Use a browser extension to bypass CORS\n' +
                    '- Or switch to OpenAI/Anthropic for cloud AI';
            } else if (elements.provider.value === 'ollama_cloud') {
                message = 'Ollama Cloud does not support browser requests. Try local Ollama, OpenAI, Anthropic, or OpenRouter instead.';
            }
        }

        showError(message);
    } finally {
        elements.loading.style.display = 'none';
        elements.generateBtn.disabled = false;
    }
}

// Display generated questions
function displayQuestions(questions) {
    elements.questionsList.innerHTML = '';

    questions.forEach((question, index) => {
        const li = document.createElement('li');
        li.textContent = question;
        elements.questionsList.appendChild(li);
    });

    elements.outputSection.style.display = 'block';
}

// Handle copy all questions
async function handleCopyAll() {
    const questions = Array.from(elements.questionsList.querySelectorAll('li'))
        .map(li => li.textContent)
        .join('\n');

    try {
        await navigator.clipboard.writeText(questions);
        showTemporaryMessage(elements.copyAllBtn, 'Copied!');
    } catch (e) {
        showError('Failed to copy to clipboard.');
    }
}

// Handle Pastebin sharing
async function handlePastebin() {
    const questions = Array.from(elements.questionsList.querySelectorAll('li'))
        .map((li, i) => `${i + 1}. ${li.textContent}`)
        .join('\n');

    const pastebinKey = prompt('Enter your Pastebin API key (get it from https://pastebin.com/doc_api):');

    if (!pastebinKey) return;

    elements.pastebinBtn.disabled = true;
    elements.pastebinBtn.textContent = 'Sharing...';

    try {
        const formData = new URLSearchParams();
        formData.append('api_dev_key', pastebinKey);
        formData.append('api_option', 'paste');
        formData.append('api_paste_code', questions);
        formData.append('api_paste_name', 'Cozy Questions');
        formData.append('api_paste_private', '0');

        const response = await fetch('https://pastebin.com/api/api_post.php', {
            method: 'POST',
            body: formData
        });

        const text = await response.text();

        if (text.startsWith('http')) {
            await navigator.clipboard.writeText(text);
            alert(`Shared to Pastebin!\n\nURL: ${text}\n\n(URL copied to clipboard)`);
        } else {
            throw new Error(text);
        }
    } catch (e) {
        showError('Failed to share to Pastebin: ' + e.message);
    } finally {
        elements.pastebinBtn.disabled = false;
        elements.pastebinBtn.textContent = 'Share to Pastebin';
    }
}

// Show error message
function showError(message) {
    elements.errorMessage.textContent = message;
    elements.error.style.display = 'block';
}

// Hide error message
function hideError() {
    elements.error.style.display = 'none';
}

// Show temporary message on button
function showTemporaryMessage(button, message) {
    const originalText = button.textContent;
    button.textContent = message;
    setTimeout(() => {
        button.textContent = originalText;
    }, 2000);
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', init);