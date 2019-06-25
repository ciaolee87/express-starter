import * as firebase from "firebase-admin";
// 파이어 베이스 초기화
export const FirebaseAdmin = firebase.initializeApp({
    credential: firebase.credential.cert({
        projectId: process.env.FB_PROJECT_ID,
        clientEmail: process.env.FB_CLIENT_EMAIL,
        privateKey: process.env.FB_PRIVATE_KEY
    }),
    databaseURL: process.env.FB_DATABASE_URL
});
