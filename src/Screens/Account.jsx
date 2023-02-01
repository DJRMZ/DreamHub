import { View, Image } from "react-native";
import SignOutButton from "../Auth/SignOut";
import { ScrollView } from "react-native-gesture-handler";
import AIDreamGen from "../Components/AIDreamGen";
import DreamCalendar from "../Components/DreamCalendar";
import { Button, Card, Modal, Text } from "@ui-kitten/components";
import { StyleSheet } from "react-native";
import * as React from "react";
import { Dimensions } from "react-native";
// import Carousel from "react-native-reanimated-carousel";

const AccountScreen = () => {
  const width = Dimensions.get("window").width;
  const exampleImage = require("../../assets/example.png");

  return (
    <View style={styles.backdrop}>
      <ScrollView>
        <View style={styles.container}>
          <Text>Account</Text>
          <Text>How to use this app:</Text>
          <Text>
            Use the prompt window to describe your dream. Here are a couple
            examples:
          </Text>
          <Card>
            <Text>
              A pink bunny at the beach with a giraffe drinking lemonade
            </Text>
            <Image style={styles.image} source={exampleImage} />
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
            <Button
              onPress={() => {
                <SignOutButton />;
              }}
            >
              Sign Out
            </Button>
          </Card>

          <View style={{ flex: 1 }}>
            {/* <Carousel
            loop
            width={width}
            height={width / 2}
            autoPlay={true}
            data={[...new Array(6).keys()]}
            scrollAnimationDuration={1000}
            onSnapToItem={(index) => console.log("current index:", index)}
            renderItem={({ index }) => (
              <View
              style={{
                flex: 1,
                borderWidth: 1,
                justifyContent: "center",
              }}
              >
              <Text style={{ textAlign: "center", fontSize: 30 }}>
              {index}
              </Text>
              </View>
              )}
            /> */}
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
