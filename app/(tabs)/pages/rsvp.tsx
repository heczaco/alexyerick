import React, { useState } from 'react';
import { Alert, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';

export default function RsvpScreen() {
  const [name, setName] = useState('');
  const [attending, setAttending] = useState<boolean | null>(null);
  const [guests, setGuests] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = () => {
    if (!name || attending === null) {
      Alert.alert('Error', 'Por favor completa todos los campos requeridos');
      return;
    }
    
    // Here you would typically send this data to your backend
    Alert.alert('¡Gracias!', 'Tu confirmación ha sido recibida');
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.section}>
        <Text style={styles.title}>R.S.V.P</Text>
        <Text style={styles.subtitle}>Confirma tu asistencia</Text>
        
        <View style={styles.form}>
          <TextInput
            style={styles.input}
            placeholder="Nombre completo"
            value={name}
            onChangeText={setName}
            placeholderTextColor="#999"
          />
          
          <Text style={styles.label}>¿Asistirás?</Text>
          <View style={styles.radioGroup}>
            <Pressable
              style={[styles.radioButton, attending === true && styles.radioButtonActive]}
              onPress={() => setAttending(true)}
            >
              <Text style={[styles.radioText, attending === true && styles.radioTextActive]}>
                Sí, asistiré
              </Text>
            </Pressable>
            <Pressable
              style={[styles.radioButton, attending === false && styles.radioButtonActive]}
              onPress={() => setAttending(false)}
            >
              <Text style={[styles.radioText, attending === false && styles.radioTextActive]}>
                No podré asistir
              </Text>
            </Pressable>
          </View>
          
          <TextInput
            style={styles.input}
            placeholder="Número de invitados"
            value={guests}
            onChangeText={setGuests}
            keyboardType="numeric"
            placeholderTextColor="#999"
          />
          
          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="Mensaje (opcional)"
            value={message}
            onChangeText={setMessage}
            multiline
            numberOfLines={4}
            placeholderTextColor="#999"
          />
          
          <Pressable style={styles.submitButton} onPress={handleSubmit}>
            <Text style={styles.submitButtonText}>ENVIAR CONFIRMACIÓN</Text>
          </Pressable>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  content: {
    padding: 20,
    alignItems: 'center',
  },
  section: {
    alignItems: 'center',
    marginVertical: 20,
    width: '100%',
    maxWidth: 500,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#A16F3C',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 30,
  },
  form: {
    width: '100%',
  },
  input: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#DDD',
    borderRadius: 5,
    padding: 15,
    marginBottom: 15,
    fontSize: 14,
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  label: {
    fontSize: 14,
    color: '#333',
    marginBottom: 10,
    fontWeight: '600',
  },
  radioGroup: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 15,
  },
  radioButton: {
    flex: 1,
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#DDD',
    borderRadius: 5,
    padding: 15,
    alignItems: 'center',
  },
  radioButtonActive: {
    backgroundColor: '#B58F6F',
    borderColor: '#B58F6F',
  },
  radioText: {
    color: '#666',
    fontSize: 14,
  },
  radioTextActive: {
    color: 'white',
    fontWeight: '600',
  },
  submitButton: {
    backgroundColor: '#B58F6F',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
  },
  submitButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
    letterSpacing: 2,
  },
});
