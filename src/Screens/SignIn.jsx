import { useState } from "react";
import { Text, TextInput, TouchableOpacity, View, Keyboard, TouchableWithoutFeedback } from "react-native";
import { useSignIn } from "@clerk/clerk-expo";
import { LinearGradient } from 'expo-linear-gradient';

import SignInWithOAuth from "../Auth/SignInWithOAuth";

export default function SignInScreen({ navigation }) {
  const { signIn, setSession, isLoaded } = useSignIn();

  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");

  const onSignInPress = async () => {
    if (!isLoaded) {
      return;
    }

    try {
      const completeSignIn = await signIn.create({
        identifier: emailAddress,
        password,
      });

      await setSession(completeSignIn.createdSessionId);
    } catch (err) {
      console.log("Error:> ", (err.errors ? err.errors[0].message : err));
    }
  };

  const onSignUpPress = () => navigation.replace("SignUp");

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View className='flex-1 flex items-center justify-center' >
      {/* <View style={styles.container}> */}
      
        <LinearGradient
          colors={['#6130b0', '#3b5998']}
          style={{
            position: 'absolute',
            inset: 0,
            height: '100%',
            width: '100%',
          }}
        />
        <View className='flex flex-col items-center'>
          <Text className='text-2xl text-violet-50 font-bold mb-4'>Use Auth Provider</Text>
          <SignInWithOAuth />

        </View>
        <Text className='text-2xl text-violet-50 my-4'>- OR -</Text>
        <View className='flex flex-col items-center'>
          <Text className='text-2xl text-violet-50 font-bold mb-4'>Sign in with Email</Text>

          <View>
            <TextInput
              className="bg-gray-200 my-2 rounded-md p-2 w-60"
              autoCapitalize="none"
              value={emailAddress}
              placeholder="Email..."
              placeholderTextColor="#000"
              onChangeText={(emailAddress) => setEmailAddress(emailAddress)}
            />
          </View>

          <View>
            <TextInput
              className="bg-gray-200 my-2 rounded-md p-2 w-60"
              value={password}
              placeholder="Password..."
              placeholderTextColor="#000"
              secureTextEntry={true}
              onChangeText={(password) => setPassword(password)}
            />
          </View>

          <TouchableOpacity onPress={onSignInPress}>
            <Text className='bg-violet-500 px-6 py-2 text-lg font-medium text-gray-200'>Sign In</Text>
          </TouchableOpacity>

          <View className='flex flex-col items-center mt-8'>
            <Text className='text-base text-violet-50'>No account?</Text>

            <TouchableOpacity
              onPress={onSignUpPress}
            >
              <Text className='text-blue-300 text-base'>Sign up</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });
