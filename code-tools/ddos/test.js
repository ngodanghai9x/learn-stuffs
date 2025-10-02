// Helpers
const randHex = (len = 4) =>
    [...Array(len)].map(() => Math.floor(Math.random() * 16).toString(16)).join('');

const randomUsername = () => `u${Date.now().toString(36)}${randHex(4)}`;

const pickRandom = (arr) => arr[Math.floor(Math.random() * arr.length)];

const randomEmail = (u) =>
    `${u}@${pickRandom(['example.local', 'gmail.com', 'hotmail.com', 'yopmail.com', 'mail.tech'])}`;

const encodeForm = (obj) => new URLSearchParams(obj).toString();

// Config
const url = 'https://connecttripau.com/api/cat/v1/auth/register';
const headers = { 'Accept': 'application/json, text/plain, */*', 'Accept-Language': 'en,en-US;q=0.9,vi;q=0.8', 'Connection': 'keep-alive', 'Content-Type': 'application/x-www-form-urlencoded', 'Origin': 'https://connecttripau.com', 'Referer': 'https://connecttripau.com/register', 'Sec-Fetch-Dest': 'empty', 'Sec-Fetch-Mode': 'cors', 'Sec-Fetch-Site': 'same-origin', 'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36', 'X-Api-Digest': 'EY1gEjMHqv1Qb30Eha5iBVf6CTIb2xQ7zvp58vU64Q9LC%2FbFmakQda2T4803S1D2wOLEAEkWO8XIerJFbG7MVZaEn1BfJH3rfeZd6E78DgNnwZMQgWKkko8Q1uWSwAVj3bwqn5%2B5kWprLx%2BOn9%2BgNkSRaAOgI4c%2BbtS6dupe2CM%3D', 'X-Api-Key': '1612703a0fef43daa6d60b39fdc84164', 'X-Api-Language': 'en', 'X-Api-Nonce': 'ad9ce18f8d27021b0b10c3c9237888b3', 'X-Api-Signature': '70608e3bd203e36422b4844938b2a552d78364c755ad5b02fa035a81bf875eee', 'X-Api-Signature-Method': 'HmacSHA256', 'X-Api-Signature-Params': 'code,password,security,tel,username', 'X-Api-Terminal': 'Other', 'X-Api-Timestamp': '1759378275132', 'X-Api-Version': '1.0.0', 'sec-ch-ua': '"Not)A;Brand";v="8", "Chromium";v="138", "Google Chrome";v="138"', 'sec-ch-ua-mobile': '?0', 'sec-ch-ua-platform': '"Linux"' };

// Call API once
(async function callOnce() {
    const u = randomUsername();
    const form = {
        username: u,
        tel: randomEmail(u),
        password: `${u}@12aA`,
        security: `${u}@aA43`,
        code: '117527',
    };
    const body = encodeForm(form);
    console.log("🚀 ~ callOnce ~ body:", body)

    try {
        const res = await fetch(url, { method: 'POST', headers, body });
        console.log("🚀 ~ callOnce ~ res:", res)
        const text = await res.text();
        console.log('Response:', text);
    } catch (err) {
        console.error('Error:', err);
    }
})();
