import Redis from 'ioredis';

const redis = new Redis(`0.0.0.0:6379`);

const docsSample = () => {
    redis.set('mykey', 'value'); // Returns a promise which resolves to "OK" when the command succeeds.

    // ioredis supports the node.js callback style
    redis.get('mykey', (err, result) => {
        if (err) {
            console.error(err);
        } else {
            console.log(result); // Prints "value"
        }
    });

    // Or ioredis returns a promise if the last argument isn't a function
    redis.get('mykey').then((result) => {
        console.log(result); // Prints "value"
    });

    redis.zadd('mySortedSet', 1, 'one', 2, 'dos', 4, 'quatro', 3, 'three');
    redis.zrange('mySortedSet', 0, 2, 'WITHSCORES').then((elements) => {
        // ["one", "1", "dos", "2", "three", "3"] as if the command was `redis> ZRANGE mySortedSet 0 2 WITHSCORES`
        console.log(elements);
    });

    // All arguments are passed directly to the redis server,
    // so technically ioredis supports all Redis commands.
    // The format is: redis[SOME_REDIS_COMMAND_IN_LOWERCASE](ARGUMENTS_ARE_JOINED_INTO_COMMAND_STRING)
    // so the following statement is equivalent to the CLI: `redis> SET mykey hello EX 10`
    redis.set('mykey', 'hello', 'EX', 10);
};
function safeParse(item: any) {
    try {
        return JSON.parse(item);
    } catch (error) {
        console.log('🚀 ~ safeParse ~ error:', item, error);
        return null;
    }
}

const mySample = async () => {
    const msetObj: Record<string, any> = {
        // haind: [1, 2, 3],
        haind2: [{ a: 1 }, { a: 2 }],
        // haind3: { a: 1, b: 2 },
    };
    const msetArray = [];
    Object.keys(msetObj).forEach((key) => {
        msetArray.push(key, msetObj[key]);
        // msetArray.push(key, JSON.stringify(msetObj[key]));
    });
    console.log('🚀 ~ Object.entries ~ msetArray:', msetArray);
    await redis.mset(msetArray);
    const rawData: string[] = await redis.mget(Object.keys(msetObj));
    const data = rawData.map((item) => safeParse(item));

    console.log('🚀 ~ mySample ~ data:', {
        rawData,
        isArray: Array.isArray(rawData),
        data,
    });

    return redis.disconnect();
};

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

mySortedSet();
