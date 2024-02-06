import React, { Component } from 'react';
import { connect } from 'react-redux';

class BookDetail extends Component {
  render() {
    if (!this.props.book) {
      return <p>Select a book to get started</p>;
    }

    return (
      <div>
        <h3>Details for:</h3>
        <p>
          Title: {this.props.book.title}
        </p>
        <p>
          Pages: {this.props.book.pages}
        </p>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    book: state.activeBook
  };
};

export default connect(mapStateToProps)(BookDetail);
