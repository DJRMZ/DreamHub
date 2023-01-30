import * as React from "react";
import { useState, useEffect } from "react";
import { View, Text, TextInput, Image, StyleSheet, Button } from "react-native";
import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
  // apiKey: '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',
});

const AIDreamGen = () => {
  const [dream, setDream] = useState('');
  const [dreamImg, setDreamImg] = useState('');
  const [loading, setLoading] = useState(false);
  
  const openai = new OpenAIApi(configuration);
  
  console.log('OPENAI', openai);

  const handleDreamChange = (input) => {
    setDream(input);
    console.log('DREAM', dream);
  };

  const handleSubmitDream = async () => {
    setLoading(true);
    let dreamObject = {
      prompt: dream, // dream from state
      n: 1, // number of images to generate
      size: "1024x1024",
    };
    console.log('DREAM OBJECT', dreamObject);
    try {
      const response = await openai.createImage(dreamObject);

      console.log('RESPONSE BODY', response);
      console.log('RESPONSE URL', response.data.data[0].url);
      let image_url = response.data.data[0].url;
      setDreamImg(image_url);
      console.log('IMAGE URL', image_url);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  return (
    <>
      <View style={styles.container}>
        <Text style={styles.title}>Dream Generator</Text>
        <Text style={styles.subtitle}>Enter your dream below</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Enter your dream here"
            onChangeText={handleDreamChange}
          />
        </View>
        <View style={styles.buttonContainer}>
          <Button
            title="Submit"
            onPress={handleSubmitDream}
            disabled={loading}
          />
        </View>
        {dreamImg && (
          <>
            <Text style={styles.subtitle}>Here is your dream</Text>
            <View style={styles.imageContainer}>
              <Image
                style={styles.image}
                source={{ uri: dreamImg }}
              />
            </View>
          </>
        )}

      </View>
    </>
  );
};

export default AIDreamGen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: 20,
    fontWeight: "bold",
  },
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