import { useState, useEffect } from "react";
import { View, Image, StyleSheet, TouchableWithoutFeedback, Keyboard } from "react-native";
import { Configuration, OpenAIApi } from "openai";
import { Button, Card, Modal, Text, Input } from '@ui-kitten/components';
import { IndexPath, Select, SelectItem, Radio, Layout } from '@ui-kitten/components';
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { useAuth } from "@clerk/clerk-expo";

import { OPENAI_API_KEY } from "@env";
import supabaseClient from "../../lib/supabaseClient";

const configuration = new Configuration({
  apiKey: OPENAI_API_KEY,
});

const AIDreamGen = () => {
  const [supabase, setSupabase] = useState(null);
  const [hours, setHours] = useState('');
  
  const [loading, setLoading] = useState(false); // async state for querying the api
  const [writing, setWriting] = useState(false); // async state for writing to the database
  
  const [selectedSleepIndex, setSelectedSleepIndex] = useState(new IndexPath(0));
  const [selectedFeelingsIndex, setSelectedFeelingsIndex] = useState([new IndexPath(0)]);
  const [hadDream, setHadDream] = useState(false);
  const [dreamContent, setDreamContent] = useState('');
  const [dreamFeelings, setDreamFeelings] = useState('');
  const [dreamImg, setDreamImg] = useState('');

  const [showModal, setShowModal] = useState(false);
  const [showModal2, setShowModal2] = useState(false);
  const [showModal3, setShowModal3] = useState(false);
  const [showModal4, setShowModal4] = useState(false);

  const [notes, setNotes] = useState({
    bedtime_mood: '',
    wakeup_mood: '',
    sleep_hours: 0,
    date: new Date(),

  });
  const [dream, setDream] = useState({
    prompt: '',
    imageUrl: '',
  });

  const { getToken, userId } = useAuth();

  useEffect(() => {
    const supabase = (async () => {
      const token = await getToken({ template: 'supabase' });
      const withToken = await supabaseClient(token);
      console.log('🚀 ~ file: DreamLogger.jsx:32 ~ supabase ~ withToken', withToken);

      return withToken;
    });

    setSupabase(supabase);
  }, []);

  const hoursData = [
    'Less than 4 hours',
    '4 - 6 hours',
    '6 - 8 hours',
    '8 - 10 hours',
    '10 - 14 hours',
    'More than 14 hours',
  ];

  const feelingsData = [
    'happy',
    'scared',
    'angry',
    'sad',
    'confused',
    'excited',
    'bored',
    'tired',
    'relaxed',
    'anxious',
    'frustrated',
    'lonely',
    'guilty',
    'ashamed',
    'disgusted',
    'proud',
    'hopeful',
    'jealous',
    'surprised',
  ];

  const displayValue = hoursData[selectedSleepIndex.row];
  const displayFeelingsValue = feelingsData[selectedFeelingsIndex.row];

  const openai = new OpenAIApi(configuration);
  // console.log('OPENAI', openai);

  const handleContentChange = (input) => {
    setDreamContent(input);
    console.log("DREAM CONTENT", dreamContent);
  };

  // const handleFeelingsChange = (input) => {
  //   setDreamFeelings(input);
  //   console.log('DREAM FEELINGS', dreamFeelings);
  // };

  const handleSubmitDream = async () => {
    setLoading(true);
    let dreamObject = {
      prompt: `${dreamContent}. My dream made me feel ${dreamFeelings}`, // dream from state
      n: 1, // number of images to generate
      size: "1024x1024",
    };
    console.log("DREAM OBJECT", dreamObject);
    try {
      const response = await openai.createImage(dreamObject);

      // console.log('RESPONSE BODY', response);
      console.log("RESPONSE URL", response.data.data[0].url);
      let image_url = response.data.data[0].url;
      setDreamImg(image_url);
      console.log("IMAGE URL", image_url);
      setDream({
        prompt: `${dreamContent}. My dream made me feel ${dreamFeelings}`,
        imageUrl: image_url
      });
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  async function handleSubmitLog() {
    console.log(supabase);
    const { data, error } = await supabase
      .from('sleep_logs')
      .insert([
        {
          user_id: userId,
          date: notes.date,
          bedtime_mood: notes.bedtime_mood,
          wakeup_mood: notes.wakeup_mood,
          sleep_hours: notes.sleep_hours,
          dream_prompt: dream.prompt,
          dream_link: dream.imageUrl,
        },
      ]);
    console.log('DATA', data);
    console.log('ERROR', error);
  }

  return (
    <>
      <View style={styles.container}>
        <View style={styles.newDreamLayout}>
          <MaterialCommunityIcons
            name="cloud-circle"
            color={'#d7eefa'}
            size={70}
          />
        {dream.imageUrl ? null : <Button style={styles.buttonCreate} onPress={() => setShowModal(true)}>CREATE NEW DREAM INSTANCE</Button>}
        </View>
      </View>
      <TouchableWithoutFeedback onPress={() => {Keyboard.dismiss()}}>
      
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
            <Text style={styles.text} category='h6'>How did you sleep?</Text>
            <Input
              style={styles.input}
              size='medium'
              placeholder='stressed, relaxed...?'
            />
            <Text style={styles.text} category='h6'>How long did you sleep?</Text>
            <Select
              style={styles.input}
              placeholder='Default'
              value={displayValue}
              selectedIndex={selectedSleepIndex}
              onSelect={index => {
                setSelectedSleepIndex(index);
                setHours(hoursData[index]);
              }}
            >
                {hoursData.map((title) => (
                  <SelectItem key={title} title={title}/>
                ))}
            </Select>
            <Text style={styles.text} category='h6'>How did you feel when you woke up?</Text>
            <Input
              style={styles.input}
              size='medium'
              placeholder='well-rested, groggy, energetic... ?'
            />
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
                  if(hadDream) {
                    setShowModal2(true);
                  } else {
                    // submit entry to db
                  }
                }}
              >
                {hadDream ? 'NEXT' : 'SUBMIT'}
              </Button>
            </Layout>
          </Card>
        </Modal>
      </TouchableWithoutFeedback>

      <TouchableWithoutFeedback onPress={() => {Keyboard.dismiss()}}>
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
              <Select
                style={styles.input}
                placeholder='Default'
                multiSelect={true}
                value={displayFeelingsValue}
                selectedIndex={selectedFeelingsIndex}
                onSelect={index => {
                  setSelectedFeelingsIndex(index);
                  setDreamFeelings(selectedFeelingsIndex.map((el, idx) => feelingsData[idx]).join(', '))
                }}
              >
                  {feelingsData.map((title) => (
                    <SelectItem key={title} title={title}/>
                  ))}
              </Select>
              {/* <Input
                style={styles.input}
                size='medium'
                placeholder="your feelings here"
                onChangeText={handleFeelingsChange}
              /> */}
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

      <TouchableWithoutFeedback onPress={() => {Keyboard.dismiss()}}>
        <Modal 
          visible={showModal3} 
          onClose={() => setShowModal3(false)} 
          size="lg"
        >
          <Card disabled={true}>
            <View style={styles.iconLayout}>
              <MaterialCommunityIcons
                name="cloud-circle"
                color={'#d7eefa'}
                size={40}
              />
            </View>
            {dreamImg && (
              <>
                <View className='mx-auto mb-4'>
                  <Image
                    className='h-72 w-72 rounded-lg shadow-lg shadow-black'
                    source={{ uri: dreamImg }}
                  />
                </View>
                <View className='mx-auto w-5/6'>
                  <Text style={styles.input} category='s1'>{dreamContent}</Text>
                  <Text style={styles.input} category='s1'>{dreamFeelings}</Text>
                </View>

              </>
            )}
            <Layout style={styles.layout} level='1'>
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
            </Layout>
          </Card>
        </Modal>
      </TouchableWithoutFeedback>


      {/* <Modal 
        isOpen={showModal4} 
        size="lg" 
        onClose={() => setShowModal4(false)}
      >
        <Card disabled={true}>
          <Text className='text-xl font-medium'>Done!!</Text>
          <Layout style={styles.layout} level='1'>
            <Button style={styles.buttonDismiss} onPress={() => setShowModal(false)}>
              DISMISS
            </Button>
            <Button 
              style={styles.buttonNext} 
              onPress={() => {
                setShowModal4(false);
              }}
            >
              CLOSE
            </Button>
          </Layout>
        </Card>
      </Modal> */}

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
    backgroundColor: '#232f4f',
    borderRadius: 10,
    paddingVertical: 20,
    paddingTop: 25,
    paddingHorizontal: 25,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    
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
    marginVertical: 12,
    width: '40%',
    backgroundColor: '#232f4f',
  },
  buttonNext: {
    marginVertical: 12,
    width: '40%',
    backgroundColor: '#181d37',
  },
  buttonCreate: {
    marginVertical: 12,
    width: '70%',
    backgroundColor: '#181d37',
  },
});
