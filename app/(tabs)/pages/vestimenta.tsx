import React from 'react';
import { ImageBackground, Linking, Pressable, StyleSheet, Text, useWindowDimensions, View } from 'react-native';

export default function VestimentaScreen() {
  const { width, height } = useWindowDimensions();
  const isLandscape = width > height;

  return (
    <ImageBackground
      source={
        isLandscape
          ? require('@/assets/images/vestimenta/dresscode_bg_landscape.png')
          : require('@/assets/images/vestimenta/dresscode_bg_portrait.png')
      }
      style={styles.container}
      resizeMode="cover"
      imageStyle={isLandscape ? styles.backgroundImageLandscape : styles.backgroundImage}
    >
      <View style={[styles.content, isLandscape && styles.contentLandscape]}>
   
        {/* Text Content Container */}
        <View style={[styles.textContainer, isLandscape && styles.textContainerLandscape]}>

          {/* Title */}
          <Text style={[styles.title, isLandscape && styles.titleLandscape]}>
            DRESSCODE
          </Text>

          {/* Dress Code Type */}
          <Text style={[styles.dressCode, isLandscape && styles.dressCodeLandscape]}>
            FORMAL
          </Text>
          {/* Inspiration Button */}
          {/* Map Button */}
            <Pressable style={[styles.button, isLandscape && styles.buttonLandscape]} onPress={() => Linking.openURL('https://pin.it/67Xl1fZHS')}>
                      <Text style={[styles.buttonText, isLandscape && styles.buttonTextLandscape]}>INSPIRACIÓN</Text>
          </Pressable>
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    alignSelf: 'stretch',
    backgroundColor: '#4A3F35',
    
  },
  backgroundImage: {
    width: '100%',
    height: '100%',
  },
  backgroundImageLandscape: {
    width: '100%',
    height: '100%',
    alignSelf: 'flex-start',
    resizeMode: 'cover',
    transform: [{ translateY:0 }],
  },
  
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingHorizontal: 40,
    paddingVertical: 60,
  },
  textContainer: {
    alignItems: 'center',
  },
  title: {
    fontFamily: 'Raleway_300Light',
    fontSize: 18,
    letterSpacing: 5,
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 10,
    marginTop: '-15%',
  },
  dressCode: {
    fontFamily: 'Raleway_300Light',
    fontSize: 14,
    letterSpacing: 4,
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#4A4C34',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 25,
    marginTop: 10,
    marginBottom: 10,
  },
  buttonText: {
    fontFamily: 'Raleway_600SemiBold',
    fontSize: 11,
    letterSpacing: 2,
    color: '#FFFFFF',
  },
  // Landscape styles
  contentLandscape: {
    flexDirection: 'row',
    justifyContent: 'flex-start',

    alignItems: 'flex-start',
    paddingTop: "8%",
    paddingLeft: "19%",
  },
  textContainerLandscape: {
    alignItems: 'center',
    maxWidth: 400,
  },
  titleLandscape: {
    fontSize: 26,
    fontFamily: 'Raleway_300Light',
    letterSpacing: 8,
    marginBottom: 25,
  },
  dressCodeLandscape: {
    fontSize: 20,
    fontFamily: 'Raleway_300Light',
    letterSpacing: 6,
    marginBottom: 30,
  },
  buttonLandscape: {
    backgroundColor: '#4A4C34',
    textAlign: 'center',
    alignSelf: 'center',
  },
  buttonTextLandscape: {
    color: '#FFFFFF',
    fontFamily: 'Raleway_600SemiBold',
    fontSize: 16,
    letterSpacing: 2,
    textAlign: 'center',
    alignSelf: 'center',
  },
});
