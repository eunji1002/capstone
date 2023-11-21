import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet, Alert } from 'react-native';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import 'firebase/compat/firestore';
import { useRoute } from '@react-navigation/native';

const ProductRegist = ({ route, navigation }) => {
  const [productName, setProductName] = useState(route.params.barcodeData.prnm || '');
  const [expiryDate, setExpiryDate] = useState(route.params.barcodeData.deadline || '');
  const [categ, setCate] = useState('');
  const handleRegistration = async () => {
    try {
      await AsyncStorage.setItem('productName', productName);
      await AsyncStorage.setItem('expiryDate', expiryDate);
    } catch (e) {
      console.error('Error saving data to AsyncStorage:', e);
    }
    const currentUser = firebase.auth().currentUser;
    const db = firebase.firestore();
    db.collection("users")
        .doc(currentUser.uid)
        .collection("product")
        .doc("cate")
        .collection(categ)
        .add({
            prname : productName,
            brnum : route.params.barcodeData.data,
            deadline : expiryDate,
            cate : categ
        });
    setTimeout(() => {
      Alert.alert("등록 성공!");
      navigation.navigate('Mains');
    }, 2000);
  };
  const handleScanAgain = () => {
    navigation.replace('Scanner', { scanned: false });
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="제품명"
        value={productName}
        onChangeText={(text) => setProductName(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="유통기한"
        value={expiryDate}
        onChangeText={(text) => setExpiryDate(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="카테고리"
        value={categ}
        onChangeText={(text) => setCate(text)}
      />
      <View style={styles.buttonArea}>
        <TouchableOpacity style={styles.button} onPress={handleRegistration}>
          <Text style={styles.buttonText}>등록하기</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleScanAgain}>
          <Text style={styles.buttonText}>스캔다시하기</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 10,
  },
  button: {
    backgroundColor: 'black',
    height: 50,
    width: 250,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
  },
  buttonArea: {
    alignItems: 'center',
  },
});

export default ProductRegist;
