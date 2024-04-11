import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';

const TaskList = () => {
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
            TASKLIST
          </Text>

          
          <ScrollView showsVerticalScrollIndicator={false}>
            <TouchableOpacity style={styles.layout}>
              <View>
                <Text style={styles.info}>Lavar los platos</Text>
              </View>                
            </TouchableOpacity>
            <TouchableOpacity style={styles.layout}>
              <View>
                <Text style={styles.info}>Limpiar los baños</Text>
              </View>                
            </TouchableOpacity>
            <TouchableOpacity style={styles.layout}>
              <View>
                <Text style={styles.info}>Limpiar la cocina</Text>
              </View>                
            </TouchableOpacity>
            <TouchableOpacity style={styles.layout}>
              <View>
                <Text style={styles.info}>Cambiar las sábanas</Text>
              </View>                
            </TouchableOpacity>
            <TouchableOpacity style={styles.layout}>
              <View>
                <Text style={styles.info}>Vaciar la basura</Text>
              </View>                
            </TouchableOpacity>
            <TouchableOpacity style={styles.layout}>
              <View>
                <Text style={styles.info}>Limpiar los cristales</Text>
              </View>                
            </TouchableOpacity>
            <TouchableOpacity style={styles.layout}>
              <View>
                <Text style={styles.info}>Limpiar los pisos</Text>
              </View>                
            </TouchableOpacity>
            <TouchableOpacity style={styles.layout}>
              <View>
                <Text style={styles.info}>Hacer tarea de casa</Text>
              </View>                
            </TouchableOpacity>
            <TouchableOpacity style={styles.layout}>
              <View>
                <Text style={styles.info}>Lavar el coche </Text>
              </View>                
            </TouchableOpacity>
            <TouchableOpacity style={styles.layout}>
              <View>
                <Text style={styles.info}>Sacar a pasear el perro</Text>
              </View>                
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
      borderWidth: 1,
      
    },
    info: {
      width: 'width',
      height: 55,
      fontWeight: 'bold',
      fontSize: 20,
      textAlign: 'center',
      paddingTop: 20,
    }
})

export default TaskList;