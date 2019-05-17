import { loopTestCases } from '../test-helpers'
import * as testFns from './index'

const testCases = [
  {
    input: [[[1999, 2000], [1900, 2000]]],
    output: 1999,
    // only: true,
  },
  {
    input: [[[1900, 1930], [1920, 1929], [1930, 2000]]],
    output: 1920,
  },
  {
    input: [[[2000, 2019], [1920, 1929], [1930, 2000]]],
    output: 2000,
  },
]

describe.only('findMostPopulatedYear()', () => {
  Object.values(testFns).forEach(fnUnderTest =>
    loopTestCases({ fnUnderTest, testCases })
  )
})
