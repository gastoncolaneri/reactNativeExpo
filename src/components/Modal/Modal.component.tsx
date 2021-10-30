import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import { Overlay } from 'react-native-elements';
import Toast from 'react-native-root-toast';
import firebaseApp from '../../utils/firebase';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { getAuth, updateProfile } from 'firebase/auth';
import { styles } from './Modal.style';
import Loader from '../Loader/Loader.component';

export default function Modal(props: any) {
  const { isVisible, setIsVisible, children } = props;

  const closeModal = () => setIsVisible(false);

  return (
    <Overlay
      isVisible={isVisible}
      overlayStyle={styles.overlay}
      onBackdropPress={closeModal}
    >
      {children}
    </Overlay>
  );
}
