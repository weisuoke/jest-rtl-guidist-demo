import React from 'react'
import { shallow } from 'enzyme'
import UndoList from '../../components/UndoList'
import { findTestWrapper } from '../../../../lib/utils/testUtils'

describe("UndoList组件", () => {
  it('组件渲染正常', () => {
    const wrapper = shallow(<UndoList list={[]}/>)
    expect(wrapper).toMatchSnapshot()
  })

  it('未完成列表当数据为空数组时， count 数目为 0，列表无内容', () => {
    const wrapper = shallow(<UndoList list={[]}/>)
    const countElem = findTestWrapper(wrapper, "count")
    const listItems = findTestWrapper(wrapper, "list-item")
    expect(countElem.text()).toEqual("0")
    expect(listItems.length).toEqual(0)
  })

  it('未完成列表当数据有内容时显示数据长度，内容不为空', () => {
    const listData = [
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
    const wrapper = shallow(<UndoList list={listData}/>)
    const countElem = findTestWrapper(wrapper, "count")
    const listItems = findTestWrapper(wrapper, "list-item")
    expect(countElem.text()).toEqual("3")
    expect(listItems.length).toEqual(3)
  })

  it('未完成列表当数据有内容时，要存在删除按钮', () => {
    const listData = [
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
    const wrapper = shallow(<UndoList list={listData}/>)
    const deleteItems = findTestWrapper(wrapper, "delete-item")
    expect(deleteItems.length).toEqual(3)
  })

  it('未完成列表当数据有内容时，点击某个删除按钮，会调用删除方法', () => {
    const listData = [
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
    const fn = jest.fn()
    const index = 1;
    const wrapper = shallow(<UndoList deleteItem={fn} list={listData}/>)
    const deleteItems = findTestWrapper(wrapper, "delete-item")
    deleteItems.at(index).simulate('click', {
      stopPropagation: () => {}
    });
    expect(fn).toHaveBeenCalledWith(index)
  })

  it('当某一项被点击时，触发执行 changeStatus 函数', () => {
    const listData = [
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
    const fn = jest.fn()
    const index = 1;
    const wrapper = shallow(<UndoList changeStatus={fn} list={listData}/>)
    const listItems = findTestWrapper(wrapper, "list-item")
    listItems.at(index).simulate('click');
    expect(fn).toHaveBeenCalledWith(index)
  })

  it('当某一项状态是Input时，展示输入框', () => {
    const listData = [
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
    const wrapper = shallow(<UndoList list={listData}/>)
    const inputItems = findTestWrapper(wrapper, "input")
    expect(inputItems.length).toBe(1)
  })

  it('当某一项input失去焦点时， 触发执行 handleBlur 方法', () => {
    const listData = [
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
    const fn = jest.fn()
    const wrapper = shallow(<UndoList handleBlur={fn} list={listData}/>)
    const inputElem = findTestWrapper(wrapper, "input")
    inputElem.simulate('blur')
    expect(fn).toHaveBeenCalledWith(0)
  })

  it('当某一输入框变更时，触发执行 handleValueChange 方法', () => {
    const listData = [
      {
        status: 'input',
        value: '学习Jest'
      }
    ]
    const value = '学习TDD'
    const fn = jest.fn()
    const wrapper = shallow(<UndoList valueChange={fn} list={listData}/>)
    const inputElem = findTestWrapper(wrapper, "input")
    inputElem.simulate('change', {
      target: {
        value
      }
    })
    expect(fn).toHaveBeenCalledWith(0, value)
  })
})