export function timeCallInMs (fn) {
  const t1 = performance.now()
  fn()
  const t2 = performance.now()
  return t2 - t1
}
