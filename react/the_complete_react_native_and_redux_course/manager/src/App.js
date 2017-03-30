import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import firebase from 'firebase';
import reducers from './reducers';
import LoginForm from './components/LoginForm';

class App extends Component {
  componentWillMount() {
    // Initialize Firebase
    const config = {
      apiKey: 'AIzaSyC7s4WVAjzAVLWgqzNbbrNRTfp4khEgoqE',
      authDomain: 'learn-reactnative-manager.firebaseapp.com',
      databaseURL: 'https://learn-reactnative-manager.firebaseio.com',
      storageBucket: 'learn-reactnative-manager.appspot.com',
      messagingSenderId: '350353979797'
    };
    firebase.initializeApp(config);
  }

  render() {
    return (
      <Provider store={createStore(reducers)}>
        <LoginForm />
      </Provider>
    );
  }
}

export default App;
