import React from 'react';
import ReactDOM from 'react-dom';
import secret from './secret';

import SearchBar from './components/search_bar';

const API_KEY = secret.youtubeApiKey;

const App = () => {
  return (
    <div>
      <SearchBar />
    </div>
  );
}

ReactDOM.render(<App />, document.querySelector('.container'));
