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
      resizeMode="contain"
      imageStyle={styles.backgroundImage}
    >
      <View style={[styles.content, isLandscape && styles.contentLandscape]}>
        {/* Monogram - only show in landscape mode at top left */}
        {isLandscape && (
          <View style={styles.monogramContainer}>
            <Image
              source={require('@/assets/images/recepcion/rececepcion_monogram.svg')}
              style={styles.monogram}
              contentFit="contain"
            />
          </View>
        )}

        {/* Text Content Container */}
        <View style={[styles.textContainer, isLandscape && styles.textContainerLandscape]}>
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

          {/* Time */}
          <Text style={[styles.time, isLandscape && styles.timeLandscape]}>
            7:30 P.M.
          </Text>

          {/* Venue Name */}
          <Text style={[styles.venueName, isLandscape && styles.venueNameLandscape]}>
            LA CASONA DE{'\n'}TLAQUEPAQUE
          </Text>

          {/* Additional Info */}
          <Text style={[styles.info, isLandscape && styles.infoLandscape]}>
            Después de la ceremonia religiosa,{'\n'}
            los invitamos a celebrar con nosotros{'\n'}
            en una cena y fiesta.
          </Text>

          {/* Map Button */}
          <Pressable style={[styles.button, isLandscape && styles.buttonLandscape]} onPress={openMap}>
            <Text style={[styles.buttonText, isLandscape && styles.buttonTextLandscape]}>VER MAPA</Text>
          </Pressable>
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
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 40,
    paddingVertical: 60,
  },
  contentLandscape: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingRight: 80,
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
    width: 80,
    height: 80,
    marginBottom: 40,
    alignSelf: 'center',
  },
  monogramImagePortrait: {
    width: '100%',
    height: '100%',
  },
  textContainer: {
    alignItems: 'center',
  },
  textContainerLandscape: {
    alignItems: 'flex-start',
    maxWidth: 400,
  },
  time: {
    fontFamily: 'Raleway_300Light',
    fontSize: 32,
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 30,
  },
  timeLandscape: {
    fontSize: 28,
    color: '#2C2C2C',
    textAlign: 'left',
    marginBottom: 20,
  },
  venueName: {
    fontFamily: 'Raleway_600SemiBold',
    fontSize: 22,
    letterSpacing: 3,
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 30,
    lineHeight: 32,
  },
  venueNameLandscape: {
    fontSize: 20,
    color: '#2C2C2C',
    textAlign: 'left',
    marginBottom: 25,
  },
  info: {
    fontFamily: 'Raleway_300Light',
    fontSize: 14,
    color: '#E8E8E8',
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 40,
  },
  infoLandscape: {
    fontSize: 13,
    color: '#4A4A4A',
    textAlign: 'left',
    marginBottom: 30,
  },
  button: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 40,
    paddingVertical: 12,
    borderRadius: 25,
    marginTop: 20,
  },
  buttonLandscape: {
    backgroundColor: '#2C2C2C',
    alignSelf: 'flex-start',
  },
  buttonText: {
    fontFamily: 'Raleway_600SemiBold',
    fontSize: 12,
    letterSpacing: 2,
    color: '#2C2C2C',
  },
  buttonTextLandscape: {
    color: '#FFFFFF',
  },
});
