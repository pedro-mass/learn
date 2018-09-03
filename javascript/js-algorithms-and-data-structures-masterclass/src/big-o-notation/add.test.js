import * as add1 from './add1'
import * as add2 from './add2'

it('should equal the same', () => {
  const input = 5
  expect(add1.addUpTo(input)).toEqual(add2.addUpTo(input))
})

function timeCallInMs (fn, input = 10e4) {
  const t1 = performance.now()
  fn(input)
  const t2 = performance.now()
  return t2 - t1
}

it('add2 should be faster than add1', () => {
  const times = {
    add1: timeCallInMs(add1.addUpTo),
    add2: timeCallInMs(add2.addUpTo)
  }

  expect(times.add2).toBeLessThan(times.add1)
})
