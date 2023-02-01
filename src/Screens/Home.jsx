import AIDreamGen from "../Components/AIDreamGen";
import DreamCalendar from "../Components/DreamCalendar";
import Camera from "./Camera";
import { Button, Card, Modal, Text } from "@ui-kitten/components";
import { StyleSheet } from "react-native";
import { ScrollView } from "native-base";

import * as React from "react";
import { Dimensions, View } from "react-native";
// import Carousel from "react-native-reanimated-carousel";

const HomeScreen = () => {
  const width = Dimensions.get("window").width;

  return (
    <View style={styles.backdrop}>
      <View style={styles.container}>
        <Text>Home</Text>
        <Text>How to use this app:</Text>
        <Text>
          The Dream UI button on the home screen or the Dream UI tab at the
          bottom of the screen will take you to the screen to input some text to
          describe your dream. There are different prompts you can use,
          including time, environment, nouns and verbs. Be as descriptive as you
          like and see what image you can create!
        </Text>
        <Card>
          <Button
            onPress={() => {
              <DreamGen />;
            }}
          >
            Create an Image
          </Button>
        </Card>
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
              <Camera />;
            }}
          >
            Take a picture
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
        <View style={{ flex: 1 }}>
          {/* <Carousel
            loop
            width={width}
            height={width / 2}
            autoPlay={true}
            // data={[...new Array(6).keys()]}
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
    </View>
  );
};

export default HomeScreen;

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
});
