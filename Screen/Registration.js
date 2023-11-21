import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import {Alert} from "react-native";

export async function registration(nickName, email, password) {
    
    try {
        console.log(nickName, email, password)
        await firebase.auth().createUserWithEmailAndPassword(email, password);
        const currentUser = firebase.auth().currentUser;
        const db = firebase.firestore();
        db.collection("users")
        .doc(currentUser.uid)
        .set({
            email : currentUser.email,
            nickName : nickName
        });
        Alert.alert("회원가입 성공!");
        return true; 
        
    }catch (err) {
        console.log(err.message);
        Alert.alert("회원가입 오류 : ", err.message);
    }
}