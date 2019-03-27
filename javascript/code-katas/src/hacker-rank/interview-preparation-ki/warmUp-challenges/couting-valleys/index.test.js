import { loopTestCases } from '../../../../test-helpers'

import { countingValleys } from './index'

describe('fn()', () => {
  const testCases = [
    {
      input: [8, 'DDUUUUDD'],
      output: 1,
    },
    {
      input: [8, 'UDDDUDUU'],
      output: 1,
    },
    {
      input: [14, 'UDDDUUDDUUDDUU'],
      output: 3,
    },
    {
      input: [0, 'uuddduuudddu'],
      output: 2,
    },
  ]
  loopTestCases({ testCases, fnUnderTest: countingValleys })
})
