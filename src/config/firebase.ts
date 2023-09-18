// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBaCslIgOuTxfhnfP46PLZTeCp8mchODKA",
  authDomain: "dnd-image-gallery.firebaseapp.com",
  projectId: "dnd-image-gallery",
  storageBucket: "dnd-image-gallery.appspot.com",
  messagingSenderId: "445734659756",
  appId: "1:445734659756:web:e8460bb61c7ed3694aa109"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth();
const storage = getStorage(app);

export {db,auth, storage}