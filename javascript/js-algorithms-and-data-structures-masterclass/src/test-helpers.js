export function timeCallInMs (fn) {
  const t1 = performance.now()
  fn()
  const t2 = performance.now()
  return t2 - t1
}

export function getTestCases (cases) {
  const filteredCases = cases.filter(c => c.only)

  return filteredCases && filteredCases.length > 0 ? filteredCases : cases
}
