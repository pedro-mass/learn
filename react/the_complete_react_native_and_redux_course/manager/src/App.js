import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import firebase from 'firebase';
import reducers from './reducers';
import Router from './Router';

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
    const store = createStore(
      reducers,
      {}, // used for initializing state, but rarely used
      applyMiddleware(ReduxThunk)
    )

    return (
      <Provider store={store}>
        <Router />
      </Provider>
    );
  }
}

export default App;
