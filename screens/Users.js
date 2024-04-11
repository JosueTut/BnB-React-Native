import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';



const Users = () => {
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
            }}
          >
            USUARIOS
          </Text>

          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.section}>
              <Text style={styles.title}>Empleados</Text>
              <TouchableOpacity style={styles.layout}>
                <View>
                  <Text style={styles.info}>Usuario 1</Text>
                </View>                
              </TouchableOpacity>
              <TouchableOpacity style={styles.layout}>
                <View>
                  <Text style={styles.info}>Usuario 2</Text>
                </View>                
              </TouchableOpacity>
              <TouchableOpacity style={styles.layout}>
                <View>
                  <Text style={styles.info}>Usuario 3</Text>
                </View>                
              </TouchableOpacity>
            </View>
            
            <View style={styles.section}>
              <Text style={styles.title}>Clientes</Text>
              <TouchableOpacity style={styles.layout}>
                <View>
                  <Text style={styles.info}>Usuario 4</Text>
                </View>                
              </TouchableOpacity>
              <TouchableOpacity style={styles.layout}>
                <View>
                  <Text style={styles.info}>Usuario 5</Text>
                </View>                
              </TouchableOpacity>
              <TouchableOpacity style={styles.layout}>
                <View>
                  <Text style={styles.info}>Usuario 6</Text>
                </View>                
              </TouchableOpacity>
              <TouchableOpacity style={styles.layout}>
                <View>
                  <Text style={styles.info}>Usuario 7</Text>
                </View>                
              </TouchableOpacity>
            </View>

            <View style={styles.section}>
              <Text style={styles.title}>Auxiliares</Text>
              <TouchableOpacity style={styles.layout}>
                <View>
                  <Text style={styles.info}>Usuario 8</Text>
                </View>                
              </TouchableOpacity>
              <TouchableOpacity style={styles.layout}>
                <View>
                  <Text style={styles.info}>Usuario 9</Text>
                </View>                
              </TouchableOpacity>
              <TouchableOpacity style={styles.layout}>
                <View>
                  <Text style={styles.info}>Usuario 10</Text>
                </View>                
              </TouchableOpacity>
            </View>

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
      backgroundColor: '#f3f4f6',
      borderColor: '#9ca3af',
      borderWidth: 1
      
    },
    info: {
      width: 'width',
      height: 55,
      fontWeight: 'bold',
      fontSize: 20,
      textAlign: 'center',
      paddingTop: 20,
    },
    title: {
      fontSize: 20,
      textAlign: 'center',
    },
    section: {
      backgroundColor: '#e5e7eb',
      width: 380,
      alignItems: 'center',
      paddingTop: 10,
      paddingBottom: 15,
      marginTop: 15
    }
  })


export default Users;