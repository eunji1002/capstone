import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import RoundButton from '../RoundButton';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import { signout } from './Logout';


const MainScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const [scannedItems, setScannedItems] = useState([]);

  useEffect(() => {
    if (route.params?.barcodeData) {
      setScannedItems(prevItems => [...prevItems, route.params.barcodeData]);
    }
    fetchProductDataFromFirestore();
  }, [route.params?.barcodeData]);

  const Searchbt = () => {
    navigation.navigate('Search');
  };

  const Logouthbt = () => {
    signout();
    navigation.navigate('Initial', { screen: 'Initial' });
  };

  const fetchProductDataFromFirestore = async () => {
    try {
      const currentUser = firebase.auth().currentUser;
      const db = firebase.firestore();
      const productsRef = db.collection("users").doc(currentUser.uid).collection("product").doc(categ);

      const querySnapshot = await productsRef.get();
      const products = [];

      querySnapshot.forEach((doc) => {
        const data = doc.data();
        products.push({
          prnm: data.prname,
          data: data.brnum,
          deadline: data.deadline,
        });
      });


      setScannedItems(products);
    } catch (error) {
      console.error('Firestore에서 데이터를 가져오는 중 오류 발생:', error);
    }
  };

  return (
    <View style={Styles.container}>
      <Header onSearchPress={Searchbt} />
      <View style={Styles.horizontalLine} />
      <ScannedItemList scannedItems={scannedItems} />
      <RoundButton onPress={() => navigation.navigate('Scanner')} />
    </View>
  );
};

const Header = ({ onSearchPress }) => (
  <View style={Styles.topRow}>
    <View style={Styles.logoContainer}>
      <Text style={Styles.logo}>Categorie</Text>
    </View>
    <TouchableOpacity onPress={onSearchPress}>
      <Image
        style={Styles.search}
        source={require('../assets/search.png')}
      />
    </TouchableOpacity>
  </View>
);


const ScannedItemList = ({ scannedItems }) => (
  <FlatList
    data={scannedItems}
    keyExtractor={(item, index) => index.toString()}
    renderItem={({ item }) => (
      <View style={Styles.scannedItem}>
        <View style={Styles.itemInfo}>
          <Text style={Styles.deadline}>{`${item.deadline}`}</Text>
          <Text style={Styles.prnm}>{`${item.prnm}`}</Text>
          <Text>{`${item.data}`}</Text>
        </View>
        {/* 원하는 이미지 소스를 설정하세요 */}
        <Image
          style={Styles.itemImage}
          source={require('../assets/post.png')}
        />
      </View>
    )}
  />
);


const Styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    paddingHorizontal: 6,
    paddingVertical: 20,
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
  },
  logoContainer: {
    flex: 1,
  },
  imageContainer: {
    marginLeft: 10,
  },
  logo: {
    fontSize: 40,
    fontWeight: 'bold',
  },
  search: {
    width: 30,
    height: 30,
  },
  HomeText: {
    marginTop: 20,
  },
  horizontalLine: {
    height: 0.5,
    backgroundColor: '#000',
    marginVertical: 10,
  },
  scannedItem: {
    marginVertical: 10,
    padding: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
  },scannedItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 10,
    padding: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
  },
  itemInfo: {
    flex: 1,
  },
  itemImage: {
    width: 80, 
    height: 80, 
    borderRadius: 25, 
  },
  prnm: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  deadline:{
    fontSize: 12,
    textDecorationLine: 'underline',
  }
});

export default MainScreen;
