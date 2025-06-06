import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { Welcome } from './src/pages/welcome';
import { Routes } from './src/routes'; // Rotas com as abas (Home, Password)

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Welcome" screenOptions={{ headerShown: false }}>
        <Stack.Screen
          name="Welcome"
          component={Welcome}
        />
        <Stack.Screen
          name="Tabs" // Nome da rota que contém as abas (Home e Senhas)
          component={Routes}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}