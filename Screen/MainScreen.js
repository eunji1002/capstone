import React, { useState, useEffect } from 'react';
import { Alert, View, Text, Image, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import RoundButton from '../RoundButton';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import dayjs from 'dayjs';
import { schedulePushNotification } from '../Notification'


const MainScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const [scannedItems, setScannedItems] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('식품');

  useEffect(() => {
    if (route.params?.barcodeData) {
      setScannedItems(prevItems => [...prevItems, route.params.barcodeData]);
    }
    const unsubscribe = navigation.addListener('focus', () => {
      fetchProductDataAndScheduleNotifications();
    });

    return unsubscribe;
  }, [route.params?.barcodeData, selectedCategory, navigation]);

  const Searchbt = () => {
    navigation.navigate('Search');
  };
  
  const updateSelectedCategory = (newCategory) => {
    setSelectedCategory(newCategory);
    fetchProductDataFromFirestore(newCategory);
  };

  const getcate = async () => {
    try {
      const currentUser = firebase.auth().currentUser;
      const db = firebase.firestore();

      const catename = db
        .collection("users")
        .doc(currentUser.uid)
        .collection("product")
        .doc("cate")

      const querySnapshot = await catename.get();
      const products = querySnapshot.docs.map(doc => {
        const data = doc.data();
        return {
          category: data.cate,
        };
      });

      setScannedItems(products);
    } catch (error) {
      console.error('Firestore에서 데이터를 가져오는 중 오류 발생:', error);
    }
  };

  const deleteItem = (docId) => {
    Alert.alert(
      '삭제',
      '정말로 삭제하시겠습니까?',
      [
        { text: '취소', onPress: () => { }, style: 'cancel' },
        {
          text: '삭제',
          onPress: async () =>{ 
            await remove(docId);
          },
            style: 'destructive', 
        },
      ],
      {
        cancelable: true,
        onDismiss: () => { },
      },
    );
  };

  const remove = async (docId) => {
    try {
      const currentUser = firebase.auth().currentUser;
      const db = firebase.firestore();
      const selectedCategory = '식품'; // 예시로 기본 카테고리 설정 (필요에 따라 변경)
  
      const productsRef = db
      .collection("users")
      .doc(currentUser.uid)
      .collection("product")
      .doc("cate")
      .collection(selectedCategory)
      .doc(docId);
  
      await productsRef.delete();
  
      console.log('데이터 삭제 완료');
      setScannedItems((prevItems) => prevItems.filter((item) => item.docId !== docId));
    } catch (error) {
      console.error('데이터 삭제 실패:', error);
    }
  };



  const  fetchProductDataAndScheduleNotifications = async (category = selectedCategory) => {
    try {
      const currentUser = firebase.auth().currentUser;
      const db = firebase.firestore();
  
      const productsRef = db
        .collection("users")
        .doc(currentUser.uid)
        .collection("product")
        .doc("cate")
        .collection(category);
  
      const querySnapshot = await productsRef.get();
      const products = querySnapshot.docs.map(doc => {
      const data = doc.data();
      console.log("UserData:", data);
      return ({
        prnm: data.prname,
        data: data.brnum,
        deadline: data.deadline,
        docId: doc.id,
      });

      });
  
      
        
  setScannedItems(products);
  
      // Loop through each product and check for expiration date
      products.forEach(product => {
        const expirationDate = dayjs(product.deadline, 'YYYYMMDD');
        console.log(expirationDate);
        const today = dayjs().format('YYYY-MM-DD');
        console.log(today);
        const daysUntilExpiration = expirationDate.diff(today, 'day');
        console.log(daysUntilExpiration);
  
        // 여기서 daysUntilExpiration이 3이면 푸시 알림을 보내는 로직 추가
        if (daysUntilExpiration !== 0) {
        schedulePushNotification(product.prnm, daysUntilExpiration); // 제품 이름을 전달
        }
      });
  
    } catch (error) {
      console.error('Firestore에서 데이터를 가져오는 중 오류 발생:', error);
    }
  };
  

  return (
    <View style={styles.container}>
      <Header onSearchPress={Searchbt} selectedCategory={selectedCategory} onSelectCategory={updateSelectedCategory} />
      <View style={styles.horizontalLine} />
      <ScannedItemList scannedItems={scannedItems} onDeleteItem = {deleteItem} />
      <RoundButton onPress={() => navigation.navigate('Scanner')} />
    </View>

  );
};

const Header = ({ onSearchPress, selectedCategory, categories, onSelectCategory }) => (
  <View style={styles.topRow}>
    <TouchableOpacity onPress={() => onSelectCategory(category)}>
      <Text style={styles.logo}>{selectedCategory}</Text>
    </TouchableOpacity>
    <TouchableOpacity onPress={onSearchPress}>
      <Image
        style={styles.search}
        source={require('../assets/search.png')}
      />
    </TouchableOpacity>
  </View>
);


const ScannedItemList = ({ scannedItems , onDeleteItem }) => (
  <FlatList
    data={scannedItems}
    keyExtractor={(item, index) => index.docId}
    renderItem={({ item }) => (
      <TouchableOpacity onLongPress={() => onDeleteItem(item.docId)}>
      <View style={styles.scannedItem}>
        <View style={styles.itemInfo}>
          <Text style={styles.deadline}>{`${item.deadline}`}</Text>
          <Text style={styles.prnm}>{`${item.prnm}`}</Text>
          <Text>{`${item.data}`}</Text>
        </View>

        <Image
          style={styles.itemImage}
          source={require('../assets/post.png')}
        />
      </View>
      </TouchableOpacity>
    )}
    ItemSeparatorComponent={() => <View style={styles.itemSeparator} />}
    showsVerticalScrollIndicator={false}
  />
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    paddingHorizontal: 6,
    paddingVertical: 20,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
  },
  logo: {
    fontSize: 40,
    fontWeight: 'bold',
  },
  search: {
    width: 30,
    height: 30,
  },
  horizontalLine: {
    height: 0.5,
    backgroundColor: '#000',
    marginVertical: 10,
  },
  scannedItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    borderRadius: 0,
  },
  itemSeparator: {
    height: 1,
    backgroundColor: '#000'
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
  deadline: {
    fontSize: 12,
    textDecorationLine: 'underline',
  }
});

export default MainScreen;