import * as Clipboard from 'expo-clipboard';
import { Image } from 'expo-image';
import React from 'react';
import { ImageBackground, Pressable, StyleSheet, Text, useWindowDimensions, View } from 'react-native';
export default function RegalosScreen() {

     const { width, height } = useWindowDimensions();
     const isLandscape = width > height;

     const copyAccountNumber = async () => {
       await Clipboard.setStringAsync('5579209150641014');
       alert('Número de cuenta copiado al portapapeles');
     };

  return (
  <ImageBackground
        source={
          isLandscape
            ? require('@/assets/images/regalos/bg_landscape.png')
            : require('@/assets/images/regalos/bg_portrait.png')
        }
        style={styles.container}
        resizeMode="cover"
        imageStyle={[styles.backgroundImage, !isLandscape && styles.backgroundImagePortrait]}
      >
        <View style={[styles.content, isLandscape && styles.contentLandscape]}>
         
  
            {/* Monogram for portrait mode */}
            {!isLandscape && (
              <View style={styles.monogramPortrait}>
                <Image
                  source={require('@/assets/images/recepcion/rececepcion_monogram.svg')}
                  style={styles.monogramImagePortrait}
                  contentFit="contain"
                  />
              </View>
            )}
  
            {/* Text Content Container */}
          <View style={[styles.textContainer, isLandscape && styles.textContainerLandscape]}>
          
            {/* Venue Name */}
            <Text style={[styles.giftMessage, isLandscape && styles.giftMessageLandscape]}>
              Su presencia y compañía siempre va a ser nuestro
              mejor regalo. Sin embargo, si desean obsequiarnos
              algo más pueden hacerlo a través de:
            </Text>
  
            <View style={[styles.giftContainer, isLandscape && styles.giftContainerLandscape]}>
              <Pressable onPress={copyAccountNumber}>
                <Image
                    source={require('@/assets/images/regalos/cuenta.svg')}
                    style={isLandscape ? styles.monogramImage2Landscape : styles.monogramImage2Portrait}
                    contentFit="fill"
                    />
                <Image
                    source={require('@/assets/images/regalos/sobre.svg')}
                    style={isLandscape ? styles.monogramImage1Landscape : styles.monogramImage1Portrait}
                    contentFit="fill"
                    />
              </Pressable>
            </View>
          </View>
        </View>
      </ImageBackground>
    );
  }
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#F8F5F0',
    },
    backgroundImage: {
      width: '100%',
      height: '100%',
    },
    backgroundImagePortrait: {
      height: '130%',
      transform: [{ translateY: '0%' }],
    },
    content: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'flex-start',
      paddingHorizontal: 40,
      paddingVertical: 60,
    },
    monogramPortrait: {
      width: "25%",
      height: "15%",
      marginTop: "-10%",
      marginBottom: 10,
      alignSelf: 'center',
    },
    monogramImagePortrait: {
      width: '100%',
      height: '100%',
    },
    textContainer: {
      alignItems: 'center',
      backgroundColor: '#4A4C3488',
      padding: 20,
      borderRadius: 15,
      width: '100%',
    },
    giftMessage: {
      fontFamily: 'Raleway_500Medium',
      fontSize: 10,
      color: '#FFFFFF',
      textAlign: 'center',
      marginBottom: 4,
      marginTop: 4,
    },
    giftContainer: {
      width: '100%',
      height: "50%",
    },
    monogramImage1Portrait: {
      width: "30%",
      height: 100,
      alignSelf: 'center',
      marginTop:0,
      marginLeft: "2%",
    },
    monogramImage2Portrait: {
      width: "80%",
      alignSelf: 'center',
      height: 100,
      marginTop: 15,
    },
    // Landscape styles
    
    contentLandscape: {
      flexDirection: 'row',
      justifyContent: 'flex-end',
      alignItems: 'center',
      paddingRight: 10,
    },
    textContainerLandscape: {
      alignItems: 'flex-start',
      backgroundColor: '#transparent',
      padding: 0,
      marginRight: 0,
      maxWidth: 600,
    },
    giftMessageLandscape: {
      fontSize: 13,
      fontFamily: 'Raleway_500Medium',
      color: '#FFFFFF',
      textShadowColor: 'rgba(0, 0, 0, 0.5)',
      textAlign: 'center',
      alignSelf: 'center',
      marginBottom: 25,
      width: '80%',
    },
    giftContainerLandscape: {
      flexDirection: 'column',
      width: '100%',
      justifyContent: 'center',
      marginTop: 5,
    },
    monogramImage1Landscape: {
      width: "25%",
      height: 120,
      alignSelf: 'center',
      marginTop: 20,
      marginLeft: "2%",
    },
    monogramImage2Landscape: {
      width: "50%",
      alignSelf: 'center',
      height: 140,
    },
  });

