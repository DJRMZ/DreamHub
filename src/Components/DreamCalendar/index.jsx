import { useState, useEffect } from "react";
import { useAuth } from "@clerk/clerk-expo";
import { StyleSheet, Text, View, Button, Image, Share } from "react-native";
import * as FileSystem from "expo-file-system";
import { Agenda } from "react-native-calendars";
import { Card, Modal, Layout, Icon, Button as KittenButton } from '@ui-kitten/components';
import { Grid } from 'react-native-animated-spinkit'
import { usePermissions, requestPermissionsAsync, getPermissionsAsync, createAssetAsync, createAlbumAsync, getAlbumAsync, addAssetsToAlbumAsync } from "expo-media-library";

import supabaseCtor from "../../lib/supabaseClient";

function transformData(data) {
  const result = {};
  data.forEach((item) => {
    const date = item.date;
    if (!result[date]) {
      result[date] = [];
    }
    result[date].push({
      id: item.id,
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

const TrashIcon = (props) => (
  <Icon {...props} style={{ width: 20, height: 20 }} name='trash-2-outline' />
);


const DreamCalendar = () => {
  const [showModal, setShowModal] = useState(false);

  const [items, setItems] = useState({});
  const [images, setImages] = useState({});
  const [image, setImage] = useState(null);
  const [prompt, setPrompt] = useState(null);

  const [loadingImage, setLoadingImage] = useState(false);
  const [savingImage, setSavingImage] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const [token, setToken] = useState('');
  const { getToken, userId } = useAuth();

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

  async function handleDelete(item) {
    setDeleting(true);
    console.log('🚀 ~ file: index.jsx:68 ~ handleDelete ~ item', item);
    const supabaseClient = await supabaseCtor(token);

    const { error: storageError } = await supabaseClient.storage
      .from('dream-images')
      .remove([item.imageLink]);
    if (storageError) console.log('🚀 ~ file: index.jsx:69 ~ fetchData ~ error', storageError);

    const { error: dbError } = await supabaseClient
      .from('sleep_logs')
      .delete()
      .eq('id', item.id);
    if (dbError) console.log('🚀 ~ file: index.jsx:69 ~ fetchData ~ error', dbError);

    console.log('DELETED');

    console.log(items[item.date]);

    setItems({
      ...items,
      [item.date]: items[item.date].filter((i) => i.id !== item.id),
    });
    setDeleting(false);
  };


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
      <View className='flex-1 flex justify-center items-center'>
        <Text className='text-xl font-semibold'>No logs for this day...</Text>
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
            <View className='flex flex-row justify-between items-center'>
              <Text className='text-xl text-white font-bold'>Stats</Text>
              <KittenButton
                appearance="ghost"
                accessoryLeft={TrashIcon}
                onPress={() => handleDelete(item)}
              />
            </View>
            {item.bedtime_mood ? <Text>You were "{item.bedtimeMood}" when you went to bed.</Text> : null}
            {/* <View className='flex flex-row justify-between'>
              <Text>Sleep Quality:</Text>
              <Text>{item.sleepQuality}</Text>
            </View> */}
            <Text className='text-lg text-blue-50'>Length of Sleep: {item.sleepLength}</Text>
            <Text className='text-lg text-blue-50'>Sleep Quality: {item.sleepQuality || 'not rated'}</Text>
            <Text className='mb-4 text-lg text-blue-50'>Notes: {item.notes || 'no notes'}</Text>
            {item.imageLink ?
              <Button
                title='View Your Dream' // In Progress
                onPress={async () => showImage(item.imageLink, item.prompt)}
              /> :
              <Text className='text-lg text-blue-50 text-center'>You didn't record a dream this night.</Text>
            }
          </View>
        )}
        minDate={'2023-01-01'}
        futureScrollRange={1}
        renderEmptyDate={renderEmptyDate}
        renderEmptyData={renderEmptyDate}
        rowHasChanged={rowHasChanged}
        theme={{
          todayBackgroundColor: '#53a3fd',
          agendaTodayColor: '#232f4f',
          backgroundColor: '#fff',
          calendarBackground: '#232f4f',
          selectedDayBackgroundColor: '#bed9f8',
          selectedDayTextColor: '#232f4f',
          todayTextColor: '#232f4f',
          selectedDotColor: '#232f4f',
          dotColor: '#232f4f',
          todayBackgroundColor: '#aac3dd',
          dayTextColor: '#fff',
          textDisabledColor: '#777',
        }}
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
    backgroundColor: '#394668',
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
