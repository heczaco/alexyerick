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
  
  let buttonStyle = styles.menuButton1;
  let circleStyle = styles.circle1;
  
  switch (currentPage) {
    case 'inicio':
      buttonStyle = styles.menuButton1;
      circleStyle = styles.circle1;
      break;
    case 'regalos':
    case 'rsvp':
    case 'iglesia':
      buttonStyle = styles.menuButton2;
      circleStyle = styles.circle2;
      break;
    case 'recepcion':
      buttonStyle = styles.menuButton3;
      circleStyle = styles.circle3;
      break;
    case 'vestimenta':
      buttonStyle = styles.menuButton4;
      circleStyle = styles.circle2;
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
          <Text style={[styles.buttonText, !isActive && styles.transparentText]}>
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
  
  let menuBackgroundStyle = styles.menuWhite;
  if (currentPage === 'recepcion') {
    menuBackgroundStyle = styles.menuTransparent;
  } else if (currentPage === 'vestimenta') {
    menuBackgroundStyle = styles.menuDark;
  }
  
  return (
    <View style={[
      styles.divMenu,
      isLandscape ? styles.landscapeMenu : styles.portraitMenu,
      isLandscape && menuBackgroundStyle
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
      <MenuButton id="inicio" active={true} currentPage={currentPage} onPress={onPageChange}>
        INICIO
      </MenuButton>
      <MenuButton id="iglesia" active={true} currentPage={currentPage} onPress={onPageChange}>
        CEREMONIA
      </MenuButton>
      <MenuButton id="recepcion" active={true} currentPage={currentPage} onPress={onPageChange}>
        RECEPCIÓN
      </MenuButton>
      <MenuButton id="vestimenta" active={true} currentPage={currentPage} onPress={onPageChange}>
        VESTIMENTA
      </MenuButton>
      <MenuButton id="regalos" active={true} currentPage={currentPage} onPress={onPageChange}>
        MESA DE REGALOS
      </MenuButton>
      <MenuButton id="rsvp" active={rsvpActive} currentPage={currentPage} onPress={onPageChange}>
        R.S.V.P
      </MenuButton>
    </View>
  );
}

const styles = StyleSheet.create({
  divMenu: {
    position: 'absolute',
    zIndex: 15,
  },
  portraitMenu: {
    flexDirection: 'column',
    right: 0,
    top: '50%',
    transform: [{ translateY: -150 }],
    marginRight: -5,
  },
  landscapeMenu: {
    flexDirection: 'row',
    top: 0,
    left: 0,
    right: 0,
    width: '100%',
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
  },
  menuWhite: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
  },
  menuTransparent: {
    backgroundColor: 'transparent',
  },
  menuDark: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  logoMenu: {
    position: 'absolute',
    left: 40,
    height: 40,
    width: 120,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoImage: {
    width: '100%',
    height: '100%',
  },
  logoText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#A16F3C',
  },
  menuButton1: {
    backgroundColor: 'transparent',
    borderWidth: 0,
  },
  menuButton2: {
    backgroundColor: 'transparent',
    borderWidth: 0,
  },
  menuButton3: {
    backgroundColor: 'transparent',
    borderWidth: 0,
  },
  menuButton4: {
    backgroundColor: 'transparent',
    borderWidth: 0,
  },
  portraitButton: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    margin: 10,
    paddingRight: 5,
  },
  landscapeButton: {
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 0,
    paddingHorizontal: 18,
    paddingVertical: 8,
    height: '60%',
    borderLeftWidth: 1,
    borderLeftColor: '#2C2C2C',
  },
  leftButMenu: {
    borderLeftWidth: 0,
  },
  buttonText: {
    fontSize: 11,
    color: '#666666',
    fontFamily: 'Raleway_400Regular',
  },
  transparentText: {
    color: 'transparent',
  },
  activeButton: {},
  activeButtonText: {
    fontFamily: 'Raleway_700Bold',
    color: '#2C2C2C',
  },
  circle1: {
    width: 10,
    height: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: 'white',
    backgroundColor: 'transparent',
  },
  circle2: {
    width: 10,
    height: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#D3C3B3',
    backgroundColor: 'transparent',
  },
  circle3: {
    width: 10,
    height: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#303030',
    backgroundColor: 'transparent',
  },
  portraitCircle: {
    marginLeft: 10,
  },
  activeCircle: {
    backgroundColor: 'white',
  },
});
