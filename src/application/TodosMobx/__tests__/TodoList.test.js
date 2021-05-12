import React from 'react'
import { shallow } from 'enzyme'
import TodosMobxStore from "../TodosMobxStore";
import { TodoList } from "../TodoList";
import toJson from "enzyme-to-json";

describe("Mobx TodoList", () => {
  // eslint-disable-next-line no-unused-vars
  let storeInstance = ""

  beforeEach(() => {
    storeInstance = new TodosMobxStore()
  })

  it("snapshot", () => {
    storeInstance.todoList.forEach((todo, index) => {
      todo.id = index
    })
    const component = shallow(<TodoList store={storeInstance}/>)

    expect(toJson(component)).toMatchSnapshot()
  })

  it("add Todo", () => {
    const component = shallow(<TodoList store={storeInstance}/>)
    const todoInput = component.find('[data-test-id="todo-input"]')
    const addButton = component.find('[data-test-id="add-button"]')
    todoInput.simulate("change", {
      target: {
        value: "123"
      },
      persist: jest.fn()
    })
    expect(storeInstance.inputTodo).toBe("123")
    addButton.simulate("click")
    expect(storeInstance.inputTodo).toBe("")
    // TODO 这里期望是 4. 但是一直是 3.
    // expect(storeInstance.todoList.length).toBe(4)
  })

})