// Write a function called <b>sameFrequency. </b>
// Given two positive integers, find out if the two numbers have the same frequency of digits.

// O(n)
export function sameFrequency (a, b) {
  if (!isValidArgs(a, b)) return false

  const getFrequencies = number =>
    number
      .toString()
      .split('')
      .reduce((map, digit) => ({ ...map, [digit]: ++map[digit] || 1 }), {})

  let aFrequencies = getFrequencies(a)
  let bFrequencies = getFrequencies(b)

  return Object.entries(aFrequencies).every(
    ([digit, frequency]) => bFrequencies[digit] === frequency
  )
}

function isValidArgs (a, b) {
  return (
    a &&
    b &&
    Number.isInteger(a) &&
    Number.isInteger(b) &&
    a >= 0 &&
    b >= 0 &&
    a.toString().length === b.toString().length
  )
}
