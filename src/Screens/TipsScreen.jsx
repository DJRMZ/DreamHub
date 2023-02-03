import {
  Button,
  Card,
  Layout,
  Text,
  Divider,
  Modal,
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

const MoonIcon = (props) => (
  <MaterialCommunityIcons name="weather-night" size={50} color="#d7eefa" />
);

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

const TipsScreen = ({ visible, setVisible }) => {
  return (
    <>
      <Modal style={styles.layout} visible={visible} >
        <View style={styles.iconLayout}>
          <MoonIcon />
        </View>
        <FlatList
          data={[
            {
              id: 1,
              title: "Create a routine or sleep schedule",
              content:
                "Get a routine going with 8 hours set aside for sleep. Having a routine where you go to bed and wake up at the same times everyday. Consistency is key in reinforcing the body's sleep-wake cycle. ",
            },
            {
              id: 2,
              title:
                "Plan accordingly with your routine what and when you eat and drink",
              content:
                "Try not to go to bed hungry or to full. Either can make getting to sleep and staying asleep uncomfortable. Drugs such as caffeine, alcohol and nicotine can have a major affect on the ability to fall asleep and stay asleep. Even if you do fall asleep, it could still be considered 'bad' sleep.",
            },
            {
              id: 3,
              title:
                "Create an environment that promotes rest and relaxation.",
              content:
                "Having a bedroom that is dark, quiet and a comfortable temperature can promote calming rest and relaxation.",
            },
            {
              id: 4,
              title: "Regular exercise and staying active",
              content:
                "Spending time outdoors and being active throughout the day can help with better sleep at night.",
            },
            {
              id: 5,
              title: "Keep napping during the day to a minimum",
              content:
                "Naps should be limited to less than an hour and try to avoid napping to late in the day. These can have a major affect on falling asleep and staying asleep at night.",
            },
            {
              id: 6,
              title: "Quality Mattress, pillow(s) and bedding",
              content:
                "Having a good quality mattress that fits your needs can make or break a good night's rest. Having good quality bedding and pillows can complete the comfort and ensure better rest and sleep. Spend some time researching and finding which products will suit your needs, i.e. back sleeper vs. side sleeper and firm vs. soft mattress/pillows. ",
            },
            {
              id: 7,
              title: "Reserve the bed for sleeping",
              content:
                "Although it might be comfortable and tempting to use this area to hangout when not sleeping, this can affect how the environment and your routine is affected. It is best to keep work at a work station, reserve the bed for sleeping and leisure separate from those areas. This will assist in building good routines and helping your body adapt.",
            },
            {
              id: 8,
              title: "Journal or keep a daily sleep diary",
              content:
                "Keeping track of how you slept, how long you slept, etc. can help you identify areas for improvement or better diagnose things that could be hindering your sleep. This can be especially handy when changing up the routine or adding something new.",
            },
            {
              id: 9,
              title: "Check in with your Doctor",
              content:
                "It can be helpful to get with your primary doctor and get their input on how to get help with sleep issues and/or improving you sleep habits. Sleeping to little or too much can be harmful and could point to other underlying issues or areas of concern.",
            },
            {
              id: 10,
              title:
                "Increase your exposure to bright light during the day",
              content:
                "Our body's circadian rhythm is our natural time-keeping clock. Getting more exposure to light during the day and less at night can help your body keep better time and be ready to rest at night. Lowering exposure to blue light from digital devices, monitors and tv screens especially later in the day can greatly improve quality of sleep as well.",
            },
          ]}
          keyExtractor={(item) => item.id.toString()}
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.scrollView}
          initialScrollIndex={0}
          renderItem={({ item }) => (
            <Card style={styles.viewPager}>
              <Text style={styles.cardTextHeader}>Sleep Tip #{item.id}</Text>
              <Divider />
                <Text style={styles.cardTextTitle}>{item.title}</Text>
                <Divider />
                <Text style={styles.cardText}>{item.content}</Text>
            </Card>
          )}
        />
        <Button style={styles.button} onPress={() => setVisible(false)}>
          {evaProps => <Text {...evaProps} style={{ fontSize: 18, fontWeight: "bold" }}>Dismiss</Text>}
        </Button>
      </Modal>
    </>
  );
};

export default TipsScreen;

const styles = StyleSheet.create({
  layout: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    height: "72.5%",
    // paddingTop: 20,
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
    width: 90,
    height: 90,
    borderRadius: 50,
    backgroundColor: '#181d37',
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 36,
    // marginTop: 8,
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
    height: height * 0.43,
    marginTop: 26,
    backgroundColor: '#333c59',
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
  cardTextHeader: {
    color: "#d7eefa",
    fontSize: 18,
    fontWeight: "bold",
    paddingBottom: 12,
  },
  cardTextTitle: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
    paddingVertical: 8,
  },
  cardText: {
    color: "#fff",
    fontSize: 16,
    paddingVertical: 8,
    lineHeight: 21,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    // marginVertical: 16,
    width: '40%',
    backgroundColor: '#181d37',
  },
});
