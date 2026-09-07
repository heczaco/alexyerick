import { generalStyles } from '@/constants/GeneralStyles';
import { useGuest } from '@/contexts/GuestContext';
import { Image } from 'expo-image';
import React from 'react';
import { ImageBackground, Linking, Pressable, ScrollView, StyleSheet, Text, useWindowDimensions, View } from 'react-native';

export default function CeremoniaScreen() {
  const { width, height } = useWindowDimensions();
  const isLandscape = width > height;
  const { guestData } = useGuest();
  const { updateGuestStatus } = useGuest();
  if (guestData.name_1 !== "" && guestData.invitation_status === "abierta"){
    updateGuestStatus("leida");
  }
  const openMap = () => {
    // Replace with your actual church location
    Linking.openURL('https://maps.app.goo.gl/bebbv8oZ8KnNFLAa7');
  };

  return (
    <View style={styles.container}>
      {/* Background Images */}
      <ImageBackground
        source={isLandscape ? require('@/assets/images/ceremonia/ceremonia_bg.png') : 
          require('@/assets/images/ceremonia/ceremonia_bg_portrait.png')}
        style={isLandscape ? generalStyles.landscapeBackground_100 : generalStyles.portraitBackground}
        resizeMode="cover"
      />
      <ScrollView 
        style={styles.scrollView} 
        contentContainerStyle={[styles.content, !isLandscape && styles.portraitContent]}
          showsVerticalScrollIndicator={false}>
        {/* Message */}
        <Text style={[styles.message, !isLandscape && styles.portraitMessage]}>
          Nos hace muy felices compartir contigo{'\n'}
          nuestra union en matrimonio y la celebración{'\n'}
          del comienzo de esta nueva etapa
        </Text>
      
        {/* Monogram */}
        <View style={[styles.monogramContainer, !isLandscape && styles.portraitMonogram]}>
          <Image
            source={require('@/assets/images/monogram_white.svg')}
            style={styles.monogram}
            contentFit="contain"
          />
        </View>

        {/* Title */}
        <Text style={[styles.title, !isLandscape && styles.portraitTitle]}>
          GISELA E ISRAEL
        </Text>

        <Text style={[styles.place, !isLandscape && styles.portraitPlace]}>
          Barra de Navidad, Jal. México
        </Text>

        {/* Date */}
        
        <Text style={[styles.date, !isLandscape && styles.portraitTime]}>
          07.05.27
        </Text>
        <Text style={[styles.place, !isLandscape && styles.portraitPlace]}>
          Grand Isla Navidad Golf & SPA Resort With Marina 
        </Text>

        {/* Church Name */}
        <Text style={[styles.churchName, !isLandscape && styles.portraitCeremonyPlace]}>
          Espigón del Mesón
        </Text>

        {/* Time */}
        <Text style={[styles.time, !isLandscape && styles.portraitTime]}>
          6:00 PM
        </Text>
        {/* Map Button */}
        <Pressable style={[styles.button, !isLandscape && styles.portraitButton]} onPress={openMap}>
          <Text style={[styles.buttonText, !isLandscape && styles.portraitButtonText]}>UBICACIÓN</Text>
        </Pressable>
      
        {/* Address */}
        <Text style={[styles.address, !isLandscape && styles.portraitAddress]}>
          Circuito de los Marinos s/n, Fracc Isla de Navidad, 28838 Col.
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
  content: {
    alignItems: 'center',
    paddingVertical: 60,
    paddingHorizontal: 40,
  },

  message:{
    fontFamily: 'CormorantGaramond_300Light',
    fontSize: 19,
    marginTop: 5,
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 10,
  },
  monogramContainer: {
    width: "30%",
    height: "30%",
    marginTop: 50,
    marginBottom: 50,
  },
  monogram: {
    width: '100%',
    height: '100%',
  },
  title: {
    fontFamily: 'CormorantGaramond_500Medium',
    fontSize: 32,
    letterSpacing: 10,
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 5,
  },
  place: {
    fontFamily: 'CormorantGaramond_300Light',
    fontSize: 20,
    letterSpacing: 2,
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 5,
  },
  date: {
    fontFamily: 'CormorantGaramond_400Regular',
    fontSize: 36,
    letterSpacing: 4,
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 20,
  },
  time: {
    fontFamily: 'CormorantGaramond_300Light',
    fontSize: 38,
    color: '#FFFFFF',
    textAlign: 'center',
    marginTop: 5,
    marginBottom: 5,
  },
  churchName: {
    fontFamily: 'CormorantGaramond_300Light',
    fontSize: 18,
    letterSpacing: 6,
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 20,
  },
  
  address: {
    fontFamily: 'CormorantGaramond_300Light_Italic',
    fontSize: 14,
    color: '#FFFFFF',
    textAlign: 'center',
    lineHeight: 22,
    letterSpacing: 3,
    marginTop: 15,
    paddingBottom: 55,
  },
  
  button: {
    backgroundColor: '#E0C58E',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 25,
    marginTop: 20,
  },
  buttonText: {
    fontFamily: 'CormorantGaramond_600Bold',
    fontSize: 14,
    letterSpacing: 2,
    color: '#FFFFFF',
  },
  // Portrait styles
  portraitContent: {
  },
  portraitMessage:{
    fontSize: 14,
    letterSpacing: 2,
  },

  portraitMonogram: {
    width: "25%",
    height: "25%",
    marginTop: 35,
    marginBottom: 35,
  },

  portraitTitle: {
    fontSize: 25,
    letterSpacing: 3,
    marginBottom: 5,
  },

  portraitPlace: {
    fontSize: 16,
    letterSpacing: 2,
    marginBottom: 5,
  },

  portraitTime: {
    fontSize: 30,
    marginTop: 5,
  },
  portraitCeremonyPlace: {
    fontSize: 14,
    letterSpacing: 2,
  },

  portraitButton: {  
    marginTop: 15,
    paddingVertical: 6,
  },
  portraitButtonText: {
    fontSize: 12,
    letterSpacing: 0,
  },
   portraitAddress: {
    fontSize: 12,
    maxWidth: "50%",
    lineHeight: 22,
    letterSpacing: 2,
     marginTop: 25,
   },
  
});
