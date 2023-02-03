import { useState } from "react";
import TipsScreen from "./TipsScreen";
import SignOutButton from "../Auth/SignOut";
import {
  Card,
  Layout,
  Text,
  Divider,
  Button,
} from '@ui-kitten/components';

import { View, StyleSheet, TouchableWithoutFeedback, Dimensions, Image } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import space from '../assets/spaceial2.jpg';

const AccountIcon = (props) => <MaterialCommunityIcons name="account-circle" size={50} color='#d7eefa' />;

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

const AccountScreen = () => {
  const [visible, setVisible] = useState(false);

  return (
    <>
      <Layout style={styles.layout}>
        <View style={styles.hero}>
          <Image source={space} style={styles.heroImage} />
        </View>
        <View style={styles.cardLayout}>
          <View style={styles.iconLayout}>
            <AccountIcon />
          </View>
          <View>
            <Button
              style={styles.button}
              onPress={() => setVisible(true)}
            >
              {evaProps => <Text {...evaProps} style={{ fontSize: 18, fontWeight: "bold" }}>Sleep Tips</Text>}
            </Button>
            <TipsScreen visible={visible} setVisible={setVisible} />
          </View>
          <SignOutButton style={styles.button} />
        </View>
      </Layout>
    </>
  );
}

export default AccountScreen;

const styles = StyleSheet.create({
  layout: {
    // display: 'flex',
    // flexDirection: 'column',
    // justifyContent: 'center',
    // alignItems: 'center',
    height: '100%',
    backgroundColor: '#232f4f',
  },
  hero: {
    width: '100%',
    height: 150,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    // maxWidth: 400,
    // paddingHorizontal: 14,
    // paddingBottom: 16,
    // padding: 10,
    backgroundColor: '#333c59',
    // borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 1, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 10,
    alignItems: 'center',
    borderBottomColor: '#181d37',
    borderBottomWidth: 1,
  },
  heroImage: {
    width: width,
    height: 150,
    maxHeight: 150,
    resizeMode: "cover",
  },
  cardLayout: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '75%',
  },
  iconLayout: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#181d37',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 18,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  cardTextHeader: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#d7eefa",
    marginBottom: 20,
  },
  cardText: {
    fontSize: 20,
    color: "#d7eefa",
    marginBottom: 20,
  },
  button: {
    marginVertical: 18,
    width: 160,
    backgroundColor: '#181d37',
  },
});
