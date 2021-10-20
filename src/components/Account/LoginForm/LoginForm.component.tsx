import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { View } from 'react-native';
import { Input, Icon, Button } from 'react-native-elements';
import Toast from 'react-native-root-toast';
import { size, isEmpty } from 'lodash';
import firebaseApp from '../../../utils/firebase';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { styles } from './LoginForm.style';
import { emailValidation } from '../../../utils/validations';
import Loader from '../../Loader/Loader.component';

export default function RegisterForm() {
  const [emptyPass, setEmptyPass] = useState(true);
  const [showPass, setShowPass] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [loader, setLoader] = useState(false);

  const toastProps = { position: -100 };
  const auth = getAuth(firebaseApp);
  const navigation = useNavigation();

  const onSubmit = () => {
    if (isEmpty(formData.email) || isEmpty(formData.password)) {
      Toast.show('Por favor complete su correo y contraseña', toastProps);
    } else if (!emailValidation(formData.email)) {
      Toast.show('Por favor ingrese un correo válido', toastProps);
    } else {
      setLoader(true);
      signInWithEmailAndPassword(auth, formData.email, formData.password)
        .then((userCredential) => {
          setLoader(false);
          navigation.navigate('account');
          //   const user = userCredential.user;
        })
        .catch(() => {
          setLoader(false);
          Toast.show('Correo o contraseña inválidos', toastProps);
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
            iconStyle={emptyPass ? styles.iconHidden : styles.iconShowPass}
            onPress={() => setShowPass(!showPass)}
          />
        }
        onChange={(e) => onChange(e, 'password')}
      />
      <Button
        title="Ingresar"
        containerStyle={styles.btnContainerRegister}
        buttonStyle={styles.btnLogin}
        onPress={() => {
          onSubmit();
        }}
      />
      <Loader isVisible={loader} text={'Ingresando a su cuenta'} />
    </View>
  );
}
