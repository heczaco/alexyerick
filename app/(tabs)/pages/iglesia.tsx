import { Image } from 'expo-image';
import React from 'react';
import { Linking, Pressable, ScrollView, StyleSheet, Text, useWindowDimensions, View } from 'react-native';

export default function IglesiaScreen() {
  const { width, height } = useWindowDimensions();
  const isLandscape = width > height;

  const openMap = () => {
    // Replace with your actual church location
    Linking.openURL('https://maps.app.goo.gl/yUeSfkSRvZsPqRaE6');
  };

  return (
    <View style={styles.container}>
      {/* Background Images */}
      <Image
        source={require('@/assets/images/ceremonia/ceremonia_bg_left.png')}
        style={[styles.bgLeft, isLandscape && styles.bgLeftLandscape]}
        contentFit="contain"
      />
      <Image
        source={require('@/assets/images/ceremonia/ceremonia_bg_right.png')}
        style={[styles.bgRight, isLandscape && styles.bgRightLandscape]}
        contentFit="contain"
      />

      <ScrollView 
        style={styles.scrollView} 
        contentContainerStyle={[styles.content, isLandscape && styles.contentLandscape]}
      >
        {/* Address */}
        <Text style={[styles.message, isLandscape && styles.messageLandscape]}>
          Nos hace muy felices compartir contigo{'\n'}
          nuestra union en matrimonio y la celebración{'\n'}
          del comienzo de esta nueva etapa
        </Text>
      
        {/* Monogram */}
        <View style={[styles.monogramContainer, isLandscape && styles.monogramLandscape]}>
          <Image
            source={require('@/assets/images/monogram_simple_darkgreen.svg')}
            style={styles.monogram}
            contentFit="contain"
          />
        </View>

        {/* Title */}
        <Text style={[styles.title, isLandscape && styles.titleLandscape]}>
          ALEX RECIO & ERICK VILLA
        </Text>

        {/* Date */}
        <Text style={[styles.date, isLandscape && styles.dateLandscape]}>
          30 . MAYO . 26
        </Text>

        {/* Image2 */}
        <View style={[styles.monogramContainer, isLandscape && styles.monogramLandscape]}>
          <Image
            source={require('@/assets/images/ceremonia/image1_ceremonia.svg')}
            style={styles.monogram}
            contentFit="contain"
          />
        </View>

        {/* Time */}
        <Text style={[styles.time, isLandscape && styles.timeLandscape]}>
          6:00 PM
        </Text>

        {/* Church Name */}
        <Text style={[styles.churchName, isLandscape && styles.churchNameLandscape]}>
          LA NORIA DEL PALMAR
        </Text>

        {/* Map Button */}
        <Pressable style={styles.button} onPress={openMap}>
          <Text style={styles.buttonText}>UBICACIÓN</Text>
        </Pressable>
        {/* Address */}
        <Text style={[styles.address, isLandscape && styles.addressLandscape]}>
          Prol Pedrto Vallejo 2557, Gral I. Martinez,{'\n'}
          78360 San Luis Potosí, S.L.P.
        </Text>

      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F5F0',
  },
  message:{
    fontFamily: 'Raleway_300Light',
    fontSize: 16,
    color: '#2C5F2D',
    textAlign: 'center',
    marginBottom: 20,
  },
  messageLandscape:{
    fontSize: 14,
    marginBottom: 15,
  },
  bgLeft: {
    position: 'absolute',
    left: 0,
    top: 100,
    width: 200,
    height: 400,
  },
  bgLeftLandscape: {
    top: 80,
    width: 250,
    height: 500,
  },
  bgRight: {
    position: 'absolute',
    right: 0,
    top: 200,
    width: 200,
    height: 400,
  },
  bgRightLandscape: {
    top: 150,
    width: 250,
    height: 500,
  },
  scrollView: {
    flex: 1,
  },
  content: {
    alignItems: 'center',
    paddingVertical: 60,
    paddingHorizontal: 40,
  },
  contentLandscape: {
    paddingVertical: 80,
  },
  monogramContainer: {
    width: 120,
    height: 120,
    marginBottom: 30,
  },
  monogramLandscape: {
    width: 100,
    height: 100,
    marginBottom: 25,
  },
  monogram: {
    width: '100%',
    height: '100%',
  },
  title: {
    fontFamily: 'Raleway_300Light',
    fontSize: 20,
    letterSpacing: 6,
    color: '#2C5F2D',
    textAlign: 'center',
    marginBottom: 30,
  },
  titleLandscape: {
    fontSize: 18,
    marginBottom: 25,
  },
  date: {
    fontFamily: 'Raleway_300Light',
    fontSize: 32,
    letterSpacing: 4,
    color: '#2C5F2D',
    textAlign: 'center',
    marginBottom: 20,
  },
  dateLandscape: {
    fontSize: 28,
  },
  time: {
    fontFamily: 'Raleway_400Regular',
    fontSize: 24,
    color: '#2C5F2D',
    textAlign: 'center',
    marginBottom: 40,
  },
  timeLandscape: {
    fontSize: 20,
    marginBottom: 30,
  },
  churchName: {
    fontFamily: 'Raleway_600SemiBold',
    fontSize: 18,
    letterSpacing: 3,
    color: '#2C5F2D',
    textAlign: 'center',
    marginBottom: 20,
  },
  churchNameLandscape: {
    fontSize: 16,
  },
  address: {
    fontFamily: 'Raleway_300Light',
    fontSize: 14,
    color: '#5A5A5A',
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 40,
  },
  addressLandscape: {
    fontSize: 13,
    marginBottom: 30,
  },
  button: {
    backgroundColor: '#2C5F2D',
    paddingHorizontal: 40,
    paddingVertical: 12,
    borderRadius: 25,
    marginTop: 20,
  },
  buttonText: {
    fontFamily: 'Raleway_600SemiBold',
    fontSize: 12,
    letterSpacing: 2,
    color: '#FFFFFF',
  },
});
