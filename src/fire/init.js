import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"; 
import { getAnalytics } from "firebase/analytics";
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyAYQeAT1WPLS2lb2TRqrhJWy0hZvL-04bw",
  authDomain: "ass-f26fb.firebaseapp.com",
  projectId: "ass-f26fb",
  storageBucket: "ass-f26fb.appspot.com",
  messagingSenderId: "459493357077",
  appId: "1:459493357077:web:31c693c4e408f5d34cc01c",
  measurementId: "G-W3DXKTTMRH"
};



initializeApp(firebaseConfig);

const db = getFirestore()
export default db