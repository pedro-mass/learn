import { loopTestCases } from '../test-helpers'
import * as testFns from './index'

describe.skip('getPositive()', () => {
  it('should leave the number unchanged if already positive', () => {
    const max = 5
    const num = 3
    expect(testFns.getPositive(max)(num)).toEqual(num)
  })
  it('should shift number to positive', () => {
    const max = 5
    const num = -3
    expect(testFns.getPositive(max)(num)).toEqual(2)
  })
})

describe.skip('swap()', () => {
  const testCases = [
    {
      input: [[1, 2, 3], 2, 2],
      output: [1, 2, 3],
    },
    {
      input: [[1, 2, 3], 2, 0],
      output: [3, 2, 1],
    },
    {
      input: [[1, 2, 3], 0, 2],
      output: [3, 2, 1],
    },
    {
      input: [[1, 2, 3], 0, 1],
      output: [2, 1, 3],
    },
  ]

  loopTestCases({ fnUnderTest: testFns.swap, testCases })

  it('modifies the array', () => {
    const array = [1, 2, 3]
    const copy = [...array]

    testFns.swap(array, 0, 1)
    expect(array).not.toEqual(copy)
  })
})

describe('rearrange()', () => {
  const testCases = [
    {
      input: [['❤ A', '❤ 3', '❤ 6', '❤ 9', '♣ A'], 4, 0],
      output: ['♣ A', '❤ A', '❤ 3', '❤ 6', '❤ 9'],
      // only: true,
    },
    {
      input: [[1, 2, 3], 0, 2],
      output: [2, 3, 1],
      // only: true,
    },
  ]

  loopTestCases({ fnUnderTest: testFns.rearrange, testCases })
})
