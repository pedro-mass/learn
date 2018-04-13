import React from "react";
import { Link, Route } from "react-router-dom";

function Topic(props) {
  return (
    <div>
      <h3>{props.match.params.topicId}</h3>

      <pre>{JSON.stringify(props, null, 2)}</pre>
    </div>
  );
}

export default function Topics({ match }) {
  return (
    <div>
      <h2>Topics</h2>
      <ul>
        <li>
          <Link to={`${match.url}/rendering`}>Rendering with React</Link>
        </li>
        <li>
          <Link to={`${match.url}/components`}>Components</Link>
        </li>
        <li>
          <Link to={`${match.url}/props-v-state`}>Props vs State</Link>
        </li>
      </ul>

      <hr />
      <Route path={`${match.path}/:topicId`} component={Topic} />
      <Route exact path={match.path}>
        <p>please select a topic</p>
      </Route>
    </div>
  );
}
