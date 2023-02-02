import * as React from "react";
import { useState, useEffect } from "react";
import { useAuth } from "@clerk/clerk-expo";
import { StyleSheet, Text, View, Button, Image, FlatList } from "react-native";
import * as FileSystem from "expo-file-system";
import {
  Agenda,
  DateData,
  AgendaEntry,
  AgendaSchedule,
} from "react-native-calendars";

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
  const [token, setToken] = useState("");

  const [items, setItems] = useState({});
  const [images, setImages] = useState({});

  const { getToken, userId } = useAuth();

  useEffect(() => {
    (async () => {
      const token = await getToken({ template: 'supabase' });
      console.log('🚀 ~ file: index.jsx:61 ~ token', token);
      setToken(token);
    })();

  }, []);

  let today = new Date().toISOString().substring(0, 10);
  // console.log(today);

  const loadItems = async (day) => {
    const supabaseClient = await supabaseCtor(token);
    // console.log('🚀 ~ file: index.jsx:144 ~ handleSubmitLog ~ supabaseClient', supabaseClient, '\n');

    // console.log('USER ID', userId);

    const { data, error } = await supabaseClient
      .from('sleep_logs')
      .select('*')
      .eq('user_id', userId);

    console.log('🚀 ~ file: index.jsx:35 ~ loadItems ~ data', data);

    const items = transformData(data);
    setItems(items);
  };

  const loadImage = async (link) => {
    const supabaseClient = await supabaseCtor(token);
    // console.log('🚀 ~ file: index.jsx:144 ~ handleSubmitLog ~ supabaseClient', supabaseClient, '\n');

    console.log(link);

    const { data, error } = await supabaseClient.storage
      .from('dream-images')
      .download(link);

    console.log('🚀 ~ file: index.jsx:78 ~ loadImage ~ data', data);
    console.log('🚀 ~ file: index.jsx:79 ~ loadImage ~ error', error);

    const fr = new FileReader();
    fr.readAsDataURL(data);
    fr.onload = () => {
      setImages({
        ...images,
        [link]: fr.result,
      });
      console.log('🦖🦖🦖🦖🦖🦖🦖🦖 success!!! 🦖🦖🦖🦖🦖🦖🦖🦖');
      // console.log(images);
    };
  };

  const renderItem = (item) => {
    return (
      <View style={[styles.item, { height: item.height }]}>
        <Text>{item.title}</Text>
        {item.bedtime_mood ? <Text>You were "{item.bedtimeMood}" when you went to bed.</Text> : null}
        <Text>Sleep Quality: {item.sleepQuality}</Text>
        <Text>Length of Sleep: {item.sleepLength} hr</Text>
        <Text>Notes: {item.notes}</Text>
        <Text>Dream Prompt: {item.prompt}</Text>
        <Text>Dream Image: {item.imageLink}</Text>
        <Button title='View Image (BROKEN)' onPress={() => loadImage(item.imageLink)} />
        {images[item.imageLink] ? <Image source={{ uri: images[item.imageLink] }} /> : <Text>no image...</Text>}
      </View>
    );
  };

  const renderEmptyDate = () => {
    return (
      <View style={styles.emptyDate}>
        <Text>No logs for this day...</Text>
      </View>
    );
  };

  const rowHasChanged = (row1, row2) => {
    return row1.name !== row2.name;
  };

  const timeToString = (time) => {
    const date = new Date(time);
    return date.toISOString().split("T")[0];
  };

  return (
    <>
      {/* <FlatList
        data={Object.keys(images)}
        renderItem={({ item }) => <Image source={{ uri: images[item] }} />}
      /> */}
      <Agenda
        items={items}
        loadItemsForMonth={loadItems}
        selected={today}
        renderItem={(item) => (
          <View style={[styles.item, { height: item.height }]}>
            <Text>{item.title}</Text>
            {item.bedtime_mood ? <Text>You were "{item.bedtimeMood}" when you went to bed.</Text> : null}
            <Text>Sleep Quality: {item.sleepQuality}</Text>
            <Text>Length of Sleep: {item.sleepLength} hr</Text>
            <Text>Notes: {item.notes}</Text>
            <Text>Dream Prompt: {item.prompt}</Text>
            <Text>Dream Image: {item.imageLink}</Text>
            <Button title='View Image (BROKEN)' onPress={() => loadImage(item.imageLink)} />
            {images[item.imageLink] ? <Image source={{ uri: images[item.imageLink] }} /> : <Text>no image...</Text>}
          </View>
        )}
        renderEmptyDate={renderEmptyDate}
        rowHasChanged={rowHasChanged}
      />
    </>
  );
}

export default DreamCalendar;

const styles = StyleSheet.create({
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
});
