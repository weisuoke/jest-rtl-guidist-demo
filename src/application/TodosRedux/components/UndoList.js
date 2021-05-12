import React from 'react'

class UndoList extends React.Component {
  constructor() {
    super();
  }

  render() {
    const { list, deleteItem, changeStatus, handleBlur, valueChange } = this.props
    return (
      <div className="undo-list">
        <div className="undo-list-title">
          正在进行
          <div
            className="undo-list-count"
            data-test="count"
          >
            {list.length}
          </div>
        </div>
        <ul className="undo-list-content">
          {
            list.map((item, index) => {
              return (
                <li
                  data-test="list-item"
                  className="undo-list-item"
                  key={`${item}-${index}`}
                  onClick={() => changeStatus(index)}
                >
                  {item.status === 'div' ? item.value : (
                    <input
                      data-test="input"
                      className="undo-list-input"
                      value={item.value}
                      onBlur={() => handleBlur(index)}
                      onChange={(e) => valueChange(index, e.target.value)}
                    />
                  )}
                  <span
                    data-test="delete-item"
                    className="undo-list-delete"
                    onClick={(e) => {
                      e.stopPropagation()
                      deleteItem(index)
                    }}
                  >
                  x
                </span>
                </li>
              )
            })
          }
        </ul>
      </div>
    )
  }
}

export default UndoList