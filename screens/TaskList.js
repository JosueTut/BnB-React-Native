import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, Image, Alert } from 'react-native';
import axios from 'axios';
import { Modal, Portal, Text, Button, Provider as PaperProvider, TextInput, Card, List, IconButton } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons'; // Asegúrate de tener esta dependencia instalada

const TaskList = () => {
  const [areas, setAreas] = useState([]);
  const [visible, setVisible] = useState(false);
  const [taskName, setTaskName] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [selectedAreaId, setSelectedAreaId] = useState(null);
  const [expanded, setExpanded] = useState(true);

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
      Alert.alert('Error', 'No se pudieron cargar las áreas');
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
              left={props => <List.Icon {...props} icon="plus" />}
            >
              <TextInput
                label="Nombre de la Tarea"
                value={taskName}
                onChangeText={setTaskName}
                style={styles.input}
              />
              <TextInput
                label="Descripción"
                value={taskDescription}
                onChangeText={setTaskDescription}
                multiline
                style={styles.input}
              />
              <Button icon="plus" mode="contained" onPress={handleCreateTask} style={styles.button}>
                Crear tarea
              </Button>
            </List.Accordion>
          </List.Section>
          <ScrollView showsVerticalScrollIndicator={false}>
            {areas.find(area => area._id === selectedAreaId)?.tasks?.map((task, index) => (
              <Card key={index} style={styles.card}>
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
        <View style={styles.header}>
          <IconButton icon="menu" size={30} onPress={() => {}} style={styles.menuIcon} color="#fff" />
          <Text style={styles.headerText}>Tasklist</Text>
          <IconButton icon="search" size={30} onPress={() => {}} style={styles.searchIcon} color="#fff" />
        </View>
        <View style={styles.filterCreateContainer}>
          <Button mode="contained" style={styles.filterButton}>
            <Icon name="filter-list" size={20} color="#fff" /> Filtrar
          </Button>

        </View>
        <ScrollView showsVerticalScrollIndicator={false}>
          {areas && areas.map((area, index) => (
            <View key={index} style={styles.layout}>
              <Image style={styles.image} source={require('../imgs/chicago.jpg')} />
              <Text style={styles.info}>{area.nameArea}</Text>
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
    backgroundColor: '#f9f9f9',
    padding: 20,
  },
  header: {
    backgroundColor: '#2B3A67',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerText: {
    fontSize: 24,
    color: '#fff',
    fontWeight: 'bold',
  },
  menuIcon: {
    backgroundColor: 'transparent',
  },
  searchIcon: {
    backgroundColor: 'transparent',
  },
  filterCreateContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  filterButton: {
    flex: 1,
    marginRight: 10,
    backgroundColor: '#2B3A67',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  createButton: {
    flex: 1,
    backgroundColor: '#2B3A67',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  layout: {
    marginVertical: 15,
    borderRadius: 20,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
    padding: 15,
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 10,
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
  card: {
    marginVertical: 5,
    padding: 5,
  },
  input: {
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#2B3A67',
    marginVertical: 10,
  },
});

export default TaskList;
