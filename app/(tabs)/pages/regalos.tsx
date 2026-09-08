import { generalStyles } from '@/constants/GeneralStyles';
import * as Clipboard from 'expo-clipboard';
import { Image } from 'expo-image';
import React from 'react';
import { ImageBackground, Pressable, StyleSheet, Text, useWindowDimensions, View } from 'react-native';
export default function RegalosScreen() {

     const { width, height } = useWindowDimensions();
     const isLandscape = width > height;

     const copyAccountNumber = async () => {
       await Clipboard.setStringAsync('012680015394091490');
       alert('Número de cuenta copiado al portapapeles');
     };

  return (
  <ImageBackground
        source={
          isLandscape
            ? require('@/assets/images/regalos/bg_landscape.png')
            : require('@/assets/images/regalos/bg_portrait.png')
        }
        style={[styles.container, isLandscape ? generalStyles.landscapeBackground_100: generalStyles.portraitBackground]}
        resizeMode="cover"
      >
        <View style={[styles.content, !isLandscape && styles.contentPortrait]}>
            <View style={[styles.monogramPortrait, !isLandscape && styles.monogramImagePortrait]}>
              <Image
                source={require('@/assets/images/monogram_white.svg')}
                style={generalStyles.imageStd}
                contentFit="contain"
                />
            </View>
            
          
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
              </Pressable>
            </View>
        </View>
      </ImageBackground>
    );
  }
  
  const styles = StyleSheet.create({
    container: {
    },
    backgroundImage: {
      width: '100%',
      height: '100%',
    },
    content: {
      position: 'absolute',
      top: '20%',
      left: '35%',
      width: '30%',
      height: '40%',
      
      backgroundColor: '#252836',
      opacity: 0.75,
      borderRadius: 15,
      padding: 20,
      justifyContent: 'center',
    },
    monogramPortrait: {
      width: "25%",
      height: "25%",
      marginBottom: 10,
      alignSelf: 'center',
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
    },
    // Portrait styles
    
    monogramImagePortrait: {
      width: "30%",
      height: 100,
      alignSelf: 'center',
      marginTop:0,
      marginLeft: "2%",
    },
    contentPortrait: {
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

