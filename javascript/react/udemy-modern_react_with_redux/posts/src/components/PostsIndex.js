import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchPosts } from '../actions';

class PostsIndex extends Component {
  componentDidMount() {
    this.props.fetchPosts();
  }

  renderPosts() {
    return _.map(this.props.posts, post => {
      return (
        <li className="list-group-item" key={post.id}>
          <Link to={`posts/${post.id}`}>
            {post.title || 'No Title found'}
          </Link>
        </li>
      );
    });
  }

  render() {
    return (
      <div className="PostsIndex">
        <div className="text-xs-right">
          <Link className="btn btn-primary" to="posts/new">
            Add a Post
          </Link>
        </div>
        <h3>Posts</h3>
        <ul className="list-group">
          {this.renderPosts()}
        </ul>
      </div>
    );
  }
}

const mapStateToProps = ({ posts }) => {
  return { posts };
};

export default connect(mapStateToProps, { fetchPosts })(PostsIndex);
