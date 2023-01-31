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
        headerStyle: { backgroundColor: '#283769' },
        headerTitleStyle: { 
          color: '#fff',
          fontSize: 18,
          fontWeight: 'bold',
        },
      }}


    >
      {signedIn ? (
        <Stack.Screen name="Home" component={MainNavigator} options={{ title: 'Welcome to DreamHub' }} />
      ) : (
        <>
          <Stack.Screen name="Sign In" component={SignIn} />
          <Stack.Screen name="Sign Up" component={SignUp} />
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
