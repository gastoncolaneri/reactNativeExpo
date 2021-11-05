import React, { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import { Icon } from 'react-native-elements';
import firebaseApp from '../../../utils/firebase';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import Toast from 'react-native-root-toast';
import Loader from '../../../components/Loader/Loader.component';
import { styles } from './AddRestaurant.style';
import colors from '../../../utils/colors';
import AddRestaurantForm from '../../../components/Restaurants/AddRestaurantForm/AddRestaurantForm.component';

export default function AddRestaurant(props: any) {
  const { navigation } = props;
  const auth = getAuth(firebaseApp);
  const [userLogin, setUserLogin] = useState<any | null>(null);
  const [loader, setLoader] = useState(false);
  const toastProps = { position: -100 };

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      user ? setUserLogin(true) : setUserLogin(false);
    });
  });

  return (
    <View style={styles.view}>
      <AddRestaurantForm />
    </View>
  );
}
