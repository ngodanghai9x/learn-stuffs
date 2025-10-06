const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();

    // B1: Mở trang login
    await page.goto('https://connecttripau.com/login', { waitUntil: 'networkidle2' });

    // B2: Click nút login
    await page.click('div.logig-with'); // thay selector cho đúng nút login
    await page.waitForNavigation({ waitUntil: 'networkidle2' });

    // B3: Điền form signup
    const username = `u_${Date.now()}`;
    const password = `${username}@12aA`;

    let success = false;

    for (let attempt = 1; attempt <= 3; attempt++) {
        console.log(`🔄 Attempt ${attempt}...`);

        // Điền form lại (nếu trang reset input thì cần clear trước)
        const inputs = await page.$$('.regist-input');

        // await page.type('input[placeholder="Your username"]', username);
        // await page.type('input[placeholder="Your phone numbers or email"]', `${username}@gmail.com`);
        // await page.type('input[placeholder="Login password"]', password);
        // await page.type('input[placeholder="Confirm Password"]', password);
        // await page.type('input[placeholder="Enter fund password"]', password);
        // await page.type('input[placeholder="Invitation code"]', '117527');

        await inputs[0].type(username); // username
        await inputs[1].type(`${username}@gmail.com`); // tel/email
        await inputs[2].type(password); // password
        await inputs[3].type(password); // confirm password
        await inputs[4].type(password); // fund password
        await inputs[5].type('117527'); // invitation code

        // Pause 3s để bạn quan sát
        // await page.waitForTimeout(3000);

        // Chờ response từ nút Sign Up
        const [response] = await Promise.all([
            page.waitForResponse(
                (res) =>
                    res.url().includes('api/cat/v1/auth/register') && res.request().method() === 'POST',
            ),
            page.click('button.regist-btn.login'),
        ]);

        const result = await response.json();
        console.log('👉 Response:', result);

        if (result.code !== 'code_not_exist') {
            console.log('✅ Invitation code invalid như mong đợi');
            success = true;
            break;
        } else {
            console.log('❌ Response khác, thử lại...');
            // Nếu cần reset form trước khi thử lại thì thêm page.reload() hoặc clear input
        }
    }

    if (!success) {
        console.log('⛔ Sau 3 lần thử vẫn không nhận được message mong đợi, dừng lại.');
    }
})();
