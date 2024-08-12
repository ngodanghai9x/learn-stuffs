const fs = require('fs');
const { PassThrough, Writable } = require('node:stream');

const pass = new PassThrough();
const writable = new Writable();

pass.pipe(writable);
pass.unpipe(writable);
// readableFlowing is now false.

pass.on('data', (chunk) => {
  console.log('chunk=', chunk.toString());
});
// readableFlowing is still false.
pass.write('ok 123 456'); // Will not emit 'data'.
pass.resume(); // Must be called to make stream emit 'data'.

// readableFlowing is now true.
/**
 * stream: dòng chảy dữ liệu binary , Stream in Node.js simply means a sequence of data being moved from one point to the other over time. The whole concept is, you have a huge amount of data to process, but you don’t need to wait for all the data to be available before you start processing it.
 * chunks: tập hợp 1 đoạn dữ liệu binary chảy trên stream
 * buffer: nơi chứa dữ liệu stream chảy tới or là 1 đoạn dữ liệu, lưu dưới dạng hex, là lớp để tương tác vs octet streams in TCP streams, file system operations, ..
 * That “waiting area” is the buffer!
 * https://www.freecodecamp.org/news/do-you-want-a-better-understanding-of-buffer-in-node-js-check-this-out-2e29de2968e8/
 * https://viblo.asia/p/bai-3-stream-va-buffer-trong-nodejs-ban-da-nam-duoc-nhung-khai-niem-nay-m68Z0W4XKkG
 * https://medium.com/developers-arena/streams-and-buffers-in-nodejs-30ff53edd50f
 * A buffer is a temporary memory that a stream takes to hold some data until it is consumed.
 */

const readable = fs.createReadStream(__dirname + "/buffer.js", {
  // encoding: "utf8",
  highWaterMark: 0.25 * 1024,
});

const writeable = fs.createWriteStream(__dirname + "/buffer-copy.js");

readable.on("data", (chunk) => {
  console.log(chunk.length, chunk);
  writeable.write(chunk);
});
