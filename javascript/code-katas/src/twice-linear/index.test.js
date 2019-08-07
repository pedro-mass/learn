import { loopTestCases } from '../test-helpers'

import * as testFns from './index'

const testCases = [
  {
    input: [10],
    output: 22,
  },
  {
    input: [20],
    output: 57,
    // only: true,
  },
  {
    input: [30],
    output: 91,
    // only: true,
  },
  {
    input: [50],
    output: 175,
  },
  {
    input: [100],
    output: 447,
  },
  // {
  //   input: [x],
  //   output: 3355,
  // },
  // {
  //   input: [x],
  //   output: 8488,
  // },
  // {
  //   input: [x],
  //   output: 19773,
  // },
  // {
  //   input: [x],
  //   output: 80914,
  // },
]

describe.only('dblLinear()', () => {
  Object.values(testFns).forEach(fnUnderTest =>
    loopTestCases({ fnUnderTest, testCases })
  )
})
