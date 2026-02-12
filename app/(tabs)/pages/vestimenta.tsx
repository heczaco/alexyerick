import { Image } from 'expo-image';
import React, { useRef } from 'react';
import { ImageBackground, Pressable, ScrollView, StyleSheet, Text, useWindowDimensions, View } from 'react-native';

export default function VestimentaScreen() {
  const { width, height } = useWindowDimensions();
  const isLandscape = width > height;
  const scrollViewRef = useRef<ScrollView>(null);
  const imageContainerRef = useRef<View>(null);

  const scrollToImage = () => {
    imageContainerRef.current?.measureLayout(
      scrollViewRef.current as any,
      (x, y) => {
        scrollViewRef.current?.scrollTo({ y, animated: true });
      },
      () => {}
    );
  };

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
      <ScrollView ref={scrollViewRef} style={styles.scrollView} contentContainerStyle={styles.content}>
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
              <Pressable style={[styles.button, isLandscape && styles.buttonLandscape]} onPress={scrollToImage}>
                        <Text style={[styles.buttonText, isLandscape && styles.buttonTextLandscape]}>INSPIRACIÓN</Text>
            </Pressable>
            {/* Hotels */}
          </View>
      </View>
      <View ref={imageContainerRef} style={[styles.pinterestContainer, !isLandscape && styles.pinterestContainerPortrait]}>
        <Image
          source={require('@/assets/images/vestimenta/dresscode.png')}
          style={styles.imagePinterest}
          contentFit="contain"
        />
      </View>
      </ScrollView>
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
  ///// Scroll View
  scrollView: {
    flex: 1,
    width: '100%',
    height: '100%',
    paddingBottom: 50,
  },
  pinterestContainer: {
    flexDirection: 'row',
    top: '100%',
    justifyContent: 'center',
    marginTop: 20,
    width: '50%',
    paddingBottom: 100,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 10,
    marginBottom: 50,
  },
  pinterestContainerPortrait: {
    width: '90%',
  },
  imagePinterest: {
    top: 50,
    width: '90%',
    aspectRatio: .136,
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
