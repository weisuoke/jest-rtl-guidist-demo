import axios from 'axios'

const fetchData = function (cb) {
  axios.get('http://music.weisuoke.com/dj/program?rid=336355127').then((response) => {
    cb(response.data)
  })
}

const fetchDataPromisify = function () {
  return axios.get('http://music.weisuoke.com/dj/program?rid=336355127')
}

const fetchDataPromisifyError = function () {
  return axios.get('http://music.weisuoke.com/dj1/program?rid=336355127')
}

// Callback 回调的异步测试
// 传入一个 done 的方法。直到done执行后，测试才完成。
// 否则的话函数执行了，测试就会完成了，不会等待到异步方法的执行完成。
test('jest callback case', done => {
  function callback(data) {
    try {
      expect(data.code).toBe(200)
      done()
    } catch (e) {
      done(e)
    }
  }

  fetchData(callback)
})

// Promise
test('jest promise success', () => {
  return fetchDataPromisify().then(response => {
    expect(response.data.code).toBe(200)
  })
})

// 测试 promise catch的情况，必须要加上 expect.assertions。否则这个test永远都是true
test('jest promise error', () => {
  expect.assertions(1)
  return fetchDataPromisifyError().catch(error => {
    expect(error.toString().indexOf('404') > -1).toBeTruthy()
  })
})

test('jest promise resolves', () => {
  return expect(fetchDataPromisify()).resolves.toMatchObject({
    data: {
      code: 200
    }
  })
})

test('jest promise reject', () => {
  return expect(fetchDataPromisifyError()).rejects.toThrow()
})

// Async / Await
test('jest async/await success', async () => {
  await expect(fetchDataPromisify()).resolves.toMatchObject({
    data: {
      code: 200
    }
  })
})

test('jest async/await success method1', async () => {
  const response = await fetchDataPromisify()
  expect(response.data.code).toBe(200)
})

test('jest async/await fail', async () => {
  await expect(fetchDataPromisifyError()).rejects.toThrow()
})

test('jest async/await fail method1', async () => {
  expect.assertions(1)
  try {
    await fetchDataPromisifyError()
  } catch (e) {
    expect(e.toString()).toEqual("Error: Request failed with status code 404")
  }
})