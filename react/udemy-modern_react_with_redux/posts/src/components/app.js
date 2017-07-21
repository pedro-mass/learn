import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import PostsIndex from './PostsIndex';
import PostsNew from './PostsNew';

export default class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          {/* Hits the first url that matches (even partially) */}
          <Switch>
            {/* That's why we have the more specific route at the top */}
            <Route path="/posts/new" component={PostsNew} />
            <Route path="/" component={PostsIndex} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}
