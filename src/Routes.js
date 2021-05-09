import React from "react";
import TodosMobx from "./application/TodosMobx/TodosMobx";

import { Switch, Route } from "react-router-dom";

const Routes = () => {
  return (
    <Switch>
      <Route exact path="/todos/mobx" component={TodosMobx} />
      <Route
        path="/index.html"
        render={() => {
          window.location.assign("/");
          return null;
        }}
      />
    </Switch>
  );
};

export default Routes;
