import fs from 'fs';
import path from 'path';

const PPLX_API_ENDPOINT = 'https://api.perplexity.ai/chat/completions';

// Helper to read env files
function loadEnv(filePath) {
    if (fs.existsSync(filePath)) {
        console.log(`Loading env from ${filePath}`);
        const content = fs.readFileSync(filePath, 'utf8');
        content.split('\n').forEach(line => {
            const match = line.match(/^([^=]+)=(.*)$/);
            if (match) {
                const key = match[1].trim();
                const value = match[2].trim().replace(/^["']|["']$/g, '');
                if (!process.env[key]) {
                    process.env[key] = value;
                }
            }
        });
    }
}

// Load envs
loadEnv('.env');
loadEnv('.env.local');

const apiKey = process.env.PPLX_API_KEY;

if (!apiKey) {
    console.error('❌ ERROR: PPLX_API_KEY not found in environment variables or .env/.env.local files.');
    console.log('Please create a .env.local file with PPLX_API_KEY=your_key_here');
    process.exit(1);
}

console.log('✅ API Key found.');

async function testApi() {
    console.log('Testing Perplexity API with model: sonar-pro...');
    try {
        const response = await fetch(PPLX_API_ENDPOINT, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${apiKey}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                model: 'sonar-pro',
                messages: [
                    { role: 'user', content: 'Say "Hello, World!"' }
                ],
                max_tokens: 50
            })
        });

        if (!response.ok) {
            const text = await response.text();
            console.error(`❌ API Request Failed: ${response.status} ${response.statusText}`);
            console.error(`Response Body: ${text}`);

            if (response.status === 401) {
                console.error('--> Cause: Invalid API Key.');
            } else if (response.status === 402) {
                console.error('--> Cause: Payment Required (Credits exhausted).');
            } else if (response.status === 429) {
                console.error('--> Cause: Rate Limit Exceeded.');
            }
            process.exit(1);
        }

        const data = await response.json();
        console.log('✅ API Request Successful!');
        console.log('Response:', data.choices[0].message.content);

    } catch (error) {
        console.error('❌ Network or Unknown Error:', error.message);
        process.exit(1);
    }
}

testApi();
