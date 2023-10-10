const aes = require('aes-js');
const pbkdf2 = require('pbkdf2');

var key_128 = pbkdf2.pbkdf2Sync('password', 'salt', 1, 128 / 8, 'sha512');

// An example 128-bit key (16 bytes * 8 bits/byte = 128 bits)
var key = [0, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];
var key = [
  0xe2, 0x32, 0xfc, 0xf1, 0x91, 0x12, 0x91, 0x88, 0xb1, 0x59, 0xe4, 0xe6, 0xd6, 0x79, 0xa2, 0x93,
];
var key = 'Thats my Kung Fu'.split('').map((char) => char.charCodeAt(0));
var key = ']MldZJO^4o}]j;7('.split('').map((char) => char.charCodeAt(0));
var key = key_128;

// Convert text to bytes
var text = 'Text may be any length you wish, no padding is required.';
var textBytes = aes.utils.utf8.toBytes(text);

// The counter is optional, and if omitted will begin at 1
var aesCtr = new aes.ModeOfOperation.ctr(key, new aes.Counter(5));
var encryptedBytes = aesCtr.encrypt(textBytes);

// To print or store the binary data, you may convert it to hex
var encryptedHex = aes.utils.hex.fromBytes(encryptedBytes);
console.log(encryptedHex);
// "a338eda3874ed884b6199150d36f49988c90f5c47fe7792b0cf8c7f77eeffd87
//  ea145b73e82aefcf2076f881c88879e4e25b1d7b24ba2788"

// When ready to decrypt the hex string, convert it back to bytes
var encryptedBytes = aes.utils.hex.toBytes(encryptedHex);

// The counter mode of operation maintains internal state, so to
// decrypt a new instance must be instantiated.
var aesCtr = new aes.ModeOfOperation.ctr(key, new aes.Counter(5));
var decryptedBytes = aesCtr.decrypt(encryptedBytes);

// Convert our bytes back into text
var decryptedText = aes.utils.utf8.fromBytes(decryptedBytes);
console.log(decryptedText);
// "Text may be any length you wish, no padding is required."
