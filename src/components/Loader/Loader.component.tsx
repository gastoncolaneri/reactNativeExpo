import React from 'react';
import { Text, View, ActivityIndicator } from 'react-native';
import { Overlay } from 'react-native-elements';
import { styles } from './Loader.style';

export default function Loader(props: any) {
  const { isVisible, text } = props;

  return (
    <Overlay
      isVisible={isVisible}
      overlayStyle={styles.overlay}
      backdropStyle={{}}
    >
      <View style={styles.view}>
        <ActivityIndicator size="large" color="#00a680" />
        {text ? <Text style={styles.text}>{text}</Text> : null}
      </View>
    </Overlay>
  );
}
