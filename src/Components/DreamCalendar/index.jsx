import { useState, useEffect } from "react";
import { useAuth } from "@clerk/clerk-expo";
import { StyleSheet, Text, View, Button, Image, Share } from "react-native";
import * as FileSystem from "expo-file-system";
import { Agenda } from "react-native-calendars";
import { Card, Modal, Layout, Icon, Button as KittenButton, Divider } from '@ui-kitten/components';
import { Grid } from 'react-native-animated-spinkit'
import { usePermissions, requestPermissionsAsync, getPermissionsAsync, createAssetAsync, createAlbumAsync, getAlbumAsync, addAssetsToAlbumAsync } from "expo-media-library";
import moment from "moment";

import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

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
  <MaterialCommunityIcons name="tray-arrow-down" size={26} color="#d7eefa" />
);

const ShareIcon = (props) => (
  <MaterialCommunityIcons name="share-variant" size={25} color="#d7eefa" />
);

const TrashIcon = (props) => (
  <MaterialCommunityIcons name="trash-can-outline" size={20} color="#d7eefa" />
);

const DreamCalendar = ({ navigation }) => {
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
    const unsubscribe = navigation.addListener('focus', () => {
      fetchData();
    });

    return unsubscribe;
  }, [navigation]);

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
    console.log('🚀 ~ file: index.jsx:59 ~ token', accessToken);
    console.log('🚀 ~ file: index.jsx:149 ~ fetchData ~ userId', userId);

    setToken(accessToken);
    const supabaseClient = await supabaseCtor(accessToken);

    const { data, error } = await supabaseClient
      .from('sleep_logs')
      .select('*')
      .eq('user_id', userId);

    if (error) console.log('🚀 ~ file: index.jsx:69 ~ fetchData ~ error', error);
    console.log('🚀 ~ file: index.jsx:69 ~ fetchData ~ data', data);

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
      <View style={{ backgroundColor: '#d7eefa', padding: 90 }} className='flex-1 flex justify-center items-center'>
        <Text style={{ textAlign: 'center', fontSize: 18, color: '#181d37' }}>You have no sleep details for the selected day.</Text>
      </View>
    );
  };

  const rowHasChanged = (row1, row2) => {
    return row1.name !== row2.name;
  };

  // let today = new Date().toISOString().substring(0, 10);
  let time = moment();
  let today = time.format("YYYY-MM-DD");

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
          <Card style={styles.card} disabled={true}>
            <Text style={{ fontSize: 20, fontWeight: "bold", textAlign: 'center', marginBottom: 10, color: '#d7eefa' }}>Your Dream</Text>
            <Divider style={{ backgroundColor: '#232f4f' }} />
            {/* <View style={styles.iconLayout}>
              <MaterialCommunityIcons
                name="cloud-circle"
                color={'#d7eefa'}
                size={50}
              />
            </View> */}
            {loadingImage ? (
              <>
                <View style={styles.loadingLayout}>
                  <Grid
                    size={68}
                    color='#d7eefa'
                  />
                </View>
              </>
            ) : (
              <>
                <View className='mx-auto mb-4'>
                  <Image
                    className='h-72 w-72 rounded-lg shadow-lg shadow-black mt-4'
                    source={{ uri: image }}
                  />
                </View>
                <View className='mx-auto'>
                  <Card style={styles.dreamPrompt} >
                    <Text style={{ fontStyle: "italic", color: '#fff' }} category='s1'>"{prompt}"</Text>
                    {/* <Text style={styles.input} category='s1'>{dreamFeelings}</Text> */}
                  </Card>
                </View>
              </>
            )}
            <View style={styles.layout} level='1'>
              <KittenButton style={styles.buttonDismiss} onPress={() => setShowModal(false)}>
                {evaProps => <Text {...evaProps} style={{ fontSize: 18, fontWeight: "bold", color: '#d7eefa' }}>Dismiss</Text>}
              </KittenButton>
              {loadingImage ? null : (
                <>
                  <View style={styles.layout} level='1'>
                    <KittenButton appearance="ghost" accessoryLeft={SaveIcon} onPress={() => handleSave(image)} />
                    <KittenButton appearance="ghost" accessoryLeft={ShareIcon} onPress={() => handleShare()} />
                  </View>
                </>
              )}
            </View>
          </Card>
        </Modal>
      </View>
      

      <Agenda
        items={items}
        // loadItemsForMonth={loadItems}
        selected={today}
        minDate={'2022-01-01'}
        pastScrollRange={24}
        futureScrollRange={2}
        renderEmptyDate={renderEmptyDate}
        renderEmptyData={renderEmptyDate}
        rowHasChanged={rowHasChanged}
        theme={{
          todayBackgroundColor: '#53a3fd',
          agendaTodayColor: '#232f4f',
          backgroundColor: '#D7EEFA',
          'stylesheet.agenda.main': {
            reservations: {
            backgroundColor: '#D7EEFA',
            flex: 1,
            marginTop: 104,
            },
          },
          agendaKnobColor: '#D7EEFA',
          calendarBackground: '#232f4f',
          selectedDayBackgroundColor: '#D7EEFA',
          selectedDayTextColor: '#232f4f',
          todayTextColor: '#232f4f',
          selectedDotColor: '#232f4f',
          todayDotColor: '#232f4f',
          dotColor: '#D7EEFA',
          todayBackgroundColor: '#D7EEFA',
          dayTextColor: '#fff',
          textDisabledColor: '#777',
          monthTextColor: '#D7EEFA',
          yearTextColor: '#D7EEFA',
        }}
        renderItem={(item) => (
          <View style={[styles.item, { height: item.height }]}>
            <View className='flex flex-row justify-between items-center'>
              <Text style={{ color: '#d7eefa', fontSize: 20, fontWeight: "bold" }}>Sleep Details</Text>
              <KittenButton
                accessoryLeft={TrashIcon}
                onPress={() => handleDelete(item)}
                style={{ backgroundColor: '#181d37' }}
              />
            </View>
            {item.bedtime_mood ? <Text>You were "{item.bedtimeMood}" when you went to bed.</Text> : null}
            {/* <View className='flex flex-row justify-between'>
              <Text>Sleep Quality:</Text>
              <Text>{item.sleepQuality}</Text>
            </View> */}
            <Text style={{ color: '#d7eefa', fontSize: 18 }}>Sleep Duration: {item.sleepLength}</Text>
            <Text style={{ color: '#d7eefa', fontSize: 18 }}>Sleep Rating: {item.sleepQuality || 'Not Rated'}</Text>
            {/* <Text className='mb-4 text-lg text-blue-50'>Notes: {item.notes || '---'}</Text> */}
            {item.imageLink ?
              <KittenButton
                style={{ backgroundColor: '#181d37', marginTop: 18, marginBottom: 6 }}
                onPress={async () => showImage(item.imageLink, item.prompt)}
              >
                {evaProps => <Text {...evaProps} style={{ fontSize: 18, fontWeight: "bold", color: '#d7eefa' }}>ReCall Your Dream</Text>}
              </KittenButton>
              :
              <Text style={{ color: '#d7eefa', fontSize: 18, fontWeight: "italic", textAlign: 'center' }}>You didn't record a dream this night.</Text>
            }
          </View>
        )}
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
  layout: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    backgroundColor: '#181D37',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  dreamPrompt: {
    // flexDirection: 'column',
    // flexWrap: 'wrap',
    // justifyContent: 'space-evenly',
    // alignItems: 'center',
    width: '100%',
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
    maxHeight: 150,
    overflow: 'scroll',
    marginBottom: 4,
  },
  buttonDismiss: {
    marginTop: 16,
    marginBottom: 8,
    marginLeft: 4,
    width: 116,
    backgroundColor: '#232f4f',
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
    marginHorizontal: 75,
  },
});
