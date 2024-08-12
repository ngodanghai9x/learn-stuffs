// const cookie = require('cookie');
const signature = require('cookie-signature');

const serverKey = '1lvgZXcVltXcOHYrfmPlclOkuiZtacJV';
const receivedCookie = 's:cookieValue.signedPart'; // Giá trị cookie nhận được từ client

// Giải mã cookie
// const cookies = cookie.parse('myCookie=' + receivedCookie);
// const signedValue = cookies.myCookie;
const signedValue = 's:.f+yhJQcw+gLLwQN+MpTI2JX1+xNgrVj9yBfSfIjEnQU; _ga=GA1.1.99638640.1721732587; ';

// const unsignedValue = signature.unsign(signedValue, serverKey);
// if (unsignedValue) {
//     console.log('Decrypted value:', unsignedValue);
// }

// exit(1);

if (signedValue.startsWith('s:')) {
    console.log("🚀 ~ signedValue:", signedValue)
    const unsignedValue = signature.unsign(signedValue.slice(2), serverKey);
    console.log("🚀 ~ unsignedValue:", unsignedValue)
    if (unsignedValue) {
        console.log('Decrypted value:', unsignedValue);
    } else {
        console.log('Invalid signature!');
    }
} else {
    console.log('Cookie is not signed!');
}
