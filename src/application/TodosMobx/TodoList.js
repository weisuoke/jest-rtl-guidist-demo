import React from "react";
import PropTypes from "prop-types";
import { observer } from "mobx-react";
import "./TodosMobx.less";

const TodoList = ({ store }) => {
  const {
    todoList,
    inputTodo,
    changeInputTodo,
    addTodo,
    toggleTodo,
    deleteTodo,
  } = store;
  return (
    <div>
      TodoList
      <div>========</div>
      <div>
        <input
          type="text"
          value={inputTodo}
          onChange={(e) => {
            e.persist();
            changeInputTodo(e.target.value);
          }}
        />
        <button
          onClick={() => {
            addTodo(inputTodo);
            changeInputTodo("");
          }}
        >
          添加
        </button>
      </div>
      {todoList.map((todo) => {
        return (
          <div key={todo.id} className="TodosMobxItem">
            <input
              type="checkbox"
              checked={todo.done}
              onClick={() => {
                toggleTodo(todo.id);
              }}
            />
            <div>{todo.content}</div>
            <div
              className="delete"
              onClick={() => {
                deleteTodo(todo.id);
              }}
            >
              x
            </div>
          </div>
        );
      })}
    </div>
  );
};

TodoList.propTypes = {
  store: PropTypes.shape({
    addTodo: PropTypes.func,
    inputTodo: PropTypes.string,
    changeInputTodo: PropTypes.func,
    toggleTodo: PropTypes.func,
    deleteTodo: PropTypes.func,
    todoList: PropTypes.arrayOf(),
  }).isRequired,
};

export default observer(TodoList);
