import React from "react";
import TodosMobx from "./application/TodosMobx/TodosMobx";
import TodosReduxContainer from "./application/TodosRedux/TodosReduxContainer";
import TodoList from "./application/Todos";

import { Switch, Route } from "react-router-dom";

const Routes = () => {
  return (
    <Switch>
      <Route exact path="/todos/basic" component={TodoList} />
      <Route exact path="/todos/mobx" component={TodosMobx} />
      <Route exact path="/todos/redux" component={TodosReduxContainer} />
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
