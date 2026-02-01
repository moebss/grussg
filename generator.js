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
// ANIMATED BACKGROUND
// ===========================
function initBackground() {
    const canvas = document.getElementById('bgCanvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let particles = [];
    let animationId;

    function resize() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    function createParticles() {
        particles = [];
        const count = Math.floor((canvas.width * canvas.height) / 15000);

        for (let i = 0; i < count; i++) {
            particles.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                radius: Math.random() * 2 + 0.5,
                vx: (Math.random() - 0.5) * 0.3,
                vy: (Math.random() - 0.5) * 0.3,
                alpha: Math.random() * 0.5 + 0.2,
                color: Math.random() > 0.5 ? '#6366f1' : '#f472b6'
            });
        }
    }

    function drawParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Draw gradient background
        const gradient = ctx.createRadialGradient(
            canvas.width / 2, 0, 0,
            canvas.width / 2, canvas.height, canvas.height
        );
        gradient.addColorStop(0, 'rgba(99, 102, 241, 0.08)');
        gradient.addColorStop(0.5, 'rgba(10, 10, 18, 0)');
        gradient.addColorStop(1, 'rgba(244, 114, 182, 0.05)');
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Draw particles
        particles.forEach(p => {
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
            ctx.fillStyle = p.color.replace(')', `, ${p.alpha})`).replace('rgb', 'rgba');
            ctx.fill();

            // Update position
            p.x += p.vx;
            p.y += p.vy;

            // Wrap around edges
            if (p.x < 0) p.x = canvas.width;
            if (p.x > canvas.width) p.x = 0;
            if (p.y < 0) p.y = canvas.height;
            if (p.y > canvas.height) p.y = 0;
        });

        // Draw connections
        particles.forEach((p1, i) => {
            particles.slice(i + 1).forEach(p2 => {
                const dx = p1.x - p2.x;
                const dy = p1.y - p2.y;
                const dist = Math.sqrt(dx * dx + dy * dy);

                if (dist < 100) {
                    ctx.beginPath();
                    ctx.moveTo(p1.x, p1.y);
                    ctx.lineTo(p2.x, p2.y);
                    ctx.strokeStyle = `rgba(99, 102, 241, ${0.1 * (1 - dist / 100)})`;
                    ctx.lineWidth = 0.5;
                    ctx.stroke();
                }
            });
        });

        animationId = requestAnimationFrame(drawParticles);
    }

    window.addEventListener('resize', () => {
        resize();
        createParticles();
    });

    resize();
    createParticles();
    drawParticles();
}

// ===========================
// CONFETTI CELEBRATION
// ===========================
function launchConfetti() {
    if (typeof confetti === 'undefined') return;

    // First burst
    confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#6366f1', '#f472b6', '#fbbf24', '#22c55e']
    });

    // Side cannons
    setTimeout(() => {
        confetti({
            particleCount: 50,
            angle: 60,
            spread: 55,
            origin: { x: 0 },
            colors: ['#6366f1', '#f472b6']
        });
        confetti({
            particleCount: 50,
            angle: 120,
            spread: 55,
            origin: { x: 1 },
            colors: ['#6366f1', '#f472b6']
        });
    }, 200);
}

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
        toast.style.transform = 'translateY(20px)';
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
        if (typeof applyTranslations === 'function') {
            applyTranslations(currentLanguage);
        }
    });
});

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

        showToast('Gruß erfolgreich generiert!', 'success');

        // Launch confetti celebration!
        launchConfetti();

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
        .then(() => showToast('Text kopiert!', 'success'))
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
    showToast('Bild heruntergeladen!', 'success');
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
        showToast('Wird vorgelesen...', 'info');
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
    initBackground();
    loadHistory();

    // Apply initial language
    if (typeof applyTranslations === 'function') {
        applyTranslations(currentLanguage);
    }
});
