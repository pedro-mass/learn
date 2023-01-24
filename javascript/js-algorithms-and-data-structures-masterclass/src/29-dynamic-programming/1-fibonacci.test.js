import { loopTestCases } from '../test-helpers'

import * as testFns from './1-fibonacci'

const testCases = [
  { input: [1], output: 1 },
  { input: [2], output: 1 },
  { input: [3], output: 2 },
  { input: [4], output: 3 },
  { input: [5], output: 5 },
  { input: [10], output: 55 },
]

describe('fib', () => {
  Object.values(testFns).forEach(fnUnderTest =>
    loopTestCases({ fnUnderTest, testCases })
  )
})
