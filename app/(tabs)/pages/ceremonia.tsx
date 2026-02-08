import { Image } from 'expo-image';
import React from 'react';
import { Linking, Pressable, ScrollView, StyleSheet, Text, useWindowDimensions, View } from 'react-native';

export default function CeremoniaScreen() {
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
        contentPosition={isLandscape ? "center" : "right"}
        style={isLandscape ? styles.landscapeBgLeft : styles.portraitBgLeft}
        contentFit={isLandscape ? "contain" : "cover"}
      />
      <Image
        source={require('@/assets/images/ceremonia/ceremonia_bg_right.png')}
        style={isLandscape ? styles.landscapeBgRight : styles.portraitBgRight}
        contentFit={isLandscape ? "contain" : "cover"}
        contentPosition={isLandscape ? "center" : "left"}
      />

      <ScrollView 
        style={styles.scrollView} 
        contentContainerStyle={[styles.content, !isLandscape && styles.portraitContent]}
      >
        {/* Address */}
        <Text style={[styles.message, !isLandscape && styles.portraitMessage]}>
          Nos hace muy felices compartir contigo{'\n'}
          nuestra union en matrimonio y la celebración{'\n'}
          del comienzo de esta nueva etapa
        </Text>
      
        {/* Monogram */}
        <View style={[styles.monogramContainer, !isLandscape && styles.portraitMonogram]}>
          <Image
            source={require('@/assets/images/monogram_simple_darkgreen.svg')}
            style={styles.monogram}
            contentFit="contain"
          />
        </View>

        {/* Title */}
        <Text style={[styles.title, !isLandscape && styles.portraitTitle]}>
          ALEX RECIO & ERICK VILLA
        </Text>

        {/* Date */}
        <View style={[styles.dateContainer, !isLandscape && styles.portraitDateContainer]}>
          <Image
            source={require('@/assets/images/ceremonia/fecha.png')}
            style={styles.dateImage}
            contentFit="contain"
          />
        </View>

        {/* Image2 */}
        <View style={[styles.ceremonyMonogram, !isLandscape && styles.portraitCeremonyMonogram]}>
        <Image
            source={require('@/assets/images/ceremonia/image1_ceremonia.svg')}
            style={styles.monogram}
            contentFit="contain"
          />
        </View>

        {/* Time */}
        <Text style={[styles.time, !isLandscape && styles.portraitTime]}>
          6:00 PM
        </Text>

        {/* Church Name */}
        <Text style={[styles.churchName, !isLandscape && styles.portraitCeremonyPlace]}>
          LA NORIA DEL PALMAR
        </Text>

        {/* Map Button */}
        <Pressable style={[styles.button, !isLandscape && styles.portraitButton]} onPress={openMap}>
          <Text style={[styles.buttonText, !isLandscape && styles.portraitButtonText]}>UBICACIÓN</Text>
        </Pressable>
        {/* Address */}
        <Text style={[styles.address, !isLandscape && styles.portraitAdress]}>
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
    width: '100%',
    backgroundColor: '#F8F5F0',
    overflow: 'hidden',
  },
  scrollView: {
    flex: 1,
    width: '100%',
  },
  message:{
    fontFamily: 'Raleway_300Light',
    fontSize: 19,
    marginTop: 30,
    color: '#000000',
    textAlign: 'center',
    marginBottom: 20,
  },
  content: {
    alignItems: 'center',
    paddingVertical: 60,
    paddingHorizontal: 40,
  },
  monogramContainer: {
    width: 120,
    height: 120,
    marginBottom: 30,
  },
  monogram: {
    width: '100%',
    height: '100%',
  },
  title: {
    fontFamily: 'Raleway_400Regular',
    fontSize: 20,
    letterSpacing: 6,
    color: '#000000',
    textAlign: 'center',
    marginBottom: 30,
  },
  date: {
    fontFamily: 'Raleway_300Light',
    fontSize: 32,
    letterSpacing: 4,
    color: '#000000',
    textAlign: 'center',
    marginBottom: 20,
  },
  dateContainer: {
    width: '60%',
    height: 60,
    marginBottom: 20,
  },
  dateImage: {
    width: '100%',
    height: '100%',
  },
  ceremonyMonogram: {
    width: 90,
    height: 90,
    marginBottom: 20,
  },
  time: {
    fontFamily: 'Raleway_400Regular',
    fontSize: 38,
    color: '#000000',
    textAlign: 'center',
    marginTop: 20,
    marginBottom: 40,
  },
  churchName: {
    fontFamily: 'Raleway_400Regular',
    fontSize: 18,
    letterSpacing: 6,
    color: '#000000',
    textAlign: 'center',
    marginBottom: 20,
  },
  
  address: {
    fontFamily: 'Raleway_300Light_Italic',
    fontSize: 14,
    color: '#5A5A5A',
    textAlign: 'center',
    lineHeight: 22,
    letterSpacing: 3,
    marginTop: 30,
  },
  
  button: {
    backgroundColor: '#4A4C34',
    paddingHorizontal: 40,
    paddingVertical: 12,
    borderRadius: 25,
    marginTop: 20,
  },
  buttonText: {
    fontFamily: 'Raleway_400Regular',
    fontSize: 14,
    letterSpacing: 2,
    color: '#FFFFFF',
  },
  // Landscape styles
  landscapeBgLeft: {
    position: 'absolute',
    left: "-9%",
    padding: 0,
    width: "45%",
    height: "100%",
  },
  landscapeBgRight: {
    position: 'absolute',
    right: "-9%",
    padding: 0,
    width: "45%",
    height: "100%",
  },
  // Portrait styles
  portraitBgRight: {
    position: 'absolute',
    top: 0,
    right: 0,
    padding: 0,
    width: "40%",
    height: "100%",
  },
  portraitBgLeft: {
    position: 'absolute',
    left: "0%",
    top: 0,
    padding: 0,
    overflow: 'visible',
    width: "55%",
    height: "100%",
  },
  portraitContent: {
    
  },
  portraitMessage:{
    fontSize: 12,
  },
  portraitMonogram: {
    width: "25%",
    marginTop: 0,
    marginBottom: 10,
  },
  portraitTitle: {
    fontSize: 14,
    letterSpacing: 3,
    marginBottom: 10,
  },
  portraitDateContainer: {
    width: 250,
    marginBottom: 0,
  },
  portraitCeremonyMonogram: {
    width: "13%",
    marginTop: -5,
    marginBottom: 0,
  },
  portraitTime: {
    fontSize: 20,
    marginTop: 5,
  },
  portraitCeremonyPlace: {
    fontSize: 12,
    letterSpacing: 2,
  },
  portraitButton: {
    
    marginTop: 15,
  },
  portraitButtonText: {
    fontSize: 12,
    letterSpacing: 0,
  },
   portraitAdress: {
    fontSize: 10,
    lineHeight: 16,
    letterSpacing: 2,
     marginTop: 25,
   },
  
});
