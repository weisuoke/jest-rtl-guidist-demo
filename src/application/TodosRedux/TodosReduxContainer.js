import React from 'react'
import { Provider } from "react-redux";
import store from '../../store/createStore'
import TodoList from './index'

const TodosReduxContainer = () => {
  return (
    <Provider store={store}>
      <TodoList />
    </Provider>
  )
}

export default TodosReduxContainer