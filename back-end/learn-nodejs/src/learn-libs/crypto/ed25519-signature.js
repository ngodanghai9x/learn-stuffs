const crypto = require('crypto');

// Generate key pair (chỉ cần chạy 1 lần, sau đó lưu key lại)
const { publicKey, privateKey } = crypto.generateKeyPairSync('ed25519');

// Client ký
function signRequest(method, url, body, privateKey) {
    const baseString = [method, url, body].join('\n');
    return crypto.sign(null, Buffer.from(baseString), privateKey).toString('base64');
}

// Server verify
function verifyRequest(method, url, body, signature, publicKey) {
    const baseString = [method, url, body].join('\n');
    return crypto.verify(
        null,
        Buffer.from(baseString),
        publicKey,
        Buffer.from(signature, 'base64')
    );
}

const method = 'POST';
const url = '/api/payment';
const body = '{"amount":100}';

const signature = signRequest(method, url, body, privateKey);
console.log('Signature:', signature);

console.log(
    'Verify:',
    verifyRequest(method, url, body, signature, publicKey) // true
);


//  OTHER WAY
const sodium = require('libsodium-wrappers');

(async () => {
    await sodium.ready;

    // Tạo cặp key
    const keyPair = sodium.crypto_sign_keypair();
    const privateKey = keyPair.privateKey;
    const publicKey = keyPair.publicKey;

    const message = 'POST:/api/payment:1699999999:abc123:{"amount":100}';

    // Ký
    const signature = sodium.crypto_sign_detached(message, privateKey);

    // Verify
    const ok = sodium.crypto_sign_verify_detached(signature, message, publicKey);

    console.log('Signature valid?', ok);
})();
