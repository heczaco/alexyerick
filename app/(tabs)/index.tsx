import React from "react";
import { Image, StyleSheet, View } from "react-native";

export default function HomeScreen() {

  return (
    <View style={styles.container}>
      <iframe 
        height="75%" 
        src="https://www.youtube.com/embed/velNa1Or318?autoplay=1&mute=1&loop=1&playlist=velNa1Or318&controls=1&modestbranding=1&rel=0" 
        title="Save the Date Alex & Erick"
        allow="autoplay; encrypted-media; web-share"
        allowFullScreen
        frameBorder="0"
        style={{
          border: 'none',
          borderRadius: '10px',
          boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
          aspectRatio: '9/16',
        }}
      />
      <Image 
        style={styles.bannerImage}
        source={require('@/assets/images/banner_saveTheDate.png')} 
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: '3%',
    alignItems: 'center',
    backgroundColor: '#000',
  },
  bannerImage: {
    height: '20%',
    width: '90%',
    resizeMode: 'contain',
    marginTop: '3%',
  },
});