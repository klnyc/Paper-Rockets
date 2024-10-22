import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDtyoF6ABke7GGUwqWz81tLSmrV1UQnym8",
  authDomain: "paper-rockets.firebaseapp.com",
  projectId: "paper-rockets",
  storageBucket: "paper-rockets.appspot.com",
  messagingSenderId: "238427902287",
  appId: "1:238427902287:web:0de9ca83b5598a3766b53a",
  measurementId: "G-EY5JBHPNMK",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const firestore = getFirestore(app);
