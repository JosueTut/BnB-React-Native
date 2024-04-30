import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, Image, Alert } from 'react-native';
import axios from 'axios';
import { Modal, Portal, Text, Button, PaperProvider, TextInput } from 'react-native-paper';

const Alojamientos = () => {
  const [areas, setAreas] = useState([]);
  const [visible, setVisible] = React.useState(false);
  const [text, setText] = React.useState("");

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
      const response = await axios.post(url, body);

      setText('');
      fetchAreas();
      hideModal();
      alert('Área creada con éxito');


    } catch (error) {
      console.error("Error creating area: ", error);
      alert('Error al crear el área');
    }
  };
  const fetchAreas = async () => {
    try {
      const response = await axios.get('http://89.116.50.146:5600/api/areas');
      setAreas(response.data.allAreas);
    } catch (error) {
      console.error("Error fetching areas: ", error);
      alert('No se pudieron cargar las áreas');
    }
  };

  const deleteArea = async (areaId) => {
    try {
      const url = `http://89.116.50.146:5600/api/areas/${areaId}`;
      const response = await axios.delete(url);

      alert('Área eliminada con éxito');
      fetchAreas();

    } catch (error) {
      console.error("Error deleting area: ", error);
      alert('Error al eliminar el área');
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
          <Text variant="displaySmall" icon="home-city">Crear alojamiento</Text>

          <Image
            source={{
              uri: 'https://veigler.com/wp-content/uploads/2019/07/alojamientos.jpg',
            }}
            style={{
              width: 320,
              height: 200,
              borderRadius: 10,
              marginVertical: 13
            }}
          />
          <TextInput
            label="Nombre del area"
            value={text}
            onChangeText={text => setText(text)}
          />
          <Button mode="contained" onPress={registerArea}>Registrar alojamiento</Button>

        </Modal>
      </Portal>
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
        <Button mode="contained" onPress={showModal} style={{ marginTop: 30 }}>
          Crear alojamiento
        </Button>
        <ScrollView showsVerticalScrollIndicator={false}>
          {areas && areas.map((area, index) => (
            <View key={index} style={styles.layout}>
              <Image
                style={styles.image}
                source={require('../imgs/chicago.jpg')} />
              <Text style={styles.info}>
                {area.nameArea}
              </Text>
              <View style={styles.userContainerButtons}>
                <Button icon="delete" mode="contained-tonal" onPress={() => confirmDelete(area._id)}>
                  Eliminar
                </Button>
              </View>


            </View>

          ))}
        </ScrollView>
      </View>
    </PaperProvider>

  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: '#f1f1f1',
    marginBottom: 25,
    marginTop: 35
  },
  buttons: {
    marginEnd: 5
  },
  layout: {
    width: 350,
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
  },
  userContainerButtons: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    margin: 4
  },
})

export default Alojamientos;
