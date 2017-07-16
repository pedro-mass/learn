import React, { Component } from 'react';

const SearchBar = ({onSearchTermChange}) => {
  return (
    <div className="search-bar">
      <input
        onChange={event => onSearchTermChange(event.target.value)}/>
    </div>
  );
};

export default SearchBar;
