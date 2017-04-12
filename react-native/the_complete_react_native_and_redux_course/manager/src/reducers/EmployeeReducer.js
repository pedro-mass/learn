// import action
import {
  EMPLOYEES_FETCH_SUCCESS
} from '../actions/types';

// set up initial state
const INITIAL_STATE = {};

// function call
export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case EMPLOYEES_FETCH_SUCCESS:
      return action.payload;
    default:
      return state;
  }
};
