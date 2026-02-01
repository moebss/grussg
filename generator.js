// ===========================
// GRUSSGENERATOR - Main Script
// ===========================

// --- Configuration ---
const API_ENDPOINT = '/api/generate-greeting';
const HISTORY_KEY = 'grussgenerator_history';
const MAX_HISTORY = 5;

// --- State ---
let currentLanguage = 'de';
let currentOccasion = 'birthday';

// --- DOM Elements ---
const greetingForm = document.getElementById('greetingForm');
const generateBtn = document.getElementById('generateBtn');
const inputSection = document.getElementById('inputSection');
const outputSection = document.getElementById('outputSection');
const generatedMessage = document.getElementById('generatedMessage');
const historyToggle = document.getElementById('historyToggle');
const historyContent = document.getElementById('historyContent');
const historyList = document.getElementById('historyList');
const historyBadge = document.getElementById('historyBadge');

// ===========================
// TOAST NOTIFICATIONS
// ===========================
function showToast(message, type = 'info') {
    const container = document.getElementById('toastContainer');
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.textContent = message;
    container.appendChild(toast);

    setTimeout(() => {
        toast.style.opacity = '0';
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

// ===========================
// OCCASION SELECTION
// ===========================
document.querySelectorAll('.occasion-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelectorAll('.occasion-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        currentOccasion = btn.dataset.occasion;
    });
});

// ===========================
// LANGUAGE SWITCHING
// ===========================
document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelectorAll('.lang-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        currentLanguage = btn.dataset.lang;
        updateUILanguage();
    });
});

function updateUILanguage() {
    // This will be enhanced with full i18n later
    console.log('Language switched to:', currentLanguage);
}

// ===========================
// FORM SUBMISSION / GENERATE
// ===========================
greetingForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const name = document.getElementById('recipientName').value.trim();
    const relation = document.getElementById('relationship').value;
    const info = document.getElementById('additionalInfo').value.trim();
    const tone = document.getElementById('tone').value;

    if (!name || !relation) {
        showToast('Bitte fülle alle Pflichtfelder aus.', 'error');
        return;
    }

    // Loading state
    generateBtn.disabled = true;
    generateBtn.querySelector('.btn-text').classList.add('hidden');
    generateBtn.querySelector('.btn-loading').classList.remove('hidden');

    try {
        const response = await fetch(API_ENDPOINT, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                name,
                relation,
                info,
                tone,
                lang: currentLanguage,
                occasion: currentOccasion
            })
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error || 'API-Fehler');
        }

        // Display result
        generatedMessage.textContent = data.text;
        inputSection.classList.add('hidden');
        outputSection.classList.remove('hidden');

        // Save to history
        saveToHistory({
            text: data.text,
            name,
            occasion: currentOccasion,
            lang: currentLanguage,
            date: new Date().toISOString()
        });

        showToast('Gruß erfolgreich generiert! 🎉', 'success');

    } catch (err) {
        console.error('Generation error:', err);
        showToast(`Fehler: ${err.message}`, 'error');
    } finally {
        generateBtn.disabled = false;
        generateBtn.querySelector('.btn-text').classList.remove('hidden');
        generateBtn.querySelector('.btn-loading').classList.add('hidden');
    }
});

// ===========================
// HISTORY FUNCTIONS
// ===========================
function loadHistory() {
    const history = JSON.parse(localStorage.getItem(HISTORY_KEY) || '[]');
    renderHistory(history);
    return history;
}

function saveToHistory(entry) {
    let history = JSON.parse(localStorage.getItem(HISTORY_KEY) || '[]');
    history.unshift(entry);
    if (history.length > MAX_HISTORY) {
        history = history.slice(0, MAX_HISTORY);
    }
    localStorage.setItem(HISTORY_KEY, JSON.stringify(history));
    renderHistory(history);
}

function renderHistory(history) {
    historyBadge.textContent = history.length;

    if (history.length === 0) {
        historyList.innerHTML = '<p class="empty-history">Noch keine Grüße erstellt.</p>';
        return;
    }

    const occasionNames = {
        birthday: '🎂 Geburtstag',
        wedding: '💍 Hochzeit',
        christmas: '🎄 Weihnachten',
        newyear: '🎆 Neujahr',
        easter: '🐰 Ostern',
        thanks: '💐 Danke',
        baby: '👶 Geburt',
        getwell: '🏥 Gute Besserung',
        mothersday: '👩 Muttertag',
        fathersday: '👨 Vatertag',
        graduation: '🎓 Abschluss',
        anniversary: '🥂 Jubiläum',
        general: '💌 Sonstiges'
    };

    historyList.innerHTML = history.map((item, index) => `
        <div class="history-item" data-index="${index}">
            <div class="history-item-header">
                <span class="history-item-occasion">${occasionNames[item.occasion] || item.occasion}</span>
                <span class="history-item-date">${new Date(item.date).toLocaleDateString('de-DE')}</span>
            </div>
            <div class="history-item-preview">${item.text.substring(0, 60)}...</div>
        </div>
    `).join('');

    // Add click handlers
    historyList.querySelectorAll('.history-item').forEach(item => {
        item.addEventListener('click', () => {
            const index = parseInt(item.dataset.index);
            const entry = history[index];
            generatedMessage.textContent = entry.text;
            inputSection.classList.add('hidden');
            outputSection.classList.remove('hidden');
        });
    });
}

// History toggle
historyToggle.addEventListener('click', () => {
    historyToggle.classList.toggle('open');
    historyContent.classList.toggle('hidden');
});

// ===========================
// OUTPUT ACTIONS
// ===========================

// Copy to clipboard
document.getElementById('copyBtn').addEventListener('click', () => {
    navigator.clipboard.writeText(generatedMessage.textContent)
        .then(() => showToast('Text kopiert! 📋', 'success'))
        .catch(() => showToast('Kopieren fehlgeschlagen', 'error'));
});

// WhatsApp share
document.getElementById('whatsappBtn').addEventListener('click', () => {
    const text = encodeURIComponent(generatedMessage.textContent);
    window.open(`https://wa.me/?text=${text}`, '_blank');
});

// Email share
document.getElementById('emailBtn').addEventListener('click', () => {
    const subject = encodeURIComponent('Ein persönlicher Gruß für dich');
    const body = encodeURIComponent(generatedMessage.textContent);
    window.location.href = `mailto:?subject=${subject}&body=${body}`;
});

// Download as image
document.getElementById('downloadBtn').addEventListener('click', async () => {
    const canvas = await html2canvas(document.querySelector('.message-display'), {
        backgroundColor: '#1a1a2e',
        scale: 2
    });

    const link = document.createElement('a');
    link.download = 'gruss.png';
    link.href = canvas.toDataURL('image/png');
    link.click();
    showToast('Bild heruntergeladen! 📸', 'success');
});

// Text-to-Speech
document.getElementById('ttsBtn').addEventListener('click', () => {
    if ('speechSynthesis' in window) {
        const utterance = new SpeechSynthesisUtterance(generatedMessage.textContent);
        utterance.lang = currentLanguage === 'de' ? 'de-DE' :
            currentLanguage === 'en' ? 'en-US' :
                currentLanguage === 'es' ? 'es-ES' :
                    currentLanguage === 'fr' ? 'fr-FR' :
                        currentLanguage === 'tr' ? 'tr-TR' :
                            currentLanguage === 'it' ? 'it-IT' : 'de-DE';
        speechSynthesis.speak(utterance);
        showToast('Wird vorgelesen... 🔊', 'info');
    } else {
        showToast('Vorlesen nicht unterstützt', 'error');
    }
});

// New greeting button
document.getElementById('newGreetingBtn').addEventListener('click', () => {
    outputSection.classList.add('hidden');
    inputSection.classList.remove('hidden');
    greetingForm.reset();
    // Reset to first occasion
    document.querySelectorAll('.occasion-btn').forEach(b => b.classList.remove('active'));
    document.querySelector('.occasion-btn[data-occasion="birthday"]').classList.add('active');
    currentOccasion = 'birthday';
});

// ===========================
// INIT
// ===========================
document.addEventListener('DOMContentLoaded', () => {
    loadHistory();
});
