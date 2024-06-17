import admin from "firebase-admin";

// 管理 SDK を初期化
try {
    admin.initializeApp();
} catch(err) {
    if (!/already exists/.test(err.message)) {
        console.error('Firebase initialization error', err.stack)
    }
}

// ID トークンを検証する関数を（他のファイルからインポートして使用できるように）エクスポート
export async function verifyIdToken(req) { 
    const idToken = req.body.token;
    var decodedToken;
    try {
        decodedToken = await admin.auth().verifyIdToken(idToken);  // 渡されたトークンを管理SDK のライブライ関数で内容を検証し、検証に成功した場合は得られたユーザー情報を格納
    } catch(err) {
        decodedToken = null;  // 検証に失敗した場合は、null を格納
    }
    return decodedToken; 
}