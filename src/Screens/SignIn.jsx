import { useState } from "react";
import { TouchableOpacity, View, Keyboard, TouchableWithoutFeedback, StyleSheet } from "react-native";
import { useSignIn } from "@clerk/clerk-expo";
import SignInWithOAuth from "../Auth/SignInWithOAuth";

import {
  Input,
  Button,
  Card,
  Layout,
  Text,
  Divider,
} from '@ui-kitten/components';

import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

const DreamIcon = (props) => (
  <MaterialCommunityIcons name="cloud-circle" size={50} color='#d7eefa' />
);

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
      <Layout style={styles.layout}>
        <Card style={styles.card}>
          <View style={styles.iconLayout}>
            <DreamIcon />
          </View>
          <Text category="h5" style={{ textAlign: "center" }}>
            Sign In to DreamHub
          </Text>
          <SignInWithOAuth />
          <Divider />
          <Text category="s1" style={{ textAlign: "center", marginVertical: 10 }}>
            OR
          </Text>
          <Divider />
          <Input
            placeholder="Email Address"
            value={emailAddress}
            onChangeText={(emailAddress) => setEmailAddress(emailAddress)}
            style={{ marginTop: 20 }}
            required={true}
          />
          <Input
            placeholder="Password"
            value={password}
            onChangeText={(password) => setPassword(password)}
            secureTextEntry={true}
            style={{ marginTop: 20 }}
            required={true}
          />
          <TouchableOpacity onPress={onSignInPress} style={styles.buttonContainer}>
            <Button onPress={onSignInPress} style={styles.button}>Sign In</Button>
          </TouchableOpacity>
          <Divider />
          <Text category="s1" style={{ textAlign: "center", marginTop: 10 }}>
            No Account?
          </Text>
          <TouchableOpacity onPress={onSignUpPress} style={styles.buttonContainer}>
            <Button onPress={onSignUpPress} style={styles.buttonSignUp}>Sign Up</Button>
          </TouchableOpacity>
        </Card>
      </Layout>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  layout: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "flex-start",
    height: "100%",
    paddingTop: 50,
    backgroundColor: '#333c59',
  },
  card: { 
    width: "90%", 
    maxWidth: 400, 
    paddingHorizontal: 14,
    paddingBottom: 16,
    paddingTop: 4,
    backgroundColor: '#232f4f',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  buttonContainer: {
    display: 'flex',
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    width: 200,
    height: 45,
    marginVertical: 20,
    backgroundColor: '#181d37',
  },
  buttonSignUp: {
    width: 200,
    height: 45,
    marginTop: 10,
    backgroundColor: '#181d37',
  },
  iconLayout: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
});
