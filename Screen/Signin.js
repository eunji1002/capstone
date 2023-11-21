import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import {Alert} from "react-native";

import {getAuth, signInWithEmailAndPassword} from 'firebase/auth';

export async function signin(email, password) {
  
  try {
    const auth = getAuth();
    await firebase.auth().signInWithEmailAndPassword(email, password)
    return true; 
  }catch (error) {
    console.log(error.message);
    if (error.code === "auth/wrong-password") {
      // 비밀번호가 틀렸을 경우
      Alert.alert("비밀번호가 틀렸습니다.");
    } else if (error.code === "auth/user-not-found") {
      // 아이디(이메일)가 존재하지 않을 경우
      Alert.alert("아이디가 존재하지 않습니다.");
    } else {
      // 기타 로그인 오류 처리
      console.log(error.message);
      Alert.alert("로그인 중 오류가 발생했습니다.");
   } 
 }
}