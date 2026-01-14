import React from 'react';
import { Linking, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

export default function RegalosScreen() {
  const openLink = (url: string) => {
    Linking.openURL(url);
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.section}>
        <Text style={styles.title}>MESA DE REGALOS</Text>
        <Text style={styles.text}>
          Tu presencia es nuestro mejor regalo, pero si deseas obsequiarnos algo:
        </Text>
        
        <Pressable style={styles.button} onPress={() => openLink('https://mesaderegalos.liverpool.com.mx')}>
          <Text style={styles.buttonText}>Liverpool</Text>
        </Pressable>
        
        <Pressable style={styles.button} onPress={() => openLink('https://www.amazon.com.mx/wedding')}>
          <Text style={styles.buttonText}>Amazon</Text>
        </Pressable>
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
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#A16F3C',
    marginBottom: 20,
  },
  text: {
    fontSize: 14,
    color: '#333',
    textAlign: 'center',
    marginBottom: 30,
    paddingHorizontal: 20,
  },
  button: {
    backgroundColor: '#B58F6F',
    paddingHorizontal: 40,
    paddingVertical: 15,
    borderRadius: 5,
    marginVertical: 10,
    width: 200,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
    letterSpacing: 2,
  },
});
