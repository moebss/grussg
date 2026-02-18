export default async (req, res) => {
    // ===========================
    // MOODS CATALOG API (B2B)
    // Returns all available card design templates
    // ===========================

    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, x-api-key');
    res.setHeader('Cache-Control', 'public, max-age=3600');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    if (req.method !== 'GET') {
        return res.status(405).json({ error: 'Only GET requests allowed' });
    }

    const baseUrl = 'https://grussgenerator.de/assets/templates';
    const TOTAL_MOODS = 27;

    // Define mood metadata
    const moodMeta = {
        1: { name: 'Sunset Gradient', category: 'abstract', textColor: '#ffffff', dark: true },
        2: { name: 'Ocean Blue', category: 'abstract', textColor: '#ffffff', dark: true },
        3: { name: 'Forest Green', category: 'nature', textColor: '#ffffff', dark: true },
        4: { name: 'Purple Dream', category: 'abstract', textColor: '#ffffff', dark: true },
        5: { name: 'Night Sky', category: 'abstract', textColor: '#ffffff', dark: true },
        6: { name: 'Warm Peach', category: 'abstract', textColor: '#1e293b', dark: false },
        7: { name: 'Soft Pink', category: 'romantic', textColor: '#1e293b', dark: false },
        8: { name: 'Deep Red', category: 'romantic', textColor: '#ffffff', dark: true },
        9: { name: 'Dark Elegance', category: 'elegant', textColor: '#ffffff', dark: true },
        10: { name: 'Pastel Mint', category: 'nature', textColor: '#1e293b', dark: false },
        11: { name: 'Midnight Blue', category: 'elegant', textColor: '#ffffff', dark: true },
        12: { name: 'Golden Hour', category: 'abstract', textColor: '#1e293b', dark: false },
        13: { name: 'Spring Bloom', category: 'nature', textColor: '#1e293b', dark: false },
        14: { name: 'Cosmic Purple', category: 'abstract', textColor: '#ffffff', dark: true },
        15: { name: 'Autumn Warmth', category: 'nature', textColor: '#1e293b', dark: false },
        16: { name: 'Ice Crystal', category: 'winter', textColor: '#1e293b', dark: false },
        17: { name: 'Starry Night', category: 'abstract', textColor: '#ffffff', dark: true },
        18: { name: 'Royal Blue', category: 'elegant', textColor: '#ffffff', dark: true },
        19: { name: 'Coral Reef', category: 'abstract', textColor: '#1e293b', dark: false },
        20: { name: 'Emerald Dark', category: 'elegant', textColor: '#ffffff', dark: true },
        21: { name: 'Lavender Fields', category: 'nature', textColor: '#1e293b', dark: false },
        22: { name: 'Charcoal Minimal', category: 'minimal', textColor: '#ffffff', dark: true },
        23: { name: 'Deep Space', category: 'abstract', textColor: '#ffffff', dark: true },
        24: { name: 'Blush Rose', category: 'romantic', textColor: '#1e293b', dark: false },
        25: { name: 'Ramadan Gold', category: 'ramadan', textColor: '#5c4a1e', dark: false },
        26: { name: 'Ramadan Royal', category: 'ramadan', textColor: '#ffffff', dark: true },
        27: { name: 'Ramadan Blue & Gold', category: 'ramadan', textColor: '#1e293b', dark: false },
    };

    const moods = [];
    for (let i = 1; i <= TOTAL_MOODS; i++) {
        const meta = moodMeta[i] || { name: `Design ${i}`, category: 'other', textColor: '#1e293b', dark: false };
        moods.push({
            id: i,
            name: meta.name,
            category: meta.category,
            imageUrl: `${baseUrl}/mood${i}.jpg`,
            previewUrl: `${baseUrl}/mood${i}.jpg`,
            renderUrl: `https://grussgenerator.de/api/render-card?mood=${i}&text=Herzliche+Gr%C3%BC%C3%9Fe!`,
            textColor: meta.textColor,
            dark: meta.dark,
        });
    }

    const categories = [...new Set(moods.map(m => m.category))];

    return res.status(200).json({
        total: TOTAL_MOODS,
        categories: categories,
        moods: moods,
    });
};
