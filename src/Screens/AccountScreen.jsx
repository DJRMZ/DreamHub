import { View, Text } from "react-native";

import SignOutButton from "../Auth/SignOut";

const AccountScreen = () => {
  return (
    <View>
      <Text>Account</Text>
      <Text>How to use our app:</Text>
      <Text>Tips and Tricks</Text>
      <SignOutButton />
    </View>
  );
};

export default AccountScreen;
