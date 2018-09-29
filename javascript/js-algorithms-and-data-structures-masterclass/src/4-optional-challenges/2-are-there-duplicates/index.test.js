import { loopTestCases } from '../../test-helpers'
import * as testFns from '.'

const testCases = [
  {
    input: [1, 2, 3],
    output: false,
  },
  {
    input: [1, 2, 2],
    output: true,
  },
  {
    input: ['a', 'b', 'c', 'a'],
    output: true,
  },
]

describe('areThereDuplicates', () => {
  Object.values(testFns).forEach(fnUnderTest =>
    loopTestCases({ fnUnderTest, testCases })
  )
})
