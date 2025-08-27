import session from 'express-session';
import connectRedis from 'connect-redis';
import { createClient } from 'redis';

const RedisStore = connectRedis(session);
const redis = createClient({ socket: { host: '127.0.0.1', port: 6379 } });
await redis.connect();

app.use(
    session({
        store: new RedisStore({ client: redis, disableTouch: false }), // cho phép touch gia hạn TTL
        secret: process.env.SESSION_SECRET!,
        resave: false,
        saveUninitialized: false,
        cookie: {
            maxAge: 30 * 60 * 1000, // 30 phút
            httpOnly: true,
            sameSite: 'lax',
            secure: false, // true nếu chạy HTTPS
        },
        rolling: true, // gửi lại cookie mỗi response → store.touch → refresh TTL
    }),
);
