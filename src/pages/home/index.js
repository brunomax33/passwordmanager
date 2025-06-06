import { useState, useCallback } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Modal, TextInput, Alert, Platform } from 'react-native';
import Slider from '@react-native-community/slider';
import { ModalPassword } from '../../components/modal';
import useStorage from '../../hooks/useStorage';

const generateUniqueId = () => {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
};

let charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+";

export function Home() {
  const [size, setSize] = useState(10);
  const [tempSize, setTempSize] = useState(10);
  const [passwordValue, setPasswordValue] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [description, setDescription] = useState('');

  const { saveItem } = useStorage();

  const generatePassword = useCallback(() => {
    let password = "";
    for (let i = 0; i < size; i++) {
      password += charset.charAt(Math.floor(Math.random() * charset.length));
    }
    setPasswordValue(password);
    setModalVisible(true);
  }, [size]);

  const handleSavePassword = useCallback(async () => {
    if (!passwordValue) {
      Alert.alert('Erro', 'Por favor, gere uma senha antes de salvar.');
      return;
    }

    if (!description.trim()) {
      Alert.alert('Erro', 'A descrição da senha é obrigatória!');
      return;
    }

    const newSavedPassword = {
      id: generateUniqueId(),
      password: passwordValue,
      description: description.trim(),
    };

    try {
      await saveItem(newSavedPassword);
      Alert.alert('Sucesso', 'Senha e descrição salvas com êxito!');
      setDescription('');
      setPasswordValue('');
      setModalVisible(false);
    } catch (error) {
      console.error("Erro ao salvar senha:", error);
      Alert.alert('Erro', 'Não foi possível salvar a senha. Tente novamente.');
    }
  }, [passwordValue, description, saveItem]);


  return (
    <View style={styles.container}>
      {/* IMAGEM DO CADEADO */}
      <Image
        source={require("../../components/assets/logo.png")} 
        style={styles.logo}
      />

      <Text style={styles.title}>{tempSize} caracteres</Text>

      <View style={styles.area}>
        <Slider
          style={styles.slider}
          minimumValue={6}
          maximumValue={20}
          maximumTrackTintColor='#ff0000'
          minimumTrackTintColor='#000'
          thumbTintColor='#392de9'
          value={tempSize}
          onValueChange={(value) => {
            setTempSize(Math.round(value));
          }}
          onSlidingComplete={(value) => {
            setSize(Math.round(value));
          }}
          step={1}
        />
      </View>

      <View style={styles.generatedPasswordArea}>
        <Text style={styles.generatedPasswordLabel}>Senha Gerada:</Text>
        <Text style={styles.generatedPasswordText}>
          {passwordValue || 'Nenhuma senha gerada'}
        </Text>
      </View>

      <TextInput
        style={styles.descriptionInput}
        placeholder="Descrição da Senha (obrigatório)"
        value={description}
        onChangeText={setDescription}
        maxLength={100}
      />

      <TouchableOpacity style={styles.button} onPress={generatePassword}>
        <Text style={styles.buttonText}>Gerar Senha</Text>
      </TouchableOpacity>

      <TouchableOpacity style={[styles.button, styles.saveButton]} onPress={handleSavePassword}>
        <Text style={styles.buttonText}>Salvar Senha</Text>
      </TouchableOpacity>

      <Modal visible={modalVisible} animationType='fade' transparent={true}>
        <ModalPassword
          password={passwordValue}
          handleClose={() => setModalVisible(false)}
        />
      </Modal>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F3F3F3",
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  logo: {
    marginBottom: 40,
    width: 150, 
    height: 150,
    resizeMode: 'contain',
  },
  area: {
    marginTop: 14,
    marginBottom: 14,
    width: "100%",
    backgroundColor: "#FFF",
    borderRadius: 8,
    padding: 8,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  slider: {
    height: 50,
    width: '100%',
  },
  generatedPasswordArea: {
    width: "100%",
    backgroundColor: "#E0E0E0",
    borderRadius: 8,
    padding: 10,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#CCC',
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  generatedPasswordLabel: {
    fontSize: 14,
    color: '#555',
    marginBottom: 5,
  },
  generatedPasswordText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
    textAlign: 'center',
    paddingHorizontal: 5,
  },
  descriptionInput: {
    width: "100%",
    height: 50,
    backgroundColor: "#FFF",
    borderRadius: 8,
    paddingHorizontal: 15,
    fontSize: 16,
    color: "#333",
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#ddd',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  button: {
    backgroundColor: "#392de9",
    width: "100%",
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
    marginBottom: 15,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  saveButton: {
    backgroundColor: "#28a745",
  },
  buttonText: {
    color: "#FFF",
    fontSize: 20,
    fontWeight: 'bold',
  }
});