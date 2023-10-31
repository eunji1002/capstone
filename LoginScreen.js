import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { signin } from './Signin';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();

            const goBack = () => {
            navigation.goBack();
            };

            const handleLogin = async () => {
              const success = await signin(email, password);
              if (success) {
                navigation.navigate("Mains")}
              }
        
        return (
            <View style={styles.container}>
                <View style={styles.goBackButtonContainer}>
                <TouchableOpacity onPress={goBack}>
                    <Text style={styles.goBackButtonText}>{'<'}</Text>
                </TouchableOpacity>
                </View>
                <View style={styles.topLogo}>
                <Text style={styles.logo}>Login</Text>
                </View>
                <View style={styles.formArea}>
                <TextInput
                    style={styles.textForm}
                    placeholder={'이메일'}
                    onChangeText={text => setEmail(text)}
                    keyboardType="email-address"
                />
                <TextInput
                    style={styles.textForm}
                    secureTextEntry={true}
                    placeholder={'비밀번호(8자 이상)'}
                    onChangeText={text => setPassword(text)}
                />
                </View>
                <View style={styles.buttonArea}>
                <TouchableOpacity style={styles.button}  onPress={handleLogin}>
                <Text style={styles.buttonText}>로그인</Text>
                </TouchableOpacity>
            </View>
            </View> 
        );
};

const styles = {
    container: {
      flex: 1,
      backgroundColor: '#ffffff',
      paddingHorizontal: 10,
      paddingVertical: 20,
    },
    goBackButtonContainer: {
      top: 20,
      left: 0,
    },
    goBackButtonText: {
      fontSize: 40,
      fontWeight: 'bold'
    },
    formArea: {
      flex: 3,
    },
    textForm: {
      height: 50,
      borderColor: '#ddd',
      borderWidth: 1,
      borderRadius: 10,
      paddingHorizontal: 10,
      fontSize: 16,
      marginVertical: 2,
    },
    buttonArea: {
      flex: 0.75,
      alignItems: 'center',
    },
    button: {
      backgroundColor: 'black',
      height: 50,
      width: 250,
      borderRadius: 10,
      alignItems: 'center',
      justifyContent: 'center'
    },
    buttonText: {
      color: '#fff',
      fontSize: 18,
      fontWeight: 'bold',
    },
    topLogo: {
      alignItems: 'left',
      marginTop: 20
    },
    logo: {
      fontSize: 40,
      fontWeight: 'bold',
    },
    pickerSelect: {
      // RNPickerSelect 스타일
    },
  };
export default LoginScreen;