import React, { useEffect, useState } from 'react';
import UserLogged from './UserLogged/UserLogged.screen';
import UserNotLogged from './UserNotLogged/UserNotLogged.screen';
import { firebaseApp } from '../../utils/firebase';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import Loader from '../../components/Loader/Loader.component';

export default function Account() {
  firebaseApp;
  const auth = getAuth();
  const [userLogin, setUserLogin] = useState<any | null>(null);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      user ? setUserLogin(true) : setUserLogin(false);
      console.log(userLogin);
    });
  }, [userLogin]);
  if (userLogin === null) return <Loader isVisible={true} text={'Cargando'} />;
  return userLogin ? <UserLogged /> : <UserNotLogged />;
}
