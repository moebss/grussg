export default async (req, res) => {
    // ===========================
    // B2B API ENDPOINT
    // Authenticated via x-api-key header
    // Higher rate limits than consumer API
    // ===========================

    // CORS: Allow any origin (API key replaces origin check)
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, x-api-key');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Only POST requests allowed' });
    }

    // --- API KEY AUTHENTICATION ---
    const apiKey = req.headers['x-api-key'];

    if (!apiKey) {
        return res.status(401).json({
            error: 'Missing API key. Include x-api-key header.',
            docs: 'https://grussgenerator.de/api-partner.html#docs'
        });
    }

    // Check against allowed API keys (comma-separated in env var)
    const allowedKeys = (process.env.B2B_API_KEYS || '').split(',').map(k => k.trim()).filter(Boolean);

    if (allowedKeys.length === 0) {
        console.error('B2B_API_KEYS env var not configured');
        return res.status(500).json({ error: 'API authentication not configured' });
    }

    if (!allowedKeys.includes(apiKey)) {
        return res.status(403).json({
            error: 'Invalid API key.',
            docs: 'https://grussgenerator.de/api-partner.html#docs'
        });
    }

    // --- RATE LIMITING (100 req/min per API key) ---
    const rateLimitMap = global.b2bRateLimitMap || new Map();
    global.b2bRateLimitMap = rateLimitMap;

    const now = Date.now();
    const windowMs = 60 * 1000;
    const maxRequests = 100;

    const requestLog = rateLimitMap.get(apiKey) || [];
    const recentRequests = requestLog.filter(time => time > now - windowMs);

    if (recentRequests.length >= maxRequests) {
        return res.status(429).json({
            error: 'Rate limit exceeded. Max 100 requests per minute.',
            retryAfter: Math.ceil((recentRequests[0] + windowMs - now) / 1000)
        });
    }

    recentRequests.push(now);
    rateLimitMap.set(apiKey, recentRequests);

    // --- REQUEST BODY ---
    const { name: rawName, relation: rawRelation, info: rawInfo, tone, lang, occasion } = req.body;

    // --- INPUT VALIDATION & SANITIZATION ---
    function sanitizeInput(str, maxLen) {
        if (!str || typeof str !== 'string') return '';
        return str
            .substring(0, maxLen)
            .replace(/[\x00-\x1F\x7F]/g, '')
            .trim();
    }

    const name = sanitizeInput(rawName, 100);
    const relation = sanitizeInput(rawRelation, 50);
    const info = sanitizeInput(rawInfo, 500);

    // Validate allowed values
    const allowedTones = ['warm', 'funny', 'formal', 'poetic', 'short'];
    const allowedOccasions = ['birthday', 'wedding', 'christmas', 'easter', 'newyear', 'thanks', 'baby', 'getwell', 'mothersday', 'fathersday', 'graduation', 'anniversary', 'ramadan', 'lent', 'general'];
    const allowedLangs = ['de', 'en', 'tr', 'es', 'fr', 'it', 'bg'];

    if (tone && !allowedTones.includes(tone)) {
        return res.status(400).json({ error: `Invalid tone. Allowed: ${allowedTones.join(', ')}` });
    }
    if (occasion && !allowedOccasions.includes(occasion)) {
        return res.status(400).json({ error: `Invalid occasion. Allowed: ${allowedOccasions.join(', ')}` });
    }
    if (lang && !allowedLangs.includes(lang)) {
        return res.status(400).json({ error: `Invalid lang. Allowed: ${allowedLangs.join(', ')}` });
    }

    if (!process.env.PPLX_API_KEY) {
        return res.status(500).json({ error: 'AI provider not configured' });
    }

    // --- OCCASION-SPECIFIC PROMPTS ---
    const occasionPrompts = {
        birthday: `You are writing a birthday greeting card. Make it celebratory and personal.`,
        wedding: `You are writing a wedding congratulations message. Be elegant, romantic, and heartfelt.`,
        christmas: `You are writing a Christmas greeting. Include festive warmth and holiday spirit.`,
        easter: `You are writing an Easter greeting. Be cheerful and spring-themed.`,
        newyear: `You are writing a New Year's greeting for ${new Date().getFullYear() + 1}. Be hopeful and forward-looking.`,
        thanks: `You are writing a thank-you message. Be sincere and express genuine gratitude.`,
        baby: `You are writing a congratulations message for a new baby. Be joyful and warm.`,
        getwell: `You are writing a get-well-soon message. Be encouraging and supportive.`,
        mothersday: `You are writing a Mother's Day greeting. Express love, appreciation and gratitude for a mother.`,
        fathersday: `You are writing a Father's Day greeting. Express love, appreciation and gratitude for a father.`,
        graduation: `You are writing a graduation or exam congratulations message. Celebrate the achievement and wish success for the future.`,
        anniversary: `You are writing an anniversary message (wedding, work, or other). Celebrate the milestone and memories.`,
        ramadan: `You are writing a Ramadan greeting (Ramadan Mubarak / Ramadan Kareem). Be respectful of Islamic traditions. Express wishes for blessings, peace, and spiritual growth during the holy month of fasting.`,
        lent: `You are writing a Lent (Fastenzeit) greeting. Be reflective and encouraging. Express wishes for spiritual renewal, inner peace, and strength during the 40 days of fasting before Easter.`,
        general: `You are writing a general greeting message. Be warm and friendly.`
    };

    const occasionContext = occasionPrompts[occasion] || occasionPrompts.general;

    // --- LANGUAGE MAPPING ---
    const languageInstructions = {
        de: 'Write ONLY in German.',
        en: 'Write ONLY in English.',
        tr: 'Write ONLY in Turkish.',
        es: 'Write ONLY in Spanish.',
        fr: 'Write ONLY in French.',
        it: 'Write ONLY in Italian.',
        bg: 'Write ONLY in Bulgarian.'
    };

    const langInstruction = languageInstructions[lang] || languageInstructions.de;

    // --- TONE MAPPING ---
    const toneDescriptions = {
        warm: 'warm, heartfelt, and sincere',
        funny: 'humorous, playful, and light-hearted',
        formal: 'formal, professional, and respectful',
        poetic: 'poetic, creative, and lyrical',
        short: 'brief, concise, and to the point'
    };

    const toneStyle = toneDescriptions[tone] || toneDescriptions.warm;

    try {
        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), 15000); // 15s timeout (higher for B2B)

        const response = await fetch('https://api.perplexity.ai/chat/completions', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${process.env.PPLX_API_KEY}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                model: 'sonar-pro',
                messages: [
                    {
                        role: 'system',
                        content: `${occasionContext}
                        
${langInstruction}

Style: ${toneStyle}

IMPORTANT RULES:
- Output ONLY the greeting text itself
- Do NOT include any intro like "Here is your greeting:"
- Do NOT include placeholders like "[Your Name]" at the end
- Do NOT use markdown (no **bold**, no *italics*). Plain text only.
- Keep the message visually balanced for a greeting card
- Write a concise message (max 5-6 sentences). Structure the text into exactly 2 distinct paragraphs.`
                    },
                    {
                        role: 'user',
                        content: `Write a ${tone || 'warm'} ${occasion || 'general'} greeting for ${name || 'someone special'} (Relationship: ${relation || 'friend'}). ${info ? `Additional context: ${info}` : ''}`
                    }
                ],
                max_tokens: 600,
                temperature: 0.8
            }),
            signal: controller.signal
        });

        clearTimeout(timeout);

        const data = await response.json();

        if (!response.ok) {
            console.error('Perplexity API Error (B2B):', data);
            return res.status(response.status).json({
                error: `AI provider error: ${data.error?.message || response.statusText}`
            });
        }

        // --- USAGE LOGGING ---
        console.log(`[B2B] key=${apiKey.substring(0, 8)}... occasion=${occasion} lang=${lang} tone=${tone}`);

        return res.status(200).json({
            text: data.choices[0].message.content.trim(),
            occasion: occasion || 'general',
            lang: lang || 'de',
            tone: tone || 'warm'
        });

    } catch (err) {
        if (err.name === 'AbortError') {
            return res.status(504).json({ error: 'Request timeout. Please retry.' });
        }
        console.error('B2B Server Error:', err);
        return res.status(500).json({ error: `Server error: ${err.message}` });
    }
};
