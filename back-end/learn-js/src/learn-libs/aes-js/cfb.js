const aesjs = require('aes-js');
// An example 128-bit key
var key = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];

// The initialization vector (must be 16 bytes)
var iv = [21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36];

// Convert text to bytes (must be a multiple of the segment size you choose below)
var text = 'TextMustBeAMultipleOfSegmentSize';
var textBytes = aesjs.utils.utf8.toBytes(text);

// The segment size is optional, and defaults to 1
var segmentSize = 8;
var aesCfb = new aesjs.ModeOfOperation.cfb(key, iv, segmentSize);
var encryptedBytes = aesCfb.encrypt(textBytes);

// To print or store the binary data, you may convert it to hex
var encryptedHex = aesjs.utils.hex.fromBytes(encryptedBytes);
console.log(encryptedHex);
// "55e3af2638c560b4fdb9d26a630733ea60197ec23deb85b1f60f71f10409ce27"

// When ready to decrypt the hex string, convert it back to bytes
var encryptedBytes = aesjs.utils.hex.toBytes(encryptedHex);

// The cipher feedback mode of operation maintains internal state,
// so to decrypt a new instance must be instantiated.
var aesCfb = new aesjs.ModeOfOperation.cfb(key, iv, 8);
var decryptedBytes = aesCfb.decrypt(encryptedBytes);

// Convert our bytes back into text
var decryptedText = aesjs.utils.utf8.fromBytes(decryptedBytes);
console.log(decryptedText);
// "TextMustBeAMultipleOfSegmentSize"
