import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { navigate } from '../NavigationManager';

const InitialScreen = () => {
  const handleNavigation = (screen) => {
    navigate(screen);
  };

  return (
    <View style={styles.container}>
      <View style={styles.topLogo}>
        <Text style={styles.logo}>Barcoding</Text>
        <Text style={styles.memo}>소비를 기록하다.</Text>
      </View>
      <View style={styles.button}>
        <CustomButton
          title="로그인"
          onPress={() => handleNavigation('Login')}
          buttonStyle={styles.loginButton}
        />
        <CustomButton
          title="회원가입"
          onPress={() => handleNavigation('Register')}
          buttonStyle={[styles.registerButton, { marginTop: 10 }]}
          textStyle={styles.register}
        />
         <CustomButton
          title="푸시알림"
          onPress={() => handleNavigation('Notification')}
          buttonStyle={[styles.registerButton, { marginTop: 10 }]}
          textStyle={styles.register}
        />
      </View>
    </View>
  );
};

const CustomButton = ({ title, onPress, buttonStyle, textStyle }) => (
  <TouchableOpacity style={[styles.buttonContainer, buttonStyle]} onPress={onPress}>
    <Text style={[styles.buttonText, textStyle]}>{title}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  topLogo: {
    marginTop: 120,
  },
  button: {
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
  },
  buttonText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  register: {
    color: 'white',
  },
});

export default InitialScreen;
