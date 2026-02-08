import { Image } from 'expo-image';
import React from 'react';
import { ImageBackground, Linking, Pressable, StyleSheet, Text, useWindowDimensions, View } from 'react-native';

export default function RecepcionScreen() {
  const { width, height } = useWindowDimensions();
  const isLandscape = width > height;

  const openMap = () => {
    // Replace with your actual reception venue location
    Linking.openURL('https://maps.app.goo.gl/yUeSfkSRvZsPqRaE6');
  };

  return (
    <ImageBackground
      source={
        isLandscape
          ? require('@/assets/images/recepcion/recepcion_bg_landscape.png')
          : require('@/assets/images/recepcion/recepcion_bg_portrait.png')
      }
      style={styles.container}
      resizeMode="cover"
      imageStyle={[styles.backgroundImage, !isLandscape && styles.backgroundImagePortrait]}
    >
      <View style={[styles.content, isLandscape && styles.contentLandscape]}>
       

          {/* Monogram for portrait mode */}
          {!isLandscape && (
            <View style={styles.monogramPortrait}>
              <Image
                source={require('@/assets/images/recepcion/rececepcion_monogram.svg')}
                style={styles.monogramImagePortrait}
                contentFit="contain"
                />
            </View>
          )}

          {/* Text Content Container */}
        <View style={[styles.textContainer, isLandscape && styles.textContainerLandscape]}>
          {/* Time */}
          <Text style={[styles.time, isLandscape && styles.timeLandscape]}>
            7:30 P.M.
          </Text>

          {/* Venue Name */}
          <Text style={[styles.venueName, isLandscape && styles.venueNameLandscape]}>
            LA NORIA DEL PALMAR
          </Text>

          {/* Map Button */}
          <Pressable style={[styles.button, isLandscape && styles.buttonLandscape]} onPress={openMap}>
            <Text style={[styles.buttonText, isLandscape && styles.buttonTextLandscape]}>VER MAPA</Text>
          </Pressable>

          {/* Additional Info */}
          <Text style={[styles.info, isLandscape && styles.infoLandscape]}>
            Prol Pedro Vallejo 2557, Gral I. Martinez,{'\n'}
            78360 San Luis Potosí, S.L.P.
          </Text>

        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F5F0',
  },
  backgroundImage: {
    width: '100%',
    height: '100%',
  },
  backgroundImagePortrait: {
    height: '130%',
    transform: [{ translateY: '0%' }],
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingHorizontal: 40,
    paddingVertical: 60,
  },
  monogramContainer: {
    position: 'absolute',
    top: 40,
    left: 40,
    width: 60,
    height: 60,
  },
  monogram: {
    width: '100%',
    height: '100%',
  },
  monogramPortrait: {
    width: "25%",
    height: "15%",
    marginTop: "-10%",
    marginBottom: 10,
    alignSelf: 'center',
  },
  monogramImagePortrait: {
    width: '100%',
    height: '100%',
  },
  textContainer: {
    alignItems: 'center',
    backgroundColor: '#4A4C3488',
    padding: 20,
    borderRadius: 15,
    width: '100%',
  },
  time: {
    fontFamily: 'Raleway_300Light',
    fontSize: 13,
    letterSpacing: 4,
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 4,
    marginTop: 4,
  },
  venueName: {
    fontFamily: 'Raleway_500Medium',
    fontSize: 14,
    letterSpacing: 3,
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 4,
    marginTop: 4,
    lineHeight: 32,
  },
  button: {
    backgroundColor: '#4A4C34',
    paddingHorizontal: 40,
    paddingVertical: 12,
    borderRadius: 25,
    marginTop: 10,
    marginBottom: 10,
  },
  buttonText: {
    fontFamily: 'Raleway_500Medium',
    fontSize: 12,
    letterSpacing: 2,
    color: '#FFFFFF',
  },
  info: {
    fontFamily: 'Raleway_300Light_Italic',
    fontSize: 11,
    color: '#E8E8E8',
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 15,
  },
  // Landscape styles
  contentLandscape: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingRight: 80,
  },
  textContainerLandscape: {
    alignItems: 'flex-start',
    backgroundColor: "transparent",
    marginRight: 40,
    maxWidth: 400,
  },
  timeLandscape: {
    marginTop: "85%",
    fontSize: 24,
    color: '#FFFFFF',
    textAlign: 'center',
    alignSelf: 'center',
    marginBottom: 20,
  },
  venueNameLandscape: {
    fontSize: 20,
    fontFamily: 'Raleway_400Regular',
    color: '#FFFFFF',
    textAlign: 'center',
    alignSelf: 'center',
    marginBottom: 25,
  },
  infoLandscape: {
    fontSize: 13,
    color: '#FFFFFF',
    textAlign: 'center',
    alignSelf: 'center',
    marginTop: 30,
    marginBottom: 30,
  },
  buttonLandscape: {
    backgroundColor: '#4A4C34',
    textAlign: 'center',
    alignSelf: 'center',
  },
  buttonTextLandscape: {
    color: '#FFFFFF',
    textAlign: 'center',
    alignSelf: 'center',
  },
});
