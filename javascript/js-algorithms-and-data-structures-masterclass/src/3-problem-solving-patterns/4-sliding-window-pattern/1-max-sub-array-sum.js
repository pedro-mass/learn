// Write a function called maxSubarraySum which accepts an array of integers and a number called n. The function should calculate the maximum sum of n consecutive elements in the array.

export function maxSubarraySumPedro1 (arr, windowSize) {
  if (!isValidArray(arr)) {
    return null
  }

  let maxValue
  let start = 0
  let end = windowSize

  while (end <= arr.length) {
    const window = arr.slice(start, end)
    const value = window.reduce((total, currValue) => {
      return total + currValue
    }, 0)

    if (!maxValue || value > maxValue) {
      maxValue = value
    }
    start++
    end++
  }

  return maxValue
}

function isValidArray (arr) {
  return arr && arr.length > 0
}
