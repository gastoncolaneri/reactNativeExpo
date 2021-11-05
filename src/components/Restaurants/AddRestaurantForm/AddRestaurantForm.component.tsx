import React, { useEffect, useState } from 'react';
import { Text, View, ScrollView, Alert, Dimensions } from 'react-native';
import Toast from 'react-native-root-toast';
import { Icon, Avatar, Image, Input, Button } from 'react-native-elements';
import firebaseApp from '../../../utils/firebase';
import { getAuth } from 'firebase/auth';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import * as MediaLibrary from 'expo-media-library';
import * as ImagenPiker from 'expo-image-picker';
import * as Location from 'expo-location';
import MapView, { Marker } from 'react-native-maps';
import { map, size, filter } from 'lodash';
import uuid from 'react-native-uuid';
import Loader from '../../../components/Loader/Loader.component';
import Modal from '../../Modal/Modal.component';
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
  const [isVisibleMap, setIsVisibleMap] = useState(false);
  const [location, setLocation] = useState<any>({
    latitude: 0,
    longitude: 0,
    latitudeDelta: 0.001,
    longitudeDelta: 0.001,
  });
  const [locationRestaurante, setLocationRestaurante] = useState<any>(null);

  const addRestaurant = () => {
    if (!formData.nombre || !formData.direccion || !formData.descripcion) {
      Toast.show('Todos los cambios son requeridos', toastProps);
    } else if (size(imgSelected) === 0) {
      Toast.show('El restaurante debe tener al menos una foto', toastProps);
    } else if (!locationRestaurante) {
      Toast.show('Debes seleccionar la ubicación del restaurante', toastProps);
    } else {
      setLoader(true);
      console.log('Ok!');
      uploadImg();
    }
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

  const confirmLocation = () => {
    setLocationRestaurante(location);
    Toast.show('Ubicación guardada correctamente', toastProps);
    setIsVisibleMap(false);
  };

  const positionRequest = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      Toast.show(
        'Es necesario aceptar los permisos de localización',
        toastProps
      );
    } else {
      const loc = await Location.getCurrentPositionAsync({});
      setLocation({
        latitude: loc.coords.latitude,
        longitude: loc.coords.longitude,
        latitudeDelta: 0.001,
        longitudeDelta: 0.001,
      });
    }
  };

  useEffect(() => {
    positionRequest();
  }, []);

  const uploadImg = async () => {
    const imageBlob: any = [];

    await Promise.all(
      map(imgSelected, async (image) => {
        const response = await fetch(image);
        const blob = await response.blob();
        const name = uuid.v4();
        const imagenRef = ref(storage, `restaurantes/${name}`);
        uploadBytes(imagenRef, blob).then((snapshot) => {
          setLoader(false);
          Toast.show('Imágenes subidas correctamente', toastProps);
        });
        console.log(imagenRef);
        const urlDescarga = await getDownloadURL(imagenRef);
        console.log(urlDescarga);
        imageBlob.push(urlDescarga);
      })
    );
    console.log(imageBlob);
  };
  return (
    <ScrollView style={styles.scrollView}>
      <View>
        <Image
          source={
            imgSelected[0]
              ? { uri: imgSelected[0] }
              : require('../../../../assets/img/imgNotFound.png')
          }
          style={styles.viewMainImg}
        />
      </View>
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
          rightIcon={{
            type: 'material-community',
            name: 'google-maps',
            color: locationRestaurante ? colors.GENERAL : colors.GREY,
            onPress: () => setIsVisibleMap(true),
          }}
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
      <Modal isVisible={isVisibleMap} setIsVisible={setIsVisibleMap}>
        {location ? (
          <MapView
            style={styles.mapStyle}
            initialRegion={location}
            showsUserLocation
            onRegionChange={(region) => setLocation(region)}
          >
            <Marker
              coordinate={{
                latitude: location.latitude,
                longitude: location.longitude,
              }}
              draggable
            />
          </MapView>
        ) : null}
        <View style={styles.viewMapBtn}>
          <Button
            title="Guardar ubicación"
            containerStyle={styles.viewBtnSave}
            buttonStyle={styles.btnSave}
            onPress={() => confirmLocation()}
          />
          <Button
            title="Cancelar"
            containerStyle={styles.viewBtnCancel}
            buttonStyle={styles.btnCancel}
            onPress={() => setIsVisibleMap(false)}
          />
        </View>
      </Modal>
    </ScrollView>
  );
}
