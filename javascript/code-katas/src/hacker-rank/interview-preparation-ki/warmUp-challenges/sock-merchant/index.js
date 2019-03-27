/**
 *
 * @param {int} n number of socks
 * @param {int[]} ar sock array with numbers representing the colors
 *
 * @returns total number of matching pairs of socks that John can sell.

 */
export function sockMerchant (n, ar) {
  const colorMap = ar.reduce(
    (map, color) => ({
      ...map,
      [color]: (map[color] || 0) + 1,
    }),
    {}
  )

  return Object.values(colorMap).reduce(
    (numPairs, colorCount) => numPairs + getNumPairs(colorCount),
    0
  )
}

function getNumPairs (colorCount) {
  return Math.trunc(colorCount / 2)
}
