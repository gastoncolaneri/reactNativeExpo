import React, { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import { Button } from 'react-native-elements';
import Toast from 'react-native-root-toast';
import firebaseApp from '../../../utils/firebase';
import { getAuth, signOut } from 'firebase/auth';
import { styles } from './UserLogged.style';
import UserInfo from '../../../components/Account/UserInfo/UserInfo.component';
import UserOptions from '../../../components/Account/UserOptions/UserOptions.component';

export default function UserLogged() {
  const [userInfo, setUserInfo] = useState({});
  const toastProps = { position: -100 };
  const auth = getAuth(firebaseApp);

  useEffect(() => {
    const user: any = auth.currentUser;
    setUserInfo(user);
  }, []);
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
    <View style={styles.userContainer}>
      <UserInfo userInfo={userInfo} />
      <UserOptions userInfo={userInfo} />
      <Button
        title="Cerrar sesión"
        buttonStyle={styles.btnCloseSession}
        onPress={() => {
          logOut();
        }}
      />
    </View>
  );
}
