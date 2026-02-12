import { Image } from 'expo-image';
import React, { useEffect, useRef, useState } from 'react';
import { Animated, Pressable, StyleSheet, Text, useWindowDimensions, View } from 'react-native';

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
  textVisible: boolean;
  onHover: () => void;
}

function MenuButton({ id, active, currentPage, onPress, children, textVisible, onHover }: MenuButtonProps) {
  const { width, height } = useWindowDimensions();
  const isLandscape = width > height;
  const slideAnim = useRef(new Animated.Value(0)).current;
  
  useEffect(() => {
    if (!isLandscape) {
      Animated.timing(slideAnim, {
        toValue: textVisible ? 0 : 100,
        duration: 700,
        useNativeDriver: true,
      }).start();
    }
  }, [textVisible, isLandscape]);
  
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
  
  const handlePress = () => {
    if (!isLandscape && !textVisible) {
      // If text is hidden, only show it, don't navigate
      onHover();
    } else {
      // If text is visible or in landscape, navigate
      onPress(id);
      // Reset timer on navigation in portrait mode
      if (!isLandscape) {
        onHover();
      }
    }
  };
  
  return (
    <Pressable
      style={[
        buttonStyle,
        activeButtonStyle,
        isLandscape && styles.landscapeButton,
        isLandscape && isFirstButton && styles.leftButMenu,
        !isLandscape && styles.portraitButton
      ]}
      onPress={handlePress}
      disabled={!active}
    >
      {isLandscape ? (
        <Text style={[styles.buttonText, isActive && styles.activeButtonText]}>
          {children}
        </Text>
      ) : (
        <>
          <Animated.Text 
            style={[
              styles.buttonTextPortrait, 
              isActive && styles.activeButtonText,
              { 
                transform: [{ translateX: slideAnim }],
                opacity: slideAnim.interpolate({
                  inputRange: [0, 100],
                  outputRange: [1, 0],
                })
              }
            ]}
          >
            {children}
          </Animated.Text>
          <View style={[circleStyle, activeCircleStyle, styles.portraitCircle]} />
        </>
      )}
    </Pressable>
  );
}

export default function Menu({ currentPage, onPageChange, rsvpActive }: MenuProps) {
  const { width, height } = useWindowDimensions();
  const isLandscape = width > height;
  const [textVisible, setTextVisible] = useState(true);
  const hideTimerRef = useRef<NodeJS.Timeout | null>(null);

  const startHideTimer = () => {
    if (hideTimerRef.current) {
      clearTimeout(hideTimerRef.current);
    }
    hideTimerRef.current = setTimeout(() => {
      if (!isLandscape) {
        setTextVisible(false);
      }
    }, 5000);
  };

  const showText = () => {
    setTextVisible(true);
    startHideTimer();
  };

  useEffect(() => {
    if (!isLandscape) {
      startHideTimer();
    } else {
      setTextVisible(true);
      if (hideTimerRef.current) {
        clearTimeout(hideTimerRef.current);
      }
    }

    return () => {
      if (hideTimerRef.current) {
        clearTimeout(hideTimerRef.current);
      }
    };
  }, [isLandscape]);

  
  
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
        <MenuButton id="inicio" active={true} currentPage={currentPage} onPress={onPageChange} textVisible={textVisible} onHover={showText}>
          INICIO
        </MenuButton>
        <MenuButton id="ceremonia" active={true} currentPage={currentPage} onPress={onPageChange} textVisible={textVisible} onHover={showText}>
          CEREMONIA
        </MenuButton>
        <MenuButton id="recepcion" active={true} currentPage={currentPage} onPress={onPageChange} textVisible={textVisible} onHover={showText}>
          RECEPCIÓN
        </MenuButton>
        <MenuButton id="vestimenta" active={true} currentPage={currentPage} onPress={onPageChange} textVisible={textVisible} onHover={showText}>
          VESTIMENTA
        </MenuButton>
        <MenuButton id="informacion" active={true} currentPage={currentPage} onPress={onPageChange} textVisible={textVisible} onHover={showText}>
          INFORMACION
        </MenuButton>
        <MenuButton id="regalos" active={true} currentPage={currentPage} onPress={onPageChange} textVisible={textVisible} onHover={showText}>
          REGALOS
        </MenuButton>
        <MenuButton id="rsvp" active={rsvpActive} currentPage={currentPage} onPress={onPageChange} textVisible={textVisible} onHover={showText}>
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
    minWidth: 200,
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
