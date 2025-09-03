const crypto = require('crypto');

// Generate key pair (chỉ cần làm 1 lần, sau đó lưu)
const { publicKey, privateKey } = crypto.generateKeyPairSync('rsa', { // 'rsa', 'x25519'
    // modulusLength: 2048,
});

// Client ký
function signRequest(method, url, body, privateKey) {
    const baseString = [method, url, body].join('\n');
    const sign = crypto.createSign('RSA-SHA256');
    sign.update(baseString);
    return sign.sign(privateKey, 'base64');
}

// Server verify
function verifyRequest(method, url, body, signature, publicKey) {
    const baseString = [method, url, body].join('\n');
    const verify = crypto.createVerify('RSA-SHA256');
    verify.update(baseString);
    return verify.verify(publicKey, signature, 'base64');
}

const method = 'POST';
const url = '/api/payment';
const body = '{"amount":100}';

const signature = signRequest(method, url, body, privateKey);
console.log('Signature:', signature);

console.log(
    'Verify:',
    verifyRequest(method, url, body, signature, publicKey), // true
);
