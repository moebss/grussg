(function () {
    const COOKIE_CONSENT_KEY = 'cookie_consent_status';

    // TODO: Replace with your actual IDs
    const GTM_ID = 'G-XXXXXXXXXX'; // Google Analytics Measurement ID
    const ADS_ID = 'AW-XXXXXXXXXX'; // Google Ads ID

    function loadGoogleScripts() {
        // Prevent loading if already loaded
        if (window.googleScriptsLoaded) return;
        window.googleScriptsLoaded = true;

        console.log('Loading Google Analytics & Ads scripts...');

        // 1. Load the gtag.js script
        const script = document.createElement('script');
        script.async = true;
        // Use GTM_ID or ADS_ID here? Usually one is enough to bootstrap gtag, let's use GTM_ID (GA4)
        script.src = `https://www.googletagmanager.com/gtag/js?id=${GTM_ID}`;
        document.head.appendChild(script);

        // 2. Initialize dataLayer
        window.dataLayer = window.dataLayer || [];
        function gtag() { dataLayer.push(arguments); }
        gtag('js', new Date());

        // 3. Config for GA4
        gtag('config', GTM_ID, {
            'anonymize_ip': true
        });

        // 4. Config for Google Ads
        gtag('config', ADS_ID);

        console.log('Google Analytics & Ads initialized.');
    }

    function createBanner() {
        // Check if banner already exists
        if (document.getElementById('cookie-banner')) return;

        const banner = document.createElement('div');
        banner.id = 'cookie-banner';
        banner.innerHTML = `
            <div class="cookie-content">
                <h3>🍪 Wir nutzen Cookies</h3>
                <p>
                    Wir nutzen Cookies und Tracking-Technologien (Google Analytics, Google Ads), um unsere Website zu optimieren und dir relevante Inhalte anzuzeigen.
                    Deine Einwilligung ist freiwillig und kann jederzeit widerrufen werden.
                    <a href="datenschutz.html" target="_blank">Datenschutzerklärung</a> | <a href="impressum.html" target="_blank">Impressum</a>
                </p>
                <div class="cookie-buttons">
                    <button id="cookie-decline" class="btn-cookie-decline">Ablehnen</button>
                    <button id="cookie-accept" class="btn-cookie-accept">Akzeptieren</button>
                </div>
            </div>
        `;
        document.body.appendChild(banner);

        // Event Listeners
        document.getElementById('cookie-accept').addEventListener('click', () => {
            localStorage.setItem(COOKIE_CONSENT_KEY, 'accepted');
            banner.style.opacity = '0';
            banner.style.transform = 'translateY(100%)';
            setTimeout(() => banner.remove(), 500);
            loadGoogleScripts();
        });

        document.getElementById('cookie-decline').addEventListener('click', () => {
            localStorage.setItem(COOKIE_CONSENT_KEY, 'declined');
            banner.style.opacity = '0';
            banner.style.transform = 'translateY(100%)';
            setTimeout(() => banner.remove(), 500);
        });
    }

    // Main Logic
    const consent = localStorage.getItem(COOKIE_CONSENT_KEY);

    if (consent === 'accepted') {
        loadGoogleScripts(); // Load immediately if previously accepted
    } else if (consent === 'declined') {
        // Do nothing / explicitly strict mode if needed
        console.log('Tracking declined by user.');
    } else {
        // No choice made yet -> Show Banner
        // Wait for DOM to be ready if script is in HEAD
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', createBanner);
        } else {
            createBanner();
        }
    }
})();
