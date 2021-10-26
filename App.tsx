import React from 'react';
import Navigation from './src/navigations/Navigation';
import { RootSiblingParent } from 'react-native-root-siblings';
import { LogBox } from 'react-native';

LogBox.ignoreLogs(['Setting a timer']);

export default function App() {
  return (
    <RootSiblingParent>
      <Navigation />
    </RootSiblingParent>
  );
}
