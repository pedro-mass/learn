import React, { Component } from 'react';
import { connect } from 'react-redux';

const CommentList = props => {
  const list = props.comments.map(comment =>
    <li key={comment}>
      {comment}
    </li>
  );

  return (
    <div className="comment-list">
      <ul>
        {list}
      </ul>
    </div>
  );
};

const mapStateToProps = state => {
  return { comments: state.comments };
};

export default connect(mapStateToProps)(CommentList);
