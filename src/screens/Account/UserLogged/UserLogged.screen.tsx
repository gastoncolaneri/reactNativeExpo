import React from 'react';
import { Text, View } from 'react-native';
import { Button } from 'react-native-elements';
import Toast from 'react-native-root-toast';
import { getAuth, signOut } from 'firebase/auth';
import { styles } from './UserLogged.style';

export default function UserLogged() {
  const toastProps = { position: -100 };
  const auth = getAuth();

  const logOut = () => {
    signOut(auth)
      .then(() => {
        Toast.show('Ha cerrado sesión correctamente', toastProps);
      })
      .catch(() => {
        Toast.show(
          'Ha ocurrido un error, por favor vuelva a intentarlo',
          toastProps
        );
      });
  };

  return (
    <View>
      <Text>Usuario logueado</Text>
      <Button
        title="Cerrar sesión"
        onPress={() => {
          logOut();
        }}
      />
    </View>
  );
}
