// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import { getAuth, GoogleAuthProvider } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD8Wl73-Mnggh-bqP8lUcIDHsJ78Rk3AZs",
  authDomain: "chat-application-bc31b.firebaseapp.com",
  projectId: "chat-application-bc31b",
  storageBucket: "chat-application-bc31b.appspot.com",
  messagingSenderId: "929792236050",
  appId: "1:929792236050:web:68de02fd61018d6e6256cb",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const provider = new GoogleAuthProvider();

export const db = getFirestore(app);
