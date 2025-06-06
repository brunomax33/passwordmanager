import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';

export function PasswordAuthScreen() {
  const [password, setPassword] = useState('');
  const navigation = useNavigation();

  const CORRECT_PASSWORD = '321'; // A SENHA PARA ACESSAR A LISTA DE SENHAS

  const handleLogin = () => {
    if (password === CORRECT_PASSWORD) {
      // Se a senha estiver correta, navega para a tela da lista de senhas
      navigation.replace('PasswordsList'); // Usa replace para não voltar para a tela de autenticação
      setPassword(''); // Limpa o campo da senha
    } else {
      Alert.alert('Erro', 'Senha incorreta. Tente novamente.');
      setPassword(''); // Limpa o campo para nova tentativa
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Image
          source={require("../../components/assets/logo.png")} // Seu logo
          style={styles.logo}
        />
        <Text style={styles.title}>Acesso Restrito</Text>
        <Text style={styles.subtitle}>Digite a senha para ver suas credenciais.</Text>

        <TextInput
          style={styles.input}
          placeholder="Senha de Acesso"
          secureTextEntry // Para esconder a senha digitada
          value={password}
          onChangeText={setPassword}
          keyboardType="numeric" // Sugere teclado numérico
        />

        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Entrar</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F3F3',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  content: {
    width: '100%',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#FFF',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  logo: {
    marginBottom: 30,
    width: 100, 
    height: 100,
    resizeMode: 'contain',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 30,
  },
  input: {
    width: '90%',
    height: 50,
    backgroundColor: '#E0E0E0',
    borderRadius: 8,
    paddingHorizontal: 15,
    fontSize: 18,
    color: '#333',
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#CCC',
  },
  button: {
    backgroundColor: "#392de9",
    width: "90%",
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  buttonText: {
    color: "#FFF",
    fontSize: 20,
    fontWeight: 'bold',
  },
});