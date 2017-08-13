import { SAVE_COMMENT } from '../actions/types';

export default function(state = [], action) {
  switch (action.type) {
    case SAVE_COMMENT:
      console.log(action);

      return [...state, action.payload];
  }

  return state;
}
