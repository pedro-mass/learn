// Implement a function called, areThereDuplicates which accepts a variable number of arguments, and checks whether there are any duplicates among the arguments passed in.  You can solve this using the frequency counter pattern OR the multiple pointers pattern.

// O(n)
export function frequencyCounterPattern (...args) {
  const getFrequencies = array =>
    array.reduce(
      (map, item) => ({ ...map, [item]: getNextCount(map, item) }),
      {}
    )
  return !Object.entries(getFrequencies(args)).every(
    ([arg, frequency]) => frequency === 1
  )
}

function getNextCount (map, key) {
  return ++map[key] || 1
}

// O(log n)? - not sure about the complexity of the sort but average case says it's O(log n)
export function multiplePointersPattern (...args) {
  args = args.sort()

  let p1 = 0
  let p2 = p1 + 1

  while (p2 < args.length) {
    if (args[p1] === args[p2]) return true
    p1++
    p2++
  }
  return false
}
