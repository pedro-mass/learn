import React, { Component } from "react";
import { LocalStorage as Counter } from "./counter";
import "./App.css";

class App extends Component {
  render() {
    return (
      <div className="center">
        <Counter />
      </div>
    );
  }
}

export default App;
