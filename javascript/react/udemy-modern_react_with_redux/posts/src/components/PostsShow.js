import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';
import { Link } from 'react-router-dom';

class PostsShow extends Component {
  componentDidMount() {
    this.props.fetchPost(this.getPostId());
  }

  render() {
    const { post } = this.props;

    if (!post) {
      return this.renderLoading();
    }

    return (
      <div className="PostsShow">
        <Link to="/">Back to Index</Link>
        <button
          className="btn btn-danger pull-xs-right"
          onClick={this.onDeleteClick}
        >
          Delete Post
        </button>
        <h1>
          {post.title}
        </h1>
        <h6>
          Categories: {post.categories}
        </h6>
        <p>
          {post.content}
        </p>
      </div>
    );
  }

  getPostId = () => {
    return this.props.match.params.id;
  };

  onDeleteClick = () => {
    this.props.deletePost(this.getPostId(), () => this.props.history.push('/'));
  };

  renderLoading() {
    return <div>Loading...</div>;
  }
}

const mapStateToProps = ({ posts }, ownProps) => {
  return { post: posts[ownProps.match.params.id] };
};

export default connect(mapStateToProps, actions)(PostsShow);
