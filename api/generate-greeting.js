export default async (req, res) => {
    // CORS Headers
    const allowedOrigins = ['https://grussgenerator.de', 'https://www.grussgenerator.de'];
    const origin = req.headers.origin;
    if (allowedOrigins.includes(origin)) {
        res.setHeader('Access-Control-Allow-Origin', origin);
    }
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Nur POST-Anfragen erlaubt' });
    }

    // --- RATE LIMITING ---
    const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
    const rateLimitMap = global.rateLimitMap || new Map();
    global.rateLimitMap = rateLimitMap;

    const now = Date.now();
    const windowMs = 60 * 1000;
    const maxRequests = 10;

    const requestLog = rateLimitMap.get(ip) || [];
    const recentRequests = requestLog.filter(time => time > now - windowMs);

    if (recentRequests.length >= maxRequests) {
        return res.status(429).json({ error: 'Zu viele Anfragen. Bitte warte eine Minute. ⏳' });
    }

    recentRequests.push(now);
    rateLimitMap.set(ip, recentRequests);

    // --- REQUEST BODY ---
    const { name: rawName, relation: rawRelation, info: rawInfo, tone, lang, occasion } = req.body;

    // --- INPUT VALIDATION & SANITIZATION ---
    function sanitizeInput(str, maxLen) {
        if (!str || typeof str !== 'string') return '';
        return str
            .substring(0, maxLen)
            .replace(/[\x00-\x1F\x7F]/g, '')  // Strip control characters
            .trim();
    }

    const name = sanitizeInput(rawName, 100);
    const relation = sanitizeInput(rawRelation, 50);
    const info = sanitizeInput(rawInfo, 500);

    // Validate allowed values for enum fields
    const allowedTones = ['warm', 'funny', 'formal', 'poetic', 'short'];
    const allowedOccasions = ['birthday', 'wedding', 'christmas', 'easter', 'newyear', 'thanks', 'baby', 'getwell', 'mothersday', 'fathersday', 'graduation', 'anniversary', 'general'];
    const allowedLangs = ['de', 'en', 'tr', 'es', 'fr', 'it', 'bg'];

    if (tone && !allowedTones.includes(tone)) {
        return res.status(400).json({ error: 'Ungültiger Ton-Parameter' });
    }
    if (occasion && !allowedOccasions.includes(occasion)) {
        return res.status(400).json({ error: 'Ungültiger Anlass-Parameter' });
    }
    if (lang && !allowedLangs.includes(lang)) {
        return res.status(400).json({ error: 'Ungültiger Sprach-Parameter' });
    }

    if (!process.env.PPLX_API_KEY) {
        return res.status(500).json({ error: 'API Key fehlt in Konfiguration' });
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
        const timeout = setTimeout(() => controller.abort(), 10000); // 10s timeout

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
- Keep the message visually balanced for a 1:1 square card
- Write a concise message (max 5-6 sentences). Structure the text into exactly 2 distinct paragraphs for a neat and balanced look.`
                    },
                    {
                        role: 'user',
                        content: `Write a ${tone} ${occasion} greeting for ${name || 'someone special'} (Relationship: ${relation || 'friend'}). ${info ? `Additional context: ${info}` : ''}`
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
            console.error('Perplexity API Error:', data);
            return res.status(response.status).json({
                error: `API Fehler: ${data.error?.message || response.statusText}`
            });
        }

        return res.status(200).json({
            text: data.choices[0].message.content.trim(),
            occasion: occasion,
            lang: lang
        });

    } catch (err) {
        console.error('Server Error:', err);
        return res.status(500).json({ error: `Server-Fehler: ${err.message}` });
    }
};
