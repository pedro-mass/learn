import { renderComponent, expect } from '../test_helper';
import CommentList from '../../src/components/CommentList';

describe('CommentList', () => {
  let component, props;

  beforeEach(() => {
    props = { comments: ['New Comment', 'Other New Comment'] };
    component = renderComponent(CommentList, null, props);
  });

  it('shows an LI for each comment', () => {
    expect(component.find('li').length).to.equal(props.comments.length);
  });

  it('shows each comment that is provided', () => {
    // this would fail on the first, and not run the rest of the tests
    // props.comments.forEach(comment => {
    //   expect(component).to.contain(comment);
    // });

    // this is the one the tutorial used
    expect(component).to.contain(props.comments[0]);
    expect(component).to.contain(props.comments[1]);
  });
});
