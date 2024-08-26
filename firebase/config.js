// Importar funções necessárias do Firebase

import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, query, orderBy, limit, addDoc } from "firebase/firestore";
// Configuração do Firebase
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_APIKEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket:import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID
};

// Inicializar o Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
// Exportar Firestore e outras funções
export { db, collection, getDocs, query, orderBy, limit, addDoc };
