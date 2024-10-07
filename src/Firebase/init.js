import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"; // 导入 Firestore
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyAYQeAT1WPLS2lb2TRqrhJWy0hZvL-04bw",
  authDomain: "ass-f26fb.firebaseapp.com",
  projectId: "ass-f26fb",
  storageBucket: "ass-f26fb.appspot.com",
  messagingSenderId: "459493357077",
  appId: "1:459493357077:web:31c693c4e408f5d34cc01c",
  measurementId: "G-W3DXKTTMRH"
};


const app = initializeApp(firebaseConfig);

getAnalytics(app);


const db = getFirestore(app);

export default db;
