import { useState, useEffect } from "react";
import { useAuth } from "@clerk/clerk-expo";
import { StyleSheet, Text, View, Button, Image, Share } from "react-native";
import * as FileSystem from "expo-file-system";
import { Agenda } from "react-native-calendars";
import { Card, Modal, Layout, Icon, Button as KittenButton } from '@ui-kitten/components';
import { Grid } from 'react-native-animated-spinkit'
import { usePermissions, requestPermissionsAsync, getPermissionsAsync, saveToLibraryAsync, createAssetAsync, createAlbumAsync, getAlbumAsync, addAssetsToAlbumAsync } from "expo-media-library";

import supabaseCtor from "../../lib/supabaseClient";

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
      sleepLength: item.hours_sleep,
      bedtimeMood: item.bedtime_mood,
      notes: item.notes,
      prompt: item.dream_prompt,
      imageLink: item.dream_link,
    });
  });
  return result;
}

const SaveIcon = (props) => (
  <Icon {...props} name='save' />
);

const ShareIcon = (props) => (
  <Icon {...props} name='share' />
);

const DreamCalendar = () => {
  const [showModal, setShowModal] = useState(false);

  const [items, setItems] = useState({});
  const [images, setImages] = useState({});
  const [image, setImage] = useState(null);
  const [prompt, setPrompt] = useState(null);

  const [loadingImage, setLoadingImage] = useState(false);
  const [savingImage, setSavingImage] = useState(false);

  const [token, setToken] = useState('');
  const { getToken, userId } = useAuth();

  const [permission, askPermission] = usePermissions({ writeOnly: true });

  useEffect(() => {
    fetchData();
  }, []);

  function handleShare() {
    Share.share({
      message: `Check out this dream I had! ${prompt} ${image}`,
    });
  }

  async function handleSave(image) {
    const permissions = await getPermissionsAsync();
    console.log('🚀 ~ file: index.jsx:69 ~ handleSave ~ permissions', permissions);
    if (permissions.accessPrivileges === 'none') {
      console.log('attempting to request permissions');
      const response = await requestPermissionsAsync();
      console.log('🚀 ~ file: index.jsx:73 ~ handleSave ~ response', response);
      if (response.accessPrivileges === 'none') {
        console.log('ACCESS DENIED');
        return;
      }
    }

    setSavingImage(true);
    const album = await getAlbumAsync('DreamHub');
    console.log('🚀 ~ file: index.jsx:68 ~ handleSave ~ album', album);
    if (album) {
      await addAssetsToAlbumAsync(image, album);
      console.log('SUCCESS ADDING TO ALBUM!')
    } else {
      const asset = await createAssetAsync(image);
      await createAlbumAsync('DreamHub', asset);
      console.log('SUCCESS CREATING ALBUM!')
    }
    // await saveToLibraryAsync(image);
    console.log('COMPLETE');
  }

  //////////////////////
  // Image functions

  async function fetchData() {
    const accessToken = await getToken({ template: 'supabase' });
    // console.log('🚀 ~ file: index.jsx:59 ~ token', accessToken);
    setToken(accessToken);

    const supabaseClient = await supabaseCtor(accessToken);

    const { data, error } = await supabaseClient
      .from('sleep_logs')
      .select('*')
      .eq('user_id', userId);

    if (error) console.log('🚀 ~ file: index.jsx:69 ~ fetchData ~ error', error);

    const items = transformData(data);
    setItems(items);
  }

  async function loadImage(link) {
    console.log(link);

    const supabaseClient = await supabaseCtor(token);
    const { data, error } = await supabaseClient.storage
      .from('dream-images')
      .download(link);

    if (error) console.log('🚀 ~ file: index.jsx:87 ~ loadImage ~ error', error);

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

  //////////////////////
  // Agenda functions

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


  //////////////////////
  // Render

  return (
    <>
      <View className='absolute inset-0 flex justify-center items-center'>
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
              <Image style={{ width: 300, height: 300, objectFit: 'contain' }} source={{ uri: image }} />
            }
            <Layout style={styles.layout} level='1'>
              <Button title="Dismiss" onPress={() => setShowModal(false)} />
              <Layout style={styles.layout} level='1'>
                <KittenButton appearance="ghost" accessoryLeft={SaveIcon} onPress={() => handleSave(image)} />
                <KittenButton appearance="ghost" accessoryLeft={ShareIcon} onPress={() => handleShare()} />
              </Layout>
            </Layout>
          </Card>
        </Modal>
      </View>
      <Agenda
        items={items}
        // loadItemsForMonth={loadItems}
        selected={today}
        renderItem={(item) => (
          <View style={[styles.item, { height: item.height }]}>
            <Text className='text-xl font-bold'>Stats</Text>
            {item.bedtime_mood ? <Text>You were "{item.bedtimeMood}" when you went to bed.</Text> : null}
            {/* <View className='flex flex-row justify-between'>
              <Text>Sleep Quality:</Text>
              <Text>{item.sleepQuality}</Text>
            </View> */}
            <Text className='text-lg'>Length of Sleep: {item.sleepLength}</Text>
            <Text className='text-lg'>Sleep Quality: {item.sleepQuality || 'not rated'}</Text>
            <Text className='text-lg'>Notes: {item.notes || 'no notes'}</Text>
            {item.imageLink ?
              <Button
                title='View Your Dream' // In Progress
                onPress={async () => showImage(item.imageLink, item.prompt)}
              /> :
              <Text>You didn't record a dream this night.</Text>
            }
          </View>
        )}
        minDate={'2023-01-01'}
        futureScrollRange={1}
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
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '90%',
    height: '100%',
  },
  backdrop: {
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  item: {
    backgroundColor: '#e7e6ff',
    flex: 1,
    borderRadius: 5,
    padding: 16,
    marginRight: 10,
    marginTop: 17,
  },
  emptyDate: {
    height: 15,
    flex: 1,
    paddingTop: 30,
  },
  layout: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
