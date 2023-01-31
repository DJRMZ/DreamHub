import "react-native-gesture-handler";

import { TouchableWithoutFeedback, Keyboard } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ClerkProvider } from '@clerk/clerk-expo';
import * as SecureStore from 'expo-secure-store';
import { CLERK_PUBLISHABLE_KEY as clerkKey } from '@env';

import * as eva from '@eva-design/eva';
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components';
import { EvaIconsPack } from '@ui-kitten/eva-icons'

import * as React from "react";
// import { NavigationContainer, useNavigation } from "@react-navigation/native";
// import { createNativeStackNavigator } from "@react-navigation/native-stack";
// import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
// import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import Navigation from "./Navigator/ScreenNavigator";

const tokenCache = {
  getToken(key) {
    return SecureStore.getItemAsync(key);
  },
  saveToken(key, value) {
    return SecureStore.setItemAsync(key, value);
  }
};

const App = () => (
  <>
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <ApplicationProvider {...eva} theme={eva.dark}>
        <IconRegistry icons={EvaIconsPack} />
        <ClerkProvider publishableKey={clerkKey} tokenCache={tokenCache} >
          <SafeAreaProvider>
            <Navigation />
          </SafeAreaProvider>
        </ClerkProvider>
      </ApplicationProvider>
    </TouchableWithoutFeedback>
  </>
);

export default App;
