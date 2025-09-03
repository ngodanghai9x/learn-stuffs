const crypto = require('crypto');

function signRequest(method, url, body, secret, ts, nonce) {
    const baseString = [method.toUpperCase(), url, ts, nonce, body].join('\n');
    return crypto.createHmac('sha256', secret).update(baseString).digest('base64');
}

// ----- CLIENT -----
const secret = 'supersecretkey';
const method = 'POST';
const url = '/api/payment';
const body = '{"amount":100}';
const ts = Math.floor(Date.now() / 1000);
const nonce = crypto.randomBytes(8).toString('hex');

const signature = signRequest(method, url, body, secret, ts, nonce);

// giả lập header gửi đi
const headers = {
    authorization: `Hawk id="client123", ts="${ts}", nonce="${nonce}", mac="${signature}"`,
};

// ----- SERVER -----
function verifyRequest(method, url, body, secret, headers) {
    // parse Authorization header
    const auth = headers.authorization.match(
        /id="([^"]+)", ts="([^"]+)", nonce="([^"]+)", mac="([^"]+)"/,
    );

    if (!auth) return false;

    const [, id, ts, nonce, mac] = auth;

    // TODO: check ts (chống replay, lệch giờ < 5 phút)
    // TODO: check nonce (có thể lưu redis xem nonce đã dùng chưa)

    const expectedMac = signRequest(method, url, body, secret, ts, nonce);

    return mac === expectedMac;
}

// server kiểm chứng
console.log('Verify result:', verifyRequest(method, url, body, secret, headers));
