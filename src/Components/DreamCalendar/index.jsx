import { useState, useEffect } from "react";
import { useAuth } from "@clerk/clerk-expo";
import { StyleSheet, Text, View, Button, Image } from "react-native";
import * as FileSystem from "expo-file-system";
import {
  Agenda,
  // DateData,
  // AgendaEntry,
  // AgendaSchedule,
} from "react-native-calendars";
import { Card, Modal, Layout } from '@ui-kitten/components';
import { Grid } from 'react-native-animated-spinkit'


function transformData(data) {
  const result = {};
  data.forEach((item) => {
    const date = item.date;
    if (!result[date]) {
      result[date] = [];
    }
    result[date].push({
      createdAt: item.created_at,
      title: item.date,
      sleepQuality: item.sleep_quality,
      sleepLength: item.sleep_length,
      bedtimeMood: item.bedtime_mood,
      notes: item.notes,
      prompt: item.dream_prompt,
      imageLink: item.dream_link,
    });
  });
  return result;
}

import supabaseCtor from "../../lib/supabaseClient";

const DreamCalendar = () => {
  const [showModal, setShowModal] = useState(false);

  const [items, setItems] = useState({});
  const [images, setImages] = useState({
    test: 'test',
  });
  const [image, setImage] = useState(null);
  const [prompt, setPrompt] = useState(null);

  const [loadingImage, setLoadingImage] = useState(false);

  const [token, setToken] = useState("");
  const { getToken, userId } = useAuth();

  useEffect(() => {
    (async () => {
      const accessToken = await getToken({ template: 'supabase' });
      console.log('🚀 ~ file: index.jsx:61 ~ token', accessToken);
      setToken(accessToken);

      const supabaseClient = await supabaseCtor(accessToken);

      const { data, error } = await supabaseClient
        .from('sleep_logs')
        .select('*')
        .eq('user_id', userId);

      console.log('🚀 ~ file: index.jsx:35 ~ loadItems ~ data', data);

      const items = transformData(data);
      setItems(items);

      await loadImage('user_2L3b8wg2IqNGTLGxaAWxyr5y2lS/2023-2-1_959118.png')
      console.log('🚀 ~ file: index.jsx:66 ~ useEffect ~ images', images);
      console.log('🚀 ~ file: index.jsx:67 ~ useEffect ~ image', image)
    })();
  }, []);

  async function loadImage(link) {
    console.log(link);

    const supabaseClient = await supabaseCtor(token);
    const { data, error } = await supabaseClient.storage
      .from('dream-images')
      .download(link);

    if (error) console.log('🚀 ~ file: index.jsx:79 ~ loadImage ~ error', error);

    const fileURL = FileSystem.cacheDirectory + link.split('/').join('__');
    console.log('🚀 ~ file: index.jsx:86 ~ loadImage ~ fileURL', fileURL);
    console.log('trying to set state');

    const reader = new FileReader();
    reader.onload = async () => {
      // console.log('🚀 ~ file: index.jsx:109 ~ loadImage ~ result', reader.result);
      const base64 = reader.result.split(',').pop(); // data:image/png;base64,

      await FileSystem.writeAsStringAsync(
        fileURL,
        base64,
        {
          encoding: FileSystem.EncodingType.Base64,
        }
      );

      setImage(fileURL);
      setImages({
        ...images,
        [link]: fileURL,
      });
      setLoadingImage(false);
      // setTimeout(() => {
      //   setLoadingImage(false);
      // }, 300);
    };
    reader.readAsDataURL(data);
  };

  async function showImage(link, prompt) {
    setPrompt(prompt);
    setShowModal(true);
    setLoadingImage(true);
    console.log('🚀 ~ file: index.jsx:129 ~ showImage ~ link', link);
    if (images[link]) {
      setImage(images[link]);
    } else {
      await loadImage(link);
    }
  }

  const renderEmptyDate = () => {
    return (
      <View>
        <Text>No logs for this day...</Text>
      </View>
    );
  };

  const rowHasChanged = (row1, row2) => {
    return row1.name !== row2.name;
  };

  let today = new Date().toISOString().substring(0, 10);

  return (
    <>
      <Modal
        visible={showModal}
        backdropStyle={styles.backdrop}
        style={styles.modal}
        onBackdropPress={() => setShowModal(false)}
      >
        <Card disabled={true}>
          <Text className='text-center text-lg text-violet-200'>{prompt}</Text>
          {loadingImage ?
            <View style={styles.loadingLayout}><Grid size={70} color='#d7eefa' /></View> :
            <Image style={{ width: 300, height: 300 }} source={{ uri: image }} />
          }
          <Layout style={styles.layout} level='1'>
            <Button title="Dismiss" onPress={() => setShowModal(false)} />
          </Layout>
        </Card>
      </Modal>
      <Agenda
        items={items}
        // loadItemsForMonth={loadItems}
        selected={today}
        renderItem={(item) => (
          <View style={[styles.item, { height: item.height }]}>
            <Text>{item.title}</Text>
            {item.bedtime_mood ? <Text>You were "{item.bedtimeMood}" when you went to bed.</Text> : null}
            <Text>Sleep Quality: {item.sleepQuality}</Text>
            <Text>Length of Sleep: {item.sleepLength} hr</Text>
            <Text>Notes: {item.notes}</Text>
            {item.imageLink ?
              <Button
                title='View Your Dream' // In Progress
                onPress={async () => showImage(item.imageLink, item.prompt)}
              /> :
              <Text>You didn't record a dream this night.</Text>
            }
          </View>
        )}

        renderEmptyDate={renderEmptyDate}
        renderEmptyData={renderEmptyDate}
        rowHasChanged={rowHasChanged}
      />
    </>
  );
}

export default DreamCalendar;

const styles = StyleSheet.create({
  modal: {
    width: '90%',
    height: '80%',
  },
  item: {
    backgroundColor: "white",
    flex: 1,
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
    marginTop: 17,
  },
  emptyDate: {
    height: 15,
    flex: 1,
    paddingTop: 30,
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
