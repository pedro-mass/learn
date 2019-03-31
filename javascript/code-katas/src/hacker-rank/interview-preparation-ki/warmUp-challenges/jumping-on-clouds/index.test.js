import { loopTestCases } from '../../../../test-helpers'

import { jumpingOnClouds, getSafeClouds } from '.'

loopTestCases({
  fnUnderTest: jumpingOnClouds,
  testCases: [
    {
      input: [[0, 1, 0, 0, 0, 1, 0]],
      output: 3,
    },
    {
      input: [[0, 1, 0, 0, 0]],
      output: 2,
    },
    {
      input: [[0, 0, 1, 0, 0, 1, 0]],
      output: 4,
    },
    {
      input: [[0, 0, 0, 0, 1, 0]],
      output: 3,
    },
    {
      input: [[0, 0, 1, 0, 0, 1, 0]],
      output: 4,
    },
    {
      input: [[0, 0, 0, 1, 0, 0]],
      output: 3,
    },
  ],
})

loopTestCases({
  fnUnderTest: getSafeClouds,
  testCases: [
    {
      input: [[0, 1, 0, 0, 0, 1, 0], 0],
      output: [2],
    },
    {
      input: [[0, 1, 0, 0, 0, 1, 0], 2],
      output: [3, 4],
    },
    {
      input: [[0, 1, 0, 0, 0, 1, 0], 3],
      output: [4],
    },
    {
      input: [[0, 1, 0, 0, 0, 1, 0], 4],
      output: [6],
    },
    {
      input: [[0], 0],
      output: [],
    },
  ],
})
