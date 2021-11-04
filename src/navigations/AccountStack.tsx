import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Account from '../screens/Account/Accounts';
import Login from '../screens/Account/Login/Login.screen';
import Register from '../screens/Account/Register/Register.screen';
import UserLogged from '../screens/Account/UserLogged/UserLogged.screen';
import UserNotLogged from '../screens/Account/UserNotLogged/UserNotLogged.screen';

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
      <Stack.Screen
        name="userLogged"
        component={UserLogged}
        options={{ title: 'Mi cuenta' }}
      />
      <Stack.Screen
        name="userNotLogged"
        component={UserNotLogged}
        options={{ title: 'Mi cuenta' }}
      />
    </Stack.Navigator>
  );
}
