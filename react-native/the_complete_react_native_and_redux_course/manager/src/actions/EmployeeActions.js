import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';

import {
  EMPLOYEE_UPDATE,
  EMPLOYEE_CREATE,
  EMPLOYEES_FETCH_SUCCESS,
  EMPLOYEE_SAVE_SUCCESS
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

export const employeeSave = ({ name, phone, shift, uid }) => {
  const employeeRef = getEmployeesFirebaseRef(uid);

  return (dispatch) => {
    employeeRef
      .set({ name, phone, shift })
      .then(() => {
        dispatch({ type: EMPLOYEE_SAVE_SUCCESS });

        Actions.employeeList({ type: 'reset' });
      });
  };
};

export const employeeDelete = ({ uid }) => {
  const employeeRef = getEmployeesFirebaseRef(uid);

  return () => {
    employeeRef.remove()
      .then(() => {
        Actions.employeeList({ type: 'reset' });
      });
  };
};

const getEmployeesFirebaseRef = (uid) => {
  const { currentUser } = firebase.auth();

  let ref = `/users/${currentUser.uid}/employees`;

  if (uid) {
    ref += `/${uid}`;
  }

  return firebase.database().ref(ref);
};
