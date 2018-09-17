// Implement a function called countUniqueValues, which accepts a sorted array, and counts the unique values in the array. There can be negative numbers in the array, but it will always be sorted.

// O(n)
export function countUniqueValuesPedro (arr) {
  let left = 0
  let right = left + 1
  let uniqueValues = arr.length ? 1 : 0

  while (left < arr.length && right < arr.length) {
    if (arr[left] !== arr[right]) {
      uniqueValues++
      left = right
      right = left + 1
    } else {
      right++
    }
  }

  return uniqueValues
}

export function countUniqueValuesTeacher (arr) {
  if (arr.length === 0) {
    return 0
  }
  let i = 0
  for (let j = 1; j < arr.length; j++) {
    if (arr[i] !== arr[j]) {
      i++
      arr[i] = arr[j]
    }
  }
  return i + 1
}
