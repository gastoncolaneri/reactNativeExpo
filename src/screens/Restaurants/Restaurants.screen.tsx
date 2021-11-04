import React, { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import { Icon } from 'react-native-elements';
import firebaseApp from '../../utils/firebase';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useNavigation } from '@react-navigation/native';
import { styles } from './Restaurants.style';
import colors from '../../utils/colors';

export default function Restaurants(props: any) {
  const { navigation } = props;
  // const navigation = useNavigation();
  const auth = getAuth(firebaseApp);
  const [userLogin, setUserLogin] = useState<any | null>(null);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      user ? setUserLogin(true) : setUserLogin(false);
    });
  });

  return (
    <View style={styles.view}>
      <Text>Restaurantes</Text>
      {userLogin && (
        <Icon
          type="material-community"
          name="plus"
          color={colors.GENERAL}
          reverse
          containerStyle={styles.btnContainer}
          onPress={() => navigation.navigate('addRestaurant')}
        />
      )}
    </View>
  );
}
