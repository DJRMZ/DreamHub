import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { ClerkProvider, SignedIn, SignedOut } from '@clerk/clerk-expo';
import SignInScreen from './components/SignIn';
import SignInWithOAuth from './components/SignInWithOAuth';
import * as SecureStore from 'expo-secure-store';
import { CLERK_PUBLISHABLE_KEY as clerkKey } from '@env';

const tokenCache = {
  getToken(key) { 
    return SecureStore.getItemAsync(key);
  }, 
  saveToken(key, value) {
    return SecureStore.setItemAsync(key, value);
  }
};

export default function App() {
  return (
    <ClerkProvider publishableKey={clerkKey} tokenCache={tokenCache} >
      <SignedIn>
        <View style={styles.container}>
          <Text>Open up App.js to start working on your app!</Text>
          <StatusBar style="auto" />
        </View>
      </SignedIn>
      <SignedOut>
        <SignInScreen />
      </SignedOut>
      
    </ClerkProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
