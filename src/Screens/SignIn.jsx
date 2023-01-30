import { useState } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import { useSignIn } from "@clerk/clerk-expo";
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
    <View className='bg-purple-300 flex-1 flex items-center justify-center' >
    {/* <View style={styles.container}> */}
      <SignInWithOAuth />
      <Text className='text-2xl my-4'>- OR -</Text>
      <View className='flex flex-col items-center'>
        <Text className='text-2xl font-bold mb-4'>Sign in with Email</Text>

        <View>
          <TextInput
            className="bg-gray-200 my-2 border-2 border-gray-400 rounded-md p-2 w-60"
            autoCapitalize="none"
            value={emailAddress}
            placeholder="Email..."
            placeholderTextColor="#000"
            onChangeText={(emailAddress) => setEmailAddress(emailAddress)}
          />
        </View>

        <View>
          <TextInput
            className="bg-gray-200 my-2 border-2 border-gray-400 rounded-md p-2 w-60"
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
          <Text className='text-base'>Have an account?</Text>

          <TouchableOpacity
            onPress={onSignUpPress}
          >
            <Text className='text-blue-700 text-base'>Sign up</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });
