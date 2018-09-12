/**
 * @param {number[]} arr1
 * @param {number[]} arr2
 *
 * @returns true when every value in arr1 has it's corresponding value in arr 2
 */
export default function same (arr1, arr2) {
  if (!areArgumentsValid(arr1, arr2)) {
    return false
  }
  // return simpleApproach(arr1, arr2)
  // return everyApproach(arr1, arr2)
  // return naive(arr1, arr2)
  return frequencyCounter(arr1, arr2)
}

export function simpleApproach (arr1, arr2) {
  for (const x of arr1) {
    if (!arr2.includes(Math.pow(x, 2))) {
      return false
    }
  }
  return true
}

export function everyApproach (arr1, arr2) {
  // this turned out to be wrong because our check could be using the same number twice for verification
  // eg: arr1: [2, 2] arr2: [4, 5]
  return arr1.every(x => arr2.includes(Math.pow(x, 2)))
}

function areArgumentsValid (arr1, arr2) {
  return arr1 && arr2 && arr1.length === arr2.length
}

// --- Presenter's approach

export function naive (arr1, arr2) {
  for (const x of arr1) {
    let correctIndex = arr2.indexOf(x ** 2)
    if (correctIndex === -1) {
      return false
    }
    arr2.splice(correctIndex, 1)
  }
  return true
}

export function frequencyCounter (arr1, arr2) {
  const getFrequencies = arr =>
    arr.reduce((map, x) => {
      map[x] = ++map[x] || 1
      return map
    }, {})
  let frequencyCounter1 = getFrequencies(arr1)
  let frequencyCounter2 = getFrequencies(arr2)

  for (const key in frequencyCounter1) {
    const keySquared = key ** 2
    if (!(keySquared in frequencyCounter2)) {
      return false
    }

    if (frequencyCounter2[keySquared] !== frequencyCounter1[key]) {
      return false
    }
  }

  return true
}
