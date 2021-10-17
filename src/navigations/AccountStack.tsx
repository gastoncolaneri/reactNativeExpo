import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Account from '../screens/Account/Accounts';
import Login from '../screens/Account/Login/Login.screen';
import Register from '../screens/Account/Register/Register.screen';

const Stack = createStackNavigator();

export default function AccountStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="account"
        component={Account}
        options={{ title: 'Mi Cuenta' }}
      />
      <Stack.Screen
        name="login"
        component={Login}
        options={{ title: 'Iniciar sesión' }}
      />
      <Stack.Screen
        name="register"
        component={Register}
        options={{ title: 'Registrarse' }}
      />
    </Stack.Navigator>
  );
}
