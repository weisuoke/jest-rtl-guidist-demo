import React from 'react'
import { shallow } from 'enzyme'
import TodoList from '../../index'

describe('TodoList组件', () => {
  it('初始化列表为空', () => {
    const wrapper = shallow(<TodoList />)
    expect(wrapper.state('undoList')).toEqual([]);
  })

  it('应该给 Header 传递一个增加 undoList 内容的方法', () => {
    const wrapper = shallow(<TodoList />)
    const Header = wrapper.find('Header')
    expect(Header.prop('addUndoItem')).toBeTruthy()
  })

  it('addUndoItem被执行的时候，undoList 应该新增内容', () => {
    const wrapper = shallow(<TodoList />)
    const content = "学习 React"
    wrapper.instance().addUndoItem(content)
    expect(wrapper.state('undoList').length).toBe(1);
    expect(wrapper.state('undoList')[0]).toEqual({
      status: 'div',
      value: content
    });
  })

  it('UndoList 组件应该接受 list，deleteItem，changeStatus, handleBlur, valueChange 参数', () => {
    const wrapper = shallow(<TodoList />)
    const UndoList = wrapper.find('UndoList')
    expect(UndoList.prop('list')).toBeTruthy()
    expect(UndoList.prop('deleteItem')).toBeTruthy()
    expect(UndoList.prop('changeStatus')).toBeTruthy()
    expect(UndoList.prop('handleBlur')).toBeTruthy()
    expect(UndoList.prop('valueChange')).toBeTruthy()
  })

  it('当 deleteItem 方法被执行时，undoList应该删除内容', () => {
    const wrapper = shallow(<TodoList />)
    const data = [
      {
        status: 'div',
        value: '学习Jest'
      },
      {
        status: 'div',
        value: '学习TDD'
      },
      {
        status: 'div',
        value: '学习单元测试'
      }
    ]
    wrapper.setState({
      undoList: data
    })
    wrapper.instance().deleteItem(1);
    expect(wrapper.state('undoList')).toEqual([data[0], data[2]])
  })

  it('当 changeStatus 方法被执行时，undoList数据项中status被修改', () => {
    const wrapper = shallow(<TodoList />)
    const data = [
      {
        status: 'div',
        value: '学习Jest'
      },
      {
        status: 'div',
        value: '学习TDD'
      },
      {
        status: 'div',
        value: '学习单元测试'
      }
    ]
    wrapper.setState({
      undoList: data
    })
    wrapper.instance().changeStatus(1);
    expect(wrapper.state('undoList')[1]).toEqual({
      ...data[1],
      status: 'input'
    })
  })

  it('当handleBlur被调用，undoList 数据项 status 被修改', () => {
    const wrapper = shallow(<TodoList />)
    const data = [
      {
        status: 'input',
        value: '学习Jest'
      },
      {
        status: 'div',
        value: '学习TDD'
      },
      {
        status: 'div',
        value: '学习单元测试'
      }
    ]
    wrapper.setState({
      undoList: data
    })
    wrapper.instance().handleBlur(0);
    expect(wrapper.state('undoList')[0]).toEqual({
      ...data[0],
      status: 'div'
    })
  })

  it('当 changeValue 方法被执行时，undoList数据项中value被修改', () => {
    const wrapper = shallow(<TodoList />)
    const data = [
      {
        status: 'input',
        value: '学习Jest'
      },
      {
        status: 'div',
        value: '学习TDD'
      },
      {
        status: 'div',
        value: '学习单元测试'
      }
    ]
    const value = "weisuoke"
    wrapper.setState({
      undoList: data
    })
    wrapper.instance().valueChange(0, value);
    expect(wrapper.state('undoList')[0]).toEqual({
      ...data[0],
      value
    })
  })
})