const { totp, hotp, authenticator } = require('otplib');

const secret =
  // authenticator.generateSecret() ||
  'KVKFKRCPNZQUYMLXOVYDSQKJKZDTSRLD';
// console.log('🚀 ~ secret:', secret);

totp.resetOptions();
totp.options = {
  digits: 5,
  step: 3, // 3s
};

const token = totp.generate(secret);
const token2 = totp.generate(secret);
const isValid = totp.verify({ token, secret });
const isValid2 = totp.check(token2, secret);

console.log('🚀 ~ file: totp.js:1 :', {
  token,
  token2,
  isValid,
  isValid2,
});

hotp.resetOptions();
hotp.options = {
  digits: 5,
};

const counter = 3; // same counter = same token
const htoken = hotp.generate(secret, counter);
const hisValid = hotp.check(htoken, secret, counter);
const hisValid2 = hotp.verify({ token: htoken, secret, counter });

console.log('🚀 ~ file: totp.js:2 :', {
  htoken,
  hisValid2,
  hisValid,
});
