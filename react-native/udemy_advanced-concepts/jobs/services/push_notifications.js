import { Permissions, Notifications } from 'expo';
import { AsyncStorage } from 'react-native';
import axios from 'axios';

const PUSH_ENDPOINT = 'http://rallycoding.herokuapp.com/api/tokens';

export default async () => {
  let previosToken = await AsyncStorage.getItem('pushToken');
  console.log('token: ', previosToken);
  if (previosToken) {
    return;
  }

  let { status } = await Permissions.askAsync(Permissions.REMOTE_NOTIFICATIONS);
  if (status !== 'granted') {
    return;
  }

  let token = await Notifications.getExponentPushTokenAsync();
  await axios.post(PUSH_ENDPOINT, { token: { token } });
  AsyncStorage.setItem('pushToken', token);
};
