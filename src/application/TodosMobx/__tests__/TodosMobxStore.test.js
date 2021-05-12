import TodosMobxStore from "../TodosMobxStore";

describe("TodosMobxStore", () => {
  // eslint-disable-next-line no-unused-vars
  let storeInstance = ""

  beforeEach(() => {
    storeInstance = new TodosMobxStore()
  })

  it("should 3 todo item", () => {
    expect(storeInstance.todoList.length).toBe(3)
  })

  it("should has 4 todo item when call addTodo function", () => {
    storeInstance.addTodo('Todo4')

    expect(storeInstance.todoList.length).toBe(4)
  })

  it("should has 2 todo items when call deleteTodo function", () => {
    let firstTodoItemId = storeInstance.todoList[0].id
    storeInstance.deleteTodo(firstTodoItemId)
    expect(storeInstance.todoList.length).toBe(2)
  })

  it("toggle Todo", () => {
    let firstTodoItemId = storeInstance.todoList[0].id
    storeInstance.toggleTodo(firstTodoItemId)
    expect(storeInstance.todoList[0].done).toBeTruthy()
  })

  it("change input", () => {
    storeInstance.changeInputTodo("123")
    expect(storeInstance.inputTodo).toBe("123")
  })
})