import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import { ListItem, Icon, Divider } from 'react-native-elements';
import Toast from 'react-native-root-toast';
import firebaseApp from '../../../utils/firebase';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { getAuth, updateProfile } from 'firebase/auth';
import { styles } from './UserOptions.style';
import Loader from '../../Loader/Loader.component';
import Modal from '../../Modal/Modal.component';
import UpdateName from '../UpdateName/UpdateName.component';
import UserInfo from '../UserInfo/UserInfo.component';
import UpdateEmail from '../UpdateEmail/UpdateEmail.component';
import UpdatePassword from '../UpdatePassword/UpdatePassword.component';

export default function UserOptions(props: any) {
  const {
    userInfo: { uid, photoURL, displayName, email },
    setReloadInfoUser,
  } = props;

  const [showModal, setShowModal] = useState(false);
  const [renderComponent, setRenderComponent] = useState<any | null>(null);

  const selectedOption = (key: any) => {
    switch (key) {
      case 'name':
        setRenderComponent(
          <UpdateName
            displayName={displayName}
            setShowModal={setShowModal}
            setReloadInfoUser={setReloadInfoUser}
          />
        );
        setShowModal(true);
        break;
      case 'email':
        setRenderComponent(
          <UpdateEmail
            email={email}
            setShowModal={setShowModal}
            setReloadInfoUser={setReloadInfoUser}
          />
        );
        setShowModal(true);
        break;
      case 'password':
        setRenderComponent(
          <UpdatePassword
            setShowModal={setShowModal}
            setReloadInfoUser={setReloadInfoUser}
          />
        );
        setShowModal(true);
        break;
      default:
        setRenderComponent(null);
        setShowModal(false);

        break;
    }
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
            <ListItem.Content key={i}>
              <ListItem.Title>{item.title}</ListItem.Title>
            </ListItem.Content>
            <Icon name="chevron-right" type="material-community" />
          </ListItem>
        </>
      ))}
      {renderComponent && (
        <Modal isVisible={showModal} setIsVisible={setShowModal}>
          {renderComponent}
        </Modal>
      )}
    </View>
  );
}
