// src/navigation/AppNavigator.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialIcons';

// Pantallas
import MapScreen from '../screens/map/MapScreen';
import ReportScreen from '../screens/emergency/ReportScreen';
import ProfileScreen from '../screens/profile/ProfileScreen';
import LoginScreen from '../screens/auth/LoginScreen';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const MapStack = () => (
  <Stack.Navigator initialRouteName="Map">
    <Stack.Screen
      name="Map"
      component={MapScreen}
      options={{ headerShown: false }}
    />
    {/* <Stack.Screen
      name="ReportEmergency"
      component={ReportScreen}
      options={{ headerShown: false }}
    /> */}
  </Stack.Navigator>
);

const MainTabs = () => (
  <Tab.Navigator
    screenOptions={{
      tabBarActiveTintColor: '#D32F2F',
      tabBarInactiveTintColor: '#757575',
      tabBarStyle: {
        paddingBottom: 5,
        paddingTop: 5,
      },
    }}
  >
    <Tab.Screen
      name="MapTab"
      component={MapStack}
      options={{
        title: 'Mapa',
        tabBarIcon: ({ color, size }) => (
          <Icon name="map" color={color} size={size} />
        ),
        headerShown: false,
      }}
    />
    <Tab.Screen
      name="ProfileTab"
      component={ProfileScreen}
      options={{
        title: 'Perfil',
        tabBarIcon: ({ color, size }) => (
          <Icon name="person" color={color} size={size} />
        ),
      }}
    />
  </Tab.Navigator>
);

const AppNavigator = () => {
  const isAuthenticated = true; // Esto vendría de un contexto de autenticación

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {isAuthenticated ? (
          <Stack.Screen
            name="Main"
            component={MainTabs}
            options={{ headerShown: false }}
          />
        ) : (
          <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={{ headerShown: false }}
          />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
