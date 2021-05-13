import React from 'react'
import PropTypes from 'prop-types'

class Header extends React.Component {
  constructor() {
    super();
    this.state = {
      value: ""
    }
  }

  handleInputChange = (e) => {
    this.setState({
      value: e.target.value
    })
  }

  handleInputKeyUp = (e) => {
    const { value } = this.state
    const { addUndoItem } = this.props
    if(e.keyCode === 13 && value) {
      addUndoItem(value)
      this.setState({
        value: ''
      })
    }
  }

  render() {
    const { value } = this.state
    return (
      <div className="header">
        <div className="header-content">
          TodoList
          <input
            placeholder="Add Todo"
            className="header-input"
            data-test="header-input"
            value={value}
            onChange={this.handleInputChange}
            onKeyUp={this.handleInputKeyUp}
          />
        </div>
      </div>
    )
  }
}

Header.propTypes = {
  addUndoItem: PropTypes.func
}

export default Header