const jwt = require('jsonwebtoken');

const secretKey = 'your_secret_key'; // Thay bằng secret key của bạn

const payload = {
    userId: 12345,
    role: 'admin',
};

const token = jwt.sign(payload, secretKey, {
    algorithm: 'HS256', // Mặc định là HS256
    keyid: 'my-key-id',
    expiresIn: '7d', // Token hết hạn sau 7 ngày
    notBefore: '10s', // Token có hiệu lực sau 10 giây
    // audience: 'haind-audience',
    // subject: 'haind-subject',
    // issuer: 'haind-issuer',
    // jwtid: 'unique-jwt-id',
    // mutatePayload: false,
    // noTimestamp: false, // JWT sẽ chứa `iat`
    // header: { typ: 'JWT', alg: 'HS256' },
    // encoding: 'utf8',
    // allowInsecureKeySizes: false,
    // allowInvalidAsymmetricKeyTypes: false,
});

console.log('Generated JWT:', token);
