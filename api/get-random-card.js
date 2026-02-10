export default async (req, res) => {
    // CORS Headers
    const allowedOrigins = ['https://grussgenerator.de', 'https://www.grussgenerator.de'];
    const origin = req.headers.origin;
    if (allowedOrigins.includes(origin)) {
        res.setHeader('Access-Control-Allow-Origin', origin);
    }
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
        // Try to list files with service role approach
        // First attempt: Direct REST API to storage
        const listUrl = `${supabaseUrl}/storage/v1/object/list/remix-cards`;

        const listResponse = await fetch(listUrl, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${supabaseKey}`,
                'apikey': supabaseKey,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                prefix: '',
                limit: 100,
                offset: 0,
                search: ''
            })
        });

        let files = [];

        if (listResponse.ok) {
            files = await listResponse.json();
        } else {
            console.log('Storage list failed, trying alternative approach');

            // Alternative: Try to get public bucket info
            const publicListUrl = `${supabaseUrl}/storage/v1/bucket/remix-cards`;
            const bucketResponse = await fetch(publicListUrl, {
                headers: {
                    'Authorization': `Bearer ${supabaseKey}`,
                    'apikey': supabaseKey
                }
            });

            if (bucketResponse.ok) {
                const bucketInfo = await bucketResponse.json();
                console.log('Bucket info:', bucketInfo);
            }
        }

        // Filter only image files (check both name and id fields)
        const imageFiles = files.filter(file => {
            const fileName = file.name || file.id || '';
            return fileName &&
                !fileName.endsWith('/') &&
                /\.(jpg|jpeg|png|webp|gif)$/i.test(fileName);
        });

        if (imageFiles.length === 0) {
            // Fallback: return a gradient instead
            return res.status(200).json({
                type: 'gradient',
                css: 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 25%, #fff5f3 50%, #a8edea 75%, #fed6e3 100%)',
                message: 'Keine Bilder gefunden, Fallback-Gradient verwendet'
            });
        }

        // Select requested number of images (max 50)
        const count = Math.min(req.body?.count || 1, 50);
        const shuffled = imageFiles.sort(() => Math.random() - 0.5);
        const selectedFiles = shuffled.slice(0, count);

        // Generate public URLs
        const images = selectedFiles.map(file => ({
            name: file.name || file.id,
            url: `${supabaseUrl}/storage/v1/object/public/remix-cards/${encodeURIComponent(file.name || file.id)}`,
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
