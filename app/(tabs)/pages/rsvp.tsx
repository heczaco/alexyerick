import { Config } from '@/constants/Config';
import { useGuest } from '@/contexts/GuestContext';
import { Picker } from '@react-native-picker/picker';
import { Image } from 'expo-image';
import { useGlobalSearchParams } from 'expo-router';
import React, { useState } from 'react';
import { ImageBackground, Linking, Modal, Pressable, StyleSheet, Text, useWindowDimensions, View } from 'react-native';

export default function RsvpScreen() {
  const { guestData, setGuestData } = useGuest();
  const params = useGlobalSearchParams();
  const [modalVisible, setModalVisible] = useState(false);
  const [confirmedModalVisible, setConfirmedModalVisible] = useState(false);
  const [selectedAttendees, setSelectedAttendees] = useState(parseInt(guestData.available_invitations) || 0);
  const { width, height } = useWindowDimensions();
    const isLandscape = width > height;
  
  const openRSVP = () => {
    if (!guestData.confirmation_field || guestData.confirmation_field === '') {
      setModalVisible(true);
    } else {
      setConfirmedModalVisible(true);
    }
  };

  const handleConfirm = async () => {
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
    }
  };

  const openWhatsApp = () => {
    const phoneNumber = '+525555555555'; // Replace with wedding planner's number
    const message = 'Hola';
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    Linking.openURL(url);
  };

  return (
    <ImageBackground
          source={require('@/assets/images/rsvp/bg.png')}
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
            Confirma Tu Asistencia
          </Text>
          
        {/* Date */}
        <View style={[styles.dateContainer, !isLandscape && styles.portraitDateContainer]}>
          <Image
            source={require('@/assets/images/rsvp/fecha_white.svg')}
            style={styles.dateImage}
            contentFit="contain"
          />
        </View>

          {/* Map Button */}
          <Pressable style={[styles.button, isLandscape && styles.buttonLandscape]} onPress={openRSVP}>
            <Text style={[styles.buttonText, isLandscape && styles.buttonTextLandscape]}>Confirma</Text>
          </Pressable>
        </View>
      </View>

      {/* Confirmation Modal */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Nos encantaría que nos acompañaras a nuestra boda:</Text>
            
            <Text style={styles.guestName}>{guestData.name_1}</Text>
            {guestData.name_2 && <Text style={styles.guestName}>{guestData.name_2}</Text>}
            
            <Text style={styles.modalLabel}>Confirmar número de asistentes</Text>
            
            <View style={styles.pickerContainer}>
              <Picker
                selectedValue={selectedAttendees}
                onValueChange={(value) => setSelectedAttendees(value)}
                style={styles.picker}
                dropdownIconColor="transparent"
                mode="dropdown"
              >
                {Array.from({ length: parseInt(guestData.available_invitations)+1}, (_, i) => (
                  <Picker.Item key={i} label={i.toString()} value={i} />
                ))}
              </Picker>
            </View>
            
            <Pressable style={styles.confirmButton} onPress={handleConfirm}>
              <Text style={styles.confirmButtonText}>Confirmar</Text>
            </Pressable>
            
            <Pressable style={styles.cancelButton} onPress={() => setModalVisible(false)}>
              <Text style={styles.cancelButtonText}>Cancelar</Text>
            </Pressable>
          </View>
        </View>
      </Modal>

      {/* Confirmed Guests Modal */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={confirmedModalVisible}
        onRequestClose={() => setConfirmedModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.guestName}>{guestData.name_1}</Text>
            {guestData.name_2 && <Text style={styles.guestName}>{guestData.name_2}</Text>}
            
            <Text style={styles.confirmedText}>
              {guestData.confirmation_field} asistentes confirmados
            </Text>
            
            <Pressable style={styles.confirmButton} onPress={openWhatsApp}>
              <Text style={styles.confirmButtonText}>Contactar Wedding Planner</Text>
            </Pressable>
            
            <Pressable style={styles.cancelButton} onPress={() => setConfirmedModalVisible(false)}>
              <Text style={styles.cancelButtonText}>Cerrar</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
   buttonLandscape: {
    backgroundColor: '#4A4C34',
    textAlign: 'center',
    alignSelf: 'center',
  },
  buttonTextLandscape: {
    color: '#FFFFFF',
    textAlign: 'center',
    alignSelf: 'center',
  },
    button: {
    backgroundColor: '#4A4C34',
    paddingHorizontal: 40,
    paddingVertical: 12,
    borderRadius: 25,
    marginTop: 10,
    marginBottom: 10,
  },
  buttonText: {
    fontFamily: 'Raleway_500Medium',
    fontSize: 12,
    letterSpacing: 2,
    color: '#FFFFFF',
  },
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
    height: '15%',
    marginTop: '15%',
  },
  landscapeTextContainer: {
    alignItems: 'center',
    marginTop: 90,
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
    height: '25%',
    top: 0,
    marginTop: 0,
    paddingTop: "5%",
  },
  portraitTextContainer: {
    alignItems: 'center',
    marginTop: "0%",
  },
  portraitNames: {
    fontSize: 24,
    letterSpacing: 4,
  },
  portraitDate: {
    fontSize: 20,
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
    portraitDateContainer: {
    width: 250,
    marginBottom: 0,
  },
  // Modal styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#F8F5F0',
    borderRadius: 20,
    padding: 30,
    width: '85%',
    maxWidth: 400,
    alignItems: 'center',
  },
  modalTitle: {
    fontFamily: 'Raleway_600SemiBold',
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
    color: '#2C2C2C',
  },
  guestName: {
    fontFamily: 'Raleway_500Medium',
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 10,
    color: '#4A4C34',
  },
  confirmedText: {
    fontFamily: 'Raleway_600SemiBold',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 20,
    marginBottom: 30,
    color: '#4A4C34',
  },
  modalLabel: {
    fontFamily: 'Raleway_600SemiBold',
    fontSize: 14,
    textAlign: 'center',
    marginTop: 20,
    marginBottom: 10,
    color: '#2C2C2C',
  },
  pickerContainer: {
    width: '30%',
    textAlign: 'center',
    alignSelf: 'center',
    alignContent: 'center',
    borderColor: 'transparent',
    marginBottom: 20,
    overflow: 'hidden',
    backgroundColor: 'transparent',
  },
  picker: {
    width: '100%',
    textAlign: 'center',
    height: 50,
    fontFamily: 'Raleway_600SemiBold',
    fontSize: 19,
    borderWidth: 0,
    borderColor: 'transparent',
    backgroundColor: 'transparent',
  },
  confirmButton: {
    backgroundColor: '#4A4C34',
    paddingHorizontal: 40,
    paddingVertical: 12,
    borderRadius: 25,
    marginTop: 10,
    width: '100%',
  },
  confirmButtonText: {
    fontFamily: 'Raleway_600SemiBold',
    fontSize: 14,
    letterSpacing: 2,
    color: '#FFFFFF',
    textAlign: 'center',
  },
  cancelButton: {
    paddingVertical: 10,
    marginTop: 10,
  },
  cancelButtonText: {
    fontFamily: 'Raleway_400Regular',
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
  },
});
