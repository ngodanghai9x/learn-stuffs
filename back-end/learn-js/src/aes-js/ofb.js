const aesjs = require('aes-js');
// An example 128-bit key
var key = [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16 ];
 
// The initialization vector (must be 16 bytes)
var iv = [ 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34,35, 36 ];
 
// Convert text to bytes
var text = 'Text may be any length you wish, no padding is required.';
var textBytes = aesjs.utils.utf8.toBytes(text);
 
var aesOfb = new aesjs.ModeOfOperation.ofb(key, iv);
var encryptedBytes = aesOfb.encrypt(textBytes);
 
// To print or store the binary data, you may convert it to hex
var encryptedHex = aesjs.utils.hex.fromBytes(encryptedBytes);
console.log(encryptedHex);
// "55e3af2655dd72b9f32456042f39bae9accff6259159e608be55a1aa313c598d
//  b4b18406d89c83841c9d1af13b56de8eda8fcfe9ec8e75e8"
 
// When ready to decrypt the hex string, convert it back to bytes
var encryptedBytes = aesjs.utils.hex.toBytes(encryptedHex);
 
// The output feedback mode of operation maintains internal state,
// so to decrypt a new instance must be instantiated.
var aesOfb = new aesjs.ModeOfOperation.ofb(key, iv);
var decryptedBytes = aesOfb.decrypt(encryptedBytes);
 
// Convert our bytes back into text
var decryptedText = aesjs.utils.utf8.fromBytes(decryptedBytes);
console.log(decryptedText);
// "Text may be any length you wish, no padding is required."