import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import InitialScreen from './Screen/Intialscreen'; 
import Scan from './Screen/Scan';
import LoginScreen from './Screen/LoginScreen';
import RegisterScreen from './Screen/RegisterScreen';
import MainScreen from './Screen/MainScreen';
import SearchScreen from './Screen/SearchScreen';
import Productregist from './Screen/Product';
import { navigationRef } from './NavigationManager'; 


import firebase from 'firebase/app';
import 'firebase/auth';        
import 'firebase/firestore';  
import firebaseConfig from './FirebaseConfig'; 



const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator initialRouteName="Initial">
        <Stack.Screen name="Initial" component={InitialScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Scanner" component={Scan} options={{ headerShown: false }} />
        <Stack.Screen name="Login" component={LoginScreen} options={{headerShown: false}}/>
        <Stack.Screen name="Register" component={RegisterScreen} options={{headerShown: false}}/>
        <Stack.Screen name='Mains' component={MainScreen} options={{headerShown: false}}/>
        <Stack.Screen name='Search' component={SearchScreen} options={{headerShown: false}}/>
        <Stack.Screen name='Productregist' component={Productregist} options={{headerShown : false}}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
};