import { S3Client, S3, PutObjectCommand } from '@aws-sdk/client-s3';

const s3 = new S3({
    endpoint: 'http://localhost:9000', // Địa chỉ MinIO
    region: 'us-east-1', // Bắt buộc nhưng có thể là bất kỳ giá trị nào
    credentials: {
        accessKeyId: 'minioadmin',
        secretAccessKey: 'minioadmin',
    },
    forcePathStyle: true, // Bắt buộc vì MinIO không hỗ trợ kiểu truy cập "virtual-hosted style".
});

async function uploadFile() {
    const command = new PutObjectCommand({
        Bucket: 'my-bucket',
        Key: 'test.txt',
        Body: 'Hello MinIO!',
    });

    try {
        const response = await s3.send(command);
        console.log('Upload thành công:', response);
    } catch (err) {
        console.error('Lỗi upload:', err);
    }
}

// uploadFile();

async function putObjectS3(params, silentError = false) {
    return new Promise((resolve, reject) => {
        s3.putObject(
            {
                ...params,
                Bucket: params.Bucket || process.env.S3_BUCKET_RECOVERY,
            },
            (err, data) => {
                if (err) {
                    // Sentry.captureException('Failed putObjectS3', {
                    //     extra: {
                    //         params,
                    //         err,
                    //     },
                    // });
                    if (silentError) {
                        return resolve(null);
                    }

                    return reject(err);
                }
                if (data) {
                    return resolve(data);
                }
            },
        );
    });
}

putObjectS3({
    Key: 'key',
    Body: JSON.stringify({ now: 1, haind: 123, abc: 456 }),
    ContentType: 'application/json; charset=utf-8',
    Bucket: 'bucket-test',
});
