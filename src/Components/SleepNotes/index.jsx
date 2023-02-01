import React, { useState } from "react";
import { View, TextInput, StyleSheet } from "react-native";
//import { Slider, Radio } from "native-base";
import { Button, Card, Modal, Text, Input } from '@ui-kitten/components';
import { IndexPath, Select, SelectItem, Radio, Layout } from '@ui-kitten/components';


const SleepNotes = ({ notes, setNotes, hadDream, setHadDream }) => {
  // const [hours, setHours] = useState(0);
  const [visible, setVisible] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(new IndexPath(0));

  const data = [
    'Less than 4 hours',
    '4 - 6 hours',
    '6 - 8 hours',
    '8 - 10 hours',
    '10 - 14 hours',
    'More than 14 hours',
  ];

  const displayValue = data[selectedIndex.row];

  const renderOption = (title) => (
    <SelectItem key={title} title={title}/>
  );

  return (
    <>
      <View style={styles.container}>

        <Button onPress={() => setVisible(true)}>
          GENERATE DREAM INSTANCE
        </Button>

        <Modal
          visible={visible}
          backdropStyle={styles.backdrop}
          style={styles.modal}
          onBackdropPress={() => setVisible(false)}>
          <Card disabled={true}>
            <Text style={styles.text} category='h6'>How did you sleep?</Text>
            <Input
              style={styles.input}
              size='medium'
              placeholder='stressed, relaxed...?'
            />
            <Text style={styles.text} category='h6'>How long did you sleep?</Text>
            <Select
              style={styles.input}
              placeholder='Default'
              value={displayValue}
              selectedIndex={selectedIndex}
              onSelect={index => setSelectedIndex(index)}>
                {data.map(renderOption)}
            </Select>
            <Text style={styles.text} category='h6'>How did you feel when you woke up?</Text>
            <Input
              style={styles.input}
              size='medium'
              placeholder='well-rested, groggy, energetic... ?'
            />
            <Text style={styles.text} category='h6'>Did you have a dream?</Text>
            <Layout style={styles.layout} level='1'>
              <Radio
                style={styles.input}
                checked={hadDream}
                onChange={nextChecked => setHadDream(nextChecked)}>
                Yes
              </Radio>
              <Radio
                style={styles.input}
                checked={!hadDream}
                onChange={nextChecked => setHadDream(!nextChecked)}>
                No
              </Radio>
            </Layout>
            <Layout style={styles.layout} level='1'>
              <Button style={styles.buttonDismiss} onPress={() => setVisible(false)}>
                DISMISS
              </Button>
              <Button style={styles.buttonNext} onPress={() => setVisible(false)}>
                SUBMIT
              </Button>
            </Layout>
          </Card>
        </Modal>
      </View>
    </>
  );
};

export default SleepNotes;

const styles = StyleSheet.create({
  container: {
    minHeight: 192,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',

  },
  layout: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  modal: {
    width: '90%',
  },
  backdrop: {
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  input: {
    marginVertical: 12,
  },
  buttonDismiss: {
    marginVertical: 12,
    width: '40%',
    backgroundColor: '#232f4f',
  },
  buttonNext: {
    marginVertical: 12,
    width: '40%',
    backgroundColor: '#181d37',
  },
});
