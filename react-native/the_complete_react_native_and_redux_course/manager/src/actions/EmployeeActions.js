import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';

import {
  EMPLOYEE_UPDATE,
  EMPLOYEE_CREATE,
  EMPLOYEES_FETCH_SUCCESS
} from './types';

export const employeeUpdate = ({ prop, value }) => {
  return {
    type: EMPLOYEE_UPDATE,
    payload: { prop, value }
  };
};

export const employeeCreate = ({ name, phone, shift }) => {
  const employeesRef = getEmployeesFirebaseRef();

  return (dispatch) => {
    employeesRef
      .push({ name, phone, shift })
      .then(() => {
        dispatch({ type: EMPLOYEE_CREATE });

        Actions.employeeList({ type: 'reset' });
      });
  };
};

export const employeesFetch = () => {
  const employeesRef = getEmployeesFirebaseRef();

  return (dispatch) => {
    employeesRef
      // runs whenever there's a change
      .on('value', snapshot => {
        dispatch({
          type: EMPLOYEES_FETCH_SUCCESS,
          payload: snapshot.val()
        });
      });
  };
};

const getEmployeesFirebaseRef = () => {
  const { currentUser } = firebase.auth();

  return firebase.database().ref(`/users/${currentUser.uid}/employees`);
};
