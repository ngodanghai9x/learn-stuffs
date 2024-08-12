const AWS = require('aws-sdk');
const archiver = require('archiver');
const fs = require('fs');

AWS.config.update({
  accessKeyId: 'YOUR_ACCESS_KEY_ID',
  secretAccessKey: 'YOUR_SECRET_ACCESS_KEY',
});

const s3 = new AWS.S3();

const bucketName = 'your-bucket-name';
const folderPath = 'your-folder-path/';

function downloadFolder() {
  const outputStream = fs.createWriteStream('output.zip');
  const archive = archiver('zip', { zlib: { level: 9 } });
  archive.pipe(outputStream);

  const params = {
    Bucket: bucketName,
    Prefix: folderPath,
  };

  s3.listObjectsV2(params, (err, data) => {
    if (err) {
      console.error(err);
      return;
    }

    // Iterate through the objects and add them to the archive
    data.Contents.forEach((object) => {
      const getObjectParams = {
        Bucket: bucketName,
        Key: object.Key,
      };

      // Retrieve the object from S3 and add it to the archive
      const s3Stream = s3.getObject(getObjectParams).createReadStream();
      archive.append(s3Stream, { name: object.Key });
    });

    // Finalize the archive and close the output stream
    archive.finalize();
    outputStream.on('close', () => {
      console.log('All files downloaded and archived successfully.');
    });
  });
}
