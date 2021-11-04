import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, Image } from 'react-native';
import { styles } from './Login.style';
import LoginForm from '../../../components/Account/LoginForm/LoginForm.component';

export default function Login(props: any) {
  const { navigation } = props;

  return (
    <ScrollView>
      <Image
        source={require('../../../../assets/img/login.png')}
        resizeMode="contain"
        style={styles.imgLogo}
      />
      <View style={styles.viewContainer}>
        <LoginForm props={props} />
      </View>
      <View style={styles.viewContainer}>
        <Text>
          ¿Aún no tenés una cuenta? {''}
          <Text
            style={styles.btnRegister}
            onPress={() => navigation.navigate('register')}
          >
            Registrate
          </Text>
        </Text>
      </View>
    </ScrollView>
  );
}
