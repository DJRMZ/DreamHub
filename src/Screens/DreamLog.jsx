import { useState, useEffect } from "react";
import { View, Text, TextInput, Image, StyleSheet, Button, Share } from "react-native";
import { Configuration, OpenAIApi } from "openai";
import { useAuth } from "@clerk/clerk-expo";
import { LinearGradient } from "expo-linear-gradient";
import { Slider } from "native-base";
import { OPENAI_API_KEY } from "@env";

import supabaseClient from "../lib/supabaseClient";
import SleepNotes from "../Components/SleepNotes";
import DreamGenerator from "../Components/AIDreamGen";

const configuration = new Configuration({
  apiKey: OPENAI_API_KEY,
});

const AIDreamGen = () => {
  const [dream, setDream] = useState("");
  const [dreamImg, setDreamImg] = useState("");
  const [loading, setLoading] = useState(false);
  const [supabase, setSupabase] = useState(null);

  const openai = new OpenAIApi(configuration);

  useEffect(() => {
    const supabase = async () => {
      const token = await getToken({ template: "supabase" });
      const supabase = await supabaseClient(token);
      return supabase;
    };

    setSupabase(supabase);
  }, []);

  const { getToken } = useAuth();

  // console.log('OPENAI', openai);

  const handleDreamChange = (input) => {
    setDream(input);
    console.log("DREAM", dream);
  };

  const handleSubmitDream = async () => {
    setLoading(true);
    let dreamObject = {
      prompt: dream, // dream from state
      n: 1, // number of images to generate
      size: "1024x1024",
    };
    console.log("DREAM OBJECT", dreamObject);
    try {
      const response = await openai.createImage(dreamObject);

      // console.log('RESPONSE BODY', response);
      console.log("RESPONSE URL", response.data.data[0].url);
      let image_url = response.data.data[0].url;
      setDreamImg(image_url);
      console.log("IMAGE URL", image_url);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  return (
    <>
      <LinearGradient
        colors={["#a07efe", "#3b5998"]}
        style={{
          position: "absolute",
          inset: 0,
          height: "100%",
          width: "100%",
        }}
      />
      <SleepNotes />
      <DreamGenerator />
    </>
  );
};

export default AIDreamGen;

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
