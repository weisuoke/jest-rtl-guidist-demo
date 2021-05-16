// toBe(4) is the matcher
// `toBe` 使用了 `Object.is` 来判断是否完全匹配
// 如果要检查一个对象中的值是否匹配，应该使用 `toEqual` 来代替
test('two plus two is four', () => {
  expect(2 + 2).toBe(4)
})

// toEqual recursively checks every field of an object or array.
test('object assignment', () => {
  const data = {one: 1};
  data['two'] = 2;
  expect(data).toEqual({one: 1, two: 2})
})

// test for the opposite of a matcher
test('adding positive numbers is not zero', () => {
  for (let a = 1; a < 10; a++) {
    for (let b = 1; b < 10; b++) {
      expect(a + b).not.toBe(0)
    }
  }
})

/*
toBeNull matches only null
toBeUndefined matches only undefined
toBeDefined is the opposite of toBeUndefined
toBeTruthy matches anything that an if statement treats as true
toBeFalsy matches anything that an if statement treats as false
 */
test('null', () => {
  const n = null;
  expect(n).toBeNull();
  expect(n).toBeDefined();
  expect(n).not.toBeUndefined();
  expect(n).not.toBeTruthy();
  expect(n).toBeFalsy();
})

test('zero', () => {
  const value = 2 + 2;
  expect(value).toBeGreaterThan(3);
  expect(value).toBeGreaterThanOrEqual(3.5);
  expect(value).toBeLessThan(5);
  expect(value).toBeLessThanOrEqual(4.5);

  // toBe and toEqual are equivalent for numbers
  expect(value).toBe(4);
  expect(value).toEqual(4);
})

// For floating point equality, use toBeCloseTo instead of toEqual, because you don't want a test to depend on a tiny rounding error.
test('adding float point numbers', () => {
  const value = 0.1 + 0.2;
  // expect(value).toBe(0.3);       This won't work because of rounding error
  expect(value).toBeCloseTo(0.3); // This works.
})

// check strings against regular expressions with toMatch:
test('there is no I in team', () => {
  expect('team').not.toMatch(/I/);
})

// Arrays and iterables
// You can check if an array or iterable contains a particular item using toContain:
const shoppingList = [
  'diapers',
  'kleenex',
  'trash bags',
  'paper towels',
  'beer',
];

test('the shopping list has beer on it', () => {
  expect(shoppingList).toContain('beer');
  expect(new Set(shoppingList)).toContain('beer')
})

// Exceptions
// If you want to test whether a particular function throws an error when it's called, use toThrow.
function compileAndroidCode() {
  throw new Error('you are using the wrong JDK');
}

test('compiling android goes as expected', () => {
  expect(() => compileAndroidCode()).toThrow();
  expect(() => compileAndroidCode()).toThrow(Error);

  // You can also use the exact error message or a regexp
  expect(() => compileAndroidCode()).toThrow('you are using the wrong JDK');
  expect(() => compileAndroidCode()).toThrow(/JDK/);
})