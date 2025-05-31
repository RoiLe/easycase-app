// src/firebase/firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCPP4p_vxcMr0JpXkvQ6FXTd0yiaERiLAQ",
  authDomain: "easycase-2c3a2.firebaseapp.com",
  projectId: "easycase-2c3a2",
  storageBucket: "easycase-2c3a2.appspot.com",
  messagingSenderId: "682066629654",
  appId: "1:682066629654:web:60fec297ec7f2bc40e1137",
  measurementId: "G-R2CJNYQ6P2"
};

const app = initializeApp(firebaseConfig);

// ✅ Export the app to be reused in Firestore and Storage
const db = getFirestore(app);
export { app, db };
