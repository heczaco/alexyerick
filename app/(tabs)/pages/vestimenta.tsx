import { Image } from 'expo-image';
import React from 'react';
import { ImageBackground, StyleSheet, Text, useWindowDimensions, View } from 'react-native';

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
      resizeMode="contain"
      imageStyle={styles.backgroundImage}
    >
      <View style={[styles.content, isLandscape && styles.contentLandscape]}>
        {/* Monogram - only show in landscape mode at top left */}
        {isLandscape && (
          <View style={styles.monogramContainer}>
            <Image
              source={require('@/assets/images/monogram_white.svg')}
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
                source={require('@/assets/images/monogram_white.svg')}
                style={styles.monogramImagePortrait}
                contentFit="contain"
              />
            </View>
          )}

          {/* Title */}
          <Text style={[styles.title, isLandscape && styles.titleLandscape]}>
            CÓDIGO DE VESTIMENTA
          </Text>

          {/* Dress Code Type */}
          <Text style={[styles.dressCode, isLandscape && styles.dressCodeLandscape]}>
            FORMAL
          </Text>

          {/* Additional Info */}
          <Text style={[styles.info, isLandscape && styles.infoLandscape]}>
            Apreciamos tu presencia elegante.{'\n'}
            Por favor, viste de manera formal{'\n'}
            para acompañarnos en este día especial.
          </Text>

          {/* Color Suggestions */}
          <Text style={[styles.colorNote, isLandscape && styles.colorNoteLandscape]}>
            Sugerencia de colores: tonos tierra, beige, café
          </Text>
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#4A3F35',
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
  title: {
    fontFamily: 'Raleway_300Light',
    fontSize: 18,
    letterSpacing: 5,
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 30,
  },
  titleLandscape: {
    fontSize: 16,
    textAlign: 'left',
    marginBottom: 25,
  },
  dressCode: {
    fontFamily: 'Raleway_600SemiBold',
    fontSize: 28,
    letterSpacing: 4,
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 40,
  },
  dressCodeLandscape: {
    fontSize: 24,
    textAlign: 'left',
    marginBottom: 30,
  },
  info: {
    fontFamily: 'Raleway_300Light',
    fontSize: 14,
    color: '#E8E8E8',
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 30,
  },
  infoLandscape: {
    fontSize: 13,
    textAlign: 'left',
    marginBottom: 25,
  },
  colorNote: {
    fontFamily: 'Raleway_400Regular',
    fontSize: 12,
    fontStyle: 'italic',
    color: '#D4C4B0',
    textAlign: 'center',
  },
  colorNoteLandscape: {
    fontSize: 11,
    textAlign: 'left',
  },
});
