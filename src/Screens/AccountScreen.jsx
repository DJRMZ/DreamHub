import { View, Text } from "react-native";

import SignOutButton from "../Auth/SignOut";

const AccountScreen = () => {
  return (
    <View>
      <Text>Account</Text>
      <SignOutButton />
    </View>
  );
};

export default AccountScreen;