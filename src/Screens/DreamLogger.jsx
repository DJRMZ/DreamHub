import { LinearGradient } from "expo-linear-gradient";

import DreamGenerator from "../Components/AIDreamGen";

const DreamLogger = () => {
  return (
    <>
      <LinearGradient
        colors={["#333c59", "#535c75"]}
        style={{
          position: "absolute",
          inset: 0,
          height: "100%",
          width: "100%",
        }}
      />
      <DreamGenerator data-testid="dream-logger" />

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
