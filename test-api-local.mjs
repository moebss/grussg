import handler from './api/generate-greeting.js';

// Mock Request
const req = {
    method: 'POST',
    headers: {
        'x-forwarded-for': '127.0.0.1'
    },
    socket: {
        remoteAddress: '127.0.0.1'
    },
    body: {
        name: 'Test',
        relation: 'Friend',
        tone: 'warm',
        lang: 'de',
        occasion: 'birthday'
    }
};

// Mock Response
const res = {
    setHeader: (k, v) => console.log(`Header: ${k}=${v}`),
    status: (code) => {
        console.log(`Status: ${code}`);
        return res;
    },
    json: (data) => {
        console.log('JSON Response:', JSON.stringify(data, null, 2));
        return res;
    },
    end: () => console.log('End')
};

// Process
console.log('--- TEST 1: No API Key ---');
delete process.env.PPLX_API_KEY;
handler(req, res).catch(console.error);

// Wait for async? Handler is async.
// It should finish quickly.
