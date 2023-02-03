import {
  Card,
  Layout,
  Text,
  Divider,
  ViewPager,
} from '@ui-kitten/components';

import {
  View,
  StyleSheet,
  Dimensions,
  FlatList,
  Image,
} from "react-native";

import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import space from "../../assets/spaceial2.jpg";

const MoonIcon = (props) => (
  <MaterialCommunityIcons name="weather-night" size={50} color="#d7eefa" />
);

const DreamIcon = (props) => (
  <MaterialCommunityIcons name="cloud-circle" size={50} color="#d7eefa" />
);

const CalendarIcon = (props) => (
  <MaterialCommunityIcons
    name="calendar-multiselect"
    size={50}
    color="#d7eefa"
  />
);

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

const { width: heroTextWidth, height: heroTextHeight } = Dimensions.get('window');

const Home = () => {
  return (
    <>
      <Layout style={styles.layout}>
        <View style={styles.hero}>
          <View style={styles.heroLayout} />
          <Text style={styles.heroText}>Where Your Dreams Are ReImagined</Text>
          <Image source={space} style={styles.heroImage} />
        </View>
        <FlatList
          data={[
            {
              id: 1,
              header: 'Quick Start Guide',
              text1:
                "DreamStudio gives you the power of AI at your fingertips to create a visual representation of your dream.",
              text2:
                "SleepCalendar gives you access to saved images and entries.",
            },
            {
              id: 2,
              header: "DreamStudio",
              text1: "Access the DreamStudio tab and select \"How'd You Sleep?\" to begin the Dream Prompts.",
              text2: "Answer each question to create your dream and save it to your SleepCalendar!",
            },
            {
              id: 3,
              header: "SleepCalendar",
              text1:
                "Click on the SleepCalendar tab at the bottom of the screen.",
              text2:
                "View the calendar and navigate to saved entries by selecting the date of your dream instance.",
            },
          ]}
          keyExtractor={(item) => item.id.toString()}
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.scrollView}
          initialScrollIndex={0}
          renderItem={({ item }) => (
            <Card style={styles.viewPager}>
              <View style={styles.cardLayout}>
                <View style={styles.iconLayout}>
                  {item.id === 1 && <MoonIcon />}
                  {item.id === 2 && <DreamIcon />}
                  {item.id === 3 && <CalendarIcon />}
                </View>
                <Text style={styles.cardTextHeader}>{item.header}</Text>
                <Text style={styles.cardText}>{item.text1}</Text>
                <Text style={styles.cardText}>{item.text2}</Text>
              </View>
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
    // paddingTop: 20,
    backgroundColor: "#232f4f",
  },
  cardLayout: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  hero: {
    width: "100%",
    height: 150,
    position: 'relative',
    backgroundColor: "#333c59",
    shadowColor: "#000",
    shadowOffset: { width: 1, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 10,
    alignItems: "center",
    borderBottomColor: "#181d37",
    borderBottomWidth: 1,
  },
  heroText: {
    fontSize: 24,
    paddingHorizontal: 85,
    position: 'absolute',
    top: '26%',
    opacity: 0.85,
    // fontWeight: 'bold',
    fontStyle: 'italic',
    fontFamily: 'sans-serif',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: {width: -1, height: 1},
    textShadowRadius: 10,
    textAlign: 'center',
    color: '#d7eefa',
    zIndex: 2,
  },
  heroLayout: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: "#181d37",
    position: 'absolute',
    top: '1.5%',
    opacity: 0.55,
    borderColor: "#000",
    borderWidth: 1,
    marginBottom: 8,
    marginTop: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
    zIndex: 1,
  },
  heroImage: {
    width: "100%",
    height: 150,
    maxHeight: 150,
    resizeMode: "cover",
    borderBottomColor: "#181d37",
    borderBottomWidth: 1,
    shadowColor: "#000",
    shadowOffset: { width: 1, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 10,
    zIndex: 0,
  },
  iconLayout: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "#181d37",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
    marginTop: 8,
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
    height: height * 0.49,
    maxHeight: height * 0.53,
    marginTop: 32,
    backgroundColor: "#333c59",
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
    color: "#fff",
    fontSize: 21,
    fontWeight: "bold",
    padding: 10,
    textAlign: "center",
  },
  cardText: {
    color: "#fff",
    fontSize: 18,
    padding: 10,
    textAlign: "center",
  },
});

// const Home = () => {
//   const [selectedIndex, setSelectedIndex] = useState(0);

//   const width = Dimensions.get('window').width;

//   return (
//     <>
//       <Layout style={styles.layout}>
//         <View style={styles.iconLayout}>
//           <DreamIcon />
//         </View>
//         <View style={styles.hero}>
//           <Text style={styles.heroText}>Welcome to DreamHub</Text>
//         </View>
//         <ScrollView
//           horizontal
//           showsHorizontalScrollIndicator={false}
//           style={styles.scrollView}
//         >
//           <Card style={styles.viewPager}>
//             <Text style={styles.cardText}>
//               Card 1: How to create a new dream
//             </Text>
//           </Card>
//           <Card style={styles.viewPager}>
//             <Text style={styles.cardText}>
//               Card 2: How to track your progress
//             </Text>
//           </Card>
//           <Card style={styles.viewPager}>
//             <Text style={styles.cardText}>
//               Card 3: How to connect with friends
//             </Text>
//           </Card>
//         </ScrollView>
//       </Layout>
//     </>
//   );
// };

// export default Home;

// const styles = StyleSheet.create({
//   layout: {
//     display: 'flex',
//     flexDirection: 'column',
//     justifyContent: 'center',
//     alignItems: 'center',
//     height: '100%',
//     paddingTop: 50,
//     backgroundColor: '#333c59',
//   },
//   hero: {
//     width: '90%',
//     maxWidth: 400,
//     paddingHorizontal: 14,
//     paddingBottom: 16,
//     paddingTop: 4,
//     backgroundColor: '#232f4f',
//     borderRadius: 10,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.8,
//     shadowRadius: 2,
//     elevation: 5,
//     alignItems: 'center',
//   },
//   heroText: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     color: '#fff',
//     marginBottom: 16,
//   },
//   iconLayout: {
//     width: 100,
//     height: 100,
//     borderRadius: 50,
//     backgroundColor: '#232f4f',
//     display: 'flex',
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginBottom: 16,
//   },
//   viewPager: {
//     width: '90%',
//     height: 300,
//     marginTop: 16,
//     backgroundColor: '#232f4f',
//     borderRadius: 10,
//   },
//   page: {
//     height: 192,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   pageText: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     color: '#fff',
//     marginBottom: 16,
//   },
// });
