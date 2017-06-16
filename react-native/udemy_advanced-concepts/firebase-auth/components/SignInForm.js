import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { FormLabel, FormInput, Button } from 'react-native-elements';
import axios from 'axios';
import firebase from 'firebase';

const ROOT_URL='https://us-central1-one-time-password-15ad1.cloudfunctions.net'

class SignInForm extends Component {
  state = { phone: '', code: '' };

  handleSubmit = async () => {
    const { phone, code } = this.state;

    try {
        let { data } = await axios.post(`${ROOT_URL}/verifyOneTimePassword`, { phone, code });

        // this signs us in with the JWT
        firebase.auth().signInWithCustomToken(data.token);
    } catch (err) {
      console.log(err);
    }
  }

  render() {
    return (
      <View>
        <View style={{ marginBottom: 10 }}>
          <FormLabel>Phone Number</FormLabel>
          <FormInput
            value={this.state.phone}
            onChangeText={phone => this.setState({ phone })}
          />
          <FormLabel>Code</FormLabel>
          <FormInput
            value={this.state.code}
            onChangeText={code => this.setState({ code })}
          />
        </View>
        <Button onPress={this.handleSubmit} title="Submit"/>
      </View>
    );
  }
}

export default SignInForm;
