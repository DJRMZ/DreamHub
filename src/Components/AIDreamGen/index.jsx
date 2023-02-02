import { useState, useEffect, useCallback } from "react";
import { View, Image, StyleSheet, TouchableWithoutFeedback, Keyboard } from "react-native";
import { Configuration, OpenAIApi } from "openai";
import { Button, Card, Modal, Text, Input, IndexPath, Select, SelectItem, Radio, Layout, Divider } from '@ui-kitten/components';
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { useAuth } from "@clerk/clerk-expo";
import * as FileSystem from 'expo-file-system';
import { decode } from 'base64-arraybuffer';
import { Grid } from 'react-native-animated-spinkit'
import debounce from "lodash/debounce";


import { OPENAI_API_KEY } from "@env";
import supabaseCtor from "../../lib/supabaseClient";

const configuration = new Configuration({
  apiKey: OPENAI_API_KEY,
});

function dateToFileName(date) {
  // console.log('🚀 ~ file: index.jsx:19 ~ dateToFileName ~ date', date);
  return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
}

const DreamIcon = (props) => (
  <MaterialCommunityIcons name="cloud-circle" size={60} color='#d7eefa' />
);

const hoursData = [
  'Less than 4 hours',
  '4 - 6 hours',
  '6 - 8 hours',
  '8 - 10 hours',
  '10 - 14 hours',
  'More than 14 hours',
];

const AIDreamGen = () => {
  const [token, setToken] = useState('');

  const [loading, setLoading] = useState(false); // async state for querying the api
  const [writing, setWriting] = useState(false); // async state for writing to the database

  const [selectedSleepIndex, setSelectedSleepIndex] = useState(new IndexPath(0));
  // const [selectedFeelingsIndex, setSelectedFeelingsIndex] = useState([new IndexPath(0)]);

  const [hours, setHours] = useState('');
  const [quality, setQuality] = useState(10);
  const [mood, setMood] = useState('');

  const [hadDream, setHadDream] = useState(false);
  const [dreamContent, setDreamContent] = useState('');
  const [dreamFeelings, setDreamFeelings] = useState('');
  const [dreamImg, setDreamImg] = useState('');

  const [showModal, setShowModal] = useState(false);
  const [showModal2, setShowModal2] = useState(false);
  const [showModal3, setShowModal3] = useState(false);
  const [showModal4, setShowModal4] = useState(false);

  const [dream, setDream] = useState({
    prompt: '',
    imageUrl: '',
  });

  const { getToken, userId } = useAuth();
  // console.log('🚀 ~ file: index.jsx:48 ~ AIDreamGen ~ userId', userId);


  useEffect(() => {
    (async () => {
      const token = await getToken({ template: 'supabase' });
      // console.log('🚀 ~ file: index.jsx:61 ~ token', token);
      setToken(token);
    })();

    // saveImage();
  }, []);

  const tempName = () => Math.trunc(Math.random() * 1000000).toString();

  async function saveImage(link = 'https://picsum.photos/500.jpg', format = 'jpg', name = tempName()) {
    const fileName = `${name}_${tempName()}.${format}`;

    const file = await FileSystem.downloadAsync(
      link,
      FileSystem.cacheDirectory + fileName
    ).then(({ uri }) => {
      console.log('Finished downloading to ', uri, '\n');
      return FileSystem.readAsStringAsync(uri, { encoding: FileSystem.EncodingType.Base64 });
    }).then((base64) => {
      return base64;
    }).catch((e) => {
      console.error(e);
    });

    const decodedFile = decode(file);

    const supabaseClient = await supabaseCtor(token);
    const { data, error } = await supabaseClient.storage
      .from('dream-images')
      .upload(`${userId}/${fileName}`, decodedFile, {
        contentType: `image/${format}`,
      });

    console.log('🚀 ~ file: index.jsx:110 ~ saveImage ~ data', data, '\n');
    console.log('🚀 ~ file: index.jsx:106 ~ saveImage ~ error', error);
    if (error) {
      throw new Error(error);
    }
    return data.path;
  };

  const openai = new OpenAIApi(configuration);
  // console.log('OPENAI', openai);

  const handleMoodChange = useCallback(debounce((value) => {
    setMood(value);
  }, 300), []);

  const handleContentChange = useCallback(debounce((value) => {
    setDreamContent(value);
  }, 300), []);

  const handleSubmitDream = async () => {
    setLoading(true);
    let dreamObject = {
      prompt: `From the perspective of a dreamer, ${dreamContent}.${dreamFeelings && ' My dream made me feel ' + dreamFeelings + '.'}`, // dream from state
      n: 1, // number of images to generate
      size: "1024x1024",
    };
    console.log("DREAM OBJECT", dreamObject);
    try {
      const response = await openai.createImage(dreamObject);

      // console.log("RESPONSE URL", response.data.data[0].url);
      let image_url = response.data.data[0].url;
      setDreamImg(image_url);
      setDream({
        prompt: `${dreamContent}.${dreamFeelings && ' My dream made me feel ' + dreamFeelings + '.'}`,
        imageUrl: image_url
      });
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  async function handleSubmitLog() {
    const supabaseClient = await supabaseCtor(token);
    console.log('🚀 ~ file: index.jsx:144 ~ handleSubmitLog ~ supabaseClient', supabaseClient, '\n');

    const date = new Date();
    const localFileName = dateToFileName(date);
    const imagePath = dream.imageUrl ? await saveImage(dream.imageUrl, 'png', localFileName) : null;

    const { data, error } = await supabaseClient
      .from('sleep_logs')
      .insert({
        user_id: userId,
        date: date,
        bedtime_mood: mood,
        sleep_quality: quality,
        hours_sleep: hours,
        dream_prompt: dream.prompt,
        dream_link: imagePath,
      })
      .select();
    console.log('DATA', data);
    console.log('ERROR', error);
  }

  return (
    <>
      <View style={styles.container}>
        <View style={styles.newDreamLayout}>
          <View style={styles.iconRound}>
            <DreamIcon />
          </View>
          <Button style={styles.buttonCreate} onPress={() => setShowModal(true)}>START HERE!</Button>
        </View>
      </View>
      <TouchableWithoutFeedback onPress={() => { Keyboard.dismiss() }}>
        <Modal
          visible={showModal}
          backdropStyle={styles.backdrop}
          style={styles.modal}
          onBackdropPress={() => setShowModal(false)}
        >
          <Card disabled={true}>
            <View style={styles.iconLayout}>
              <MaterialCommunityIcons
                name="cloud-circle"
                color={'#d7eefa'}
                size={40}
              />
            </View>
            <Text style={styles.text} category='h6'>How did you feel when you went to bed?</Text>
            <Input
              style={styles.input}
              size='medium'
              placeholder='stressed, relaxed...?'
              onChangeText={handleMoodChange}
            />
            <Text style={styles.text} category='h6'>How long did you sleep?</Text>
            <Select
              style={styles.input}
              placeholder='Default'
              value={hoursData[selectedSleepIndex.row]}
              selectedIndex={selectedSleepIndex}
              onSelect={index => {
                setSelectedSleepIndex(index);
                setHours(hoursData[index.row]);
              }}
            >
              {hoursData.map((title) => (
                <SelectItem key={title} title={title} />
              ))}
            </Select>
            <Text style={styles.text} category='h6'>Please rate the quality of your sleep?</Text>
            <Select
              style={styles.input}
              placeholder='On a scale of 1-10...'
              value={quality}
              onSelect={index => {
                setQuality(index.row + 1);
              }}
            >
              {new Array(10).fill(0).map((_, index) => (
                <SelectItem key={index} title={index} />
              ))}
            </Select>
            <Text style={styles.text} category='h6'>Did you have a dream?</Text>
            <Layout style={styles.layout} level='1'>
              <Radio
                style={styles.input}
                checked={hadDream}
                onChange={nextChecked => setHadDream(nextChecked)}>
                Yes
              </Radio>
              <Radio
                style={styles.input}
                checked={!hadDream}
                onChange={nextChecked => setHadDream(!nextChecked)}>
                No
              </Radio>
            </Layout>
            <Layout style={styles.layout} level='1'>
              <Button style={styles.buttonDismiss} onPress={() => setShowModal(false)}>
                DISMISS
              </Button>
              <Button
                style={styles.buttonNext}
                onPress={() => {
                  setShowModal(false);
                  // setNotes({
                  //   date: new Date(),
                  //   bedtime_mood: '', // Must change!
                  //   sleep_quality: '', // Must change!
                  //   hours_sleep: hours,
                  // })
                  if (hadDream) {
                    setShowModal2(true);
                  } else {
                    handleSubmitLog();
                  }
                }}
              >
                {hadDream ? 'NEXT' : 'SUBMIT'}
              </Button>
            </Layout>
          </Card>
        </Modal>
      </TouchableWithoutFeedback>

      <TouchableWithoutFeedback onPress={() => { Keyboard.dismiss() }}>
        <Modal
          visible={showModal2}
          onClose={() => setShowModal2(false)}
          backdropStyle={styles.backdrop}
          style={styles.modal}
        >
          <Card disabled={true}>
            <View style={styles.iconLayout}>
              <MaterialCommunityIcons
                name="cloud-circle"
                color={'#d7eefa'}
                size={40}
              />
            </View>
            <Text style={styles.text} category='h6'>What happened in your dream?</Text>
            <Input
              multiline={true}
              style={styles.input}
              textStyle={{ minHeight: 64 }}
              placeholder='Please describe your dream here...'
              onChangeText={handleContentChange}
            />
            <Text style={styles.text} category='h6'>How did your dream make you feel?</Text>
            <Input
              style={styles.input}
              size='medium'
              placeholder="happy, scared, confused, angry...?"
              onChangeText={(feelings) => setDreamFeelings(feelings)}
            />

            <Layout style={styles.layout} level='1'>
              <Button style={styles.buttonDismiss} onPress={() => setShowModal2(false)}>
                DISMISS
              </Button>
              <Button
                style={styles.buttonNext}
                onPress={() => {
                  setShowModal2(false);
                  setShowModal3(true);
                  handleSubmitDream();
                }}
              >
                NEXT
              </Button>
            </Layout>
          </Card>
        </Modal>
      </TouchableWithoutFeedback>

      <TouchableWithoutFeedback onPress={() => { Keyboard.dismiss() }}>
        <Modal
          visible={showModal3}
          onClose={() => setShowModal3(false)}
          size="lg"
        >
          <Card style={styles.card} disabled={true}>
            <View style={styles.iconLayout}>
              <MaterialCommunityIcons
                name="cloud-circle"
                color={'#d7eefa'}
                size={50}
              />
            </View>
            {loading ? (
              <>
                <View style={styles.loadingLayout}>
                  <Grid
                    size={70}
                    color='#d7eefa'
                  />
                </View>
              </>
            ) : (
              <>
                <View className='mx-auto mb-4'>
                  <Image
                    className='h-72 w-72 rounded-lg shadow-lg shadow-black'
                    source={{ uri: dream.imageUrl }}
                  />
                </View>
                <View className='mx-auto w-5/6'>
                  <Card style={styles.dreamPrompt} >
                    <Text style={{ fontSize: 16, fontWeight: "bold" }}>Your Dream:</Text>
                    <Text style={{ fontStyle: "italic", marginVertical: 4 }} category='s1'>"{dreamContent}"</Text>
                    {/* <Text style={styles.input} category='s1'>{dreamFeelings}</Text> */}
                  </Card>
                </View>
              </>
            )}
            <View style={styles.layout} level='1'>
              <Button style={styles.buttonDismiss} onPress={() => setShowModal3(false)}>
                DISMISS
              </Button>
              <Button
                style={styles.buttonNext}
                onPress={() => {
                  setShowModal3(false);
                  // Submit into DB
                  setShowModal4(true);
                  handleSubmitLog();
                }}
              >
                SAVE
              </Button>
            </View>
          </Card>
        </Modal>
      </TouchableWithoutFeedback>
    </>
  );
};

export default AIDreamGen;

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
    // marginTop: 100,
  },
  layout: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  newDreamLayout: {
    flexDirection: 'column',
    flexWrap: 'wrap',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    color: '#d7eefa',
    backgroundColor: '#333c59',
    borderRadius: 10,
    paddingVertical: 20,
    paddingTop: 35,
    paddingHorizontal: 30,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  iconRound: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#181d37',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  card: {
    backgroundColor: '#232f4f',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  dreamPrompt: {
    flexDirection: 'column',
    flexWrap: 'wrap',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    color: '#d7eefa',
    backgroundColor: '#232f4f',
    borderRadius: 10,
    // paddingVertical: 20,
    // paddingTop: 25,
    // paddingHorizontal: 25,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    maxHeight: 200,
    overflow: 'scroll',
  },
  iconLayout: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    marginBottom: 10,
    marginTop: 2,
  },
  modal: {
    width: '90%',
  },
  backdrop: {
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  input: {
    marginVertical: 12,
  },
  buttonDismiss: {
    marginVertical: 16,
    width: '40%',
    backgroundColor: '#232f4f',
  },
  buttonNext: {
    marginVertical: 16,
    width: '40%',
    backgroundColor: '#181d37',
  },
  buttonCreate: {
    marginVertical: 18,
    width: 175,
    backgroundColor: '#181d37',
  },
  loadingLayout: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    marginVertical: 50,
    marginBottom: 60,
  },
});
