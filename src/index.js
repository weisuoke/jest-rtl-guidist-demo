import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Link } from "react-router-dom";
import Routes from "./Routes";

const App = () => {
  return (
    <div>
      React
      <Router>
        <Link to="/todos/mobx">Mobx Todos</Link>
        <Routes />
      </Router>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
