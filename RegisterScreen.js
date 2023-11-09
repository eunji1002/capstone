import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { registration } from './Registration';

const RegisterScreen = () => {
  const [nickName, setNickName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordsMatch, setPasswordsMatch] = useState(true);


  const navigation = useNavigation();

  const goBack = () => {
    navigation.goBack();
  };

  const handleSignup = async () => {
    const success = await registration(nickName ,email, password);
    if (success) {
      navigation.navigate("Initial")}
  }


  const handlePasswordChange = text => {
    setPassword(text);
    // 비밀번호가 변경될 때마다 두 비밀번호를 비교
    if (confirmPassword !== '' && text !== confirmPassword) {
      setPasswordsMatch(false);
    } else {
      setPasswordsMatch(true);
    }
  };

  const handleConfirmPasswordChange = text => {
    setConfirmPassword(text);
    // 비밀번호 확인이 변경될 때마다 두 비밀번호를 비교
    if (password !== '' && text !== password) {
      setPasswordsMatch(false);
    } else {
      setPasswordsMatch(true);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.goBackButtonContainer}>
        <TouchableOpacity onPress={goBack}>
          <Text style={styles.goBackButtonText}>{'<'}</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.topLogo}>
        <Text style={styles.logo}>Registration</Text>
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
        onChangeText={handlePasswordChange}
        value={password}
      />
      <TextInput
        style={styles.textForm}
        secureTextEntry={true}
        placeholder={'비밀번호 확인'}
        onChangeText={handleConfirmPasswordChange}
        value={confirmPassword}
      />
      {!passwordsMatch && (
        <View style={styles.validationMessage}>
          <Text style={styles.TextValidation}>
            비밀번호가 일치하지 않습니다.
          </Text>
      </View>
      )}
    </View>
      <View style={styles.formArea}>
      <TextInput
            style={styles.textForm}
            placeholder={'닉네임'}
            onChangeText={text => setNickName(text)}
        />
        <View style={styles.pickerSelect}>
          {/* RNPickerSelect 컴포넌트 스타일 */}
        </View>
      </View>
      <View style={styles.validationMessage}>
        <Text style={styles.TextValidation}>
          에러 메시지가 여기에 표시됩니다.
        </Text>
      </View>
      <View style={styles.buttonArea}>
        <TouchableOpacity style={styles.button} onPress={handleSignup}>
          <Text style={styles.buttonText}>회원가입</Text>
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
    validationMessage: {
      flex: 0.5,
      justifyContent: 'center',
    },
    TextValidation: {
      color: 'red',
      fontSize: 14,
      textAlign: 'center',
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
      justifyContent: 'center',
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
  
  export default RegisterScreen;