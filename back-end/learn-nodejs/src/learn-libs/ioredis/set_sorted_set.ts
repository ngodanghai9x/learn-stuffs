import Redis from 'ioredis';

const redis = new Redis(`0.0.0.0:6379`);

async function mySortedSet() {
    const scores = [
        { name: 'Bob', score: 80 },
        { name: 'Jeff', score: 59.5 },
        { name: 'Tom', score: 100 },
        { name: 'Alex', score: 99.5 },
    ];
    const clonedScores = JSON.parse(JSON.stringify(scores)) as any[];
    clonedScores.sort((a, b) => a.score - b.score);
    console.log('🚀 ~ mySortedSet ~ clonedScores:', clonedScores);
    const scoreMembers = scores.map(({ name, score }) => [score, name]);
    await redis.zadd('user-zset', ...(scoreMembers as any));
    // await redis.zadd('user-zset', ...scoreMembers.flat());

    console.log(await redis.zrange('user-zset', 0, scores.length - 1)); // [ 'Jeff', 'Bob', 'Alex', 'Tom' ]
    console.log(await redis.zrangebyscore('user-zset', '-inf', '+inf')); // [ 'Jeff', 'Bob', 'Alex', 'Tom' ]

    console.log(await redis.zrevrange('user-zset', 0, scores.length - 1)); // [ 'Tom', 'Alex', 'Bob', 'Jeff' ]
    console.log(await redis.zrevrangebyscore('user-zset', '+inf', '-inf')); // [ 'Tom', 'Alex', 'Bob', 'Jeff' ]

    console.log(await redis.zrange('user-zset', 2, 3)); // [ 'Alex', 'Tom' ]
    console.log(await redis.zrange('user-zset', 2, 3, 'WITHSCORES')); // [ 'Alex', '99.5', 'Tom', '100' ]

    console.log(await redis.zrange('user-zset', 2, 3, 'REV')); // [ 'Bob', 'Jeff' ]
    console.log(await redis.zrevrange('user-zset', 2, 3)); // [ 'Bob', 'Jeff' ]

    console.log(await redis.zrange('user-zset', 80, 100, 'BYSCORE')); // [ 'Bob', 'Alex', 'Tom' ]
    console.log(await redis.zrangebyscore('user-zset', 80, 100)); // [ 'Bob', 'Alex', 'Tom' ]
    return redis.disconnect();
}

async function myAppendSet() {
    // await redis.rpush('my_rpush', ...[12,33]);
    // // await redis.rpush('my_rpush', 123);
    // // await redis.rpush('my_rpush', 12);
    // const array = await redis.lrange('my_rpush', 0, -1);
    // console.log("🚀 ~ my_rpush ~ array:", array)

    await redis.sadd('my_sadd', ...[12, 33, 1, 2, 3, 4]);
    await redis.sadd('my_sadd', 123);
    await redis.sadd('my_sadd', 12);
    const randomMember = await redis.srandmember('myset');
    console.log('Random member:', randomMember); // Ví dụ: "banana"
    await redis.srem('my_sadd', 33);
    const array2 = await redis.smembers('my_sadd');
    console.log('🚀 ~ myAppendSet ~ array:', array2);
}

myAppendSet();