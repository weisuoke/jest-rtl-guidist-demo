import timer, { timer2 } from '../timer'

test("timer 测试1", (done) => {
  timer(() => {
    expect(1).toBe(1)
    done();
  })
})

test("timer 测试2", () => {
  jest.useFakeTimers();
  // Mock 函数
  const fn = jest.fn()
  timer(fn);
  jest.runAllTimers(); // timer execute immediately, avoid waiting time
  expect(fn).toBeCalledTimes(1)
})

describe("timer2 test", () => {
  test("timer2 1. 执行timer2中所有的定时器", () => {
    jest.useFakeTimers();
    const fn = jest.fn()
    timer2(fn);
    jest.runAllTimers(); // timer execute immediately, avoid waiting time
    expect(fn).toBeCalledTimes(2)
  })

  test("timer2 2. 执行timer2中外层的定时器", () => {
    jest.useFakeTimers();
    const fn = jest.fn()
    timer2(fn);
    jest.runOnlyPendingTimers(); // 仅仅执行队列中的timer, 不执行没有创建的timer
    expect(fn).toBeCalledTimes(1)
  })

  test("timer2 3. 时间快进3s", () => {
    jest.useFakeTimers();
    const fn = jest.fn()
    timer2(fn);
    jest.advanceTimersByTime(3000);
    expect(fn).toBeCalledTimes(1)
  })
})