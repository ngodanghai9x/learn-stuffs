/**
Frontend (FE):
1. Khi user click "Login with Facebook":
    - FE sinh random state (hoặc backend sinh và trả lại)
    - Lưu state vào localStorage/sessionStorage (hoặc FE gọi backend để backend lưu vào session)
    - FE redirect user sang Facebook auth URL:
    ```
    https://www.facebook.com/v19.0/dialog/oauth?
        client_id=...
        redirect_uri=http://localhost:3000/auth/facebook/callback
        scope=email
        response_type=code
        state=xxx
    ```
2. Sau user login thành công, Facebook redirect về:
    `http://localhost:3000/auth/facebook/callback?code=abc123&state=xxx`

Backend (BE):
3. Backend nhận code + state
4. So sánh state trong session/backend với state FE gửi để chống CSRF
5. Gửi POST lên Facebook để lấy access_token
6. Dùng access_token gọi API Facebook lấy profile (id, email, name…)
7. Tìm/ tạo user trong DB
8. Sinh JWT (hoặc session) trả về FE
*/

const express = require('express');
const session = require('express-session');
const axios = require('axios');
const crypto = require('crypto');

const app = express();

// Session để lưu state
app.use(session({ secret: 'SECRET_KEY', resave: false, saveUninitialized: true }));

const FB_CLIENT_ID = 'YOUR_FB_CLIENT_ID';
const FB_CLIENT_SECRET = 'YOUR_FB_CLIENT_SECRET';
const REDIRECT_URI = 'http://localhost:3000/auth/facebook/callback';

// ## 🌐 Route: FE sẽ gọi để lấy auth URL + state
app.get('/auth/facebook/url', (req, res) => {
    const state = crypto.randomBytes(16).toString('hex');
    req.session.fb_oauth_state = state;

    const fbAuthUrl = `https://www.facebook.com/v19.0/dialog/oauth?` 
        + `client_id=${FB_CLIENT_ID}&redirect_uri=${encodeURIComponent(REDIRECT_URI)}` 
        + `&scope=email&response_type=code&state=${state}`;

    res.json({ url: fbAuthUrl });
});

// ## 📥 Route: callback nhận code + state
app.get('/auth/facebook/callback', async (req, res) => {
    const { code, state } = req.query;

    // Check state để chống CSRF
    if (state !== req.session.fb_oauth_state) {
        return res.status(400).send('Invalid state');
    }

    try {
        // 1. Exchange code lấy access_token
        const tokenResp = await axios.get('https://graph.facebook.com/v19.0/oauth/access_token', {
            params: {
                client_id: FB_CLIENT_ID,
                client_secret: FB_CLIENT_SECRET,
                redirect_uri: REDIRECT_URI,
                code,
            },
        });

        const accessToken = tokenResp.data.access_token;

        // 2. Lấy profile user
        const profileResp = await axios.get('https://graph.facebook.com/me', {
            params: { fields: 'id,name,email', access_token: accessToken },
        });

        const fbUser = profileResp.data;
        console.log('FB user:', fbUser);

        // 3. Tìm/ tạo user trong DB (giả sử ở đây trả về userId)
        const userId = fbUser.id; // Giả sử dùng fbId làm id

        // 4. Sinh JWT / session
        req.session.userId = userId;

        res.send(`Hello ${fbUser.name} (email: ${fbUser.email || 'N/A'})`);
    } catch (err) {
        console.error(err.response?.data || err);
        res.status(500).send('Login failed');
    }
});

// ## 🏠 Home
app.get('/', (req, res) =>
    res.send(`
  <a href="/auth/facebook/url">Login with Facebook</a>
`),
);

app.listen(3000, () => console.log('Server running on http://localhost:3000'));
