import isSame from './same'

const cases = [
  {
    input: [[0], [0]],
    output: true
  },
  {
    input: [[0], [1]],
    output: false
  },
  {
    input: [[2], [4]],
    output: true
  },
  {
    input: [[2, 3, 5], [4, 9, 25]],
    output: true
  },
  {
    input: [[2, 4, 5], [4, 25]],
    output: false
  },
  {
    input: [[2, 4, 5], [4, 9, 25]],
    output: false
  },
  {
    input: [[], []],
    output: true
  }
]

describe.each(cases)('isSame()', ({ input, output }) => {
  it(`input: ${input} | output: ${output}`, () => {
    expect(isSame(...input)).toEqual(output)
  })
})
