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
      source={require('@/assets/images/inicio/inicio_bg.png')}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.container}>
        {/* Centered Monogram Logo */}
        <View style={[styles.logoContainer, isLandscape && styles.logoLandscape]}>
          <Image
            source={require('@/assets/images/monogram_simple.svg')}
            style={styles.logo}
            contentFit="contain"
          />
        </View>
        
        {/* Names and Date */}
        <View style={styles.textContainer}>
          <Text style={[styles.names, isLandscape && styles.namesLandscape]}>
            Alex & Erick
          </Text>
          <Text style={[styles.date, isLandscape && styles.dateLandscape]}>
            30 • 05 • 2026
          </Text>
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoContainer: {
    width: '60%',
    height: '40%',
    maxWidth: 600,
    maxHeight: 400,
  },
  logoLandscape: {
    width: '40%',
    height: '30%',
  },
  logo: {
    width: '100%',
    height: '100%',
  },
  textContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  names: {
    fontFamily: 'Raleway_300Light',
    fontSize: 32,
    color: 'white',
    letterSpacing: 8,
    textTransform: 'uppercase',
    marginBottom: 8,
  },
  namesLandscape: {
    fontSize: 28,
    letterSpacing: 6,
  },
  date: {
    fontFamily: 'Raleway_300Light',
    fontSize: 16,
    color: 'white',
    letterSpacing: 4,
  },
  dateLandscape: {
    fontSize: 14,
  },
});
