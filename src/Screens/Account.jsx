import SignOutButton from "../Auth/SignOut";
import {
  Card,
  Layout,
  Text,
  Divider,
} from '@ui-kitten/components';

import { View, StyleSheet, TouchableWithoutFeedback, Dimensions, FlatList, Image } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import space from '../../assets/spaceial.jpg';

const DreamIcon = (props) => (
  <MaterialCommunityIcons name="cloud-circle" size={50} color='#d7eefa' />
);

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

const AccountScreen = () => {

  return (
    <View style={styles.backdrop}>
      <ScrollView>
        <View style={styles.container}>
          <Text>How to use this app:</Text>
          <Text>
            Use the prompt window to describe your dream. Here are a couple
            examples:
          </Text>
          <Card>
            <Text>
              A pink bunny at the beach with a giraffe drinking lemonade
            </Text>
            {/* <Image style={styles.image} source={exampleImage} /> */}
          </Card>
          <Text>
            The Dream UI button on the home screen or the Dream UI tab at the
            bottom of the screen will take you to the screen to input some text
            to describe your dream. There are different prompts you can use,
            including time, environment, nouns and verbs. Be as descriptive as
            you like and see what image you can create!
          </Text>
          <Card>
            <Button
              onPress={() => {
                <Notes />;
              }}
            >
              Journal/Notes
            </Button>
          </Card>
          <Card>
            <Button
              onPress={() => {
                <DreamCal />;
              }}
            >
              Calendar
            </Button>
          </Card>
          <Card>
            <Button
              onPress={() => {
                <DreamCal />;
              }}
            >
              Tips and Tricks
            </Button>
          </Card>
          <Card>
          <SignOutButton />
          </Card>

          <View style={{ flex: 1 }}>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default AccountScreen;

const styles = StyleSheet.create({
  container: {
    minHeight: 192,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  backdrop: {
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    minHeight: "100%",
  },
  image: {
    maxWidth: 98,
    maxHeight: 90,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
});
