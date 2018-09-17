import { loopTestCases } from '../../test-helpers'

import * as testFns from './2-count-unique-values'

const testCases = [
  { input: [[1, 1, 1, 1, 1, 2]], output: 2 },
  { input: [[1, 2, 3, 4, 4, 4, 7, 7, 12, 12, 13]], output: 7 },
  { input: [[]], output: 0 },
  { input: [[-2, -1, -1, 0, 1]], output: 4 },
]

Object.values(testFns).forEach(fnUnderTest =>
  loopTestCases({ fnUnderTest, testCases })
)
