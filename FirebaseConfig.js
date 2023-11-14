// import { useEffect } from 'react';
// import * as Notifications from 'expo-notifications';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";



// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBfKDXuc8GEih4O2fJFmuAqgMTvarm7Jhk",
  authDomain: "bacoding-6e5fe.firebaseapp.com",
  projectId: "bacoding-6e5fe",
  storageBucket: "bacoding-6e5fe.appspot.com",
  messagingSenderId: "1050154892501",
  appId: "1:1050154892501:web:57632df1d35318f211f65c",
  measurementId: "G-X5K6T8M644"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);


if (!firebase.apps.length) {
  console.log("Firebase Connect");
  firebase.initializeApp(firebaseConfig);
}

export { db }; 
// Initialize Expo Notifications
// Notifications.setNotificationHandler({
//   handleNotification: async () => ({
//     shouldShowAlert: true,
//     shouldPlaySound: false,
//     shouldSetBadge: false,
//   }),
// });

// export default function App() {
//   useEffect(() => {
//     registerForPushNotificationsAsync();
//   }, []);

//   const registerForPushNotificationsAsync = async () => {
//     try {
//       const { status } = await Notifications.requestPermissionsAsync();
//       if (status === 'granted') {
//         const tokenData = await Notifications.getExpoPushTokenAsync();
//         const expoPushToken = tokenData.data;
//         console.log('Expo Push Token:', expoPushToken);

//         // Firebase에 Expo Push Token 저장 또는 필요한 작업 수행
//         // 예: firestore.collection('tokens').doc(expoPushToken).set({ /* token 데이터 */ });

//       } else {
//         console.log('Permission not granted!');
//       }
//     } catch (error) {
//       console.error('Error getting Expo Push Token:', error);
//     }
//   };


// }