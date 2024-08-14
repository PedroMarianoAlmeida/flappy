import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, query, orderBy, limit, addDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBWBcU3YHRfmTLs1nWPGp2MggQhaHy-a04",
  authDomain: "passarinho-5130c.firebaseapp.com",
  projectId: "passarinho-5130c",
  storageBucket: "passarinho-5130c.appspot.com",
  messagingSenderId: "451993853101",
  appId: "1:451993853101:web:b06e7761b6107c4f757a24",
  measurementId: "G-SSRC9QQK13"
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export { db, collection, getDocs, query, orderBy, limit, addDoc };
