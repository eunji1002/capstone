// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyACbfJJ6hmEF751yZD3V7rR459wT5cF8iw",
  authDomain: "barcoding-f25fb.firebaseapp.com",
  projectId: "barcoding-f25fb",
  storageBucket: "barcoding-f25fb.appspot.com",
  messagingSenderId: "732098874725",
  appId: "1:732098874725:web:458488b3fe84f313be658c",
  measurementId: "G-T7RKQJGJ16"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);