import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import { ListItem, Icon, Divider } from 'react-native-elements';
import Toast from 'react-native-root-toast';
import firebaseApp from '../../../utils/firebase';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { getAuth, updateProfile } from 'firebase/auth';
import { styles } from './UserOptions.style';
import Loader from '../../Loader/Loader.component';

export default function UserOptions(props: any) {
  const {
    userInfo: { uid, photoURL, displayName, email },
  } = props;

  const selectedOption = (key: any) => {
    console.log(key);
  };

  const list = [
    {
      title: 'Cambiar nombre y apellido',
      icon: 'account-edit',
      onPress: () => selectedOption('name'),
    },
    {
      title: 'Cambiar email',
      icon: 'email-edit',
      onPress: () => selectedOption('email'),
    },
    {
      title: 'Cambiar contraseña',
      icon: 'lock-reset',
      onPress: () => selectedOption('password'),
    },
  ];

  return (
    <View style={styles.infoContainer}>
      {list.map((item, i) => (
        <>
          <ListItem key={i} bottomDivider onPress={item.onPress}>
            <Icon
              name={item.icon}
              type="material-community"
              iconStyle={styles.iconInput}
            />
            <ListItem.Content>
              <ListItem.Title>{item.title}</ListItem.Title>
            </ListItem.Content>
            <Icon name="chevron-right" type="material-community" />
          </ListItem>
        </>
      ))}
    </View>
  );
}
