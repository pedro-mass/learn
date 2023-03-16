import _ from 'lodash'

function memoize (fn) {
  const memo = {}

  return (...args) => {
    const memoKey = JSON.stringify(args)
    if (_.has(memo, memoKey)) {
      // console.log({
      //   msg: 'memo used',
      //   memo,
      // })
      return memo[memoKey]
    }

    const res = fn(...args)
    memo[memoKey] = res
    return res
  }
}

export const pedro = memoize((n) => {
  if (n < 1) {
    return 1
  }
  if ([1, 2].includes(n)) {
    return 1
  }

  return pedro(n - 1) + pedro(n - 2)
})

const memo = []
function external (n) {
  if (memo[n] !== undefined) return memo[n]

  if (n <= 2) return 1
  var res = external(n - 1) + external(n - 2)
  memo[n] = res
  return res
}

function instructor (n, memo = []) {
  if (memo[n] !== undefined) return memo[n]

  if (n <= 2) return 1
  var res = instructor(n - 1, memo) + instructor(n - 2, memo)
  memo[n] = res
  return res
}
