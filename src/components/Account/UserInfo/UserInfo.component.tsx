import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { View } from 'react-native';
import { Input, Icon, Button, Text, Avatar } from 'react-native-elements';
import Toast from 'react-native-root-toast';
import firebaseApp from '../../../utils/firebase';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { getAuth, updateProfile } from 'firebase/auth';

import { styles } from './UserInfo.style';
import Loader from '../../Loader/Loader.component';
import colors from '../../../utils/colors';
import * as MediaLibrary from 'expo-media-library';
import * as ImagenPiker from 'expo-image-picker';

export default function UserInfo(props: any) {
  const storage = getStorage(firebaseApp);
  const auth: any = getAuth(firebaseApp);

  const {
    userInfo: { uid, photoURL, displayName, email },
  } = props;
  const accessoryProps = { underlayColor: colors.GENERAL, size: 25 };
  const toastProps = { position: -100 };
  const [loader, setLoader] = useState(false);

  const changeAvatar = async () => {
    const resultPermission = await MediaLibrary.requestPermissionsAsync();

    if (resultPermission.status === 'granted') {
      const result = await ImagenPiker.launchImageLibraryAsync({
        allowsEditing: true,
        aspect: [4, 3],
      });
      if (result.cancelled) {
        Toast.show('Selección de imagen cancelada', toastProps);
      } else {
        setLoader(true);
        uploadImg(result.uri);
      }
    } else {
      Toast.show(
        'Es necesario aceptar los permisos para ingresar a la galería',
        toastProps
      );
    }
  };

  const uploadImg = async (uri: any) => {
    const response = await fetch(uri);
    const blob = await response.blob();
    const imagenRef = ref(storage, `avatar/${uid}`);
    uploadBytes(imagenRef, blob).then((snapshot) => {
      Toast.show('Imagen subida correctamente', toastProps);
    });
    console.log(imagenRef);
    const urlDescarga = await getDownloadURL(imagenRef);
    console.log(urlDescarga);

    await updateProfile(auth.currentUser, { photoURL: urlDescarga });
    setLoader(false);
    Toast.show('Imagen modificada exitosamente', toastProps);
  };

  return (
    <View style={styles.infoContainer}>
      <Avatar
        rounded
        size="large"
        source={
          photoURL
            ? { uri: photoURL }
            : require('../../../../assets/img/logoUserDefault.png')
        }
        containerStyle={styles.userInfoAvatar}
      >
        <Avatar.Accessory {...accessoryProps} onPress={() => changeAvatar()} />
      </Avatar>
      <View>
        <Text style={styles.displayName}>
          {displayName ? displayName : 'Anónimo'}
        </Text>
        <Text>{email ? email : 'Socia Login'}</Text>
      </View>
      <Loader isVisible={loader} text={'Actualizando imagen'} />
    </View>
  );
}
