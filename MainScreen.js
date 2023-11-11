import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import RoundButton from './RoundButton';
import { signout } from './Logout';

const MainScreen = () => {
    const navigation = useNavigation();
    const Searchbt = () => {
      navigation.navigate('Search');
    };
    const Logouthbt = () => {
        signout(); // 로그아웃 함수 호출
        navigation.navigate("Initial", { screen: "Initial" } );
      };
    
    return (
        <View style={Styles.container}>
            <View style={Styles.topRow}>
                <View style={Styles.logoContainer}>
                    <Text style={Styles.logo}>Categorie</Text>
                </View>
                <TouchableOpacity onPress={Logouthbt}>
                    <Image 
                      style={Styles.logout} 
                      source={require('./assets/logout.png')} 
                    />
                </TouchableOpacity>
                <TouchableOpacity onPress={Searchbt}>
                    <Image 
                      style={Styles.search} 
                      source={require('./assets/search.png')} 
                    />
                </TouchableOpacity>
            </View>
            <View style={Styles.horizontalLine} />
            <Text style={Styles.HomeText}>+ 버튼 : 바코드 찍는 창으로 넘어감</Text>
            <RoundButton onPress={() => navigation.navigate('Scanner')} />
        </View>
    );
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
    logout: {
        width: 30, 
        height: 30, 
        marginRight: 20, 
    },
    HomeText: {
        marginTop: 20, 
    },  
    horizontalLine: {
      height: 0.5, 
      backgroundColor: '#000', // 선의 색상
      marginVertical: 10, // 선 위아래 여백 조절
  }
});

export default MainScreen;
