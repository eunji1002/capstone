import React, { Component } from 'react';
import { StyleSheet, TouchableOpacity, Text, View } from 'react-native';

export default function RoundButton({ onPress }) {
    return (
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={() => { console.log("Button Pressed"); onPress(); }}>
          <Text style={styles.text}>+</Text>
        </TouchableOpacity>
      </View>
    );
  }

const styles = StyleSheet.create({
    buttonContainer: {
        position: 'absolute',
        right: 20, // 오른쪽 여백 조정
        bottom: 20, // 아래쪽 여백 조정
    },
    button: {
        backgroundColor: 'black',
        alignItems: 'center',
        justifyContent: 'center',
        width: 70,
        height: 70,
        borderRadius: 35,
    },
    text: {
        fontSize: 50,
        textAlign: 'center',
        color: 'white',
    }
});
