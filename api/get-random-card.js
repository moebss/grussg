export default async (req, res) => {
    // CORS Headers
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    // --- RATE LIMITING ---
    const ip = req.headers['x-forwarded-for'] || req.socket?.remoteAddress || 'unknown';
    const rateLimitMap = global.cardRateLimitMap || new Map();
    global.cardRateLimitMap = rateLimitMap;

    const now = Date.now();
    const windowMs = 60 * 1000;
    const maxRequests = 30;

    const requestLog = rateLimitMap.get(ip) || [];
    const recentRequests = requestLog.filter(time => time > now - windowMs);

    if (recentRequests.length >= maxRequests) {
        return res.status(429).json({ error: 'Zu viele Anfragen. Bitte warte eine Minute. ⏳' });
    }

    recentRequests.push(now);
    rateLimitMap.set(ip, recentRequests);

    // --- SUPABASE CONFIG ---
    const supabaseUrl = process.env.SUPABASE_URL?.trim().replace(/\/$/, '');
    const supabaseKey = process.env.SUPABASE_ANON_KEY?.trim();

    if (!supabaseUrl || !supabaseKey) {
        console.error('Missing Supabase config');
        return res.status(500).json({ error: 'Server-Konfiguration fehlt' });
    }

    try {
        // List all files in the remix-cards bucket
        const listResponse = await fetch(`${supabaseUrl}/storage/v1/object/list/remix-cards`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${supabaseKey}`,
                'apikey': supabaseKey,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                prefix: '',
                limit: 100,
                offset: 0
            })
        });

        if (!listResponse.ok) {
            const errorText = await listResponse.text();
            console.error('Supabase Storage Error:', errorText);
            return res.status(500).json({ error: 'Fehler beim Laden der Bilder' });
        }

        const files = await listResponse.json();

        // Filter only image files
        const imageFiles = files.filter(file =>
            file.name &&
            !file.name.endsWith('/') &&
            /\.(jpg|jpeg|png|webp|gif)$/i.test(file.name)
        );

        if (imageFiles.length === 0) {
            // Fallback: return a gradient instead
            return res.status(200).json({
                type: 'gradient',
                css: 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 25%, #fff5f3 50%, #a8edea 75%, #fed6e3 100%)',
                message: 'Keine Bilder gefunden, Fallback-Gradient verwendet'
            });
        }

        // Select 1 or 2 random images
        const count = req.body?.count || 1;
        const shuffled = imageFiles.sort(() => Math.random() - 0.5);
        const selectedFiles = shuffled.slice(0, Math.min(count, 2));

        // Generate public URLs
        const images = selectedFiles.map(file => ({
            name: file.name,
            url: `${supabaseUrl}/storage/v1/object/public/remix-cards/${encodeURIComponent(file.name)}`,
            size: file.metadata?.size || 0
        }));

        return res.status(200).json({
            type: 'image',
            images: images,
            totalAvailable: imageFiles.length
        });

    } catch (err) {
        console.error('Get Random Card Error:', err);
        return res.status(500).json({ error: `Server-Fehler: ${err.message}` });
    }
};
