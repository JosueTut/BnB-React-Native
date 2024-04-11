import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';



const Settings = () => {
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
            Settings
          </Text>

          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.section}>
                <Text style={styles.title}>Cuenta y Seguridad:</Text>
                <TouchableOpacity style={styles.layout}>
                  <View>
                    <Text style={styles.info}>Cuenta</Text>
                  </View>                
                </TouchableOpacity>
                <TouchableOpacity style={styles.layout}>
                  <View>
                    <Text style={styles.info}>Seguridad</Text>
                  </View>                
                </TouchableOpacity>
                <TouchableOpacity style={styles.layout}>
                  <View>
                    <Text style={styles.info}>Privacidad</Text>
                  </View>                
                </TouchableOpacity>
              </View>

              <View style={styles.section}>
                <Text style={styles.title}>Personalización y Preferencias:</Text>
                <TouchableOpacity style={styles.layout}>
                  <View>
                    <Text style={styles.info}>Tema</Text>
                  </View>                
                </TouchableOpacity>
                <TouchableOpacity style={styles.layout}>
                  <View>
                    <Text style={styles.info}>Notificaciones</Text>
                  </View>                
                </TouchableOpacity>
                <TouchableOpacity style={styles.layout}>
                  <View>
                    <Text style={styles.info}>Ajustes de Notificaciones</Text>
                  </View>                
                </TouchableOpacity>
              </View>

              <View style={styles.section}>
                <Text style={styles.title}>Gestión de Contenido:</Text>
                <TouchableOpacity style={styles.layout}>
                  <View>
                    <Text style={styles.info}>Contenido</Text>
                  </View>                
                </TouchableOpacity>
                <TouchableOpacity style={styles.layout}>
                  <View>
                    <Text style={styles.info}>Datos y Almacenamiento</Text>
                  </View>                
                </TouchableOpacity>
                <TouchableOpacity style={styles.layout}>
                  <View>
                    <Text style={styles.info}>Actualizaciones</Text>
                  </View>                
                </TouchableOpacity>
              </View>

              <View style={styles.section}>
                <Text style={styles.title}>Conexiones y Sincronización:</Text>
                <TouchableOpacity style={styles.layout}>
                  <View>
                    <Text style={styles.info}>Conexiones</Text>
                  </View>                
                </TouchableOpacity>
                <TouchableOpacity style={styles.layout}>
                  <View>
                    <Text style={styles.info}>Sincronización</Text>
                  </View>                
                </TouchableOpacity>
              </View>

              <View style={styles.section}>
                <Text style={styles.title}>Soporte y Ayuda:</Text>
                <TouchableOpacity style={styles.layout}>
                  <View>
                    <Text style={styles.info}>Ayuda y Soporte</Text>
                  </View>                
                </TouchableOpacity>
              </View>

              <View style={styles.section}>
                <Text style={styles.title}>Información y Acerca de:</Text>
                <TouchableOpacity style={styles.layout}>
                  <View>
                    <Text style={styles.info}>Acerca de</Text>
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
      width: 400,
      height: 40,
      borderRadius: 10,
      backgroundColor: '#f3f4f6',
      borderColor: '#9ca3af',
    },
    info: {
      width: 380,
      height: 55,
      fontWeight: '400',
      fontSize: 20,
      textAlign: 'justify',
      paddingTop: 5,
      paddingLeft: 30
    },
    title: {
      fontSize: 20,
      fontWeight: '600',
      paddingLeft: 20,
      paddingBottom: 10,
      width: 380  
    },
    section: {
      backgroundColor: '#e5e7eb',
      width: 380,
      alignItems: 'center',
      paddingTop: 5,
    }
  })

export default Settings;