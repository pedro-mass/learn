// @ts-check

/**
 * Re-arranges the input array by moving an item from one position to another position.
 * Does not mutate the input array.
 *
 * @template T
 *
 * @param {T[]} array the input array
 * @param {number} from the position to move from
 * @param {number} to the position to move to
 *
 * @returns {T[]}
 */
export function arrange(array, from, to) {
  return rearrange([...array], from, to)
}

/**
 * Re-arranges the input array by moving an item from one position to another position.
 * Mutates the input array.
 *
 * @template T
 *
 * @param {T[]} array the input array
 * @param {number} from the position to move from
 * @param {number} to the position to move to
 *
 * @returns {T[]}
 */
export function rearrange(array, from, to) {
  const makePositive = num => (num >= 0 ? num : num + array.length)
  const incrementor = from < to ? 1 : -1
  from = makePositive(from)
  to = makePositive(to)

  while (from !== to) {
    swap(array, from, from + incrementor)
    from = from + incrementor
  }

  return array
}

function swap(array, x, y) {
  const temp = array[x]
  array[x] = array[y]
  array[y] = temp
  return array
}
