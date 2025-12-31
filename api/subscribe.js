export default async (req, res) => {
    // CORS Headers
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Only POST allowed' });
    }

    const { email } = req.body;

    if (!email || !email.includes('@')) {
        return res.status(400).json({ error: 'Invalid email address' });
    }

    // Supabase Config
    const supabaseUrl = process.env.SUPABASE_URL?.trim().replace(/\/$/, '');
    const supabaseKey = process.env.SUPABASE_ANON_KEY?.trim();

    if (!supabaseUrl || !supabaseKey) {
        return res.status(500).json({ error: 'Configuration Error: Supabase keys missing.' });
    }

    try {
        const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;

        const response = await fetch(`${supabaseUrl}/rest/v1/newsletter`, {
            method: 'POST',
            headers: {
                'apikey': supabaseKey,
                'Authorization': `Bearer ${supabaseKey}`,
                'Content-Type': 'application/json',
                'Prefer': 'return=minimal'
            },
            body: JSON.stringify({
                email: email,
                created_at: new Date().toISOString(),
                signup_ip: ip,
                confirmed: false
            })
        });

        if (!response.ok) {
            const errorData = await response.json();
            if (errorData.code === '23505') {
                return res.status(200).json({ success: true, message: 'Already subscribed' });
            }
            return res.status(response.status).json({ error: errorData.message });
        }

        return res.status(200).json({ success: true });

    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
};
