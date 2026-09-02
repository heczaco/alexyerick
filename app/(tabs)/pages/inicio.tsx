import { Image } from 'expo-image';
import React, { useEffect, useState } from 'react';
import { ImageBackground, StyleSheet, Text, useWindowDimensions, View } from 'react-native';

interface InicioScreenProps {
  invitado1?: string;
  invitado2?: string;
}

interface WeddingCountdownProps {
  isLandscape: boolean;
}

function WeddingCountdown({ isLandscape }: WeddingCountdownProps) {
  const weddingDate = new Date('2027-05-07T18:00:00');
  const getTimeUntilWedding = () => Math.max(0, Math.floor((weddingDate.getTime() - Date.now()) / 1000));
  const [timeUntilWedding, setTimeUntilWedding] = useState(getTimeUntilWedding);

  useEffect(() => {
    const interval = setInterval(() => setTimeUntilWedding(getTimeUntilWedding()), 1000);
    return () => clearInterval(interval);
  }, []);

  const countdownUnits = [
    { value: Math.floor(timeUntilWedding / 86400), label: 'DÍAS' },
    { value: Math.floor((timeUntilWedding % 86400) / 3600), label: 'HORAS' },
    { value: Math.floor((timeUntilWedding % 3600) / 60), label: 'MINUTOS' },
    { value: timeUntilWedding % 60, label: 'SEGUNDOS' },
  ];

  return (
    <View style={[styles.countdown, isLandscape ? styles.landscapeCountdown : styles.portraitCountdown]}>
      <View style={styles.countdownUnits}>
        {countdownUnits.map((unit, index) => (
          <React.Fragment key={unit.label}>
            <View style={styles.countdownUnit}>
              <Text style={[styles.countdownValue, isLandscape ? styles.landscapeCountdownValue : styles.portraitCountdownValue]}>
                {String(unit.value).padStart(2, '0')}
              </Text>
              <Text style={[styles.countdownLabel, isLandscape ? styles.landscapeCountdownLabel : styles.portraitCountdownLabel]}>
                {unit.label}
              </Text>
            </View>
            {index < countdownUnits.length - 1 && <Text style={styles.countdownSeparator}>:</Text>}
          </React.Fragment>
        ))}
      </View>
    </View>
  );
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
      style={isLandscape ? styles.landscapeBackground : styles.portraitBackground}
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
  countdown: {
    alignItems: 'center',
  },
  countdownUnits: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  countdownUnit: {
    alignItems: 'center',
  },
  countdownValue: {
    fontFamily: 'CormorantGaramond_300Light',
    color: 'white',
    textAlign: 'center',
  },
  countdownSeparator: {
    fontFamily: 'CormorantGaramond_300Light',
    color: 'white',
  },
  countdownLabel: {
    fontFamily: 'CormorantGaramond_300Light',
    color: 'white',
    textAlign: 'center',
  },
  // Landscape styles
  landscapeBackground: {
    flex: 1,
    position: 'fixed',
    top: 0,
    left: 0,
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
  landscapeCountdown: {
    width: 410,
    marginTop: 32,
  },
  landscapeCountdownValue: {
    fontSize: 38,
    width: 88,
  },
  landscapeCountdownLabel: {
    fontSize: 13,
    letterSpacing: 1,
    width: 88,
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
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
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
  portraitCountdown: {
    width: '78%',
    marginTop: 28,
  },
  portraitCountdownValue: {
    fontSize: 32,
    width: 68,
  },
  portraitCountdownLabel: {
    fontSize: 10,
    letterSpacing: 0.5,
    width: 68,
  },
});
