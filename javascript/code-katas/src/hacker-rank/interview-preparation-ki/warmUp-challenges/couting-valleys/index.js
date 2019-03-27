export function countingValleys (n, s) {
  // keep track of the position with an int

  // when it's negative we're in a valley
  // otherwise we're not

  let position = 0
  const map = {
    U: 1,
    D: -1,
  }

  // track when out of valley
  let valleys = 0
  for (const char of s) {
    const alreadyInValley = isInValley(position)
    position = position + map[char.toUpperCase()]

    if (isInValley(position) && !alreadyInValley) {
      valleys++
    }
  }

  return valleys
}

function isInValley (position) {
  return position < 0
}
