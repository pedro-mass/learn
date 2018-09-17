import { loopTestCases } from '../../test-helpers'

import * as testFns from './1-sum-zero'

const testCases = [
  { input: [[-3, -2, -1, 0, 1, 2, 3]], output: [-3, 3] },
  { input: [[-2, 0, 1, 3]], output: undefined },
  { input: [[1, 2, 3]], output: undefined },
  { input: [[-4, -3, -2, -1, 0, 1, 2, 3, 10]], output: [-3, 3] },
]

Object.values(testFns).forEach(fnUnderTest =>
  loopTestCases({ fnUnderTest, testCases })
)
