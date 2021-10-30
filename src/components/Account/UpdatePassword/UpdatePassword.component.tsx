import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { Input, Button, Icon } from 'react-native-elements';
import Toast from 'react-native-root-toast';
import { isEmpty, size } from 'lodash';
import firebaseApp from '../../../utils/firebase';
import { getAuth, updatePassword, signOut } from 'firebase/auth';
import { reauthenticate } from '../../../utils/firebaseRequests';
import { styles } from './UpdatePassword.style';

export default function UpdateEmail(props: any) {
  const auth: any = getAuth(firebaseApp);
  const toastProps = { position: -100, duration: Toast.durations.LONG };

  const { setShowModal, setReloadInfoUser } = props;
  const [errors, setErrors] = useState<any | null>({});
  const [loader, setLoader] = useState(false);
  const [emptyPass1, setEmptyPass1] = useState(true);
  const [emptyPass2, setEmptyPass2] = useState(true);
  const [emptyPass3, setEmptyPass3] = useState(true);
  const [showOldPass, setShowOldPass] = useState(false);
  const [showNewPass, setShowNewPass] = useState(false);
  const [showNewPassConfirmed, setShowNewPassConfirmed] = useState(false);
  const [formData, setFormData] = useState<any | null>({
    oldPassword: '',
    newPassword: '',
    newPasswordConfirmed: '',
  });

  const changeEmail = async () => {
    setErrors({});
    if (isEmpty(formData.oldPassword)) {
      setErrors({ oldPassword: 'La contraseña no puede estar vacía' });
    } else if (isEmpty(formData.newPassword)) {
      setErrors({ newPassword: 'La contraseña no puede estar vacía' });
    } else if (isEmpty(formData.newPasswordConfirmed)) {
      setErrors({ newPasswordConfirmed: 'La contraseña no puede estar vacía' });
    } else if (formData.oldPassword === formData.newPasswordConfirmed) {
      setErrors({
        newPasswordConfirmed:
          'La nueva contraseña debe ser distinta a la antigua',
      });
    } else if (size(formData.newPasswordConfirmed) < 8) {
      setErrors({
        newPasswordConfirmed:
          'La contraseña debe contener al menos 8 caracteres',
      });
    } else if (formData.newPassword !== formData.newPasswordConfirmed) {
      setErrors({
        newPassword: 'Las contraseñas no coinciden',
        newPasswordConfirmed: 'Las contraseñas no coinciden',
      });
    } else {
      setLoader(true);
      await reauthenticate(formData.oldPassword)
        .then(async (response) => {
          await updatePassword(auth.currentUser, formData.newPasswordConfirmed);
          setReloadInfoUser(true);
          setShowModal(false);
          setLoader(false);
          Toast.show(
            'Su contraseña ha sido actualizada. Por favor, ingrese nuevamente.',
            toastProps
          );
          await signOut(auth).catch(() => {
            Toast.show(
              'Ha ocurrido un error, por favor vuelva a intentarlo',
              toastProps
            );
          });
        })
        .catch(() => {
          setLoader(false);
          setErrors({ oldPassword: 'La contraseña no es correcta' });
        });
    }
  };

  const onChange = (event: any, type: string) => {
    setFormData({ ...formData, [type]: event.nativeEvent.text });
  };

  useEffect(() => {
    if (formData.oldPassword !== '') {
      setEmptyPass1(false);
    } else {
      setEmptyPass1(true);
    }
    if (formData.newPassword !== '') {
      setEmptyPass2(false);
    } else {
      setEmptyPass2(true);
    }
    if (formData.newPasswordConfirmed !== '') {
      setEmptyPass3(false);
    } else {
      setEmptyPass3(true);
    }
  }, [formData]);

  return (
    <View style={styles.view}>
      <Input
        placeholder="Contraseña antigua"
        secureTextEntry={showOldPass ? false : true}
        containerStyle={styles.input}
        rightIcon={
          <Icon
            type="material-community"
            name={showOldPass ? 'eye-off-outline' : 'eye-outline'}
            iconStyle={emptyPass1 ? styles.iconHidden : styles.iconShowPass}
            onPress={() => setShowOldPass(!showOldPass)}
          />
        }
        errorMessage={errors.oldPassword}
        onChange={(e) => onChange(e, 'oldPassword')}
      />
      <Input
        placeholder="Nueva contraseña"
        secureTextEntry={showNewPass ? false : true}
        containerStyle={styles.input}
        rightIcon={
          <Icon
            type="material-community"
            name={showNewPass ? 'eye-off-outline' : 'eye-outline'}
            iconStyle={emptyPass2 ? styles.iconHidden : styles.iconShowPass}
            onPress={() => setShowNewPass(!showNewPass)}
          />
        }
        onChange={(e) => onChange(e, 'newPassword')}
        errorMessage={errors.newPassword}
      />
      <Input
        placeholder="Repetir nueva contraseña"
        secureTextEntry={showNewPassConfirmed ? false : true}
        containerStyle={styles.input}
        rightIcon={
          <Icon
            type="material-community"
            name={showNewPassConfirmed ? 'eye-off-outline' : 'eye-outline'}
            iconStyle={emptyPass3 ? styles.iconHidden : styles.iconShowPass}
            onPress={() => setShowNewPassConfirmed(!showNewPassConfirmed)}
          />
        }
        onChange={(e) => onChange(e, 'newPasswordConfirmed')}
        errorMessage={errors.newPasswordConfirmed}
      />
      <Button
        title="Actualizar contraseña"
        containerStyle={styles.btnContainer}
        buttonStyle={styles.btn}
        onPress={changeEmail}
        loading={loader}
      />
    </View>
  );
}
