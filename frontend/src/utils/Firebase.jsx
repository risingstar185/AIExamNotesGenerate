// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth,GoogleAuthProvider} from 'firebase/auth'


const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,

  authDomain: "auth-exam-notes.firebaseapp.com",
  projectId: "auth-exam-notes",
  storageBucket: "auth-exam-notes.firebasestorage.app",
  messagingSenderId: "673831170801",
  appId: "1:673831170801:web:49bae7ac17e795049a6f50",
  measurementId: "G-677GRLV0Z7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth=getAuth(app)
const provider=new GoogleAuthProvider()

export {auth,provider}