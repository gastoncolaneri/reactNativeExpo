import React from 'react';
import { Text, ScrollView, View, Image } from 'react-native';
import { styles } from './UserNotLogged.style';
import { Button } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';

export default function UserLogged() {
  const navigation = useNavigation();

  return (
    <ScrollView centerContent={true} style={styles.viewBody}>
      <Image
        source={require('../../../../assets/img/userNotLogged.jpg')}
        resizeMode="contain"
        style={styles.image}
      />
      <Text style={styles.title}>Consulta tu perfil</Text>
      <Text style={styles.description}>
        ¿Cómo describirías tu mejor restaurante? Busca y visualiza los mejores
        restaurantes de una forma sencilla. Votá cual te ha gustado más y
        comentá como ha sido tu experiencia
      </Text>
      <View style={styles.viewButton}>
        <Button
          raised={true}
          buttonStyle={styles.button}
          containerStyle={styles.containerButton}
          title="Ver mi perfil"
          onPress={() => navigation.navigate('login')}
        />
      </View>
    </ScrollView>
  );
}
