import { LinearGradient } from "expo-linear-gradient";

import SleepNotes from "../Components/SleepNotes";
import DreamGenerator from "../Components/AIDreamGen";


const DreamLogger = () => {
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
      <SleepNotes />
      <DreamGenerator />
    </>
  );
};

export default DreamLogger;
