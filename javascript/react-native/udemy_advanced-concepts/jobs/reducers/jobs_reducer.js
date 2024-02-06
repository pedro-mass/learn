import {
  FETCH_JOBS
} from '../actions/types';

const INITIAL_STATE = {
  results: []
}

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case FETCH_JOBS:
      console.log(`reducing ${FETCH_JOBS}: `, action.payload);

      return action.payload;
    default:
      return state;
  }
};
