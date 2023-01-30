import { View, Text, Button } from "react-native";
import { useNavigation } from "@react-navigation/native";

const AccountScreen = () => {
  const nav = useNavigation();
  return (
    <View >
      <Text >Account</Text>
      <Button title="Sign Out" onPress={() => nav.navigate("Sign In")} />
    </View>
  );
};

export default AccountScreen;