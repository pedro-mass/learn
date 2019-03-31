import { loopTestCases } from '../../../../test-helpers'

import { repeatedString } from '.'

loopTestCases({
  fnUnderTest: repeatedString,
  testCases: [
    {
      input: ['abcab', 10],
      output: 4,
    },
    {
      input: ['aba', 10],
      output: 7,
    },
    {
      input: ['a', 1000000000000],
      output: 1000000000000,
    },
  ],
})
