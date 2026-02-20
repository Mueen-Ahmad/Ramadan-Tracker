
import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged, signOut, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCDQa0gjX6yBv3pFEL2pPsrXcCDLe0laew",
  authDomain: "ramadan-tracker-4e36f.firebaseapp.com",
  projectId: "ramadan-tracker-4e36f",
  storageBucket: "ramadan-tracker-4e36f.firebasestorage.app",
  messagingSenderId: "804975612788",
  appId: "1:804975612788:web:57fe26c85ae27fc9b91221",
  measurementId: "G-81DV8JX8TC"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

// Exporting methods to ensure all components use the same library instance
export { 
  onAuthStateChanged, 
  signOut, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword,
  doc,
  getDoc,
  setDoc
};
