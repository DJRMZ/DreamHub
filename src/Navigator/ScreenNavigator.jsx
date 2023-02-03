import * as React from "react";
import { ClerkLoaded, useUser } from '@clerk/clerk-expo';
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { SignIn, SignUp } from '../Screens';
import MainNavigator from './MainNavigator';

const Stack = createNativeStackNavigator();

const StackNav = () => {
  const { isSignedIn: signedIn } = useUser();

  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: '#181d37' },
        headerTitleStyle: {
          color: '#d7eefa',
          fontSize: 22,
          fontWeight: 'bold',
          textAlign: 'center',
        },
      }}
    >
      {signedIn ? (
        <Stack.Screen name="App" component={MainNavigator} options={{ title: 'Welcome to DreamHub' }} headerTitleStyle={{ alignSelf: 'center', justifyContent: 'center' }} />
      ) : (
        <>
          <Stack.Screen name="Welcome" component={SignIn} />
          <Stack.Screen name="SignUp" component={SignUp} />
        </>
      )}
    </Stack.Navigator>
  );
};

const Navigation = () => {
  return (
    <NavigationContainer >
      <ClerkLoaded>
        <StackNav />
      </ClerkLoaded>
    </NavigationContainer>
  );
}

export default Navigation;
