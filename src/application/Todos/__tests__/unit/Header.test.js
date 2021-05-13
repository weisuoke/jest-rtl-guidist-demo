import React from 'react'
import { shallow } from 'enzyme'
import Header from '../../components/Header'
import { findTestWrapper } from '../../../../lib/utils/testUtils'

describe('Header 组件', () => {
  it('渲染样式正常', () => {
    const wrapper = shallow(<Header />)
    expect(wrapper).toMatchSnapshot()
  })

  it('包含一个input框', () => {
    const wrapper = shallow(<Header />)
    const inputElem = findTestWrapper(wrapper, 'header-input')
    expect(inputElem.length).toBe(1)
  })

  it('input框内容，初始化应该为空', () => {
    const wrapper = shallow(<Header />)
    const inputElem = findTestWrapper(wrapper, 'header-input');
    expect(inputElem.prop("value")).toEqual('')
  })

  it('input框内容，当用户输入时，会跟随变化', () => {
    const wrapper = shallow(<Header />)
    const inputElem = findTestWrapper(wrapper, 'header-input');
    const userInput = '今天要学习 Jest'
    inputElem.simulate('change', {
      target: {
        value: userInput
      }
    })
    expect(wrapper.state('value')).toEqual(userInput)

    // const newInputElem = wrapper.find("[data-test='input']");
    // expect(newInputElem.prop('value')).toBe(userInput)
  })

  it('input 框输入回车时，如果input无内容，无操作', () => {
    const fn = jest.fn()
    const wrapper = shallow(<Header addUndoItem={fn} />)
    const inputElem = findTestWrapper(wrapper, 'header-input');
    wrapper.setState({
      value: ''
    })
    inputElem.simulate('keyUp', {
      keyCode: 13
    })
    expect(fn).not.toHaveBeenCalled()
  })

  it('input 框输入回车时，如果input有内容，函数应该被调用', () => {
    const fn = jest.fn()
    const wrapper = shallow(<Header addUndoItem={fn} />)
    const inputElem = findTestWrapper(wrapper, 'header-input');
    const userInput = "学习 Jest"
    wrapper.setState({
      value: userInput
    })
    inputElem.simulate('keyUp', {
      keyCode: 13
    })
    expect(fn).toHaveBeenCalled()
    expect(fn).toHaveBeenCalledWith(userInput)
    expect(inputElem.prop('value')).toBe('')
  })

  it('input 框输入回车时，如果input有内容，input框的内容应该被清除', () => {
    const fn = jest.fn()
    const wrapper = shallow(<Header addUndoItem={fn} />)
    const inputElem = findTestWrapper(wrapper, 'header-input');
    const userInput = "学习 Jest"
    wrapper.setState({
      value: userInput
    })
    inputElem.simulate('keyUp', {
      keyCode: 13
    })
    const newInputElement = findTestWrapper(wrapper, 'header-input');
    expect(newInputElement.prop('value')).toBe('')
  })
})