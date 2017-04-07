// index.ios.js - place code for ios

// import library to create Component
import React from 'react';
import { AppRegistry, View } from 'react-native';
import Header from './src/components/Header';
import AlbumList from './src/components/AlbumList';

// create Component
const App = () => (
  <View style={{ flex: 1 }}>
    <Header text="Albums!" />
    <AlbumList />
  </View>
);

// render Component
AppRegistry.registerComponent('albums', () => App);
