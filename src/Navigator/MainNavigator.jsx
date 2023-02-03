import { useState } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { BottomNavigation, BottomNavigationTab } from '@ui-kitten/components';
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { Keyboard, TouchableWithoutFeedback, StyleSheet, View } from "react-native";

import { Account, DreamLogger } from "../Screens";
import Home from "../Components/Home";

import DreamCalendar from "../Components/DreamCalendar";

const { Navigator, Screen } = createBottomTabNavigator();

const BottomTabBar = ({ navigation, state }) => {
  const HomeIcon = (props) => <MaterialCommunityIcons name="home-circle" size={28} color='#d7eefa' />;
  const DreamIcon = (props) => <MaterialCommunityIcons name="cloud-circle" size={28} color='#d7eefa' />;
  const CalendarIcon = (props) => <MaterialCommunityIcons name="calendar-multiselect" size={28} color='#d7eefa' />;
  const AccountIcon = (props) => <MaterialCommunityIcons name="account-circle" size={28} color='#d7eefa' />;

  return (
    <BottomNavigation
      selectedIndex={state.index}
      onSelect={index => navigation.navigate(state.routeNames[index])}>
      <BottomNavigationTab style={styles.bottomNavigation} title="Home" icon={HomeIcon} />
      <BottomNavigationTab style={styles.bottomNavigation} title="DreamStudio" icon={DreamIcon} />
      <BottomNavigationTab style={styles.bottomNavigation} title="SleepCalendar" icon={CalendarIcon} />
      <BottomNavigationTab style={styles.bottomNavigation} title="Account" icon={AccountIcon} />
    </BottomNavigation>
  );
};

export default function MainNavigator() {
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <Navigator
        tabBar={props => <BottomTabBar {...props} />}
        headerTitleStyle={styles.screen}
        headerBackground={styles.screen}
        screenOptions={{
          headerShown: false,
          headerBackground: () => (
            <View style={styles.screen} />
          ),
          headerTitleStyle: {
            color: '#181d37',
            fontSize: 20,
            fontWeight: 'bold',
          },
          headerStyle: {
            backgroundColor: '#181d37',
          },
          headerShadowVisible: true,
          headerTintColor: '#181d37',
          headerTitleAlign: 'center',
        }}
      >
        <Screen name="Home" component={Home} style={styles.screen} />
        <Screen name="DreamStudio" component={DreamLogger} style={styles.screen} />
        <Screen name="SleepCalendar" component={DreamCalendar} style={styles.screen} />
        <Screen name="Account" component={Account} style={styles.screen} />
      </Navigator>

    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  bottomNavigation: {
    paddingVertical: 12,
    backgroundColor: '#181d37',
  },
  screen: {
    backgroundColor: '#d7eefa',
  },
});
