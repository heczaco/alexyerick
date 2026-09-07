import { generalStyles } from '@/constants/GeneralStyles';
import React, { useRef } from 'react';
import { ImageBackground, ScrollView, StyleSheet, Text, useWindowDimensions, View } from 'react-native';

export default function VestimentaScreen() {
  const { width, height } = useWindowDimensions();
  const isLandscape = width > height;
  const scrollViewRef = useRef<ScrollView>(null);
  const imageContainerRef = useRef<View>(null);

  const scrollToImage = () => {
    imageContainerRef.current?.measureLayout(
      scrollViewRef.current as any,
      (x, y) => {
        scrollViewRef.current?.scrollTo({ y, animated: true });
      },
      () => {}
    );
  };

  return (
    <ImageBackground
      source={
        isLandscape
          ? require('@/assets/images/vestimenta/dresscode_bg.png')
          : require('@/assets/images/vestimenta/dresscode_bg_portrait.png')
      }
      style={[styles.bg, isLandscape ? generalStyles.landscapeBackground_100: generalStyles.portraitBackground]}
      resizeMode="cover">
      
      <View style={[styles.content, !isLandscape && styles.contentPortrait]}>
          {/* Text Content Container */}
          

            {/* Title */}
            <Text style={[styles.title, !isLandscape && styles.titlePortrait]}>
              Dress Code
            </Text>

            {/* Dress Code Type */}
            <Text style={[styles.dressCode, !isLandscape && styles.dressCodePortrait]}>
              <Text style={styles.dressCodeBold}>Hombres:</Text> Guayabera.
            </Text>
            <Text style={[styles.dressCode, !isLandscape && styles.dressCodePortrait]}>
              <Text style={styles.dressCodeBold}>Mujeres:</Text> Vestido.
            </Text>
            <Text style={[styles.dressCodeInfo, !isLandscape && styles.dressCodeInfoPortrait]}>
              La celebración será en arena, por lo que recomendamos elegir calzado cómodo
            </Text>
            <Text style={[styles.place, !isLandscape && styles.placePortrait]}>
              Playa del Mesón Doña Paz
            </Text>
            {/* Hotels */}
          </View>
      
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  bg:{
    backgroundColor: '#D9CBC2',
  },
  content: {
    flex: 1,
    position: 'absolute',
    width: "50%",
    height: '100%',
    paddingTop: "13%",
    justifyContent: 'flex-start',
    right: "5%",
  },
  textContainer: {
    position: 'absolute',
    width: '50%',
    height: '100%',
    right: 0,
    alignItems: 'center',

  },
  title: {
    fontFamily: 'CormorantGaramond_700Bold',
    fontSize: 40  ,
    letterSpacing: 3,
    color: '#112250',
    textAlign: 'center',
    marginBottom: 10,
  },
  dressCode: {
    fontFamily: 'CormorantGaramond_300Light',
    fontSize: 24,
    letterSpacing: 2,
    color: '#112250',
    textAlign: 'center',
    
  },
  dressCodeBold: {
    fontFamily: 'CormorantGaramond_600SemiBold',
    fontWeight: 'bold',
  },
  dressCodeInfo: {
    fontFamily: 'CormorantGaramond_300Light',
    fontSize: 16,
    letterSpacing: 1,
    color: '#112250',
    alignSelf: 'center',
    textAlign: 'center',
    maxWidth: '50%',
    marginTop: 10,
    marginBottom: 10,
  },
  place: {
    fontFamily: 'CormorantGaramond_500Medium',
    fontSize: 22,
    letterSpacing: 1,
    color: '#112250',
    textAlign: 'center',
    marginTop: 5,
    marginBottom: 5,
  },
  // Portrait styles
  contentPortrait: {
  
  },
  titlePortrait: {
  },
  dressCodePortrait: {
  },
  dressCodeInfoPortrait: {
  },
  placePortrait: {
  },
});
