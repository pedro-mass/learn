export function firstAttempt (n) {
  const numbers = new Set([])
  const numbersToProcess = new Set([1])

  while (numbers.size <= n) {
    const numberToProcess = [...numbersToProcess][0]
    numbersToProcess.delete(numberToProcess)

    numbers.add(numberToProcess)
    numbersToProcess.add(2 * numberToProcess + 1)
    numbersToProcess.add(3 * numberToProcess + 1)

    sortSet(numbersToProcess)
  }

  const sortedNumbers = [...numbers].sort(sortNumber)
  return sortedNumbers[n]
}

export function firstAttemptRefactored (n) {
  const numbers = new Set([])
  const processStack = new Set([1])

  while (numbers.size <= n) {
    sortSet(processStack)
    const numberToProcess = shift(processStack)

    numbers.add(numberToProcess)
    processStack.add(2 * numberToProcess + 1)
    processStack.add(3 * numberToProcess + 1)
  }

  const sortedNumbers = [...numbers]
  return sortedNumbers[n]
}

// todo: all solutions time out. Come up with something more efficient that isn't brute force
export function secondAttempt (n) {
  const numbers = new Set([])
  const processStack = [1]

  while (numbers.size <= n) {
    const numberToProcess = processStack.shift()

    numbers.add(numberToProcess)
    processStack.push(2 * numberToProcess + 1)
    processStack.push(3 * numberToProcess + 1)
    processStack.sort(sortNumber)
  }

  const sortedNumbers = [...numbers]
  return sortedNumbers[n]
}

function sortNumber (a, b) {
  return a - b
}

function shift (set) {
  const firstValue = [...set][0]
  set.delete(firstValue)
  return firstValue
}

function sortSet (set, sortFn = sortNumber) {
  const values = [...set].sort(sortFn)
  set.clear()
  values.forEach(value => set.add(value))
}
