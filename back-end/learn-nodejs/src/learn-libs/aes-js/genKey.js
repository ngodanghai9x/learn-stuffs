const pbkdf2 = require('pbkdf2');

const password = 'random_password';
const salt = 'random_salt';

var key_128 = pbkdf2.pbkdf2Sync(password, salt, 1, 128 / 8, 'sha512');
var key_192 = pbkdf2.pbkdf2Sync(password, salt, 1, 192 / 8, 'sha512');
var key_256 = pbkdf2.pbkdf2Sync(password, salt, 1, 256 / 8, 'sha512');
console.log({ key_128, key_192, key_256 });
