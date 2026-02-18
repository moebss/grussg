// ===========================
// PARTNER PAGE - FULL SPA
// Supabase Auth + Generator Dashboard
// ===========================

const SUPABASE_URL = 'https://bkfscfmfmkpylrcmjbhe.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJrZnNjZm1mbWtweWxyY21qYmhlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzgxODUwMDQsImV4cCI6MjA1Mzc2MTAwNH0.5VTSBJJc8lI91FhflUWHBYaRmIitLMJA6nnBSEYZNv4';

const API_ENDPOINT = '/api/generate-greeting';
const TOTAL_MOODS = 27;
let currentUser = null;
let currentOccasion = 'birthday';

// ===========================
// SUPABASE AUTH
// ===========================
async function initAuth() {
    try {
        const res = await fetch(`${SUPABASE_URL}/auth/v1/user`, {
            headers: { 'Authorization': `Bearer ${localStorage.getItem('sb_access_token')}`, 'apikey': SUPABASE_ANON_KEY }
        });
        if (res.ok) {
            const data = await res.json();
            if (data && data.email) { setUser(data); }
        }
    } catch (e) { /* not logged in */ }

    // Check URL for auth callback
    const hash = window.location.hash;
    if (hash && hash.includes('access_token')) {
        const params = new URLSearchParams(hash.substring(1));
        const accessToken = params.get('access_token');
        const refreshToken = params.get('refresh_token');
        if (accessToken) {
            localStorage.setItem('sb_access_token', accessToken);
            if (refreshToken) localStorage.setItem('sb_refresh_token', refreshToken);
            const userRes = await fetch(`${SUPABASE_URL}/auth/v1/user`, {
                headers: { 'Authorization': `Bearer ${accessToken}`, 'apikey': SUPABASE_ANON_KEY }
            });
            if (userRes.ok) {
                const userData = await userRes.json();
                setUser(userData);
            }
            window.history.replaceState(null, '', window.location.pathname);
        }
    }
}

function setUser(user) {
    currentUser = user;
    const name = user.user_metadata?.full_name || user.email?.split('@')[0] || 'User';
    const avatar = user.user_metadata?.avatar_url || '';

    document.getElementById('navAvatar').src = avatar;
    document.getElementById('navName').textContent = name;
    document.getElementById('navUser').classList.remove('hidden');
    document.getElementById('loginBtnNav').classList.add('hidden');
    document.getElementById('navLinksLanding').classList.add('hidden');

    showDashboard();
}

function loginWithGoogle() {
    const redirectUrl = window.location.origin + window.location.pathname;
    window.location.href = `${SUPABASE_URL}/auth/v1/authorize?provider=google&redirect_to=${encodeURIComponent(redirectUrl)}`;
}
window.loginWithGoogle = loginWithGoogle;

function logout() {
    localStorage.removeItem('sb_access_token');
    localStorage.removeItem('sb_refresh_token');
    currentUser = null;
    document.getElementById('navUser').classList.add('hidden');
    document.getElementById('loginBtnNav').classList.remove('hidden');
    document.getElementById('navLinksLanding').classList.remove('hidden');
    showLanding();
}

function showDashboard() {
    document.getElementById('viewLanding').classList.add('hidden');
    document.getElementById('viewDashboard').classList.remove('hidden');
    document.getElementById('dashStep1').classList.remove('hidden');
    document.getElementById('dashStep2').classList.add('hidden');
    renderMoods();
}

function showLanding() {
    document.getElementById('viewLanding').classList.remove('hidden');
    document.getElementById('viewDashboard').classList.add('hidden');
}

// ===========================
// LIVE DEMO (Landing Page)
// ===========================
document.getElementById('demoGenBtn')?.addEventListener('click', async () => {
    const btn = document.getElementById('demoGenBtn');
    const name = document.getElementById('demoName').value || 'Maria';
    const occasion = document.getElementById('demoOccasion').value;
    const tone = document.getElementById('demoTone').value;

    btn.disabled = true;
    btn.textContent = '⏳ Generiert...';
    document.getElementById('demoCardText').textContent = 'Die KI denkt nach...';

    try {
        const res = await fetch(API_ENDPOINT, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, occasion, tone, relation: 'friend', lang: 'de' })
        });
        const data = await res.json();
        if (data.text) {
            document.getElementById('demoCardText').textContent = data.text;
            const mood = Math.floor(Math.random() * TOTAL_MOODS) + 1;
            document.getElementById('demoCardBg').src = `assets/templates/mood${mood}.jpg`;
            document.getElementById('demoMeta').textContent = `✅ Generiert in <2s | Design: mood${mood} | ${occasion} / ${tone}`;
        } else {
            document.getElementById('demoCardText').textContent = data.error || 'Fehler bei der Generierung.';
        }
    } catch (e) {
        document.getElementById('demoCardText').textContent = 'Verbindungsfehler. Bitte erneut versuchen.';
    }
    btn.disabled = false;
    btn.textContent = '✨ Text generieren';
});

// ===========================
// DASHBOARD - TEXT GENERATION
// ===========================
// Occasion selection
document.querySelectorAll('#dashForm .occasion-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelectorAll('#dashForm .occasion-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        currentOccasion = btn.dataset.occasion;
    });
});

document.getElementById('dashForm')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const btn = document.getElementById('dashGenBtn');
    const btnText = btn.querySelector('.btn-text');
    const btnLoading = btn.querySelector('.btn-loading');

    btnText.classList.add('hidden');
    btnLoading.classList.remove('hidden');
    btn.disabled = true;

    const name = document.getElementById('dashName').value;
    const relation = document.getElementById('dashRelation').value;
    const info = document.getElementById('dashInfo').value;
    const tone = document.getElementById('dashTone').value;
    const lang = document.getElementById('dashLang').value;

    try {
        const res = await fetch(API_ENDPOINT, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, relation, info, tone, lang, occasion: currentOccasion })
        });
        const data = await res.json();
        if (data.text) {
            document.getElementById('generatedMessage').textContent = data.text;
            // Show editor
            document.getElementById('dashStep1').classList.add('hidden');
            document.getElementById('dashStep2').classList.remove('hidden');
            // Set random mood
            const mood = Math.floor(Math.random() * TOTAL_MOODS) + 1;
            applyMood(mood);
            showToast('✨ Gruß generiert!', 'success');
        } else {
            showToast(data.error || 'Fehler bei der Generierung.', 'error');
        }
    } catch (e) {
        showToast('Verbindungsfehler. Bitte erneut versuchen.', 'error');
    }

    btnText.classList.remove('hidden');
    btnLoading.classList.add('hidden');
    btn.disabled = false;
});

// Back to form
document.getElementById('backToForm')?.addEventListener('click', () => {
    document.getElementById('dashStep1').classList.remove('hidden');
    document.getElementById('dashStep2').classList.add('hidden');
});

// New card
document.getElementById('newCardBtn')?.addEventListener('click', () => {
    document.getElementById('dashStep1').classList.remove('hidden');
    document.getElementById('dashStep2').classList.add('hidden');
    document.getElementById('dashForm').reset();
    document.querySelectorAll('#dashForm .occasion-btn').forEach(b => b.classList.remove('active'));
    document.querySelector('#dashForm .occasion-btn[data-occasion="birthday"]').classList.add('active');
    currentOccasion = 'birthday';
    clearStickers();
});

// ===========================
// CARD EDITOR - MOODS
// ===========================
function renderMoods() {
    const container = document.getElementById('staticMoodsContainer');
    if (!container) return;
    container.innerHTML = '';
    for (let i = 1; i <= TOTAL_MOODS; i++) {
        const btn = document.createElement('button');
        btn.className = 'mood-btn' + (i === 1 ? ' active' : '');
        btn.style.backgroundImage = `url(assets/templates/mood${i}.jpg)`;
        btn.dataset.mood = i;
        btn.title = `Design ${i}`;
        btn.addEventListener('click', () => {
            document.querySelectorAll('.mood-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            applyMood(i);
        });
        container.appendChild(btn);
    }
}

function applyMood(moodNum) {
    const card = document.getElementById('greetingCard');
    card.style.backgroundImage = `url(assets/templates/mood${moodNum}.jpg)`;
    card.dataset.mood = moodNum;
    // Hide custom bg
    const customBg = document.getElementById('cardCustomBg');
    if (customBg) { customBg.classList.add('hidden'); customBg.src = ''; }
    document.getElementById('removeBgBtn')?.classList.add('hidden');
    // Update active state
    document.querySelectorAll('.mood-btn').forEach(b => {
        b.classList.toggle('active', b.dataset.mood == moodNum);
    });
}

// Remix button
document.getElementById('remixBtn')?.addEventListener('click', () => {
    const mood = Math.floor(Math.random() * TOTAL_MOODS) + 1;
    applyMood(mood);
    showToast(`🎲 Design ${mood} gewählt!`, 'info');
});

// ===========================
// STICKERS
// ===========================
// Tab switching
document.querySelectorAll('.sticker-tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelectorAll('.sticker-tab-btn').forEach(b => b.classList.remove('active'));
        document.querySelectorAll('.sticker-tab-content').forEach(c => { c.classList.remove('active'); c.classList.add('hidden'); });
        btn.classList.add('active');
        const tab = document.getElementById(`tab-${btn.dataset.tab}`);
        if (tab) { tab.classList.add('active'); tab.classList.remove('hidden'); }
    });
});

// Place sticker
document.querySelectorAll('.sticker').forEach(btn => {
    btn.addEventListener('click', () => {
        const container = document.getElementById('placedStickers');
        const el = document.createElement('div');
        el.className = 'placed-sticker';
        el.textContent = btn.dataset.emoji;
        el.style.left = `${30 + Math.random() * 40}%`;
        el.style.top = `${20 + Math.random() * 50}%`;
        el.style.fontSize = `${1.5 + Math.random() * 1.5}rem`;
        el.style.transform = `rotate(${-20 + Math.random() * 40}deg)`;
        // Make draggable
        let isDragging = false, startX, startY, origX, origY;
        el.addEventListener('pointerdown', (e) => {
            isDragging = true;
            startX = e.clientX; startY = e.clientY;
            const rect = el.getBoundingClientRect();
            const parentRect = container.getBoundingClientRect();
            origX = rect.left - parentRect.left; origY = rect.top - parentRect.top;
            el.style.cursor = 'grabbing';
            e.preventDefault();
        });
        document.addEventListener('pointermove', (e) => {
            if (!isDragging) return;
            const dx = e.clientX - startX, dy = e.clientY - startY;
            el.style.left = `${origX + dx}px`; el.style.top = `${origY + dy}px`;
        });
        document.addEventListener('pointerup', () => { isDragging = false; el.style.cursor = 'grab'; });
        // Double-click to remove
        el.addEventListener('dblclick', () => el.remove());
        container.appendChild(el);
    });
});

function clearStickers() {
    const container = document.getElementById('placedStickers');
    if (container) container.innerHTML = '';
}
document.getElementById('clearStickersBtn')?.addEventListener('click', clearStickers);

// ===========================
// DESIGN PANEL TABS
// ===========================
document.querySelectorAll('.design-tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelectorAll('.design-tab-btn').forEach(b => b.classList.remove('active'));
        document.querySelectorAll('.design-tab-content').forEach(c => { c.classList.remove('active'); c.classList.add('hidden'); });
        btn.classList.add('active');
        const tab = document.getElementById(`design-tab-${btn.dataset.tab}`);
        if (tab) { tab.classList.add('active'); tab.classList.remove('hidden'); }
    });
});

// ===========================
// TEXT EFFECTS
// ===========================
document.getElementById('textColorPicker')?.addEventListener('input', (e) => {
    document.getElementById('generatedMessage').style.color = e.target.value;
});

document.getElementById('textSizeSlider')?.addEventListener('input', (e) => {
    document.getElementById('generatedMessage').style.fontSize = `${e.target.value}rem`;
});

// Effects toggles
['effectShadow', 'effectOutline', 'effectGlow'].forEach(id => {
    document.getElementById(id)?.addEventListener('click', () => {
        const btn = document.getElementById(id);
        btn.classList.toggle('active');
        updateTextEffects();
    });
});

function updateTextEffects() {
    const msg = document.getElementById('generatedMessage');
    const shadows = [];
    if (document.getElementById('effectShadow')?.classList.contains('active')) {
        shadows.push('2px 2px 8px rgba(0,0,0,0.5)');
    }
    if (document.getElementById('effectOutline')?.classList.contains('active')) {
        shadows.push('-1px -1px 0 rgba(0,0,0,0.3), 1px -1px 0 rgba(0,0,0,0.3), -1px 1px 0 rgba(0,0,0,0.3), 1px 1px 0 rgba(0,0,0,0.3)');
    }
    if (document.getElementById('effectGlow')?.classList.contains('active')) {
        shadows.push('0 0 10px rgba(255,255,255,0.5), 0 0 20px rgba(255,255,255,0.3)');
    }
    msg.style.textShadow = shadows.join(', ') || 'none';
}

// Font selection
document.querySelectorAll('.font-mini').forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelectorAll('.font-mini').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        document.getElementById('generatedMessage').style.fontFamily = btn.dataset.font;
    });
});

// ===========================
// IMAGE UPLOAD
// ===========================
document.getElementById('uploadBgZone')?.addEventListener('click', () => {
    document.getElementById('bgUpload').click();
});
document.getElementById('bgUpload')?.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
        const customBg = document.getElementById('cardCustomBg');
        customBg.src = ev.target.result;
        customBg.classList.remove('hidden');
        document.getElementById('greetingCard').style.backgroundImage = 'none';
        document.getElementById('removeBgBtn').classList.remove('hidden');
        document.querySelectorAll('.mood-btn').forEach(b => b.classList.remove('active'));
    };
    reader.readAsDataURL(file);
});

document.getElementById('removeBgBtn')?.addEventListener('click', () => {
    const customBg = document.getElementById('cardCustomBg');
    customBg.src = ''; customBg.classList.add('hidden');
    document.getElementById('removeBgBtn').classList.add('hidden');
    applyMood(1);
});

document.getElementById('uploadStickerZone')?.addEventListener('click', () => {
    document.getElementById('stickerUpload').click();
});
document.getElementById('stickerUpload')?.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
        const container = document.getElementById('placedStickers');
        const img = document.createElement('img');
        img.src = ev.target.result;
        img.className = 'placed-sticker';
        img.style.left = '30%'; img.style.top = '30%';
        img.style.width = '80px'; img.style.height = 'auto';
        img.style.pointerEvents = 'all'; img.style.cursor = 'grab';
        // Draggable
        let isDragging = false, startX, startY, origX, origY;
        img.addEventListener('pointerdown', (e) => {
            isDragging = true; startX = e.clientX; startY = e.clientY;
            const rect = img.getBoundingClientRect();
            const pRect = container.getBoundingClientRect();
            origX = rect.left - pRect.left; origY = rect.top - pRect.top;
            e.preventDefault();
        });
        document.addEventListener('pointermove', (e) => {
            if (!isDragging) return;
            img.style.left = `${origX + e.clientX - startX}px`;
            img.style.top = `${origY + e.clientY - startY}px`;
        });
        document.addEventListener('pointerup', () => { isDragging = false; });
        img.addEventListener('dblclick', () => img.remove());
        container.appendChild(img);
    };
    reader.readAsDataURL(file);
});

// ===========================
// DOWNLOAD
// ===========================
document.getElementById('downloadBtn')?.addEventListener('click', async () => {
    const card = document.getElementById('greetingCard');
    const btn = document.getElementById('downloadBtn');
    btn.disabled = true;
    btn.innerHTML = '<span>⏳</span> Wird erstellt...';
    try {
        const dataUrl = await htmlToImage.toPng(card, { quality: 0.95, pixelRatio: 2 });
        const link = document.createElement('a');
        link.download = `grusskarte_${Date.now()}.png`;
        link.href = dataUrl;
        link.click();
        showToast('📸 Karte gespeichert!', 'success');
    } catch (e) {
        console.error('Download error:', e);
        showToast('Fehler beim Speichern. Bitte erneut versuchen.', 'error');
    }
    btn.disabled = false;
    btn.innerHTML = '<span>📸</span> Als Bild speichern';
});

// Copy text
document.getElementById('copyTextBtn')?.addEventListener('click', () => {
    const text = document.getElementById('generatedMessage')?.textContent;
    if (text) {
        navigator.clipboard.writeText(text);
        showToast('📋 Text kopiert!', 'success');
    }
});

// ===========================
// TOAST
// ===========================
function showToast(message, type = 'info') {
    const container = document.getElementById('toastContainer');
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.textContent = message;
    container.appendChild(toast);
    setTimeout(() => toast.remove(), 3000);
}

// ===========================
// NAV EVENTS
// ===========================
document.getElementById('loginBtnNav')?.addEventListener('click', loginWithGoogle);
document.getElementById('loginBtnHero')?.addEventListener('click', loginWithGoogle);
document.getElementById('logoutBtn')?.addEventListener('click', logout);

// ===========================
// INIT
// ===========================
document.addEventListener('DOMContentLoaded', () => {
    initAuth();
});
