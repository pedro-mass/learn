// Write a function called sumZero which accepts a sorted array of integers. The function should find the first pair where the sum is 0. Return an array that includes both values that sum to zero or undefined if a pair does not exist

// O(n^2)
export function sumZeroNaive (arr) {
  for (let i = 0; i < arr.length; i++) {
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[i] + arr[j] === 0) {
        return [arr[i], arr[j]]
      }
    }
  }
}

// O(n)
export function sumZeroPedro (arr) {
  let leftPointer = 0
  let rightPointer = arr.length - 1

  while (leftPointer < rightPointer) {
    const sum = arr[leftPointer] + arr[rightPointer]

    if (sum === 0) {
      return [arr[leftPointer], arr[rightPointer]]
    } else if (sum > 0) {
      rightPointer--
    } else {
      leftPointer++
    }
  }
}

// O(n)
export function sumZeroTeacher (arr) {
  let left = 0
  let right = arr.length - 1
  while (left < right) {
    let sum = arr[left] + arr[right]
    if (sum === 0) {
      return [arr[left], arr[right]]
    } else if (sum > 0) {
      right--
    } else {
      left++
    }
  }
}
