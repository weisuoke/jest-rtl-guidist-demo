import React from 'react'
import { connect } from 'react-redux'
import { actions } from '../store'

class Header extends React.Component {
  constructor() {
    super();
  }

  handleInputKeyUp = (e) => {
    const { value } = this.props
    const { addUndoItem } = this.props
    if(e.keyCode === 13 && value) {
      addUndoItem(value)
      this.props.handleInputChange("")
    }
  }

  render() {
    const { value, handleInputChange, handleInputKeyUp } = this.props
    return (
      <div className="header">
        <div className="header-content">
          TodoList
          <input
            placeholder="Add Todo"
            className="header-input"
            data-test="header-input"
            value={value}
            onChange={(e) => handleInputChange(e.target.value)}
            onKeyUp={this.handleInputKeyUp}
          />
        </div>
      </div>
    )
  }
}

const mapState = (state) => {
  return {
    value: state.todo.inputValue
  }
}

const mapDispatch = dispatch => ({
  handleInputChange(value) {
    dispatch(actions.changeInputValue(value))
  }
})

export default connect(mapState, mapDispatch)(Header);