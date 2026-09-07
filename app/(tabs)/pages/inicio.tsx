import { WeddingCountdown } from '@/components/WeddingCountdown';
import { generalStyles } from '@/constants/GeneralStyles';
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
      style={isLandscape ? generalStyles.landscapeBackground_100 : generalStyles.portraitBackground}
      resizeMode="cover"
    >
      <View style={isLandscape ? styles.landscapeContainer : styles.portraitContainer}>
        {/* Centered Monogram Logo */}
        <View style={[styles.logoContainer, isLandscape ? styles.landscapeLogo : styles.portraitLogo]}>
          <Image
            source={require('@/assets/images/monogram_white.svg')}
            style={styles.logo}
            contentFit="contain"
          />
        </View>
        
        {/* Names and Date */}
        <View style={isLandscape ? styles.landscapeTextContainer : styles.portraitTextContainer}>
          <Text style={[styles.names, isLandscape ? styles.landscapeNames : styles.portraitNames]}>
            GISELA E ISRAEL
          </Text>
          <Text style={[styles.date, isLandscape ? styles.landscapeDate : styles.portraitDate]}>
            Barra de Navidad, Jal. México
          </Text>
          <Text style={[styles.date, isLandscape ? styles.landscapeDate : styles.portraitDate]}>
            07.05.27
          </Text>
          <WeddingCountdown isLandscape={isLandscape} />
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
    fontFamily: 'CormorantGaramond_300Light',
    color: 'white',
    letterSpacing: 8,
    textTransform: 'uppercase',
    marginBottom: 8,
  },
  date: {
    fontFamily: 'CormorantGaramond_300Light',
    fontSize: 16,
    color: 'white',
    letterSpacing: 4,
  },
  landscapeNames: {
    fontSize: 28,
    letterSpacing: 6,
    marginTop: "5%",
    paddingTop: 0,
  },
  landscapeDate: {
    fontSize: 22,
  },
  landscapeLogo: {
    height: '22%',
    marginTop: '-12%',
  },
  landscapeTextContainer: {
    alignItems: 'center',
    
  },
    landscapeContainer: {
    flex: 1,
    position: 'absolute',
    top: 0,
    width: '30%',
    height: '100%',
    alignItems: 'center',
    left: '3%',
    justifyContent: 'center',
  },
  // Portrait styles (if needed in the future)
  portraitContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
  },
  portraitLogo: {
    width: '28%',
    height: '25%',
    top: 0,
    marginTop: "-65%",
    marginBottom: "5%",
  },
  portraitNames: {
    fontSize: 24,
    letterSpacing: 4,
  },
  portraitTextContainer: {
    alignItems: 'center',
  },
  portraitDate: {
    fontSize: 20,
  },
});
