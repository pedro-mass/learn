import { loopTestCases } from '../../test-helpers'
import isSame from './same'

function getRandomInt (max) {
  return Math.floor(Math.random() * Math.floor(max))
}

function shuffle (array) {
  return array.sort(() => getRandomInt(2))
}

const testCases = [
  {
    input: [[0], [0]],
    output: true,
  },
  {
    input: [[0], [1]],
    output: false,
  },
  {
    input: [[2], [4]],
    output: true,
  },
  {
    input: [[2, 3, 5], [4, 9, 25]],
    output: true,
  },
  {
    input: [[2, 3, 5], [4, 9, 25].reverse()],
    output: true,
  },
  {
    input: [[2, 3, 5], shuffle([4, 9, 25])],
    output: true,
  },
  {
    input: [[2, 4, 5], [4, 25]],
    output: false,
  },
  {
    input: [[2, 4, 5], [4, 9, 25]],
    output: false,
  },
  {
    input: [[], []],
    output: true,
  },
  {
    input: [[1, 2, 2], [1, 4, 5]],
    output: false,
  },
  {
    input: [[1, 2, 2], [1, 4]],
    output: false,
  },
]

loopTestCases({ fnUnderTest: isSame, testCases })
