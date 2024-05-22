import React, { useState, useEffect } from 'react';
import { View, StyleSheet, FlatList, Alert, Image } from 'react-native';
import axios from 'axios';
import { Modal, Portal, Text, Button, Provider as PaperProvider, TextInput, Card, Avatar } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons'; // Asegúrate de tener esta dependencia instalada

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [visible, setVisible] = useState(false);
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [lastName, setLastName] = useState('');
  const [isEditMode, setIsEditMode] = useState(false);
  const [currentUserId, setCurrentUserId] = useState(null);

  const showModal = () => setVisible(true);
  const hideModal = () => {
    setVisible(false);
    setIsEditMode(false);
    setCurrentUserId(null);
    setUserName('');
    setPassword('');
    setName('');
    setLastName('');
  };

  const containerStyle = { backgroundColor: 'white', padding: 20, borderRadius: 10 };

  const saveUser = async () => {
    try {
      const url = isEditMode ? `http://89.116.50.146:5600/api/users/${currentUserId}` : 'http://89.116.50.146:5600/api/users';
      const body = { name, lastName, userName, password, role: true };
      const method = isEditMode ? 'patch' : 'post';
      await axios({ method, url, data: body });
      Alert.alert('Éxito', isEditMode ? 'Usuario actualizado con éxito' : 'Usuario creado con éxito');
      fetchUsers();
      hideModal();
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'No se pudo realizar la operación');
    }
  };

  const deleteUser = async (_id) => {
    try {
      const url = `http://89.116.50.146:5600/api/users/${_id}`;
      await axios.delete(url);
      Alert.alert('Éxito', 'Usuario eliminado con éxito');
      fetchUsers();
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'No se pudo eliminar el usuario');
    }
  };

  const fetchUsers = async () => {
    try {
      const url = 'http://89.116.50.146:5600/api/users';
      const response = await axios.get(url);
      setUsers(response.data.users);
      setLoading(false);
    } catch (error) {
      Alert.alert('Error', 'No se pudo obtener los datos de los usuarios');
      console.error(error);
      setLoading(false);
    }
  };

  const confirmDelete = (_id) => {
    Alert.alert(
      "Eliminar Usuario",
      "¿Estás seguro de que quieres eliminar este usuario?",
      [
        { text: "Cancelar", style: "cancel" },
        { text: "Eliminar", onPress: () => deleteUser(_id) }
      ]
    );
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <PaperProvider>
      <Portal>
        <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={containerStyle}>
          <Card>
            <Card.Title
              title={isEditMode ? "Actualizar Usuario" : "Crear Usuario"}
              subtitle="Rellene correctamente los campos"
              left={(props) => <Avatar.Icon {...props} icon="account-group" />}
            />
            <Card.Content>
              <TextInput
                label="Nombre de usuario"
                value={userName}
                onChangeText={setUserName}
                style={styles.input}
              />
              <TextInput
                label="Contraseña"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                right={<TextInput.Icon name="eye" />}
                style={styles.input}
              />
              <TextInput
                label="Nombre"
                value={name}
                onChangeText={setName}
                style={styles.input}
              />
              <TextInput
                label="Apellido"
                value={lastName}
                onChangeText={setLastName}
                style={styles.input}
              />
            </Card.Content>
            <Card.Actions style={styles.modalActions}>
              <Button onPress={hideModal} style={styles.buttonCancel}>Cancelar</Button>
              <Button onPress={saveUser} mode="contained" style={styles.buttonSave}>{isEditMode ? 'Actualizar' : 'Crear'}</Button>
            </Card.Actions>
          </Card>
        </Modal>
      </Portal>
      <Button style={styles.createButton} mode="contained" onPress={showModal}>
        Crear usuario
      </Button>
      <View style={styles.containerBody}>
        <FlatList
          data={users}
          keyExtractor={(item) => item._id.toString()}
          renderItem={({ item }) => (
            <Card style={styles.userContainer}>
              <Image
                source={{ uri: 'https://cdn-icons-png.flaticon.com/512/6073/6073873.png' }}
                style={styles.userImage}
              />
              <Card.Content>
                <Text style={styles.userName}>{item.userName}</Text>
                <Text style={styles.userDetail}>{`${item.name} ${item.lastName}`}</Text>
              </Card.Content>
              <Card.Actions>
                <Button
                  icon="account-edit"
                  mode="contained-tonal"
                  style={styles.buttonEdit}
                  onPress={() => {
                    setIsEditMode(true);
                    setCurrentUserId(item._id);
                    setUserName(item.userName);
                    setPassword('');
                    setName(item.name);
                    setLastName(item.lastName);
                    showModal();
                  }}
                >
                  Editar
                </Button>
                <Button
                  icon="account-remove"
                  mode="contained-tonal"
                  style={styles.buttonDelete}
                  onPress={() => confirmDelete(item._id)}
                >
                  Eliminar
                </Button>
              </Card.Actions>
            </Card>
          )}
        />
      </View>
    </PaperProvider>
  );
};

const styles = StyleSheet.create({
  containerBody: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f9f9f9',
  },
  input: {
    marginBottom: 10,
  },
  modalActions: {
    justifyContent: 'flex-end',
    padding: 10,
  },
  buttonCancel: {
    marginRight: 10,
  },
  buttonSave: {
    backgroundColor: '#2B3A67',
  },
  createButton: {
    marginVertical: 20,
    backgroundColor: '#2B3A67',
  },
  userContainer: {
    marginVertical: 10,
    padding: 10,
    borderRadius: 10,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  userImage: {
    width: 80,
    height: 80,
    borderRadius: 10,
    alignSelf: 'center',
    marginVertical: 10,
  },
  userName: {
    fontWeight: 'bold',
    fontSize: 20,
    textAlign: 'center',
  },
  userDetail: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 10,
  },
  buttonEdit: {
    marginRight: 5,
  },
  buttonDelete: {
    backgroundColor: '#f44336',
  },
});

export default Users;
