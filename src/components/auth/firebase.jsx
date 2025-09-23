import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"

/*
    NOTE: THIS DOES NOT WORK SA GITHUB PAGES. This should work on vercel. pero okay lang naman daw na publicly available to (frontend) and kahit sa github repo.

const firebaseConfig = {
  apiKey: import.meta.env.FIREBASE_API_KEY,
  authDomain: import.meta.env.FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.PROJECT_ID,
  storageBucket: import.meta.env.STORAGE_BUCKET,
  messagingSenderId: import.meta.env.MESSAGING_SENDER_ID,
  appId: import.meta.env.APP_ID,
  measurementId: import.meta.env.MEASUREMENT_ID
};
*/

const firebaseConfig = {
  apiKey: "AIzaSyDenaQpC44i30FU4_VCw-lcY2Ib57vbq5U",
  authDomain: "compsciety.firebaseapp.com",
  projectId: "compsciety",
  storageBucket: "compsciety.firebasestorage.app",
  messagingSenderId: "757330464511",
  appId: "1:757330464511:web:d305269d6185fa137886ca",
  measurementId: "G-XSSZ3N09EL"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { app, auth };