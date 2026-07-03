
import React from "react";
import { Image, StyleSheet, View } from "react-native";

export default function HomeScreen() {

  return (
    <View style={styles.container}>
      <Image 
        style={styles.bannerImage}
        source={require('@/assets/images/saveTheDate.jpeg')} 
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: '0%',
    alignItems: 'center',
    backgroundColor: '#999',
  },
  bannerImage: {
    height: '100%',
    resizeMode: 'contain',
    marginTop: '0%',
  },
});