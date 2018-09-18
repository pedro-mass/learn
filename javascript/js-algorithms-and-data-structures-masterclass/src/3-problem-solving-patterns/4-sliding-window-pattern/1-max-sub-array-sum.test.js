import { loopTestCases } from '../../test-helpers'

import * as testFns from './1-max-sub-array-sum'

const testCases = [
  { input: [[1, 2, 5, 2, 8, 1, 5], 2], output: 10 },
  { input: [[1, 2, 5, 2, 8, 1, 5], 4], output: 17 },
  { input: [[4, 2, 1, 6], 1], output: 6 },
  { input: [[4, 2, 1, 6, 2], 4], output: 13 },
  { input: [[], 4], output: null },
]

Object.values(testFns).forEach(fnUnderTest =>
  loopTestCases({ fnUnderTest, testCases })
)
