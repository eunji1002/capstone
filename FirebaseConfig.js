import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBfKDXuc8GEih4O2fJFmuAqgMTvarm7Jhk",
  authDomain: "bacoding-6e5fe.firebaseapp.com",
  projectId: "bacoding-6e5fe",
  storageBucket: "bacoding-6e5fe.appspot.com",
  messagingSenderId: "1050154892501",
  appId: "1:1050154892501:web:57632df1d35318f211f65c",
  measurementId: "G-X5K6T8M644"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

if (!firebase.apps.length) {
  console.log("Connect");
  firebase.initializeApp(firebaseConfig);
}