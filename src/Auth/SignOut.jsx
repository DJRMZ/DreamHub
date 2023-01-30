import { Button } from "react-native";
import { useClerk } from "@clerk/clerk-expo/dist";

const SignOutButton = () => {
  const { signOut } = useClerk();

  return (
    <Button title="Sign Out" onPress={() => signOut()} />
  );
};

export default SignOutButton;