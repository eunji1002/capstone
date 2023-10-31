import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import {Alert} from "react-native";

export async function signin(email, password) {
  
  try {
    await firebase.auth().signInWithEmailAndPassword(email, password)
    return true; 
  }catch (err) {
    console.log(err.message);
    Alert.alert("로그인 오류 : ", err.message);
  }
}
