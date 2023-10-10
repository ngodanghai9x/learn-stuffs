const { Buffer } = require('buffer');

const buf = Buffer.from('hello world', 'utf8');

console.log(buf);
// <Buffer 68656c6c6f20776f726c64>
console.log(buf.toString('hex'));
// 68656c6c6f20776f726c64
console.log(buf.toString('base64'));
// aGVsbG8gd29ybGQ=
buf.write('hai', buf.length, 'utf8');
console.log(buf);
// <Buffer 68656c6c6f20776f726c64>

console.log('=== End buf ===');

// hello world
console.log(Buffer.from('fhqwhgads', 'utf8'));
// <Buffer 66 68 71 77 68 67 61 64 73>
console.log(Buffer.from('fhqwhgads', 'utf16le'));
// <Buffer 66 00 68 00 71 00 77 00 68 00 67 00 61 00 64 00 73 00>

const arr = new Uint16Array(2);

arr[0] = 5000;
arr[1] = 4000;

// Copies the contents of `arr`.
const buf1 = Buffer.from(arr);
console.log(buf1);
// <Buffer 88 a0>

// Shares memory with `arr`.
const buf2 = Buffer.from(arr.buffer);

console.log(buf1);
// <Buffer 88 a0>
console.log(buf2);
// <Buffer 88 13 a0 0f>

arr[1] = 6000;

console.log(buf1);
// <Buffer 88 a0>
console.log(buf2);
// <Buffer 88 13 70 17>
