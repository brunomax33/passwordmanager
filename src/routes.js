import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { Home } from './pages/home';
import { Password } from './pages/passwords/index';
import { PasswordAuthScreen } from './pages/passwords/PasswordAuthScreen';
import { Welcome } from './pages/welcome/index';

import { Ionicons } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function PasswordStackScreen() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="AuthPassword"
        component={PasswordAuthScreen}
      />
      <Stack.Screen
        name="PasswordsList"
        component={Password}
      />
    </Stack.Navigator>
  );
}

export function Routes() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: '#392de9',
        tabBarInactiveTintColor: '#666',
        tabBarStyle: {
          backgroundColor: '#FFF',
          borderTopWidth: 0,
          elevation: 5,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: -3 },
          shadowOpacity: 0.1,
          shadowRadius: 3,
        },
        tabBarLabelStyle: {
          fontSize: 12,
        },
      }}
    >
      <Tab.Screen
        name="home"
        component={Home}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused, size, color }) => {
            if (focused) {
              return <Ionicons size={size} color={color} name='home' />;
            }
            return <Ionicons size={size} color={color} name='home-outline' />;
          },
        }}
      />

      <Tab.Screen
        name="Minhas Senhas"
        component={PasswordStackScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused, size, color }) => {
            if (focused) {
              return <Ionicons size={size} color={color} name='lock-closed' />;
            }
            return <Ionicons size={size} color={color} name='lock-closed-outline' />;
          },
        }}
      />

    </Tab.Navigator>
  );
}