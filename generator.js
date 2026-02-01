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
// THEME TOGGLE (Dark/Light)
// ===========================
document.getElementById('themeToggle')?.addEventListener('click', () => {
    const html = document.documentElement;
    const currentTheme = html.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    html.setAttribute('data-theme', newTheme);

    const btn = document.getElementById('themeToggle');
    btn.textContent = newTheme === 'dark' ? '🌙' : '☀️';

    playSound(clickSound);
    localStorage.setItem('theme', newTheme);
});

// Load saved theme
const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
    document.documentElement.setAttribute('data-theme', savedTheme);
    const btn = document.getElementById('themeToggle');
    if (btn) btn.textContent = savedTheme === 'dark' ? '🌙' : '☀️';
}

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

        const isDark = document.documentElement.getAttribute('data-theme') !== 'light';

        if (isDark) {
            const gradient = ctx.createRadialGradient(
                canvas.width / 2, 0, 0,
                canvas.width / 2, canvas.height, canvas.height
            );
            gradient.addColorStop(0, 'rgba(99, 102, 241, 0.1)');
            gradient.addColorStop(0.5, 'rgba(10, 10, 18, 0)');
            gradient.addColorStop(1, 'rgba(244, 114, 182, 0.08)');
            ctx.fillStyle = gradient;
            ctx.fillRect(0, 0, canvas.width, canvas.height);
        }

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
        { id: 'general-minimal', name: '⬜ Minimal' },
        { id: 'general-dark', name: '🌙 Dunkel' }
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
        playSound(clickSound);
    });
});

// ===========================
// STICKER SYSTEM
// ===========================
const placedStickers = document.getElementById('placedStickers');
let stickerCount = 0;

document.querySelectorAll('.sticker').forEach(btn => {
    btn.addEventListener('click', () => {
        if (stickerCount >= 10) {
            showToast('Maximal 10 Sticker pro Karte!', 'warning');
            return;
        }

        const emoji = btn.dataset.emoji;
        const sticker = document.createElement('span');
        sticker.className = 'placed-sticker';
        sticker.textContent = emoji;
        sticker.style.left = (20 + Math.random() * 60) + '%';
        sticker.style.top = (20 + Math.random() * 60) + '%';

        // Make sticker draggable
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
    });
});

// Drag functionality
let currentDrag = null;
let dragOffset = { x: 0, y: 0 };

function startDrag(e) {
    e.preventDefault();
    currentDrag = e.target;
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

// ===========================
// MINI FRAME BUTTONS
// ===========================
document.querySelectorAll('.frame-mini').forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelectorAll('.frame-mini').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        greetingCard.setAttribute('data-frame', btn.dataset.frame);
        playSound(clickSound);
    });
});

function updateFloatingEmojis(occasion) {
    const decorations = document.getElementById('cardDecorations');
    const emojis = occasionEmojis[occasion] || occasionEmojis.general;

    decorations.innerHTML = emojis.map(emoji =>
        `<span class="floating-emoji">${emoji}</span>`
    ).join('');

    greetingCard.setAttribute('data-occasion', occasion);
}

// ===========================
// STYLE TABS
// ===========================
document.querySelectorAll('.style-tab').forEach(tab => {
    tab.addEventListener('click', () => {
        document.querySelectorAll('.style-tab').forEach(t => t.classList.remove('active'));
        tab.classList.add('active');

        const panel = tab.dataset.tab;
        document.getElementById('themesPanel')?.classList.toggle('hidden', panel !== 'themes');
        document.getElementById('textPanel')?.classList.toggle('hidden', panel !== 'text');
        document.getElementById('framePanel')?.classList.toggle('hidden', panel !== 'frame');
        document.getElementById('uploadPanel')?.classList.toggle('hidden', panel !== 'upload');

        playSound(clickSound);
    });
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
        cardCustomBg.style.backgroundImage = `url(${e.target.result})`;
        greetingCard.classList.add('has-custom-bg');
        removeBgBtn?.classList.remove('hidden');
        playSound(successSound);
        showToast('Bild hochgeladen! 🎨', 'success');
    };
    reader.readAsDataURL(file);
}

removeBgBtn?.addEventListener('click', () => {
    cardCustomBg.style.backgroundImage = '';
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
    historyBadge.textContent = history.length;

    if (history.length === 0) {
        historyList.innerHTML = '<p class="empty-history">Noch keine Grüße erstellt. Starte jetzt! 🚀</p>';
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
        getwell: '💊 Gute Besserung',
        mothersday: '👩‍👧 Muttertag',
        fathersday: '👨‍👦 Vatertag',
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
document.getElementById('copyBtn').addEventListener('click', () => {
    navigator.clipboard.writeText(generatedMessage.textContent)
        .then(() => {
            playSound(clickSound);
            showToast('Text kopiert! 📋', 'success');
        })
        .catch(() => showToast('Kopieren fehlgeschlagen 😞', 'error'));
});

// WhatsApp share
document.getElementById('whatsappBtn').addEventListener('click', () => {
    playSound(clickSound);
    const text = encodeURIComponent(generatedMessage.textContent + '\n\n💌 Erstellt mit grussgenerator.de');
    window.open(`https://wa.me/?text=${text}`, '_blank');
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
    playSound(clickSound);
    showToast('Bild wird erstellt... 📸', 'info');

    const card = document.getElementById('greetingCard');
    const ttsBtn = document.getElementById('ttsBtn');
    const messageHeader = card.querySelector('.message-header');

    // Hide TTS button for screenshot
    if (ttsBtn) ttsBtn.style.display = 'none';
    if (messageHeader) messageHeader.style.display = 'none';

    const canvas = await html2canvas(card, {
        backgroundColor: null,
        scale: 2,
        useCORS: true
    });

    // Restore TTS button
    if (ttsBtn) ttsBtn.style.display = '';
    if (messageHeader) messageHeader.style.display = '';

    const link = document.createElement('a');
    link.download = `gruss-${Date.now()}.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();

    playSound(successSound);
    showToast('Bild heruntergeladen! 🎉', 'success');
});

// Twitter share
document.getElementById('twitterBtn')?.addEventListener('click', () => {
    playSound(clickSound);
    const text = encodeURIComponent('Gerade einen tollen Gruß erstellt! 💌 Probiere es selbst: grussgenerator.de');
    window.open(`https://twitter.com/intent/tweet?text=${text}`, '_blank');
});

// Telegram share
document.getElementById('telegramBtn')?.addEventListener('click', () => {
    playSound(clickSound);
    const text = encodeURIComponent(generatedMessage.textContent + '\n\n💌 grussgenerator.de');
    window.open(`https://t.me/share/url?url=https://grussgenerator.de&text=${text}`, '_blank');
});

// Facebook share
document.getElementById('facebookBtn')?.addEventListener('click', () => {
    playSound(clickSound);
    window.open('https://www.facebook.com/sharer/sharer.php?u=https://grussgenerator.de', '_blank');
});

// Text-to-Speech with toggle
let isSpeaking = false;

document.getElementById('ttsBtn').addEventListener('click', () => {
    playSound(clickSound);

    if (!('speechSynthesis' in window)) {
        showToast('Vorlesen nicht unterstützt 😞', 'error');
        return;
    }

    const ttsBtn = document.getElementById('ttsBtn');

    if (isSpeaking) {
        // Stop speaking
        speechSynthesis.cancel();
        isSpeaking = false;
        ttsBtn.textContent = '🔊';
        ttsBtn.title = 'Vorlesen';
        showToast('Vorlesen gestoppt ⏹️', 'info');
    } else {
        // Start speaking
        const utterance = new SpeechSynthesisUtterance(generatedMessage.textContent);
        utterance.lang = currentLanguage === 'de' ? 'de-DE' :
            currentLanguage === 'en' ? 'en-US' :
                currentLanguage === 'es' ? 'es-ES' :
                    currentLanguage === 'fr' ? 'fr-FR' :
                        currentLanguage === 'tr' ? 'tr-TR' :
                            currentLanguage === 'it' ? 'it-IT' : 'de-DE';

        utterance.onend = () => {
            isSpeaking = false;
            ttsBtn.textContent = '🔊';
            ttsBtn.title = 'Vorlesen';
        };

        speechSynthesis.speak(utterance);
        isSpeaking = true;
        ttsBtn.textContent = '⏹️';
        ttsBtn.title = 'Stoppen';
        showToast('Wird vorgelesen... 🔊', 'info');
    }
});

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
const cardCustomBg = document.getElementById('cardCustomBg');
const removeBgBtn = document.getElementById('removeBgBtn');

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
                cardCustomBg.style.backgroundImage = `url(${e.target.result})`;
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
    if (cardCustomBg) cardCustomBg.style.backgroundImage = '';
    greetingCard.classList.remove('has-custom-bg');
    removeBgBtn?.classList.add('hidden');
    // Also reset input so same file can be selected again
    if (bgUpload) bgUpload.value = '';
    playSound(clickSound);
});

// Sticker Upload
uploadStickerZone?.addEventListener('click', () => stickerUpload?.click());

stickerUpload?.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (file) {
        if (stickerCount >= 15) { // Higher limit for images? Keep same for consistency
            showToast('Zu viele Elemente auf der Karte!', 'warning');
            return;
        }

        const reader = new FileReader();
        reader.onload = (e) => {
            const sticker = document.createElement('span');
            sticker.className = 'placed-sticker image-sticker';
            sticker.innerHTML = `<img src="${e.target.result}" style="width: 100px; height: auto; pointer-events: none; display: block;">`;

            sticker.style.left = '40%';
            sticker.style.top = '40%';

            // Drag support
            sticker.addEventListener('mousedown', startDrag);
            sticker.addEventListener('touchstart', startDrag);

            // Remove
            sticker.addEventListener('dblclick', () => {
                sticker.remove();
                stickerCount--;
                playSound(clickSound);
            });

            placedStickers?.appendChild(sticker);
            stickerCount++;
            playSound(successSound);
            showToast('Bild als Sticker hinzugefügt! 🧩', 'success');
        };
        reader.readAsDataURL(file);

        // Reset input
        stickerUpload.value = '';
    }
});

// ===========================
// INIT
// ===========================
document.addEventListener('DOMContentLoaded', () => {
    initBackground();
    loadHistory();
    updateTotalCounter();
    updateLiveCounter();

    // Apply initial language
    if (typeof applyTranslations === 'function') {
        applyTranslations(currentLanguage);
    }

    // Preload sounds
    if (clickSound) clickSound.load();
    if (successSound) successSound.load();
});
