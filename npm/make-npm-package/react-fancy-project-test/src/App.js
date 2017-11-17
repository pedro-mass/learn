import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";

import Fancy from "react-fancy-component";

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>

        <div>
          This is our Fancy component: <Fancy />
        </div>
      </div>
    );
  }
}

export default App;
