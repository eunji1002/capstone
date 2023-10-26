import React from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const RegisterScreen = () => {
  const navigation = useNavigation(); // navigation 객체 생성

  const goBack = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <View style={styles.goBackButtonContainer}>
        <TouchableOpacity onPress={goBack}>
          <Text style={styles.goBackButtonText}>{'<'}</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.topLogo}>
        <Text style={styles.logo}>Register</Text>
      </View>
      <View style={styles.formArea}>
        <TextInput
          style={styles.textForm}
          placeholder={'아이디(5자 이상, 영문, 숫자)'}
        />
        <TextInput
          style={styles.textForm}
          secureTextEntry={true}
          placeholder={'비밀번호(8자 이상)'}
        />
        <TextInput
          style={styles.textForm}
          secureTextEntry={true}
          placeholder={'비밀번호 확인'}
        />
      </View>
      <View style={styles.validationMessage}>
        <Text style={styles.TextValidation}>
          비밀번호가 일치하지 않습니다.
        </Text>
      </View>
      <View style={styles.formArea}>
        <TextInput
          style={styles.textForm}
          placeholder={'닉네임'}
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
        <TouchableOpacity style={styles.button}>
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