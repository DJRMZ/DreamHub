import {
  Button,
  Card,
  Layout,
  Text,
  Divider,
  ViewPager,
} from "@ui-kitten/components";

import {
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  Dimensions,
  FlatList,
} from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

const DreamIcon = (props) => (
  <MaterialCommunityIcons name="cloud-circle" size={50} color="#d7eefa" />
);

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

const Home = () => {
  return (
    <>
      <Layout style={styles.layout}>
        <View style={styles.iconLayout}>
          <DreamIcon />
        </View>
        <View style={styles.hero}>
          <Text style={styles.heroText}>Welcome to DreamHub</Text>
        </View>
        <FlatList
          data={[
            {
              id: 1,
              title: "Card 1: Create a routine or sleep schedule",
              content:
                "Get a routine going with 8 hours set aside for sleep. Having a routine where you go to bed and wake up at the same times everyday. Consistency is key in reinforcing the body's sleep-wake cycle. ",
            },
            {
              id: 2,
              title:
                "Card 2: Plan accordingly with your routine what and when you eat and drink",
              content:
                "Try not to go to bed hungry or to full. Either can make getting to sleep and staying asleep uncomfortable. Drugs such as caffiene, alcohol and nicotine can have a major affect on the ability to fall asleep and stay asleep. Even if you do fall asleep, it could still be considered 'bad' sleep",
            },
            {
              id: 3,
              title:
                "Card 3: Create an environment that promotes rest and relaxation.",
              content:
                "Having a bedroom that is dark, quiet and a comfortable tempurature can promote calming rest and relaxation.",
            },
            {
              id: 4,
              title: "Card 4: Regular exercise and staying active",
              content:
                "Spending time outdoors and being active throughout the day can help with better sleep at night.",
            },
            {
              id: 5,
              title: "Card 5: Keep napping during the day to a minimum",
              content:
                "Naps should be limited to less than an hour and try to avoid napping to late in the day. These can have a major affect on falling asleep and staying asleep at night.",
            },
            {
              id: 6,
              title: "Card 3: Stress Management",
              content:
                "Creating and managing a daily routine can help with sleep, stress and a multitude of other things. Journaling, taking notes, working on resolving issues and concerns before bedtime will improve the chances and quality of good sleep.",
            },
          ]}
          keyExtractor={(item) => item.id.toString()}
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.scrollView}
          initialScrollIndex={0}
          renderItem={({ item }) => (
            <Card style={styles.viewPager}>
              <Text style={styles.cardText}>Sleep Tip #{item.id}</Text>
              <Text style={styles.cardText}>{item.title}</Text>
              <Text style={styles.cardText}>{item.content}</Text>
            </Card>
          )}
        />
      </Layout>
    </>
  );
};

export default Home;

const styles = StyleSheet.create({
  layout: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
    paddingTop: 20,
    backgroundColor: "#333c59",
  },
  hero: {
    width: "90%",
    maxWidth: 400,
    paddingHorizontal: 14,
    // paddingBottom: 16,
    padding: 10,
    backgroundColor: "#232f4f",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
    alignItems: "center",
  },
  heroText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
  },
  iconLayout: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "#232f4f",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  scrollView: {
    // width: width * 0.92,
    height: "100%",
    marginHorizontal: width * 0.02,
  },
  viewPager: {
    width: width * 0.89,
    maxWidth: width * 0.89,
    height: height * 0.47,
    marginTop: 16,
    backgroundColor: "#232f4f",
    borderRadius: 10,
    marginHorizontal: width * 0.01,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
    // marginRight: 16,
    // marginLeft: 16,
    // paddingRight: 16,
  },
  cardText: {
    color: "#fff",
    fontSize: 20,
    padding: 10,
  },
});
