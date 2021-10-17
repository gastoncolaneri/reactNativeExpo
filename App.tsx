import React from 'react';
import Navigation from './src/navigations/Navigation';
import { RootSiblingParent } from 'react-native-root-siblings';

export default function App() {
  return (
    <RootSiblingParent>
      <Navigation />
    </RootSiblingParent>
  );
}
