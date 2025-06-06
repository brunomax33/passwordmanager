import React, { useState } from "react";
import { View, Text, StyleSheet, Pressable, TouchableOpacity, Alert } from "react-native";
import { Feather } from '@expo/vector-icons';
import * as Clipboard from 'expo-clipboard'; // Importar Clipboard

export function PasswordItem({ data, removePassword }) {
  const [visible, setVisible] = useState(false);

  async function handleCopyPassword() {
    await Clipboard.setStringAsync(data.password); // Uso de Clipboard.setStringAsync
    Alert.alert("Sucesso!", "Senha copiada para a área de transferência!");
  }

  function handleDelete() {
    Alert.alert(
      "Excluir senha",
      `Tem certeza que deseja excluir a senha com descrição: "${String(data.description || 'Sem descrição')}"?`,
      [
        { text: "Cancelar", style: "cancel" },
        { text: "Excluir", onPress: () => removePassword(data.id), style: "destructive" }
      ]
    );
  }

  return (
    <Pressable onLongPress={handleDelete} onPress={handleCopyPassword} style={styles.container}>
      <View style={styles.passwordDetails}>
        <Text style={styles.passwordText}>{visible ? String(data.password) : "••••••••••"}</Text>
        {data.description && (
          <Text style={styles.descriptionText}>Descrição: {String(data.description)}</Text>
        )}
      </View>

      <TouchableOpacity onPress={() => setVisible(!visible)} style={styles.eyeButton}>
        <Feather
          name={visible ? "eye-off" : "eye"}
          size={20}
          color="#FFF"
        />
      </TouchableOpacity>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#0e0e0e",
    padding: 14,
    width: "100%",
    marginBottom: 14,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  passwordDetails: {
    flex: 1,
    marginRight: 10,
  },
  passwordText: {
    color: "#FFF",
    fontSize: 18,
    fontWeight: 'bold',
  },
  descriptionText: {
    color: "#DDD",
    fontSize: 14,
    marginTop: 4,
  },
  eyeButton: {
    padding: 5,
  }
});