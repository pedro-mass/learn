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

  it('should return the same value across all functions', () => {
    const people = generatePeople(100)

    const values = Object.values(testFns).map(fn => fn(people))

    expect(values.every(v => v === values[0])).toBe(true)
  })
})

function generatePeople (numPeople = 5) {
  const people = []
  while (numPeople > 0) {
    numPeople--
    const birthYear = randomYear()
    const deathYear = randomYear(birthYear)
    people.push([birthYear, deathYear])
  }
  return people
}

function randomYear (min = 0, max = 3000) {
  return Math.floor(Math.random() * max + min)
}
