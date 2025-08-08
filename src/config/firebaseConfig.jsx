import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC-BgKjoO1LAEkif2zvF5ioECy4Ik8fcOk",
  authDomain: "phimhay-773dc.firebaseapp.com",
  projectId: "phimhay-773dc",
  storageBucket: "phimhay-773dc.firebasestorage.app",
  messagingSenderId: "489596168333",
  appId: "1:489596168333:web:70c7f2976377abe7d11ac4",
  measurementId: "G-0452F254XE"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Firebase services
export const db = getFirestore(app);
export const storage = getStorage(app);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();