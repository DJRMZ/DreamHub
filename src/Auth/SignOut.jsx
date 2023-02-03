import { StyleSheet, View } from "react-native";
import { Button, Text } from '@ui-kitten/components';
import { useClerk } from "@clerk/clerk-expo/dist";

const SignOutButton = () => {
  const { signOut } = useClerk();

  return (
    <>
      <Button title="Sign Out" style={styles.button} onPress={() => signOut()} >
        {evaProps => <Text {...evaProps} style={{ fontSize: 18, fontWeight: "bold", color: "#d7eefa" }}>Sign Out</Text>}
      </Button>
    </>
  );
};

export default SignOutButton;

const styles = StyleSheet.create({
  button: {
    marginTop: 4,
    width: 160,
    backgroundColor: "#333c59",
  },
});