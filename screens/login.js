import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native'


const Login = () => {

  const navigation = useNavigation();

  return (
    <View>
      <Text
        style={{
          fontSize: 30,
          textAlign: 'center',
          marginTop: '20%'
        }}
      >
        Pagina de Login
      </Text>

      <TouchableOpacity
        onPress={() => navigation.navigate('Alojamientos')}
      >
        <Text>Presiona para ir a Alojamientos</Text>
      </TouchableOpacity>
    </View>
  )
}

export default Login;