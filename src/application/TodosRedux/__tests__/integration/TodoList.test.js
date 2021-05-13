import React from 'react'
import { Provider } from 'react-redux'
import { mount } from 'enzyme'
import { findTestWrapper } from "../../../../lib/utils/testUtils";
import TodoList from '../../index'
import store from '../../../../store/createStore'

const mockUndoList = {
  data: [{
    status: 'div',
    value: 'dell lee'
  }],
  success: true
}

jest.mock('axios', () => ({
  get: (url) => {
    if (url === '/undolist.json') {
      return new Promise((resolve) => {
        resolve(mockUndoList)
      })
    }
  }
}))

it(`
  1. Header 输入框输入内容
  2. 点击回车
  3. 列表中展示用户输入的内容项
`, () => {
  const wrapper = mount(
    <Provider store={store}>
      <TodoList />
    </Provider>
  );
  const inputElem = findTestWrapper(wrapper, 'header-input')
  const content = 'weisuoke'
  inputElem.simulate('change', {
    target: { value: content }
  })
  inputElem.simulate('keyUp', {
    keyCode: 13
  })
  const listItems = findTestWrapper(wrapper, 'list-item')
  expect(listItems.length).toEqual(1)
  expect(listItems.text()).toContain(content)
})

/*
  {
    data: [
      {
        status: 'div',
        value: 'dell lee'
      }
    ],
    success: true
  }
 */
it(`
  1. 用户打开界面
  2. 应该展示接口返回的数据
`, (done) => {
  const wrapper = mount(
    <Provider store={store}>
      <TodoList />
    </Provider>
  );

  // 写法一
  // setTimeout(() => {
  //   wrapper.update()
  //   const listItems = findTestWrapper(wrapper, 'list-item');
  //   expect(listItems.length).toBe(1)
  //   done()
  // }, 100)

  // 写法二
  process.nextTick(() => {
    wrapper.update()
    const listItems = findTestWrapper(wrapper, 'list-item');
    expect(listItems.length).toBe(1)
    done()
  })
})