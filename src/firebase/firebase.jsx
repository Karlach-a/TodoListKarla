// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB4XXiGbKtTi4cb_VNGlc18sT3WcrFq3YY",
  authDomain: "todolist-ff686.firebaseapp.com",
  projectId: "todolist-ff686",
  storageBucket: "todolist-ff686.appspot.com",
  messagingSenderId: "553729853426",
  appId: "1:553729853426:web:c68b298424e7fac1d00d6b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);