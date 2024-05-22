import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, Image, Alert } from 'react-native';
import axios from 'axios';
import { Modal, Portal, Text, Button, Provider as PaperProvider, TextInput, Card, IconButton } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons'; // Asegúrate de tener esta dependencia instalada

const Alojamientos = () => {
  const [areas, setAreas] = useState([]);
  const [visible, setVisible] = useState(false);
  const [text, setText] = useState("");

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  const containerStyle = { backgroundColor: 'white', padding: 20 };

  useEffect(() => {
    fetchAreas();
  }, []);

  const registerArea = async () => {
    try {
      const url = 'http://89.116.50.146:5600/api/areas';
      const body = { nameArea: text };
      await axios.post(url, body);
      setText('');
      fetchAreas();
      hideModal();
      Alert.alert('Éxito', 'Área creada con éxito');
    } catch (error) {
      console.error("Error creating area: ", error);
      Alert.alert('Error', 'Error al crear el área');
    }
  };

  const fetchAreas = async () => {
    try {
      const response = await axios.get('http://89.116.50.146:5600/api/areas');
      setAreas(response.data.allAreas);
    } catch (error) {
      console.error("Error fetching areas: ", error);
      Alert.alert('Error', 'No se pudieron cargar las áreas');
    }
  };

  const deleteArea = async (areaId) => {
    try {
      const url = `http://89.116.50.146:5600/api/areas/${areaId}`;
      await axios.delete(url);
      Alert.alert('Éxito', 'Área eliminada con éxito');
      fetchAreas();
    } catch (error) {
      console.error("Error deleting area: ", error);
      Alert.alert('Error', 'Error al eliminar el área');
    }
  };

  const confirmDelete = (areaId) => {
    Alert.alert(
      "Eliminar Área",
      "¿Estás seguro de que quieres eliminar esta área?",
      [
        {
          text: "Cancelar",
          style: "cancel"
        },
        { text: "Eliminar", onPress: () => deleteArea(areaId) }
      ]
    );
  };

  return (
    <PaperProvider>
      <Portal>
        <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={containerStyle}>
          <Text variant="titleLarge">Crear alojamiento</Text>
          <Image
            source={{ uri: 'https://veigler.com/wp-content/uploads/2019/07/alojamientos.jpg' }}
            style={styles.modalImage}
          />
          <TextInput
            label="Nombre del área"
            value={text}
            onChangeText={setText}
            style={styles.input}
          />
          <Button icon="plus" mode="contained" onPress={registerArea} style={styles.button}>
            Registrar alojamiento
          </Button>
        </Modal>
      </Portal>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Alojamientos</Text>
        </View>
        <Button icon="add" mode="contained" onPress={showModal} style={styles.createButton}>
          Crear alojamiento
        </Button>
        <ScrollView showsVerticalScrollIndicator={false}>
          {areas && areas.map((area, index) => (
            <Card key={index} style={styles.layout}>
              <Image
                style={styles.image}
                source={require('../imgs/chicago.jpg')}
              />
              <Text style={styles.info}>{area.nameArea}</Text>
              <View style={styles.userContainerButtons}>
                <Button icon="delete" mode="contained-tonal" onPress={() => confirmDelete(area._id)}>
                  Eliminar
                </Button>
              </View>
            </Card>
          ))}
        </ScrollView>
      </View>
    </PaperProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
    padding: 20,
  },
  header: {
    backgroundColor: '#2B3A67',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
    alignItems: 'center',
  },
  headerText: {
    fontSize: 24,
    color: '#fff',
    fontWeight: 'bold',
  },
  createButton: {
    marginVertical: 10,
    backgroundColor: '#2B3A67',
  },
  layout: {
    marginVertical: 15,
    borderRadius: 10,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  image: {
    width: '100%',
    height: 200,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  info: {
    fontSize: 20,
    textAlign: 'center',
    marginVertical: 10,
  },
  userContainerButtons: {
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 10,
  },
  modalImage: {
    width: 320,
    height: 200,
    borderRadius: 10,
    marginVertical: 13,
  },
  input: {
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#2B3A67',
  },
});

export default Alojamientos;
