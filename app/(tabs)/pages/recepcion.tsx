import { generalStyles } from '@/constants/GeneralStyles';
import { Image } from 'expo-image';
import React from 'react';
import { Linking, Pressable, ScrollView, StyleSheet, Text, useWindowDimensions, View } from 'react-native';

export default function RecepcionScreen() {
  const { width, height } = useWindowDimensions();
  const isLandscape = width > height;

  const openMap = () => {
    // Replace with your actual reception venue location
    Linking.openURL('https://maps.app.goo.gl/bebbv8oZ8KnNFLAa7');
  };

  return (
      <View style={[styles.content, !isLandscape && styles.contentPortrait]}>
        {/* Background */}
        <View style={[isLandscape ? generalStyles.landscapeBackground_100 : 
          generalStyles.portraitBackground, styles.bg]}/>
      <ScrollView 
        style={styles.scrollView} 
        contentContainerStyle={[styles.content, !isLandscape && styles.content]}
          showsVerticalScrollIndicator={false}>

        {/* Monogram */}
        <View style={[ styles.monogram, !isLandscape && styles.monogramPortrait]}>
          <Image
            source={require('@/assets/images/monogram_blue.svg')}
            style={generalStyles.imageStd}
            contentFit="contain"
            />
        </View>
          
        {/* Information */}
        <View style={isLandscape ? styles.information : styles.informationPortrait}>
          <Image
            source={require('@/assets/images/recepcion/informacion.png')}
            style={generalStyles.imageStd}
            contentFit="contain"
            />
        </View>
        {/* Map Button */}
        <Pressable style={[styles.button, !isLandscape && styles.buttonPortrait]} onPress={openMap}>
          <Text style={[styles.buttonText, !isLandscape && styles.buttonTextPortrait]}>UBICACION</Text>
        </Pressable>

        {/* Additional Info */}
        <Text style={[styles.info, !isLandscape && styles.infoPortrait]}>
          Circuito de los Marinos s/n, Fracc Isla{'\n'}
          Navidad, 28838 Col.
        </Text>

        {/* Information */}
        <View style={isLandscape ? styles.itinerary : styles.itineraryPortrait}>
          <Image
            source={require('@/assets/images/recepcion/itinerario.png')}
            style={generalStyles.imageStd}
            contentFit="contain"
            />
        </View>
        </ScrollView>
      </View>
      
    
  );
}

const styles = StyleSheet.create({
  bg: {
    backgroundColor: '#F5F2EC',
  },
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    
  },
  scrollView: {
    flex: 1,
    width: '100%',
  },
  monogram: {
    marginTop: "4%",
    width: '16%',
    height: '18%',
    marginBottom: "4%",
  },
  information: {
    width: '30%',
    height: '22%',
  },
  info: {
    fontFamily: 'Raleway_300Light_Italic',
    fontSize: 11,
    color: '#3B507D',
    textAlign: 'center',
    alignSelf: 'center',
    lineHeight: 22,
    marginBottom: 15,
  },
  itinerary: {
    marginTop: "3%",
    marginLeft: "8%",
    width: '40%',
    height: '100%',
    paddingBottom: "5%",
  },
  button: {
    backgroundColor: '#3B507D',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 25,
    marginTop: "1.5%",
    marginBottom: 10,
  },
  buttonText: {
    fontFamily: 'Raleway_500Medium',
    fontSize: 12,
    letterSpacing: 2,
    color: '#F5F2EC',
  },
  // Landscape styles

  //portrait styles (if needed in the future)
  buttonPortrait: {
    paddingVertical: 8,
  },
  buttonTextPortrait: {
    fontSize: 8,
  },
  contentPortrait: {
  },
  informationPortrait: {
    width: '60%',
    height: '20%',
  },
  monogramPortrait: {
  },
  infoPortrait: {
  },
  itineraryPortrait: {
    width: '90%',
    height: '100%',
  },
});
