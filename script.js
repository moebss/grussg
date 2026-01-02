// ===========================
// CONFIGURATION
// ===========================
const LAUNCH_DATE = new Date('2026-03-01T00:00:00'); // Adjust launch date

// ===========================
// TYPEWRITER EFFECT
// ===========================
const texts = [
    'jeden Anlass. 🎉',
    'Geburtstage. 🎂',
    'Hochzeiten. 💍',
    'Neujahr. 🎆',
    'Weihnachten. 🎄',
    'jede Feier. 🥳'
];

let textIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typewriterElement = document.getElementById('typewriter');

function typeWriter() {
    const currentText = texts[textIndex];

    if (isDeleting) {
        typewriterElement.textContent = currentText.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typewriterElement.textContent = currentText.substring(0, charIndex + 1);
        charIndex++;
    }

    if (!isDeleting && charIndex === currentText.length) {
        setTimeout(() => isDeleting = true, 2000);
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        textIndex = (textIndex + 1) % texts.length;
    }

    const speed = isDeleting ? 50 : 100;
    setTimeout(typeWriter, speed);
}

// ===========================
// PARTICLE ANIMATION
// ===========================
function initParticles() {
    const canvas = document.getElementById('particleCanvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let particles = [];

    function resize() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    window.addEventListener('resize', resize);
    resize();

    class Particle {
        constructor() {
            this.reset();
        }

        reset() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.vx = (Math.random() - 0.5) * 0.5;
            this.vy = (Math.random() - 0.5) * 0.5;
            this.size = Math.random() * 2;
            this.alpha = Math.random() * 0.5 + 0.2;
        }

        update() {
            this.x += this.vx;
            this.y += this.vy;

            if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
            if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
        }

        draw() {
            ctx.fillStyle = `rgba(255, 215, 0, ${this.alpha})`;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    for (let i = 0; i < 80; i++) {
        particles.push(new Particle());
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach(p => {
            p.update();
            p.draw();
        });
        requestAnimationFrame(animate);
    }

    animate();
}

// ===========================
// CONFETTI EXPLOSION
// ===========================
function createConfetti() {
    const container = document.getElementById('confettiContainer');
    const colors = ['#ffd700', '#c77dff', '#00d9ff', '#ff006e', '#ff9500'];

    for (let i = 0; i < 100; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        confetti.style.left = Math.random() * 100 + '%';
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.animationDelay = Math.random() * 0.5 + 's';
        confetti.style.animationDuration = (Math.random() * 2 + 2) + 's';
        container.appendChild(confetti);

        setTimeout(() => confetti.remove(), 4000);
    }
}

// ===========================
// COUNTDOWN TIMER
// ===========================
function updateCountdown() {
    const now = new Date();
    const distance = LAUNCH_DATE - now;

    if (distance < 0) {
        document.getElementById('days').textContent = '00';
        document.getElementById('hours').textContent = '00';
        document.getElementById('minutes').textContent = '00';
        return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));

    document.getElementById('days').textContent = String(days).padStart(2, '0');
    document.getElementById('hours').textContent = String(hours).padStart(2, '0');
    document.getElementById('minutes').textContent = String(minutes).padStart(2, '0');
}

// ===========================
// DEMO TEXT EXAMPLES
// ===========================
// ===========================
// DEMO TEXT EXAMPLES & THEMES
// ===========================
const demoData = [
    {
        type: "Geburtstag",
        text: "Liebe Anna, zu deinem Geburtstag wünsche ich dir von Herzen alles Glück dieser Welt! Möge das neue Lebensjahr voller wundervoller Momente, unvergesslicher Abenteuer und strahlender Sonnentage sein. 🎂✨",
        theme: "theme-birthday",
        icon: "🎂"
    },
    {
        type: "Hochzeit",
        text: "Lieber Michael, herzlichen Glückwunsch zur Hochzeit! Möge eure gemeinsame Reise voller Liebe, Lachen und unvergesslicher Momente sein. Auf viele glückliche Jahre zusammen! 💍❤️",
        theme: "theme-wedding",
        icon: "💍"
    },
    {
        type: "Neujahr",
        text: "Eine frohes neues Jahr 2026! Möge es uns allen Erfolg, Gesundheit und viele gemeinsame Highlights bringen. Auf ein großartiges Jahr! 🎆🥂",
        theme: "theme-newyear",
        icon: "🎆"
    },
    {
        type: "Baby",
        text: "Willkommen auf der Welt, kleiner Schatz! Wir wünschen euch eine wundervolle Kennenlernzeit und alles Glück der Erde für eure kleine Familie. 👶🍼",
        theme: "theme-baby",
        icon: "👶"
    }
];

let currentDemoIndex = 0;

function showDemoText() {
    const demoCard = document.querySelector('.demo-card');
    const demoBody = document.querySelector('.demo-card-body');
    const demoText = document.getElementById('demoText');
    const demoLabel = document.querySelector('.demo-label');

    // Fade out
    demoBody.style.opacity = '0';
    demoLabel.style.opacity = '0';

    setTimeout(() => {
        const data = demoData[currentDemoIndex];

        // Update Content
        demoText.textContent = data.text;
        demoLabel.textContent = `Beispiel: ${data.type} ${data.icon}`;

        // Update Theme Classes
        demoCard.className = `demo-card ${data.theme}`;

        // Fade in
        demoBody.style.opacity = '1';
        demoLabel.style.opacity = '1';

        currentDemoIndex = (currentDemoIndex + 1) % demoData.length;
    }, 300);
}

// ===========================
// FAQ ACCORDION
// ===========================
function initFAQ() {
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');

            // Close all
            faqItems.forEach(i => i.classList.remove('active'));

            // Open clicked if it wasn't active
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });
}

// ===========================
// NEWSLETTER FORM HANDLING
// ===========================
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('subscribeForm');
    const formContainer = document.getElementById('formContainer');
    const successMessage = document.getElementById('successMessage');
    const submitBtn = document.getElementById('submitBtn');
    const subscriberCountEl = document.getElementById('subscriberCount');

    // Initialize features
    typeWriter();
    initParticles();
    updateCountdown();
    setInterval(updateCountdown, 60000); // Update every minute
    initTiltExample(); // 3D Tilt

    // Continue execution...

    // ===========================
    // 3D TILT EFFECT
    // ===========================
    function initTiltExample() {
        const card = document.querySelector('.newsletter-card');
        if (!card) return;

        document.addEventListener('mousemove', (e) => {
            if (window.innerWidth < 768) return; // Disable on mobile to save battery

            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            // Calculate center relative position
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            // Max tilt rotation (degrees)
            const maxTilt = 10;

            // Calculate rotation based on cursor distance from center
            // But only if cursor is near the card to avoid extreme tilts
            const mouseX = (e.clientX - (rect.left + centerX)) / centerX;
            const mouseY = (e.clientY - (rect.top + centerY)) / centerY;

            // Apply tilt to card content wrapper inside (if exists) or card itself
            // Using requestAnimationFrame for performance
            if (Math.abs(mouseX) < 2 && Math.abs(mouseY) < 2) {
                card.style.transform = `perspective(1000px) rotateY(${mouseX * maxTilt}deg) rotateX(${-mouseY * maxTilt}deg)`;
            } else {
                // Reset smoothly
                card.style.transform = `perspective(1000px) rotateY(0deg) rotateX(0deg)`;
            }
        });

        // Add transition for smooth reset
        card.style.transition = 'transform 0.1s ease-out';
    }

    // Show first demo text
    setTimeout(showDemoText, 1000);

    // Demo refresh button
    const demoRefreshBtn = document.getElementById('demoRefresh');
    if (demoRefreshBtn) {
        demoRefreshBtn.addEventListener('click', showDemoText);
    }

    // Initialize FAQ
    initFAQ();

    // Increment subscriber count randomly (for demo)
    let currentCount = parseInt(subscriberCountEl.textContent);
    setInterval(() => {
        if (Math.random() > 0.7) {
            currentCount += Math.floor(Math.random() * 3) + 1;
            subscriberCountEl.textContent = currentCount;
        }
    }, 10000);

    // Form submission
    if (form) {
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            const email = document.getElementById('email').value.trim();

            // Loading state
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<span>Wird geladen... ⏳</span>';

            try {
                const response = await fetch('/api/subscribe', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        email: email,
                        source: 'grussgenerator_landingpage'
                    })
                });

                const data = await response.json();

                if (response.ok) {
                    // Success - hide form, show success message
                    formContainer.style.display = 'none';
                    successMessage.style.display = 'block';

                    // Trigger confetti
                    createConfetti();

                    // Increment counter
                    currentCount++;
                    subscriberCountEl.textContent = currentCount;
                } else {
                    throw new Error(data.error || 'Fehler beim Abonnieren');
                }
            } catch (err) {
                console.error('Subscription error:', err);
                alert('Ups! Da ist was schiefgelaufen: ' + err.message);
                submitBtn.disabled = false;
                submitBtn.innerHTML = '<span>Erinnert mich! 🚀</span>';
            }
        });
    }

    // Smooth scroll for internal links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe all sections
    document.querySelectorAll('.section').forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'all 0.8s ease';
        observer.observe(section);
    });
});

// ===========================
// VIRAL LOOP LOGIC
// ===========================
function shareVia(platform) {
    const url = 'https://grussgenerator.de';
    const text = 'Warteliste geöffnet! 🚀 Hol dir perfekte KI-Grüße für jeden Anlass. Early Access hier:';

    if (platform === 'whatsapp') {
        window.open(`https://wa.me/?text=${encodeURIComponent(text + ' ' + url)}`, '_blank');
    } else if (platform === 'twitter') {
        window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`, '_blank');
    } else if (platform === 'copy') {
        navigator.clipboard.writeText(url).then(() => {
            alert('Link kopiert! Jetzt Freunden schicken. 🚀');
        });
    }
}
