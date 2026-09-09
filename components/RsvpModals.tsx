import { Picker } from '@react-native-picker/picker';
import React from 'react';
import { ActivityIndicator, Modal, Pressable, StyleSheet, Text, View } from 'react-native';

interface RsvpModalsProps {
  modalVisible: boolean;
  confirmedModalVisible: boolean;
  onCloseConfirmation: () => void;
  onCloseConfirmed: () => void;
  displayNames: {
    name1: string;
    name2: string | null;
  };
  availableInvitations: string | number;
  selectedAttendees: number;
  onSelectedAttendeesChange: (value: number) => void;
  isSubmitting: boolean;
  onConfirm: () => void;
  onContactPlanner: () => void;
}

export function RsvpModals({
  modalVisible,
  confirmedModalVisible,
  onCloseConfirmation,
  onCloseConfirmed,
  displayNames,
  availableInvitations,
  selectedAttendees,
  onSelectedAttendeesChange,
  isSubmitting,
  onConfirm,
  onContactPlanner,
}: RsvpModalsProps) {
  const invitationCount = Number(availableInvitations) || 0;

  return (
    <>
      <Modal
        animationType="fade"
        transparent
        visible={modalVisible}
        onRequestClose={onCloseConfirmation}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Nos encantaría que nos acompañaras a nuestra boda:</Text>

            <Text style={styles.guestName}>{displayNames.name1}</Text>
            {displayNames.name2 && <Text style={styles.guestName}>{displayNames.name2}</Text>}

            <Text style={styles.modalLabel}>Confirmar número de asistentes</Text>

            <View style={styles.pickerContainer}>
              <Picker
                selectedValue={selectedAttendees}
                onValueChange={onSelectedAttendeesChange}
                style={styles.picker}
                dropdownIconColor="transparent"
                mode="dropdown"
              >
                {Array.from({ length: invitationCount + 1 }, (_, index) => (
                  <Picker.Item key={index} label={index.toString()} value={index} />
                ))}
              </Picker>
            </View>

            <Pressable
              style={[styles.confirmButton, isSubmitting && styles.confirmButtonDisabled]}
              onPress={onConfirm}
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <ActivityIndicator color="#FFFFFF" />
              ) : (
                <Text style={styles.confirmButtonText}>Confirma aquí</Text>
              )}
            </Pressable>

            <Pressable onPress={onCloseConfirmation} style={styles.cancelButton} disabled={isSubmitting}>
              <Text style={styles.cancelButtonText}>Cancelar</Text>
            </Pressable>
          </View>
        </View>
      </Modal>

      <Modal
        animationType="fade"
        transparent
        visible={confirmedModalVisible}
        onRequestClose={onCloseConfirmed}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.guestName}>{displayNames.name1}</Text>
            {displayNames.name2 && <Text style={styles.guestName}>{displayNames.name2}</Text>}

            <Text style={styles.confirmedText}>{selectedAttendees} asistentes confirmados</Text>

            <Pressable style={styles.confirmButton} onPress={onContactPlanner}>
              <Text style={styles.confirmButtonText}>Contactar Wedding Planner</Text>
            </Pressable>

            <Pressable style={styles.cancelButton} onPress={onCloseConfirmed}>
              <Text style={styles.cancelButtonText}>Cerrar</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
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
    fontFamily: 'CormorantGaramond_600SemiBold',
    fontSize: 20,
    textAlign: 'center',
    marginBottom: 20,
    color: '#2C2C2C',
  },
  guestName: {
    fontFamily: 'CormorantGaramond_500Medium',
    fontSize: 22,
    textAlign: 'center',
    marginBottom: 10,
    color: '#4A4C34',
  },
  confirmedText: {
    fontFamily: 'CormorantGaramond_600SemiBold',
    fontSize: 20,
    textAlign: 'center',
    marginTop: 20,
    marginBottom: 30,
    color: '#4A4C34',
  },
  modalLabel: {
    fontFamily: 'CormorantGaramond_600SemiBold',
    fontSize: 20,
    textAlign: 'center',
    marginTop: 20,
    marginBottom: 10,
    color: '#2C2C2C',
  },
  pickerContainer: {
    width: '30%',
    alignSelf: 'center',
    borderColor: 'transparent',
    marginBottom: 20,
    overflow: 'hidden',
    backgroundColor: 'transparent',
  },
  picker: {
    width: '100%',
    height: 50,
    fontFamily: 'CormorantGaramond_600SemiBold',
    fontSize: 22,
    textAlign: 'center',
    borderWidth: 0,
    borderColor: 'transparent',
    backgroundColor: 'transparent',
  },
  confirmButton: {
    backgroundColor: '#252836',
    paddingHorizontal: 40,
    paddingVertical: 12,
    borderRadius: 25,
    marginTop: 10,
    width: '100%',
  },
  confirmButtonDisabled: {
    backgroundColor: '#9A9C84',
    opacity: 0.6,
  },
  confirmButtonText: {
    fontFamily: 'CormorantGaramond_600SemiBold',
    fontSize: 18,
    letterSpacing: 2,
    color: '#FFFFFF',
    textAlign: 'center',
  },
  cancelButton: {
    paddingVertical: 10,
    marginTop: 10,
  },
  cancelButtonText: {
    fontFamily: 'CormorantGaramond_400Regular',
    fontSize: 16,
    color: '#161515',
    textAlign: 'center',
  },
});
