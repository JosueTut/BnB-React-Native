import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image } from 'react-native';


const Alojamientos = () => {
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
              backgroundColor: '#d1d5db'
            }}
          >
            ALOJAMIENTOS
          </Text>

          <ScrollView showsVerticalScrollIndicator={false}>
            <TouchableOpacity style={styles.layout}>
              <Image 
                style={styles.image}
                source={require('../imgs/chicago.jpg')}
              />    
             <Text style={styles.info}>
                Cancún, Quintana Roo
             </Text>            
            </TouchableOpacity>

            <TouchableOpacity style={styles.layout}>
              <Image 
                style={styles.image}
                source={require('../imgs/bali.jpg')}
              />         
              <Text style={styles.info}>
                Tulum, Quintana Roo
              </Text>        
            </TouchableOpacity>

            <TouchableOpacity style={styles.layout}>
              <Image 
                style={styles.image}
                source={require('../imgs/casa1.webp')}
              />
              <Text style={styles.info}>
                Hol-box, Quintana Roo
              </Text>                 
            </TouchableOpacity>

            <TouchableOpacity style={styles.layout}>
              <Image 
                style={styles.image}
                source={require('../imgs/casa4.webp')}
              />              
              <Text style={styles.info}>
                Merida, Yucatan
              </Text>   
            </TouchableOpacity>

            <TouchableOpacity style={styles.layout}>
              <Image 
                style={styles.image}
                source={require('../imgs/casa5.webp')}
              />                
              <Text style={styles.info}>
                Cancún, Quintana Roo
              </Text> 
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
      height: 175,
      marginTop: 25,
      marginBottom: 25,
      borderRadius: 20,
    },
    image: {
      width: 348,
      height: 173,
      borderRadius: 20,
      resizeMode: 'stretch'
    }, 
    info: {
      height: 30,
      textAlign: 'center',
      fontSize: 20,
    }
  })

export default Alojamientos;