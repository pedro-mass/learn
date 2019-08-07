import { loopTestCases } from '../../../../test-helpers'

import { sockMerchant } from './index'

describe('sockMerchant()', () => {
  const testCases = [
    {
      input: [5, [1, 1, 2, 2, 3]],
      output: 2,
    },
    {
      input: [5, shuffle([1, 1, 2, 2, 3])],
      output: 2,
    },
    {
      input: [9, [10, 20, 20, 10, 10, 30, 50, 10, 20]],
      output: 3,
    },
    {
      input: [15, [6, 5, 2, 3, 5, 2, 2, 1, 1, 5, 1, 3, 3, 3, 5]],
      output: 6,
    },
  ]

  loopTestCases({
    testCases,
    fnUnderTest: sockMerchant,
  })
})

/**
 * Shuffles array in place. ES6 version
 * @param {Array} a items An array containing the items.
 */
function shuffle (a) {
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}
