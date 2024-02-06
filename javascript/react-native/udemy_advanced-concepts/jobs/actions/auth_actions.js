import { AsyncStorage } from 'react-native';
import { Facebook } from 'expo';

import secret from '../secret';

import {
  FACEBOOK_LOGIN_SUCCESS,
  FACEBOOK_LOGIN_FAIL
} from './types';

// Hoow to use AsyncStorage
// AsyncStorage.setItem('fb_token', token);
// AsyncStorage.getItem('fb_token');

const TOKEN_NAME = 'fb_token';

// asynchronous action creator
export const facebookLogin = () => async (dispatch) => {
  let token = await AsyncStorage.getItem(TOKEN_NAME);

  if (token) {
    // dispatch an action saying FB login is done
    dispatch({ type: FACEBOOK_LOGIN_SUCCESS, payload: token });
  } else {
    // start up FB Login process
    doFacebookLogin(dispatch);
  }
};

const doFacebookLogin = async (dispatch) => {
  let { type, token } = await Facebook.logInWithReadPermissionsAsync(secret.facebook.appId, {
    permissions: ['public_profile']
  });

  if (type === 'cancel') {
    return dispatch({ type: FACEBOOK_LOGIN_FAIL });
  }

  await AsyncStorage.setItem(TOKEN_NAME, token);
  dispatch({ type: FACEBOOK_LOGIN_SUCCESS, payload: token });
};
