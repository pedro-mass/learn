import { expect } from '../test_helper';
import { SAVE_COMMENT } from '../../src/actions/types';
import { saveComment } from '../../src/actions';

describe('actions', () => {
  describe('saveComment', () => {
    let action;
    const comment = 'New Comment';

    beforeEach(() => {
      action = saveComment(comment);
    });

    it('has the correct type', () => {
      expect(action.type).to.equal(SAVE_COMMENT);
    });
    it('has the correct payload', () => {
      expect(action.payload).to.equal(comment);
    });
  });
});
