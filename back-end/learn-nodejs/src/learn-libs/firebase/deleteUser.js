const admin = require('firebase-admin');

// Nhập serviceAccountKey.json của bạn (tải từ Firebase Console)
const serviceAccount = require('./credentials/firebase-dev.credentials.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
});
const db = admin.firestore();
// Hàm xoá user trong Firebase Auth & Firestore
async function deleteUserData(uids) {
    // Xóa user khỏi Firebase Auth
    await admin.auth().deleteUsers(uids);
    console.log('✅ Đã xóa user khỏi Firebase Auth');

    // Xóa document tương ứng trong Firestore
    const batch = db.batch();
    uids.forEach((uid) => {
        const userDoc = db.collection('accounts').doc(uid);
        batch.delete(userDoc);
    });

    await batch.commit();
}

async function deleteAllUsers(nextPageToken) {
    let uids = [];
    try {
        // Lấy danh sách user
        const listUsersResult = await admin.auth().listUsers(1000, nextPageToken);

        if (listUsersResult.users.length === 0) {
            console.log('✅ Không còn user nào để xóa.');
            return;
        }

        // Lấy tất cả UID của user
        uids = listUsersResult.users.map((user) => user.uid);

        // Xóa user theo UID
        await deleteUserData(uids);
        console.log(`🗑️ Đã xóa ${uids.length} users`, uids);

        // Nếu còn user, tiếp tục xóa
        if (listUsersResult.pageToken) {
            await deleteAllUsers(listUsersResult.pageToken);
        }
    } catch (error) {
        console.error('❌ List users:', uids);
        console.error('❌ Lỗi khi xóa users:', error);
    }
}

// Gọi hàm để xóa toàn bộ user
deleteAllUsers();
