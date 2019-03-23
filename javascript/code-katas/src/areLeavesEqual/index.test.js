import { loopTestCases } from '../test-helpers'

import * as testFns from './index'

const testCases = [
  {
    input: [
      {
        a: 1,
        b: 1,
      },
    ],
    output: true,
  },
  {
    input: [
      {
        a: 1,
        b: 2,
      },
    ],
    output: false,
  },
  // nested objects
  {
    input: [
      {
        a: 1,
        b: 1,
        c: {
          c1: 1,
          c2: 1,
        },
      },
    ],
    output: true,
  },
  {
    input: [
      {
        a: 1,
        b: 1,
        c: {
          c1: 2,
          c2: 2,
        },
      },
    ],
    output: false,
  },
  {
    input: [
      {
        c: {
          c1: 1,
          c2: 1,
        },
        a: 1,
        b: 1,
      },
    ],
    output: true,
  },
]

describe.only('areLeavesEqual()', () => {
  Object.values(testFns).forEach(fnUnderTest =>
    loopTestCases({ fnUnderTest, testCases })
  )
})
