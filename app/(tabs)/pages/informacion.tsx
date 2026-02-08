import { Image } from 'expo-image';
import React from 'react';
import { Linking, Pressable, ScrollView, StyleSheet, Text, useWindowDimensions, View } from 'react-native';

export default function InformacionScreen() {
  const { width, height } = useWindowDimensions();
  const isLandscape = width > height;

  const openInstagram = () => {
    Linking.openURL('https://www.instagram.com/alexyerick/');
  };

  return (
    <View style={styles.container}>
      
      <ScrollView 
        style={styles.scrollView} 
        contentContainerStyle={styles.content}
      >
        <View style={[styles.containerView, isLandscape && styles.containerViewLandscape]}>
          {/* Header */}
          <Text style={[styles.header, isLandscape && styles.headerLandscape]}>
            INFORMACIÓN Y RECOMENDACIONES
          </Text>

          {/* General Info */}
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, isLandscape && styles.sectionTitleLandscape]}>Clima: <Text style={[styles.sectionText, isLandscape && styles.sectionTextLandscape]}> En San Luis Potosí en mayo, la temperatura promedio es de 25°C, aunque incluso en verano puede refrescar por la noche.</Text></Text>
          </View>
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, isLandscape && styles.sectionTitleLandscape]}>Zapatos: <Text style={[styles.sectionText, isLandscape && styles.sectionTextLandscape]}> Si van a recorrer el Centro Histórico, lo ideal es calzado cómodo por las calles empedradas.</Text></Text>
          </View>
          <Image
            source={require('@/assets/images/informacion/line.svg')}
            style={{ alignSelf: 'center', width: 40, height: 5 }}
            contentFit="contain"
          />
          <View style={styles.section}/>
          <View style={styles.section}/>
          {/* Sightseeing Info */}
          {/* Places of Interest */}
          <View style={styles.section}>
            <Text style={[styles.subHeader1, isLandscape && styles.subHeader1Landscape]}>Lugares de interés</Text>
            <Image
              source={require('@/assets/images/informacion/line.svg')}
              style={{ alignSelf: 'flex-start', width: 160, height: 5, left: 2, marginBottom: 5, marginTop: 10 }}
              contentFit="cover"
            />
            <Text style={[styles.subHeader1, isLandscape && styles.subHeader1Landscape]}>Recorridos por el Centro Histórico</Text>
            <Text style={[styles.bullet, isLandscape && styles.bulletLandscape]}>• Plaza de Aranzazú: <Text style={[styles.bulletText, isLandscape && styles.bulletTextLandscape]}>Un rincón icónico con fachadas amarillas, se encuentra lleno de pequeños cafés, bares y restaurantes pequeños con Vibes bohemias.</Text></Text>
            <Text style={[styles.bullet, isLandscape && styles.bulletLandscape]}>• Catedral Metropolitana: <Text style={[styles.bulletText, isLandscape && styles.bulletTextLandscape]}>Una joya barroca frente a la Plaza de Armas.</Text></Text>
            <Text style={[styles.bullet, isLandscape && styles.bulletLandscape]}>• Teatro de la Paz: <Text style={[styles.bulletText, isLandscape && styles.bulletTextLandscape]}>Uno de los teatros más bellos de México, ubicado en la Plaza del Carmen. </Text></Text>
            <Text style={[styles.bullet, isLandscape && styles.bulletLandscape]}>• Calzada de Guadalupe: <Text style={[styles.bulletText, isLandscape && styles.bulletTextLandscape]}>Un andador peatonal arbolado (el más largo de Latinoamérica) que llega hasta el Santuario de Guadalupe. </Text></Text>
          </View>

          {/* Museums */}
          <View style={styles.section}><View style={styles.section}/>
            <Text style={[styles.subHeader1, isLandscape && styles.subHeader1Landscape]}>Museos Imperdibles</Text>
            <Image source={require('@/assets/images/informacion/line.svg')}
              style={{ alignSelf: 'flex-start', width: 170, height: 5, left: 2, marginBottom: 5, marginTop: 10 }}
              contentFit="cover"/>
    
            <Text style={[styles.bullet, isLandscape && styles.bulletLandscape]}>• Museo Leonora Carrington: <Text style={[styles.bulletText, isLandscape && styles.bulletTextLandscape]}>Ubicado en el 
              CEART (antigua penitenciaría). Es un lugar mágico dedicado a la máxima exponente del surrealismo.</Text></Text>
            <Text style={[styles.bullet, isLandscape && styles.bulletLandscape]}>• Museo Federico Silva: <Text style={[styles.bulletText, isLandscape && styles.bulletTextLandscape]}>Especializado en 
              escultura contemporánea, con un edificio impresionante. .</Text></Text>
            <Text style={[styles.bullet, isLandscape && styles.bulletLandscape]}>• Museo del Virreinato: <Text style={[styles.bulletText, isLandscape && styles.bulletTextLandscape]}>Para los amantes de 
              la historia y el arte sacro. </Text></Text>
          </View>

          {/* Nature and Leisure */}
          <View style={styles.section}><View style={styles.section}/>
            <Text style={[styles.subHeader1, isLandscape && styles.subHeader1Landscape]}>Naturaleza y Esparcimiento </Text>
            <Image source={require('@/assets/images/informacion/line.svg')}
              style={{ alignSelf: 'flex-start', width: 240, height: 5, left: 2, marginBottom: 5, marginTop: 10 }}
              contentFit="cover"/>

            <Text style={[styles.bullet, isLandscape && styles.bulletLandscape]}>• Parque Tangamanga I: <Text style={[styles.bulletText, isLandscape && styles.bulletTextLandscape]}>Uno de los parques 
              urbanos más grandes de México. Perfecto para caminar o rentar una bicicleta. </Text></Text>
            <Text style={[styles.bullet, isLandscape && styles.bulletLandscape]}>• Pueblo Mágico de Santa María del Río: <Text style={[styles.bulletText, isLandscape && styles.bulletTextLandscape]}>(A 45 
              min de la ciudad). Cuna del rebozo de seda y famoso por sus campechanas (pan dulce).</Text></Text>
          </View>

          {/* Food */}
          <View style={styles.section}><View style={styles.section}/>
            <Text style={[styles.subHeader1, isLandscape && styles.subHeader1Landscape]}>Para Probar el Sabor Potosino </Text>
            <Image source={require('@/assets/images/informacion/line.svg')}
              style={{ alignSelf: 'flex-start', width: 260, height: 5, left: 2, marginBottom: 5, marginTop: 10 }} 
              contentFit="cover" />

            <Text style={[styles.bullet, isLandscape && styles.bulletLandscape]}>• Chocolates Costanzo: <Text style={[styles.bulletText, isLandscape && styles.bulletTextLandscape]}>Una parada obligatoria 
              en el Centro para comprar dulces típicos. </Text></Text>
            <Text style={[styles.bullet, isLandscape && styles.bulletLandscape]}>• Enchiladas Potosinas: <Text style={[styles.bulletText, isLandscape && styles.bulletTextLandscape]}>Las mejores se 
              encuentran en los alrededores de la Plaza España o en el Mercado Hidalgo.</Text></Text>
          </View>
          {/*  */}
          <Image source={require('@/assets/images/informacion/leaf1.svg')} style={styles.leaf} contentFit="contain" />
          {/*  */}

          <View style={styles.section}><View style={styles.section}/>
            <Text style={[styles.subHeader2, isLandscape && styles.subHeader2Landscape]}>CENTROS COMERCIALES</Text>
            <Image source={require('@/assets/images/informacion/line.svg')}
              style={{ alignSelf: 'flex-start', width: 190, height: 5, left: 2, marginBottom: 5, marginTop: 10 }} 
              contentFit="cover" />

            {/*Plaza San Luis*/}
            <View style={styles.section}>
              <Text style={[styles.subHeader3, isLandscape && styles.subHeader3Landscape]}>Plaza San Luis</Text>
              <Text style={[styles.ubicacionMall, isLandscape && styles.ubicacionMallLandscape]}>Blvd. Antonio Rocha Cordero 700 Fracc, Lomas del Tecnologico, 78216 San Luis Potosí, S.L.P.</Text>
              <Text style={[styles.descripcionMall, isLandscape && styles.descripcionMallLandscape]}>Es la plaza más completa y de perfil alto de la ciudad. Ideal si buscan marcas internacionales de renombre o una tienda departamental donde encuentren de todo.</Text>
              <Text style={[styles.bulletMall, isLandscape && styles.bulletMallLandscape]}> • Tiendas Departamentales: Liverpool y Sears (perfectas para camisas, zapatos o vestidos de última hora).</Text>
              <Text style={[styles.bulletMall, isLandscape && styles.bulletMallLandscape]}> • Moda y Formal: Zara, Massimo Dutti, Adolfo Domínguez y Julio (ropa femenina formal).</Text>
              <Text style={[styles.bulletMall, isLandscape && styles.bulletMallLandscape]}> • Básicos y Salud: Cuenta con un Sanborns (farmacia, regalos y perfumería).</Text>
              <Text style={[styles.bulletMall, isLandscape && styles.bulletMallLandscape]}> • Plus: Hay varias joyerías y ópticas.</Text>
            </View>
            {/*Plaza The Park*/}
            <View style={styles.section}>
              <Text style={[styles.subHeader3, isLandscape && styles.subHeader3Landscape]}>Plaza The Park</Text>
              <Text style={[styles.ubicacionMall, isLandscape && styles.ubicacionMallLandscape]}>Blvd. Antonio Rocha Cordero 157, 78295 San Luis Potosí, S.L.P.</Text>
              <Text style={[styles.descripcionMall, isLandscape && styles.descripcionMallLandscape]}>Es el centro comercial más nuevo y moderno de San Luis (estilo lifestyle center al aire libre). Tiene un ambiente muy agradable y marcas muy actuales.</Text>
              <Text style={[styles.bulletMall, isLandscape && styles.bulletMallLandscape]}> • Belleza y Maquillaje: Aquí se encuentra la única tienda Sephora de la ciudad, indispensable para cualquier emergencia de maquillaje o peinado.</Text>
              <Text style={[styles.bulletMall, isLandscape && styles.bulletMallLandscape]}> • Moda Internacional: Zara, Brooks Brothers,Tommy Hilfiger, Calvin Klein y Psycho Bunny, etc.</Text>
              <Text style={[styles.bulletMall, isLandscape && styles.bulletMallLandscape]}> • Accesorios: Parfois y Calzedonia (accesorios de último minuto).</Text>
            </View>
            {/*Plaza El Dorado*/}
            <View style={styles.section}>
              <Text style={[styles.subHeader3, isLandscape && styles.subHeader3Landscape]}>Plaza El Dorado</Text>
              <Text style={[styles.ubicacionMall, isLandscape && styles.ubicacionMallLandscape]}>Col del Valle, 78200 San Luis Potosí, S.L.P.</Text>
              <Text style={[styles.descripcionMall, isLandscape && styles.descripcionMallLandscape]}>Es la plaza con la ubicación más céntrica y tradicional de la zona poniente. Es muy práctica y fácil de recorrer si no quieren caminar demasiado.</Text>
              <Text style={[styles.bulletMall, isLandscape && styles.bulletMallLandscape]}> • Anclas Principales: Liverpool y Sanborns.</Text>
              <Text style={[styles.bulletMall, isLandscape && styles.bulletMallLandscape]}> • Moda Masculina: Aldo Conti (muy útil para trajes o camisas a precios accesibles) y sucursales de zapaterías como Capa de Ozono o Trender.</Text>
              <Text style={[styles.bulletMall, isLandscape && styles.bulletMallLandscape]}> • Servicios: Es excelente para servicios rápidos como bancos, cajeros automáticos y telefonía.</Text>
            </View>
          </View>


          {/*  */}
          <Image source={require('@/assets/images/informacion/leaf2.svg')} style={styles.leaf} contentFit="contain" />
          {/*  */}
          
          {/* Hotels */}
          <View style={[styles.hotelContainer, !isLandscape && styles.portraitHotelContainer]}>
            <Image
              source={require('@/assets/images/informacion/tablaHoteles.svg')}
              style={styles.hotelTable}
              contentFit="contain"
            />
          </View>
          {/* HairSalons */}
          <Image source={require('@/assets/images/informacion/discoBall.svg')} style={[styles.discoBall, !isLandscape && styles.portraitDiscoBall]} 
          contentFit="contain" />
          
          <Text style={[styles.header, isLandscape && styles.headerLandscape]}>Estéticas</Text>
          <View style={styles.section}>
            <View style={styles.salonGrid}>
              {[
                { name: '@estetica.vanloo' },
                { name: '@sunset_estetica' },
                { name: '@makeupbymarcela___' },
                { name: '@lepolish_sierraleona' },
                { name: '@lepolish_carranza' },
                { name: '@mariana.salazar.salon' },
                { name: '@lamaat_salon' },
                { name: '@natalia.lealhairmakeup' },
                { name: '@frida.salonslp' },
                { name: '@anilumakeup1' },
                { name: '@makeuplab.slp' },
                { name: '@monserratmontoya_makeupslp' },
                { name: '@kenialopezstudio' },
                { name: '@ppdonjuan' },
                { name: '@fre_dd' },
              ].map((salon, index) => {
                var url = "http://instagram.com/_u/" + salon.name.substring(1);
                return (
                  <Pressable key={index} style={isLandscape ? styles.salonCellLandscape : styles.salonCellPortrait}
                   onPress={() => Linking.openURL(url)}>
                    <Image
                      source={require('@/assets/images/informacion/ig_icon.svg')}
                      style={isLandscape ? styles.igIconLandscape : styles.igIconPortrait}
                      contentFit="contain"
                    />
                    <Text style={[styles.salonName, isLandscape && styles.salonNameLandscape]}>
                      {salon.name}
                    </Text>
                  </Pressable>
                );})}
            </View>
          </View>
             
          {/* Monogram */}
        <View style={[styles.monogramContainer, !isLandscape && styles.portraitMonogram]}>
          <Image
            source={require('@/assets/images/monogram_simple_darkgreen.svg')}
            style={styles.monogram}
            contentFit="contain"
          />
        </View>

        {/* Title */}
        <Text style={[styles.title, !isLandscape && styles.portraitTitle]}>
          ALEX RECIO & ERICK VILLA
        </Text>
          <View style={{height:200}}/>
        </View>
      </ScrollView>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F5F0',
    alignContent: 'center',
    alignItems: 'center',
    position: 'relative',
    zIndex: 15,
  },
  leaf: {
    width: 50,
    height: 50,
    alignSelf: 'center',
  },

  ///// Scroll View
  scrollView: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  containerView: {
    flex: 1,
    width: '100%',
    alignSelf: 'center',
  },
  containerViewLandscape: {
    width: '80%',
    marginTop: 50,
  },
  content: {
    padding: 30,
  },
  section: {
    marginBottom: 15,
  },
  
  // Content starts here
  header: {
    fontFamily: 'Raleway_900Black',
    fontSize: 16,
    letterSpacing: 3,
    color: '#000000',
    textAlign: 'center',
    marginBottom: 30,
  },
  // General info
  sectionTitle: {
    fontFamily: 'Raleway_900Black',
    fontSize: 12,
    letterSpacing: 2,
    marginBottom: 5,
    textAlign: 'center'
  },
  sectionText: {
    fontFamily: 'Raleway_600SemiBold',
    fontSize: 11,
    letterSpacing: 1,
    textAlign: 'center'
  },

  // Sightseeing Info
  subHeader1: {
    fontFamily: 'Raleway_600SemiBold',
    fontSize: 15,
    letterSpacing:2,
    color: '#000000',
    textAlign: 'left',
    marginTop: 0,
    marginBottom: 0,
  },
  bullet:{
    fontFamily: 'Raleway_600SemiBold',
    fontSize: 14,
    lineHeight: 16,
    textAlign: 'left',
    left: 10,
    marginTop: 5,
    marginBottom: 10,
  },
  bulletText:{
    fontFamily: 'Raleway_300Light',
    fontSize: 13,
    lineHeight: 16,
    textAlign: 'left',
  },

  // Malls
  subHeader2: {
    fontFamily: 'Raleway_800ExtraBold',
    fontSize: 15,
    letterSpacing:1,
    color: '#000000',
    textAlign: 'left',
    marginTop: 20,
    marginBottom: 0,
  },
  subHeader3: {
    fontFamily: 'Raleway_600SemiBold',
    fontSize: 13,
    letterSpacing:1,
    color: '#000000',
    textAlign: 'left',
    marginTop: 10,
    marginBottom: 2,
  },
 ubicacionMall: {
    fontFamily: 'Raleway_300Light_Italic',
    fontSize: 12,
    color: '#5A5A5A',
    textAlign: 'left',
    marginBottom: 2,
  },
  descripcionMall: {
    fontFamily: 'Raleway_600SemiBold',
    fontSize: 12,
    marginBottom: 5,
  },
  bulletMall: {
    fontFamily: 'Raleway_300Light',
    fontSize: 12,
    color: '#5A5A5A',
    textAlign: 'left',
    
  },

  // Hotels
  hotelContainer: {
    alignItems: 'center',
    marginVertical: 30,
    width: '70%',
    alignSelf: 'center',
    aspectRatio:0.49,
  },
  portraitHotelContainer: {
    width: '100%',
  },
  hotelTable: {
    alignSelf: 'center',
    width: '100%',
    aspectRatio:0.49,
  },
  discoBall: {
    width: "7%",
    height: "7%",
    alignSelf: 'center',
    marginTop: -60,
    marginBottom: -20,
  },
  portraitDiscoBall: {
    width: "20%",
    height: "15%",
    marginTop: -160,
    marginBottom: -120,
  },
  //Salons
  salonGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: '90%',
    alignSelf: 'center',
    justifyContent: 'space-between',
  },
  salonCellPortrait: {
    flexDirection: 'column',
    alignItems: 'center',
    width: '33%',
    aspectRatio: 1.75,
  },
  salonCellLandscape: {
    flexDirection: 'column',
    alignItems: 'center',
    width: '33%',
    aspectRatio: 3,
  },
  igIconLandscape: {
    width: "9%",
    aspectRatio: 1,
    marginRight: 8,
  },
  igIconPortrait: {
    width: "20%",
    aspectRatio: 1,
    marginRight: 8,
    marginTop: 8,
  },
  salonName: {
    fontFamily: 'Raleway_400Regular',
    fontSize: 8,
    marginTop: 8,
    color: '#000000',
    textDecorationLine: 'none',
  },

  monogramContainer: {
    alignSelf: 'center',
        width: 120,
    height: 120,
    marginBottom: 30,
  },
  portraitMonogram: {
        width: "25%",
    marginTop: 0,
    marginBottom: 10,
  },
  monogram: {
        width: '100%',
    height: '100%',
  },
  title: {
        fontFamily: 'Raleway_400Regular',
    fontSize: 20,
    letterSpacing: 6,
    color: '#000000',
    textAlign: 'center',
    marginBottom: 30,
  },
  portraitTitle: {
        fontSize: 14,
    letterSpacing: 3,
    marginBottom: 10,
  },




  // Landscape text styles (all font sizes +3)
  salonNameLandscape: {
    fontSize: 13,
  },
  headerLandscape: {
    fontSize: 19,
  },
  sectionTitleLandscape: {
    fontSize: 15,
  },
  sectionTextLandscape: {
    fontSize: 14,
  },
  subHeader1Landscape: {
    fontSize: 18,
  },
  bulletLandscape: {
    fontSize: 17,
    lineHeight: 19,
  },
  bulletTextLandscape: {
    fontSize: 16,
    lineHeight: 19,
  },
  subHeader2Landscape: {
    fontSize: 18,
  },
  subHeader3Landscape: {
    fontSize: 16,
  },
  ubicacionMallLandscape: {
    fontSize: 15,
  },
  descripcionMallLandscape: {
    fontSize: 15,
  },
  bulletMallLandscape: {
    fontSize: 15,
  },
});
