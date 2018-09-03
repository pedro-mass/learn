import * as add1 from './add1'
import * as add2 from './add2'

it('should equal the same', () => {
  const input = 5
  expect(add1.addUpTo(input)).toEqual(add2.addUpTo(input))
})
