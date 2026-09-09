import { RsvpModals } from '@/components/RsvpModals';
import { Config } from '@/constants/Config';
import { generalStyles } from '@/constants/GeneralStyles';
import { useGuest } from '@/contexts/GuestContext';
import { Image } from 'expo-image';
import { useGlobalSearchParams } from 'expo-router';
import React, { useState } from 'react';
import { ImageBackground, Linking, Pressable, StyleSheet, Text, useWindowDimensions, View } from 'react-native';

export default function RsvpScreen() {
  const { guestData, setGuestData } = useGuest();
  const params = useGlobalSearchParams();
  const [modalVisible, setModalVisible] = useState(false);
  const [confirmedModalVisible, setConfirmedModalVisible] = useState(false);
  const [selectedAttendees, setSelectedAttendees] = useState(Number(guestData.available_invitations) || 0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { width, height } = useWindowDimensions();
    const isLandscape = width > height;
  
  // Helper function to determine which names to display
  const getDisplayNames = () => {
    const isCompleteName = (name: string) => name && name.trim().includes(' ');
    if (guestData.nickname_1 === "" || guestData.nickname_2 === "" ) {
      return { name1: guestData.name_1, name2: guestData.name_2 };
    }
    else if (guestData.name_2 && isCompleteName(guestData.name_1) && isCompleteName(guestData.name_2)) {
      // Both names are complete (have first and last name)
      return { name1: guestData.name_1, name2: guestData.name_2 };
    } else if (guestData.name_2 && (!isCompleteName(guestData.name_1) || !isCompleteName(guestData.name_2))) {
      // Either name is incomplete, use nicknames
      return { name1: guestData.nickname_1, name2: guestData.nickname_2 };
    } else {
      // Only name_1 is available
      return { name1: guestData.name_1, name2: null };
    }
  };

  const displayNames = getDisplayNames();
  
  const openRSVP = () => {
    if (!guestData.confirmation_field || guestData.confirmation_field === '') {
      setModalVisible(true);
    } else {
      setConfirmedModalVisible(true);
    }
  };

  const handleConfirm = async () => {
    if (isSubmitting) return; // Prevent multiple submissions
    
    setIsSubmitting(true);
    try {
      const id = params.id as string;
      const url = `https://googlesheets-invitations-api.onrender.com/guests/${Config.INVITATION_ID}`;
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          uuid: id,
          confirmed_guests: selectedAttendees.toString(),
        }),
      });

      if (!response.ok) {
        throw new Error(`Failed to confirm attendance: ${response.status}`);
      }

      // Update local guest data
      setGuestData({ confirmation_field: selectedAttendees.toString() });
      
      setModalVisible(false);
      alert('Confirmación enviada exitosamente');
    } catch (err) {
      console.error('Error confirming attendance:', err);
      alert('Error al enviar la confirmación. Inténtalo de nuevo.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const openWhatsApp = () => {
    const phoneNumber = '+4447654000'; // Replace with wedding planner's number
    const waveEmoji = String.fromCodePoint(0x1F44B);
    const message = `Hola tengo problemas con mi confirmación de la boda de Alex y Erick ${waveEmoji}`;
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    Linking.openURL(url);
  };

  return (
    <ImageBackground
          source={require('@/assets/images/rsvp/bg.png')}
          style={isLandscape ? generalStyles.landscapeBackground_100 : generalStyles.portraitBackground}
          resizeMode="cover"
        >
      <View style={[styles.container, !isLandscape && styles.portraitContainer]}>
        {/* Centered Monogram Logo */}
        <View style={[styles.logoContainer, !isLandscape && styles.logoPortrait]}>
          <Image
            source={require('@/assets/images/monogram_white.svg')}
            style={generalStyles.imageStd}
            contentFit="contain"
          />
        </View>
        
        {/* Names and Date */}
        <View style={isLandscape ? styles.landscapeTextContainer : styles.portraitTextContainer}>
          <Text style={[styles.names, !isLandscape && styles.portraitNames]}>
            GISELA E ISRAEL
          </Text>
          <Text style={[styles.place, !isLandscape && styles.portraitPlace]}>
            Barra de Navidad, Jal. México
          </Text>
          <Text style={[styles.date, !isLandscape && styles.portraitDate]}>
            07.05.27
          </Text>
          <Text style={[styles.text, !isLandscape && styles.portraitText]}>
            Confirma tu asistencia
          </Text>
        
          {/* CONFIRM Button */}
          <Pressable style={[styles.button, !isLandscape && styles.buttonPortrait]} onPress={openRSVP}>
            <Text style={[styles.buttonText, !isLandscape && styles.buttonTextPortrait]}>Confirma</Text>
          </Pressable>
        </View>
      </View>

      <RsvpModals
        modalVisible={modalVisible}
        confirmedModalVisible={confirmedModalVisible}
        onCloseConfirmation={() => setModalVisible(false)}
        onCloseConfirmed={() => setConfirmedModalVisible(false)}
        displayNames={displayNames}
        availableInvitations={guestData.available_invitations}
        selectedAttendees={selectedAttendees}
        onSelectedAttendeesChange={setSelectedAttendees}
        isSubmitting={isSubmitting}
        onConfirm={handleConfirm}
        onContactPlanner={openWhatsApp}
        />
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  buttonPortrait: {
    backgroundColor: '#E0C58E',
    textAlign: 'center',
    alignSelf: 'center',
  },
  container: {
    flex: 1,
    left: "30%",
    top: "20%",
    width: '40%',
    height: '40%',
    maxHeight: "60%",
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#252836AA',
    borderRadius: 20,
  },
  logoContainer: {
    width: '30%',
    aspectRatio: 1,
    maxWidth: 600,
    maxHeight: 400,
  },
  names: {
    fontFamily: 'CormorantGaramond_600SemiBold',
    color: 'white',
    letterSpacing: 8,
    fontSize: 32,
    marginTop: 35,
    textTransform: 'uppercase',
  },
  date: {
    fontFamily: 'CormorantGaramond_400Regular',
    fontSize: 40,
    color: 'white',
    letterSpacing: 4,

  },
  place: {
    fontFamily: 'CormorantGaramond_300Light',
    fontSize: 18,
    color: 'white',
    letterSpacing: 4,
    marginTop: 8,
    marginBottom: 4,
  },
  text: {
    fontFamily: 'CormorantGaramond_300Light',
    fontSize: 16,
    color: 'white',
    marginTop: 20,
    letterSpacing: 2,
  },
  button: {
    backgroundColor: '#E0C58E',
    paddingHorizontal: 40,
    paddingVertical: 6,
    borderRadius: 25,
    marginTop: 10,
  },
  buttonText: {
    fontFamily: 'CormorantGaramond_700Bold',
    fontSize: 22,
    letterSpacing: 2,
    color: '#FFFFFF',
  },
  landscapeTextContainer: {
    alignItems: 'center',
  },
  // Portrait styles (if needed in the future)
  portraitContainer: {
    width: '80%',
    left: "10%",
    top: "10%",
    height: 'auto',
  },

  logoPortrait: {
    width: '28%',
    height: '25%',
    top: 0,
    marginTop: '-15%',
  },
  portraitTextContainer: {
    alignItems: 'center',
    marginTop: "0%",
  },
  portraitNames: {
    alignItems: 'center',
    textAlign: 'center',
    fontSize: 24,
    letterSpacing: 4,
  },
  portraitPlace: {
  },
  portraitText: {
    
  },
  portraitDate: {
    fontSize: 20,
  },
  buttonTextPortrait: {
    color: '#FFFFFF',
    textAlign: 'center',
    alignSelf: 'center',
  },
  
});
