class Counter {
  constructor() {
    this.number = 0
  }

  addOne() {
    this.number += 1
  }

  addTwo() {
    this.number += 2
  }

  minusOne() {
    this.number -= 1
  }

  minusTwo() {
    this.number -= 2
  }
}

let counter = null;

beforeAll(() => {
  console.log('Before All')
})

beforeEach(() => {
  console.log('Before Each')
  counter = new Counter()
})

afterEach(() => {
  console.log('After Each')
})

afterAll(() => {
  console.log('After All')
})

describe('测试增加相关的代码', () => {
  beforeEach(() => {
    console.log('Before each add')
  })

  test('测试 Counter 中的 addOne 方法', () => {
    console.log("测试 Counter 中的 addOne 方法")
    counter.addOne()
    expect(counter.number).toBe(1)
  })

  test('测试 Counter 中的 addTwo 方法', () => {
    console.log("测试 Counter 中的 addTwo 方法")
    counter.addTwo()
    expect(counter.number).toBe(2)
  })
})

describe('测试减少相关的代码', () => {
  test('测试 Counter 中的 minusOne 方法', () => {
    console.log("测试 Counter 中的 minusOne 方法")
    counter.minusOne()
    expect(counter.number).toBe(-1)
  })

  test('测试 Counter 中的 minusTwo 方法', () => {
    console.log("测试 Counter 中的 minusTwo 方法")
    counter.minusTwo()
    expect(counter.number).toBe(-2)
  })
})