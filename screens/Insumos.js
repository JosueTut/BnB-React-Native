import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, ImageBackground } from 'react-native';


const Insumos = () => {
    return (
        <View style={styles.container}>
          <Text
            style={{
              fontSize: 30,
              textAlign: 'center',
              width: 400,
              height: 60,
              paddingTop: 10,
              fontWeight: 'bold',
              backgroundColor: '#d1d5db',
              marginBottom: 10
            }}
          >
            INSUMOS
          </Text>

          <ScrollView showsVerticalScrollIndicator={false}>

            <TouchableOpacity style={styles.layout}>
              <ImageBackground source={require('../imgs/cocina.jpg')} style={styles.image}>
                <View>
                  <Text style={styles.info}>Cocina</Text>
                </View> 
              </ImageBackground>               
            </TouchableOpacity>

            <TouchableOpacity style={styles.layout}>
              <ImageBackground source={require('../imgs/baño.jpg')} style={styles.image}>
                <View>
                  <Text style={styles.info}>Baño</Text>
                </View>
              </ImageBackground>                
            </TouchableOpacity>

            <TouchableOpacity style={styles.layout}>
              <ImageBackground source={require('../imgs/lavanderia.jpg')} style={styles.image}>
                <View>
                  <Text style={styles.info}>Lavandería</Text>
                </View> 
              </ImageBackground>               
            </TouchableOpacity>

            <TouchableOpacity style={styles.layout}>
              <ImageBackground source={require('../imgs/dormitorio.jpg')} style={styles.image}>
                <View>
                  <Text style={styles.info}>Dormitorio</Text>
                </View>  
              </ImageBackground>              
            </TouchableOpacity>

            <TouchableOpacity style={styles.layout}>
              <ImageBackground source={require('../imgs/sala.jpg')} style={styles.image}>
                <View>
                  <Text style={styles.info}>Sala de estar</Text>
                </View> 
              </ImageBackground>               
            </TouchableOpacity>

            <TouchableOpacity style={styles.layout}>
              <ImageBackground source={require('../imgs/comedor.jpg')} style={styles.image}>
                <View>
                  <Text style={styles.info}>Comedor</Text>
                </View>
              </ImageBackground>                
            </TouchableOpacity>

            <TouchableOpacity style={styles.layout}>
              <ImageBackground source={require('../imgs/pasillo.jpg')} style={styles.image}>
                <View>
                  <Text style={styles.info}>Entrada / Pasillo</Text>
                </View>
              </ImageBackground>                
            </TouchableOpacity>

            <TouchableOpacity style={styles.layout}>
              <ImageBackground source={require('../imgs/estudio.jpg')} style={styles.image}>
                <View>
                  <Text style={styles.info}>Estudio</Text>
                </View>  
              </ImageBackground>              
            </TouchableOpacity>

            <TouchableOpacity style={styles.layout}>
              <ImageBackground source={require('../imgs/jardin.jpg')} style={styles.image}>
                <View>
                  <Text style={styles.info}>Jardín</Text>
                </View> 
              </ImageBackground>               
            </TouchableOpacity>

            <TouchableOpacity style={styles.layout}>
              <ImageBackground source={require('../imgs/bodega.jpg')} style={styles.image}>
                <View>
                  <Text style={styles.info}>Bodega</Text>
                </View>   
              </ImageBackground>               
            </TouchableOpacity>

          </ScrollView>
        </View>
      )
}

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: 'column',
      alignItems: 'center',
      backgroundColor: '#f1f1f1',
      marginBottom: 25,
      marginTop: 35
    },
    layout: {
      width: 350,
      height: 75,
      marginTop: 15,
      borderRadius: 10,
      backgroundColor: '#e5e7eb',
      borderColor: '#9ca3af',
      borderWidth: 1
      
    },
    info: {
      width: 'width',
      height: 75,
      fontWeight: 'bold',
      fontSize: 20,
      textAlign: 'center',
      paddingTop: 20,
      borderRadius: 10,
    },
    image: {
      width: 348,
      height: 75,
      borderRadius: 40,
      resizeMode: 'contain'
    }, 
  })

export default Insumos;