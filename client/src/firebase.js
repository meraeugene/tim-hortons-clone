// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "tim-hortons-clone-677a9.firebaseapp.com",
  projectId: "tim-hortons-clone-677a9",
  storageBucket: "tim-hortons-clone-677a9.appspot.com",
  messagingSenderId: "1012388593551",
  appId: "1:1012388593551:web:5ff44fc792bdf2676d95fa"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);