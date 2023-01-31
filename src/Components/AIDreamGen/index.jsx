import { useState, useEffect } from "react";
import { View, StyleSheet, TextInput, Image, Button as RNButton, Share } from "react-native";
import { Configuration, OpenAIApi } from "openai";
import { useAuth } from "@clerk/clerk-expo";
import { Button, Card, Modal, Text } from '@ui-kitten/components';

import { OPENAI_API_KEY } from "@env";
import supabaseClient from "../../lib/supabaseClient";

const configuration = new Configuration({
  apiKey: OPENAI_API_KEY,
});

const AIDreamGen = () => {
  const [dream, setDream] = useState('');
  const [dreamImg, setDreamImg] = useState('');
  const [loading, setLoading] = useState(false);
  const [supabase, setSupabase] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showModal2, setShowModal2] = useState(false);
  const [showModal3, setShowModal3] = useState(false);

  const [visible, setVisible] = React.useState(false);

  const openai = new OpenAIApi(configuration);

  useEffect(() => {
    const supabase = (async () => {
      const token = await getToken({ template: 'supabase' });
      const supabase = await supabaseClient(token);
      return supabase;
    });

    setSupabase(supabase);
  }, []);

  const { getToken } = useAuth();

  // console.log('OPENAI', openai);

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

      // console.log('RESPONSE BODY', response);
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
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <View style={styles.container}>

          <Button onPress={() => setVisible(true)}>
            TOGGLE MODAL
          </Button>

          <Modal
            visible={visible}
            backdropStyle={styles.backdrop}
            onBackdropPress={() => setVisible(false)}>
            <Card disabled={true}>
              <Text>Welcome to UI Kitten 😻</Text>
              <Button onPress={() => setVisible(false)}>
                DISMISS
              </Button>
            </Card>
          </Modal>
        </View>
      </View>
      {/* <Button onPress={() => setShowModal(true)}>Button</Button>
      <Modal isOpen={showModal} onClose={() => setShowModal(false)} size="lg">
        <Modal.Content maxWidth="350">
          <Modal.CloseButton />
          <Modal.Header>tell us about your dream</Modal.Header>
          <Modal.Body>
            <Text className='text-3xl font-bold'>tell us about your dream</Text>
            <Text className='text-xl font-medium'>what happened in your dream?</Text>
            <View className='m-4 w-5/6'>
              <TextInput
                className='bg-gray-50 h-8 p-2 border-2 border-gray-300'
                placeholder="your dream here"
                onChangeText={handleDreamChange}
              />
            </View>
            <Text className='text-xl font-medium'>how did your dream make you feel?</Text>
            <View className='m-4 w-5/6'>
              <TextInput
                className='bg-gray-50 h-8 p-2 border-2 border-gray-300'
                placeholder="your feelings here"
              // onChangeText={handleDreamChange}
              />
            </View>
          </Modal.Body>
          <Modal.Footer>
            <Button flex="1" onPress={() => {
              setShowModal(false);
              setShowModal2(true);
              handleSubmitDream();
            }}>
              Continue
            </Button>
          </Modal.Footer>
        </Modal.Content>
      </Modal>

      <Modal isOpen={showModal2} onClose={() => setShowModal2(false)} size="lg">
        <Modal.Content maxWidth="350">
          <Modal.CloseButton />
          <Modal.Header>Here is your dream</Modal.Header>
          <Modal.Body>
            {dreamImg && (
              <>
                <Text className='text-xl font-medium'>Here is your dream</Text>
                <View className='m-4 w-5/6'>
                  <Image
                    className='h-72 w-72'
                    source={{ uri: dreamImg }}
                  />
                </View>
              </>
            )}
          </Modal.Body>
          <Modal.Footer>
            <Button flex="1" onPress={() => {
              setShowModal2(false);
              setShowModal3(true);
            }}>
              Continue
            </Button>
          </Modal.Footer>
        </Modal.Content>
      </Modal>

      <Modal isOpen={showModal3} size="lg" onClose={() => setShowModal3(false)}>
        <Modal.Content maxWidth="350">
          <Modal.CloseButton />
          <Modal.Header>Payment Options</Modal.Header>
          <Modal.Body>
            <Text className='text-xl font-medium'>Done!!</Text>
          </Modal.Body>
          <Modal.Footer>
            <Button flex="1" onPress={() => {
              setShowModal3(false);
            }}>
              Checkout
            </Button>
          </Modal.Footer>
        </Modal.Content>
      </Modal> */}
    </>
  );
};

export default AIDreamGen;

const styles = StyleSheet.create({
  container: {
    minHeight: 192,
  },
  backdrop: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
});