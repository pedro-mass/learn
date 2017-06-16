import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { FormLabel, FormInput, Button } from 'react-native-elements';
import axios from 'axios';

const ROOT_URL='https://us-central1-one-time-password-15ad1.cloudfunctions.net'

class SignInForm extends Component {
  // constructor(props) {
  //   super(props);
  //
  //   this.state = { phone: '' };
  // }
  // this replaces the above with es7 syntax;
  state = { phone: '', code: '' };

  // handleSubmit() {
  //   console.log('submitting: ', this.state.phone);
  // }
  // this replaces the aboce with es7 syntax, and removes the need to bind this
  handleSubmit = async () => {
    const { phone, code } = this.state;

    try {
        let response = await axios.post(`${ROOT_URL}/verifyOneTimePassword`, { phone, code });
        console.log(response);
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
