export function pedro (n) {
  if (n < 1) {
    return 0
  }
  if ([1, 2].includes(n)) {
    return 1
  }

  return pedro(n - 1) + pedro(n - 2)
}

export function instructor (n) {
  if (n <= 2) return 1
  return instructor(n - 1) + instructor(n - 2)
}
