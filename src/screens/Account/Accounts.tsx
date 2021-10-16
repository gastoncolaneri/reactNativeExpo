import React, { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import UserLogged from './UserLogged';
import UserNotLogged from './UserNotLogged';
import { firebaseApp } from '../../utils/firebase';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

export default function Account() {
  firebaseApp;
  const auth = getAuth();
  const [userLogin, setUserLogin] = useState<any | null>(null);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      userLogin ? setUserLogin(true) : setUserLogin(false);
    });
  }, []);
  if (userLogin === null) return <Text>Cargando..</Text>;
  return userLogin ? <UserLogged /> : <UserNotLogged />;
}
