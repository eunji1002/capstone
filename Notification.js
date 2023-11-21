import { useState, useEffect, useRef } from 'react';
import { Text, View, Button, Platform } from 'react-native';
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import dayjs from 'dayjs';
import { doc, onSnapshot, collection } from 'firebase/firestore';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

export default function Notification() {
  const [expoPushToken, setExpoPushToken] = useState('');
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();

  useEffect(() => {
    registerForPushNotificationsAsync().then(token => setExpoPushToken(token));

    notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
      setNotification(notification);
    });

    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      console.log(response);
    });

    // Firestore의 실시간 업데이트를 감지하고 푸시 알림 예약
    const unsubscribe = listenForUpdates();

    return () => {
      Notifications.removeNotificationSubscription(notificationListener.current);
      Notifications.removeNotificationSubscription(responseListener.current);
      unsubscribe(); // 컴포넌트 언마운트 시 실시간 업데이트 리스너 해제
    };
  }, []);

  const listenForUpdates = () => {
      const currentUser = firebase.auth().currentUser;
      const db = firebase.firestore();
      const userDocRef = collection(db, 'users', 'XCgbxTGZAqO3JkAqw8MoDgRCV8h1', 'food');
      return onSnapshot( userDocRef, (snapshot) => {
      snapshot.forEach((doc) => {
        const userData = doc.data();
        console.log('UserData:', userData);
        
        
        const expirationDate = dayjs(userData.date, 'YYYYMMDD');
        console.log(expirationDate);
        const today = dayjs().format('YYYY-MM-DD');
        console.log(today);
        const daysUntilExpiration = expirationDate.diff(today, 'day');
        console.log(daysUntilExpiration);
        

        // 여기서 daysUntilExpiration이 3이면 푸시 알림을 보내는 로직 추가
        if (daysUntilExpiration != 0) {
          schedulePushNotification(userData.productName, daysUntilExpiration); // 제품 이름을 전달
        }
      }) 
    });
  };

  const schedulePushNotification = async (productName,  daysUntilExpiration) => {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: '바코딩의 푸시알림 📬',
        body: `${productName}의 유통기한이 ${daysUntilExpiration}일 남았습니다!`, // 제품 이름을 출력
        data: { data: 'goes here' },
      },
      trigger: { seconds: 2 },
    });
  };

  async function registerForPushNotificationsAsync() {
    let token;

    if (Platform.OS === 'android') {
      await Notifications.setNotificationChannelAsync('default', {
        name: 'default',
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#FF231F7C',
      });
    }

    if (Device.isDevice) {
      const { status: existingStatus } = await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (existingStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus !== 'granted') {
        alert('Failed to get push token for push notification!');
        return;
      }
      // Learn more about projectId:
      // https://docs.expo.dev/push-notifications/push-notifications-setup/#configure-projectid
      token = (await Notifications.getExpoPushTokenAsync({ projectId: '6afda1f7-5c0d-4e15-b294-efbca5a01c6c' })).data;
      console.log(token);
    } else {
      alert('Must use physical device for Push Notifications');
    }

    return token;
  }

  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-around',
      }}>
      <Text>Your expo push token: {expoPushToken}</Text>
      <View style={{ alignItems: 'center', justifyContent: 'center' }}>
        <Text>Title: {notification && notification.request.content.title} </Text>
        <Text>Body: {notification && notification.request.content.body}</Text>
        <Text>Data: {notification && JSON.stringify(notification.request.content.data)}</Text>
      </View>
      {/* 버튼 삭제 */}
    </View>
  );
}
