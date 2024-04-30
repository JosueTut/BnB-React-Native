import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, Image, Alert } from 'react-native';
import axios from 'axios';
import { Modal, Portal, Text, Button, PaperProvider, TextInput, Card, List } from 'react-native-paper';

const TaskList = () => {
  const [areas, setAreas] = useState([]);
  const [visible, setVisible] = React.useState(false);
  const [taskName, setTaskName] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [selectedAreaId, setSelectedAreaId] = useState(null);
  const [expanded, setExpanded] = React.useState(true);
  const handlePress = () => setExpanded(!expanded);

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  const containerStyle = { backgroundColor: 'white', padding: 20 };
  useEffect(() => {
    if (selectedAreaId) {
      showModal();
    }
  }, [selectedAreaId, areas]);
  useEffect(() => {
    fetchAreas();
  }, []);
  const fetchTasksForArea = async (areaId) => {
    try {
      const url = `http://89.116.50.146:5600/api/check/List/${areaId}`;
      const response = await axios.get(url);

      const updatedAreas = areas.map(area => {
        if (area._id === areaId) {
          return { ...area, tasks: response.data.findID };
        }
        return area;
      });
      setAreas(updatedAreas);

    } catch (error) {
      console.error("Error fetching tasks for area: ", error);
      Alert.alert('Error', 'No se pudieron cargar las tareas para el área');
    }
  };
  const handleCreateTask = async () => {
    if (!taskName || !taskDescription) {
      Alert.alert("Error", "Por favor, complete todos los campos.");
      return;
    }
    try {
      const url = `http://89.116.50.146:5600/api/check`;
      const body = { name: taskName, description: taskDescription, id_Area: selectedAreaId };
      await axios.post(url, body);
      setTaskName("");
      setTaskDescription("");
      fetchTasksForArea(selectedAreaId);
      hideModal();
      Alert.alert("Éxito", "Tarea creada con éxito.");
    } catch (error) {
      console.error("Error creating task: ", error);
      Alert.alert("Error", "No se pudo crear la tarea.");
    }
  };
  const handleShowTasks = (areaId) => {
    fetchTasksForArea(areaId);
    setSelectedAreaId(areaId);
    showModal();
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
  const deleteTask = async (taskId) => {
    try {
      const url = `http://89.116.50.146:5600/api/check/${taskId}`;
      await axios.delete(url);
      const updatedAreas = areas.map(area => {
        if (area._id === selectedAreaId) {
          const updatedTasks = area.tasks.filter(task => task._id !== taskId);
          return { ...area, tasks: updatedTasks };
        }
        return area;
      });
      setAreas(updatedAreas);
      Alert.alert("Éxito", "Tarea eliminada con éxito.");
    } catch (error) {
      console.error("Error deleting task: ", error);
      Alert.alert("Error", "No se pudo eliminar la tarea.");
    }
  };

  return (
    <PaperProvider>
      <Portal>
        <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={containerStyle}>
          <Text variant="titleLarge">Tareas del Alojamiento: {areas.find(area => area._id === selectedAreaId)?.nameArea}</Text>
          <List.Section>
            <List.Accordion
              title="Crear tarea"
              left={props => <List.Icon {...props} icon="plus" />}>
              <TextInput
                label="Nombre de la Tarea"
                value={taskName}
                onChangeText={setTaskName}
                style={{ marginBottom: 10 }}
              />
              <TextInput
                label="Descripción"
                value={taskDescription}
                onChangeText={setTaskDescription}
                multiline
              />
              <Button icon="plus" style={{ marginVertical: 20 }} mode="contained" onPress={handleCreateTask}>
                Crear tarea
              </Button>
            </List.Accordion>

          </List.Section>

          <ScrollView showsVerticalScrollIndicator={false}>
            {areas.find(area => area._id === selectedAreaId)?.tasks?.map((task, index) => (
              <Card key={index} style={{marginVertical: 5, padding:5}}>
                <Card.Content>
                  <Text>{task.name}</Text>
                  <Text>{task.description}</Text>
                </Card.Content>
                <Card.Actions>
                  <Button onPress={() => editTask(task._id)}>Editar</Button>
                  <Button onPress={() => deleteTask(task._id)}>Eliminar</Button>
                </Card.Actions>
              </Card>
            ))}
          </ScrollView>


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
          TaskList
        </Text>

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
                <Button onPress={() => handleShowTasks(area._id)} mode="contained-tonal">
                  Ver tareas
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

export default TaskList;
