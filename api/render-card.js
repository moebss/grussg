import { ImageResponse } from '@vercel/og';

export const config = { runtime: 'edge' };

export default async function handler(request) {
    // ===========================
    // CARD IMAGE RENDERING API (B2B)
    // Renders greeting text + mood background → PNG
    // ===========================

    if (request.method === 'OPTIONS') {
        return new Response(null, {
            status: 200,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type, x-api-key',
            },
        });
    }

    // Support both GET (for <img src>) and POST (for API calls)
    let text, mood, textColor, fontSize, fontWeight, textAlign;

    if (request.method === 'GET') {
        const url = new URL(request.url);
        text = url.searchParams.get('text') || 'Herzliche Grüße!';
        mood = parseInt(url.searchParams.get('mood') || '1');
        textColor = url.searchParams.get('color') || '#1e293b';
        fontSize = url.searchParams.get('fontSize') || '42';
        textAlign = url.searchParams.get('align') || 'center';
    } else if (request.method === 'POST') {
        const body = await request.json();
        text = body.text || 'Herzliche Grüße!';
        mood = parseInt(body.mood || '1');
        textColor = body.textColor || '#1e293b';
        fontSize = body.fontSize || '42';
        textAlign = body.textAlign || 'center';

        // API key check for POST requests
        const apiKey = request.headers.get('x-api-key');
        if (!apiKey) {
            return new Response(JSON.stringify({
                error: 'Missing API key. Include x-api-key header.',
                docs: 'https://grussgenerator.de/api-partner.html#docs'
            }), { status: 401, headers: { 'Content-Type': 'application/json' } });
        }

        const allowedKeys = (process.env.B2B_API_KEYS || '').split(',').map(k => k.trim()).filter(Boolean);
        if (!allowedKeys.includes(apiKey)) {
            return new Response(JSON.stringify({ error: 'Invalid API key.' }),
                { status: 403, headers: { 'Content-Type': 'application/json' } });
        }
    } else {
        return new Response(JSON.stringify({ error: 'GET or POST only' }),
            { status: 405, headers: { 'Content-Type': 'application/json' } });
    }

    // Validate mood range
    if (mood < 1 || mood > 27 || isNaN(mood)) {
        mood = 1;
    }

    // Truncate text for safety
    if (text.length > 1000) {
        text = text.substring(0, 1000);
    }

    // Determine text color based on mood (dark backgrounds need white text)
    const darkMoods = [3, 4, 5, 8, 9, 11, 14, 17, 18, 20, 22, 23, 26];
    const isDark = darkMoods.includes(mood);
    const autoTextColor = textColor === '#1e293b' && isDark ? '#ffffff' : textColor;

    // Fetch the Outfit font
    let fontData;
    try {
        const fontRes = await fetch('https://fonts.gstatic.com/s/outfit/v11/QGYyz_MVcBeNP4NjuGObqx1XmO1I4TC0C4G-EiAou6Y.woff');
        fontData = await fontRes.arrayBuffer();
    } catch (e) {
        // Fallback: proceed without custom font
        fontData = null;
    }

    const bgUrl = `https://grussgenerator.de/assets/templates/mood${mood}.jpg`;

    // Split text into paragraphs for better layout
    const paragraphs = text.split('\n').filter(p => p.trim());

    const fontOptions = fontData ? [{
        name: 'Outfit',
        data: fontData,
        style: 'normal',
        weight: 500,
    }] : [];

    try {
        return new ImageResponse(
            {
                type: 'div',
                props: {
                    style: {
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: '100%',
                        height: '100%',
                        position: 'relative',
                    },
                    children: [
                        // Background image
                        {
                            type: 'img',
                            props: {
                                src: bgUrl,
                                style: {
                                    position: 'absolute',
                                    top: 0,
                                    left: 0,
                                    width: '100%',
                                    height: '100%',
                                    objectFit: 'cover',
                                },
                            },
                        },
                        // Text overlay container
                        {
                            type: 'div',
                            props: {
                                style: {
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: textAlign === 'center' ? 'center' : textAlign === 'right' ? 'flex-end' : 'flex-start',
                                    justifyContent: 'center',
                                    padding: '120px 100px',
                                    width: '100%',
                                    height: '100%',
                                    position: 'relative',
                                    zIndex: 1,
                                    textAlign: textAlign,
                                },
                                children: paragraphs.map((para) => ({
                                    type: 'p',
                                    props: {
                                        style: {
                                            fontFamily: fontData ? 'Outfit' : 'sans-serif',
                                            fontSize: `${fontSize}px`,
                                            fontWeight: 500,
                                            color: autoTextColor,
                                            lineHeight: 1.6,
                                            margin: '8px 0',
                                            textShadow: isDark ? '0 1px 4px rgba(0,0,0,0.3)' : 'none',
                                            maxWidth: '850px',
                                        },
                                        children: para,
                                    },
                                })),
                            },
                        },
                    ],
                },
            },
            {
                width: 1080,
                height: 1080,
                fonts: fontOptions,
                headers: {
                    'Cache-Control': 'public, max-age=3600',
                    'Access-Control-Allow-Origin': '*',
                },
            }
        );
    } catch (err) {
        return new Response(JSON.stringify({ error: 'Image rendering failed: ' + err.message }),
            { status: 500, headers: { 'Content-Type': 'application/json' } });
    }
}
