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
    <View style={styles.container}>
      <View style={styles.topRow}>
        <TouchableOpacity style={styles.goBackButtonContainer} stonPress={goBack}>
          <Text style={styles.goBackButtonText}>{'<'}</Text>
        </TouchableOpacity>
        <TextInput
          style={styles.textForm}
          placeholder={'바코드 번호, 제품명을 입력하세요.'}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 6,
    paddingVertical: 20,
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
    paddingHorizontal: 10,
  },
  goBackButtonContainer: {
    paddingHorizontal: 10,
    alignItems: 'center',
  },
  goBackButtonText: {
    fontSize: 40,
    fontWeight: 'bold',
  },
  textForm: {
    flex: 1,
    height: 50,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    fontSize: 16,
  },
});

export default SearchScreen;
