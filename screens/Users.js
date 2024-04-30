import React, { useState, useEffect } from 'react';
import { View, StyleSheet, FlatList, Alert, Image  } from 'react-native';
import axios from 'axios';
import { Modal, Portal, Text, Button, PaperProvider, TextInput, Card, Avatar } from 'react-native-paper';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [visible, setVisible] = React.useState(false);
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
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [lastName, setLastName] = useState('');
  const [isEditMode, setIsEditMode] = useState(false);
  const [currentUserId, setCurrentUserId] = useState(null);

  const containerStyle = { backgroundColor: 'white', padding: 20 };
  const LeftContent = props => <Avatar.Icon {...props} icon="account-group" />


  const saveUser = async () => {
    try {
      const url = isEditMode ? `http://89.116.50.146:5600/api/users/${currentUserId}` : 'http://89.116.50.146:5600/api/users';
      const body = {
        name,
        lastName,
        userName,
        password,
        role: true
      };
      const method = isEditMode ? 'patch' : 'post';
      const response = await axios({ method, url, data: body });
        Alert.alert('Éxito', isEditMode ? 'Usuario actualizado con éxito' : 'Usuario creado con éxito');
        fetchUsers();
        hideModal();
        setIsEditMode(false);
        setCurrentUserId(null);
      
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'No se pudo realizar la operación');
    }
  };

  const deleteUser = async (_id) => {
    try {
      const url = `http://89.116.50.146:5600/api/users/${_id}`;
      const response = await axios.delete(url);
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
      console.log(response);
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
        {
          text: "Cancelar",
          style: "cancel"
        },
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
            <Card.Title title="Crear Usuario" subtitle="Rellene correctamente los campos" left={LeftContent} />
            <Card.Content>

              <TextInput
                label="Nombre de usuario"
                value={userName}
                onChangeText={setUserName}
              />
              <TextInput
                label="Contraseña"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                right={<TextInput.Icon name="eye" />}
              />
              <TextInput
                label="Nombre"
                value={name}
                onChangeText={setName}
              />
              <TextInput
                label="Apellido"
                value={lastName}
                onChangeText={setLastName}
              />
            </Card.Content>
            <Card.Actions>
              <Button onPress={hideModal}>Cancelar</Button>
              <Button onPress={saveUser}>{isEditMode ? 'Actualizar' : 'Crear'}</Button>
            </Card.Actions>
          </Card>


        </Modal>
      </Portal>
      <Button style={{ marginTop: 30 }} mode="elevated" onPress={showModal}>
        Crear usuario
      </Button>

      <View style={styles.containerBody}>
        <FlatList
          data={users}
          keyExtractor={(item) => item._id.toString()}
          renderItem={({ item }) => (
            <View style={styles.userContainer}>
              <Image
                source={{
                  uri: 'https://cdn-icons-png.flaticon.com/512/6073/6073873.png',
                }}
                style={{
                  width: 80,
                  height: 80,
                  borderRadius: 10,
                  marginVertical: 5
                }}
              />
              <Text style={styles.userName}>{item.userName}</Text>
              <Text style={styles.userDetail}>{`${item.name} ${item.lastName}`}</Text>
              <View style={styles.userContainerButtons}>
                <Button icon="account-edit" mode="contained-tonal" style={styles.buttons} onPress={() => {
                  setIsEditMode(true);
                  setCurrentUserId(item._id);
                  setUserName(item.userName);
                  setPassword('');
                  setName(item.name);
                  setLastName(item.lastName);
                  showModal();
                }}>Editar</Button>
                <Button
                  icon="account-remove"
                  mode="contained-tonal"
                  onPress={() => confirmDelete(item._id)}
                  color="#f44336"
                >
                  Eliminar
                </Button>
              </View>


            </View>
          )}
        />
      </View>

    </PaperProvider>

  );
};

// Estilos
const styles = StyleSheet.create({
  containerBody: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '10px',
  },
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f1f1f1',
    marginBottom: 25,
    marginTop: 35
  },
  userContainerButtons: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'row',
    margin: 4
  },
  buttons:{
    marginEnd:5
  },
  userContainer: {
    width: 350,
    marginTop: 15,
    borderRadius: 10,
    backgroundColor: '#f3f4f6',
    borderColor: '#9ca3af',
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  userName: {
    fontWeight: 'bold',
    fontSize: 20
  },
  userDetail: {
    fontSize: 18
  }
});

export default Users;
