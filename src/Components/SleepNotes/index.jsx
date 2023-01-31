import { useState } from "react";
import { View, TextInput } from "react-native";
//import { Slider, Radio } from "native-base";
import { Button, Card, Modal, Text, Input } from "@ui-kitten/components";
import { StyleSheet } from "react-native";

const SleepNotes = ({ notes, setNotes, hadDream, setHadDream }) => {
  const [hours, setHours] = useState(0);
  const [visible, setVisible] = useState(false);

  return (
    <>
      <View style={styles.container}>
        <Button onPress={() => setVisible(true)}>GENERATE NEW DREAM</Button>

        <Modal
          visible={visible}
          backdropStyle={styles.backdrop}
          onBackdropPress={() => setVisible(false)}
        >
          <Card disabled={true}>
            <Text className="text-3xl font-bold">How did you sleep?</Text>

            <Button onPress={() => setVisible(false)}>DISMISS</Button>
          </Card>
        </Modal>
      </View>
    </>
    // <View className='flex-1 flex flex-col items-center justify-center ' >
    //   <Text className='text-xl font-medium'>how did you feel when you went to bed?</Text>
    //   <View className='m-4 w-5/6'>
    //     <TextInput
    //       className='bg-gray-50 h-8 p-2 border-2 border-gray-300'
    //       placeholder="stressed, relaxed...?"
    //     // onChangeText={handleDreamChange}
    //     />
    //   </View>
    //   <Text className='text-xl font-medium'>how long did you sleep?</Text>
    //   <Slider
    //     accessibilityLabel="hello world"
    //     w="3/4"
    //     maxW="300"
    //     defaultValue={8}
    //     minValue={0.5}
    //     maxValue={20}
    //     step={0.5}
    //     onChange={v => setHours(v)}
    //   >
    //     <Slider.Track>
    //       <Slider.FilledTrack />
    //     </Slider.Track>
    //     <Slider.Thumb />
    //   </Slider>
    //   <Text className='text-xl font-medium'>{hours} hours</Text>
    //   <Text className='text-xl font-medium'>how did you feel when you woke up?</Text>
    //   <View className='m-4 w-5/6'>
    //     <TextInput
    //       className='bg-gray-50 h-8 p-2 border-2 border-gray-300'
    //       placeholder="groggy, alert...?"
    //     // onChangeText={handleDreamChange}
    //     />
    //   </View>
    //   <Text className='text-xl font-medium'>can you remember your dreams?</Text>
    //   <View className='m-4 w-5/6'>
    //     <Radio.Group
    //       name="myRadioGroup"
    //       accessibilityLabel="favorite number"
    //       value={hadDream}
    //       onChange={nextValue => { setHadDream(nextValue) }}>
    //       <Radio value={true} my={1}>
    //         Yes
    //       </Radio>
    //       <Radio value={false} my={1}>
    //         No
    //       </Radio>
    //     </Radio.Group>
    //   </View>
    // </View>
  );
};

export default SleepNotes;

const styles = StyleSheet.create({
  container: {
    minHeight: 192,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  backdrop: {
    backgroundColor: "rgba(0, 0, 0, 0.7)",
  },
});
