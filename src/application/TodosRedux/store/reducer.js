import { CHANGE_INPUT_VALUE } from './constants'

const initialState = {
  inputValue: ''
}

const todoReducer = (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_INPUT_VALUE:
      return { inputValue: action.value }
    default:
      return state;
  }
}

export default todoReducer