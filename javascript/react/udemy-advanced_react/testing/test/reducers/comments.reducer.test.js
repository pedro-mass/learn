import { expect } from '../test_helper';
import commentReducer from '../../src/reducers/comments.reducer';
import { SAVE_COMMENT } from '../../src/actions/types';

describe('Comments Reducer', () => {
  it('handles action with unknown type', () => {
    expect(commentReducer(undefined, {})).to.be.eql([]); // eql: used for deep equal comparison
  });

  it('action: SAVE_COMMENT', () => {
    const action = {
      type: SAVE_COMMENT,
      payload: 'new comment'
    };

    expect(commentReducer([], action)).to.eql([action.payload]);
  });
});
