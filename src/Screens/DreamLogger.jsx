import { useState, useEffect } from "react";
import { ScrollView, Text, Button, View, Image } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useAuth } from "@clerk/clerk-expo";

import SleepNotes from "../Components/SleepNotes";
import DreamGenerator from "../Components/AIDreamGen";
import supabaseClient from "../lib/supabaseClient";


const DreamLogger = () => {
  const [supabase, setSupabase] = useState(null);
  const [hadDream, setHadDream] = useState(false);
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

  async function handleSubmit() {
    console.log(supabase);
    const { data, error } = await supabase
      .from('dreams')
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

  console.log('DREAM', dream);

  return (
    <>
      <LinearGradient
        colors={['#a07efe', '#3b5998']}
        style={{
          position: 'absolute',
          inset: 0,
          height: '100%',
          width: '100%',
        }}
      />
      <ScrollView>
        <SleepNotes
          hadDream={hadDream}
          setHadDream={setHadDream}
          notes={notes}
          setNotes={setNotes}
        />
        {hadDream ?
          <>
            <DreamGenerator dream={dream} setDream={setDream} />
            {dream.imageUrl ?
              <>
                <Text className='my-2 text-violet-100 text-3xl font-bold text-center'>Your Dream</Text>
                <View className='flex flex-row justify-between'>
                  <Image source={{ uri: dream.imageUrl }} style={{ width: 100, height: 100 }} />
                  <View className='flex-1 flex justify-center items-center'>
                    <Text className='text-lg'>{dream.prompt}</Text>
                  </View>
                </View>
              </> :
              null
            }
          </> :
          null
        }
        <Button title='submit' onPress={handleSubmit}>Save Log Entry</Button>
      </ScrollView>
    </>
  );
};

export default DreamLogger;
