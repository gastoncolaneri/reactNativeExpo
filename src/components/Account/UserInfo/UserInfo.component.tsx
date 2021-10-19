import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { View } from 'react-native';
import {
  Input,
  Icon,
  Button,
  Text,
  Avatar,
  Accessory,
} from 'react-native-elements';
import Toast from 'react-native-root-toast';
import { styles } from './UserInfo.style';
import Loader from '../../Loader/Loader.component';

export default function UserInfo(props: any) {
  const { userInfo } = props;
  const accesoryProps = { underlayColor: '#525' };
  console.log(userInfo);
  return (
    <View style={styles.infoContainer}>
      <Avatar
        rounded
        size="large"
        source={{
          uri: 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
        }}
      ></Avatar>
      <Text>Info USer</Text>
    </View>
  );
}
