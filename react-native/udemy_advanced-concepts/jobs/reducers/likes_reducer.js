import _ from 'lodash';
import { LIKE_JOB, CLEAR_LIKED_JOB } from '../actions/types';

export default function(state = [], action) {
  switch (action.type) {
    case CLEAR_LIKED_JOB:
      return [];
    case LIKE_JOB:
      return _.uniqBy([
        ...state, action.payload
      ], 'jobkey');
    default:
      return state;
  }
};
