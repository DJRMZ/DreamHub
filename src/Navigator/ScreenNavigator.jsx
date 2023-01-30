import * as React from "react";
import { ClerkLoaded, useUser } from '@clerk/clerk-expo';
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import SignInScreen from '../Screens/SignIn';
import MainNavigator from './MainNavigator';

const Stack = createNativeStackNavigator();

const StackNav = () => {
  const { isSignedIn: signedIn } = useUser();

  return (
    <Stack.Navigator headerMode="none">
      {signedIn ? (
        <Stack.Screen name="Welcome" component={MainNavigator} />
      ) : (
        <>
          <Stack.Screen name="Sign In" component={SignInScreen} />
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

const SignUp = () => {
  const nav = useNavigation();
  return (
    <View>
      <Button title="Sign Up" onPress={() => nav.navigate("Welcome")} />
    </View>
  );
};

export default Navigation;
