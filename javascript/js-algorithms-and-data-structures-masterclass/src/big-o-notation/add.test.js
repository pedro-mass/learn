import * as add1 from './add1'
import * as add2 from './add2'
import { timeCallInMs } from '../test-helpers'

it('should equal the same', () => {
  const input = 5
  expect(add1.addUpTo(input)).toEqual(add2.addUpTo(input))
})

it('add2 should be faster than add1', () => {
  const times = {
    add1: timeCallInMs(() => add1.addUpTo(10e5)),
    add2: timeCallInMs(() => add2.addUpTo(10e5))
  }
  expect(times.add2).toBeLessThan(times.add1)
})
