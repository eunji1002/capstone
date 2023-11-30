import React, { useState, useEffect } from 'react';
import { Alert, View, Text, Image, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import RoundButton from '../RoundButton';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import dayjs from 'dayjs';
import { schedulePushNotification } from '../Notification';



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
  
      products.sort((a, b) => {
        const ddayA = calculateDday(a.deadline);
        const ddayB = calculateDday(b.deadline);
        return ddayA - ddayB;
      });

      setScannedItems(products);
  
      products.forEach(product => {
        const expirationDate = dayjs(product.deadline, 'YYYYMMDD');
        console.log(expirationDate);
        const today = dayjs().format('YYYY-MM-DD');
        console.log(today);
        const daysUntilExpiration = expirationDate.diff(today, 'day');
        console.log(daysUntilExpiration);
  
        // 여기서 daysUntilExpiration이 10이면 푸시 알림을 보내는 로직 추가
        if (daysUntilExpiration == 10) {
        schedulePushNotification(product.prnm, daysUntilExpiration); // 제품 이름을 전달
        }
      });
  
    } catch (error) {
      console.error('Firestore에서 데이터를 가져오는 중 오류 발생:', error);
    }
  };
  

  return (
    <View style={Styles.container}>
      <Header onSearchPress={Searchbt} selectedCategory={selectedCategory} onSelectCategory={updateSelectedCategory} />
      <View style={Styles.horizontalLine} />
      <ScannedItemList scannedItems={scannedItems} onDeleteItem = {deleteItem} />
      <RoundButton onPress={() => navigation.navigate('Scanner')} />
    </View>

  );
};

const Header = ({ onSearchPress, selectedCategory, categories, onSelectCategory }) => (
  <View style={Styles.topRow}>
    <TouchableOpacity onPress={() => onSelectCategory(category)}>
      <Text style={Styles.logo}>{selectedCategory}</Text>
    </TouchableOpacity>
    <TouchableOpacity onPress={onSearchPress}>
      <Image
        style={Styles.search}
        source={require('../assets/search.png')}
      />
    </TouchableOpacity>
  </View>
);

const calculateDday = (deadline) => {
  const today = new Date();
  const year = parseInt(deadline.substring(0, 4), 10);
  const month = parseInt(deadline.substring(4, 6), 10) - 1;
  const day = parseInt(deadline.substring(6, 8), 10);

  const deadlineDate = new Date(year, month, day);

  if (isNaN(deadlineDate.getTime())) {
    console.error('Invalid deadline date:', deadline);
    return 'Invalid Date';
  }

  const timeDiff = deadlineDate - today;
  const dayDiff = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
  return dayDiff;
};

const ScannedItemList = ({ scannedItems, onDeleteItem }) => (
  <FlatList
    data={scannedItems}
    keyExtractor={(item, index) => item.docId}
    renderItem={({ item }) => {
      const dday = calculateDday(item.deadline);
      const indicatorColor = getIndicatorColor(dday);
      const deadlineText = getDeadlineText(dday);
      return (
        <TouchableOpacity onLongPress={() => onDeleteItem(item.docId)}>
        <View style={Styles.scannedItem}>
          <View style={[Styles.indicator, { backgroundColor: indicatorColor }]} />
          <View style={Styles.itemInfo}>
            <Text style={Styles.deadline}>{`${item.deadline}`}</Text>
            <Text style={Styles.prnm}>{`${item.prnm}`}</Text>
            <Text>{`${item.data}`}</Text>
            <Text style={Styles.deadlinetext}>{deadlineText}</Text>
          </View>
          <Image style={Styles.itemImage} source={require('../assets/post.png')} />
        </View>
      </TouchableOpacity>
      );
    }}
    ItemSeparatorComponent={() => <View style={Styles.itemSeparator} />}
  />
);

const getDeadlineText = (dday) => {
  if (dday < 0) {
    return '유통기한 만료';
  } else {
    return `${dday}일 남았습니다`;
  }
};

const getIndicatorColor = (dday) => {
  if (dday < 0) {
    return '#FF0000'; 
  } else if (dday <= 10) {
    return '#FFD700'; 
  } else {
    return '#147814'; 
  }
};

const Styles = StyleSheet.create({
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#FFFFFF', 
    borderRadius: 8,
  },
  indicator: {
    width: 10,
    height: '100%', 
    marginRight: 10,
    borderRadius: 5, 
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
  deadline:{
    fontSize: 12,
    textDecorationLine: 'underline',
  },
  deadlinetext:{
    fontWeight: 'bold',
  }
});

export default MainScreen;