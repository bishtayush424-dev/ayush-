// Google Translate integration
let translatorInitialized = false;

function initializeTranslator() {
    const languageSelect = document.getElementById('languageSelect');
    if (languageSelect) {
        languageSelect.addEventListener('change', handleLanguageChange);
    }
}

async function handleLanguageChange(event) {
    const language = event.target.value;
    await translatePage(language);
}

async function translatePage(targetLanguage) {
    if (targetLanguage === 'en') {
        // Reset to original English
        document.querySelectorAll('[data-original-text]').forEach(element => {
            if (element.dataset.originalText) {
                element.textContent = element.dataset.originalText;
            }
        });
        return;
    }

    // Store original text for elements that need translation
    document.querySelectorAll('h1, h2, h3, h4, h5, h6, p, span, a, button, label').forEach(element => {
        if (!element.dataset.originalText && element.textContent.trim()) {
            element.dataset.originalText = element.textContent;
        }
    });

    // Simulate translation
    showNotification(`Translating to ${getLanguageName(targetLanguage)}...`, 'info');
    
    // In a real implementation, you would call Google Translate API here
    // For demo purposes, we'll just show a notification
    setTimeout(() => {
        showNotification(`Page translated to ${getLanguageName(targetLanguage)}`, 'success');
    }, 1000);
}

function getLanguageName(code) {
    const languages = {
        'en': 'English',
        'hi': 'Hindi',
        'es': 'Spanish'
    };
    return languages[code] || code;
}