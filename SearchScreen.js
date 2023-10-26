import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, TextInput } from "react-native";

const SearchScreen = () => {
  const [search, setSearch] = useState('');

  const goBack = () => {
    navigation.goBack();
    };

  const updateSearch = (text) => {
    setSearch(text);
  };

  return (
    <View style={Styles.container}>
        <View style={[Styles.goBackButtonContainer, Styles.topRow]}>
            <TouchableOpacity onPress={goBack}>
                <Text style={Styles.goBackButtonText}>{'<'}</Text>
                <TextInput
                    style={Styles.textForm}
                    placeholder={'바코드 번호, 제품명을 입력하세요.'}
                />
            </TouchableOpacity>
        </View>
    </View>
  );
}

const Styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 6,
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
  textForm: {
    height: 50,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    fontSize: 16,
    marginVertical: 2,
  },
  topRow: {
    flexDirection: 'row', 
    alignItems: 'center', 
    marginTop: 20,
},
});

export default SearchScreen;