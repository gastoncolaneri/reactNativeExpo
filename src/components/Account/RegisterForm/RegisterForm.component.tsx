import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, Image } from 'react-native';
import { Input, Icon, Button } from 'react-native-elements';
import Toast from 'react-native-root-toast';
import { size, isEmpty } from 'lodash';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { styles } from './RegisterForm.style';
import { emailValidation } from '../../../utils/validations';
import Loader from '../../Loader/Loader.component';

export default function RegisterForm() {
  const [emptyPass1, setEmptyPass1] = useState(true);
  const [emptyPass2, setEmptyPass2] = useState(true);
  const [showPass, setShowPass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [loader, setLoader] = useState(false);

  const toastProps = { position: -100 };
  const auth = getAuth();
  const navigation = useNavigation();

  const onSubmit = () => {
    if (
      isEmpty(formData.email) ||
      isEmpty(formData.password) ||
      isEmpty(formData.confirmPassword)
    ) {
      Toast.show('Todos los campos son obligatorios', toastProps);
    } else if (!emailValidation(formData.email)) {
      Toast.show('Por favor ingrese un correo válido', toastProps);
    } else if (formData.password !== formData.confirmPassword) {
      Toast.show('Las contraseñas deben coincidir', toastProps);
    } else if (size(formData.password) < 8) {
      Toast.show(
        'La contraseña debe contener al menos 8 caracteres',
        toastProps
      );
    } else {
      setLoader(true);
      createUserWithEmailAndPassword(auth, formData.email, formData.password)
        .then((userCredential) => {
          // const user = userCredential.user;
          setLoader(false);

          navigation.navigate('account');
        })
        .catch(() => {
          setLoader(false);
          Toast.show('El correo ingresado ya se encuentra en uso', toastProps);
        });
    }
  };

  const onChange = (event: any, type: string) => {
    setFormData({ ...formData, [type]: event.nativeEvent.text });
  };

  useEffect(() => {
    if (formData.password !== '') {
      setEmptyPass1(false);
    } else {
      setEmptyPass1(true);
    }
    if (formData.confirmPassword !== '') {
      setEmptyPass2(false);
    } else {
      setEmptyPass2(true);
    }
  }, [formData]);

  return (
    <View style={styles.formContainer}>
      <Input
        placeholder="Correo Electrónico"
        containerStyle={styles.inputForm}
        leftIcon={
          <Icon
            type="material-community"
            name="email-outline"
            iconStyle={styles.iconInput}
          />
        }
        onChange={(e) => onChange(e, 'email')}
      />
      <Input
        placeholder="Contraseña"
        containerStyle={styles.inputForm}
        secureTextEntry={showPass ? false : true}
        leftIcon={
          <Icon
            type="material-community"
            name="lock-outline"
            iconStyle={styles.iconInput}
          />
        }
        rightIcon={
          <Icon
            type="material-community"
            name={showPass ? 'eye-off-outline' : 'eye-outline'}
            iconStyle={emptyPass1 ? styles.iconHidden : styles.iconShowPass}
            onPress={() => setShowPass(!showPass)}
          />
        }
        onChange={(e) => onChange(e, 'password')}
      />
      <Input
        placeholder="Confirmar contraseña"
        containerStyle={styles.inputForm}
        secureTextEntry={showConfirmPass ? false : true}
        leftIcon={
          <Icon
            type="material-community"
            name="lock-outline"
            iconStyle={styles.iconInput}
          />
        }
        rightIcon={
          <Icon
            type="material-community"
            name={showConfirmPass ? 'eye-off-outline' : 'eye-outline'}
            iconStyle={emptyPass2 ? styles.iconHidden : styles.iconShowPass}
            onPress={() => setShowConfirmPass(!showConfirmPass)}
          />
        }
        onChange={(e) => onChange(e, 'confirmPassword')}
      />
      <Button
        title="Registrarse"
        containerStyle={styles.btnContainerRegister}
        buttonStyle={styles.btnRegister}
        onPress={() => {
          onSubmit();
        }}
      />
      <Loader isVisible={loader} text={'Creando su cuenta'} />
    </View>
  );
}
