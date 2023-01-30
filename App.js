import "react-native-gesture-handler";

import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { ClerkProvider, SignedIn, SignedOut } from '@clerk/clerk-expo';
import SignInScreen from './src/Auth/SignIn';
import SignInWithOAuth from './src/Auth/SigninWithOAuth';
import * as SecureStore from 'expo-secure-store';
import { CLERK_PUBLISHABLE_KEY as clerkKey } from '@env';

import * as React from "react";
import { StyleSheet, View, Text, Button } from "react-native";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

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

const SignIn = () => {
  const nav = useNavigation();
  return (
    <View>
      <Button title="Sign In" onPress={() => nav.navigate("Sign Up")} />
    </View>
  );
};

const SignUp = () => {
  const nav = useNavigation();
  return (
    <View>
      <Button title="Sign Up" onPress={() => nav.navigate("Welcome")} />
    </View>
  );
};

const HomeScreen = () => (
  <View style={styles.layout}>
    <Text style={styles.title}>Home</Text>
  </View>
);

const AccountScreen = () => {
  const nav = useNavigation();
  return (
    <View style={styles.layout}>
      <Text style={styles.title}>Account</Text>
      <Button title="Sign Out" onPress={() => nav.navigate("Sign In")} />
    </View>
  );
};

const Tab = createBottomTabNavigator();

const MainNavigator = () => (
  <Tab.Navigator
    initialRouteName="Home"
    screenOptions={{
      tabBarActiveTintColor: "#283769",
      tabBarInactiveTintColor: "#000",
      tabBarActiveBackgroundColor: "#ced8f7",
      tabBarStyle: { height: 50 },

    }}
  >
    <Tab.Screen
      name="Home"
      component={HomeScreen}
      options={{
        tabBarLabel: "Home",
        tabBarIcon: () => (
          <MaterialCommunityIcons name="home-circle" color={"#000"} size={26} />
        ),
      }}
      tabBarBadge={3}
    />
    <Tab.Screen
      name="Location"
      component={LocationFinder}
      options={{
        tabBarLabel: "Location",
        tabBarIcon: () => (
          <MaterialCommunityIcons
            name="map-marker-circle"
            color={"#000"}
            size={26}
          />
        ),
      }}
      tabBarBadge={3}
    />
    <Tab.Screen
      name="Contacts"
      component={ContactList}
      options={{
        tabBarLabel: "Contacts",
        tabBarIcon: () => (
          <MaterialCommunityIcons
            name="human-queue"
            color={"#000"}
            size={26}
          />
        ),
      }}
      tabBarBadge={3}
    />
    <Tab.Screen
      name="Account"
      component={AccountScreen}
      options={{
        tabBarLabel: "Account",
        tabBarIcon: () => (
          <MaterialCommunityIcons
            name="account-circle"
            color={"#000"}
            size={26}
          />
        ),
      }}
      tabBarBadge={3}
    />
  </Tab.Navigator>
);

const Stack = createNativeStackNavigator();

const StackNav = () => (
  <Stack.Navigator headerMode="none">
    <Stack.Screen name="Sign In" component={SignIn} />
    <Stack.Screen name="Sign Up" component={SignUp} />
    <Stack.Screen name="Welcome" component={MainNavigator} />
  </Stack.Navigator>
);

const App = () => (
  <NavigationContainer>
    <ClerkProvider publishableKey={clerkKey} tokenCache={tokenCache} >
      <SignedIn>
        <StackNav />
      </SignedIn>
      <SignedOut>
        <SignInScreen />
      </SignedOut>
    </ClerkProvider>
  </NavigationContainer>
);

export default App;


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  layout: {
    flex: 1,
    justifyContent: "center",
    padding: 8,
  },
  title: {
    margin: 24,
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
});
