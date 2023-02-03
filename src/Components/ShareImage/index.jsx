import React from "react";
import { View, Image, TouchableOpacity } from "react-native";
import * as Sharing from "expo-sharing";

const ShareImage = ({ imageUri }) => {
  const handleShare = async () => {
    const isSharingAvailable = await Sharing.isAvailableAsync();
    if (!isSharingAvailable) {
      console.log("Sharing is not available on this device");
      return;
    }
    await Sharing.shareAsync(imageUri, {
      url: imageUri,
    });
  };

  return (
    <View>
      <Image source={{ uri: imageUri }} />
      <TouchableOpacity onPress={handleShare}>
        <Text>Share Image</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ShareImage;
