import * as React from "react";
import * as ReactDOM from "react-dom";

import { Home } from "./components/Home";

ReactDOM.render(<Home name="Max" age={27}/>, document.getElementById("app"));