import React from "react";
import TodoList from "./TodoList";
import { TodosMobxStoreInstance } from "./TodosMobxStore";
import { observer } from "mobx-react";

const TodosMobx = () => {
  return (
    <div>
      Todos
      <TodoList store={TodosMobxStoreInstance} />
    </div>
  );
};

export default observer(TodosMobx);
