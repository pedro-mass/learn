import React from "react";
import PropTypes from "prop-types";

import { Button } from "component-lib";

import "../assets/stylesheets/base.scss";

const App = ({ name }) => {
  return (
    <div>
      <h1>Hello, {name}!</h1>
      <Button bgColor="orange">Click Me!</Button>
    </div>
  );
};

App.propTypes = {
  name: PropTypes.string
};

export default App;
