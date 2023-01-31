import { View, Text } from "react-native";

import SignOutButton from "../Auth/SignOut";

const AccountScreen = () => {
  return (
    <View className='flex-1 flex flex-col h-screen'>
      <Text>Account</Text>
      <SignOutButton />
    </View>
  );
};

export default AccountScreen;