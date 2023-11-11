import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { navigate } from './NavigationManager';

const InitialScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.topLogo}>
        <Text style={styles.logo}>
          Barcoding
        </Text>
        <Text style={styles.memo}>
          소비를 기록하다.
        </Text>
      </View>
      <View style={styles.button}>
        <TouchableOpacity style={[styles.buttonContainer, styles.loginButton]} onPress={() => navigate('Login')}>
          <Text style={styles.buttonText}>로그인</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.buttonContainer, styles.registerButton]} onPress={() => navigate('Register')}>
          <Text style={[styles.buttonText, styles.register]}>회원가입</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.buttonContainer, styles.registerButton]} onPress={() => navigate('Notification')}>
          <Text style={[styles.buttonText, styles.register]}>푸시알림</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  topLogo: {
    marginTop: 150,
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 80,
  },
  logo: {
    fontSize: 50,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  memo: {
    fontSize: 20,
    textAlign: 'center',
    marginTop: 5,
  },
  buttonContainer: {
    borderColor: 'black',
    borderWidth: 3.5,
    width: 250,
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 35,
  },
  loginButton: {
    backgroundColor: 'white',
  },
  registerButton: {
    backgroundColor: 'black',
    marginTop: 10,
  },
  buttonText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  register: {
    color: 'white'
  }
});

export default InitialScreen;