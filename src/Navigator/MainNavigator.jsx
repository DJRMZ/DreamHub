import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { Keyboard, TouchableWithoutFeedback } from "react-native";

import { Home, Account, DreamLogger } from "../Screens";
import DreamCalendar from "../Components/DreamCalendar";

const Tab = createBottomTabNavigator();

export default function MainNavigator() {
  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
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
          component={Home}
          options={{
            tabBarLabel: "Home",
            tabBarIcon: () => (
              <MaterialCommunityIcons
                name="home-circle"
                color={"#000"}
                size={26}
              />
            ),
          }}
          tabBarBadge={3}
        />
        <Tab.Screen
          name="DreamStudio"
          component={DreamLogger}
          options={{
            tabBarLabel: "DreamUI",
            tabBarIcon: () => (
              <MaterialCommunityIcons
                name="cloud-circle"
                color={"#000"}
                size={26}
              />
            ),
          }}
          tabBarBadge={3}
        />
        <Tab.Screen
          name="DreamCalendar"
          component={DreamCalendar}
          options={{
            tabBarLabel: "DreamCalendar",
            tabBarIcon: () => (
              <MaterialCommunityIcons
                name="calendar-multiselect"
                color={"#000"}
                size={26}
              />
            ),
          }}
          tabBarBadge={3}
        />
        <Tab.Screen
          name="Account"
          component={Account}
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
    </TouchableWithoutFeedback>
  );
}
