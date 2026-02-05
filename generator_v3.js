// ===========================
// GRUSSGENERATOR - VIRAL MODE 🚀
// ===========================

// --- Configuration ---
const API_ENDPOINT = '/api/generate-greeting';
const HISTORY_KEY = 'grussgenerator_history';
const MAX_HISTORY = 5;
const STATS_KEY = 'grussgenerator_stats';

// --- State ---
let currentLanguage = 'de';
let currentOccasion = 'birthday';
let currentCardTheme = 'gradient';
let soundEnabled = true;
let totalGreetings = 12847; // Starting number for social proof

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
const greetingCard = document.getElementById('greetingCard');

// --- Audio ---
const clickSound = document.getElementById('clickSound');
const successSound = document.getElementById('successSound');

// ===========================
// SOUND EFFECTS
// ===========================
function playSound(sound) {
    if (!soundEnabled || !sound) return;
    sound.currentTime = 0;
    sound.volume = 0.3;
    sound.play().catch(() => { });
}

// Sound Toggle
document.getElementById('soundToggle')?.addEventListener('click', () => {
    soundEnabled = !soundEnabled;
    const btn = document.getElementById('soundToggle');
    btn.textContent = soundEnabled ? '🔊' : '🔇';
    playSound(clickSound);
    showToast(soundEnabled ? 'Sound aktiviert 🔊' : 'Sound deaktiviert 🔇', 'info');
});

// ===========================
// BACK TO GENERATOR BUTTON
// ===========================
document.getElementById('backToGenerator')?.addEventListener('click', () => {
    outputSection?.classList.add('hidden');
    inputSection?.classList.remove('hidden');
    playSound(clickSound);
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ===========================
// ANIMATED BACKGROUND
// ===========================
function initBackground() {
    const canvas = document.getElementById('bgCanvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let particles = [];

    function resize() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    function createParticles() {
        particles = [];
        const count = Math.floor((canvas.width * canvas.height) / 20000);

        for (let i = 0; i < count; i++) {
            particles.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                radius: Math.random() * 2.5 + 0.5,
                vx: (Math.random() - 0.5) * 0.4,
                vy: (Math.random() - 0.5) * 0.4,
                alpha: Math.random() * 0.6 + 0.2,
                color: Math.random() > 0.5 ? '#6366f1' : '#f472b6'
            });
        }
    }

    function drawParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        particles.forEach(p => {
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
            ctx.fillStyle = p.color.replace(')', `, ${p.alpha})`).replace('rgb', 'rgba');
            ctx.fill();

            p.x += p.vx;
            p.y += p.vy;

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

                if (dist < 120) {
                    ctx.beginPath();
                    ctx.moveTo(p1.x, p1.y);
                    ctx.lineTo(p2.x, p2.y);
                    ctx.strokeStyle = `rgba(99, 102, 241, ${0.12 * (1 - dist / 120)})`;
                    ctx.lineWidth = 0.6;
                    ctx.stroke();
                }
            });
        });

        requestAnimationFrame(drawParticles);
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

    const colors = ['#6366f1', '#f472b6', '#fbbf24', '#22c55e', '#ef4444'];

    // Main burst
    confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.6 },
        colors: colors
    });

    // Side cannons
    setTimeout(() => {
        confetti({ particleCount: 60, angle: 60, spread: 60, origin: { x: 0, y: 0.7 }, colors: colors });
        confetti({ particleCount: 60, angle: 120, spread: 60, origin: { x: 1, y: 0.7 }, colors: colors });
    }, 150);

    // Extra sparkle
    setTimeout(() => {
        confetti({ particleCount: 40, spread: 100, origin: { y: 0.5 }, colors: colors });
    }, 300);
}

// ===========================
// LIVE COUNTER SIMULATION
// ===========================
function updateLiveCounter() {
    const liveCount = document.getElementById('liveCount');
    if (!liveCount) return;

    // Simulate "people creating greetings now"
    setInterval(() => {
        const current = parseInt(liveCount.textContent);
        const change = Math.floor(Math.random() * 5) - 2; // -2 to +2
        const newCount = Math.max(10, Math.min(99, current + change));
        liveCount.textContent = newCount;
    }, 3000);
}

// Total greetings counter
function updateTotalCounter() {
    const totalEl = document.getElementById('totalGreetings');
    const footerEl = document.getElementById('footerCount');

    // Load from localStorage or use default
    const saved = localStorage.getItem(STATS_KEY);
    if (saved) {
        totalGreetings = parseInt(saved);
    }

    const formatted = totalGreetings.toLocaleString('de-DE');
    if (totalEl) totalEl.textContent = formatted;
    if (footerEl) footerEl.textContent = formatted;
}

function incrementTotalCounter() {
    totalGreetings++;
    localStorage.setItem(STATS_KEY, totalGreetings.toString());
    updateTotalCounter();
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
    }, 3500);
}

// ===========================
// OCCASION SELECTION
// ===========================
document.querySelectorAll('.occasion-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelectorAll('.occasion-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        currentOccasion = btn.dataset.occasion;
        playSound(clickSound);
    });
});

// ===========================
// OCCASION-SPECIFIC THEMES
// ===========================
const occasionThemes = {
    birthday: [
        { id: 'birthday-balloons', name: '🎈 Ballons', default: true },
        { id: 'birthday-confetti', name: '🎊 Konfetti' },
        { id: 'birthday-gold', name: '✨ Gold' }
    ],
    wedding: [
        { id: 'wedding-elegant', name: '🌸 Elegant', default: true },
        { id: 'wedding-romantic', name: '💕 Romantisch' },
        { id: 'wedding-white', name: '⬜ Weiß' }
    ],
    christmas: [
        { id: 'christmas-classic', name: '🎄 Klassisch', default: true },
        { id: 'christmas-snow', name: '❄️ Schnee' },
        { id: 'christmas-cozy', name: '🔥 Gemütlich' }
    ],
    newyear: [
        { id: 'newyear-fireworks', name: '🎆 Feuerwerk', default: true },
        { id: 'newyear-gold', name: '✨ Gold' },
        { id: 'newyear-sparkle', name: '💫 Glitzer' }
    ],
    easter: [
        { id: 'easter-spring', name: '🌱 Frühling', default: true },
        { id: 'easter-pastel', name: '🎨 Pastell' }
    ],
    thanks: [
        { id: 'thanks-floral', name: '🌸 Blumen', default: true },
        { id: 'thanks-heartfelt', name: '❤️ Herzlich' },
        { id: 'thanks-nature', name: '🌿 Natur' }
    ],
    baby: [
        { id: 'baby-pink', name: '💗 Rosa', default: true },
        { id: 'baby-blue', name: '💙 Blau' },
        { id: 'baby-pastel', name: '🎨 Pastell' }
    ],
    getwell: [
        { id: 'getwell-sunny', name: '☀️ Sonnig', default: true },
        { id: 'getwell-calm', name: '💙 Beruhigend' },
        { id: 'getwell-garden', name: '🌿 Garten' }
    ],
    mothersday: [
        { id: 'parents-love', name: '❤️ Liebe', default: true },
        { id: 'parents-elegant', name: '✨ Elegant' }
    ],
    fathersday: [
        { id: 'parents-love', name: '❤️ Liebe', default: true },
        { id: 'parents-elegant', name: '✨ Elegant' }
    ],
    graduation: [
        { id: 'graduation-classic', name: '🎓 Klassisch', default: true },
        { id: 'graduation-party', name: '🎉 Party' }
    ],
    anniversary: [
        { id: 'anniversary-gold', name: '✨ Gold', default: true },
        { id: 'anniversary-romantic', name: '💕 Romantisch' }
    ],
    general: [
        { id: 'general-gradient', name: '🌈 Gradient', default: true },
        { id: 'general-minimal', name: '⬜ Minimal' }
    ]
};

// Emojis per occasion for floating decorations
const occasionEmojis = {
    birthday: ['🎈', '🎉', '🎂', '✨', '🎁'],
    wedding: ['💒', '💕', '💍', '🌸', '🕊️'],
    christmas: ['🎄', '🎅', '❄️', '⭐', '🎁'],
    newyear: ['🎆', '🥂', '✨', '🎊', '🌟'],
    easter: ['🐰', '🥚', '🌷', '🐣', '🌸'],
    thanks: ['💐', '🙏', '❤️', '🌻', '🦋'],
    baby: ['👶', '🍼', '🧸', '💕', '⭐'],
    getwell: ['🌷', '💊', '☀️', '🌈', '💪'],
    mothersday: ['👩‍👧', '💐', '❤️', '🌹', '💕'],
    fathersday: ['👨‍👦', '🏆', '❤️', '⭐', '💪'],
    graduation: ['🎓', '📚', '🎉', '⭐', '🏆'],
    anniversary: ['🥂', '💕', '💍', '🌹', '✨'],
    general: ['💌', '✨', '❤️', '🌟', '🎉']
};

function renderOccasionThemes(occasion) {
    const container = document.getElementById('occasionThemes');
    const themes = occasionThemes[occasion] || occasionThemes.general;

    if (container) {
        container.innerHTML = themes.map(theme => `
            <button class="theme-btn ${theme.default ? 'active' : ''}" data-theme="${theme.id}">
                ${theme.name}
            </button>
        `).join('');

        // Bind click events
        container.querySelectorAll('.theme-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                container.querySelectorAll('.theme-btn').forEach(b => b.classList.remove('active'));
                document.querySelectorAll('.mood-btn').forEach(m => m.classList.remove('active'));
                btn.classList.add('active');
                currentCardTheme = btn.dataset.theme;
                greetingCard.setAttribute('data-card-theme', currentCardTheme);
                greetingCard.removeAttribute('data-mood');
                playSound(clickSound);
            });
        });

        // Set default theme
        const defaultTheme = themes.find(t => t.default);
        if (defaultTheme) {
            currentCardTheme = defaultTheme.id;
            greetingCard.setAttribute('data-card-theme', currentCardTheme);
        }
    }

    // Update floating emojis
    updateFloatingEmojis(occasion);
}

// ===========================
// MOOD EMOJI BUTTONS
// ===========================
document.querySelectorAll('.mood-emoji').forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelectorAll('.mood-emoji').forEach(m => m.classList.remove('active'));
        btn.classList.add('active');
        greetingCard.setAttribute('data-mood', btn.dataset.mood);
        greetingCard.removeAttribute('data-card-theme');

        // Clear any remix backgrounds when selecting a mood
        greetingCard.style.backgroundImage = '';
        greetingCard.style.backgroundSize = '';
        greetingCard.style.backgroundPosition = '';
        greetingCard.classList.remove('has-custom-bg');

        const customBg = document.getElementById('cardCustomBg');
        if (customBg) {
            customBg.src = '';
            customBg.classList.add('hidden');
        }

        playSound(clickSound);
    });
});

// ===========================
// STICKER SYSTEM
// ===========================
const placedStickers = document.getElementById('placedStickers');
let stickerCount = 0;

// Enable Drag & Drop for new stickers
document.querySelectorAll('.sticker').forEach(btn => {
    // 1. Click fallback (keep existing or remove? User said "instead", but click is good for a11y. Let's keep specific "Drag interaction" focused)
    // We will keep click as a quick-add fallback, but enabling native drag is key.

    // Enable HTML5 Drag
    btn.setAttribute('draggable', 'true');

    btn.addEventListener('dragstart', (e) => {
        e.dataTransfer.setData('text/plain', btn.dataset.emoji);
        e.dataTransfer.effectAllowed = 'copy';
        e.dataTransfer.dropEffect = 'copy';
    });

    // Keep click for accessibility/mobile (tap to add to random center)
    btn.addEventListener('click', () => {
        addStickerToCard(btn.dataset.emoji);
    });
});

// Helper to add sticker (factored out for reuse)
function addStickerToCard(emoji, xPos = null, yPos = null) {
    if (stickerCount >= 10) {
        showToast('Maximal 10 Sticker pro Karte!', 'warning');
        return;
    }

    const sticker = document.createElement('span');
    sticker.className = 'placed-sticker';
    sticker.textContent = emoji;

    // Use provided coordinates or random center
    if (xPos !== null && yPos !== null) {
        sticker.style.left = xPos + '%';
        sticker.style.top = yPos + '%';
    } else {
        sticker.style.left = (20 + Math.random() * 60) + '%';
        sticker.style.top = (20 + Math.random() * 60) + '%';
    }

    // Make placed sticker draggable (for moving found in startDrag)
    sticker.addEventListener('mousedown', startDrag);
    sticker.addEventListener('touchstart', startDrag);

    // Double-click to remove
    sticker.addEventListener('dblclick', () => {
        sticker.remove();
        stickerCount--;
        playSound(clickSound);
    });

    placedStickers?.appendChild(sticker);
    stickerCount++;
    playSound(clickSound);
}

// Handle Drop on Card
if (greetingCard) {
    greetingCard.addEventListener('dragover', (e) => {
        e.preventDefault(); // Allow drop
        e.dataTransfer.dropEffect = 'copy';
    });

    greetingCard.addEventListener('drop', (e) => {
        e.preventDefault();
        const emoji = e.dataTransfer.getData('text/plain');
        if (emoji) {
            const rect = greetingCard.getBoundingClientRect();
            // Calculate % position relative to card
            const x = ((e.clientX - rect.left) / rect.width) * 100;
            const y = ((e.clientY - rect.top) / rect.height) * 100;

            // Constrain to 0-100% (roughly, allowing some edge overlap)
            addStickerToCard(emoji, x, y);
        }
    });
}

// Drag functionality
let currentDrag = null;
let dragOffset = { x: 0, y: 0 };

function startDrag(e) {
    e.preventDefault();

    // Ignore if clicking resize handle
    if (e.target.classList.contains('sticker-resize-handle')) return;

    // Select the wrapper (if image) or the element itself (if emoji)
    currentDrag = e.target.closest('.placed-sticker');

    if (!currentDrag) return;

    currentDrag.classList.add('dragging');

    const rect = currentDrag.getBoundingClientRect();
    const cardRect = greetingCard.getBoundingClientRect();
    const clientX = e.clientX || e.touches[0].clientX;
    const clientY = e.clientY || e.touches[0].clientY;

    dragOffset.x = clientX - rect.left;
    dragOffset.y = clientY - rect.top;

    document.addEventListener('mousemove', drag);
    document.addEventListener('mouseup', stopDrag);
    document.addEventListener('touchmove', drag);
    document.addEventListener('touchend', stopDrag);
}

function drag(e) {
    if (!currentDrag) return;

    const cardRect = greetingCard.getBoundingClientRect();
    const clientX = e.clientX || e.touches[0].clientX;
    const clientY = e.clientY || e.touches[0].clientY;

    const x = ((clientX - cardRect.left - dragOffset.x) / cardRect.width) * 100;
    const y = ((clientY - cardRect.top - dragOffset.y) / cardRect.height) * 100;

    currentDrag.style.left = Math.max(0, Math.min(90, x)) + '%';
    currentDrag.style.top = Math.max(0, Math.min(90, y)) + '%';
}

function stopDrag() {
    if (currentDrag) {
        currentDrag.classList.remove('dragging');
        currentDrag = null;
    }
    document.removeEventListener('mousemove', drag);
    document.removeEventListener('mouseup', stopDrag);
    document.removeEventListener('touchmove', drag);
    document.removeEventListener('touchend', stopDrag);
}

// Clear all stickers
document.getElementById('clearStickersBtn')?.addEventListener('click', () => {
    if (placedStickers) {
        placedStickers.innerHTML = '';
        stickerCount = 0;
        playSound(clickSound);
    }
});

// Copy text to clipboard
document.getElementById('copyTextBtn')?.addEventListener('click', async () => {
    const textElement = document.getElementById('generatedMessage');
    if (textElement && textElement.innerText) {
        try {
            await navigator.clipboard.writeText(textElement.innerText);
            playSound(successSound);
            showToast('Text kopiert! 📋', 'success');
        } catch (err) {
            // Fallback for older browsers
            const textArea = document.createElement('textarea');
            textArea.value = textElement.innerText;
            document.body.appendChild(textArea);
            textArea.select();
            document.execCommand('copy');
            document.body.removeChild(textArea);
            playSound(successSound);
            showToast('Text kopiert! 📋', 'success');
        }
    } else {
        showToast('Kein Text zum Kopieren vorhanden', 'error');
    }
});

// ===========================
// DRAGGABLE MESSAGE TEXT
// ===========================
const messageText = document.getElementById('generatedMessage');
let textDrag = null;
let textDragOffset = { x: 0, y: 0 };

if (messageText && greetingCard) {
    messageText.addEventListener('mousedown', startTextDrag);
    messageText.addEventListener('touchstart', startTextDrag, { passive: false });
}

function startTextDrag(e) {
    e.preventDefault();
    textDrag = messageText;
    textDrag.style.cursor = 'grabbing';

    const rect = textDrag.getBoundingClientRect();
    const clientX = e.clientX || e.touches[0].clientX;
    const clientY = e.clientY || e.touches[0].clientY;

    textDragOffset.x = clientX - rect.left;
    textDragOffset.y = clientY - rect.top;

    document.addEventListener('mousemove', dragText);
    document.addEventListener('mouseup', stopTextDrag);
    document.addEventListener('touchmove', dragText, { passive: false });
    document.addEventListener('touchend', stopTextDrag);
}

function dragText(e) {
    if (!textDrag) return;
    e.preventDefault();

    const cardRect = greetingCard.getBoundingClientRect();
    const clientX = e.clientX || e.touches[0].clientX;
    const clientY = e.clientY || e.touches[0].clientY;

    const x = ((clientX - cardRect.left - textDragOffset.x) / cardRect.width) * 100;
    const y = ((clientY - cardRect.top - textDragOffset.y) / cardRect.height) * 100;

    textDrag.style.left = Math.max(0, Math.min(70, x)) + '%';
    textDrag.style.top = Math.max(0, Math.min(70, y)) + '%';
}

function stopTextDrag() {
    if (textDrag) {
        textDrag.style.cursor = 'grab';
        textDrag = null;
    }
    document.removeEventListener('mousemove', dragText);
    document.removeEventListener('mouseup', stopTextDrag);
    document.removeEventListener('touchmove', dragText);
    document.removeEventListener('touchend', stopTextDrag);
}

// ===========================
// STICKER TAB ARROW NAVIGATION
// ===========================
const stickerTabs = document.querySelectorAll('.sticker-tab-btn');
let currentStickerTabIndex = 0;

function switchStickerTab(index) {
    if (stickerTabs.length === 0) return;

    // Wrap around
    if (index < 0) index = stickerTabs.length - 1;
    if (index >= stickerTabs.length) index = 0;

    currentStickerTabIndex = index;

    // Scroll the tab into view (centered)
    stickerTabs[index].scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'center'
    });

    // Trigger click on the tab to handle UI updates
    stickerTabs[index].click();
}

document.getElementById('stickerNavLeft')?.addEventListener('click', () => {
    switchStickerTab(currentStickerTabIndex - 1);
    playSound(clickSound);
});

document.getElementById('stickerNavRight')?.addEventListener('click', () => {
    switchStickerTab(currentStickerTabIndex + 1);
    playSound(clickSound);
});

// Update tabs and content visibility
stickerTabs.forEach((tab, index) => {
    tab.addEventListener('click', () => {
        currentStickerTabIndex = index;

        // Update active tab styling
        stickerTabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');

        // Update content visibility
        const category = tab.dataset.tab;
        document.querySelectorAll('.sticker-tab-content').forEach(content => {
            if (content.id === `tab-${category}`) {
                content.classList.remove('hidden');
                content.classList.add('active');
            } else {
                content.classList.add('hidden');
                content.classList.remove('active');
            }
        });

        playSound(clickSound);
    });
});

// ===========================
// MINI FONT BUTTONS
// ===========================
document.querySelectorAll('.font-mini').forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelectorAll('.font-mini').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        generatedMessage.style.fontFamily = btn.dataset.font;
        playSound(clickSound);
    });
});

/* Frame Logic Removed */

function updateFloatingEmojis(occasion) {
    const decorations = document.getElementById('cardDecorations');
    const emojis = occasionEmojis[occasion] || occasionEmojis.general;

    decorations.innerHTML = emojis.map(emoji =>
        `<span class="floating-emoji">${emoji}</span>`
    ).join('');

    greetingCard.setAttribute('data-occasion', occasion);
}

// ===========================
// DESIGN TABS (Updated Selectors)
// ===========================
document.querySelectorAll('.design-tab-btn').forEach(tab => {
    tab.addEventListener('click', () => {
        document.querySelectorAll('.design-tab-btn').forEach(t => t.classList.remove('active'));
        tab.classList.add('active');

        const panel = tab.dataset.tab; // 'mood', 'text', 'image'

        // Hide all panels first
        document.querySelectorAll('.design-tab-content').forEach(content => {
            content.classList.add('hidden');
            content.classList.remove('active');
        });

        // Show selected panel
        const selectedPanel = document.getElementById(`design-tab-${panel}`);
        if (selectedPanel) {
            selectedPanel.classList.remove('hidden');
            selectedPanel.classList.add('active');
        }

        playSound(clickSound);
    });
});

// ===========================
// MOOD SELECTION (New Compact Grid)
// ===========================
document.querySelectorAll('.mood-emoji').forEach(btn => {
    btn.addEventListener('click', () => {
        // Visual feedback
        document.querySelectorAll('.mood-emoji').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        // Apply mood
        const mood = btn.dataset.mood;
        if (greetingCard) {
            greetingCard.setAttribute('data-mood', mood);
            // Clear any remix gradient when selecting a regular mood
            greetingCard.style.backgroundImage = '';
        }

        playSound(clickSound);
    });
});

// ===========================
// REMIX FEATURE (Supabase Storage)
// ===========================
const REMIX_API_ENDPOINT = '/api/get-random-card';
const TOTAL_MOODS = 14;

const remixBtn = document.getElementById('remixBtn');
const remixAgainBtn = document.getElementById('remixAgainBtn');
const remixPreview = document.getElementById('remixPreview');
const remixInput1 = document.getElementById('remixInput1');
const remixInput2 = document.getElementById('remixInput2');

function getRandomMoods() {
    const mood1 = Math.floor(Math.random() * TOTAL_MOODS) + 1;
    let mood2 = Math.floor(Math.random() * TOTAL_MOODS) + 1;
    while (mood2 === mood1) {
        mood2 = Math.floor(Math.random() * TOTAL_MOODS) + 1;
    }
    return [`mood-${mood1}`, `mood-${mood2}`];
}

async function doRemix() {
    // Show loading state
    remixBtn.classList.add('loading');
    remixBtn.textContent = '⏳ Laden...';

    try {
        const response = await fetch(REMIX_API_ENDPOINT, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ count: 1 })
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error || 'Remix fehlgeschlagen');
        }

        // Clear existing themes/moods
        greetingCard.removeAttribute('data-mood');
        greetingCard.removeAttribute('data-card-theme');
        document.querySelectorAll('.mood-emoji').forEach(b => b.classList.remove('active'));
        document.querySelectorAll('.theme-btn').forEach(b => b.classList.remove('active'));

        // Get the custom background element (this is where backgrounds should be applied!)
        const customBg = document.getElementById('cardCustomBg');

        if (data.type === 'image' && data.images && data.images.length > 0) {
            // Apply random image from Supabase as background to the correct element
            const randomImage = data.images[0];

            // Use cardCustomBg for the image (it has proper z-index)
            if (customBg) {
                customBg.src = randomImage.url;
                customBg.classList.remove('hidden');
            }

            // Also set on greetingCard as fallback
            greetingCard.style.backgroundImage = `url('${randomImage.url}')`;
            greetingCard.style.backgroundSize = 'cover';
            greetingCard.style.backgroundPosition = 'center';
            // Don't add has-custom-bg class - it causes a gray overlay

            playSound(successSound);
        } else if (data.type === 'gradient' && data.css) {
            // Fallback: use gradient if no images available
            // Clear custom bg first
            if (customBg) {
                customBg.src = '';
                customBg.classList.add('hidden');
            }

            let cleanCss = data.css.replace(/['\"]+/g, '').replace(/;$/, '');
            if (cleanCss.startsWith('linear-gradient')) {
                greetingCard.style.backgroundImage = cleanCss;
            } else {
                greetingCard.style.backgroundImage = data.css.replace(/^[\"']|[\"']$/g, '');
            }
            greetingCard.style.backgroundSize = '100% 100%';
            greetingCard.classList.remove('has-custom-bg');

            playSound(successSound);
        }

    } catch (err) {
        console.error('Zufall error:', err);
    } finally {
        remixBtn.classList.remove('loading');
        remixBtn.textContent = '🎲 Zufall';
    }
}

remixBtn?.addEventListener('click', () => {
    playSound(clickSound);
    doRemix();
});

remixAgainBtn?.addEventListener('click', () => {
    playSound(clickSound);
    doRemix();
});

// ===========================
// TEXT CUSTOMIZATION
// ===========================

// Font Selection
document.querySelectorAll('.font-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelectorAll('.font-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        generatedMessage.style.fontFamily = btn.dataset.font;
        playSound(clickSound);
    });
});

// Text Color
const textColorPicker = document.getElementById('textColorPicker');
textColorPicker?.addEventListener('input', (e) => {
    generatedMessage.style.color = e.target.value;
    document.querySelectorAll('.color-preset').forEach(p => p.classList.remove('active'));
});

document.querySelectorAll('.color-preset').forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelectorAll('.color-preset').forEach(p => p.classList.remove('active'));
        btn.classList.add('active');
        const color = btn.dataset.color;
        generatedMessage.style.color = color;
        textColorPicker.value = color;
        playSound(clickSound);
    });
});

// Text Size
const textSizeSlider = document.getElementById('textSizeSlider');
const textSizeValue = document.getElementById('textSizeValue');
textSizeSlider?.addEventListener('input', (e) => {
    const size = e.target.value + 'rem';
    generatedMessage.style.fontSize = size;
    if (textSizeValue) textSizeValue.textContent = size;
});

// Text Alignment
document.querySelectorAll('.align-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelectorAll('.align-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        generatedMessage.style.textAlign = btn.dataset.align;
        playSound(clickSound);
    });
});

// ===========================
// FRAME CUSTOMIZATION
// ===========================
document.querySelectorAll('.frame-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelectorAll('.frame-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        greetingCard.setAttribute('data-frame', btn.dataset.frame);
        playSound(clickSound);
    });
});

// Border Radius
const radiusSlider = document.getElementById('radiusSlider');
const radiusValue = document.getElementById('radiusValue');
radiusSlider?.addEventListener('input', (e) => {
    const radius = e.target.value + 'px';
    greetingCard.style.borderRadius = radius;
    if (radiusValue) radiusValue.textContent = radius;
});

// Overlay Intensity
const overlaySlider = document.getElementById('overlaySlider');
const overlayValue = document.getElementById('overlayValue');
const cardOverlay = document.querySelector('.card-overlay');
overlaySlider?.addEventListener('input', (e) => {
    const intensity = e.target.value;
    if (cardOverlay) {
        cardOverlay.style.background = `rgba(0, 0, 0, ${intensity / 100})`;
    }
    if (overlayValue) overlayValue.textContent = intensity + '%';
});

// ===========================
// IMAGE UPLOAD
// ===========================
const uploadZone = document.getElementById('uploadZone');
const imageUpload = document.getElementById('imageUpload');
const cardCustomBg = document.getElementById('cardCustomBg');
const removeBgBtn = document.getElementById('removeBgBtn');

uploadZone?.addEventListener('click', () => imageUpload?.click());

uploadZone?.addEventListener('dragover', (e) => {
    e.preventDefault();
    uploadZone.classList.add('dragover');
});

uploadZone?.addEventListener('dragleave', () => {
    uploadZone.classList.remove('dragover');
});

uploadZone?.addEventListener('drop', (e) => {
    e.preventDefault();
    uploadZone.classList.remove('dragover');

    const file = e.dataTransfer.files[0];
    if (file) handleImageUpload(file);
});

imageUpload?.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (file) handleImageUpload(file);
});

function handleImageUpload(file) {
    if (!file.type.startsWith('image/')) {
        showToast('Bitte nur Bilder hochladen! 🖼️', 'error');
        return;
    }

    if (file.size > 5 * 1024 * 1024) {
        showToast('Bild zu groß! Max. 5MB 📁', 'error');
        return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
        cardCustomBg.src = e.target.result;
        cardCustomBg.classList.remove('hidden');
        greetingCard.classList.add('has-custom-bg');
        removeBgBtn?.classList.remove('hidden');
        playSound(successSound);
        showToast('Bild hochgeladen! 🎨', 'success');
    };
    reader.readAsDataURL(file);
}

removeBgBtn?.addEventListener('click', () => {
    cardCustomBg.src = '';
    cardCustomBg.classList.add('hidden');
    greetingCard.classList.remove('has-custom-bg');
    removeBgBtn.classList.add('hidden');
    imageUpload.value = '';
    playSound(clickSound);
    showToast('Bild entfernt', 'info');
});

// ===========================
// LANGUAGE SWITCHING
// ===========================
document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelectorAll('.lang-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        currentLanguage = btn.dataset.lang;
        playSound(clickSound);
        if (typeof applyTranslations === 'function') {
            applyTranslations(currentLanguage);
        }
    });
});

// ===========================
// TEMPLATES GALLERY
// ===========================
const templatesToggle = document.getElementById('templatesToggle');
const templatesGallery = document.getElementById('templatesGallery');

// Predefined templates
const templates = {
    'birthday-classic': {
        occasion: 'birthday',
        tone: 'warm',
        text: 'Alles Gute zum Geburtstag! 🎂\n\nMöge dieser besondere Tag voller Freude, Lachen und unvergesslicher Momente sein. Du verdienst nur das Beste im Leben!\n\nMit herzlichen Glückwünschen'
    },
    'birthday-funny': {
        occasion: 'birthday',
        tone: 'funny',
        text: 'Happy Birthday! 🎉\n\nNoch ein Jahr älter, aber keine Sorge – du wirst nicht alt, du wirst vintage! Und Vintage ist bekanntlich unbezahlbar.\n\nFeier schön und lass es krachen!'
    },
    'christmas-family': {
        occasion: 'christmas',
        tone: 'warm',
        text: 'Frohe Weihnachten! 🎄\n\nIn dieser besinnlichen Zeit wünsche ich dir und deiner Familie Frieden, Liebe und viele glückliche Momente unter dem Weihnachtsbaum.\n\nMöge das neue Jahr dir alles bringen, was dein Herz begehrt.'
    },
    'wedding-elegant': {
        occasion: 'wedding',
        tone: 'poetic',
        text: 'Zur Hochzeit die herzlichsten Glückwünsche! 💒\n\nZwei Herzen, die sich gefunden haben, vereinen sich heute zu einem gemeinsamen Weg. Möge eure Liebe immer stärker werden und jeder Tag euch näher zusammenbringen.\n\nMit den besten Wünschen für eure gemeinsame Zukunft'
    },
    'thanks-heartfelt': {
        occasion: 'thanks',
        tone: 'warm',
        text: 'Von Herzen Danke! 💐\n\nManchmal reichen Worte nicht aus, um auszudrücken, wie dankbar ich bin. Aber ich möchte, dass du weißt, wie viel mir deine Unterstützung bedeutet.\n\nDu bist ein wahrer Schatz!'
    },
    'newyear-wishes': {
        occasion: 'newyear',
        tone: 'warm',
        text: 'Frohes Neues Jahr! 🎆\n\nMöge das neue Jahr dir 365 Tage voller Glück, 52 Wochen voller Erfolg, 12 Monate voller Gesundheit und jeden Tag einen Grund zum Lächeln bringen!\n\nAuf ein wundervolles Jahr!'
    },
    'getwell-caring': {
        occasion: 'getwell',
        tone: 'warm',
        text: 'Gute Besserung! 🌷\n\nIch hoffe, du erholst dich schnell und bist bald wieder auf den Beinen. Ruhe dich aus, lass dich verwöhnen und vergiss nicht – ich denke an dich!\n\nWerde schnell wieder gesund!'
    },
    'graduation-proud': {
        occasion: 'graduation',
        tone: 'warm',
        text: 'Herzlichen Glückwunsch zum Abschluss! 🎓\n\nDu hast es geschafft! Dein Fleiß und deine Ausdauer haben sich ausgezahlt. Ich bin unglaublich stolz auf dich und gespannt, welche Abenteuer dich erwarten.\n\nDie Welt liegt dir zu Füßen!'
    }
};

templatesToggle?.addEventListener('click', () => {
    templatesToggle.classList.toggle('open');
    templatesGallery?.classList.toggle('hidden');

    const toggleText = templatesToggle.querySelector('span:first-child');
    if (toggleText) {
        toggleText.textContent = templatesGallery?.classList.contains('hidden') ? 'Anzeigen' : 'Verbergen';
    }

    playSound(clickSound);
});

document.querySelectorAll('.template-card').forEach(card => {
    card.addEventListener('click', () => {
        const templateId = card.dataset.template;
        const template = templates[templateId];

        if (template) {
            // Set occasion
            document.querySelectorAll('.occasion-btn').forEach(b => b.classList.remove('active'));
            const occasionBtn = document.querySelector(`.occasion-btn[data-occasion="${template.occasion}"]`);
            if (occasionBtn) {
                occasionBtn.classList.add('active');
                currentOccasion = template.occasion;
            }

            // Set tone
            const toneSelect = document.getElementById('tone');
            if (toneSelect) toneSelect.value = template.tone;

            // Display greeting directly
            generatedMessage.textContent = template.text;
            inputSection.classList.add('hidden');
            outputSection.classList.remove('hidden');

            // Update card themes for this occasion
            renderOccasionThemes(template.occasion);

            // Visual feedback
            document.querySelectorAll('.template-card').forEach(c => c.classList.remove('selected'));
            card.classList.add('selected');

            playSound(successSound);
            showToast('Vorlage geladen! ✨ Passe sie nach Belieben an.', 'success');
            launchConfetti();
        }
    });
});
greetingForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const name = document.getElementById('recipientName').value.trim();
    const relation = document.getElementById('relationship').value;
    const info = document.getElementById('additionalInfo').value.trim();
    const tone = document.getElementById('tone').value;

    if (!name || !relation) {
        showToast('Bitte fülle alle Pflichtfelder aus! ⚠️', 'error');
        return;
    }

    playSound(clickSound);

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

        // Clean citation footnotes like [1], [2] from AI response
        function cleanCitations(text) {
            return text
                .replace(/\[\d+\]/g, '')           // Remove [1], [2], etc.
                .replace(/  +/g, ' ')              // Clean multiple spaces (not newlines!)
                .replace(/ +\n/g, '\n')            // Remove trailing spaces before newlines
                .replace(/\n +/g, '\n')            // Remove leading spaces after newlines  
                .trim();
        }

        // Display result
        generatedMessage.textContent = cleanCitations(data.text);
        inputSection.classList.add('hidden');
        outputSection.classList.remove('hidden');

        // Update card themes for this occasion
        renderOccasionThemes(currentOccasion);

        // Save to history
        saveToHistory({
            text: data.text,
            name,
            occasion: currentOccasion,
            lang: currentLanguage,
            date: new Date().toISOString()
        });

        // Increment counter
        incrementTotalCounter();

        // Success feedback
        playSound(successSound);
        showToast('Gruß erfolgreich generiert! 🎉', 'success');
        launchConfetti();

    } catch (err) {
        console.error('Generation error:', err);
        showToast(`Fehler: ${err.message} 😞`, 'error');
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
    if (historyBadge) historyBadge.textContent = history.length;

    const occasionNames = {
        birthday: '🎂 Geburtstag',
        wedding: '💍 Hochzeit',
        christmas: '🎄 Weihnachten',
        newyear: '🎆 Neujahr',
        easter: '🐰 Ostern',
        thanks: '💐 Danke',
        baby: '👶 Geburt',
        getwell: '💊 Gute Besserung',
        mothersday: '👩‍👧 Muttertag',
        fathersday: '👨‍👦 Vatertag',
        graduation: '🎓 Abschluss',
        anniversary: '🥂 Jubiläum',
        general: '💌 Sonstiges'
    };

    // Render input section history sidebar
    if (historyList) {
        if (history.length === 0) {
            historyList.innerHTML = '<p class="empty-history">Noch keine Grüße erstellt. Starte jetzt! 🚀</p>';
        } else {
            historyList.innerHTML = history.map((item, index) => `
                <div class="history-item" data-index="${index}">
                    <div class="history-item-header">
                        <span class="history-item-occasion">${occasionNames[item.occasion] || item.occasion}</span>
                        <span class="history-item-date">${new Date(item.date).toLocaleDateString('de-DE')}</span>
                    </div>
                    <div class="history-item-preview">${item.text.substring(0, 50)}...</div>
                </div>
            `).join('');

            historyList.querySelectorAll('.history-item').forEach(item => {
                item.addEventListener('click', () => {
                    const index = parseInt(item.dataset.index);
                    const entry = history[index];
                    generatedMessage.textContent = entry.text;
                    inputSection.classList.add('hidden');
                    outputSection.classList.remove('hidden');
                    playSound(clickSound);
                });
            });
        }
    }

    // Render output section history list
    const outputHistoryList = document.getElementById('outputHistoryList');
    if (outputHistoryList) {
        if (history.length === 0) {
            outputHistoryList.innerHTML = '<p class="empty-history">Noch keine Grüße erstellt.</p>';
        } else {
            outputHistoryList.innerHTML = history.map((item, index) => `
                <div class="output-history-item" data-index="${index}">
                    <div class="history-occasion">${occasionNames[item.occasion] || item.occasion}</div>
                    <div class="history-preview">${item.text.substring(0, 40)}...</div>
                </div>
            `).join('');

            outputHistoryList.querySelectorAll('.output-history-item').forEach(item => {
                item.addEventListener('click', () => {
                    const index = parseInt(item.dataset.index);
                    const entry = history[index];
                    generatedMessage.textContent = entry.text;
                    playSound(clickSound);
                    showToast('Gruß aus Historie geladen 📜', 'info');
                });
            });
        }
    }
}

historyToggle.addEventListener('click', () => {
    historyToggle.classList.toggle('open');
    historyContent.classList.toggle('hidden');
    playSound(clickSound);
});

// ===========================
// REACTION BUTTONS
// ===========================
document.querySelectorAll('.reaction-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelectorAll('.reaction-btn').forEach(b => b.classList.remove('selected'));
        btn.classList.add('selected');
        playSound(successSound);
        showToast('Danke für dein Feedback! ❤️', 'success');
    });
});

// ===========================
// OUTPUT ACTIONS
// ===========================

// Copy to clipboard
// Copy to clipboard
document.getElementById('copyBtn')?.addEventListener('click', () => {
    navigator.clipboard.writeText(generatedMessage.textContent)
        .then(() => {
            playSound(clickSound);
            showToast('Text kopiert! 📋', 'success');
        })
        .catch(() => showToast('Kopieren fehlgeschlagen 😞', 'error'));
});

// Helper function to generate card image as blob
async function generateCardBlob() {
    const card = document.getElementById('greetingCard');
    const messageHeader = card.querySelector('.message-header');

    if (messageHeader) messageHeader.style.display = 'none';

    const originalText = generatedMessage.innerText;
    generatedMessage.innerText = originalText.replace(/\*\*/g, '').replace(/\*/g, '');

    try {
        const width = card.offsetWidth;
        const height = card.offsetHeight;

        const dataUrl = await htmlToImage.toPng(card, {
            quality: 0.95,
            pixelRatio: 2,
            width: width,
            height: height,
            style: {
                transform: 'none',
                margin: '0',
                display: 'flex'
            },
            cacheBust: false
        });

        // Convert dataUrl to blob
        const response = await fetch(dataUrl);
        const blob = await response.blob();

        generatedMessage.innerText = originalText;
        if (messageHeader) messageHeader.style.display = '';

        return { blob, dataUrl };
    } catch (error) {
        generatedMessage.innerText = originalText;
        if (messageHeader) messageHeader.style.display = '';
        throw error;
    }
}

// Share card as image using Web Share API
async function shareCardAsImage(platform) {
    playSound(clickSound);
    showToast('Bild wird vorbereitet... 📸', 'info');

    try {
        const { blob, dataUrl } = await generateCardBlob();
        const file = new File([blob], 'gruss.png', { type: 'image/png' });

        // Check if Web Share API supports files
        if (navigator.canShare && navigator.canShare({ files: [file] })) {
            await navigator.share({
                files: [file],
                title: 'Mein Gruß',
                text: '💌 Erstellt mit grussgenerator.de'
            });
            showToast('Gruß geteilt! 🎉', 'success');
            return true;
        } else {
            // Fallback: Download and show instructions
            showToast(`Web Share nicht unterstützt. Bild wird heruntergeladen...`, 'warning');
            const link = document.createElement('a');
            link.download = `gruss-${Date.now()}.png`;
            link.href = dataUrl;
            link.click();
            showToast(`Bild gespeichert! Öffne ${platform} und teile das Bild manuell.`, 'info');
            return false;
        }
    } catch (error) {
        if (error.name === 'AbortError') {
            showToast('Teilen abgebrochen', 'info');
        } else {
            console.error('Share failed:', error);
            showToast('Teilen fehlgeschlagen 😞', 'error');
        }
        return false;
    }
}

// WhatsApp share - try image first, fallback to text
document.getElementById('whatsappBtn').addEventListener('click', async () => {
    const shared = await shareCardAsImage('WhatsApp');
    if (!shared && !navigator.canShare) {
        // Pure fallback for old browsers
        const text = encodeURIComponent(generatedMessage.textContent + '\n\n💌 Erstellt mit grussgenerator.de');
        window.open(`https://wa.me/?text=${text}`, '_blank');
    }
});

// Email share
document.getElementById('emailBtn').addEventListener('click', () => {
    playSound(clickSound);
    const subject = encodeURIComponent('Ein persönlicher Gruß für dich 💌');
    const body = encodeURIComponent(generatedMessage.textContent + '\n\n---\nErstellt mit grussgenerator.de');
    window.location.href = `mailto:?subject=${subject}&body=${body}`;
});

// Download as image
document.getElementById('downloadBtn').addEventListener('click', async () => {
    console.log('Download button clicked - processing 1080x1080 JPEG');

    // Check library
    if (typeof htmlToImage === 'undefined') {
        alert('Fehler: Bild-Bibliothek nicht geladen. Bitte Seite neu laden.');
        return;
    }

    try {
        playSound(clickSound);
        showToast('Wird erstellt (1080x1080)... 📸', 'info');

        const card = document.getElementById('greetingCard');
        const messageHeader = card.querySelector('.message-header');

        if (!card) throw new Error('Kartenelement nicht gefunden');

        // Temporary UI Adjustments
        if (messageHeader) messageHeader.style.display = 'none';

        // Clean text (remove accidental markdown)
        const originalText = generatedMessage.innerText;
        generatedMessage.innerText = originalText.replace(/\*\*/g, '').replace(/\*/g, '');

        console.log('Starting htmlToImage.toJpeg (V3 - Timeout Protected)...');

        // Create a timeout promise
        const timeout = new Promise((_, reject) =>
            setTimeout(() => reject(new Error('Zeitüberschreitung bei der Bilderstellung (15s)')), 15000)
        );

        // Actual generation promise
        const generation = htmlToImage.toJpeg(card, {
            quality: 0.95,
            canvasWidth: 1080,
            canvasHeight: 1080,
            backgroundColor: (getComputedStyle(card).backgroundColor === 'rgba(0, 0, 0, 0)') ? '#ffffff' : null,
            style: {
                transform: 'none',
                margin: '0',
                display: 'flex',
                // Force layout size to match target resolution
                width: '1080px',
                height: '1080px',
                maxWidth: 'none',
                maxHeight: 'none',
                borderRadius: '0'
            },
            cacheBust: false // Disable cacheBust to rely on already loaded (CORS-validated) images
        });

        // Race them
        const dataUrl = await Promise.race([generation, timeout]);

        console.log('Image generated, triggering download...');

        // Debug output size
        const img = new Image();
        img.onload = () => console.log(`Generated image size: ${img.width}x${img.height}`);
        img.src = dataUrl;

        // Create Download
        const link = document.createElement('a');
        link.download = `gruss-${Date.now()}.jpg`;
        link.href = dataUrl;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        playSound(successSound);
        showToast('Bild gespeichert! 🎉', 'success');

        // Restore
        generatedMessage.innerText = originalText;
        if (messageHeader) messageHeader.style.display = '';

    } catch (error) {
        console.error('Download Error:', error);
        alert('Fehler beim Speichern: ' + error.message);

        // Attempt basic restore
        try {
            const card = document.getElementById('greetingCard');
            if (card) {
                const messageHeader = card.querySelector('.message-header');
                if (messageHeader) messageHeader.style.display = '';
            }
        } catch (e) { }
    }
});

// Twitter share - try image, fallback to text
document.getElementById('twitterBtn')?.addEventListener('click', async () => {
    const shared = await shareCardAsImage('Twitter/X');
    if (!shared && !navigator.canShare) {
        const text = encodeURIComponent('Gerade einen tollen Gruß erstellt! 💌 Probiere es selbst: grussgenerator.de');
        window.open(`https://twitter.com/intent/tweet?text=${text}`, '_blank');
    }
});

// Telegram share - try image, fallback to text
document.getElementById('telegramBtn')?.addEventListener('click', async () => {
    const shared = await shareCardAsImage('Telegram');
    if (!shared && !navigator.canShare) {
        const text = encodeURIComponent(generatedMessage.textContent + '\n\n💌 grussgenerator.de');
        window.open(`https://t.me/share/url?url=https://grussgenerator.de&text=${text}`, '_blank');
    }
});

// Facebook share - try image, fallback to link
document.getElementById('facebookBtn')?.addEventListener('click', async () => {
    const shared = await shareCardAsImage('Facebook');
    if (!shared && !navigator.canShare) {
        window.open('https://www.facebook.com/sharer/sharer.php?u=https://grussgenerator.de', '_blank');
    }
});

/* TTS Logic Removed */

// New greeting button
document.getElementById('newGreetingBtn').addEventListener('click', () => {
    playSound(clickSound);
    outputSection.classList.add('hidden');
    inputSection.classList.remove('hidden');
    greetingForm.reset();
    document.querySelectorAll('.occasion-btn').forEach(b => b.classList.remove('active'));
    document.querySelector('.occasion-btn[data-occasion="birthday"]').classList.add('active');
    currentOccasion = 'birthday';
});

// ===========================
// ADVANCED IMAGE UPLOAD
// ===========================
const uploadBgZone = document.getElementById('uploadBgZone');
const bgUpload = document.getElementById('bgUpload');
// cardCustomBg and removeBgBtn are already declared above


const uploadStickerZone = document.getElementById('uploadStickerZone');
const stickerUpload = document.getElementById('stickerUpload');

// Background Upload
uploadBgZone?.addEventListener('click', () => bgUpload?.click());

bgUpload?.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
            if (cardCustomBg) {
                cardCustomBg.src = e.target.result;
                cardCustomBg.classList.remove('hidden');
                greetingCard.classList.add('has-custom-bg');
                removeBgBtn?.classList.remove('hidden');
                playSound(successSound);
                showToast('Hintergrundbild gesetzt! 🖼️', 'success');
            }
        };
        reader.readAsDataURL(file);
    }
});

removeBgBtn?.addEventListener('click', () => {
    if (cardCustomBg) {
        cardCustomBg.src = '';
        cardCustomBg.classList.add('hidden');
    }
    greetingCard.classList.remove('has-custom-bg');
    removeBgBtn?.classList.add('hidden');
    // Also reset input so same file can be selected again
    if (bgUpload) bgUpload.value = '';
    playSound(clickSound);
});

// Sticker Upload
uploadStickerZone?.addEventListener('click', () => stickerUpload?.click());

// Resize Variables
let isResizing = false;
let currentResizer = null;
let originalWidth = 0;
let originalMouseX = 0;

stickerUpload?.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (file) {
        if (stickerCount >= 15) {
            showToast('Zu viele Elemente auf der Karte!', 'warning');
            return;
        }

        const reader = new FileReader();
        reader.onload = (event) => {
            // Wrapper
            const wrapper = document.createElement('div');
            wrapper.className = 'placed-sticker image-sticker-wrapper';
            wrapper.style.left = '30%';
            wrapper.style.top = '30%';
            wrapper.style.width = '150px'; // Initial size

            // Image
            const img = document.createElement('img');
            img.src = event.target.result;
            img.style.width = '100%';
            img.style.height = 'auto';
            img.style.display = 'block';
            img.style.pointerEvents = 'none'; // Ensure clicks go to wrapper

            // Resize Handle
            const handle = document.createElement('div');
            handle.className = 'sticker-resize-handle';

            wrapper.appendChild(img);
            wrapper.appendChild(handle);

            // Drag event (Move)
            wrapper.addEventListener('mousedown', startDrag);
            wrapper.addEventListener('touchstart', startDrag);

            // Resize event
            handle.addEventListener('mousedown', function (e) {
                e.stopPropagation(); // Prevent drag start
                initResize(e, wrapper);
            });
            handle.addEventListener('touchstart', function (e) {
                e.stopPropagation();
                initResize(e, wrapper);
            });

            // Remove
            wrapper.addEventListener('dblclick', () => {
                wrapper.remove();
                stickerCount--;
                playSound(clickSound);
            });

            placedStickers?.appendChild(wrapper);
            stickerCount++;
            playSound(successSound);
            showToast('Bild hinzugefügt! Ziehe an der Ecke zum Skalieren. 📐', 'success');
        };
        reader.readAsDataURL(file);

        // Reset input
        stickerUpload.value = '';
    }
});

// Resize Logic
function initResize(e, element) {
    isResizing = true;
    currentResizer = element;
    currentResizer.classList.add('resizing');

    // Get X position (Mouse or Touch)
    const clientX = e.type.includes('mouse') ? e.clientX : e.touches[0].clientX;

    originalWidth = parseFloat(getComputedStyle(element, null).getPropertyValue('width').replace('px', ''));
    originalMouseX = clientX;

    window.addEventListener('mousemove', resize);
    window.addEventListener('touchmove', resize);
    window.addEventListener('mouseup', stopResize);
    window.addEventListener('touchend', stopResize);
}

function resize(e) {
    if (!isResizing || !currentResizer) return;

    const clientX = e.type.includes('mouse') ? e.clientX : e.touches[0].clientX;
    const widthChange = clientX - originalMouseX;
    const newWidth = originalWidth + widthChange;

    if (newWidth > 50) { // Min width
        currentResizer.style.width = newWidth + 'px';
    }
}

function stopResize() {
    isResizing = false;
    if (currentResizer) {
        currentResizer.classList.remove('resizing');
        currentResizer = null;
    }
    window.removeEventListener('mousemove', resize);
    window.removeEventListener('touchmove', resize);
    window.removeEventListener('mouseup', stopResize);
    window.removeEventListener('touchend', stopResize);
}

// ===========================
// INIT
// ===========================
// ===========================
// URL PARAMETER HANDLING
// ===========================
function initUrlParameters() {
    const urlParams = new URLSearchParams(window.location.search);
    const params = Object.fromEntries(urlParams.entries());

    if (Object.keys(params).length === 0) return;

    // Fill fields
    if (params.recipientName) {
        document.getElementById('recipientName').value = params.recipientName;
    }

    if (params.relationship) {
        const select = document.getElementById('relationship');
        if (select) select.value = params.relationship;
    }

    if (params.additionalInfo) {
        document.getElementById('additionalInfo').value = params.additionalInfo;
    }

    if (params.tone) {
        const select = document.getElementById('tone');
        if (select) select.value = params.tone;
    }

    // Set Occasion
    if (params.occasion) {
        const occasionBtn = document.querySelector(`.occasion-btn[data-occasion="${params.occasion}"]`);
        if (occasionBtn) {
            document.querySelectorAll('.occasion-btn').forEach(b => b.classList.remove('active'));
            occasionBtn.classList.add('active');
            currentOccasion = params.occasion;
        }
    }

    // Show Toast
    showToast('Daten aus Link geladen! ✨', 'success');

    // Optional: Auto-generate if all fields are present?
    // for now, let the user click to be safe.
}

// ===========================
// INIT
// ===========================
document.addEventListener('DOMContentLoaded', () => {
    initBackground();
    loadHistory();
    updateTotalCounter();
    updateLiveCounter();
    initUrlParameters(); // Check for URL params

    // Apply initial language
    if (typeof applyTranslations === 'function') {
        applyTranslations(currentLanguage);
    }

    // Preload sounds
    if (clickSound) clickSound.load();
    if (successSound) successSound.load();
});

/* Signature Feature Removed */

// ===========================
// LAYOUT CLEANUP: TAB SYSTEM
// ===========================

// Sticker Tabs
document.querySelectorAll('.sticker-tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        // Visual feedback
        document.querySelectorAll('.sticker-tab-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        // Show/Hide Content
        document.querySelectorAll('.sticker-tab-content').forEach(c => c.classList.add('hidden'));
        const tabId = btn.dataset.tab;
        const target = document.getElementById(`tab-${tabId}`);
        if (target) {
            target.classList.remove('hidden');
        }

        if (typeof playSound === 'function' && typeof clickSound !== 'undefined') {
            playSound(clickSound);
        }
    });
});

// Design Tabs
document.querySelectorAll('.design-tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        // Visual feedback
        document.querySelectorAll('.design-tab-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        // Show/Hide Content
        document.querySelectorAll('.design-tab-content').forEach(c => c.classList.add('hidden'));
        const tabId = btn.dataset.tab;
        const target = document.getElementById(`design-tab-${tabId}`);
        if (target) {
            target.classList.remove('hidden');
        }

        if (typeof playSound === 'function' && typeof clickSound !== 'undefined') {
            playSound(clickSound);
        }
    });
});

/* ===========================
   Star Rating Logic
   =========================== */
document.addEventListener('DOMContentLoaded', () => {
    const stars = document.querySelectorAll('.star-btn');

    stars.forEach(star => {
        star.addEventListener('click', () => {
            const rating = parseInt(star.dataset.rating);

            // Update visual state
            stars.forEach(s => {
                const sRating = parseInt(s.dataset.rating);
                if (sRating <= rating) {
                    s.classList.add('active');
                } else {
                    s.classList.remove('active');
                }
            });

            // Log rating (or send to analytics if implemented)
            console.log(`User rated greeting: ${rating} stars`);

            // Simple feedback (e.g. confetti for 5 stars)
            if (rating >= 4 && window.confetti) {
                confetti({
                    particleCount: 50,
                    spread: 60,
                    origin: { y: 0.8 },
                    colors: ['#FFD700', '#FFA500', '#ffffff'] // Gold theme
                });
            }

            // Play click sound
            if (typeof playSound === 'function' && typeof clickSound !== 'undefined') {
                playSound(clickSound);
            }
        });
    });
});

/* ===========================
   Download Logic
   =========================== */
document.getElementById('downloadBtn')?.addEventListener('click', async () => {
    const btn = document.getElementById('downloadBtn');
    const originalText = btn.innerHTML;
    btn.innerHTML = '⏳ Speichere...';
    btn.disabled = true;

    try {
        const card = document.getElementById('greetingCard');
        if (!card) throw new Error('Card not found');

        // Use html-to-image
        const dataUrl = await htmlToImage.toPng(card, {
            quality: 1.0,
            pixelRatio: 2,
            style: { transform: 'none' }
        });

        const link = document.createElement('a');
        link.download = `gruss-${Date.now()}.png`;
        link.href = dataUrl;
        link.click();

        if (typeof playSound === 'function' && typeof successSound !== 'undefined') {
            playSound(successSound);
        }

        // Show celebration
        if (window.confetti) {
            confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
        }

    } catch (err) {
        console.error('Download failed:', err);
        alert('Fehler beim Speichern. Bitte versuche es erneut.');
    } finally {
        btn.innerHTML = originalText;
        btn.disabled = false;
    }
});

/* ===========================
   Text Effect Toggles
   =========================== */
document.addEventListener('DOMContentLoaded', () => {
    const effectMap = {
        'effectShadow': 'effect-shadow',
        'effectOutline': 'effect-outline',
        'effectGlow': 'effect-glow'
    };

    Object.keys(effectMap).forEach(btnId => {
        const btn = document.getElementById(btnId);
        if (!btn) {
            console.warn('Effect button not found:', btnId);
            return;
        }

        btn.addEventListener('click', () => {
            const messageText = document.getElementById('generatedMessage');
            if (!messageText) {
                console.warn('generatedMessage element not found');
                return;
            }

            const effectClass = effectMap[btnId];

            // Toggle effect
            btn.classList.toggle('active');
            messageText.classList.toggle(effectClass);

            console.log('Effect toggled:', effectClass, 'Active:', btn.classList.contains('active'));

            // Play sound
            if (typeof playSound === 'function' && typeof clickSound !== 'undefined') {
                playSound(clickSound);
            }
        });
    });
});

/* ===========================
   Download Image Button (DEBUG MODE - DELEGATED)
   =========================== */
document.addEventListener('click', async (e) => {
    // Event Delegation: Check if clicked element is (or is inside) #downloadBtn
    const btn = e.target.closest('#downloadBtn');

    if (btn) {
        alert('1/4: Klick registriert (via Delegation). Starte Prozess...');

        const greetingCard = document.getElementById('greetingCard');

        if (!greetingCard) {
            alert('FEHLER: Greeting Card Element nicht gefunden!');
            return;
        }

        const originalText = btn.innerHTML;
        btn.innerHTML = '⏳ Speichern...';
        btn.disabled = true;

        try {
            // Check Library
            if (typeof htmlToImage === 'undefined') {
                alert('FEHLER: html-to-image Bibliothek nicht geladen! Bitte Seite neu laden.');
                throw new Error('Library missing');
            }

            alert('2/4: Bibliothek gefunden. Erstelle Bild...');

            // Hide watermark
            const watermark = greetingCard.querySelector('.bg-watermark');
            if (watermark) watermark.style.display = 'none';

            // Capture
            const dataUrl = await htmlToImage.toPng(greetingCard, {
                quality: 0.95,
                pixelRatio: 2,
                filter: (node) => node.tagName !== 'SCRIPT',
            });

            alert('3/4: Bild erstellt. Starte Download...');

            // Download
            const link = document.createElement('a');
            link.download = `gruss_${Date.now()}.png`;
            link.href = dataUrl;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);

            alert('4/4: Fertig! Download sollte gestartet sein.');

            // Restore
            if (watermark) watermark.style.display = '';

        } catch (error) {
            alert('FEHLER BEIM SPEICHERN: ' + error.message);
            console.error(error);
        } finally {
            btn.innerHTML = originalText;
            btn.disabled = false;
        }
    }
});
