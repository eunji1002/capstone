import React from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';


const LoginScreen = () => {
    const navigation = useNavigation(); 

            const goBack = () => {
            navigation.goBack();
            };
            const goMains = () => {
                navigation.navigate('Mains');
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
                    placeholder={'아이디(5자 이상, 영문, 숫자)'}
                />
                <TextInput
                    style={styles.textForm}
                    secureTextEntry={true}
                    placeholder={'비밀번호(8자 이상)'}
                />
                </View>
                <View style={styles.buttonArea}>
                <TouchableOpacity style={styles.button}  onPress={goMains}>
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