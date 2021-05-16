// 从 __mocks__ 的文件夹中的 mock2.js 中获取 fetchData 的方法
jest.mock('../mock2')
import { fetchData } from '../mock2'
// getNumber 方法从真实的 mock2.js 中文件中获取
const { getNumber } = jest.requireActual('../mock2')

test('fetchData 测试', () => {
  return fetchData().then(data => {
    expect(eval(data)).toEqual('123')
  })
})

test('getNumber 测试', () => {
  expect(getNumber()).toEqual(123);
})
