import { loopTestCases } from '../../test-helpers'
import { sameFrequency } from '.'

const testCases = [
  {
    input: [182, 281],
    output: true,
  },
  {
    input: [34, 14],
    output: false,
  },
  {
    input: [3589578, 5879385],
    output: true,
  },
  {
    input: [22, 222],
    output: false,
  },
]

loopTestCases({ fnUnderTest: sameFrequency, testCases })
