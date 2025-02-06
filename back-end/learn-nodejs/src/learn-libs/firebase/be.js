const admin = require('firebase-admin');

// Khởi tạo Firebase Admin SDK với credentials từ file JSON
admin.initializeApp({
  credential: admin.credential.cert({
    "type": "service_account",
    "project_id": "mb-dev-dev",
    "private_key_id": "",
    "private_key": "",
    "client_email": "firebase-adminsdk-69@mb-dev-dev.iam.gserviceaccount.com",
    "client_id": "",
    "auth_uri": "https://accounts.google.com/o/oauth2/auth",
    "token_uri": "https://oauth2.googleapis.com/token",
    "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
    "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-69%40mb-dev-dev.iam.gserviceaccount.com",
    "universe_domain": "googleapis.com"
  }),
});

async function generateCustomToken(uid) {
  try {
    // Tạo Custom Token cho user có UID cụ thể
    const customToken = await admin.auth().createCustomToken(uid);
    console.log('Custom Token:', customToken);
    return customToken;
  } catch (error) {
    console.error('Error creating custom token:', error);
  }
}

// Gọi hàm để tạo token cho một user cụ thể (thay thế "some-uid" bằng UID thật)
generateCustomToken("some-uid");
