import React, { Component } from 'react';
import { View, Text } from 'react-native';
import firebase from 'firebase';
import { Header, Button, Spinner, CardSection } from './components/common';
import LoginForm from './components/LoginForm';

class App extends Component {
  state = { loggedIn: null };

  componentWillMount() {
    firebase.initializeApp({
      apiKey: 'AIzaSyD1bJCnneRNebcKzPB7AqLUUziMito9eoM',
      authDomain: 'learn-react-authentication.firebaseapp.com',
      databaseURL: 'https://learn-react-authentication.firebaseio.com',
      storageBucket: 'learn-react-authentication.appspot.com',
      messagingSenderId: '743393443502'
    });

    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({ loggedIn: true });
      } else {
        this.setState({ loggedIn: false });
      }
    });
  }

  signOut() {
    firebase.auth().signOut();
  }

  renderContent() {
    switch (this.state.loggedIn) {
      case true:
        return (
          <View style={styles.logOutView}>
            <Button onPress={this.signOut}>Log Out</Button>
          </View>
        );
      case false:
        return <LoginForm />;
      default:
        return (
          <View style={styles.loadingView}>
            <Spinner size="large" />
          </View>
        );
    }
  }

  render() {
    return (
      <View>
        <Header text='Authentication' />

        {this.renderContent()}
      </View>
    );
  }
};

const styles = {
  logOutView: {
    flexDirection: 'row'
  },
  loadingView: {
    // couldn't find the proper way to center this
    marginTop: 300
  }
}

export default App;
