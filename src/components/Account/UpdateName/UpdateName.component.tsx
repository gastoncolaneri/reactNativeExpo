import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import { Input, Button } from 'react-native-elements';
import Toast from 'react-native-root-toast';
import firebaseApp from '../../../utils/firebase';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { getAuth, updateProfile } from 'firebase/auth';
import Loader from '../../Loader/Loader.component';
import { styles } from './UpdateName.style';
import colors from '../../../utils/colors';

export default function UpdateName(props: any) {
  const auth: any = getAuth(firebaseApp);
  const toastProps = { position: -100 };

  const { displayName, setShowModal, setReloadInfoUser } = props;
  const [newName, setNewName] = useState<any | null>(null);
  const [error, setError] = useState<any | null>(null);
  const [loader, setLoader] = useState(false);

  const changeName = async () => {
    setError(null);
    if (!newName) {
      setError('El nombre no puede estar vacío');
    } else if (newName === displayName) {
      setError('El nombre debe ser distinto al actual');
    } else {
      setLoader(true);
      await updateProfile(auth.currentUser, { displayName: newName });
      Toast.show('El nombre fue modificado exitosamente', toastProps);
      setReloadInfoUser(true);
      setShowModal(false);
      setLoader(false);
    }
  };

  return (
    <View style={styles.view}>
      <Input
        placeholder="Nombre y apellido"
        containerStyle={styles.input}
        rightIcon={{
          type: 'material-community',
          name: 'account-edit',
          color: colors.GENERAL,
        }}
        defaultValue={displayName || ''}
        onChange={(e) => setNewName(e.nativeEvent.text)}
        errorMessage={error}
      />
      <Button
        title="Cambiar nombre"
        containerStyle={styles.btnContainer}
        buttonStyle={styles.btn}
        onPress={changeName}
        loading={loader}
      />
    </View>
  );
}
