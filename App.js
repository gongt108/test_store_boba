import { TailwindProvider } from 'tailwindcss-react-native';
import React, { useState, useEffect } from 'react';
import { NavigationContainer, StackActions } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import  AppLoading from 'expo-app-loading';
import * as Font from "expo-font";

import HomeScreen from './screens/HomeScreen'
import DrinkScreen from './screens/DrinkScreen'
import CartScreen from './screens/CartScreen'
import CheckoutScreen from './screens/CheckoutScreen'

import { Provider } from 'react-redux';
import { store } from './store';
import PaymentScreen from './screens/PaymentScreen';
import { StripeProvider } from '@stripe/stripe-react-native';


const getFonts = () => Font.loadAsync({
    'AlexBrush-Regular': require('./assets/fonts/AlexBrush-Regular.ttf'),
  });


export default function App() {
  const [fontsLoaded, setFontsLoaded] = React.useState(false);


  const Stack = createNativeStackNavigator();

  if(fontsLoaded){
    return (
      <StripeProvider publishableKey='pk_test_51LrzyaKvbb1tU2iANKlMga7UteXAflZvCYvGMV48oyhNF43iLRn9VbMNC6o5yrYUiDDUrQKmVqx5X7w5ncU4higv00Fdl6DHv6'>
        <NavigationContainer>
          <Provider store={store}>
            <TailwindProvider>
              <Stack.Navigator>
                <Stack.Screen name="Home" component={HomeScreen} />
                <Stack.Screen name="Drink" component={DrinkScreen} />
                <Stack.Screen name="Cart" component={CartScreen} options={{presentation: "modal", headerShown: false}} />
                <Stack.Screen name="Checkout" component={CheckoutScreen} options={{headerShown: false}}/>
                <Stack.Screen name="Payment" component={PaymentScreen} options={{presentation: "modal", headerShown: false}} />
              </Stack.Navigator>
            </TailwindProvider>
          </Provider>
          
        </NavigationContainer>
        </StripeProvider>
  	);
  } else {
      return (
        <AppLoading
          startAsync={getFonts}
          onFinish={() => setFontsLoaded(true)}
          onError={console.warn}
        />
      );
  }
}
