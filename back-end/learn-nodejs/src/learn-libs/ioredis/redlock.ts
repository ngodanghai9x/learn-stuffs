import Redlock, { Lock, ExecutionError } from 'redlock';
import Redis from 'ioredis';

// Khởi tạo các client Redis
const redisClient1 = new Redis();
const redisClient2 = new Redis();
const redisClient3 = new Redis();

// Khởi tạo đối tượng Redlock với các Redis clients
const redlock = new Redlock(
    // Bạn có thể truyền một hoặc nhiều Redis clients
    [
        redisClient1,
        // redisClient2, redisClient3
    ],
    {
        // The expected clock drift; for more details see:
        // http://redis.io/topics/distlock
        driftFactor: 0.01, // multiplied by lock ttl to determine drift time

        // The max number of times RedisLock will attempt to lock a resource
        // before erroring.
        retryCount: 10,

        // the time in ms between attempts
        retryDelay: 200, // time in ms

        // the max time in ms randomly added to retries
        // to improve performance under high contention
        // see https://www.awsarchitectureblog.com/2015/03/backoff.html
        retryJitter: 200, // time in ms

        // The minimum remaining time on a lock before an extension is automatically
        // attempted with the using API.
        automaticExtensionThreshold: 500, // time in ms
    },
);

async function performTaskWithLock() {
    // Tạo khóa với thời gian tồn tại 10 giây (10,000 ms)
    const key = 'haind2_resource_name1';
    const lock = await redlock.acquire([`locks:${key}`], 10000);
    console.log('111 Lock acquired! Performing task...');
    /// 111 lock theo key => 222 sẽ k chạy mà throw error => chạy vào catch => new test case
    try {
        const lock2 = await redlock.acquire([`locks:${key}`], 10000);
        console.log('222 Lock acquired! Performing task...');

        const data = await lock.release();

        console.log('333 Lock released!');
    } catch (err) {
        console.error('Failed to acquire lock:', err);
        const data = await lock.release();
        console.log('444 Lock acquired! Performing task...');

        const lock2 = await redlock.acquire([`locks:${key}`], 10000);

        const data2 = await lock2.release();
        // Thực hiện tác vụ an toàn khi đã có khóa
        console.log('555 Lock acquired! Performing task...');
    } finally {
        await redlock.quit();
    }
}

performTaskWithLock();
