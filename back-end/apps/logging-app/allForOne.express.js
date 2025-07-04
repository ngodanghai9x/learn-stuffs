const express = require('express');
const mongoose = require('mongoose');

const app = express();
const webhookRouter = express.Router({ mergeParams: true });

const env = {
    PORT: 7001,
    MONGODB_URI: 'mongodb://myuser:mypassword@localhost:27018/mydatabase',
};

const webhookLogSchema = new mongoose.Schema({
    haind_webhookType: { type: String, default: 'fulfillment' },
    method: String,
    originalUrl: String,
    path: String,
    hmacHeader: {
        type: mongoose.Schema.Types.Mixed,
        required: false,
    },
    rawBody: {
        type: mongoose.Schema.Types.Mixed,
        required: false,
    },
    body: {
        type: mongoose.Schema.Types.Mixed,
        required: false,
    },
    headers: {
        type: mongoose.Schema.Types.Mixed,
        required: false,
    },
    query: {
        type: mongoose.Schema.Types.Mixed,
        required: false,
    },
    params: {
        type: mongoose.Schema.Types.Mixed,
        required: false,
    },
    // email: { type: String, unique: true },
    createdAt: { type: Date, default: Date.now },
});

const WebhookLog = mongoose.model('WebhookLog304', webhookLogSchema);

// shopify login --store your-store.myshopify.com
function logRequest(req, res, next) {
    // console.log('--- Incoming Request ---');
    next(); // Quan trọng: Cho request đi tiếp
}

webhookRouter.all(/^.*$/, async (req, res) => {
    const json = {
        haind_webhookType: 'fulfillment',
        method: req.method || null,
        query: req.query ? JSON.parse(JSON.stringify(req.query, null, 2)) : null,
        headers: req.headers ? JSON.parse(JSON.stringify(req.headers, null, 2)) : null,
        body: req.body ? JSON.parse(JSON.stringify(req.body, null, 2)) : null,
        rawBody: (req.rawBody) || null,
        hmacHeader: req.get('X-Shopify-Hmac-Sha256'),
        params: req.params || null,
        path: req.path || null,
        originalUrl: req.originalUrl || null,
    };
    // console.log('--- Incoming Request ---');
    // console.log('json:', json);
    // console.log('Headers:', JSON.stringify(req.headers, null, 2));
    // console.log('Body:', JSON.stringify(req.body, null, 2));
    console.log('req:', `${json.method}: ${json.originalUrl}`);
    // console.log('-------------------------');

    // const log = await WebhookLog.create(json);
    console.log('🚀 ~ webhookRouter.all ~ log:', JSON.stringify(json, null, 2));

    return res.json({
        notMiddleware: true,
        ...json,
    });
});

app.use(express.json());
app.use(logRequest); // Gắn middleware log ở đây
// https://58e9-118-70-171-220.ngrok-free.app/webhook/:storeId/abc
app.use('/webhook/:storeId/', webhookRouter);
// https://58e9-118-70-171-220.ngrok-free.app/high-level/webhook/create-order
// https://95cf-118-70-171-220.ngrok-free.app/high-level/webhook/create-product
app.all(/^\/high-level\/webhook\/.*$/, async (req, res) => {
    const json = {
        haind_webhookType: 'other',
        method: req.method || null,
        query: req.query ? JSON.parse(JSON.stringify(req.query, null, 2)) : null,
        headers: req.headers ? JSON.parse(JSON.stringify(req.headers, null, 2)) : null,
        body: req.body ? JSON.parse(JSON.stringify(req.body, null, 2)) : null,
        rawBody: (req.rawBody) || null,
        hmacHeader: req.get('X-Shopify-Hmac-Sha256'),
        params: req.params || null,
        path: req.path || null,
        originalUrl: req.originalUrl || null,
    };
    // console.log('--- Incoming Request ---');
    // console.log('json:', json);
    // console.log('Headers:', JSON.stringify(req.headers, null, 2));
    // console.log('Body:', JSON.stringify(req.body, null, 2));
    console.log('req:', `${json.method}: ${json.originalUrl}`);
    // console.log('-------------------------');

    const log = await WebhookLog.create(json);
    // console.log('🚀 ~ webhookRouter.all ~ log:', log);

    return res.json({
        notMiddleware: true,
        ...json,
    });
});

mongoose
    .connect(env.MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        console.log('✅ Connected to MongoDB');
    })
    .catch((err) => {
        console.error('❌ MongoDB connection error:', err);
    });


// Bắt tất cả request
// app.all('*', (req, res) => {
//     console.log('Method:', req.method);
//     console.log('Path:', req.originalUrl);
//     console.log('Headers:', req.headers);
//     console.log('Body:', req.body);

//     res.send('Logged request info');
// });

// app.all('*', (req, res) => {
//     console.log('Method:', req.method);
//     console.log('Path:', req.originalUrl);
//     console.log('Headers:', req.headers);
//     console.log('Body:', req.body);
//     res.json({
//         method: req.method,
//         path: req.path,
//         body: req.body,
//         query: req.query,
//     });
// });

app.listen(env.PORT, () => {
    console.log(`Server is running on port ${env.PORT}`);
});
