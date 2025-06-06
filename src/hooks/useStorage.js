import AsyncStorage from "@react-native-async-storage/async-storage";

const useStorage = () => {
  const storageKey = "@passwords";

  const getItem = async () => {
    try {
      const passwords = await AsyncStorage.getItem(storageKey);
      return JSON.parse(passwords) || [];

    } catch (error) {
      console.log("Erro ao buscar senhas do storage:", error)
      return [];
    }
  }

  const saveItem = async (value) => {
    try {
      let passwords = await getItem();
      passwords.push(value);
      await AsyncStorage.setItem(storageKey, JSON.stringify(passwords));
      return passwords;

    } catch (error) {
      console.log("ERRO AO SALVAR SENHA: ", error)
    }
  }

  const removeItem = async (idToRemove) => {
    try {
      let passwords = await getItem();
      let myPasswords = passwords.filter((passwordItem) => {
        return (passwordItem.id !== idToRemove);
      });
      await AsyncStorage.setItem(storageKey, JSON.stringify(myPasswords));
      return myPasswords;

    } catch (error) {
      console.log("ERRO AO DELETAR SENHA: ", error)
    }
  }

  return {
    getItem,
    saveItem,
    removeItem
  }
}

export default useStorage;