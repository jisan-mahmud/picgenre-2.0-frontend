import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyD7wLdfSOdLIHLe-TEVeks9JPDCldHYc0I",
  authDomain: "picgenre-c6d2c.firebaseapp.com",
  projectId: "picgenre-c6d2c",
  storageBucket: "picgenre-c6d2c.firebasestorage.app",
  messagingSenderId: "201381686635",
  appId: "1:201381686635:web:2744840af7add11be2702e",
  measurementId: "G-KYJVG0G81P"
};


const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
