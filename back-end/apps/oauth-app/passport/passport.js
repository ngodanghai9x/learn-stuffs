const express = require('express');
const passport = require('passport');
const session = require('express-session');
const FacebookStrategy = require('passport-facebook').Strategy;

const app = express();

// ⚙️ Passport config
passport.use(
    new FacebookStrategy(
        {
            clientID: 'FACEBOOK_APP_ID',
            clientSecret: 'FACEBOOK_APP_SECRET',
            callbackURL: 'http://localhost:3000/auth/facebook/callback',
            profileFields: ['id', 'emails', 'name'], // lấy email, name
        },
        function (accessToken, refreshToken, profile, done) {
            // Ở đây: tìm user trong DB hoặc tạo mới
            // Ví dụ:
            const user = {
                facebookId: profile.id,
                email: profile.emails?.[0]?.value,
                name: profile.name.givenName + ' ' + profile.name.familyName,
            };
            return done(null, user);
        },
    ),
);
// #1
// Khi login thành công (OAuth, local, whatever)
// passport.serializeUser((user, done) => done(null, user));
// passport.deserializeUser((obj, done) => done(null, obj));

// #2
// passport.serializeUser((user, done) => {
//     // Serialize khác nhau tùy Strategy
//     if (user.provider === 'google') {
//         done(null, { id: user.id, provider: 'google' });
//     } else if (user.provider === 'facebook') {
//         done(null, { id: user.id, provider: 'facebook' });
//     } else {
//         done(null, { id: user.id, provider: 'local' });
//     }
// });
// passport.deserializeUser(async (obj, done) => {
//     try {
//         let user;
//         if (obj.provider === 'google') {
//             user = await User.findByGoogleId(obj.id);
//         } else if (obj.provider === 'facebook') {
//             user = await User.findByFacebookId(obj.id);
//         } else {
//             user = await User.findById(obj.id);
//         }
//         done(null, user);
//     } catch (err) {
//         done(err);
//     }
// });

// #3
// Khi login thành công (OAuth, local, whatever)
passport.serializeUser((user, done) => {
    // Giả sử mình tạo JWT từ user
    const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });
    // Lưu JWT vào session
    done(null, token);
});
// Deserialize: từ JWT -> user object
passport.deserializeUser((token, done) => {
    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET);
        // payload = { id, email, iat, exp }
        done(null, payload); // req.user = payload
    } catch (err) {
        done(err);
    }
});

// 🔐 Session config
app.use(session({ secret: 'SECRET_KEY', resave: false, saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());

// Start login with Facebook
// ## 🌐 Route: FE sẽ gọi để lấy auth URL + state
app.get('/auth/facebook/url', passport.authenticate('facebook', { scope: ['email'] }));

// Facebook callback
// ## 📥 Route: callback nhận code + state
app.get('/auth/facebook/callback', passport.authenticate('facebook', { failureRedirect: '/login' }), (req, res) => {
    // Successful login
    res.send(`Hello ${req.user.name}, your email: ${req.user.email}`);
});

// Simple home
app.get('/', (req, res) => res.send('<a href="/auth/facebook">Login with Facebook</a>'));

// Logout
app.get('/logout', (req, res) => {
    req.logout(() => {
        res.redirect('/');
    });
});

// Start server
app.listen(3000, () => console.log('Server started on http://localhost:3000'));
