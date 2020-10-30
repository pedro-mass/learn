export function timeCallInMs (fn) {
  const t1 = performance.now()
  fn()
  const t2 = performance.now()
  return t2 - t1
}

export function getTestCases (cases = []) {
  const filteredCases = cases.filter(c => c.only)
  const removeSkipped = _cases => _cases.filter(c => c.skip !== true)

  return filteredCases && filteredCases.length > 0
    ? removeSkipped(filteredCases)
    : removeSkipped(cases)
}

export function loopTestCases ({ testCases, fnUnderTest }) {
  describe.each(getTestCases(testCases))(
    `${fnUnderTest.name}()`,
    ({ input, output, name, ...config }) => {
      name = getTestName(name, input, output)
      const test = getTestFn(config)

      test(name, () => {
        expect(fnUnderTest(...input)).toEqual(output)
      })
    }
  )
}

function getTestName (name, input, expected) {
  name = name || JSON.stringify({ input, expected }).slice(0, 150)
  return name
}

function getTestFn (config) {
  const command = config.only ? 'only' : config.skip ? 'skip' : undefined
  const test = command ? it[command] : it
  return test
}
