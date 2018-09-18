// Write a function called maxSubarraySum which accepts an array of integers and a number called n. The function should calculate the maximum sum of n consecutive elements in the array.

// O(n^2) - has nested loop with while + reduce
export function pedro1 (arr, windowSize) {
  if (!isValidArrayParams(arr, windowSize)) {
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

    if (maxValue == null || value > maxValue) {
      maxValue = value
    }
    start++
    end++
  }

  return maxValue
}

function isValidArrayParams (arr, windowSize) {
  return arr && arr.length > 0 && windowSize <= arr.length
}

// O(n^2) - has nested for loop
export function naive (arr, num) {
  if (num > arr.length) {
    return null
  }
  var max = -Infinity
  for (let i = 0; i < arr.length - num + 1; i++) {
    let temp = 0
    for (let j = 0; j < num; j++) {
      temp += arr[i + j]
    }
    if (temp > max) {
      max = temp
    }
  }
  return max
}

// O(n) - has 2 loops, but they're side by side not nested
export function refactor (arr, num) {
  let maxSum = 0
  let tempSum = 0
  if (arr.length < num) return null
  for (let i = 0; i < num; i++) {
    maxSum += arr[i]
  }
  tempSum = maxSum
  for (let i = num; i < arr.length; i++) {
    tempSum = tempSum - arr[i - num] + arr[i]
    maxSum = Math.max(maxSum, tempSum)
  }
  return maxSum
}

// O(n) - 2 loops, but not nested
export function pedro2 (arr, windowSize) {
  if (!isValidArrayParams(arr, windowSize)) {
    return null
  }

  let maxSum = arr
    .slice(0, windowSize)
    .reduce((total, currValue) => total + currValue, 0)
  let tempSum = maxSum

  for (let i = windowSize; i < arr.length; i++) {
    const valueAtFront = arr[i - windowSize]
    const valueAtEnd = arr[i]
    tempSum = tempSum - valueAtFront + valueAtEnd
    maxSum = Math.max(maxSum, tempSum)
  }
  return maxSum
}
