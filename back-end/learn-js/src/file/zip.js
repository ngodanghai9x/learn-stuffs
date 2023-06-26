const fs = require('fs');
const archiver = require('archiver');
const { Stream } = require('stream');

/**
 * @param {String} sourceDir: /some/folder/to/compress
 * @param {String} outPath: /path/to/created.zip
 * @returns {Promise}
 */
function zipDirectory(sourceDir, outPath) {
  const archive = archiver('zip', { zlib: { level: 9 } });
  const stream = fs.createWriteStream(outPath);

  return new Promise((resolve, reject) => {
    archive
      .directory(sourceDir, false)
      .on('error', (err) => reject(err))
      .pipe(stream);

    stream.on('close', () => resolve(stream));
    archive.finalize();
  });
}

// function zipDirectory2(sourceDir) {
//   const archive = archiver('zip', { zlib: { level: 9 } });
//   const streamPassThrough = new Stream.PassThrough();

//   return new Promise((resolve, reject) => {
//     archive
//       .directory(sourceDir, false)
//       .on('error', (err) => reject(err))
//       .pipe(streamPassThrough);

//     streamPassThrough.on('close', () => resolve());
//     archive.finalize();
//   });
// }

function zipDirectory2(sourceDir, any) {
  const archive = archiver('zip', { zlib: { level: 9 } });
  const streamPassThrough = new Stream.PassThrough();

  return new Promise((resolve, reject) => {
    archive
      .directory(sourceDir, false)
      .on('error', (err) => reject(err))
      .pipe(streamPassThrough);

    streamPassThrough.on('close', () => resolve(Stream.Readable(streamPassThrough)));
    archive.finalize();
  });
}

async function writeZipDirectory(sourceDir, outPath) {
  const archive = archiver('zip', { zlib: { level: 9 } });
  const stream = fs.createWriteStream(outPath, { flags: 'w' });

  return new Promise((resolve, reject) => {
    archive
      .directory(sourceDir, false)
      .on('error', (err) => reject(err))
      .pipe(stream);

    stream.on('close', () => {
      return resolve(stream);
    });
    archive.finalize();
  });
}

writeZipDirectory(
  '/home/gem/Documents/WorkRepo/UPR/upr-training-be/uploads/finalHai222/annotations',
  '/home/gem/Documents/MyRepo/learning/back-end/learn-js/src/file/abc123.zip',
).then((data) => console.log('abc', data.bytesWritten));
