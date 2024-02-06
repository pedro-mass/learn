import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import PostsIndex from './PostsIndex';
import PostsNew from './PostsNew';
import PostsShow from './PostsShow';

export default class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          {/* Hits the first url that matches (even partially) */}
          <Switch>
            {/* That's why we have the more specific route at the top */}
            <Route path="/posts/new" component={PostsNew} />
            {/* /:id - is a wild card. If this came before /new, it would
              match and not work like we expect */}
            <Route path="/posts/:id" component={PostsShow} />
            <Route path="/" component={PostsIndex} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}
