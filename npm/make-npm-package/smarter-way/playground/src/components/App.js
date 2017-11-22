import React from "react";
import PropTypes from "prop-types";

import { Button, Label } from "component-lib";

import "../assets/stylesheets/base.scss";

const App = ({ name }) => {
  return (
    <div>
      <Label size="small">Hello, {name}!</Label>
      <div>
        <Button bgColor="green" size="small">
          small
        </Button>
      </div>
      <div>
        <Button bgColor="yellow" size="medium">
          medium
        </Button>
      </div>
      <div>
        <Button bgColor="orange" size="large">
          large
        </Button>
      </div>
      <div>
        <Button size="wide">wide</Button>
      </div>
      <div>
        <Button bgColor="pink" size="extraWide">
          extra wide
        </Button>
      </div>
      <div>
        <Button bgColor="purple" size="fullWidth">
          full width
        </Button>
      </div>
    </div>
  );
};

App.propTypes = {
  name: PropTypes.string
};

export default App;
