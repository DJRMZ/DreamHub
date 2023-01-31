import { View, Text, Image } from "react-native";

import SignOutButton from "../Auth/SignOut";

const AccountScreen = () => {
  return (
    <View>
      <Text>Account</Text>
      <Text>How to use our app:</Text>
      <Text>Use the prompt window to describe your dream. Here are a couple examples:</Text>
      <Text>A pink bunny at the beach with a giraffe drinking lemonade</Text>
      {/* <Image source={./}></Image> */}
      <Text>Tips and Tricks</Text>
      <SignOutButton />
    </View>
  );
};

export default AccountScreen;
