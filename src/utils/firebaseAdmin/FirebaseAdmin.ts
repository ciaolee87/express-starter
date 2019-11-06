import * as firebase from "firebase-admin";

// 파이어 베이스 초기화
const config = require(process.env.FIREBASE_KEY);
export const FirebaseAdmin = firebase.initializeApp(config);
