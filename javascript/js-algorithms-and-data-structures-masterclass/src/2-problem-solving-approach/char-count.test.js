import { charCount } from './char-count'

const cases = [
  {
    name: 'should handle multiples of the same character',
    input: 'aaa',
    output: { a: 3 },
  },
  {
    name: 'should handle mixed case',
    input: 'Your PIN number is 1234',
    output: {
      1: 1,
      2: 1,
      3: 1,
      4: 1,
      b: 1,
      e: 1,
      i: 2,
      m: 1,
      n: 2,
      o: 1,
      p: 1,
      r: 2,
      s: 1,
      u: 2,
      y: 1,
    },
  },
  {
    name: 'should ignore non-alphanumeric characters',
    input: '_. // -+`!@#$%^&*()-_=+/?.>,<',
    output: {},
  },
  {
    name: 'should handle undefined',
    input: undefined,
    output: {},
  },
  {
    name: 'should handle null',
    input: null,
    output: {},
  },
  {
    name: 'should handle a number',
    input: 1232,
    output: {},
  },
  {
    name: 'should handle a boolean',
    input: true,
    output: {},
  },
  {
    name: 'should handle an object',
    input: { test: true },
    output: {},
  },
]
describe.each(cases)('charCount()', ({ name, input, output }) => {
  it(name, () => {
    expect(charCount(input)).toEqual(output)
  })
})
