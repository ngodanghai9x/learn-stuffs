import Redis from 'ioredis';

const redis = new Redis(`0.0.0.0:6379`);

async function usePipeline() {
    const pipeline = redis.pipeline();

    // Thêm các lệnh vào pipeline
    pipeline.set('key1', 'value1');
    pipeline.set('key2', 'value2');
    pipeline.incr('counter');
    pipeline.get('key1');

    // Thực thi tất cả các lệnh trong pipeline
    const results = await pipeline.exec();

    console.log(results);
    // Output sẽ là một mảng kết quả, mỗi phần tử là một cặp [error, result]
    // Ví dụ:
    // [
    //   [null, 'OK'], // Kết quả của lệnh SET key1
    //   [null, 'OK'], // Kết quả của lệnh SET key2
    //   [null, 1],    // Kết quả của lệnh INCR counter (giá trị sau khi tăng)
    //   [null, 'value1'] // Kết quả của lệnh GET key1
    // ]
    return redis.disconnect();
}

usePipeline().catch(console.error);
