import React from "react";
import ReactDOM from "react-dom";
import SeasonDisplay from "./SeasonDisplay";
import Spinner from "./Spinner";
import useLat from "./useLat";

function App() {
  const [lat, errorMessage] = useLat();

  const content = errorMessage ? (
    <div>Error: {errorMessage}</div>
  ) : lat ? (
    <SeasonDisplay lat={lat} />
  ) : (
    <Spinner message="Please accept location request" />
  );

  return <div className="border red">{content}</div>;
}

ReactDOM.render(<App />, document.querySelector("#root"));
