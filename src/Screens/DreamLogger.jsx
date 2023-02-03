import { LinearGradient } from "expo-linear-gradient";

import DreamGenerator from "../Components/AIDreamGen";

const DreamLogger = () => {
  return (
    <>
      <LinearGradient

        colors={['#232f4f','#232f4f']}

        style={{
          position: "absolute",
          inset: 0,
          height: "100%",
          width: "100%",
        }}
      />
      <DreamGenerator testID="dream-logger" />
    </>
  );
};

export default DreamLogger;
