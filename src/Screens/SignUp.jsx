import { useState } from "react";
import { TouchableOpacity, View, StyleSheet, TouchableWithoutFeedback, Keyboard } from "react-native";
import { useSignUp } from "@clerk/clerk-expo";
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

export default function SignUpScreen({ navigation }) {
  const { isLoaded, signUp } = useSignUp();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const onSignUpPress = async () => {
    if (!isLoaded) {
      return;
    }

    try {
      await signUp.create({
        firstName,
        lastName,
        emailAddress,
        password,
      });

      // https://docs.clerk.dev/popular-guides/passwordless-authentication
      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });

      navigation.navigate("VerifyCode");
    } catch (err) {
      console.log("Error:> ", err?.status || '');
      console.log("Error:> ", err?.errors ? JSON.stringify(err.errors) : err);
    }
  };

  const onSignInPress = () => navigation.replace("Welcome");

  return (
    <>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <Layout style={styles.layout}>
          <Card style={styles.card}>
            <View style={styles.iconLayout}>
              <DreamIcon />
            </View>
            <Text category="h5" style={{ textAlign: "center" }}>
              Sign Up for DreamHub
            </Text>
            <SignInWithOAuth />
            <Divider />
            <Text category="s1" style={{ textAlign: "center", marginVertical: 10 }}>
              OR
            </Text>
            <Divider />
            {/* <View style={styles.inputView}>
              <Input
                style={{ marginTop: 10 }}
                value={firstName}
                placeholder="First Name"
                required={true}
                onChangeText={(firstName) => setFirstName(firstName)}
              />
            </View>
            <View style={styles.inputView}>
              <Input
                value={lastName}
                placeholder="Last Name"
                required={true}
                onChangeText={(lastName) => setLastName(lastName)}
              />
            </View> */}
            <View style={styles.inputViewTop}>
              <Input
                autoCapitalize="none"
                value={emailAddress}
                placeholder="Email Address"
                required={true}
                onChangeText={(email) => setEmailAddress(email)}
              />
            </View>
            <View style={styles.inputView}>
              <Input
                value={password}
                placeholder="Password"
                required={true}
                secureTextEntry={true}
                onChangeText={(password) => setPassword(password)}
              />
            </View>
            <View style={styles.inputView}>
              <Input
                value={password}
                placeholder="Confirm Password"
                required={true}
                secureTextEntry={true}
                onChangeText={(password) => setConfirmPassword(password)}
              />
            </View>
            <TouchableOpacity style={styles.buttonContainer} onPress={onSignUpPress}>
              <Button style={styles.buttonSignUp} onPress={onSignUpPress}>
                {evaProps => <Text {...evaProps} style={{ fontSize: 18, fontWeight: "bold" }}>Sign Up</Text>}
              </Button>
            </TouchableOpacity>
            <Divider />
            <View style={styles.footer}>
              <Text style={styles.text} >Have an account?</Text>
              <TouchableOpacity
                style={styles.secondaryButton}
                onPress={onSignInPress}
              >
                <Button style={styles.button} onPress={onSignInPress}>
                  {evaProps => <Text {...evaProps} style={{ fontSize: 18, fontWeight: "bold" }}>Sign In</Text>}
                </Button>
              </TouchableOpacity>
            </View>
          </Card>
        </Layout>
      </TouchableWithoutFeedback>
    </>
  );
}

const styles = StyleSheet.create({
  layout: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "flex-start",
    height: "100%",
    paddingTop: 20,
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
  iconLayout: {
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
  },
  inputViewTop: {
    marginTop: 20,
    marginBottom: 10,
  },
  inputView: {
    marginVertical: 10,
  },
  buttonContainer: {
    display: 'flex',
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    width: 120,
    height: 50,
    marginTop: 20,
    backgroundColor: '#181d37',
  },
  buttonSignUp: {
    width: 180,
    height: 50,
    marginTop: 5,
    marginBottom: 20,
    backgroundColor: '#181d37',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  text: {
    color: '#fff',
    fontSize: 16,
    paddingTop: 16,
    
  },
  secondaryButton: {
    marginHorizontal: 10,
  },
});
