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

export function loopTestCases ({ testCases, fnUnderTest }) {
  describe.each(getTestCases(testCases))(
    `${fnUnderTest.name}()`,
    ({ input, output }) => {
      it(`input: ${input} \t| output: ${output}`, () => {
        expect(fnUnderTest(...input)).toEqual(output)
      })
    }
  )
}
