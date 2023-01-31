import "react-native-gesture-handler";

import { TouchableWithoutFeedback, Keyboard } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ClerkProvider } from '@clerk/clerk-expo';
import * as SecureStore from 'expo-secure-store';
import { NativeBaseProvider } from 'native-base';
import { CLERK_PUBLISHABLE_KEY as clerkKey } from '@env';

import * as React from "react";
// import { NavigationContainer, useNavigation } from "@react-navigation/native";
// import { createNativeStackNavigator } from "@react-navigation/native-stack";
// import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
// import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import Navigation from "./Navigator/ScreenNavigator";
// import Header from "./src/Components/Header";
// import Footer from "./src/Components/Footer";

const tokenCache = {
  getToken(key) { 
    return SecureStore.getItemAsync(key);
  }, 
  saveToken(key, value) {
    return SecureStore.setItemAsync(key, value);
  }
};

const App = () => (
  <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
    <NativeBaseProvider>
      <ClerkProvider publishableKey={clerkKey} tokenCache={tokenCache} >
        <SafeAreaProvider>
          <Navigation/>
        </SafeAreaProvider>
      </ClerkProvider>
    </NativeBaseProvider>
  </TouchableWithoutFeedback>
);

export default App;
