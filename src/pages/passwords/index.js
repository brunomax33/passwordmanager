import { useState, useEffect, useCallback } from "react";
import { View, Text, StyleSheet, FlatList, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useIsFocused, useFocusEffect } from "@react-navigation/native";
import useStorage from '../../hooks/useStorage';
import { PasswordItem } from './components/passworditem';


export function Password() {
  const [listPasswords, setListPasswords] = useState([]);
  const focused = useIsFocused();
  const { getItem, removeItem } = useStorage();

  useFocusEffect(
    useCallback(() => {
      async function loadPasswords() {
        const passwords = await getItem();
        setListPasswords(passwords);
      }
      loadPasswords();
    }, [focused])
  );

  async function handleDeletePassword(idToDelete) {
    Alert.alert(
      "Excluir senha",
      "Tem certeza que deseja excluir esta senha?",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Excluir",
          onPress: async () => {
            const updatedList = await removeItem(idToDelete);
            setListPasswords(updatedList);
            Alert.alert("Sucesso", "Senha deletada com sucesso!");
          },
          style: "destructive"
        }
      ]
    );
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.header}>
        <Text style={styles.title}>Minhas senhas</Text>
      </View>

      <View style={styles.content}>
        {listPasswords.length === 0 ? (
          <Text style={styles.noPasswordsText}>Nenhuma senha salva ainda.</Text>
        ) : (
          <FlatList
            style={{ flex: 1, paddingTop: 14 }}
            data={listPasswords}
            keyExtractor={(item) => String(item.id)}
            renderItem={({ item }) => (
              <PasswordItem
                data={item}
                removePassword={() => handleDeletePassword(item.id)}
              />
            )}
          />
        )}
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: "#392de9",
    paddingTop: 58,
    paddingBottom: 14,
    paddingLeft: 14,
    paddingRight: 14,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  title: {
    fontSize: 22,
    color: "#FFF",
    fontWeight: 'bold',
    textAlign: 'center',
  },
  content: {
    flex: 1,
    paddingLeft: 14,
    paddingRight: 14,
    paddingBottom: 14,
  },
  noPasswordsText: {
    fontSize: 16,
    color: '#777',
    textAlign: 'center',
    marginTop: 50,
  },
});