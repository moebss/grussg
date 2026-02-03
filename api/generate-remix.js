export default async (req, res) => {
    // CORS Headers
    res.setHeader('Access-Control-Allow-Origin', '*');
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
    const rateLimitMap = global.remixRateLimitMap || new Map();
    global.remixRateLimitMap = rateLimitMap;

    const now = Date.now();
    const windowMs = 60 * 1000;
    const maxRequests = 15;

    const requestLog = rateLimitMap.get(ip) || [];
    const recentRequests = requestLog.filter(time => time > now - windowMs);

    if (recentRequests.length >= maxRequests) {
        return res.status(429).json({ error: 'Zu viele Remix-Anfragen. Bitte warte eine Minute. ⏳' });
    }

    recentRequests.push(now);
    rateLimitMap.set(ip, recentRequests);

    // --- REQUEST BODY ---
    const { mood1, mood2 } = req.body;

    if (!process.env.PPLX_API_KEY) {
        return res.status(500).json({ error: 'API Key fehlt in Konfiguration' });
    }

    // --- MOOD DESCRIPTIONS ---
    const moodDescriptions = {
        'mood-1': 'warm coral and peach watercolor tones with soft blended edges',
        'mood-2': 'soft pink roses with romantic blush and cream gradients',
        'mood-3': 'deep purple and magenta floral tones with rich saturation',
        'mood-4': 'turquoise and teal tropical leaf patterns with fresh greens',
        'mood-5': 'golden sunset with warm amber, orange and honey tones',
        'mood-6': 'ocean blue and aqua waves with calming sea foam accents',
        'mood-7': 'forest green and natural earthy browns with organic feel',
        'mood-8': 'lavender fields with soft purple and lilac gradients',
        'mood-9': 'autumn leaves with orange, rust and deep red tones',
        'mood-10': 'winter snow with icy blue and crisp white accents',
        'mood-11': 'sunrise pastel with soft pinks, yellows and light blues',
        'mood-12': 'night sky with deep navy blue and subtle star-like sparkles',
        'mood-13': 'spring cherry blossom with delicate pinks and whites',
        'mood-14': 'minimalist clean white with very subtle gray undertones'
    };

    const desc1 = moodDescriptions[mood1] || 'warm colorful tones';
    const desc2 = moodDescriptions[mood2] || 'soft natural gradients';

    try {
        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), 10000);

        const response = await fetch('https://api.perplexity.ai/chat/completions', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${process.env.PPLX_API_KEY}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                model: 'sonar',
                messages: [
                    {
                        role: 'system',
                        content: `You are a CSS gradient designer. Create beautiful CSS linear-gradient backgrounds.

IMPORTANT RULES:
- Output ONLY valid CSS linear-gradient code, nothing else
- No explanation, no markdown, just the gradient
- Blend the two input color schemes harmoniously
- Use soft, elegant color transitions (4-6 color stops)
- Colors should be light enough for black text readability
- The center (50% of the gradient) should be lighter/neutral
- Format: linear-gradient(angle, color1 0%, color2 25%, color3 50%, color4 75%, color5 100%)`
                    },
                    {
                        role: 'user',
                        content: `Create a CSS gradient that blends these two mood styles:

MOOD 1: ${desc1}
MOOD 2: ${desc2}

The gradient should harmoniously combine both color palettes. Keep the center area lighter for text visibility.`
                    }
                ],
                max_tokens: 150,
                temperature: 0.9
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

        let cssGradient = data.choices[0].message.content.trim();

        // Clean up response - extract just the gradient
        // Loose match: find "linear-gradient" and take everything until the end of the string.
        const startIndex = cssGradient.indexOf('linear-gradient');
        if (startIndex !== -1) {
            cssGradient = cssGradient.substring(startIndex);

            // Remove markdown code block end markers ` ``` ` if present
            cssGradient = cssGradient.replace(/```/g, '').trim();

            // Ensure valid ending
            // Basic heuristic: if it doesn't end with ), try to truncate at the last )
            if (!cssGradient.endsWith(')')) {
                const lastParen = cssGradient.lastIndexOf(')');
                if (lastParen !== -1) {
                    cssGradient = cssGradient.substring(0, lastParen + 1);
                }
            }
        } else {
            // Fallback gradient if AI response is malformed
            cssGradient = 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 25%, #fff5f3 50%, #a8edea 75%, #fed6e3 100%)';
        }

        return res.status(200).json({
            css: cssGradient,
            mood1: mood1,
            mood2: mood2
        });

    } catch (err) {
        console.error('Remix Server Error:', err);
        return res.status(500).json({ error: `Server-Fehler: ${err.message}` });
    }
};
