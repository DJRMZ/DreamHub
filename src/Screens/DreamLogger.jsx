import { useState } from "react";
import { ScrollView, Text } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

import SleepNotes from "../Components/SleepNotes";
import DreamGenerator from "../Components/AIDreamGen";


const DreamLogger = () => {
  const [hadDream, setHadDream] = useState(false);
  const [dream, setDream] = useState({});


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
        <SleepNotes hadDream={hadDream} setHadDream={setHadDream} />
        {hadDream ?
          <>


            <DreamGenerator />
          </> :
          null
        }
      </ScrollView>
    </>
  );
};

export default DreamLogger;
