import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import { Input, Button, Icon } from 'react-native-elements';
import Toast from 'react-native-root-toast';
import { isEmpty } from 'lodash';
import firebaseApp from '../../../utils/firebase';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { getAuth, updateProfile, updateEmail } from 'firebase/auth';
import Loader from '../../Loader/Loader.component';
import { emailValidation } from '../../../utils/validations';
import { reauthenticate } from '../../../utils/firebaseRequests';

import { styles } from './UpdateEmail.style';
import colors from '../../../utils/colors';

export default function UpdateEmail(props: any) {
  const auth: any = getAuth(firebaseApp);
  const toastProps = { position: -100 };

  const { email, setShowModal, setReloadInfoUser } = props;
  const [errors, setErrors] = useState<any | null>({});
  const [loader, setLoader] = useState(false);
  const [emptyPass, setEmptyPass] = useState(true);
  const [showPass, setShowPass] = useState(false);
  const [formData, setFormData] = useState<any | null>({
    email: '',
    password: '',
  });

  const changeEmail = async () => {
    setErrors({});
    if (isEmpty(formData.email) || formData.email === email) {
      setErrors({ email: 'El email ingresado debe ser distinto al actual' });
    } else if (!emailValidation(formData.email)) {
      setErrors({ email: 'Por favor ingrese un email válido' });
    } else if (isEmpty(formData.password)) {
      setErrors({
        pass: 'La contraseña no puede estar vacía',
      });
    } else {
      setLoader(true);
      reauthenticate(formData.password)
        .then(async (response) => {
          await updateEmail(auth.currentUser, formData.email);
          setReloadInfoUser(true);
          setShowModal(false);
          setLoader(false);
          Toast.show('El email fue modificado exitosamente', toastProps);
        })
        .catch(() => {
          console.log(email);
          setLoader(false);
          setErrors({ pass: 'La contraseña no es correcta' });
        });
    }
  };

  const onChange = (event: any, type: string) => {
    setFormData({ ...formData, [type]: event.nativeEvent.text });
  };

  useEffect(() => {
    if (formData.password !== '') {
      setEmptyPass(false);
    } else {
      setEmptyPass(true);
    }
  }, [formData]);

  return (
    <View style={styles.view}>
      <Input
        placeholder="Correo electrónico"
        containerStyle={styles.input}
        rightIcon={{
          type: 'material-community',
          name: 'email-edit',
          color: colors.GENERAL,
        }}
        defaultValue={email || ''}
        onChange={(e) => onChange(e, 'email')}
        errorMessage={errors.email}
      />
      <Input
        placeholder="Contraseña"
        secureTextEntry={showPass ? false : true}
        containerStyle={styles.input}
        rightIcon={
          <Icon
            type="material-community"
            name={showPass ? 'eye-off-outline' : 'eye-outline'}
            iconStyle={emptyPass ? styles.iconHidden : styles.iconShowPass}
            onPress={() => setShowPass(!showPass)}
          />
        }
        onChange={(e) => onChange(e, 'password')}
        errorMessage={errors.pass}
      />
      <Button
        title="Cambiar correo electrónico"
        containerStyle={styles.btnContainer}
        buttonStyle={styles.btn}
        onPress={changeEmail}
        loading={loader}
      />
    </View>
  );
}
