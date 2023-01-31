import { useState, useEffect } from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Slider } from "native-base";

const SleepNotes = () => {
  const [hours, setHours] = useState(0);
  const [dreamImg, setDreamImg] = useState('');
  const [loading, setLoading] = useState(false);
  const [supabase, setSupabase] = useState(null);
  
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
      
      <View className='flex-1 flex flex-col items-center justify-center' >
        <Text className='text-3xl font-bold'>tell us about your sleep</Text>
        <Text className='text-xl font-medium'>how did you feel when you went to bed?</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            className='bg-gray-50'
            placeholder="your dream here"
            // onChangeText={handleDreamChange}
          />
        </View>
        <Text className='text-xl font-medium'>how long did you sleep?</Text>
        <Slider 
          accessibilityLabel="hello world"
          w="3/4" 
          maxW="300"
          defaultValue={8} 
          minValue={0.5} 
          maxValue={20} 
          step={0.5}
          onChange={v => setHours(v)}
        >
          <Slider.Track>
            <Slider.FilledTrack />
          </Slider.Track>
          <Slider.Thumb />
        </Slider>
        <Text className='text-xl font-medium'>{hours} hours</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            className='bg-gray-50'
            placeholder="your feelings here"
            // onChangeText={handleDreamChange}
          />
        </View>
        <Text className='text-xl font-medium'>how did you feel when you woke up?</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            className='bg-gray-50'
            placeholder="your dream here"
            // onChangeText={handleDreamChange}
          />
        </View>
      </View>
    </>
  );
};

export default SleepNotes;

const styles = StyleSheet.create({
  inputContainer: {
    width: "80%",
    margin: 10,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    padding: 10,
  },
  buttonContainer: {
    width: "80%",
    margin: 10,
  },
  imageContainer: {
    width: "80%",
    margin: 10,
  },
  image: {
    width: 300,
    height: 300,
  },
});
