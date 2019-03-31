/**
 *
 * @param {*} s string with characters to repeat
 * @param {*} n length of repeated string
 */
export function repeatedString (s, n) {
  const getCount = s => getCharCount(s, 'a')
  const stringLength = s.length
  const charCount = getCount(s)

  const wholeLengths = Math.trunc(n / stringLength)
  const stubLength = n % stringLength
  const stubString = s.substring(0, stubLength)

  return charCount * wholeLengths + getCount(stubString)
}

function getCharCount (s, char) {
  return s.split('').filter(c => c === char).length
}
