import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import HomeScreen from "../Screens/HomeScreen";
import AccountScreen from "../Screens/AccountScreen";

const Tab = createBottomTabNavigator();

export default function MainNavigator() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        tabBarActiveTintColor: "#283769",
        tabBarInactiveTintColor: "#000",
        tabBarActiveBackgroundColor: "#ced8f7",
        tabBarStyle: { height: 80 },
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarLabel: "Home",
          tabBarIcon: () => (
            <MaterialCommunityIcons name="home-circle" color={"#000"} size={26} />
          ),
        }}
        tabBarBadge={3}
      />
      <Tab.Screen
        name="Account"
        component={AccountScreen}
        options={{
          tabBarLabel: "Account",
          tabBarIcon: () => (
            <MaterialCommunityIcons
              name="account-circle"
              color={"#000"}
              size={26}
            />
          ),
        }}
        tabBarBadge={3}
      />
    </Tab.Navigator>
  )
}
