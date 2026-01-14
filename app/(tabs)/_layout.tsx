import Menu from '@/components/Menu';
import React, { useState } from 'react';
import { StyleSheet, useWindowDimensions, View } from 'react-native';
import IglesiaScreen from './pages/iglesia';
import InicioScreen from './pages/inicio';
import RecepcionScreen from './pages/recepcion';
import RegalosScreen from './pages/regalos';
import RsvpScreen from './pages/rsvp';
import VestimentaScreen from './pages/vestimenta';

export default function TabLayout() {
  const [currentPage, setCurrentPage] = useState('inicio');
  const [rsvpActive, setRsvpActive] = useState(true); // Set to false if you want to disable RSVP initially
  const [invitado1, setInvitado1] = useState(''); // Set guest names here or from URL params
  const [invitado2, setInvitado2] = useState('');
  const { width, height } = useWindowDimensions();
  const isLandscape = width > height;

  const renderPage = () => {
    switch (currentPage) {
      case 'inicio':
        return <InicioScreen invitado1={invitado1} invitado2={invitado2} />;
      case 'iglesia':
        return <IglesiaScreen />;
      case 'recepcion':
        return <RecepcionScreen />;
      case 'vestimenta':
        return <VestimentaScreen />;
      case 'regalos':
        return <RegalosScreen />;
      case 'rsvp':
        return <RsvpScreen />;
      default:
        return <InicioScreen invitado1={invitado1} invitado2={invitado2} />;
    }
  };

  return (
    <View style={styles.container}>
      <Menu 
        currentPage={currentPage} 
        onPageChange={setCurrentPage} 
        rsvpActive={rsvpActive}
      />
      <View style={[styles.content, isLandscape && styles.landscapeContent]}>
        {renderPage()}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
  },
  landscapeContent: {
    marginTop: 60, // Height of the menu in landscape
  },
});
