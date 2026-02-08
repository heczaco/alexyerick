import { Image } from 'expo-image';
import React from 'react';
import { Pressable, StyleSheet, Text, useWindowDimensions, View } from 'react-native';

interface MenuProps {
  currentPage: string;
  onPageChange: (page: string) => void;
  rsvpActive: boolean;
}

interface MenuButtonProps {
  id: string;
  active: boolean;
  currentPage: string;
  onPress: (id: string) => void;
  children: string;
}

function MenuButton({ id, active, currentPage, onPress, children }: MenuButtonProps) {
  const { width, height } = useWindowDimensions();
  const isLandscape = width > height;
  
  let buttonStyle = styles.menuButton;
  let circleStyle = styles.circle1;
  
  switch (currentPage) {
    case 'inicio':
    case 'regalos':
    case 'rsvp':
    case 'ceremonia':
    case 'recepcion':
    case 'vestimenta':
      break;
  }
  
  const isActive = currentPage === id;
  const activeButtonStyle = isActive ? styles.activeButton : null;
  const activeCircleStyle = isActive ? styles.activeCircle : null;
  const isFirstButton = id === 'inicio';
  
  return (
    <Pressable
      style={[
        buttonStyle,
        activeButtonStyle,
        isLandscape && styles.landscapeButton,
        isLandscape && isFirstButton && styles.leftButMenu,
        !isLandscape && styles.portraitButton
      ]}
      onPress={() => onPress(id)}
      disabled={!active}
    >
      {isLandscape ? (
        <Text style={[styles.buttonText, isActive && styles.activeButtonText]}>
          {children}
        </Text>
      ) : (
        <>
          <Text style={[styles.buttonTextPortrait, isActive && styles.activeButtonText]}>
            {children}
          </Text>
          <View style={[circleStyle, activeCircleStyle, styles.portraitCircle]} />
        </>
      )}
    </Pressable>
  );
}

export default function Menu({ currentPage, onPageChange, rsvpActive }: MenuProps) {
  const { width, height } = useWindowDimensions();
  const isLandscape = width > height;

  
  
  return (
    <View style={[
      styles.divMenu,
      isLandscape ? styles.landscapeMenu : styles.portraitMenu,
    ]}>
      {isLandscape && (
        <View style={styles.logoMenu}>
          <Image 
            source={require('@/assets/images/monogram_banner.svg')}
            style={styles.logoImage}
            contentFit="contain"
          />
        </View>
      )}
      <View style={isLandscape ? styles.buttonsContainer : null}>
        <MenuButton id="inicio" active={true} currentPage={currentPage} onPress={onPageChange}>
          INICIO
        </MenuButton>
        <MenuButton id="ceremonia" active={true} currentPage={currentPage} onPress={onPageChange}>
          CEREMONIA
        </MenuButton>
        <MenuButton id="recepcion" active={true} currentPage={currentPage} onPress={onPageChange}>
          RECEPCIÓN
        </MenuButton>
        <MenuButton id="vestimenta" active={true} currentPage={currentPage} onPress={onPageChange}>
          VESTIMENTA
        </MenuButton>
        <MenuButton id="informacion" active={true} currentPage={currentPage} onPress={onPageChange}>
          INFORMACION
        </MenuButton>
        <MenuButton id="regalos" active={true} currentPage={currentPage} onPress={onPageChange}>
          REGALOS
        </MenuButton>
        <MenuButton id="rsvp" active={rsvpActive} currentPage={currentPage} onPress={onPageChange}>
          R.S.V.P
        </MenuButton>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  divMenu: {
    position: 'absolute',
    zIndex: 15,
  },
  landscapeMenu: {
    flexDirection: 'row',
    top: 0,
    left: 0,
    right: 0,
    width: '100%',
    height: '13%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255, 255, 255, 1)',
  },
  logoMenu: {
    position: 'absolute',
    left: '2%',
    height: '60%',
    width: 120,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonsContainer: {
    flexDirection: 'row',
    width: '80%',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  logoImage: {
    width: '100%',
    height: '100%',
  },
  menuButton: {
    backgroundColor: 'transparent',
    borderWidth: 0,
  },
  landscapeButton: {
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 0,
    paddingHorizontal: 18,
    paddingVertical: 8,
    height: '60%',
    flex: 1,
    borderLeftWidth: 1,
    borderLeftColor: '#2C2C2C',
  },
  leftButMenu: {
    borderLeftWidth: 0,
  },
  buttonText: {
    fontSize: 14,
    color: '#2C2C2C',
    fontFamily: 'Raleway_400Regular',
    textAlign: 'center',
  },
  activeButton: {},
  activeButtonText: {
    fontFamily: 'Raleway_700Bold',
  },
  
  // Portrait menu background styles (if needed in the future)
  portraitMenu: {
    flexDirection: 'column',
    right: '7%',
    top: '74%',
    transform: [{ translateY: -150 }],
    marginRight: -5,
    width: '40%',
  },
  portraitButton: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginVertical: 8,
    paddingRight: 0,
    width: '100%',
  },
  buttonTextPortrait: {
    fontSize: 13,
    color: '#FFFFFF',
    fontFamily: 'Raleway_400Regular',
    textAlign: 'left',
    width: "60%",
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  circle1: {
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    width: 10,
    height: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#FFFFFF',
    backgroundColor: 'transparent',
  },
  activeCircle: {
    backgroundColor: '#FFFFFF',
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
  },
  portraitCircle: {
    marginLeft: 12,
  },
  
});
