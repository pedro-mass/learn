/**
 * @param {number[]} arr1
 * @param {number[]} arr2
 *
 * @returns true when every value in arr1 has it's corresponding value in arr 2
 */
export default function same (arr1, arr2) {
  return simpleApproach(arr1, arr2)
}

export function simpleApproach (arr1, arr2) {
  if (arr1.length !== arr2.length) {
    return false
  }
  for (let i = 0; i < arr1.length; i++) {
    if (Math.pow(arr1[i], 2) !== arr2[i]) {
      return false
    }
  }

  return true
}
