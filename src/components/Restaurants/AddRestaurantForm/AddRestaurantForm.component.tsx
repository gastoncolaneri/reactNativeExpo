import React, { useEffect, useState } from 'react';
import { Text, View, ScrollView, Alert, Dimensions } from 'react-native';
import Toast from 'react-native-root-toast';
import { Icon, Avatar, Image, Input, Button } from 'react-native-elements';
import firebaseApp from '../../../utils/firebase';
import { getAuth } from 'firebase/auth';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import * as MediaLibrary from 'expo-media-library';
import * as ImagenPiker from 'expo-image-picker';
import { map, size, filter } from 'lodash';
import Loader from '../../../components/Loader/Loader.component';
import { styles } from './AddRestaurantForm.style';
import colors from '../../../utils/colors';

export default function AddRestaurantForm() {
  const storage = getStorage(firebaseApp);

  const [loader, setLoader] = useState(false);
  const toastProps = { position: -100 };
  const [formData, setFormData] = useState({
    nombre: '',
    direccion: '',
    descripcion: '',
  });
  const [imgSelected, setImgSelected] = useState<any>([]);
  console.log(imgSelected);

  const addRestaurant = () => {
    // Toast.show('El restaurante se ha creado exitosamente', toastProps);
  };

  const onChange = (event: any, type: string) => {
    setFormData({ ...formData, [type]: event.nativeEvent.text });
  };

  const imgSelect = async () => {
    const resultPermission = await MediaLibrary.requestPermissionsAsync();

    if (resultPermission.status === 'granted') {
      const result = await ImagenPiker.launchImageLibraryAsync({
        allowsEditing: true,
        aspect: [4, 3],
      });
      if (result.cancelled) {
        Toast.show('Selección de imagen cancelada', toastProps);
      } else {
        setLoader(true);
        setImgSelected([...imgSelected, result.uri]);
        setLoader(false);
        // uploadImg(result.uri);
      }
    } else {
      Toast.show(
        'Es necesario aceptar los permisos para ingresar a la galería',
        toastProps
      );
    }
  };

  const removeImg = (imgUri: any) => {
    Alert.alert(
      'Eliminar imagen',
      '¿Estás seguro que quieres eliminar la imagen?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Eliminar',
          onPress: () => {
            setImgSelected(filter(imgSelected, (imgUrl) => imgUrl !== imgUri));
          },
        },
      ],
      { cancelable: false }
    );
  };
  const uploadImg = async (uri: any) => {
    // const response = await fetch(uri);
    // const blob = await response.blob();
    // const imagenRef = ref(storage, `avatar/${uid}`);
    // uploadBytes(imagenRef, blob).then((snapshot) => {
    //   Toast.show('Imagen subida correctamente', toastProps);
    // });
    // const urlDescarga = await getDownloadURL(imagenRef);
    // await updateProfile(auth.currentUser, { photoURL: urlDescarga });
    // setLoader(false);
    // Toast.show('Imagen modificada exitosamente', toastProps);
  };
  return (
    <ScrollView style={styles.scrollView}>
      <View style={styles.viewForm}>
        <Input
          placeholder="Nombre del restaurante"
          containerStyle={styles.input}
          onChange={(e) => onChange(e, 'nombre')}
        />
        <Input
          placeholder="Dirección"
          containerStyle={styles.input}
          onChange={(e) => onChange(e, 'direccion')}
        />
        <Input
          placeholder="Descripción del restaurante"
          multiline={true}
          inputContainerStyle={styles.textArea}
          onChange={(e) => onChange(e, 'descripcion')}
        />
      </View>
      <View style={styles.viewImages}>
        {size(imgSelected) < 4 && (
          <Icon
            type="material-community"
            name="camera"
            color={colors.GENERAL}
            containerStyle={styles.containerIcon}
            onPress={imgSelect}
          />
        )}
        {map(imgSelected, (imageRestaurante, index) => (
          <Avatar
            key={index}
            containerStyle={styles.minImg}
            source={{ uri: imageRestaurante }}
            onPress={() => removeImg(imageRestaurante)}
          />
        ))}
      </View>
      <Button
        title="Crear Restaurante"
        onPress={addRestaurant}
        buttonStyle={styles.btnAddRestaurant}
      />
      <Loader isVisible={loader} text={'Creando restaurante'} />
    </ScrollView>
  );
}
