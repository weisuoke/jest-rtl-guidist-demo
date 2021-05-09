import { observable, action, makeObservable } from "mobx";
import { v4 as uuidv4 } from "uuid";

class TodosMobxStore {
  constructor() {
    makeObservable(this);
  }

  @observable todoList = [
    {
      id: uuidv4(),
      content: "Todo1",
      done: false,
    },
    {
      id: uuidv4(),
      content: "Todo2",
      done: true,
    },
    {
      id: uuidv4(),
      content: "Todo3",
      done: false,
    },
  ];

  @observable inputTodo = "";

  @action changeInputTodo = (value) => {
    this.inputTodo = value;
  };

  @action addTodo = (content) => {
    if (content) {
      this.todoList.push({
        id: uuidv4(),
        content,
        done: false,
      });
    }
  };

  @action toggleTodo = (id) => {
    this.todoList.forEach((todo) => {
      if (todo.id === id) {
        todo.done = !todo.done;
      }
    });
  };

  @action deleteTodo = (id) => {
    this.todoList = this.todoList.filter((todo) => todo.id !== id);
  };
}

const TodosMobxStoreInstance = new TodosMobxStore();

export default TodosMobxStore;

export { TodosMobxStoreInstance };
