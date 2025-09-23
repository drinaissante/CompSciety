import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"

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