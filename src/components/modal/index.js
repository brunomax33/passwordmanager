import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Pressable, Alert } from "react-native";
import { Feather } from '@expo/vector-icons';
import * as ExpoClipboard from 'expo-clipboard';

export function ModalPassword({ password, handleClose }) {

  async function handleCopyPassword() {
    await ExpoClipboard.setStringAsync(password); // Uso de ExpoClipboard.setStringAsync
    Alert.alert("Sucesso!", "Senha copiada para a área de transferência!");
    handleClose();
  }

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Senha Gerada</Text>

        <Pressable style={styles.innerPassword} onLongPress={handleCopyPassword}>
          <Text style={styles.text}>
            {password}
          </Text>
        </Pressable>

        <View style={styles.buttonArea}>
          <TouchableOpacity style={[styles.button, styles.buttonBack]} onPress={handleClose}>
            <Text style={styles.buttonText}>Voltar</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.button, styles.buttonCopy]} onPress={handleCopyPassword}>
            <Text style={styles.buttonText}>Copiar Senha</Text>
          </TouchableOpacity>
        </View>

      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "rgba(24,24,24,0.6)",
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    backgroundColor: "#FFF",
    width: "85%",
    padding: 24,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: "#000",
    marginBottom: 24,
  },
  innerPassword: {
    backgroundColor: "#0e0e0e",
    width: '90%',
    padding: 14,
    borderRadius: 8,
    marginBottom: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: "#FFF",
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
  },
  buttonArea: {
    flexDirection: 'row',
    width: '90%',
    justifyContent: 'space-between',
  },
  button: {
    flex: 1,
    alignItems: 'center',
    marginBottom: 14,
    padding: 8,
    borderRadius: 8,
  },
  buttonBack: {
    backgroundColor: '#6c757d',
    marginRight: 10,
  },
  buttonCopy: {
    backgroundColor: "#392de9",
  },
  buttonText: {
    fontWeight: 'bold',
    color: "#FFF",
  }
});