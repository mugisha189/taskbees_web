import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyAILSVRueS0Cl_kb1q5k0a89ijggb9K05I",
  authDomain: "taskbees-auth.firebaseapp.com",
  projectId: "taskbees-auth",
  storageBucket: "taskbees-auth.firebasestorage.app",
  messagingSenderId: "763818516473",
  appId: "1:763818516473:web:00222db8e33c2e5c06a728",
  measurementId: "G-R2F1NFDYXJ"
};
export const app = initializeApp(firebaseConfig);