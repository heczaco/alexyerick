import Menu from '@/components/Menu';
import { useGuest } from '@/contexts/GuestContext';
import React, { useEffect, useRef, useState } from 'react';
import { ActivityIndicator, Animated, StyleSheet, Text, useWindowDimensions, View } from 'react-native';
import CeremoniaScreen from './pages/ceremonia';
import InformacionScreen from './pages/informacion';
import InicioScreen from './pages/inicio';
import RecepcionScreen from './pages/recepcion';
import RegalosScreen from './pages/regalos';
import RsvpScreen from './pages/rsvp';
import VestimentaScreen from './pages/vestimenta';

export default function TabLayout() {
  const [currentPage, setCurrentPage] = useState('inicio');
  const fadeAnim = useRef(new Animated.Value(1)).current;
  const { width, height } = useWindowDimensions();
  const isLandscape = width > height;
  const menuHeight = isLandscape ? height * 0.13 : 0;
  const { guestData, isLoading, error } = useGuest();
  const { updateGuestStatus } = useGuest();

  useEffect(() => {
    // Fade to slightly transparent, then fade in when page changes
    fadeAnim.setValue(0.3);
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 600,
      useNativeDriver: true,
    }).start();
  }, [currentPage]);
  if (guestData.name_1 !== "" && guestData.invitation_status === ""){
    updateGuestStatus("abierta");
  }
  if (isLoading) {
    return (
      <View style={[styles.container, styles.centerContent]}>
        <ActivityIndicator size="large" color="#0a7ea4" />
        <Text style={styles.loadingText}>Cargando datos del invitado...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={[styles.container, styles.centerContent]}>
        <Text style={styles.errorText}>Error: {error}</Text>
      </View>
    );
  }
  const renderPage = () => {
    switch (currentPage) {
      case 'inicio':
        return <InicioScreen invitado1={guestData.invitado1} invitado2={guestData.invitado2} />;
      case 'ceremonia':
        return <CeremoniaScreen />;
      case 'recepcion':
        return <RecepcionScreen />;
      case 'vestimenta':
        return <VestimentaScreen />;
      case 'informacion':
        return <InformacionScreen />;
      case 'regalos':
        return <RegalosScreen />;
      case 'rsvp':
        return <RsvpScreen />;
      default:
        return <InicioScreen invitado1={guestData.invitado1} invitado2={guestData.invitado2} />;
    }
  };

  return (
    <View style={styles.container}>
      <Menu 
        currentPage={currentPage} 
        onPageChange={setCurrentPage} 
        rsvpActive={guestData.rsvpActive}
      />
      <Animated.View style={[styles.content, isLandscape && { marginTop: menuHeight }, { opacity: fadeAnim }]}>
        {renderPage()}
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  content: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  centerContent: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#666',
  },
  errorText: {
    fontSize: 16,
    color: '#ff0000',
    textAlign: 'center',
    padding: 20,
  },
});
