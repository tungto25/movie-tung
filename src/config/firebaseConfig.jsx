import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA3_8MK0lp-PVSlpL_S_76NUuSIhLnXw4o",
  authDomain: "tung-e462a.firebaseapp.com",
  projectId: "tung-e462a",
  storageBucket: "tung-e462a.firebasestorage.app",
  messagingSenderId: "348585678850",
  appId: "1:348585678850:web:33eb33504892194c8eef1b",
  measurementId: "G-CWT7X91FTL"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Firebase services
export const db = getFirestore(app);
export const storage = getStorage(app);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();