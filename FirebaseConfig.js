import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// import { getMessaging, getToken } from "firebase/messaging";


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
// const messaging = getMessaging(app);
const analytics = getAnalytics(app);

if (!firebase.apps.length) {
  console.log("Firebase Connect");
  firebase.initializeApp(firebaseConfig);
}

// ios에선 안된다는듯..?
// Notification.requestPermission().then((permission) => {
//   if (permission === 'granted') {
//     console.log('알림 권한이 부여되었습니다.');
    
//     // 사용자가 알림 권한을 부여했을 때 토큰을 가져옵니다.
//     getToken(messaging, { vapidKey: 'AAAA9IIb_NU:APA91bG-svqKIKvlH_PAQNkUp5O330b4w3BbHPcEcVZqo21NrC-ZcILC0A1xF2YQ9c0ICtWXTu7itsc6nfOboG8_kMIhSRtIIYl-cj4CAyXzz2gwHUmxdBfBse3937re8p3-7A-F73ww' }).then((currentToken) => {
//       if (currentToken) {
//         // 토큰을 서버로 보내거나 필요한 작업을 수행합니다.
//         console.log('현재 푸시 토큰:', currentToken);
//       } else {
//         console.log('푸시 토큰을 가져올 수 없습니다.');
//       }
//     }).catch((error) => {
//       console.error('푸시 토큰 가져오기 오류:', error);
//     });
//   } else {
//     console.log('사용자가 알림 권한을 거부했습니다.');
//   }
// }).catch((error) => {
//   console.error('알림 권한 요청 오류:', error);
// });
