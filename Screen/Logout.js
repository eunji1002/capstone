import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

export async function signout() {
  try {
    await firebase.auth().signOut();
    console.log('user logout')
  } catch (error) {
    console.error('로그아웃 중 오류 발생:', error);
  }
}
