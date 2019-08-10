import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-community/async-storage';

import {
  KeyboardAvoidingView, //Evita que a cixa de text selecionada fique por baixo do teclado no iOS
  Image,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity // igual button mas sem estilo
} from 'react-native';

import api from '../services/api';

import logo from '../assets/logo.png'; // com os tamanhos @Xx na pasta, o ReactNative se engarrega de escolher o melhor formato

export default function Login ( { navigation }) {

  const [user, setUser ] = useState('');

  // Caso usuário já esteja logado, já redireciona direto para a tela de login usando o login salvo no storage
  useEffect( () => {
    AsyncStorage.getItem('user').then(user => {
      if(user){
        navigation.navigate('Main', { user } );
      }
    })
  }, []);

  async function handleSubmit() {

    const response = await api.post('/devs', { username: user });
    
    const { _id } = response.data;

    await AsyncStorage.setItem('user', _id);

    navigation.navigate('Main', { user: _id });
  }
  
  return (
    <KeyboardAvoidingView
      behavior='padding'
      enabled={Platform.OS === 'ios'}
      style={styles.container}
    >
      <Image source={logo} alt="Tindev" />
      <TextInput 
        placeholder="Digite o seu usuário no Github" 
        placeholderTextColor="#999"
        autoCapitalize="none"
        autoCorrect={false}
        style={styles.input}
        onChangeText={setUser}
      />
      <TouchableOpacity 
        onPress={handleSubmit}
        style={styles.button}
      >
        <Text style={styles.buttonText}>Enviar</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );

};

const styles = StyleSheet.create({
  container: {
    flex: 1, // por padrão, toda View já é display: flex e flex-direction: column
    backgroundColor: '#F5F5F5',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 30
  },
  input: {
    marginTop: 20,
    backgroundColor: '#FFF',
    borderColor: '#DDD',
    paddingHorizontal: 15,
    borderWidth: 1,
    borderRadius: 4,
    height: 48,
    fontSize: 16,
    color: '#666',
    alignSelf: 'stretch'
  },
  button:{
    marginTop: 10,
    borderRadius: 4,
    height: 46,
    backgroundColor: '#DF4723',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'stretch'
  },
  buttonText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 16,
  }
});
