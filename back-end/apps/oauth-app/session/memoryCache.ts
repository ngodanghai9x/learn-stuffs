import session from 'express-session';

const store = new session.MemoryStore();

app.use(
    session({
        store,
        secret: 'dev-only',
        resave: false,
        saveUninitialized: false,
        cookie: { maxAge: 15 * 60 * 1000 },
    }),
);

// Job dọn rác mỗi phút
setInterval(() => {
    store.all((err, sessions) => {
        if (err || !sessions) return;
        const now = Date.now();
        Object.entries(sessions).forEach(([sid, sess]: any) => {
            const exp = sess?.cookie?.expires && new Date(sess.cookie.expires).getTime();
            if (exp && exp <= now) {
                store.destroy(sid, () => {});
            }
        });
    });
}, 60 * 1000);

