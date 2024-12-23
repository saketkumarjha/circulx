import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth, RecaptchaVerifier } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyCvuwd5lynhjY1iRZMMiZgdXf-vvUKYiuM",
    authDomain: "circulx-1.firebaseapp.com",
    projectId: "circulx-1",
    storageBucket: "circulx-1.firebasestorage.app",
    messagingSenderId: "617667211445",
    appId: "1:617667211445:web:6b2d96a9e4cc0894ff0efc",
    measurementId: "G-ZPSBVKFK7M"
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);

export { app, auth, RecaptchaVerifier };

