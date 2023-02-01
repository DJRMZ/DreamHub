import { useState, useEffect } from "react";
import { ScrollView, Text, Button, View, Image } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

// import SleepNotes from "../Components/SleepNotes";
import DreamGenerator from "../Components/AIDreamGen";

const DreamLogger = () => {
  return (
    <>
      <LinearGradient
        colors={['#181d37','#535c75']}
        style={{
          position: 'absolute',
          inset: 0,
          height: '100%',
          width: '100%',
        }}
      />
      <DreamGenerator />
      {/* <ScrollView>
        <SleepNotes
          hadDream={hadDream}
          setHadDream={setHadDream}
          notes={notes}
          setNotes={setNotes}
        />
        <DreamGenerator />
        <Button title='submit' onPress={handleSubmit}>Save Log Entry</Button>
      </ScrollView> */}
    </>
  );
};

export default DreamLogger;
