import { Image } from 'expo-image';
import React from 'react';
import { ImageBackground, StyleSheet, Text, useWindowDimensions, View } from 'react-native';

interface InicioScreenProps {
  invitado1?: string;
  invitado2?: string;
}

export default function InicioScreen({ invitado1 = '', invitado2 = '' }: InicioScreenProps) {
  const { width, height } = useWindowDimensions();
  const isLandscape = width > height;
  
  // Wedding date: May 30, 2026
  const weddingDate = new Date('2026-05-30T13:00:00');
  const now = new Date();
  const timeUntilWedding = Math.max(0, Math.floor((weddingDate.getTime() - now.getTime()) / 1000));
  
  // Format guest names
  let guestNames = invitado1.toUpperCase();
  if (invitado1 !== '') {
    guestNames += invitado2 !== '' ? ` y ${invitado2.toUpperCase()},` : ',';
  }
  
  // Personalized message
  let message = '';
  if (invitado1 !== '') {
    if (invitado2 !== '') {
      message = 'Compartimos el inicio de nuestra historia juntos, y queremos sean parte de este momento especial.';
    } else {
      message = 'Compartimos el inicio de nuestra historia juntos, y queremos seas parte de este momento especial.';
    }
  }
  
  return (
    <ImageBackground
      source={isLandscape ? require('@/assets/images/inicio/bg.png') : require('@/assets/images/inicio/portrait_bg.png')}
      style={isLandscape ? styles.landscapeBackground : styles.portraitBackground}
      resizeMode="cover"
    >
      <View style={isLandscape ? styles.landscapeContainer : styles.portraitContainer}>
        {/* Centered Monogram Logo */}
        <View style={[styles.logoContainer, isLandscape ? styles.landscapeLogo : styles.portraitLogo]}>
          <Image
            source={require('@/assets/images/monogram_simple.svg')}
            style={styles.logo}
            contentFit="contain"
          />
        </View>
        
        {/* Names and Date */}
        <View style={isLandscape ? styles.landscapeTextContainer : styles.portraitTextContainer}>
          <Text style={[styles.names, isLandscape ? styles.landscapeNames : styles.portraitNames]}>
            Erick & Alex
          </Text>
          <Text style={[styles.date, isLandscape ? styles.landscapeDate : styles.portraitDate]}>
            30 MAYO 2026
          </Text>
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  logoContainer: {
    width: '60%',
    height: '40%',
    maxWidth: 600,
    maxHeight: 400,
  },
  logo: {
    width: '100%',
    height: '100%',
  },
  names: {
    fontFamily: 'Raleway_300Light',
    color: 'white',
    letterSpacing: 8,
    textTransform: 'uppercase',
    marginBottom: 8,
  },
  date: {
    fontFamily: 'Raleway_300Light',
    fontSize: 16,
    color: 'white',
    letterSpacing: 4,
  },
  // Landscape styles
  landscapeBackground: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  landscapeNames: {
    fontSize: 28,
    letterSpacing: 6,
    marginTop: "-11%",
    paddingTop: 0,
  },
  landscapeDate: {
    fontSize: 26,
  },
  landscapeLogo: {
    width: '16%',
    height: '30%',
    marginTop: '15%',
  },
  landscapeTextContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
    landscapeContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  // Portrait styles (if needed in the future)
  portraitContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    height: '100%',
  },
  portraitBackground: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  portraitLogo: {
    width: '28%',
    height: '10%',
    top: 0,
    marginTop: 0,
    paddingTop: "5%",
  },
  portraitTextContainer: {
    alignItems: 'center',
    marginTop: "40%",
  },
  portraitNames: {
    fontSize: 24,
    letterSpacing: 4,
  },
  portraitDate: {
    fontSize: 20,
  },
});
