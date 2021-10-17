import React, { useEffect, useState, useRef } from 'react';
import { View, Text, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import RegisterForm from '../../../components/Account/RegisterForm/RegisterForm.component';
import { styles } from './Register.style';
import Toast from 'react-native-root-toast';

export default function Register() {
  return (
    <KeyboardAwareScrollView>
      <Image
        source={require('../../../../assets/img/login.png')}
        resizeMode="contain"
        style={styles.imgLogo}
      />
      <View style={styles.formContainer}>
        <RegisterForm />
      </View>
    </KeyboardAwareScrollView>
  );
}
